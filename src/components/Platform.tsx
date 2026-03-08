import { useInView } from "@/hooks/use-in-view";
import { Check } from "./Icons";

const feats = [
  { ic: "🧠", c: "#393185", n: "01", title: "Logistics Intelligence", desc: "Trusted, deep data intelligence for freight spanning transportation and shipping across India and worldwide.", pts: ["National Freight Benchmark", "Real-time rate intelligence", "Lane demand forecasting", "Historical trend analysis"] },
  { ic: "📊", c: "#54AF3A", n: "02", title: "Benchmarking & Procurement", desc: "Guaranteed results through fully integrated AI-powered procurement. Always get the best carrier at the best price.", pts: ["AI-powered carrier matching", "Automated bidding engine", "2,200+ verified transporters", "Cost reduction guarantees"] },
  { ic: "🗺️", c: "#1AA6DF", n: "03", title: "Optimisation & TMS", desc: "Next-level logistics optimisation for national networks — routes, modes, and network design creating multi-year value.", pts: ["Route optimisation engine", "Multi-modal planning", "Network design tools", "Real-time tracking"] },
];

export default function Platform() {
  const { ref, visible } = useInView();

  return (
    <section id="platform" ref={ref as any} style={{ background: "var(--bg)", padding: "100px 32px" }} className="max-md:py-16 max-md:px-4">
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", background: "var(--purpleLt)", border: "1px solid var(--border)", color: "#B1D0EF", marginBottom: 18 }}>Platform Capabilities</div>
          <h2 style={{ fontSize: "2.7rem", fontWeight: 900, color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 16 }} className="max-md:!text-[1.9rem]">
            The Digital Backbone<br /><span style={{ color: "#393185" }}>of Indian Logistics</span>
          </h2>
          <p style={{ fontSize: 16, color: "var(--text2)", maxWidth: 520, margin: "0 auto", lineHeight: 1.75 }}>
            LogisticsNow uses the power of Data Science to solve problems of Carriers and Manufacturers — organising the industry, optimising operations, time and revenue.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }} className="max-md:!grid-cols-1">
          {feats.map((p, i) => (
            <div key={i} style={{ background: "var(--card)", border: "1.5px solid var(--border)", borderRadius: 16, padding: 28, transition: "all .3s", position: "relative", overflow: "hidden", animation: visible ? `fadeUp .7s ${i * 0.15}s ease both` : "none", opacity: visible ? undefined : 0 }}>
              <div className="font-mono" style={{ position: "absolute", top: 16, right: 20, fontSize: 60, fontWeight: 900, color: `${p.c}08`, lineHeight: 1, pointerEvents: "none" }}>{p.n}</div>
              <div style={{ width: 50, height: 50, borderRadius: 14, background: `${p.c}18`, border: `1px solid ${p.c}35`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, fontSize: 22 }}>{p.ic}</div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--text)", marginBottom: 10 }}>{p.title}</h3>
              <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.7, marginBottom: 20 }}>{p.desc}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {p.pts.map((pt, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Check color={p.c} size={12} /><span style={{ fontSize: 13, color: "var(--text2)" }}>{pt}</span>
                  </div>
                ))}
              </div>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${p.c},transparent)` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
