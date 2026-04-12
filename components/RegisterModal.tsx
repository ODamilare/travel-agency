"use client";

import { MdClose, MdEmail, MdLock, MdPerson } from "react-icons/md";
import Logo from "./Logo";
import { useState } from "react";
import LoadingOverlay from "./Loading";
import toast from "react-hot-toast";

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
}

export default function RegisterModal({ open, onClose }: RegisterModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : {};

    if (!res.ok) {
      throw new Error(data?.error || "Failed to create account");
    }

    toast.success("Account created! Check your email.");

    onClose();

    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);

  } catch (err: any) {
    console.error(err.message);
    toast.error(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md px-4">
      <LoadingOverlay show={loading} />

      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden">

        {/* Top gradient */}
        <div className="h-2 w-full bg-gradient-to-r from-[#6c47ff] via-[#9b72ff] to-[#ffd166]" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-700"
        >
          <MdClose size={22} />
        </button>

        <div className="p-8 md:p-10">

          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <Logo size={42} />

            <h2 className="sora mt-4 text-2xl font-black text-gray-900">
              Create your account
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Join UXTravelerz and start exploring worldwide.
            </p>
          </div>

          {/* FORM */}
          <form className="space-y-4" onSubmit={handleSubmit}>

            {/* Name */}
            <div className="flex items-center gap-3 rounded-xl border bg-gray-50 px-4 py-3 focus-within:border-[#6c47ff] focus-within:bg-white text-gray-900">
              <MdPerson className="text-gray-400" size={20} />
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                placeholder="Full Name"
                className="w-full bg-transparent outline-none text-sm text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 rounded-xl border bg-gray-50 px-4 py-3 focus-within:border-[#6c47ff] focus-within:bg-white text-gray-900">
              <MdEmail className="text-gray-400" size={20} />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="Email Address"
                className="w-full bg-transparent outline-none text-sm text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Password */}
            <div className="flex items-center gap-3 rounded-xl border bg-gray-50 px-4 py-3 focus-within:border-[#6c47ff] focus-within:bg-white text-gray-900">
              <MdLock className="text-gray-400" size={20} />
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                type="password"
                placeholder="Password"
                className="w-full bg-transparent outline-none text-sm text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full mt-2 rounded-xl py-3 text-sm font-semibold text-white"
              style={{
                background: "linear-gradient(135deg,#6c47ff,#9b72ff)",
              }}
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Google */}
          <button
            onClick={() => window.location.href = "/api/auth/signin/google"}
            className="mt-4 w-full flex items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-3 text-sm font-medium text-gray-700 shadow-sm transition hover:shadow-md hover:bg-gray-50 active:scale-[0.98]"
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20.5H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4c-7.3 0-13.6 4.1-17.7 10.7z"/>
              <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.3l-6.3-5.2C29.3 35.7 26.8 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.6 5.1C9.2 39.9 16.1 44 24 44z"/>
              <path fill="#1976D2" d="M43.6 20.5H24v8h11.3c-1.1 3-3.4 5.5-6.3 7.1l6.3 5.2C40.2 37 44 31.1 44 24c0-1.3-.1-2.7-.4-3.5z"/>
            </svg>

            Continue with Google
          </button>

          {/* Footer */}
          <p className="mt-6 text-center text-[11px] text-gray-500">
            Already a member?{" "}
            <span
              onClick={() => {
                onClose();
                window.location.href = "/login";
              }}
              className="font-semibold text-[#6c47ff] cursor-pointer"
            >
              Sign in
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}