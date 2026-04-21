import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const DEALS = [
  { id: "1", from: "Lagos", to: "Dubai", date: "Dec 12 - Dec 20", price: 420000, badge: "Hot Deal", lock: "24h", image: "/deals/dubai.jpg" },
  { id: "2", from: "Lagos", to: "London", date: "Jan 5 - Jan 12", price: 510000, badge: "Limited", lock: "12h", image: "/deals/london.jpg" },
  { id: "3", from: "Lagos", to: "Paris", date: "Feb 2 - Feb 10", price: 480000, badge: "New", lock: "48h", image: "/deals/paris.jpg" },
  { id: "4", from: "Lagos", to: "New York", date: "Mar 10 - Mar 18", price: 750000, badge: "Trending", lock: "6h", image: "/deals/newyork.jpg" },
  { id: "5", from: "Lagos", to: "Johannesburg", date: "Apr 2 - Apr 9", price: 310000, badge: "Budget Deal", lock: "24h", image: "/deals/johannesburg.jpg" },
  { id: "6", from: "Lagos", to: "Istanbul", date: "May 1 - May 8", price: 390000, badge: "Special", lock: "18h", image: "/deals/istanbul.jpg" },
  { id: "7", from: "Lagos", to: "Toronto", date: "Jun 5 - Jun 14", price: 680000, badge: "Exclusive", lock: "12h", image: "/deals/toronto.jpg" },
];

const AIRLINE_BASE = [
  { name: "Air Peace", multiplier: 1 },
  { name: "Qatar Airways", multiplier: 1.5 },
  { name: "Emirates", multiplier: 1.7 },
  { name: "Turkish Airlines", multiplier: 1.4 },
  { name: "British Airways", multiplier: 1.6 },
];

const BASE_PRICE: Record<string, number> = {
  Dubai: 420000,
  London: 510000,
  Paris: 480000,
  "New York": 750000,
  Johannesburg: 310000,
  Istanbul: 390000,
  Toronto: 680000,
};

const formatNaira = (v: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(v);

function generateAirlines(destination: string) {
  const base = BASE_PRICE[destination] || 500000;

  return AIRLINE_BASE.map((airline) => ({
    name: airline.name,
    price: Math.round(base * airline.multiplier),
    duration: `${6 + Math.floor(Math.random() * 6)}h ${Math.floor(
      Math.random() * 60
    )}m`,
  }));
}

export default async function DealPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const deal = DEALS.find((d) => d.id === id);

  if (!deal) return notFound();

  const airlines = generateAirlines(deal.to);

  const otherDeals = DEALS.filter((d) => d.id !== id);

  return (
    <div className="min-h-screen bg-[#f6f7fb]">
      <Navbar />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-5 py-10">

        {/* LEFT MAIN CONTENT */}
        <div className="lg:col-span-2 space-y-6">

          {/* HERO */}
          <div className="relative h-[340px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={deal.image}
              alt={deal.to}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />

            <div className="absolute bottom-5 left-5 text-white">
              <span className="text-xs bg-white/10 px-3 py-1 rounded-full">
                ✈ {deal.badge}
              </span>

              <h1 className="text-3xl font-bold mt-2">
                {deal.from} → {deal.to}
              </h1>
              <p className="text-white/70 text-sm">{deal.date}</p>
            </div>
          </div>

          {/* AIRLINES */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4">
              Available Airlines
            </h2>

            <div className="space-y-3">
              {airlines.map((airline, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border rounded-xl p-4 hover:shadow-md transition"
                >
                  <div>
                    <p className="font-semibold">{airline.name}</p>
                    <p className="text-xs text-gray-500">
                      Duration: {airline.duration}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-[#6c47ff]">
                      {formatNaira(airline.price)}
                    </p>

                    <button className="mt-2 bg-[#ffd166] text-black text-xs px-4 py-2 rounded-full font-semibold hover:scale-105 transition">
                      Select
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOOK CTA */}
          <div className="bg-[#6c47ff] text-white rounded-2xl p-6 flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Best price available</p>
              <p className="text-2xl font-bold">
                {formatNaira(Math.min(...airlines.map(a => a.price)))}
              </p>
            </div>

            <button className="bg-white text-[#6c47ff] px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
              Continue Booking
            </button>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-4">

          <h3 className="font-bold text-gray-800">
            Other Deals
          </h3>

          {otherDeals.map((d) => (
            <Link
              key={d.id}
              href={`/deals/${d.id}`}
              className="flex gap-3 bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition"
            >
              <div className="relative w-20 h-16 rounded-lg overflow-hidden">
                <Image
                  src={d.image}
                  alt={d.to}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <p className="font-semibold text-sm">
                  {d.from} → {d.to}
                </p>
                <p className="text-xs text-gray-500">{d.date}</p>
                <p className="text-xs font-bold text-[#6c47ff]">
                  {formatNaira(d.price)}
                </p>
              </div>
            </Link>
          ))}

        </div>

      </div>
    </div>
  );
}