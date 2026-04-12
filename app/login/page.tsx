"use client";

import { useState } from "react";
import { MdEmail, MdLock } from "react-icons/md";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Logo from "@/components/Logo";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

 const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (!res?.ok) {
     throw new Error(res?.error || "Login failed");
    }

    toast.success("Login successful!");

    setTimeout(() => {
      router.push("/home"); // ✅ ALWAYS go here
    }, 1000);

  } catch (err: any) {
    toast.error(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f9ff] px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Top gradient */}
        <div className="h-2 w-full bg-gradient-to-r from-[#6c47ff] via-[#9b72ff] to-[#ffd166]" />

        <div className="p-8">

          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <Logo size={42} />

            <h2 className="mt-4 text-2xl font-black text-gray-900">
              Welcome back
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Login to continue your journey.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-4">

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
              disabled={loading}
              className="w-full mt-2 rounded-xl py-3 text-sm font-semibold text-white"
              style={{
                background: "linear-gradient(135deg,#6c47ff,#9b72ff)",
              }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Google Login */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/home" })}
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
          <p className="mt-6 text-center text-[12px] text-gray-500">
            Don’t have an account?{" "}
            <span
              onClick={() => (window.location.href = "/")}
              className="font-semibold text-[#6c47ff] cursor-pointer"
            >
              Register
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}