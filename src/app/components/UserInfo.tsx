"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const UserInfo = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [open, setOpen] = useState(false);
    const [signingOut, setSigningOut] = useState(false);
    const router = useRouter();

    const handleSignOut = async () => {
        setSigningOut(true);

        try {
            const { error } = await authClient.signOut();

            if (error) {
                toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
                return;
            }

            setOpen(false);
            toast.success("সফলভাবে সাইন আউট হয়েছে!");

            router.replace("/");
            router.refresh();
        } catch (error) {
            console.error("Sign out failed:", error);
            toast.error("সাইন আউট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        } finally {
            setSigningOut(false);
        }
    };

    if (isPending) {
        return (
            <div className="h-10 w-28 animate-pulse rounded-full bg-gray-100" />
        );
    }

    return (
        <div className="relative ml-auto">
            {user ? (
                <>
                    <button
                        type="button"
                        onClick={() => setOpen((prev) => !prev)}
                        aria-expanded={open}
                        aria-haspopup="menu"
                        className={`flex items-center gap-2 rounded-full border px-2 py-1.5 transition-all duration-200 ${open
                                ? "border-green-200 bg-green-50 shadow-sm"
                                : "border-transparent hover:border-gray-200 hover:bg-white hover:shadow-sm"
                            }`}
                    >
                        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-green-600 to-green-800 text-sm font-bold text-white shadow-sm">
                            {user.name?.trim().charAt(0).toUpperCase() || "U"}
                        </span>

                        <span className="max-w-[100px] truncate text-sm font-semibold text-[#202b22]">
                            {user.name || "ব্যবহারকারী"}
                        </span>

                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className={`mr-1 size-3.5 text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""
                                }`}
                            aria-hidden="true"
                        >
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </button>

                    {open && (
                        <>
                            <button
                                type="button"
                                aria-label="মেনু বন্ধ করুন"
                                className="fixed inset-0 z-40 cursor-default"
                                onClick={() => setOpen(false)}
                            />

                            <div
                                role="menu"
                                className="absolute right-0 top-full z-50 mt-3 w-[290px] max-w-[calc(100vw-2rem)] origin-top-right rounded-2xl border border-[#e1e9e2] bg-white p-2 shadow-[0_12px_35px_rgba(20,50,30,0.12)]"
                            >
                                <div className="flex items-center gap-3 rounded-xl bg-[#f4f8f4] p-3">
                                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-green-700 text-base font-bold text-white">
                                        {user.name?.trim().charAt(0).toUpperCase() || "U"}
                                    </span>

                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-bold text-[#202b22]">
                                            {user.name || "ব্যবহারকারী"}
                                        </p>

                                        <p className="mt-1 truncate text-xs text-gray-500">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="my-2 h-px bg-gray-100" />

                                <Link
                                    href="/profile"
                                    role="menuitem"
                                    onClick={() => setOpen(false)}
                                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-green-50 hover:text-green-800"
                                >
                                    <span className="grid size-8 place-items-center rounded-lg bg-gray-100 text-gray-600 transition-colors group-hover:bg-green-100">
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            className="size-5"
                                            aria-hidden="true"
                                        >
                                            <circle cx="12" cy="8" r="4" />
                                            <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                                        </svg>
                                    </span>
                                    আমার প্রোফাইল
                                </Link>

                                <button
                                    type="button"
                                    role="menuitem"
                                    onClick={handleSignOut}
                                    disabled={signingOut}
                                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <span className="grid size-8 place-items-center rounded-lg bg-red-50">
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            className="size-5"
                                            aria-hidden="true"
                                        >
                                            <path d="M10 17l5-5-5-5" />
                                            <path d="M15 12H3" />
                                            <path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
                                        </svg>
                                    </span>
                                    {signingOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
                                </button>
                            </div>
                        </>
                    )}
                </>
            ) : (
                <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                    <Link
                        href="/signin"
                        className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-green-50 hover:text-green-800 sm:px-4"
                    >
                        সাইন ইন
                    </Link>

                    <Link
                        href="/signup"
                        className="rounded-xl bg-green-700 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-green-800 hover:shadow-md sm:px-5"
                    >
                        সাইন আপ
                    </Link>
                </div>
            )}
        </div>
    );
};

export default UserInfo;