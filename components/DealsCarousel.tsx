"use client";

import { useRef } from "react";
import { DEALS } from "@/data/data";

import { MdFlight, MdChevronLeft, MdChevronRight } from "react-icons/md";

import { HiOutlineShieldCheck, HiOutlineClock, HiOutlineGlobeAlt, HiOutlineSparkles } from "react-icons/hi2";

export default function DealsCarousel() {
   const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    carouselRef.current?.scrollBy({ left: dir === "right" ? 310 : -310, behavior: "smooth" });
  };

  return (
     <section className="px-5 py-14 md:px-10 md:py-18">
            <div className="mx-auto max-w-7xl">
              <div className="mb-8 flex items-end justify-between">
                <div>
                  <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#6c47ff]">Limited time</p>
                  <h2 className="sora text-2xl font-extrabold text-gray-900 md:text-3xl">Today's Flight Deals</h2>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => scroll("left")}  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-[#6c47ff] hover:text-[#6c47ff]"><MdChevronLeft size={22} /></button>
                  <button onClick={() => scroll("right")} className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-[#6c47ff] hover:text-[#6c47ff]"><MdChevronRight size={22} /></button>
                </div>
              </div>
    
              <div ref={carouselRef} className="no-scrollbar flex gap-5 overflow-x-auto pb-4" style={{ scrollSnapType: "x mandatory" }}>
                {DEALS.map((deal, i) => (
                  <div key={i} className="lift relative flex-shrink-0 cursor-pointer overflow-hidden rounded-[28px]" style={{ width: 288, minHeight: 360, background: deal.bg, scrollSnapAlign: "start" }}>
                    {/* Glow */}
                    <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 15% 85%, rgba(255,255,255,0.07) 0%, transparent 65%)" }} />
                    {/* Top grain texture feel */}
                    <div className="pointer-events-none absolute inset-0 opacity-30" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")" }} />
    
                    <div className="relative flex h-full flex-col justify-between p-6" style={{ minHeight: 360 }}>
                      <div>
                        <span className="mb-5 inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-white/70">
                          {deal.badge}
                        </span>
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-sm font-medium text-white/65">{deal.from}</span>
                          <MdFlight size={14} className="rotate-90 text-[#ffd166]" />
                          <span className="text-sm font-bold text-white">{deal.to}</span>
                        </div>
                        <p className="mb-6 text-xs text-white/40">{deal.date}</p>
                        <p className="sora text-5xl font-black uppercase leading-none tracking-tight text-white/8 select-none">{deal.to}</p>
                      </div>
                      <div>
                        <p className="mb-0.5 text-[10px] font-medium text-white/45">Pay now from</p>
                        <p className="sora mb-4 text-2xl font-extrabold text-white">{deal.price}</p>
                        <button className="flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-white transition hover:opacity-90 active:scale-95" style={{ background: "linear-gradient(135deg,#f5a623,#f07c10)" }}>
                          <HiOutlineShieldCheck size={16} />
                          Lock · {deal.lock}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
  );
}