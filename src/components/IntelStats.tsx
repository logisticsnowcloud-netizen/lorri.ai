import { useInView } from "@/hooks/use-in-view";

export default function IntelStats() {
  const { ref, visible } = useInView();

  return (
    <section id="intelligence" ref={ref as any} className="bg-bg-alt py-[100px] px-8 relative overflow-hidden max-md:py-16 max-md:px-4">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%,hsl(246 44% 36% / 0.12) 0%,transparent 65%)" }} />
      <div className="max-w-[1100px] mx-auto relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[20px] text-[11px] font-bold tracking-wider uppercase bg-primary/[0.15] border border-border text-accent mb-5">
            By The Numbers
          </div>
          <h2 className="text-[2.8rem] max-md:text-[2rem] font-black text-foreground tracking-tight leading-[1.1] mb-4">
            National Scale,<br /><span className="text-primary">Real Intelligence</span>
          </h2>
          <p className="text-[17px] text-muted-foreground max-w-[500px] mx-auto leading-relaxed">
            LoRRI's freight intelligence spans multi-billion dollar spend data across 3 continents.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[3px]">
          {[
            { v: "80,000+", l: "Routes Mapped Worldwide", c: "#393185" },
            { v: "2,200+", l: "Carriers & Transporters", c: "#54AF3A" },
            { v: "$500M+", l: "Logistics Spend Procured", c: "#1AA6DF" },
            { v: "$21M+", l: "Total Savings Generated", c: "#B1D0EF" },
          ].map((s, i) => (
            <div key={i} className="py-10 px-6 text-center rounded-2xl" style={{
              background: `linear-gradient(160deg,${s.c}0A 0%,transparent 60%)`,
              border: `1px solid ${s.c}20`,
              animation: visible ? `fadeUp .7s ${i * 0.1}s ease both` : "none",
              opacity: visible ? undefined : 0,
            }}>
              <div className="font-mono text-[2.8rem] max-md:text-[2rem] font-black leading-none mb-2.5 tracking-tight" style={{ color: s.c }}>{s.v}</div>
              <div className="text-[13px] text-muted-foreground leading-normal">{s.l}</div>
            </div>
          ))}
        </div>
        <div className="mt-[52px] pt-10 border-t border-border-subtle text-center">
          <div className="text-[11px] text-muted-foreground tracking-widest uppercase mb-6">Trusted by India's Most Reputed Companies</div>
          <div className="flex justify-center items-center gap-4 flex-wrap">
            {["Fortune 500 Manufacturer", "Leading MNC", "Top 3PL", "Global Shipper", "Flipkart Ventures"].map((co, i) => (
              <div key={i} className="px-5 py-2.5 bg-card border border-border-subtle rounded-[10px]">
                <span className="text-[13px] text-primary/70 font-semibold">{co}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
