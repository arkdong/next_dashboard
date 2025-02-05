'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
      invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce
      .number()
      .gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'], {
      invalid_type_error: 'Please select an invoice status.',
    }),
    date: z.string(),
  });

export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(prevState: State, formData: FormData) {
    // Validate form using Zod
    const validatedFields = CreateInvoice.safeParse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Invoice.',
      };
    }

    // Prepare data for insertion into the database
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    // Insert data into the database
    try {
      await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;
    } catch {
      // If a database error occurs, return a more specific error.
      return {
        message: 'Database Error: Failed to Create Invoice.',
      };
    }

    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/admin/invoices');
    redirect('/admin/invoices');
}




// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

// ...

export async function updateInvoice(id: string, formData: FormData) {
    const { customerId, amount, status } = UpdateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });

    const amountInCents = amount * 100;

    try {
      await sql`
          UPDATE invoices
          SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
          WHERE id = ${id}
        `;
    } catch {
      return { message: 'Database Error: Failed to Update Invoice.' };
    }

    revalidatePath('/admin/invoices');
    redirect('/admin/invoices');
  }

export async function deleteInvoice(id: string) {
    try {
      await sql`DELETE FROM invoices WHERE id = ${id}`;
      revalidatePath('/admin/invoices');
      return { message: 'Deleted Invoice.' };
    } catch {
      return { message: 'Database Error: Failed to Delete Invoice.' };
    }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

const BaseCourseFormSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(1, { message: 'Please enter a course name' }),
  number: z.coerce
    .number()
    .min(1, { message: 'Please enter a course number from FileMaker' }),
  start: z
    .string()
    .min(1, { message: 'Please choose a start date' }),
  end: z
    .string()
    .min(1, { message: 'Please choose a end date' }),
  max: z.coerce
    .number()
    .min(1, { message: 'Please enter a maximum hours that greater than 0' }),
  status: z.enum(['disabled', 'active'], {
      invalid_type_error: 'Please select a course status.',
    }),
  });

function withDateCheck<T extends z.ZodType<any>>(schema: T) {
  return schema.refine(
    (data: any) => {
      const startDate = new Date(data.start);
      const endDate = new Date(data.end);
      return endDate >= startDate;
    },
    {
      message: 'End date cannot be earlier than the start date.',
      path: ['end'],
    }
  );
}

const CreateCourse = withDateCheck(BaseCourseFormSchema.omit({ id: true}));

export type CourseFormState = {
  errors?: {
    name?: string[];
    number?: string[];
    start?: string[];
    end?: string[];
    max?: string[];
    status?: string[];
  };
  message?: string;
  // Add a place to store the user-entered data from the server
  data?: {
    name?: string;
    number?: string;
    start?: string;
    end?: string;
    max?: string;
    status?: string;
  };
};

// Helper function to safely get a string from FormData
function getString(formData: FormData, key: string): string {
  const value = formData.get(key)
  return typeof value === 'string' ? value : ''
}

export async function createCourse(state: CourseFormState, payload: FormData) {
  // Validate form using Zod
  const name   = getString(payload, 'name')
  const number = getString(payload, 'number')
  const start  = getString(payload, 'start')
  const end    = getString(payload, 'end')
  const max    = getString(payload, 'max')
  const status = getString(payload, 'status')
  const validatedFields = CreateCourse.safeParse({ name, number, start, end, max, status });
  // Convert formData to strings/numbers
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {

    return {
      // Return the raw form data so you can re-populate fields
      data: {name, number, start, end, max, status},
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Course.',
    };
  }

  // Insert data into the database
  try {
    // Check if name exists
    const existingName = await sql`
      SELECT id FROM courses
      WHERE name = ${name}
      LIMIT 1
    `;

    // Check if number exists
    const existingNumber = await sql`
      SELECT id FROM courses
      WHERE course_number = ${number}
      LIMIT 1
    `;

      // 5) Build error object based on which is duplicated
    const errors: Record<string, string[]> = {};

    if ((existingName?.rowCount ?? 0) > 0) {
      errors.name = ['A course with that name already exists.'];
    }
    if ((existingNumber?.rowCount ?? 0) > 0) {
      errors.number = ['A course with that number already exists.'];
    }

        // If either is duplicated, return early
    if (Object.keys(errors).length > 0) {
      return {
        data: {name, number, start, end, max, status},
        errors,
        message: 'Cannot create course due to duplicate fields.',
      };
    }
    await sql`
      INSERT INTO courses (name, course_number, start_date, end_date, max_hours, status)
      VALUES (${name}, ${number}, ${start}, ${end}, ${max}, ${status})
    `;
    console.log('inserted');
  } catch {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/admin/courses ');
  redirect('/admin/courses ');
}

const UpdateCourse = BaseCourseFormSchema.omit({ id: true });

export async function updateCourse(id: string, formData: FormData) {
  const  { name, number, start, end, max, status } = UpdateCourse.parse({
    name: formData.get('name'),
    number: formData.get('number'),
    start: formData.get('start'),
    end: formData.get('end'),
    max: formData.get('max'),
    status: formData.get('status'),
  });
  console.log(name, number, start, end, max, status);
  try {
    await sql`
        UPDATE courses
        SET name = ${name}, course_number = ${number}, start_date = ${start}, end_date = ${end}, max_hours = ${max}, status = ${status}
        WHERE id = ${id}
      `;
      console.log('updated');
  } catch {
    return { message: 'Database Error: Failed to Update Course.' };
  }

  revalidatePath('/admin/courses');
  redirect('/admin/courses');
}

export async function deleteCourse(id: string) {
  try {
    await sql`DELETE FROM courses WHERE id = ${id}`;
    revalidatePath('/admin/courses');
    return { message: 'Deleted Course.' };
  } catch {
    return { message: 'Database Error: Failed to Delete Course.' };
  }
}