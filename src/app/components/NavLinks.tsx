
import Link from "next/link";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinks = async () => {
  try {
    const res = await fetch(
      "https://api.abcz.workers.dev/api/bazardor/categories",
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.status}`);
    }

    const categories: Category[] = await res.json();

    return (
      <nav className="w-full bg-base-100 max-w-7xl mx-auto">
        <div className="mx-auto max-w-[1540px] overflow-x-auto px-4 sm:px-8 lg:px-12">
          <div className="flex w-max items-center gap-7 py-5 sm:gap-9 lg:gap-11">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="flex shrink-0 items-center whitespace-nowrap font-semibold text-sm text-base-content transition-colors duration-200 hover:text-green-700"
              >
                <span aria-hidden="true">{category.icon}</span>
                <span>{category.nameBn}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    );
  } catch (error) {
    console.error("Category fetch error:", error);

    return (
      <nav className="border-b border-base-300 px-4 py-4 text-sm text-base-content/60">
        ক্যাটাগরি লোড করা যায়নি।
      </nav>
    );
  }
};

export default NavLinks;
