import { useInView } from "@/hooks/use-in-view";

export default function IntelStats() {
  const { ref, visible } = useInView();

  return (
    <section id="intelligence" ref={ref as any} style={{ background: "var(--bg2)", padding: "40px 32px", position: "relative", overflow: "hidden" }} className="max-md:py-8 max-md:px-4">
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 50%,rgba(57,49,133,0.1) 0%,transparent 65%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", background: "var(--purpleLt)", border: "1px solid var(--border)", color: "#B1D0EF", marginBottom: 18 }}>By The Numbers</div>
          <h2 style={{ fontSize: "2.7rem", fontWeight: 900, color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 14 }} className="max-md:!text-[1.9rem]">
            National Scale,<br /><span style={{ color: "#393185" }}>Real Intelligence</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 4 }} className="max-md:!grid-cols-2">
          {[
            { v: "80,000+", l: "Routes Mapped", c: "#393185" },
            { v: "2,200+", l: "Carriers", c: "#54AF3A" },
            { v: "$500M+", l: "Spend Procured", c: "#1AA6DF" },
            { v: "$21M+", l: "Total Savings", c: "#B1D0EF" },
          ].map((s, i) => (
            <div key={i} style={{ padding: "38px 22px", textAlign: "center", background: `linear-gradient(160deg,${s.c}0A 0%,transparent 60%)`, border: `1px solid ${s.c}22`, borderRadius: 16, animation: visible ? `fadeUp .7s ${i * 0.1}s ease both` : "none", opacity: visible ? undefined : 0 }}>
              <div className="font-mono max-md:!text-[2rem]" style={{ fontSize: "2.6rem", fontWeight: 900, color: s.c, lineHeight: 1, marginBottom: 10, letterSpacing: "-0.02em" }}>{s.v}</div>
              <div style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.5 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
