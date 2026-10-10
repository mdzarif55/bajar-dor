import Link from "next/link";
import { Suspense } from "react";
import NavLinks from "./NavLinks";
import DateDisplay from "./DateDisplay";
import UserInfo from "./UserInfo";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-base-100 text-base-content">
      <div className="w-full border-b border-gray-200 bg-base-100">
        <nav className="mx-auto flex min-h-[92px] w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
            aria-label="বাজার দর হোম"
          >
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-green-700 text-2xl text-white">
              🛒
            </span>

            <span className="block shrink-0 leading-tight">
              <span className="block whitespace-nowrap text-2xl font-extrabold">
                বাজার দর
              </span>
              <span className="mt-1 block whitespace-nowrap text-sm text-gray-500">
                <DateDisplay />
              </span>
            </span>
          </Link>

          <UserInfo/>
        </nav>
      </div>

      <Suspense
        fallback={
          <nav className="h-14 border-b border-gray-200 bg-base-100" />
        }
      >
        <NavLinks />
      </Suspense>
    </header>
  );
};

export default Navbar;