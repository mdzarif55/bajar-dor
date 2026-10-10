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

interface ProductCardProps {
  product: Product;
}

const unitLabels: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  piece: "পিস",
  dozen: "ডজন",
  gram: "গ্রাম",
  packet: "প্যাকেট",
  bottle: "বোতল",
};

export default function ProductCard({ product }: ProductCardProps) {
  const unitLabel = unitLabels[product.unit] ?? product.unit;

  const changeDirection = product.change?.dir;
  const changePercentage = product.change?.pct;

  const isUp = changeDirection === "up";
  const isDown = changeDirection === "down";
  const isSame = changeDirection === "same";

  return (
    <article className="rounded-[20px] border border-[#dce5dd] bg-[#fbfdfb] p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      {/* Product Info */}
      <div className="flex items-center gap-3">
        <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl bg-[#f0f5f0] text-2xl">
          {product.image || product.categoryIcon || "🛒"}
        </div>

        <div className="min-w-0">
          <h3 className="text-lg font-bold text-[#202b22]">
            {product.nameBn}
          </h3>

          <p className="text-sm text-gray-500">
            প্রতি {unitLabel}
          </p>
        </div>
      </div>

      {/* Price */}
      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <p className="text-sm text-gray-500">আজকের দাম</p>

          <p className="text-xl font-bold text-[#202b22]">
            ৳{product.today.toLocaleString("bn-BD")}
          </p>

          {/* {product.yesterday !== undefined && (
            <p className="mt-1 text-xs text-gray-500">
              গতকাল: ৳{product.yesterday.toLocaleString("bn-BD")}
            </p>
          )} */}
        </div>

        <span
          className={`mb-1 inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-medium ${
            isUp
              ? "bg-red-50 text-red-600"
              : isDown
                ? "bg-green-50 text-green-600"
                : "bg-gray-100 text-gray-600"
          }`}
        >
          {isUp ? (
            <>▲ {changePercentage?.toLocaleString("bn-BD") ?? "০"}%</>
          ) : isDown ? (
            <>▼ {changePercentage?.toLocaleString("bn-BD") ?? "০"}%</>
          ) : isSame ? (
            <>— ০.০%</>
          ) : (
            <>—</>
          )}
        </span>
      </div>
    </article>
  );
}