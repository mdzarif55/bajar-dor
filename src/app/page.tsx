import Marquee from "./components/Marquee";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f0f5f1]">
      {/* Market Price Marquee */}
      <Marquee />

      {/* Main Content Container */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <Hero />

        {/* Today's Price Increased */}
        <section className="pb-10 ">
          <div className="mb-5 flex items-center gap-2">
            <span aria-hidden="true" className="text-red-500"> ▲</span>

            <h2 className="text-xl font-bold text-[#202b22] sm:text-2xl">
              আজ দাম বেড়েছে
            </h2>
          </div>

          {/* Product cards will go here */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Products */}
          </div>
        </section>
      </div>
    </main>
  );
}