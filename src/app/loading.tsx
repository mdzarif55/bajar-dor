
export default function Loading() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-[#f0f5f1] px-4">
      <div className="flex flex-col items-center text-center">
        {/* Logo */}
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">
          🛒
        </div>

        {/* Brand */}
        <h2 className="text-2xl font-extrabold text-green-800">
          বাজার দর
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          নিত্যপ্রয়োজনীয় পণ্যের দাম এক নজরে
        </p>

        {/* Spinner */}
        <div className="relative mt-8 h-10 w-10">
          <div className="absolute inset-0 rounded-full border-4 border-green-100" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-green-700" />
        </div>

        {/* Loading Text */}
        <p className="mt-4 animate-pulse text-sm font-medium text-green-700">
          বাজারদরের তথ্য লোড হচ্ছে...
        </p>
      </div>
    </main>
  );
}
