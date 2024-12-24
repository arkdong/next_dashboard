'use client';

import { Course } from '@/app/lib/definitions';
import {
  CheckIcon,
  NoSymbolIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  CalendarIcon,
  ClockIcon,
}from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateCourse } from '@/app/lib/actions';


export default function EditCourseForm({course}: { course: Course; }) {
  const updateCourseWithId = updateCourse.bind(null, course.id);
  return (
    <form action={updateCourseWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
          Course Name
          </label>
          <div className="relative">
            <input
                id="name"
                name="name"
                type="string"
                placeholder="Enter course name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={course.name}
              />
            <AcademicCapIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Course Number */}
        <div className="mb-4">
          <label htmlFor="number" className="mb-2 block text-sm font-medium">
            Course Number (FileMaker)
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="number"
                name="number"
                type="number"
                step="0.01"
                placeholder="Enter course number same as in FileMaker"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={course.course_number}
              />
              <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Course Start Date */}
        <div className="mb-4">
          <label htmlFor="start" className="mb-2 block text-sm font-medium">
            Course Start Date
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="start"
                name="start"
                type="date"
                placeholder="Enter course start date"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={
                  course.start_date
                    ? new Date(course.start_date).toISOString().split('T')[0]
                    : ''
                }
              />
              <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Course End Date */}
        <div className="mb-4">
          <label htmlFor="end" className="mb-2 block text-sm font-medium">
            Course End Date
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="end"
                name="end"
                type="date"
                placeholder="Enter course end date"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={
                  course.end_date
                    ? new Date(course.end_date).toISOString().split('T')[0]
                    : ''
                }
              />
              <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Course Max Hours */}
        <div className="mb-4">
          <label htmlFor="hours" className="mb-2 block text-sm font-medium">
            Course Maximum Hours
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="max"
                name="max"
                type="number"
                step="0.01"
                placeholder="Enter the maximum hours for the course"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={course.max_hours}
              />
              <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Course Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Course Status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="disabled"
                  name="status"
                  type="radio"
                  value="disabled"
                  defaultChecked={course.status === 'disabled'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="disabled"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-200 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Disabled <NoSymbolIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="active"
                  name="status"
                  type="radio"
                  value="active"
                  defaultChecked={course.status === 'active'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="status-error"
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
        </fieldset>

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/admin/courses"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Invoice</Button>
      </div>
    </form>
  );
}
