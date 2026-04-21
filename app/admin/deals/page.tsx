"use client";

import { useState } from "react";

export default function AdminPage() {
  const [form, setForm] = useState({
    from: "",
    to: "",
    date: "",
    price: "",
    lock: "",
    badge: "",
    bg: "#0f2233",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createDeal = async () => {
    const res = await fetch("/api/deals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("✨ Deal created successfully!");
      setForm({
        from: "",
        to: "",
        date: "",
        price: "",
        lock: "",
        badge: "",
        bg: "#0f2233",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0616] text-white flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-2xl">

        {/* HEADER */}
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.3em] text-[#a78bfa] uppercase">
            Admin Dashboard
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            Create <span className="text-[#6c47ff]">Luxury Deal</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Add new travel offers to your carousel instantly
          </p>
        </div>

        {/* FORM CARD */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-[0_0_60px_rgba(108,71,255,0.15)]">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {Object.keys(form).map((key) => (
              <input
                key={key}
                name={key}
                value={(form as any)[key]}
                onChange={handleChange}
                placeholder={key.toUpperCase()}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-[#6c47ff] focus:ring-2 focus:ring-[#6c47ff]/30 transition"
              />
            ))}

          </div>

          {/* COLOR PREVIEW */}
          <div className="mt-5 flex items-center gap-3">
            <div
              className="h-8 w-8 rounded-lg border border-white/20"
              style={{ background: form.bg }}
            />
            <p className="text-xs text-gray-400">
              Background color preview
            </p>
          </div>

          {/* BUTTON */}
          <button
            onClick={createDeal}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-[#6c47ff] to-[#8b5cf6] py-3 font-semibold text-white shadow-lg hover:opacity-90 active:scale-[0.98] transition"
          >
            ✨ Create Luxury Deal
          </button>
        </div>

        {/* FOOTER NOTE */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Deals will appear instantly on the homepage carousel
        </p>

      </div>
    </div>
  );
}