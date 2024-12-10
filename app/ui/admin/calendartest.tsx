'use client'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, EllipsisHorizontalIcon } from '@heroicons/react/20/solid'

export default function Calendar() {
  const today = new Date()
  return (
    <div className="flex h-full flex-col border-b border-gray-200 m-1 p-1 ring-1 ring-black rounded-lg">
      <header className="flex flex-none items-center justify-between border-b border-gray-200 px-6 py-4 bg-gray-200 rounded-lg">
        <h1 className="text-base font-semibold leading-6 text-gray-900">
          <time dateTime="2022-01">{today.toLocaleString('en-EU', {month:'long'})} {today.getFullYear()}</time>
        </h1>
        <div className="flex items-center">
          <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
            <button
              type="button"
              className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
            >
              <span className="sr-only">Previous week</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
            >
              This Week
            </button>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <button
              type="button"
              className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
            >
              <span className="sr-only">Next week</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden md:ml-4 md:flex md:items-center">
            <Menu as="div" className="relative">
              <MenuButton
                type="button"
                className="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Week view
                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="py-1">
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    >
                      Day view
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    >
                      Week view
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    >
                      Month view
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    >
                      Year view
                    </a>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
            <div className="ml-6 h-6 w-px bg-gray-300" />
            <button
              type="button"
              className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add event
            </button>
          </div>
          <Menu as="div" className="relative ml-6 md:hidden">
            <MenuButton className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Open menu</span>
              <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
            </MenuButton>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    Create event
                  </a>
                </MenuItem>
              </div>
              <div className="py-1">
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    Go to today
                  </a>
                </MenuItem>
              </div>
              <div className="py-1">
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    Day view
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    Week view
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    Month view
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    Year view
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
      </header>
      <div className="isolate flex flex-auto flex-col overflow-auto bg-white">
        <div className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full">
          <div className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-7">
            <div className="-mr-px hidden grid-cols-6 divide-x divide-gray-300 border-r border-gray-300 text-sm leading-6 text-black sm:grid">
              <div className="col-end-1 w-14" />
              <div className="flex items-center justify-center py-3"><span>Mon <span className="items-center justify-center font-semibold text-gray-900">10</span></span></div>
              <div className="flex items-center justify-center py-3"><span>Tue <span className="items-center justify-center font-semibold text-gray-900">11</span></span></div>
              <div className="flex items-center justify-center py-3"><span className="flex items-baseline">Wed{' '}<span className="ml-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">12</span></span></div>
              <div className="flex items-center justify-center py-3"><span>Thu <span className="items-center justify-center font-semibold text-gray-900">13</span></span></div>
              <div className="flex items-center justify-center py-3"><span>Fri <span className="items-center justify-center font-semibold text-gray-900">14</span></span></div>
              <div className="flex items-center justify-center py-3"><span>Sat <span className="items-center justify-center font-semibold text-gray-900">15</span></span></div>
            </div>
          </div>
          <div className="flex flex-auto">
            <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-300" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Horizontal lines */}
              <div className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-300" style={{ gridTemplateRows: 'repeat(16, minmax(2rem, 1fr))' }}>
                <div className="row-end-1 h-8"></div>
                <div><div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-600">9 AM</div></div>
                <div />
                <div><div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-600">10 AM</div></div>
                <div />
                <div><div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-600">11 AM</div></div>
                <div />
                <div><div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-600">12 PM</div></div>
                <div />
                <div><div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-600">1 PM</div></div>
                <div />
                <div><div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-600">2 PM</div></div>
                <div />
                <div><div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-600">3 PM</div></div>
                <div />
                <div><div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-600">4 PM</div></div>
                <div />
                <div><div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-600">5 PM</div></div>

              </div>

              {/* Vertical lines */}
              <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-6 grid-rows-1 divide-x divide-gray-300 sm:grid sm:grid-cols-6">
                <div className="col-start-1 row-span-full" />
                <div className="col-start-2 row-span-full" />
                <div className="col-start-3 row-span-full" />
                <div className="col-start-4 row-span-full" />
                <div className="col-start-5 row-span-full" />
                <div className="col-start-6 row-span-full" />
                <div className="col-start-7 row-span-full w-7" />
              </div>

              {/* Events */}
              <ol
                className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-6 sm:pr-7"
                style={{ gridTemplateRows: '2rem repeat(64, minmax(0.5rem, 1fr)) auto' }}
              >
                <li className="relative mt-px flex sm:col-start-3" style={{ gridRow: '3 / span 10' }}>
                  <a
                    href="#"
                    className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100"
                  >
                    <p className="order-1 font-semibold text-blue-700">Breakfast</p>
                    <p className="text-blue-500 group-hover:text-blue-700">
                      <time dateTime="2022-01-12T06:00">6:00 AM</time>
                    </p>
                  </a>
                </li>
                <li className="relative mt-px flex sm:col-start-4" style={{ gridRow: '2 / span 16' }}>
                  <a
                    href="#"
                    className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs leading-5 hover:bg-pink-100"
                  >
                    <p className="order-1 font-semibold text-pink-700">Flight to Paris</p>
                    <p className="text-pink-500 group-hover:text-pink-700">
                      <time dateTime="2022-01-12T07:30">7:30 AM</time>
                    </p>
                  </a>
                </li>
                <li className="relative mt-px hidden sm:col-start-6 sm:flex" style={{ gridRow: '2 / span 2' }}>
                  <a
                    href="#"
                    className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-gray-100 p-2 text-xs leading-5 hover:bg-gray-200"
                  >
                    <p className="order-1 font-semibold text-gray-700">Meeting with design team at Disney</p>
                    <p className="text-gray-500 group-hover:text-gray-700">
                      <time dateTime="2022-01-15T10:00">10:00 AM</time>
                    </p>
                  </a>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}