import { useInView } from "@/hooks/use-in-view";
import { Check, Arrow } from "./Icons";
import { scrollTo } from "@/hooks/use-in-view";

export function ForShippers() {
  const { ref, visible } = useInView();

  return (
    <section id="shippers" ref={ref as any} className="bg-bg-alt py-[100px] px-8 max-md:py-16 max-md:px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div style={{ animation: visible ? "fadeUp .7s ease both" : "none", opacity: visible ? undefined : 0 }}>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[20px] text-[11px] font-bold tracking-wider uppercase bg-primary/[0.15] border border-border text-accent mb-[22px]">
              For Shippers & Manufacturers
            </div>
            <h2 className="text-[2.5rem] max-md:text-[2rem] font-black text-foreground tracking-tight leading-[1.1] mb-5">
              Procure Freight<br /><span className="text-primary">With Confidence</span>
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              LoRRI gives manufacturers and shippers a data-driven platform to procure logistics services with guaranteed savings, real-time benchmarks, and access to 2,200+ rated carriers.
            </p>
            <div className="flex flex-col gap-3.5 mb-9">
              {[
                { t: "National Freight Benchmark", d: "Access India's deepest freight rate intelligence for every lane, truck type, and mode." },
                { t: "AI-Powered Procurement", d: "Automated bidding, carrier matching, and cost optimisation — guaranteed savings." },
                { t: "LoRRI Ratings & Scores", d: "Every carrier rated on reliability, service quality, and performance metrics." },
                { t: "End-to-End Visibility", d: "Track, manage, and optimise your entire logistics spend in one platform." },
              ].map((f, i) => (
                <div key={i} className="flex gap-3.5 p-[15px_18px] bg-card border border-border-subtle rounded-xl hover:border-primary/30 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                  <div>
                    <div className="font-bold text-sm text-foreground mb-0.5">{f.t}</div>
                    <div className="text-[13px] text-muted-foreground leading-relaxed">{f.d}</div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => scrollTo("cta")} className="inline-flex items-center gap-2 bg-gradient-to-br from-primary to-primary-glow text-primary-foreground border-none px-7 py-3.5 rounded-lg font-outfit text-[15px] font-bold cursor-pointer tracking-wider uppercase shadow-[0_4px_20px_hsl(246_44%_36%/0.45)] hover:-translate-y-0.5 transition-all">
              Start Saving Now <Arrow />
            </button>
          </div>
          {/* Dashboard mockup - desktop only */}
          <div className="hidden md:block" style={{ animation: visible ? "fadeUp .7s .2s ease both" : "none", opacity: visible ? undefined : 0 }}>
            <div className="bg-card border-[1.5px] border-border rounded-[20px] p-7">
              <div className="text-xs text-muted-foreground font-bold mb-4 tracking-wider uppercase">Freight Benchmark — Live Dashboard</div>
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { l: "Avg Rate", v: "₹1.82/km", c: "text-foreground" },
                  { l: "vs Market", v: "-14.2%", c: "text-success" },
                  { l: "Coverage", v: "80K Routes", c: "text-accent" },
                ].map((m, i) => (
                  <div key={i} className="p-3 bg-card-alt rounded-xl text-center">
                    <div className="text-[9px] text-muted-foreground mb-1">{m.l}</div>
                    <div className={`font-mono text-base font-bold ${m.c}`}>{m.v}</div>
                  </div>
                ))}
              </div>
              {["Mumbai → Delhi", "Bangalore → Chennai", "Pune → Ahmedabad"].map((lane, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-border-subtle last:border-none">
                  <span className="text-[13px] text-foreground font-semibold">{lane}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-success font-bold">-{12 + i * 3}%</span>
                    <div className="w-[80px] h-1.5 bg-card-alt rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-success to-success/50 rounded-full" style={{ width: `${70 + i * 10}%`, transition: visible ? `width 1.2s ${i * 0.2}s ease` : undefined }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ForTransporters() {
  const { ref, visible } = useInView();

  return (
    <section id="transporters" ref={ref as any} className="bg-background py-[100px] px-8 max-md:py-16 max-md:px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          {/* Profile card - desktop */}
          <div className="hidden md:block" style={{ animation: visible ? "fadeUp .7s ease both" : "none", opacity: visible ? undefined : 0 }}>
            <div className="bg-card border-[1.5px] border-border rounded-[20px] p-7">
              <div className="text-xs text-muted-foreground font-bold mb-4 tracking-wider uppercase">Transporter Profile — LoRRI Score</div>
              <div className="flex items-center gap-[18px] mb-[22px] p-4 bg-card-alt rounded-xl">
                <div className="w-[54px] h-[54px] rounded-full bg-gradient-to-br from-success to-accent flex items-center justify-center font-black text-xl text-primary-foreground">A+</div>
                <div>
                  <div className="font-extrabold text-base text-foreground">FastFreight Logistics</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Mumbai · 48 Trucks · Since 2018</div>
                  <div className="flex gap-1.5 mt-2">
                    {["Verified", "Top Rated", "On-Time"].map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-success/[0.12] border border-success/30 rounded-[20px] text-[10px] text-success font-bold">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
              {[
                { l: "On-Time Delivery", v: 98, c: "#54AF3A" },
                { l: "Customer Rating", v: 96, c: "#1AA6DF" },
                { l: "Route Coverage", v: 84, c: "#393185" },
                { l: "Response Rate", v: 92, c: "#54AF3A" },
              ].map((m, i) => (
                <div key={i} className={i < 3 ? "mb-3.5" : ""}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-[13px] text-muted-foreground">{m.l}</span>
                    <span className="font-mono text-[13px] font-bold" style={{ color: m.c }}>{m.v}%</span>
                  </div>
                  <div className="h-1.5 bg-card-alt rounded-sm overflow-hidden">
                    <div className="h-full rounded-sm" style={{ width: visible ? `${m.v}%` : "0%", background: `linear-gradient(90deg,${m.c},${m.c}88)`, transition: `width 1.2s ${i * 0.2}s ease` }} />
                  </div>
                </div>
              ))}
              <div className="mt-[18px] p-3 px-4 bg-primary/[0.15] border border-border rounded-[10px] flex justify-between items-center">
                <span className="text-[13px] text-accent">3 new load offers matching your routes</span>
                <button className="inline-flex items-center gap-1 bg-gradient-to-br from-primary to-primary-glow text-primary-foreground border-none px-3.5 py-1.5 rounded-lg font-outfit text-xs font-bold cursor-pointer">
                  View <Arrow />
                </button>
              </div>
            </div>
          </div>
          <div style={{ animation: visible ? "fadeUp .7s .2s ease both" : "none", opacity: visible ? undefined : 0 }}>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[20px] text-[11px] font-bold tracking-wider uppercase bg-success/[0.12] border border-success/30 text-success mb-[22px]">
              For Carriers & Transporters
            </div>
            <h2 className="text-[2.5rem] max-md:text-[2rem] font-black text-foreground tracking-tight leading-[1.1] mb-5">
              Grow Your Fleet<br /><span className="text-success">With Better Loads</span>
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              LoRRI helps carriers find better loads, build a verified reputation, and access freight intelligence that keeps your trucks moving profitably.
            </p>
            <div className="flex flex-col gap-3.5 mb-9">
              {[
                { t: "Verified Carrier Profile", d: "Build a trusted, data-backed profile that top shippers rely on." },
                { t: "Load Matching Engine", d: "AI-powered load matching for your routes, truck types, and capacity." },
                { t: "LoRRI Reliability Score", d: "Your performance score unlocks premium loads and better rates." },
                { t: "Market Rate Visibility", d: "Know the fair market rate for every lane before you bid." },
              ].map((f, i) => (
                <div key={i} className="flex gap-3.5 p-[15px_18px] bg-card border border-border-subtle rounded-xl hover:border-success/30 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-success shrink-0 mt-1.5" />
                  <div>
                    <div className="font-bold text-sm text-foreground mb-0.5">{f.t}</div>
                    <div className="text-[13px] text-muted-foreground leading-relaxed">{f.d}</div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => scrollTo("cta")} className="inline-flex items-center gap-2 bg-gradient-to-br from-success to-success/70 text-success-foreground border-none px-7 py-3.5 rounded-lg font-outfit text-[15px] font-bold cursor-pointer tracking-wider uppercase shadow-[0_4px_20px_hsl(105_50%_46%/0.35)] hover:-translate-y-0.5 transition-all">
              Join as a Transporter <Arrow />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
