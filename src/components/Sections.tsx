import { useInView } from "@/hooks/use-in-view";
import { Check, Arrow, CalendarIcon } from "./Icons";
import { scrollTo } from "@/hooks/use-in-view";

export function ForShippers() {
  const { ref, visible } = useInView();

  return (
    <section id="shippers" ref={ref as any} style={{ background: "var(--bg2)", padding: "100px 32px" }} className="max-md:py-16 max-md:px-4">
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }} className="max-md:!grid-cols-1">
          <div style={{ animation: visible ? "fadeUp .7s ease both" : "none", opacity: visible ? undefined : 0 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", background: "var(--purpleLt)", border: "1px solid var(--border)", color: "#B1D0EF", marginBottom: 20 }}>
              For Shippers & Manufacturers
            </div>
            <h2 style={{ fontSize: "2.4rem", fontWeight: 900, color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 18 }} className="max-md:!text-[1.9rem]">
              Procure Freight<br /><span style={{ color: "#393185" }}>With Confidence</span>
            </h2>
            <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.8, marginBottom: 28 }}>
              LoRRI gives manufacturers access to the National Freight Benchmark — letting you procure at fair, data-backed rates with complete transparency.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {["National Price Benchmark — know what a lane should cost", "2,200+ verified carriers with reliability scores", "Automated tenders with AI-matched recommendations", "Benchmark against ₹2.5B+ of analysed freight data"].map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 12, padding: "13px 16px", background: "var(--card)", border: "1px solid var(--borderSm)", borderRadius: 11 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#393185", flexShrink: 0, marginTop: 7 }} />
                  <span style={{ fontSize: 13.5, color: "var(--text2)", lineHeight: 1.6 }}>{f}</span>
                </div>
              ))}
            </div>
            <button onClick={() => scrollTo("cta")} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,#393185,#4D44A8)", color: "#fff", border: "none", padding: "13px 28px", borderRadius: 8, fontFamily: "Outfit,sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: ".05em", textTransform: "uppercase" as const, boxShadow: "0 4px 20px rgba(57,49,133,0.4)" }}>
              <CalendarIcon /> Schedule Demo for Shippers <Arrow />
            </button>
          </div>
          <div style={{ animation: visible ? "fadeUp .7s .2s ease both" : "none", opacity: visible ? undefined : 0 }}>
            <div style={{ background: "var(--card)", border: "1.5px solid var(--border)", borderRadius: 20, padding: 26 }}>
              <div style={{ fontSize: 11, color: "var(--text2)", fontWeight: 700, marginBottom: 16, letterSpacing: ".06em", textTransform: "uppercase" }}>Procurement Dashboard</div>
              {[
                { route: "Mumbai → Delhi", market: "₹98,200", lorri: "₹82,500", s: "16%" },
                { route: "Pune → Surat", market: "₹31,500", lorri: "₹26,800", s: "15%" },
                { route: "Bangalore → Hyderabad", market: "₹44,100", lorri: "₹36,200", s: "18%" },
                { route: "Delhi → Kolkata", market: "₹72,000", lorri: "₹59,400", s: "17%" },
              ].map((row, i) => (
                <div key={i} style={{ padding: "12px 0", borderBottom: i < 3 ? "1px solid var(--borderSm)" : "none", display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: 12, alignItems: "center" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{row.route}</div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 10, color: "var(--text3)", marginBottom: 2 }}>Market</div>
                    <div className="font-mono" style={{ fontSize: 12, color: "var(--text2)", textDecoration: "line-through" }}>{row.market}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 10, color: "var(--text3)", marginBottom: 2 }}>LoRRI</div>
                    <div className="font-mono" style={{ fontSize: 13, color: "var(--text)", fontWeight: 700 }}>{row.lorri}</div>
                  </div>
                  <div style={{ padding: "3px 10px", background: "var(--greenLt)", border: "1px solid rgba(84,175,58,0.3)", borderRadius: 20, textAlign: "center" }}>
                    <span className="font-mono" style={{ fontSize: 12, color: "#54AF3A", fontWeight: 700 }}>-{row.s}</span>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 16, padding: "12px 14px", background: "var(--greenLt)", border: "1px solid rgba(84,175,58,0.28)", borderRadius: 10 }}>
                <div style={{ fontSize: 11, color: "#54AF3A", fontWeight: 700, marginBottom: 3 }}>💡 AI Recommendation</div>
                <div style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6 }}>Lock Mumbai → Delhi rates within 24h — demand index rising to 91/100. FastFreight Co. recommended at 98% reliability.</div>
              </div>
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
    <section id="transporters" ref={ref as any} style={{ background: "var(--bg)", padding: "100px 32px" }} className="max-md:py-16 max-md:px-4">
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }} className="max-md:!grid-cols-1">
          {/* Profile card - desktop */}
          <div className="hidden md:block" style={{ animation: visible ? "fadeUp .7s ease both" : "none", opacity: visible ? undefined : 0 }}>
            <div style={{ background: "var(--card)", border: "1.5px solid var(--border)", borderRadius: 20, padding: 26 }}>
              <div style={{ fontSize: 11, color: "var(--text2)", fontWeight: 700, marginBottom: 14, letterSpacing: ".06em", textTransform: "uppercase" }}>Carrier Profile — LoRRI Score</div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20, padding: 14, background: "var(--card2)", borderRadius: 12 }}>
                <div style={{ width: 50, height: 50, borderRadius: "50%", background: "linear-gradient(135deg,#54AF3A,#1AA6DF)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 20, color: "white" }}>A+</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 15, color: "var(--text)" }}>FastFreight Logistics</div>
                  <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 2 }}>Mumbai · 48 Trucks · Since 2018</div>
                  <div style={{ display: "flex", gap: 5, marginTop: 7 }}>
                    {["Verified", "Top Rated", "On-Time"].map(t => (
                      <span key={t} style={{ padding: "2px 7px", background: "var(--greenLt)", border: "1px solid rgba(84,175,58,0.3)", borderRadius: 20, fontSize: 10, color: "#54AF3A", fontWeight: 700 }}>{t}</span>
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
                <div key={i} style={{ marginBottom: i < 3 ? 12 : 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 13, color: "var(--text2)" }}>{m.l}</span>
                    <span className="font-mono" style={{ fontSize: 13, fontWeight: 700, color: m.c }}>{m.v}%</span>
                  </div>
                  <div style={{ height: 6, background: "var(--card2)", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: visible ? `${m.v}%` : "0%", background: `linear-gradient(90deg,${m.c},${m.c}88)`, borderRadius: 3, transition: `width 1.2s ${i * 0.2}s ease` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ animation: visible ? "fadeUp .7s .2s ease both" : "none", opacity: visible ? undefined : 0 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", background: "var(--greenLt)", border: "1px solid rgba(84,175,58,0.3)", color: "#54AF3A", marginBottom: 20 }}>
              For Carriers & Transporters
            </div>
            <h2 style={{ fontSize: "2.4rem", fontWeight: 900, color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 18 }} className="max-md:!text-[1.9rem]">
              Grow Your Fleet<br /><span style={{ color: "#54AF3A" }}>With Better Loads</span>
            </h2>
            <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.8, marginBottom: 28 }}>
              LoRRI helps carriers find better loads, build a verified reputation, and access freight intelligence that keeps your trucks moving profitably.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {["Build a verified carrier profile trusted by top shippers", "AI load matching for your routes, truck types and capacity", "LoRRI Reliability Score unlocks premium loads", "Market rate visibility for every lane before you bid"].map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 12, padding: "13px 16px", background: "var(--card)", border: "1px solid var(--borderSm)", borderRadius: 11 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#54AF3A", flexShrink: 0, marginTop: 7 }} />
                  <span style={{ fontSize: 13.5, color: "var(--text2)", lineHeight: 1.6 }}>{f}</span>
                </div>
              ))}
            </div>
            <button onClick={() => scrollTo("cta")} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,#54AF3A,#3D8A28)", color: "#fff", border: "none", padding: "13px 28px", borderRadius: 8, fontFamily: "Outfit,sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: ".05em", textTransform: "uppercase" as const, boxShadow: "0 4px 20px rgba(84,175,58,0.3)" }}>
              Join as a Transporter <Arrow />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
