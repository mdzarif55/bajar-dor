
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-green-100 bg-white mt-15">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 py-5 sm:px-6 md:flex-row md:items-center lg:px-8">
        {/* Left Side */}
        <p className="text-sm font-medium text-gray-700">
          <span className="font-bold text-green-700">বাজার দর</span>
          <span className="mx-2 text-gray-300">—</span>
          প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        {/* Right Side */}
        <p className="text-xs leading-6 text-gray-500 md:max-w-md md:text-right sm:text-sm">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;
