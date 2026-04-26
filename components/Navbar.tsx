"use client";

import Link from "next/link";
import { useState } from "react";
import {
  MdMenu,
  MdClose,
  MdKeyboardArrowDown,
  MdLuggage,
  MdPerson,
  MdBook,
  MdMessage,
  MdSettings,
  MdLogout,
} from "react-icons/md";

import { useSession, signOut } from "next-auth/react";
import { getRandomAvatar } from "@/lib/avatar";
import { useEffect, useRef } from "react";
import { NAV_LINKS } from "@/data/data";
import RegisterModal from "./RegisterModal";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-10 py-1 md:px-10">

         {/* LOGO */}
<Link href="/home" className="flex items-center">
  <img
    src="/logo.png"
    alt="Logo"
    className="h-20 w-30 md:h-24 md:w-34 lg:h-28 lg:w-38 object-contain"
  />
</Link>

          {/* Desktop Links */}
          <div className="hidden items-center gap-8 md:flex">
           {NAV_LINKS.map((l) => (
  <Link
    key={l.name}
    href={l.href}
    className="text-sm font-medium text-[#6c47ff] hover:text-[#5333ff] transition-colors duration-200"
  >
    {l.name}
  </Link>
))}
          </div>

          {/* AUTH SECTION */}
          <div className="hidden items-center gap-3 md:flex">

            {!session ? (
              <>
                <Link
                  href="/login"
                  className="rounded-full border border-[#6c47ff]/40 px-5 py-2 text-[#6c47ff] hover:bg-[#6c47ff]/10 transition"
                >
                  Sign In
                </Link>

                <Link
                  href="/register"
                  className="rounded-full bg-[#6c47ff] px-5 py-2 text-white font-semibold hover:opacity-90 transition"
                >
                  Create an account
                </Link>
              </>
            ) : (
              <div className="relative">

                {/* PROFILE BUTTON */}
                <div
                  onClick={() => setOpenProfile((v) => !v)}
                  className="flex items-center gap-2 rounded-full bg-[#6c47ff]/10 px-3 py-1.5 cursor-pointer hover:bg-[#6c47ff]/20 transition"
                >
                  <img
                    src={getRandomAvatar(session.user?.email || "user")}
                    alt="profile"
                    className="h-9 w-9 rounded-full object-cover border border-[#6c47ff]/30"
                  />

                  <span className="text-sm text-[#6c47ff] font-medium max-w-[120px] truncate">
                    {session.user?.name || "User"}
                  </span>

                  <MdKeyboardArrowDown className="text-[#6c47ff]" size={18} />
                </div>

                {/* DROPDOWN */}
                {openProfile && (
                  <div
                    className="absolute right-0 mt-3 w-56 rounded-2xl bg-white shadow-2xl overflow-hidden border border-[#6c47ff]/20"
                    ref={profileRef}
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-black">
                        {session.user?.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {session.user?.email}
                      </p>
                    </div>

                    <div className="py-2">
                      <Link href="/trips" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100">
                        <MdLuggage size={18} />
                        My Trips
                      </Link>

                      <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100">
                        <MdPerson size={18} />
                        Profile
                      </Link>

                      <Link href="/bookings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100">
                        <MdBook size={18} />
                        Bookings
                      </Link>

                      <Link href="/messages" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100">
                        <MdMessage size={18} />
                        Messages
                      </Link>

                      <Link href="/account" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100">
                        <MdSettings size={18} />
                        Account Info
                      </Link>
                    </div>

                    <button
                      onClick={() => signOut()}
                      className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 border-t"
                    >
                      <MdLogout size={18} />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="text-[#6c47ff] md:hidden"
          >
            {mobileOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="border-t border-[#6c47ff]/10 bg-white px-5 py-5 md:hidden flex-col ">
          {NAV_LINKS.map((l) => (
             <Link
    key={l.name}
    href={l.href}
    className="text-sm flex flex-col font-medium text-[#6c47ff] hover:text-[#5333ff] transition-colors duration-200"
  >
    {l.name}
  </Link>
            ))}
            {session && (
              <Link
                href="/profile"
                className="flex items-center gap-3 mb-4 p-3 rounded-xl border border-gray-200 active:scale-[0.98] transition"
              >
                <img
                  src={getRandomAvatar(session.user?.email || "user")}
                  className="h-10 w-10 rounded-full object-cover"
                  alt="profile"
                />

                <div>
                  <p className="text-sm font-semibold text-black">
                    {session.user?.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {session.user?.email}
                  </p>
                </div>
              </Link>
            )}

  

            <div className="mt-5 flex gap-3">

              {!session ? (
                <>
                  <Link
                    href="/login"
                    className="flex-1 rounded-full border border-[#6c47ff] py-3 text-center text-[#6c47ff]"
                  >
                    Sign In
                  </Link>

                  <button
                    onClick={() => setOpenRegister(true)}
                    className="flex-1 rounded-full bg-[#6c47ff] py-3 text-white font-semibold"
                  >
                    Register
                  </button>
                </>
              ) : (
                <button
                  onClick={() => signOut()}
                  className="w-full rounded-full bg-purple-500 py-3 text-white"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      <RegisterModal
        open={openRegister}
        onClose={() => setOpenRegister(false)}
      />
    </>
  );
}