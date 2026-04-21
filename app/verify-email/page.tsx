"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MdCheckCircle, MdError, MdHourglassEmpty } from "react-icons/md";
import Logo from "@/components/Logo";
import Link from "next/link";
export default function VerifyEmail() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");

  const [status, setStatus] = useState<
    "loading" | "success" | "error"
  >("loading");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await fetch("/api/verify-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (!res.ok) throw new Error();

        setStatus("success");

        // redirect to login after success
        setTimeout(() => {
          router.push("/login");
        }, 2000);

      } catch {
        setStatus("error");
      }
    };

    if (token) verifyEmail();
    else setStatus("error");
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f9ff] px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">

        <div className="h-2 w-full bg-gradient-to-r from-[#6c47ff] via-[#9b72ff] to-[#ffd166]" />

        <div className="p-8 text-center">

         <Link href="/home" className="flex items-center">
  <img
    src="/logo.png"
    alt="Logo"
    className="h-20 w-30 md:h-24 md:w-34 lg:h-28 lg:w-38 object-contain"
  />
</Link>

          <div className="mt-6 flex flex-col items-center">

            {status === "loading" && (
              <>
                <MdHourglassEmpty size={48} className="text-[#6c47ff] animate-pulse" />
                <h2 className="mt-4 font-bold">Verifying email...</h2>
              </>
            )}

            {status === "success" && (
              <>
                <MdCheckCircle size={52} className="text-green-500" />
                <h2 className="mt-4 font-bold text-xl">
                  Email Verified 🎉
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  Your account is ready. Redirecting to login...
                </p>
              </>
            )}

            {status === "error" && (
              <>
                <MdError size={52} className="text-red-500" />
                <h2 className="mt-4 font-bold text-xl">
                  Verification Failed
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  This link is invalid or expired.
                </p>

                <button
                  onClick={() => router.push("/login")}
                  className="mt-6 px-6 py-3 rounded-xl text-white font-semibold"
                  style={{
                    background:
                      "linear-gradient(135deg,#6c47ff,#9b72ff)",
                  }}
                >
                  Go to Login
                </button>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}