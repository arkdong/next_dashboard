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

const CourseFormSchema = z.object({
  id: z.string(),
  name: z.string()
    .min(1, { message: 'Please enter a course name' }),
  number: z.coerce
    .number()
    .min(1, { message: 'Please enter a course number from FileMaker' }),
  start: z.string()
    .min(1, { message: 'Please choose a start date' }),
  end: z.string()
    .min(1, { message: 'Please choose a end date' }),
  max: z.coerce
    .number()
    .min(1, { message: 'Please enter a maximum hours that greater than 0' }),
  status: z.enum(['disabled', 'active'], {
      invalid_type_error: 'Please select a course status.',
    }),
});

export type CourseFormState = {
  errors?: {
    name?: string[];
    number?: string[];
    start?: string[];
    end?: string[];
    max?: string[];
    status?: string[];
  };
  message?: string | null;
};

const CreateCourse = CourseFormSchema.omit({ id: true});

export async function createCourse(prevState: CourseFormState, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateCourse.safeParse({
    name: formData.get('name'),
    number: formData.get('number'),
    start: formData.get('start'),
    end: formData.get('end'),
    max: formData.get('max'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Course.',
    };
  }

  // Prepare data for insertion into the database
  const { name, number, start, end, max, status } = validatedFields.data;
  console.log(validatedFields.data);
  // Insert data into the database
  try {
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

const UpdateCourse = CourseFormSchema.omit({ id: true });

export async function updateCourse(id: string, formData: FormData) {
  const  { name, number, start, end, max, status } = UpdateCourse.parse({
    name: formData.get('name'),
    number: formData.get('number'),
    start: formData.get('start'),
    end: formData.get('end'),
    max: formData.get('max'),
    status: formData.get('status'),
  });

  try {
    await sql`
        UPDATE courses
        SET name = ${name}, number = ${number}, start = ${start}, end = ${end}, max = ${max}, status = ${status}
        WHERE id = ${id}
      `;
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