"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SigninPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | "github" | null>(
    null
  );
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    setLoading(true);

    try {
      const { data, error: authError } = await authClient.signIn.email({
        email: email.trim(),
        password,
        callbackURL: "/",
      });

      if (authError) {
        setError(
          authError.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়। আবার চেষ্টা করো।"
        );
        return;
      }

      if (data) {
        router.push("/");
        router.refresh();
      } else {
        setError("সাইন ইন সম্পন্ন হয়েছে কি না নিশ্চিত হওয়া যায়নি। আবার চেষ্টা করো।");
      }
    } catch (err) {
      console.error("Signin error:", err);
      setError("সার্ভারের সঙ্গে যোগাযোগ করা যায়নি। পরে আবার চেষ্টা করো।");
    } finally {
      setLoading(false);
    }
  }

  async function handleSocialSignin(provider: "google" | "github") {
    setError("");
    setSocialLoading(provider);

    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });
    } catch (err) {
      console.error(`${provider} signin error:`, err);
      setError(
        `${provider === "google" ? "Google" : "GitHub"} দিয়ে সাইন ইন করা যায়নি। কনফিগারেশন পরীক্ষা করো।`
      );
      setSocialLoading(null);
    }
  }

  const busy = loading || socialLoading !== null;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f0f5f0] px-4 py-10">
      <div className="w-full max-w-[456px]">
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#202b22] sm:text-4xl">
            সাইন ইন করুন
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            আপনার অ্যাকাউন্টে প্রবেশ করে বাজারের বিস্তারিত দাম দেখুন।
          </p>
        </div>

        <div className="rounded-[20px] border border-[#dce6de] bg-[#fbfdfb] p-5 shadow-sm sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-[#202b22]"
              >
                ইমেইল
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={busy}
                className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-2 focus:ring-green-100 disabled:opacity-60"
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-[#202b22]"
                >
                  পাসওয়ার্ড
                </label>

                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-green-700 hover:text-green-800 hover:underline"
                >
                  পাসওয়ার্ড ভুলে গেছেন?
                </Link>
              </div>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="আপনার পাসওয়ার্ড লিখুন"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={busy}
                  className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-3.5 pr-20 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-2 focus:ring-green-100 disabled:opacity-60"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute inset-y-0 right-3 text-xs font-semibold text-green-800"
                  aria-label={showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
                >
                  {showPassword ? "লুকান" : "দেখুন"}
                </button>
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="flex min-h-11 w-full items-center justify-center rounded-lg bg-green-700 py-3 font-bold text-white shadow-sm transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন করুন"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-sm text-gray-500">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleSocialSignin("google")}
              disabled={busy}
              className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-gray-300 px-2 text-sm font-medium text-[#202b22] transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="font-bold text-base text-blue-600">G</span>
              <span>
                {socialLoading === "google" ? "অপেক্ষা করো..." : "Google দিয়ে সাইন ইন"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialSignin("github")}
              disabled={busy}
              className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-gray-300 px-2 text-sm font-medium text-[#202b22] transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.7 1.15 1.7 1.15.99 1.69 2.6 1.2 3.23.92.1-.72.39-1.2.7-1.48-2.47-.28-5.06-1.24-5.06-5.5 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.04-1.14 3.04-1.14.61 1.53.23 2.67.12 2.95.71.78 1.14 1.77 1.14 2.99 0 4.27-2.6 5.22-5.08 5.49.4.35.75 1.02.75 2.06v3.09c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
              </svg>
              <span>
                {socialLoading === "github" ? "অপেক্ষা করো..." : "GitHub দিয়ে সাইন ইন"}
              </span>
            </button>
          </div>

          <p className="mt-5 text-center text-sm text-gray-500">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-semibold text-green-700 underline underline-offset-2 hover:text-green-800"
            >
              অ্যাকাউন্ট তৈরি করুন
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}