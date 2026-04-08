"use client";

import React from "react";
interface Offer {
  title: string;
  desc: string;
  cta: string;
  img: string;
}

interface OffersProps {
  OFFERS: Offer[]; // array of offers
}

const Offers: React.FC<OffersProps> = ({ OFFERS }) => {
  if (!OFFERS || OFFERS.length === 0) return null; // prevent crash if empty

  return (
    <section className="px-5 py-14 md:px-10 md:py-18">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#6c47ff]">Promotions</p>
          <h2 className="sora text-2xl font-extrabold text-gray-900 md:text-3xl">Special Offers</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {OFFERS.map((o) => (
            <div key={o.title} className="lift group overflow-hidden rounded-3xl border border-gray-100 bg-white">
              <div className="h-44 overflow-hidden">
                <img src={o.img} alt={o.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <p className="mb-1.5 font-semibold text-gray-900">{o.title}</p>
                <p className="mb-4 text-sm leading-relaxed text-gray-500">{o.desc}</p>
                <button className="rounded-full border border-[#6c47ff] px-5 py-2 text-xs font-bold text-[#6c47ff] transition hover:bg-[#6c47ff] hover:text-white">
                  {o.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offers;