"use client";

import { useState } from "react";
import {
  MdEmail,
  MdLock,
  MdPerson,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Logo from "@/components/Logo";

/* Password Strength */
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
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const strength = getStrength(form.password);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* REGISTER FUNCTION */const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();

  // 🔴 FRONTEND VALIDATION
  if (!form.name || !form.email || !form.password) {
    toast.error("All fields are required");
    return;
  }

  if (!form.email.includes("@")) {
    toast.error("Enter a valid email");
    return;
  }

  if (form.password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return;
  }

  setLoading(true);

  try {
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      // 🔥 HANDLE SPECIFIC ERRORS
      if (data.error === "User already exists") {
        throw new Error("This email is already registered");
      }

      throw new Error(data.error || "Registration failed");
    }

    toast.success("Account created!");

    // auto login
    await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    router.push("/home");

  } catch (err: any) {
    toast.error(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f9ff] px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Top Gradient */}
        <div className="h-2 w-full bg-gradient-to-r from-[#6c47ff] via-[#9b72ff] to-[#ffd166]" />

        <div className="p-8">

          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <Logo size={42} />

            <h2 className="mt-4 text-2xl font-black text-gray-900">
              Create Account
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Start your journey with UXTravelerz
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleRegister} className="space-y-4">

            {/* Name */}
            <div className="flex items-center gap-3 rounded-xl border bg-gray-50 px-4 py-3 focus-within:border-[#6c47ff] focus-within:bg-white">
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
            <div className="flex items-center gap-3 rounded-xl border bg-gray-50 px-4 py-3 focus-within:border-[#6c47ff] focus-within:bg-white">
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
            <div className="rounded-xl border bg-gray-50 px-4 py-3 focus-within:border-[#6c47ff] focus-within:bg-white">
              <div className="flex items-center gap-3">
                <MdLock className="text-gray-400" size={20} />

                <input
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full bg-transparent outline-none text-sm text-gray-900 placeholder-gray-400"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
              </div>

              {/* Strength */}
              {form.password && (
                <div className="mt-3">
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all"
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

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 rounded-xl py-3 text-sm font-semibold text-white"
              style={{
                background: "linear-gradient(135deg,#6c47ff,#9b72ff)",
              }}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          {/* Google Auth */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/home" })}
            className="mt-4 w-full flex items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-3 text-sm font-medium text-gray-700 shadow-sm hover:shadow-md"
          >
            <img src="/google.svg" className="w-4 h-4" />
            Continue with Google
          </button>

          {/* Footer */}
          <p className="mt-6 text-center text-[12px] text-gray-500">
            Already have an account?{" "}
            <span
              onClick={() => router.push("/login")}
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