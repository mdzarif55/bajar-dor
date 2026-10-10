import Link from "next/link";
import NavLinks from "./NavLinks";
import DateDisplay from "./DateDisplay";

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

          <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-5">
            <Link
              href="/signin"
              className="btn btn-ghost btn-sm font-bold sm:btn-md"
            >
              সাইন ইন
            </Link>

            <Link
              href="/signup"
              className="btn btn-sm rounded-xl border-0 bg-green-700 px-4 font-bold text-white hover:bg-green-800 sm:btn-md sm:px-5"
            >
              সাইন আপ
            </Link>
          </div>
        </nav>
      </div>

      <NavLinks />
    </header>
  );
};

export default Navbar;