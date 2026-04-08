"use client";

import Link from "next/link";
import { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import Logo from "./Logo";
import { NAV_LINKS } from "@/data/data";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
   <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#6c47ff]/96 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 md:px-10">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo size={34} />
            <span className="sora text-sm font-bold tracking-[0.15em] text-white">UXTRAVELERZ</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((l) => (
              <Link key={l} href="#" className="nav-link text-[13px] font-medium text-white/80 transition hover:text-white">{l}</Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link href="/login" className="rounded-full border border-white/30 px-5 py-2 text-[13px] font-medium text-white transition hover:bg-white/10">Sign In</Link>
            <Link href="/register" className="rounded-full bg-white px-5 py-2 text-[13px] font-semibold text-[#6c47ff] transition hover:bg-white/90 hover:shadow-lg">Register</Link>
          </div>

          <button onClick={() => setMobileOpen((v) => !v)} className="text-white md:hidden">
            {mobileOpen ? <MdClose size={26} /> : <MdMenu size={26} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-white/10 bg-[#5a38e0] px-5 py-5 md:hidden">
            {NAV_LINKS.map((l) => (
              <Link key={l} href="#" className="block py-2.5 text-sm font-medium text-white/85 transition hover:text-white">{l}</Link>
            ))}
            <div className="mt-5 flex gap-3">
              <Link href="/login"    className="flex-1 rounded-full border border-white/30 py-3 text-center text-sm text-white">Sign In</Link>
              <Link href="/register" className="flex-1 rounded-full bg-white py-3 text-center text-sm font-bold text-[#6c47ff]">Register</Link>
            </div>
          </div>
        )}
      </nav>
  );
}