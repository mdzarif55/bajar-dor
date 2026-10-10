"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

type Product = {
    id: number;
    slug: string;
    nameBn: string;
    categoryIcon: string;
    image: string;
    unit: string;
    today: number;
    change?: {
        dir: string;
        pct: number;
    };
};

export default function AllProducts({
    products,
}: {
    products: Product[];
}) {
    const [sortOrder, setSortOrder] = useState("default");

    const sortedProducts = [...products].sort((a, b) => {
        if (sortOrder === "low-high") {
            return a.today - b.today;
        }

        if (sortOrder === "high-low") {
            return b.today - a.today;
        }

        return 0;
    });

    return (
        <section>
            {/* Heading and filter */}
            <div className="mb-6 flex items-end justify-between gap-3">
                <div>
                    <h2 className="text-2xl font-bold text-[#202b22]">
                        সব পণ্য
                    </h2>

                    <p className="mt-4 text-sm text-gray-500">
                        মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
                    </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                    <label
                        htmlFor="sort"
                        className="text-sm text-gray-600"
                    >
                        সাজান
                    </label>

                    <select
                        id="sort"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="select select-bordered h-10 min-h-10 rounded-xl border-2 border-[#55aa69] bg-[#fbfdfb] text-sm text-[#202b22] outline-none"
                    >
                        <option value="default">ডিফল্ট</option>
                        <option value="low-high">দাম: কম থেকে বেশি</option>
                        <option value="high-low">দাম: বেশি থেকে কম</option>
                    </select>
                </div>
            </div>

            {/* Product cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>
        </section>
    );
}




{/* <div
                        key={product.id}
                        className="rounded-[20px] border border-[#dce5dd] bg-[#fbfdfb] p-4 transition hover:-translate-y-1 hover:shadow-md"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-[#f0f5f0] text-2xl">
                                {product.image || product.categoryIcon}
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-[#202b22]">
                                    {product.nameBn}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
                                </p>
                            </div>
                        </div>

                        <div className="mt-3 flex items-end justify-between">
                            <div>
                                <p className="text-sm text-gray-500">আজকের দাম</p>
                                <p className="text-xl font-bold text-[#202b22]">
                                    {product.today.toLocaleString("bn-BD")} টাকা
                                </p>
                            </div>

                            <span className="rounded-full bg-[#f0f5f0] px-3 py-1 text-xs">
                                {product.change?.dir === "up" ? (
                                    <span className="text-red-500">
                                        ▲ {product.change.pct.toLocaleString("bn-BD")}%
                                    </span>
                                ) : product.change?.dir === "down" ? (
                                    <span className="text-green-600">
                                        ▼ {product.change.pct.toLocaleString("bn-BD")}%
                                    </span>
                                ) : (
                                    <span className="text-gray-600">— ০.০%</span>
                                )}
                            </span>
                        </div>
                    </div> */}