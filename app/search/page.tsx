import { useSearchParams } from "next/navigation";

const DESTINATIONS = [
  { name: "Dubai", country: "UAE", price: 420000 },
  { name: "London", country: "UK", price: 510000 },
  { name: "Paris", country: "France", price: 480000 },
  { name: "New York", country: "USA", price: 750000 },
  { name: "Toronto", country: "Canada", price: 680000 },
  { name: "Istanbul", country: "Turkey", price: 390000 },
];

const formatNaira = (v: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(v);

export default function SearchPage() {
  const params = useSearchParams();
  const query = params.get("q") || "";

  const results = DESTINATIONS.filter((d) =>
    d.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f9f9ff] p-6">

      <h1 className="text-2xl font-bold mb-6">
        Results for "{query}"
      </h1>

      <div className="grid md:grid-cols-2 gap-4">

        {results.map((item) => (
          <div
            key={item.name}
            className="bg-white p-5 rounded-2xl shadow-sm border"
          >
            <h2 className="font-bold text-lg">{item.name}</h2>
            <p className="text-gray-500 text-sm">{item.country}</p>

            <p className="mt-3 font-bold text-[#6c47ff]">
              {formatNaira(item.price)}
            </p>

            <button className="mt-3 bg-[#ffd166] px-4 py-2 rounded-full text-sm font-semibold">
              View Flights
            </button>
          </div>
        ))}

      </div>

    </div>
  );
}