"use client";

import { useState } from "react";
import toast from "react-hot-toast";

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
      <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-xl">

        <h2 className="text-xl font-bold mb-2 text-gray-900">
          Forgot Password
        </h2>

        <p className="text-sm text-gray-500 mb-5">
          Enter your email address and we’ll send you a reset link.
        </p>

        {/* EMAIL FIELD */}
        <label className="text-xs font-medium text-gray-600">
          Email Address
        </label>

        <input
          type="email"
          className="w-full border border-gray-200 focus:border-[#6c47ff] outline-none p-3 rounded-lg mb-4 mt-1"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#6c47ff] text-white py-2.5 rounded-lg font-medium hover:opacity-90 transition"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </div>
    </div>
  );
}