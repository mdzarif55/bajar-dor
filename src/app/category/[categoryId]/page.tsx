
import { Suspense } from "react";
import ProductCard from "@/app/components/ProductCard";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn?: string;
  categoryIcon?: string;
  image: string;
  unit: string;
  today: number;
  yesterday?: number;
  change?: {
    dir: "up" | "down" | "same";
    pct: number;
  };
}

interface CategoryPageProps {
  params: Promise<{
    categoryId: string;
  }>;
}

const API_URL =
  "https://openapi.programming-hero.com/api/bazardor/products";

function CategoryLoading() {
  return (
    <main className="min-h-screen bg-[#f6f9f5]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="animate-pulse rounded-2xl bg-white p-8">
          <div className="mb-4 h-8 w-48 rounded bg-gray-200" />
          <div className="h-4 w-64 rounded bg-gray-200" />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-48 animate-pulse rounded-2xl bg-white"
            />
          ))}
        </div>
      </div>
    </main>
  );
}

async function CategoryContent({ params }: CategoryPageProps) {
  const { categoryId } = await params;

  let products: Product[] = [];

  try {
    const res = await fetch(
      `${API_URL}?category=${encodeURIComponent(categoryId)}`,
      { next: { revalidate: 300 } }
    );

    if (!res.ok) {
      throw new Error(`Products API error: ${res.status}`);
    }

    const result: unknown = await res.json();

    let items: unknown[] = [];

    if (Array.isArray(result)) {
      items = result;
    } else if (
      result !== null &&
      typeof result === "object" &&
      "data" in result &&
      Array.isArray(result.data)
    ) {
      items = result.data;
    }

    products = items as Product[];
  } catch (error) {
    console.error("Category products fetch failed:", error);

    return (
      <main className="min-h-screen bg-[#f6f9f5] p-8 text-center">
        <p className="text-red-600">
          পণ্যের তথ্য লোড করা যায়নি। কিছুক্ষণ পর আবার চেষ্টা করো।
        </p>
      </main>
    );
  }

  const categoryName = products[0]?.categoryNameBn ?? "পণ্য";
  const categoryIcon = products[0]?.categoryIcon ?? "🛒";

  return (
    <main className="min-h-screen bg-[#f6f9f5]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-6">
          <div className="mb-2 text-4xl">{categoryIcon}</div>

          <h1 className="text-2xl font-bold text-[#202b22] sm:text-3xl">
            {categoryName}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            এই ক্যাটাগরির পণ্যের আজকের বাজারদর
          </p>

          <p className="mt-3 text-sm text-gray-600">
            মোট পণ্য: {products.length}টি
          </p>
        </section>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                product={{
                  ...product,
                  categoryIcon: product.categoryIcon ?? "🛒",
                }}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
            <p className="font-semibold text-gray-700">
              এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <Suspense fallback={<CategoryLoading />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}
