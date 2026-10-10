"use client";

import Image from "next/image";
import DateDisplay from "./DateDisplay";

const Hero = () => {
  const scrollToProducts = () => {
    document.getElementById("AllProducts")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="w-full py-8">
      <div className="flex flex-col items-center justify-between gap-8 rounded-[21px] border border-[#dce6de] bg-[#fbfdfb] px-5 py-8 sm:px-8 md:flex-row md:gap-10 md:px-12 md:py-10 lg:px-10">
        <div className="w-full flex-1">
          <p className="mb-3 inline-flex rounded-full bg-[#e1f2e8] px-4 py-2 text-sm font-medium text-green-700 sm:text-base">
            <DateDisplay />
          </p>

          <h1 className="max-w-2xl text-2xl font-extrabold leading-tight tracking-tight text-[#202b22] sm:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
            বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং
            দামের পরিবর্তন এক জায়গায়।
          </p>

          <button
            type="button"
            onClick={scrollToProducts}
            className="cursor-pointer mt-7 inline-flex rounded-xl bg-green-700 px-6 py-3 font-bold text-white shadow-md transition hover:bg-green-800"
          >
            সব পণ্য দেখুন
          </button>
        </div>

        <div className="flex w-full flex-1 items-center justify-center">
          <Image
            src="/bazar-hero.svg"
            width={400}
            height={400}
            alt="ফল ও সবজির ঝুড়ি"
            priority
            className="h-auto w-full max-w-[320px] object-contain sm:max-w-[360px] md:max-w-[400px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;