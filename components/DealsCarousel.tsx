"use client";

import { useRef } from "react";
import { MdChevronLeft, MdChevronRight, MdFlight } from "react-icons/md";
import { HiOutlineShieldCheck } from "react-icons/hi2";
import Link from "next/link";

export default function DealsCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const deals = [
    { id: 1, from: "Lagos", to: "Dubai", date: "Dec 12 - Dec 20", price: 420000, badge: "Hot Deal", lock: "24h", image: "/deals/dubai.jpg" },
    { id: 2, from: "Lagos", to: "London", date: "Jan 5 - Jan 12", price: 510000, badge: "Limited", lock: "12h", image: "/deals/london.jpg" },
    { id: 3, from: "Lagos", to: "Paris", date: "Feb 2 - Feb 10", price: 480000, badge: "New", lock: "48h", image: "/deals/paris.jpg" },
    { id: 4, from: "Lagos", to: "New York", date: "Mar 10 - Mar 18", price: 750000, badge: "Trending", lock: "6h", image: "/deals/newyork.jpg" },
    { id: 5, from: "Lagos", to: "Johannesburg", date: "Apr 2 - Apr 9", price: 310000, badge: "Budget Deal", lock: "24h", image: "/deals/johannesburg.jpg" },
    { id: 6, from: "Lagos", to: "Istanbul", date: "May 1 - May 8", price: 390000, badge: "Special", lock: "18h", image: "/deals/istanbul.jpg" },
    { id: 7, from: "Lagos", to: "Toronto", date: "Jun 5 - Jun 14", price: 680000, badge: "Exclusive", lock: "12h", image: "/deals/toronto.jpg" },
  ];

  const scroll = (dir: "left" | "right") => {
    if (!carouselRef.current) return;

    carouselRef.current.scrollBy({
      left: dir === "right" ? 360 : -360,
      behavior: "smooth",
    });
  };

  const formatNaira = (value: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(value);

  const badgeColor = (badge: string) => {
    switch (badge) {
      case "Hot Deal":
        return "bg-red-500/90";
      case "Limited":
        return "bg-purple-500/90";
      case "Budget Deal":
        return "bg-green-500/90";
      default:
        return "bg-[#6c47ff]/90";
    }
  };

  return (
    <section className="px-5 py-16 md:px-10 bg-[#f9f9ff]">
      <div className="mx-auto max-w-7xl relative">

        {/* HEADER */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-[11px] font-bold tracking-[0.25em] text-[#6c47ff] uppercase">
              Flight Deals
            </p>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Cheap Flights from Lagos
            </h2>
          </div>

          {/* arrows (cleaner + subtle) */}
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="h-10 w-10 rounded-full bg-white border shadow-sm hover:shadow-md transition flex items-center justify-center"
            >
              <MdChevronLeft size={22} />
            </button>

            <button
              onClick={() => scroll("right")}
              className="h-10 w-10 rounded-full bg-white border shadow-sm hover:shadow-md transition flex items-center justify-center"
            >
              <MdChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* CAROUSEL */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4"
        >
          {deals.map((deal) => (
            <Link
              key={deal.id}
              href={`/deals/${deal.id}`}
              className="relative flex-shrink-0 w-[340px] rounded-2xl overflow-hidden shadow-md group bg-white"
            >

              {/* IMAGE */}
              <div className="relative h-[220px] w-full overflow-hidden">
                <img
                  src={deal.image}
                  alt={deal.to}
                  className="h-full w-full object-cover group-hover:scale-105 transition duration-700"
                />

                {/* soft overlay (NOT too dark) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

                {/* badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`text-white text-[10px] px-3 py-1 rounded-full ${badgeColor(
                      deal.badge
                    )}`}
                  >
                    {deal.badge}
                  </span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5">

                {/* route */}
                <div className="flex items-center justify-between text-sm font-medium text-gray-900">
                  <span>{deal.from}</span>

                  {/* fixed airplane line (NO SHIFTING EVER) */}
                  <div className="flex-1 mx-3 relative">
                    <div className="border-t border-dashed border-gray-300" />
                    <div className="absolute left-1/2 -translate-x-1/2 -top-[10px] text-[#6c47ff]">
                      <MdFlight size={18} />
                    </div>
                  </div>

                  <span>{deal.to}</span>
                </div>

                <p className="text-xs text-gray-500 mt-1">{deal.date}</p>

                {/* price + CTA */}
                <div className="mt-4 flex items-end justify-between">

                  <div>
                    <p className="text-[11px] text-gray-400">From</p>
                    <p className="text-xl font-extrabold text-gray-900">
                      {formatNaira(deal.price)}
                    </p>
                  </div>

                  <button className="bg-gradient-to-r from-[#ffd166] to-[#ffb703]
shadow-md shadow-yellow-200 text-black text-xs font-semibold px-4 py-2 rounded-full hover:bg-[#ffcc4d] transition flex items-center gap-1">
                    <HiOutlineShieldCheck size={14} />
                    Lock {deal.lock}
                  </button>

                </div>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}