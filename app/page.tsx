"use client";

import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const SplashPage: NextPage = () => {
  // Add your hero images here
  const images = [
    "/images/hero-bg.jpg",
    "/images/hero-bg-2.jpg",
    "/images/hero-bg-3.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000); // change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Background images with crossfade */}
      <div className="absolute inset-0 -z-10">
        {images.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt="Travel destination background"
            fill
            priority
            className={`object-cover object-center transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/30 to-black/90 md:bg-gradient-to-r md:from-black/80 md:via-black/50 md:to-black/20" />

      {/* ── MOBILE LAYOUT ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex min-h-screen flex-col md:hidden"
      >
        {/* Skip */}
        <div className="flex justify-end p-5">
          <Link
            href="/home"
            className="rounded-full bg-white/15 px-5 py-1.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/25"
          >
            Explore
          </Link>
        </div>

        {/* Logo + tagline */}
        <div className="flex flex-col items-center pt-4">
          <Logo size={56} />
          <p className="mt-2 text-base font-bold tracking-[0.18em] text-white">
            UXTRAVELERZ
          </p>
          <p className="mt-2 max-w-[240px] text-center text-sm leading-relaxed text-white/80">
            Your journey to the world's most hidden gems starts here
          </p>
        </div>

        <div className="flex-1" />

        {/* Content */}
        <div className="px-6 pb-12">
          <h1 className="text-3xl font-bold text-white">
            Where Will You Go Next?
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-white/70">
            Book flights, hotels, and unique travel experiences across 1,000+ destinations worldwide.
          </p>

          {/* CTA */}
          <div className="mt-7 flex flex-col gap-3">
            <Link
              href="/home"
              className="w-full rounded-full bg-white py-4 text-center text-sm font-semibold text-gray-900 transition hover:bg-gray-200 active:scale-[0.98]"
            >
              Explore as Guest
            </Link>

            <Link
              href="/register"
              className="w-full rounded-full bg-violet-500 py-4 text-center text-sm font-medium text-white transition hover:bg-violet-600 active:scale-[0.98]"
            >
              Create Account
            </Link>

            <Link
              href="/login"
              className="w-full rounded-full border border-white/40 py-4 text-center text-sm font-medium text-white transition hover:bg-white/10 active:scale-[0.98]"
            >
              Sign In
            </Link>
          </div>
        </div>
      </motion.div>

      {/* ── DESKTOP LAYOUT ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden min-h-screen md:flex md:flex-col"
      >
        {/* Navbar */}
        <nav className="flex items-center justify-between px-10 py-6">
          <div className="flex items-center gap-3">
            <Logo size={40} />
            <span className="text-sm font-bold tracking-[0.18em] text-white">
              UXTRAVELERZ
            </span>
          </div>

          <Link
            href="/home"
            className="rounded-full border border-white/35 px-6 py-2 text-sm text-white transition hover:bg-white/15"
          >
            Explore
          </Link>
        </nav>

        {/* Hero */}
        <div className="flex flex-1 flex-col justify-center px-14 lg:px-20 xl:px-28">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/60">
            Travel the world
          </p>

          <h1 className="max-w-lg text-5xl font-extrabold leading-[1.12] text-white lg:text-6xl">
            Where Will <br /> You Go Next?
          </h1>

          <p className="mt-4 max-w-sm text-base leading-relaxed text-white/75">
            Discover hidden gems, iconic destinations, and unforgettable experiences.
          </p>

          <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/55">
            Book flights, hotels, and curated travel packages across 1,000+ destinations worldwide.
          </p>

          {/* CTA */}
          <div className="mt-9 flex gap-4">
            <Link
              href="/home"
              className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-200"
            >
              Explore as Guest
            </Link>

            <Link
              href="/register"
              className="rounded-full bg-violet-500 px-8 py-3.5 text-sm font-medium text-white transition hover:bg-violet-600"
            >
              Create Account
            </Link>

            <Link
              href="/login"
              className="rounded-full border border-white/40 px-8 py-3.5 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="h-16" />
      </motion.div>
    </main>
  );
};

export default SplashPage;

/* ── Logo ── */
function Logo({ size }: { size: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        background:
          "conic-gradient(#f5a623 0deg 180deg, #4a3fbf 180deg 360deg)",
      }}
    >
      <div
        className="rounded-full bg-black/30"
        style={{ width: size * 0.62, height: size * 0.62 }}
      />
    </div>
  );
}