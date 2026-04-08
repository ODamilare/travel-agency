import { FEATURES } from "@/data/data";

export default function WhyUs() {
  return (
     <section className="bg-white px-5 py-14 md:px-10 md:py-18">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-xl">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#6c47ff]">Why UXTravelerz</p>
            <h2 className="sora text-2xl font-extrabold text-gray-900 md:text-3xl">Travel smarter, not harder</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">We search hundreds of travel sites at once to find you the very best deals on flights, hotels, holiday homes and hire cars.</p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="lift group rounded-3xl border border-gray-100 bg-[#f8f7ff] p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#6c47ff]/10 text-[#6c47ff] transition duration-200 group-hover:bg-[#6c47ff] group-hover:text-white">
                  {f.icon}
                </div>
                <p className="mb-1.5 font-semibold text-gray-900">{f.title}</p>
                <p className="text-sm leading-relaxed text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

  );
}