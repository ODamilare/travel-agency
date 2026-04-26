"use client";

import { MdEmail } from "react-icons/md";
import { useState } from "react";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [resent, setResent] = useState(false);

  const handleResend = async () => {
    if (cooldown > 0) return;

    setLoading(true);

    try {
      const email = localStorage.getItem("verifyEmail");

      if (!email) {
        toast.error("No email found. Please log in again.");
        setLoading(false); // 🔥 FIX: prevent stuck state
        return;
      }

      const res = await fetch("/api/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to send verification email");
        setLoading(false);
        return;
      }

      // ✅ success
      toast.success("Verification email sent!");
      setResent(true);

      // ✅ start cooldown (30s)
      setCooldown(30);

      const interval = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f6f7ff] via-white to-[#f9f9ff] px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* Top gradient line */}
        <div className="h-2 w-full bg-gradient-to-r from-[#6c47ff] via-[#9b72ff] to-[#ffd166]" />

        <div className="p-8 text-center">

          {/* Logo */}
          <div className="flex justify-center">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-20 w-30 md:h-24 md:w-34 lg:h-28 lg:w-38 object-contain"
            />
          </div>

          {/* Icon */}
          <div className="mt-6 flex justify-center">
            <div className="w-16 h-16 rounded-full bg-[#f3efff] flex items-center justify-center">
              <MdEmail className="text-[#6c47ff]" size={28} />
            </div>
          </div>

          {/* Title */}
          <h2 className="mt-5 text-2xl font-extrabold text-gray-900">
            Check your email
          </h2>

          {/* Dynamic message */}
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            {resent
              ? "A new verification link has been sent to your email."
              : "We’ve sent a verification link to your email address."}
          </p>

          <div className="my-6 border-t border-gray-100" />

          {/* Resend Button */}
          <button
            onClick={handleResend}
            disabled={loading || cooldown > 0}
            className="w-full rounded-xl py-3 text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg,#6c47ff,#9b72ff)",
            }}
          >
            {loading
              ? "Sending..."
              : cooldown > 0
              ? `Resend in ${cooldown}s`
              : "Send another verification email"}
          </button>

          {/* Hint */}
          <p className="mt-4 text-xs text-gray-400">
            Didn’t receive it? Check spam or resend.
          </p>
        </div>
      </div>
    </div>
  );
}