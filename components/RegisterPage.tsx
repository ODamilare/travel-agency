"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MdEmail,
  MdLock,
  MdPerson,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import Logo from "./Logo";
/* ─── Password Strength Function ─── */
const getStrength = (password: string) => {
  let score = 0;

  if (password.length > 5) score++;
  if (password.length > 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { label: "Weak", color: "#ef4444", width: "33%" };
  if (score <= 4) return { label: "Medium", color: "#f59e0b", width: "66%" };
  return { label: "Strong", color: "#22c55e", width: "100%" };
};

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const strength = getStrength(form.password);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
     
    <div
      className="min-h-screen flex items-center justify-center px-5 py-10 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg,#6c47ff 0%,#9b72ff 55%,#c4a8ff 100%)",
      }}
    >
     
      {/* Glow Effects (FIXED overflow) */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-2xl" />

      {/* Card */}
      <div className="relative w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 shadow-2xl">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="sora text-2xl font-black text-white">
            Create Account
          </h1>
          <p className="text-sm text-white/70 mt-1">
            Start your journey with UXTravelerz
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          
          {/* Name */}
          <div className="flex items-center gap-3 rounded-xl bg-white/15 px-4 py-3 border border-white/20 focus-within:border-white/40">
            <MdPerson className="text-white/70" size={20} />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-white placeholder:text-white/60 text-sm"
            />
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 rounded-xl bg-white/15 px-4 py-3 border border-white/20 focus-within:border-white/40">
            <MdEmail className="text-white/70" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-white placeholder:text-white/60 text-sm"
            />
          </div>

          {/* Password */}
          <div className="rounded-xl bg-white/15 border border-white/20 focus-within:border-white/40 px-4 py-3">
            <div className="flex items-center gap-3">
              <MdLock className="text-white/70" size={20} />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-white placeholder:text-white/60 text-sm"
              />

              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="text-white/70 hover:text-white transition"
              >
                {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
              </button>
            </div>

            {/* Strength */}
            {form.password && (
              <div className="mt-3">
                <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-300"
                    style={{
                      width: strength.width,
                      background: strength.color,
                    }}
                  />
                </div>
                <p
                  className="mt-1 text-xs font-medium"
                  style={{ color: strength.color }}
                >
                  {strength.label} password
                </p>
              </div>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-xl py-3 text-sm font-bold text-white transition hover:opacity-90 active:scale-95"
            style={{
              background: "linear-gradient(135deg,#f5a623,#f07c10)",
            }}
          >
            Create Account
          </button>
        </form>

        {/* Already a member */}
        <div className="mt-6 text-center">
          <p className="text-sm text-white/70">
            Already a member?{" "}
            <Link href="/login" className="text-[#ffd166] font-semibold">
              Sign in
            </Link>
          </p>
        </div>

        {/* Terms (Tripadvisor style) */}
        <p className="mt-5 text-center text-[11px] leading-relaxed text-white/50">
          By proceeding, you agree to our{" "}
          <span className="underline cursor-pointer hover:text-white">
            Terms of Use
          </span>{" "}
          and confirm you have read our{" "}
          <span className="underline cursor-pointer hover:text-white">
            Privacy Policy
          </span>.
        </p>
      </div>
    </div>
  );
}