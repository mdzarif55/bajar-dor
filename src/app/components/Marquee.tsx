import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  change: {
    dir: "up" | "down" | "same";
    pct: number;
  };
}

const Marquee = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products", {
    next: { revalidate: 300 },
  }

  );

  if (!res.ok) {
    throw new Error("Failed to fetch market prices");
  }

  const result = await res.json();

  const products: Product[] = Array.isArray(result)
    ? result
    : result.data;

  return (
    <div className="w-full overflow-hidden border-y border-gray-200 bg-white text-gray-700">
      <div className="mx-auto flex min-w-0 items-center">
        <MarqueeText
          className="py-0"
          direction="right"
          duration={15}
        >
          {products.map((product) => {
            const isUp = product.change.dir === "up";
            const isDown = product.change.dir === "down";

            return (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="inline-flex shrink-0 items-center gap-2 border-r border-gray-100 px-4 py-2 transition-colors hover:bg-green-50"
              >
                {/* Product icon */}
                <span className="text-sm" aria-hidden="true">
                  {product.image}
                </span>

                {/* Product name */}
                <span className="whitespace-nowrap text-sm">
                  {product.nameBn}
                </span>

                {/* Today's price */}
                <span className="whitespace-nowrap text-sm text-gray-500">
                  {product.today} টাকা/
                  {product.unit === "kg"
                    ? "কেজি"
                    : product.unit === "liter"
                      ? "লিটার"
                      : product.unit}
                </span>

                {/* Price change */}
                {isUp && (
                  <span className="whitespace-nowrap text-sm font-semibold text-red-500">
                    ▲ {Math.abs(product.change.pct)}%
                  </span>
                )}

                {isDown && (
                  <span className="whitespace-nowrap text-sm font-semibold text-green-600">
                    ▼ {Math.abs(product.change.pct)}%
                  </span>
                )}

                {!isUp && !isDown && (
                  <span className="whitespace-nowrap text-sm font-semibold text-gray-400">
                    ━ ০%
                  </span>
                )}
              </Link>
            );
          })}
        </MarqueeText>
      </div>
    </div>
  );
};

export default Marquee;