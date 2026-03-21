import { useInView } from "@/hooks/use-in-view";

export default function IntelStats() {
  const { ref, visible } = useInView();

  return (
    <section id="intelligence" ref={ref as any} className="relative overflow-hidden px-4 py-4 sm:px-6 lg:px-8" style={{ background: "var(--bg2)" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 50%,rgba(57,49,133,0.1) 0%,transparent 65%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 20, fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", background: "var(--purpleLt)", border: "1px solid var(--border)", color: "#B1D0EF", marginBottom: 8 }}>By The Numbers</div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 8 }} className="text-[1.4rem] sm:text-[1.5rem] lg:text-[1.6rem]">
            National Scale,<br /><span style={{ color: "#393185" }}>Real Intelligence</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          {[
            { v: "80,000+", l: "Routes Mapped", c: "#393185" },
            { v: "2,300+", l: "Carriers", c: "#54AF3A" },
            { v: "$500M+", l: "Spend Procured", c: "#1AA6DF" },
            { v: "$21M+", l: "Total Savings", c: "#B1D0EF" },
          ].map((s, i) => (
            <div key={i} style={{ padding: "20px 14px", textAlign: "center", background: `linear-gradient(160deg,${s.c}0A 0%,transparent 60%)`, border: `1px solid ${s.c}22`, borderRadius: 12, animation: visible ? `fadeUp .7s ${i * 0.1}s ease both` : "none", opacity: visible ? undefined : 0 }}>
              <div className="font-mono text-[1.5rem] sm:text-[1.8rem] lg:text-[2rem]" style={{ fontWeight: 900, color: s.c, lineHeight: 1, marginBottom: 6, letterSpacing: "-0.02em" }}>{s.v}</div>
              <div style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.5 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
