
"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { redirect, notFound } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user?.name]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const updatedName = name.trim();

    if (!updatedName) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    if (updatedName === user?.name) {
      toast.error("নামে কোনো পরিবর্তন করা হয়নি।");
      return;
    }

    setSaving(true);

    try {
      const { error } = await authClient.updateUser({
        name: updatedName,
      });

      if (error) {
        toast.error(error.message || "নাম আপডেট করা যায়নি।");
        return;
      }

      toast.success("আপনার নাম সফলভাবে আপডেট হয়েছে!");

      router.refresh();
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error("সার্ভারের সঙ্গে যোগাযোগ করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setSaving(false);
    }
  }

  async function handleSignOut() {
    if (signingOut) return;

    setSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে!");

      router.replace("/");
      router.refresh();
    } catch {
      toast.error("সার্ভারের সঙ্গে যোগাযোগ করা যায়নি।");
    } finally {
      setSigningOut(false);
    }
  }

  if (isPending) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f0f5f0] p-5">
        <p className="animate-pulse text-gray-500">
          প্রোফাইল লোড হচ্ছে...
        </p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f0f5f0] px-4">
        <div className="w-full max-w-md rounded-2xl border border-[#dce6de] bg-white p-8 text-center shadow-sm">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-green-100 text-green-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 21a8 8 0 0 0-16 0m8-10a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
              />
            </svg>
          </div>

          <h1 className="mt-5 text-2xl font-bold text-[#202b22]">
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
          {/* Profile header */}
          <div className="flex flex-col gap-5 bg-[#f7faf7] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex min-w-0 items-center gap-4">
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

               
              </div>
            </div>

            {/* Sign Out button */}
            <button
              type="button"
              onClick={handleSignOut}
              disabled={signingOut}
              className="cursor-pointer inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-bold text-red-600 transition hover:border-red-300 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {signingOut ? (
                <>
                  <span className="loading loading-spinner loading-xs" />
                  সাইন আউট হচ্ছে...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 17l5-5-5-5m5 5H3m9-9h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5"
                    />
                  </svg>
                  সাইন আউট
                </>
              )}
            </button>
          </div>

          {/* Update profile form */}
          <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
            <div>
              <h3 className="text-lg font-bold text-[#202b22]">
                ব্যক্তিগত তথ্য
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                প্রয়োজন অনুযায়ী আপনার নাম পরিবর্তন করুন।
              </p>
            </div>

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

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-[#202b22]"
              >
                ইমেইল ঠিকানা
              </label>

              <input
                id="email"
                type="email"
                value={user.email}
                readOnly
                className="h-12 w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-500 outline-none"
              />

              <p className="mt-2 text-xs text-gray-500">
                ইমেইল ঠিকানা এই ফর্ম থেকে পরিবর্তন করা যাবে না।
              </p>
            </div>

            <div className="flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row">
              <button
                type="submit"
                disabled={
                  saving ||
                  !name.trim() ||
                  name.trim() === (user.name || "")
                }
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-bold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    আপডেট হচ্ছে...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z"
                      />
                    </svg>
                    নাম হালনাগাদ করুন
                  </>
                )}
              </button>

              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m3 10 9-7 9 7M5 9v11h14V9M9 20v-7h6v7"
                  />
                </svg>
                হোমে ফিরে যান
              </Link>
            </div>
          </form>
        </section>

        <p className="mt-5 text-center text-xs text-gray-400">
          আপনার অ্যাকাউন্টের তথ্য নিরাপদে রাখুন।
        </p>
      </div>
    </main>
  );
}
