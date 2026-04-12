"use client";

import { useState } from "react";

const categories = [
  { label: "Explore All", icon: "M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z", extra: <circle cx="12" cy="12" r="10" /> },
  { label: "Hotels", icon: "M3 22V7l9-5 9 5v15M9 22V12h6v10" },
  { label: "Experiences", icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" },
  { label: "Dining", icon: "M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" },
  { label: "Cruises", icon: "M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.4.75 4.6 2 6.3M12 2v8M5 10l7-2 7 2" },
];

const TRENDING = ["Santorini", "Maldives", "Tokyo", "Amalfi Coast", "Safari"];

export default function SearchBar() {
  const [active, setActive] = useState("Explore All");
  const [query, setQuery] = useState("");

  return (
    <section className="w-full bg-white">
      <div className="h-14 md:h-20" />
      <div className="max-w-3xl mx-auto px-5">

        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="w-8 h-px bg-[#c4b5fd]" />
          <span className="text-[11px] font-semibold tracking-[0.18em] text-[#7c3aed] uppercase">Luxury Travel</span>
          <div className="w-8 h-px bg-[#c4b5fd]" />
        </div>

        {/* Headline */}
        <h1 className="text-center text-5xl md:text-6xl font-bold tracking-tight text-[#0f0a1e] leading-[1.08] mb-3">
          Where do you<br />want to <em className="not-italic text-[#6c47ff]">escape?</em>
        </h1>
        <p className="text-center text-gray-400 text-sm md:text-base mb-10">
          Curated stays, rare experiences, and moments worth remembering
        </p>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-[#ede9fe] shadow-[0_8px_48px_-8px_rgba(108,71,255,0.14)] p-2.5">

          {/* Pills */}
          <div className="flex flex-wrap gap-2 px-3 py-2.5 border-b border-[#f3f0ff] mb-2.5">
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setActive(cat.label)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-medium border-[1.5px] transition-all
                  ${active === cat.label
                    ? "bg-[#6c47ff] text-white border-[#6c47ff] shadow-[0_4px_14px_rgba(108,71,255,0.35)] -translate-y-px"
                    : "bg-[#faf9ff] text-[#7c3aed] border-[#ede9fe] hover:border-[#c4b5fd] hover:bg-[#f5f3ff]"
                  }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d={cat.icon} />
                </svg>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search row */}
          <div className="flex items-center gap-0 bg-[#faf9ff] border-[1.5px] border-[#ede9fe] rounded-2xl px-4 py-1.5 focus-within:border-[#6c47ff] focus-within:shadow-[0_0_0_3px_rgba(108,71,255,0.1)] transition-all">
            <svg className="text-[#6c47ff] mr-2.5 shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search destinations, hotels, experiences..."
              className="flex-1 bg-transparent outline-none text-sm md:text-base text-gray-700 placeholder:text-gray-300 py-2.5"
            />
            <div className="w-px h-7 bg-[#ede9fe] mx-2.5 shrink-0" />
            <button className="flex items-center gap-1.5 text-[13px] text-[#7c3aed] font-medium whitespace-nowrap px-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              2 guests
            </button>
            <div className="w-px h-7 bg-[#ede9fe] mx-2.5 shrink-0" />
            <button className="bg-[#6c47ff] text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-[#5a3de8] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(108,71,255,0.4)] transition-all shrink-0">
              Search
            </button>
          </div>
        </div>

        {/* Trending */}
        <div className="flex flex-wrap gap-2 justify-center mt-6">
          <span className="text-xs text-gray-300 self-center mr-1">Trending:</span>
          {TRENDING.map((t) => (
            <button
              key={t}
              onClick={() => setQuery(t)}
              className="text-xs text-[#9c87c5] px-3.5 py-1.5 rounded-full border border-[#ede9fe] hover:text-[#6c47ff] hover:border-[#c4b5fd] hover:bg-[#faf9ff] transition-all"
            >
              {t}
            </button>
          ))}
        </div>

      </div>
      <div className="h-14 md:h-20" />
    </section>
  );
}