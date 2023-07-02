import Image from "next/image";
import Link from "next/link";
import { NavbarButton } from "./NavbarMenu";

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
      <NavbarButton current={current} />
      <div className="hidden w-full md:block md:w-auto">
        <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
          {Object.values(Pages).map((page) => NavbarLink({ page, current }))}
        </ul>
      </div>
    </div>
  </nav>
);
