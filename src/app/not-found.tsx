
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#f0f5f1] px-4 py-16">
      <div className="w-full max-w-lg rounded-2xl border border-green-100 bg-white px-6 py-12 text-center shadow-sm sm:px-10">
        {/* Logo */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-4xl">
          🛒
        </div>

        {/* Error Code */}
        <h1 className="text-7xl font-extrabold tracking-tight text-green-700 sm:text-8xl">
          404
        </h1>

        <h2 className="mt-5 text-2xl font-bold text-gray-800 sm:text-3xl">
          পেজটি খুঁজে পাওয়া যায়নি!
        </h2>

        <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-gray-500 sm:text-base">
          দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যাচ্ছে না।
          হয়তো লিংকটি ভুল, অথবা পেজটি সরিয়ে ফেলা হয়েছে।
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            <span>⌂</span>
            হোম পেজে ফিরে যান
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-700 transition hover:border-green-300 hover:bg-green-50"
          >
            বাজার দর দেখুন
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-10 border-t border-gray-100 pt-5">
          <p className="text-sm text-gray-400">
            🥬 সঠিক বাজারদর, সবার অধিকার।
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Bazar Dor — আপনার নিত্যদিনের বাজার সঙ্গী
          </p>
        </div>
      </div>
    </main>
  );
}
