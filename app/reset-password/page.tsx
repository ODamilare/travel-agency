"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const token = useSearchParams().get("token");
  const router = useRouter();

  const [password, setPassword] = useState("");

  const handleReset = async () => {
    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.error);
      return;
    }

    toast.success("Password updated!");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 bg-white shadow rounded w-[350px]">

        <h2 className="text-xl font-bold mb-4">Set New Password</h2>

        <input
          type="password"
          className="w-full border p-2 rounded mb-3"
          placeholder="New password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleReset}
          className="w-full bg-[#6c47ff] text-white py-2 rounded"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}