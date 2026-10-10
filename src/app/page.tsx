import Hero from "./components/Hero";
import AllProducts from "./components/AllProducts";
import ProductCard from "./components/ProductCard";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  categoryIcon: string;
  image: string;
  unit: string;
  today: number;
  yesterday?: number;
  change?: {
    dir: "up" | "down" | "same";
    pct: number;
  };
}

export default async function Home() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    { next: { revalidate: 300 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();

  const products: Product[] = Array.isArray(data)
    ? data
    : data.data ?? [];

  const increasedProducts = products
    .filter((product) => product.change?.dir === "up")
    .slice(0, 6);

  const decreaseProducts = products
    .filter((product) => product.change?.dir === "down")
    .slice(0, 6);

  return (
    <main className="min-h-screen">

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Hero />

        {/* দাম বেড়েছে */}
        <section className="pb-10">
          <div className="mb-5 flex items-center gap-2">
            <span aria-hidden="true" className="text-red-500">
              ▲
            </span>
            <h2 className="text-xl font-bold text-[#202b22] sm:text-2xl">
              আজ দাম বেড়েছে
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {increasedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* দাম কমেছে */}
        <section className="pb-10">
          <div className="mb-5 flex items-center gap-2">
            <span aria-hidden="true" className="text-green-600">
              ▼
            </span>
            <h2 className="text-xl font-bold text-[#202b22] sm:text-2xl">
              আজ দাম কমেছে
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {decreaseProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* সব পণ্য */}
        <div id="AllProducts" className="scroll-mt-32">
          <AllProducts products={products} />
        </div>
      </div>
    </main>
  );
}