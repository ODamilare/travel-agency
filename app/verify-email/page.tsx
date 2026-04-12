"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MdCheckCircle, MdError, MdHourglassEmpty } from "react-icons/md";
import Logo from "@/components/Logo";

export default function VerifyEmail() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");

  const [status, setStatus] = useState<
    "loading" | "success" | "error"
  >("loading");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await fetch("/api/verify-email", {
          method: "POST",
          body: JSON.stringify({ token }),
        });

        if (!res.ok) throw new Error();

        setStatus("success");

        // redirect after success
        setTimeout(() => {
          router.push("/login");
        }, 2500);
      } catch {
        setStatus("error");
      }
    };

    if (token) verify();
    else setStatus("error");
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f9ff] px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Top Gradient */}
        <div className="h-2 w-full bg-gradient-to-r from-[#6c47ff] via-[#9b72ff] to-[#ffd166]" />

        <div className="p-8 text-center">

          <Logo size={40} />

          {/* CONTENT */}
          <div className="mt-6 flex flex-col items-center">

            {/* ICON */}
            {status === "loading" && (
              <MdHourglassEmpty className="text-[#6c47ff] animate-pulse" size={48} />
            )}

            {status === "success" && (
              <MdCheckCircle className="text-green-500" size={52} />
            )}

            {status === "error" && (
              <MdError className="text-red-500" size={52} />
            )}

            {/* TEXT */}
            <h2 className="mt-4 text-xl font-bold text-gray-900">
              {status === "loading" && "Verifying your email..."}
              {status === "success" && "Email Verified 🎉"}
              {status === "error" && "Verification Failed"}
            </h2>

            <p className="mt-2 text-sm text-gray-500 max-w-xs">
              {status === "loading" &&
                "Please wait while we confirm your email address."}

              {status === "success" &&
                "Your account is now active. Redirecting you to sign in..."}

              {status === "error" &&
                "This link is invalid or has expired. Please try again."}
            </p>

            {/* BUTTON (fallback if redirect fails) */}
            {status !== "loading" && (
              <button
                onClick={() => router.push("/login")}
                className="mt-6 rounded-xl px-6 py-3 text-sm font-semibold text-white"
                style={{
                  background: "linear-gradient(135deg,#6c47ff,#9b72ff)",
                }}
              >
                Go to Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}