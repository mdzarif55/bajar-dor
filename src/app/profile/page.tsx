"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.name) setName(user.name);
  }, [user?.name]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setError("");

    const updatedName = name.trim();

    if (!updatedName) {
      setError("আপনার নাম লিখুন।");
      return;
    }

    setSaving(true);

    try {
      const { error: updateError } = await authClient.updateUser({
        name: updatedName,
      });

      if (updateError) {
        setError(updateError.message || "নাম আপডেট করা যায়নি।");
        return;
      }

      setMessage("আপনার নাম সফলভাবে আপডেট হয়েছে।");
    } catch (err) {
      console.error("Profile update error:", err);
      setError("সার্ভারের সঙ্গে যোগাযোগ করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setSaving(false);
    }
  }

  if (isPending) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f0f5f0] p-5">
        <p className="animate-pulse text-gray-500">প্রোফাইল লোড হচ্ছে...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f0f5f0] px-4">
        <div className="w-full max-w-md rounded-2xl border border-[#dce6de] bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-[#202b22]">
            প্রোফাইল দেখতে সাইন ইন করুন
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            আপনার অ্যাকাউন্টে প্রবেশ করে প্রোফাইল আপডেট করুন।
          </p>
          <Link
            href="/signin"
            className="mt-6 inline-flex rounded-xl bg-green-700 px-6 py-3 font-bold text-white transition hover:bg-green-800"
          >
            সাইন ইন করুন
          </Link>
        </div>
      </main>
    );
  }

  const initial = name.trim().charAt(0).toUpperCase() || "U";

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-2xl">
        <div className="mb-7">
          
          <h1 className="mt-2 text-3xl font-extrabold text-[#202b22] sm:text-4xl">
            আমার প্রোফাইল
          </h1>
          <p className="mt-2 text-gray-500">
            আপনার ব্যক্তিগত তথ্য দেখুন এবং নাম হালনাগাদ করুন।
          </p>
        </div>

        <section className="overflow-hidden rounded-3xl border border-[#dce6de] bg-white shadow-sm">
          <div className="flex items-center gap-4 bg-[#f7faf7] p-6 sm:p-8">
            <div className="grid size-20 shrink-0 place-items-center rounded-full bg-green-700 text-3xl font-bold text-white shadow-sm">
              {initial}
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-xl font-bold text-[#202b22]">
                {user.name || "ব্যবহারকারী"}
              </h2>
              <p className="mt-1 break-all text-sm text-gray-500">
                {user.email}
              </p>
              <span className="mt-2 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                সদস্য
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 p-6 sm:p-8">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-[#202b22]"
              >
                আপনার নাম
              </label>

              <input
                id="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={100}
                placeholder="যেমন: রহিম উদ্দিন"
                className="h-12 w-full rounded-xl border border-gray-300 px-4 text-sm outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
              />

              <p className="mt-2 text-xs text-gray-500">
                বাংলা অথবা ইংরেজিতে আপনার নাম লিখতে পারেন।
              </p>
            </div>

            

            {error && (
              <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}

            {message && (
              <p role="status" className="rounded-xl bg-green-50 p-3 text-sm text-green-800">
                {message}
              </p>
            )}

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <button
                type="submit"
                disabled={saving || name.trim() === user.name}
                className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-green-700 px-5 py-3 font-bold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "আপডেট হচ্ছে..." : "নাম হালনাগাদ করুন"}
              </button>

              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                হোমে ফিরে যান
              </Link>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}