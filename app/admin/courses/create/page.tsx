import Form from '@/app/ui/courses/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Course',
};

export default async function Page() {
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