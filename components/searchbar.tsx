"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const categories = [
  { label: "Hotels", icon: "M3 22V7l9-5 9 5v15M9 22V12h6v10" },
  { label: "Rides", icon: "M3 13l4-7h10l4 7M5 13v6a2 2 0 0 0 2 2h1m10 0h1a2 2 0 0 0 2-2v-6M9 21v-4h6v4" },
  { label: "Places", icon: "M12 2C8 6 4 10 4 14a8 8 0 0 0 16 0c0-4-4-8-8-12z" },
];

const SUGGESTIONS: Record<string, string[]> = {
  Hotels: ["Burj Al Arab", "Hilton London", "Four Seasons", "Atlantis Dubai"],
  Rides: ["Airport Pickup", "City Taxi", "Private Driver", "Luxury SUV"],
  Places: ["Dubai", "London", "Paris", "New York", "Maldives"],
};

export default function SearchBar() {
  const [active, setActive] = useState("Places");
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const router = useRouter();

  const filteredSuggestions = SUGGESTIONS[active].filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="w-full bg-white">
      <div className="h-10 md:h-20" />

      <div className="max-w-3xl mx-auto px-4 sm:px-5">

        {/* HEADLINE (unchanged style, just tightened spacing) */}
        <h1 className="text-center text-3xl sm:text-5xl font-bold text-[#0f0a1e] mb-3">
          Where do you want to{" "}
          <span className="text-[#6c47ff]">go?</span>
        </h1>

        <p className="text-center text-gray-400 text-sm mb-8">
          Find hotels, rides, and destinations easily
        </p>

        {/* CARD */}
        <div className="bg-white rounded-3xl border border-[#ede9fe] shadow-lg p-3">

          {/* FILTER PILLS */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar px-2 py-2 border-b border-[#f3f0ff] mb-3">
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => {
                  setActive(cat.label);
                  setQuery("");
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition
                  ${
                    active === cat.label
                      ? "bg-[#6c47ff] text-white border-[#6c47ff] shadow-md"
                      : "bg-[#faf9ff] text-[#7c3aed] border-[#ede9fe]"
                  }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d={cat.icon} />
                </svg>
                {cat.label}
              </button>
            ))}
          </div>

          {/* SEARCH INPUT */}
          <div className="relative">
            <div className="flex items-center bg-[#faf9ff] border border-[#ede9fe] rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#6c47ff]/30 transition">

              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 150)}
                placeholder={`Search ${active.toLowerCase()}...`}
                className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-300"
              />

              <button
                onClick={() => {
                  if (!query.trim()) return;
                  router.push(`/search?q=${query}`);
                }}
                className="bg-[#6c47ff] text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-[#5a36e6] transition"
              >
                Search
              </button>
            </div>

            {/* SUGGESTIONS DROPDOWN */}
            {focused && query && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white border border-[#ede9fe] rounded-2xl shadow-xl overflow-hidden z-50">

                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((item) => (
                    <div
                      key={item}
                      onClick={() => {
                        setQuery(item);
                        router.push(`/search?q=${item}`);
                      }}
                      className="px-4 py-3 text-sm text-gray-700 hover:bg-[#f6f3ff] cursor-pointer transition"
                    >
                      {item}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-400">
                    No results found
                  </div>
                )}

              </div>
            )}
          </div>
        </div>

        {/* SIMPLE TRENDING */}
        <div className="flex flex-wrap gap-2 justify-center mt-6">
          {SUGGESTIONS[active].slice(0, 4).map((item) => (
            <button
              key={item}
              onClick={() => {
                setQuery(item);
                router.push(`/search?q=${item}`);
              }}
              className="text-xs text-[#9c87c5] px-3 py-1.5 rounded-full border border-[#ede9fe] hover:bg-[#faf9ff]"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="h-10 md:h-20" />
    </section>
  );
}