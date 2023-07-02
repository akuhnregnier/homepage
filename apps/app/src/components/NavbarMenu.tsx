"use client";

import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import React from "react";
import { Pages } from "./Navbar";

export type NavbarButtonProps = {
  current: Pages;
};

export const NavbarButton = ({ current }: NavbarButtonProps) => {
  const [opened, handlers] = useDisclosure(false);
  return (
    <>
      <button
        type="button"
        className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
        aria-expanded={opened}
        onClick={handlers.toggle}
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="h-6 w-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      {opened ? (
        <div className={`block w-full md:hidden ${opened ? "" : "hidden"}`}>
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
            {Object.values(Pages).map((page) => {
              const selected = page === current;
              return (
                <li key={page}>
                  <Link
                    href={page === Pages.Home ? `/` : `/${page.toLowerCase()}`}
                    className={`block rounded py-2 pl-3 pr-4 ${
                      selected
                        ? "block rounded bg-blue-700 py-2 pl-3 pr-4 text-white dark:text-white md:bg-transparent md:p-0 md:text-blue-700 md:dark:text-blue-500"
                        : "block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                    }`}
                    aria-current={selected ? "page" : false}
                  >
                    {page}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </>
  );
};
