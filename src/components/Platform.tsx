import { useInView } from "@/hooks/use-in-view";
import { Check } from "./Icons";

const feats = [
  {
    ic: "🧠", c: "#393185", n: "01", title: "Logistics Intelligence",
    desc: "Trusted, deep data intelligence for freight spanning transportation and shipping across India and worldwide. Real-time benchmarks, not estimates.",
    pts: ["National Freight Benchmark", "Real-time rate intelligence", "Lane demand forecasting", "Historical trend analysis"],
  },
  {
    ic: "📊", c: "#54AF3A", n: "02", title: "Benchmarking & Procurement",
    desc: "Guaranteed results through fully integrated AI-powered procurement. Always get the best carrier at the best price — automatically.",
    pts: ["AI-powered carrier matching", "Automated bidding engine", "2,200+ verified transporters", "Cost reduction guarantees"],
  },
  {
    ic: "🗺️", c: "#1AA6DF", n: "03", title: "Optimisation",
    desc: "Next-level logistics optimisation for national networks — routes, truck types, modes, and network design creating multi-year value creation.",
    pts: ["Route optimisation engine", "Multi-modal planning", "Network design tools", "Sustained value creation"],
  },
];

export default function Platform() {
  const { ref, visible } = useInView();

  return (
    <section id="platform" ref={ref as any} className="bg-background py-[100px] px-8 max-md:py-16 max-md:px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[20px] text-[11px] font-bold tracking-wider uppercase bg-primary/[0.15] border border-border text-accent mb-5">
            Platform Capabilities
          </div>
          <h2 className="text-[2.8rem] max-md:text-[2rem] font-black text-foreground tracking-tight leading-[1.1] mb-[18px]">
            The Digital Backbone<br /><span className="text-primary">of Indian Logistics</span>
          </h2>
          <p className="text-[17px] text-muted-foreground max-w-[540px] mx-auto leading-relaxed">
            LogisticsNow uses the power of Data Science to solve problems of Carriers and Manufacturers — organising the industry, optimising operations, time and revenue.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {feats.map((p, i) => (
            <div key={i} className="bg-card border-[1.5px] border-border-subtle rounded-2xl p-7 relative overflow-hidden hover:border-primary/50 hover:-translate-y-[5px] hover:shadow-[0_16px_48px_hsl(246_44%_36%/0.2)] transition-all"
              style={{ animation: visible ? `fadeUp .7s ${i * 0.15}s ease both` : "none", opacity: visible ? undefined : 0 }}>
              <div className="font-mono absolute top-4 right-5 text-[64px] font-black leading-none pointer-events-none" style={{ color: `${p.c}09` }}>{p.n}</div>
              <div className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center mb-[22px] text-2xl" style={{ background: `${p.c}18`, border: `1px solid ${p.c}35` }}>
                {p.ic}
              </div>
              <h3 className="text-[19px] font-extrabold text-foreground mb-3">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-[22px]">{p.desc}</p>
              <div className="flex flex-col gap-[9px]">
                {p.pts.map((pt, j) => (
                  <div key={j} className="flex items-center gap-2.5">
                    <Check color={p.c} size={13} />
                    <span className="text-[13px] text-muted-foreground">{pt}</span>
                  </div>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg,${p.c},transparent)` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
