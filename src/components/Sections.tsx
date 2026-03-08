import { useInView } from "@/hooks/use-in-view";
import { Check, Arrow, CalendarIcon } from "./Icons";
import { scrollTo } from "@/hooks/use-in-view";
import { useDemoModal } from "@/hooks/use-demo-modal";

export function ForShippers() {
  const openDemoModal = useDemoModal();
  const { ref, visible } = useInView();

  return (
    <section id="shippers" ref={ref as any} style={{ background: "var(--bg2)", padding: "40px 32px" }} className="max-md:py-8 max-md:px-4">
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
            <button onClick={() => openDemoModal()} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,#393185,#4D44A8)", color: "#fff", border: "none", padding: "13px 28px", borderRadius: 8, fontFamily: "Outfit,sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: ".05em", textTransform: "uppercase" as const, boxShadow: "0 4px 20px rgba(57,49,133,0.4)" }}>
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
                  <div style={{ textAlign: "right", position: "relative", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                    <div style={{ fontSize: 10, color: "var(--text3)", marginBottom: 2 }}>LoRRI</div>
                    <div style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6, flexShrink: 0 }}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      <span className="font-mono" style={{ fontSize: 13, color: "var(--text)", fontWeight: 700, filter: "blur(6px)", userSelect: "none" }}>{row.lorri}</span>
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={() => openDemoModal()} style={{ marginTop: 16, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "14px 20px", background: "linear-gradient(135deg, #393185, #4D44A8)", border: "1px solid rgba(77,68,168,0.5)", borderRadius: 10, cursor: "pointer", transition: "all 0.3s ease" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(57,49,133,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <span style={{ fontSize: 13, color: "#fff", fontWeight: 700, letterSpacing: ".04em" }}>🔓 Unlock Best Rates — Get Access</span>
              </button>
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
    <section id="transporters" ref={ref as any} style={{ background: "var(--bg)", padding: "40px 32px" }} className="max-md:py-8 max-md:px-4">
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }} className="max-md:!grid-cols-1">
          {/* Global Route Map Visual - desktop */}
          <div className="hidden md:block" style={{ animation: visible ? "fadeUp .7s ease both" : "none", opacity: visible ? undefined : 0 }}>
            <div style={{ background: "var(--card)", border: "1.5px solid var(--border)", borderRadius: 20, padding: 26, position: "relative", overflow: "hidden" }}>
              <div style={{ fontSize: 11, color: "var(--text2)", fontWeight: 700, marginBottom: 20, letterSpacing: ".06em", textTransform: "uppercase" }}>Network Growth Timeline</div>
              <div style={{ position: "relative", paddingLeft: 28 }}>
                {/* Timeline line */}
                <div style={{ position: "absolute", left: 9, top: 6, bottom: 6, width: 2, background: "linear-gradient(180deg, #54AF3A 0%, rgba(84,175,58,0.15) 100%)", borderRadius: 2 }} />
                {[
                  { year: "2021", title: "Platform Launch", desc: "LoRRI founded with 50+ initial carriers and first freight benchmark", icon: "🚀" },
                  { year: "2022", title: "1,000+ Carriers Onboarded", desc: "AI load matching introduced, covering 20K+ lanes across India", icon: "📈" },
                  { year: "2023", title: "₹2.5B+ Freight Analysed", desc: "National Price Benchmark launched for shippers & manufacturers", icon: "💰" },
                  { year: "2024", title: "2,200+ Verified Carriers", desc: "80K+ lanes, 100+ truck types, reliability scoring system live", icon: "🏆" },
                  { year: "2025", title: "Industry Leadership", desc: "India's most trusted freight intelligence platform for procurement", icon: "⭐" },
                ].map((item, i) => (
                  <div key={i} style={{ position: "relative", marginBottom: i < 4 ? 20 : 0, display: "flex", gap: 16, alignItems: "flex-start" }}>
                    {/* Dot */}
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--card)", border: "2.5px solid #54AF3A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, flexShrink: 0, position: "relative", zIndex: 1 }}>
                      {item.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 11, fontWeight: 800, color: "#54AF3A", fontFamily: "Outfit,sans-serif", letterSpacing: ".04em" }}>{item.year}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{item.title}</span>
                      </div>
                      <p style={{ fontSize: 11.5, color: "var(--text2)", lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Stats row */}
              <div style={{ display: "flex", justifyContent: "space-around", marginTop: 20, padding: "12px 0", borderTop: "1px solid var(--border)" }}>
                {[
                  { val: "80K+", label: "Lanes" },
                  { val: "2200+", label: "Carriers" },
                  { val: "100+", label: "Truck Types" },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 18, fontWeight: 900, color: "#54AF3A", fontFamily: "Outfit,sans-serif" }}>{s.val}</div>
                    <div style={{ fontSize: 10, color: "var(--text2)", marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
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
