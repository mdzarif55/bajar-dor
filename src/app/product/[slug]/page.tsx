
import Link from "next/link";
import { notFound,redirect } from "next/navigation";
import { Suspense } from "react";
import { headers } from "next/headers";
import type { Metadata } from "next";
import { auth } from "@/lib/auth";

const API_URL =
  "https://openapi.programming-hero.com/api/bazardor/products";

interface MarketPrice {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon?: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "same";
    pct: number;
  };
  markets: MarketPrice[];
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getProducts(): Promise<Product[]> {
  const response = await fetch(API_URL, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
  }

  const data: unknown = await response.json();

  if (Array.isArray(data)) {
    return data as Product[];
  }

  if (
    data &&
    typeof data === "object" &&
    "data" in data &&
    Array.isArray(data.data)
  ) {
    return data.data as Product[];
  }

  return [];
}

function formatPrice(value: number | undefined) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return "—";
  }

  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value);
}

function getUnit(unit: string) {
  const units: Record<string, string> = {
    kg: "কেজি",
    gram: "গ্রাম",
    liter: "লিটার",
    piece: "টি",
    dozen: "ডজন",
  };

  return units[unit.toLowerCase()] || unit;
}

function getMarketAverage(market: MarketPrice) {
  return (market.min + market.max) / 2;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find((item) => item.slug === slug);

  return {
    title: product
      ? `${product.nameBn} | বাজার দর`
      : "পণ্যের বিবরণ | বাজার দর",
    description: product
      ? `${product.nameBn}-এর বর্তমান দাম, বাজারভিত্তিক মূল্য এবং দামের তুলনা দেখুন।`
      : "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর দেখুন।",
  };
}

export default function ProductDetailsPage({
  params,
}: PageProps) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#f0f5f0] px-4 py-10">
          <div className="mx-auto max-w-7xl animate-pulse rounded-2xl border border-[#dce6de] bg-white p-8 text-gray-500">
            পণ্যের তথ্য লোড হচ্ছে...
          </div>
        </main>
      }
    >
      <ProductDetailsContent params={params} />
    </Suspense>
  );
}

async function ProductDetailsContent({
  params,
}: PageProps) {
  const { slug } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Login না থাকলে Sign In page-এ পাঠাবে
  if (!session) {
    redirect(`/signin?callbackURL=${encodeURIComponent(`/product/${slug}`)}`);
  }

  const products = await getProducts();

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const markets = product.markets ?? [];
  const unit = getUnit(product.unit);

  const marketMinPrices = markets.map((market) => market.min);
  const marketMaxPrices = markets.map((market) => market.max);

  const minPrice = marketMinPrices.length
    ? Math.min(...marketMinPrices)
    : product.today;

  const maxPrice = marketMaxPrices.length
    ? Math.max(...marketMaxPrices)
    : product.today;

  const averagePrice = markets.length
    ? markets.reduce(
      (total, market) => total + getMarketAverage(market),
      0,
    ) / markets.length
    : product.today;

  const changePct = product.change?.pct ?? 0;
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  const changeColor = isUp
    ? "text-red-600"
    : isDown
      ? "text-green-700"
      : "text-gray-500";

  const changeIcon = isUp ? "▲" : isDown ? "▼" : "●";

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-8 sm:py-10">
      <div className="mx-auto max-w-7xl">

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-600"
        >
          <Link
            href="/"
            className="transition hover:text-green-700"
          >
            হোম
          </Link>

          <span className="text-gray-400">›</span>

          <Link
            href={`/category/${product.category}`}
            className="transition hover:text-green-700"
          >
            {product.categoryNameBn}
          </Link>

          <span className="text-gray-400">›</span>

          <span className="font-medium text-[#202b22]">
            {product.nameBn}
          </span>
        </nav>

        {/* Product Header */}
        <section className="flex flex-col gap-5 rounded-2xl border border-[#dce6de] bg-[#fbfdfb] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="flex min-w-0 items-center gap-4 sm:gap-5">
            <div className="grid size-[88px] shrink-0 place-items-center rounded-2xl bg-[#f0f5f0] text-5xl">
              {product.image || product.categoryIcon || "🛒"}
            </div>

            <div className="min-w-0">
              <h1 className="text-2xl font-extrabold text-[#202b22] sm:text-3xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                প্রতি {unit} · {product.categoryNameBn}
              </p>

              <p className={`mt-2 text-sm ${changeColor}`}>
                {isUp
                  ? "গতকালের তুলনায় আজ দাম বেড়েছে"
                  : isDown
                    ? "গতকালের তুলনায় আজ দাম কমেছে"
                    : "দামে পরিবর্তন নেই"}{" "}
                {changeIcon} {formatPrice(Math.abs(changePct))}%
              </p>
            </div>
          </div>

          <div className="shrink-0 rounded-2xl bg-[#f0f5f0] px-6 py-4 text-center sm:min-w-[136px]">
            <p className="text-sm text-gray-500">
              আজকের দাম
            </p>

            <p className="mt-1 text-3xl font-extrabold text-[#202b22]">
              {formatPrice(product.today)}
            </p>

            <p className="mt-1 text-sm text-gray-600">
              টাকা / {unit}
            </p>

            <p className={`mt-1 text-sm font-semibold ${changeColor}`}>
              {changeIcon} {formatPrice(Math.abs(changePct))}%
            </p>
          </div>
        </section>

        {/* Price Summary */}
        <section className="mt-6 rounded-2xl border border-[#dce6de] bg-[#fbfdfb] p-5 sm:p-6">
          <h2 className="mb-4 text-xl font-bold text-[#202b22]">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <SummaryCard
              title="সর্বনিম্ন দাম"
              price={minPrice}
              unit={unit}
              description="সবচেয়ে কম দামের বাজার"
              color="text-green-700"
            />

            <SummaryCard
              title="সর্বাধিক দাম"
              price={maxPrice}
              unit={unit}
              description="সবচেয়ে বেশি দামের বাজার"
              color="text-red-600"
            />

            <SummaryCard
              title="গড় দাম"
              price={averagePrice}
              unit={unit}
              description="বাজারগুলোর আনুমানিক গড়"
              color="text-green-700"
            />
          </div>

          {/* Market Table */}
          <h2 className="mb-4 mt-7 text-xl font-bold text-[#202b22]">
            বাজারভিত্তিক আজকের দাম
          </h2>

          {markets.length > 0 ? (
            <div className="overflow-x-auto rounded-2xl border border-[#dce6de]">
              <table className="w-full min-w-[680px] border-collapse text-sm">
                <thead>
                  <tr className="bg-[#f7faf7] text-left text-gray-500">
                    <th className="px-4 py-4 font-semibold">
                      বাজার
                    </th>
                    <th className="px-4 py-4 font-semibold">
                      বিভাগ
                    </th>
                    <th className="px-4 py-4 text-right font-semibold">
                      সর্বনিম্ন
                    </th>
                    <th className="px-4 py-4 text-right font-semibold">
                      সর্বাধিক
                    </th>
                    <th className="px-4 py-4 text-right font-semibold">
                      গড়
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {markets.map((market, index) => (
                    <tr
                      key={`${market.market}-${index}`}
                      className="border-t border-[#e5ece6] transition hover:bg-[#f1f7f2] even:bg-[#f0f5f0]"
                    >
                      <td className="px-4 py-4 font-medium text-[#202b22]">
                        {market.market}
                      </td>

                      <td className="px-4 py-4 text-gray-600">
                        {market.division}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-right">
                        {formatPrice(market.min)} টাকা
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-right">
                        {formatPrice(market.max)} টাকা
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-right font-bold text-[#202b22]">
                        {formatPrice(getMarketAverage(market))} টাকা
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-[#dce6de] p-8 text-center text-gray-500">
              এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
            </div>
          )}

          <p className="mt-4 text-xs text-gray-400">
            দাম টাকা / {unit} হিসেবে দেখানো হয়েছে।
            গড় দাম সর্বনিম্ন ও সর্বাধিক দামের মধ্যবর্তী হিসাব।
          </p>
        </section>

        {/* Historical Price Comparison */}
        <section className="mt-6 rounded-2xl border border-[#dce6de] bg-[#fbfdfb] p-5 sm:p-6">
          <h2 className="text-xl font-bold text-[#202b22]">
            আগের দামের তুলনা
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            বিভিন্ন সময়ের পণ্যমূল্য
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <HistoryCard
              title="আজকের দাম"
              price={product.today}
              unit={unit}
            />

            <HistoryCard
              title="গতকালের দাম"
              price={product.yesterday}
              unit={unit}
            />

            <HistoryCard
              title="গত সপ্তাহের দাম"
              price={product.lastWeek}
              unit={unit}
            />

            <HistoryCard
              title="গত মাসের দাম"
              price={product.lastMonth}
              unit={unit}
            />
          </div>
        </section>

        {/* Back Button */}
        <div className="mt-6">
          <Link
            href={`/category/${product.category}`}
            className="inline-flex items-center gap-2 rounded-xl border border-[#dce6de] bg-white px-5 py-3 font-semibold text-[#202b22] transition hover:border-green-600 hover:bg-green-50 hover:text-green-700"
          >
            <span aria-hidden="true">←</span>
            {product.categoryIcon}
            {product.categoryNameBn}
          </Link>
        </div>
      </div>
    </main>
  );
}

function SummaryCard({
  title,
  price,
  unit,
  description,
  color,
}: {
  title: string;
  price: number;
  unit: string;
  description: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-[#dce6de] p-5">
      <p className="text-sm text-gray-500">{title}</p>

      <p className={`mt-1 text-2xl font-extrabold ${color}`}>
        {formatPrice(price)}{" "}
        <span className="text-sm font-normal">টাকা</span>
      </p>

      <p className="mt-1 text-xs text-gray-500">
        {description} · প্রতি {unit}
      </p>
    </div>
  );
}

function HistoryCard({
  title,
  price,
  unit,
}: {
  title: string;
  price: number | undefined;
  unit: string;
}) {
  return (
    <div className="rounded-xl border border-[#dce6de] bg-white p-4">
      <p className="text-sm text-gray-500">{title}</p>

      <p className="mt-2 text-xl font-bold text-[#202b22]">
        {formatPrice(price)}
      </p>

      <p className="mt-1 text-xs text-gray-400">
        টাকা / {unit}
      </p>
    </div>
  );
}

