import { FEATURES } from "@/data/data";

export default function WhyUs() {
  return (
    <section className="px-6 py-12 bg-white">
      <h2>Why Choose Us</h2>

      <div className="grid md:grid-cols-4 gap-6 mt-6">
        {FEATURES.map((f) => (
          <div key={f.title}>
            {f.icon}
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}