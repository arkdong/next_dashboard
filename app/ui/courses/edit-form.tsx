'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import {
  CheckIcon,
  NoSymbolIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  CalendarIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

import { Button } from '@/app/ui/button';
import { Course } from '@/app/lib/definitions';
import { CourseFormState, updateCourse } from '@/app/lib/actions';

export default function EditCourseForm({ course }: { course: Course }) {
  // Prepare initial state from the existing course
  const initialState: CourseFormState = {
    data: {
      id: course.id,
      name: course.name ?? '',
      number: course.course_number?.toString() ?? '',
      start: course.start_date
        ? new Date(course.start_date).toISOString().split('T')[0]
        : '',
      end: course.end_date
        ? new Date(course.end_date).toISOString().split('T')[0]
        : '',
      max: course.max_hours?.toString() ?? '',
      status: course.status ?? 'disabled',
    },
    errors: {},
    message: '',
  };

  // We tie the updateCourse action to our local state:
  const [state, formAction] = useActionState(updateCourse, initialState);

  return (
    <form action={formAction}>
      {/* Hidden input for ID */}
      <input type="hidden" name="id" value={state.data?.id} />

      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* COURSE NAME */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Course Name
          </label>
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter course name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={state.data?.name ?? ''}
              aria-describedby="name-error"
            />
            <AcademicCapIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name?.map((error) => (
              <p key={error} className="mt-2 text-sm text-red-500">
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* COURSE NUMBER */}
        <div className="mb-4">
          <label htmlFor="number" className="mb-2 block text-sm font-medium">
            Course Number (FileMaker)
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="number"
              name="number"
              type="number"
              step="0.01"
              placeholder="Enter course number same as in FileMaker"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={state.data?.number ?? ''}
              aria-describedby="number-error"
            />
            <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="number-error" aria-live="polite" aria-atomic="true">
            {state.errors?.number?.map((error) => (
              <p key={error} className="mt-2 text-sm text-red-500">
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* COURSE START DATE */}
        <div className="mb-4">
          <label htmlFor="start" className="mb-2 block text-sm font-medium">
            Course Start Date
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="start"
              name="start"
              type="date"
              placeholder="Enter course start date"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={state.data?.start ?? ''}
              aria-describedby="start-error"
            />
            <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="start-error" aria-live="polite" aria-atomic="true">
            {state.errors?.start?.map((error) => (
              <p key={error} className="mt-2 text-sm text-red-500">
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* COURSE END DATE */}
        <div className="mb-4">
          <label htmlFor="end" className="mb-2 block text-sm font-medium">
            Course End Date
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="end"
              name="end"
              type="date"
              placeholder="Enter course end date"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={state.data?.end ?? ''}
              aria-describedby="end-error"
            />
            <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="end-error" aria-live="polite" aria-atomic="true">
            {state.errors?.end?.map((error) => (
              <p key={error} className="mt-2 text-sm text-red-500">
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* COURSE MAX HOURS */}
        <div className="mb-4">
          <label htmlFor="max" className="mb-2 block text-sm font-medium">
            Course Maximum Hours
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="max"
              name="max"
              type="number"
              step="0.01"
              placeholder="Enter the maximum hours for the course"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={state.data?.max ?? ''}
              aria-describedby="max-error"
            />
            <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="max-error" aria-live="polite" aria-atomic="true">
            {state.errors?.max?.map((error) => (
              <p key={error} className="mt-2 text-sm text-red-500">
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* COURSE STATUS */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">Course Status</legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              {/* Disabled */}
              <div className="flex items-center">
                <input
                  id="disabled"
                  name="status"
                  type="radio"
                  value="disabled"
                  defaultChecked={state.data?.status === 'disabled'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="disabled"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-200 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Disabled <NoSymbolIcon className="h-4 w-4" />
                </label>
              </div>
              {/* Active */}
              <div className="flex items-center">
                <input
                  id="active"
                  name="status"
                  type="radio"
                  value="active"
                  defaultChecked={state.data?.status === 'active'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="active"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Active <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status?.map((error) => (
              <p key={error} className="mt-2 text-sm text-red-500">
                {error}
              </p>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Submission Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/admin/courses"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Update Course</Button>
      </div>

      {/* Display a general message if needed */}
      {/* {state.message && (
        <p className="mt-4 text-sm font-semibold text-red-600">{state.message}</p>
      )} */}
    </form>
  );
}
