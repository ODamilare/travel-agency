"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
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

const PopularHotels: React.FC<PopularHotelsProps> = ({ HOTELS }) => (
  <section className="bg-white px-5 py-14 md:px-10 md:py-18">
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#6c47ff]">
          Explore
        </p>
        <h2 className="sora text-2xl font-extrabold text-gray-900 md:text-3xl">
          Hotels in Popular Locations
        </h2>
      </div>

      <Swiper
        spaceBetween={20}
        slidesPerView={2}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 25 },
          1024: { slidesPerView: 4, spaceBetween: 30 },
        }}
      >
        {HOTELS.map((h) => (
          <SwiperSlide key={h.city}>
            <div className="lift group relative cursor-pointer overflow-hidden rounded-3xl">
              <img
                src={h.img}
                alt={h.city}
                className="h-44 w-full object-cover transition duration-500 group-hover:scale-105 md:h-64"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-4">
                <p className="sora font-bold text-white">{h.city}</p>
                <p className="text-xs text-white/65">{h.sub}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
);

export default PopularHotels;