import { useInView } from "@/hooks/use-in-view";
import { Check, Arrow, CalendarIcon } from "./Icons";
import { scrollTo } from "@/hooks/use-in-view";
import { useDemoModal } from "@/hooks/use-demo-modal";

export function ForShippers() {
  const openDemoModal = useDemoModal();
  const { ref, visible } = useInView();

  return (
    <section id="shippers" ref={ref as any} style={{ background: "var(--bg2)", padding: "16px 32px" }} className="max-md:py-4 max-md:px-4">
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36, alignItems: "center" }} className="max-md:!grid-cols-1">
           <div style={{ animation: visible ? "fadeUp .7s ease both" : "none", opacity: visible ? undefined : 0 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 20, fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", background: "var(--purpleLt)", border: "1px solid var(--border)", color: "#B1D0EF", marginBottom: 10 }}>
              For Shippers & Manufacturers
            </div>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 10 }} className="max-md:!text-[1.4rem]">
              Procure Freight<br /><span style={{ color: "#393185" }}>With Confidence</span>
            </h2>
            <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.7, marginBottom: 14 }}>
              LoRRI gives manufacturers access to the National Freight Benchmark — letting you procure at fair, data-backed rates with complete transparency.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
              {["National Price Benchmark — know what a lane should cost", "2,200+ verified carriers with reliability scores", "Automated tenders with AI-matched recommendations", "Benchmark against ₹2.5B+ of analysed freight data"].map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 10, padding: "8px 12px", background: "var(--card)", border: "1px solid var(--borderSm)", borderRadius: 9 }}>
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
                <div key={i} style={{ padding: "12px 0", borderBottom: i < 3 ? "1px solid var(--borderSm)" : "none", display: "grid", gridTemplateColumns: "1fr auto", gap: 12, alignItems: "center" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{row.route}</div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6, flexShrink: 0 }}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    <span className="font-mono" style={{ fontSize: 13, color: "var(--text)", fontWeight: 700, filter: "blur(6px)", userSelect: "none" }}>{row.lorri}</span>
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
    <section id="transporters" ref={ref as any} style={{ background: "var(--bg)", padding: "16px 32px" }} className="max-md:py-4 max-md:px-4">
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36, alignItems: "center" }} className="max-md:!grid-cols-1">
          {/* Global Route Map Visual - desktop */}
          <div className="hidden md:block" style={{ animation: visible ? "fadeUp .7s ease both" : "none", opacity: visible ? undefined : 0 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                {
                  num: "01",
                  title: "Get Discovered",
                  desc: "Connect with new customers, including Fortune 500 companies and global leaders. Receive business inquiries from companies in your lanes, matching your preferred truck types.",
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#54AF3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                  ),
                },
                {
                  num: "02",
                  title: "Track Your Performance",
                  desc: "Get feedback from customers and grow your reputation on LoRRI – The Trusted Platform for Transporters. Use your ratings to attract more business and build a strong industry presence.",
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#54AF3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                  ),
                },
                {
                  num: "03",
                  title: "Take Control of Your Brand Presence",
                  desc: "Create a standout LoRRI profile with details about your branches, fleet, and lanes. Help customers make informed decisions, leading to more business opportunities for you.",
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#54AF3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                  ),
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--card)",
                    border: "1.5px solid var(--border)",
                    borderRadius: 16,
                    padding: "14px 18px",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(84,175,58,0.5)";
                    e.currentTarget.style.boxShadow = "0 8px 30px rgba(84,175,58,0.12)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {/* Accent gradient bar */}
                  <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 3, background: "linear-gradient(90deg, #54AF3A, #3D8A28)", borderRadius: "16px 16px 0 0" }} />
                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(84,175,58,0.1)", border: "1px solid rgba(84,175,58,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <span style={{ fontSize: 11, fontWeight: 800, color: "#54AF3A", fontFamily: "Outfit,sans-serif", letterSpacing: ".06em" }}>{item.num}</span>
                        <span style={{ fontSize: 15, fontWeight: 800, color: "var(--text)", fontFamily: "Outfit,sans-serif" }}>{item.title}</span>
                      </div>
                      <p style={{ fontSize: 12.5, color: "var(--text2)", lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ animation: visible ? "fadeUp .7s .2s ease both" : "none", opacity: visible ? undefined : 0 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 20, fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", background: "var(--greenLt)", border: "1px solid rgba(84,175,58,0.3)", color: "#54AF3A", marginBottom: 10 }}>
              For Carriers & Transporters
            </div>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 10 }} className="max-md:!text-[1.4rem]">
              Grow Your Fleet<br /><span style={{ color: "#54AF3A" }}>With Better Loads</span>
            </h2>
            <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.7, marginBottom: 14 }}>
              LoRRI helps carriers find better loads, build a verified reputation, and access freight intelligence that keeps your trucks moving profitably.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
              {["Build a verified carrier profile trusted by top shippers", "AI load matching for your routes, truck types and capacity", "LoRRI Reliability Score unlocks premium loads", "Market rate visibility for every lane before you bid"].map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 10, padding: "8px 12px", background: "var(--card)", border: "1px solid var(--borderSm)", borderRadius: 9 }}>
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
