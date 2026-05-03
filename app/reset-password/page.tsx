"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdLock, MdArrowForward } from "react-icons/md";

export default function ResetPasswordPage() {
  const token = useSearchParams().get("token");
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Something went wrong");
        return;
      }

      toast.success("Password updated successfully!");

      setTimeout(() => {
        router.push("/login");
      }, 1200);

    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f6f7fb]">

      {/* BACKGROUND GLOW */}
      <div className="absolute -top-40 -left-32 h-[420px] w-[420px] rounded-full bg-[#6c47ff]/20 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-[#ffd166]/20 blur-3xl" />

      {/* CONTENT */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10">

        <div className="w-full max-w-md overflow-hidden rounded-[32px] border border-white/40 bg-white/90 shadow-[0_20px_80px_rgba(108,71,255,0.15)] backdrop-blur-xl">

          {/* TOP BAR */}
          <div className="h-2 w-full bg-gradient-to-r from-[#6c47ff] via-[#9b72ff] to-[#ffd166]" />

          {/* CARD */}
          <div className="px-7 py-10 md:px-10">

            {/* LOGO */}
            <div className="flex flex-col items-center">

              <div className="relative mb-2 h-40 w-40  overflow-hidden ">

                <Image
                  src="/logo.png"
                  alt="LuxTravelerz"
                  fill
                  className="object-contain h-50 w-40 p-1"
                />

              </div>

              <div className="mb-2 rounded-full bg-[#f3efff] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#6c47ff]">
                Secure Reset
              </div>

              <h1 className="text-center text-3xl font-black text-gray-900">
                Reset Your Password
              </h1>

              <p className="mt-3 max-w-[320px] text-center text-sm leading-7 text-gray-500">
                Create a new secure password to regain access to your{" "}
                <span className="font-semibold text-[#6c47ff]">
                  LuxTravelerz
                </span>{" "}
                account.
              </p>

            </div>

            {/* FORM */}
            <div className="mt-10 space-y-5">

              {/* PASSWORD */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  New Password
                </label>

                <div className="flex items-center rounded-2xl border border-[#ebe7ff] bg-[#faf9ff] px-4 transition focus-within:border-[#6c47ff] focus-within:bg-white focus-within:shadow-lg focus-within:shadow-[#6c47ff]/10">

                  <MdLock className="text-xl text-[#6c47ff]" />

                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent px-3 py-4 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                  />

                </div>

              </div>

              {/* CONFIRM PASSWORD */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Confirm Password
                </label>

                <div className="flex items-center rounded-2xl border border-[#ebe7ff] bg-[#faf9ff] px-4 transition focus-within:border-[#6c47ff] focus-within:bg-white focus-within:shadow-lg focus-within:shadow-[#6c47ff]/10">

                  <MdLock className="text-xl text-[#6c47ff]" />

                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    className="w-full bg-transparent px-3 py-4 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                  />

                </div>

              </div>

              {/* PASSWORD TIPS */}
              <div className="rounded-2xl border border-[#ede9fe] bg-[#faf9ff] p-4">

                <p className="mb-2 text-sm font-bold text-gray-800">
                  Password Requirements
                </p>

                <ul className="space-y-1 text-xs leading-6 text-gray-500">
                  <li>• Minimum 6 characters</li>
                  <li>• Use a strong unique password</li>
                  <li>• Include numbers or symbols for extra security</li>
                </ul>

              </div>

              {/* BUTTON */}
              <button
                onClick={handleReset}
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#6c47ff] to-[#9b72ff] py-4 text-sm font-bold text-white shadow-lg shadow-[#6c47ff]/30 transition hover:scale-[1.01] hover:shadow-xl hover:shadow-[#6c47ff]/40 disabled:cursor-not-allowed disabled:opacity-70"
              >

                {loading ? (
                  "Updating Password..."
                ) : (
                  <>
                    Reset Password
                    <MdArrowForward className="text-lg transition group-hover:translate-x-1" />
                  </>
                )}

              </button>

            </div>

            {/* FOOTER */}
            <div className="mt-8 text-center">

              <button
                onClick={() => router.push("/login")}
                className="text-sm font-semibold text-[#6c47ff] transition hover:text-[#5936db]"
              >
                Back to Login
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}