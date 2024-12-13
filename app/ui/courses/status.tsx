import { CheckIcon, NoSymbolIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function CourseStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-red-200 text-grey-500': status === 'disabled',
          'bg-green-500 text-white': status === 'active',
        },
      )}
    >
      {status === 'disabled' ? (
        <>
          Disabled
          <NoSymbolIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'active' ? (
        <>
          Active
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
