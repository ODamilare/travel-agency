"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { MdSwapHoriz, MdPerson } from "react-icons/md";

export default function FlightsPage() {
  const [form, setForm] = useState({
    from: "Lagos",
    to: "Dubai",
    departure: "",
    returnDate: "",
    travelClass: "Economy",
    ticketType: "Round Trip",
    passengers: 1,
  });

  const swapCities = () => {
    setForm({
      ...form,
      from: form.to,
      to: form.from,
    });
  };

  const popular = ["London", "Dubai", "Paris", "Toronto", "Istanbul"];

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <Navbar />

      {/* HERO */}
      <div className="relative pt-20 pb-32 px-5 text-center">

        {/* purple + gold glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#6c47ff]/10 via-white to-white" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl font-semibold text-gray-900 tracking-tight">
            Book smarter. Travel better.
          </h1>
          <p className="mt-4 text-gray-500 text-lg">
            Compare flights and lock in the best deals instantly
          </p>
        </div>
      </div>

      {/* SEARCH PANEL */}
      <div className="max-w-6xl mx-auto px-5 -mt-24 relative z-20">

        <div className="backdrop-blur-xl bg-white/80 border border-white/40 shadow-2xl rounded-[32px] p-6 md:p-8">

          {/* TOP CONTROLS */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

            {/* ticket type */}
            <div className="flex gap-2 bg-gray-100 rounded-full p-1">
              {["One Way", "Round Trip"].map((type) => (
                <button
                  key={type}
                  onClick={() => setForm({ ...form, ticketType: type })}
                  className={`px-5 py-2 rounded-full text-sm transition ${
                    form.ticketType === type
                      ? "bg-[#6c47ff] text-white shadow"
                      : "text-gray-500"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* class */}
            <div className="flex gap-2 bg-gray-100 rounded-full p-1">
              {["Economy", "Business", "First"].map((c) => (
                <button
                  key={c}
                  onClick={() => setForm({ ...form, travelClass: c })}
                  className={`px-5 py-2 rounded-full text-sm transition ${
                    form.travelClass === c
                      ? "bg-[#ffd166] text-black shadow"
                      : "text-gray-500"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

          </div>

          {/* MAIN INPUT ROW */}
          <div className="grid md:grid-cols-5 gap-4 items-center">

            {/* FROM */}
            <div className="md:col-span-2 bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100 focus-within:ring-2 focus-within:ring-[#6c47ff]">
              <p className="text-xs text-gray-400">From</p>
              <input
                value={form.from}
                onChange={(e) =>
                  setForm({ ...form, from: e.target.value })
                }
                className="w-full text-lg font-medium outline-none bg-transparent"
              />
            </div>

            {/* SWAP */}
            <div className="flex justify-center">
              <button
                onClick={swapCities}
                className="h-12 w-12 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-105 transition border"
              >
                <MdSwapHoriz size={20} className="text-[#6c47ff]" />
              </button>
            </div>

            {/* TO */}
            <div className="md:col-span-2 bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100 focus-within:ring-2 focus-within:ring-[#6c47ff]">
              <p className="text-xs text-gray-400">To</p>
              <input
                value={form.to}
                onChange={(e) =>
                  setForm({ ...form, to: e.target.value })
                }
                className="w-full text-lg font-medium outline-none bg-transparent"
              />
            </div>

          </div>

          {/* DATES + PASSENGERS */}
          <div className="grid md:grid-cols-3 gap-4 mt-4">

            <div className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-400">Departure</p>
              <input
                type="date"
                value={form.departure}
                onChange={(e) =>
                  setForm({ ...form, departure: e.target.value })
                }
                className="w-full text-lg font-medium outline-none bg-transparent"
              />
            </div>

            <div className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-400">Return</p>
              <input
                type="date"
                value={form.returnDate}
                onChange={(e) =>
                  setForm({ ...form, returnDate: e.target.value })
                }
                className="w-full text-lg font-medium outline-none bg-transparent"
              />
            </div>

            {/* PASSENGERS */}
            <div className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Passengers</p>
                <p className="text-lg font-medium">
                  {form.passengers} Traveller
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setForm({
                      ...form,
                      passengers: Math.max(1, form.passengers - 1),
                    })
                  }
                  className="h-8 w-8 rounded-full bg-gray-100"
                >
                  -
                </button>

                <button
                  onClick={() =>
                    setForm({
                      ...form,
                      passengers: form.passengers + 1,
                    })
                  }
                  className="h-8 w-8 rounded-full bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

          </div>

          {/* POPULAR DESTINATIONS */}
          <div className="mt-6">
            <p className="text-xs text-gray-400 mb-2">
              Popular destinations
            </p>

            <div className="flex flex-wrap gap-2">
              {popular.map((city) => (
                <button
                  key={city}
                  onClick={() =>
                    setForm({ ...form, to: city })
                  }
                  className="px-4 py-2 rounded-full bg-gray-100 text-sm hover:bg-[#6c47ff] hover:text-white transition"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8">
            <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#6c47ff] to-[#ffd166] text-white font-semibold text-lg shadow-lg hover:opacity-90 transition">
              Search Flights
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}