import EditCourseForm from '@/app/ui/courses/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchCourseById } from '@/app/lib/data';
import { notFound } from 'next/navigation';


export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const course = await fetchCourseById(id);
    if (!course) {
        notFound();
    }
    return (
        <main>
        <Breadcrumbs
            breadcrumbs={[
            { label: 'Courses', href: '/dashboard/courses' },
            {
                label: 'Edit Course',
                href: `/dashboard/courses/${id}/edit`,
                active: true,
            },
            ]}
        />
        <EditCourseForm course={course} />
        </main>
    );
}