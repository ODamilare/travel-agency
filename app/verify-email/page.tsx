"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function VerifyEmail() {
  const params = useSearchParams();
  const token = params.get("token");
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const verify = async () => {
      const res = await fetch("/api/verify-email", {
        method: "POST",
        body: JSON.stringify({ token }),
      });

      if (res.ok) setStatus("Email verified 🎉");
      else setStatus("Invalid or expired link");
    };

    if (token) verify();
  }, [token]);

  return <div className="p-10 text-center">{status}</div>;
}