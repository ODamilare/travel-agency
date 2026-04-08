import { CATEGORIES } from "@/data/data";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24" style={{ background: "linear-gradient(135deg,#6c47ff 0%,#9b72ff 55%,#c4a8ff 100%)" }}>
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full" style={{ background: "linear-gradient(to bottom, transparent, rgba(248,247,255,1))" }} />

        <div className="relative mx-auto max-w-7xl">
          <span className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/75 backdrop-blur-sm">
            Over 1,000 destinations worldwide
          </span>
          <h1 className="sora mb-5 text-4xl font-black leading-[1.08] text-white md:text-6xl lg:text-7xl">
            Your next<br />
            <span className="text-[#ffd166]">adventure</span><br />
            awaits
          </h1>
          <p className="mb-10 max-w-md text-base text-white/70 md:text-lg">
            Flights, hotels, rides and experiences — all in one beautifully simple place.
          </p>

          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => (
              <button key={cat.label} className="flex items-center gap-2.5 rounded-2xl bg-white/12 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/22 hover:shadow-lg active:scale-95">
                <span className="opacity-80">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>
  );
}