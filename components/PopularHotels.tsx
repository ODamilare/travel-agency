"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Hotel {
  city: string;
  sub: string;
  img: string;
}

interface PopularHotelsProps {
  HOTELS: Hotel[];
}

const PopularHotels: React.FC<PopularHotelsProps> = ({ HOTELS }) => {
  return (
    <section className="bg-white px-5 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#6c47ff]">
            Explore
          </p>
          <h2 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
            Hotels in Popular Locations
          </h2>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={2}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {HOTELS.map((h, i) => (
            <SwiperSlide key={h.city}>

              <div className="group relative cursor-pointer overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">

                {/* IMAGE */}
                <Image
                  src={h.img}
                  alt={h.city}
                  width={500}
                  height={400}
                  className="h-52 w-full object-cover transition duration-700 group-hover:scale-110 md:h-64"
                />

                {/* OVERLAY (layered = premium look) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#6c47ff]/10 to-transparent" />

                {/* TOP BADGE */}
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white">
                    Popular
                  </span>
                </div>

                {/* TEXT */}
                <div className="absolute bottom-0 p-5 w-full">

                  <p className="text-lg font-bold text-white tracking-tight">
                    {h.city}
                  </p>

                  <p className="text-xs text-white/70 mt-1">
                    {h.sub}
                  </p>

                  {/* subtle divider */}
                  <div className="mt-3 h-[1px] w-10 bg-white/30" />

                </div>

              </div>

            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default React.memo(PopularHotels);