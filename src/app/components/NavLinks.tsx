"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export default function NavLinks() {
  const pathname = usePathname();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchCategories() {
      try {
        const res = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/categories"
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch categories: ${res.status}`);
        }

        const data: Category[] = await res.json();

        if (!cancelled) {
          setCategories(data);
        }
      } catch (error) {
        console.error("Category fetch error:", error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchCategories();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <nav className="mx-auto w-full max-w-7xl border-b border-gray-200 bg-base-100">
      <div className="overflow-x-auto px-4 sm:px-8 lg:px-12">
        <div className="flex w-max items-center gap-3 py-3 sm:gap-4">
          {loading && (
            <span className="px-3 py-2 text-sm text-gray-500">
              ক্যাটাগরি লোড হচ্ছে...
            </span>
          )}

          {categories.map((category) => {
            const href = `/category/${category.slug}`;
            const isActive = pathname === href;

            return (
              <Link
                key={category.id}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                  isActive
                    ? "bg-green-700 text-white"
                    : "text-base-content hover:bg-green-50 hover:text-green-800"
                }`}
              >
                <span aria-hidden="true">{category.icon}</span>
                <span>{category.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}