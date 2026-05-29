"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { MdEmail, MdLockReset } from "react-icons/md";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      toast.success("Password reset email sent");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f9ff] px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* TOP GRADIENT BAR */}
        <div className="h-2 w-full bg-gradient-to-r from-[#6c47ff] via-[#9b72ff] to-[#ffd166]" />

        <div className="p-8">

          {/* LOGO */}
          <div className="flex justify-center">
            <Link href="/home">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-20 w-30 md:h-24 md:w-34 object-contain"
              />
            </Link>
          </div>

          {/* ICON */}
          <div className="flex justify-center mt-4">
            <div className="h-16 w-16 rounded-2xl bg-[#f3efff] flex items-center justify-center">
              <MdLockReset size={34} className="text-[#6c47ff]" />
            </div>
          </div>

          {/* TEXT */}
          <div className="text-center mt-5">
            <h2 className="text-2xl font-bold text-gray-900">
              Forgot Password?
            </h2>

            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Enter your email address and we’ll send you a secure link to reset your password.
            </p>
          </div>

          {/* EMAIL FIELD */}
          <div className="mt-7">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Email Address
            </label>

            <div className="mt-2 flex items-center border border-gray-200 rounded-xl px-4 focus-within:border-[#6c47ff] transition-all">
              <MdEmail className="text-gray-400 text-xl" />

              <input
                type="email"
                placeholder="you@example.com"
                className="w-full bg-transparent outline-none p-3 text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-6 py-3 rounded-xl text-white font-semibold transition-all hover:scale-[1.01] disabled:opacity-70"
            style={{
              background:
                "linear-gradient(135deg,#6c47ff,#9b72ff)",
            }}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          {/* BACK TO LOGIN */}
          <div className="text-center mt-5">
            <Link
              href="/login"
              className="text-sm text-[#6c47ff] font-medium hover:underline"
            >
              Back to Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}