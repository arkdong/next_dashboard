import Form from '@/app/ui/courses/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';

export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Courses', href: '/admin/courses' },
          {
            label: 'Create Course',
            href: '/admin/courses/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}