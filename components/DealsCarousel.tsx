"use client";

import { useRef } from "react";
import { DEALS } from "@/data/data";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function DealsCarousel() {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    ref.current?.scrollBy({
      left: dir === "right" ? 300 : -300,
      behavior: "smooth",
    });
  };

  return (
    <section className="px-6 py-12">
      <div className="flex justify-between">
        <h2>Flight Deals</h2>
        <div>
          <button onClick={() => scroll("left")}>
            <MdChevronLeft />
          </button>
          <button onClick={() => scroll("right")}>
            <MdChevronRight />
          </button>
        </div>
      </div>

      <div ref={ref} className="flex overflow-x-auto gap-4 mt-6">
        {DEALS.map((d, i) => (
          <div key={i} className="min-w-[250px] p-6 rounded-xl text-white" style={{ background: d.bg }}>
            <p>{d.from} → {d.to}</p>
            <p>{d.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}