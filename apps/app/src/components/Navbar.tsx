import Image from "next/image";
import Link from "next/link";

export enum Pages {
  Home = "Home",
  About = "About",
  Publications = "Publications",
}

export type NavbarProps = {
  current: Pages;
};

const NavbarLink = ({ page, current }: { page: Pages; current: Pages }) => {
  const selected = page === current;
  return (
    <li key={page}>
      <Link
        href={page === Pages.Home ? `/` : `/${page.toLowerCase()}`}
        className={`block rounded py-2 pl-3 pr-4 ${
          selected
            ? "bg-blue-700 text-white dark:text-white md:bg-transparent md:p-0 md:text-blue-700 md:dark:text-blue-500"
            : "text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
        }`}
        aria-current={selected ? "page" : false}
      >
        {page}
      </Link>
    </li>
  );
};

export const Navbar = ({ current }: NavbarProps) => (
  <nav className="border-gray-200 bg-white dark:bg-gray-900">
    <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
      <Link href="/" className="flex items-center">
        <Image
          src="https://avatars.githubusercontent.com/u/20064887?v=4"
          width={20}
          height={20}
          className="mr-2 h-10 w-10 rounded-full"
          alt="akuhnregnier"
        />
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">akuhnregnier</span>
      </Link>
      <button
        data-collapse-toggle="navbar-default"
        type="button"
        className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
        aria-controls="navbar-default"
        aria-expanded="false"
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
      <div className="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
          {Object.values(Pages).map((page) => NavbarLink({ page, current }))}
        </ul>
      </div>
    </div>
  </nav>
);