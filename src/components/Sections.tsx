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
              <div style={{ fontSize: 11, color: "var(--text2)", fontWeight: 700, marginBottom: 14, letterSpacing: ".06em", textTransform: "uppercase" }}>Global Route Coverage</div>
              <svg viewBox="0 0 500 260" style={{ width: "100%", maxHeight: 260 }}>
                <defs>
                  <radialGradient id="globeGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#54AF3A" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <rect width="500" height="260" fill="url(#globeGlow)" rx="8" />
                {/* Simplified continent outlines */}
                {/* North America */}
                <path d="M60 60 C70 45,100 35,120 40 C135 43,140 55,130 65 C125 72,110 80,95 90 C85 95,70 100,65 90 C58 80,55 70,60 60Z" fill="none" stroke="var(--border)" strokeWidth="1.5" />
                {/* South America */}
                <path d="M110 130 C115 120,125 118,130 125 C135 135,138 155,130 175 C125 190,115 200,110 195 C105 185,100 160,105 145 C107 138,108 133,110 130Z" fill="none" stroke="var(--border)" strokeWidth="1.5" />
                {/* Europe */}
                <path d="M230 45 C240 38,260 35,270 42 C278 48,275 58,268 62 C260 66,248 65,240 60 C235 56,230 50,230 45Z" fill="none" stroke="var(--border)" strokeWidth="1.5" />
                {/* Africa */}
                <path d="M245 85 C255 78,270 80,275 90 C280 105,278 130,270 150 C265 162,255 168,248 160 C240 148,238 120,240 100 C241 92,243 88,245 85Z" fill="none" stroke="var(--border)" strokeWidth="1.5" />
                {/* Asia / India */}
                <path d="M300 40 C320 32,360 35,390 45 C410 52,420 65,415 80 C410 95,395 105,375 110 C360 114,340 112,325 105 C310 98,300 85,305 70 C308 58,300 48,300 40Z" fill="none" stroke="var(--border)" strokeWidth="1.5" />
                {/* India sub */}
                <path d="M340 100 C345 95,355 95,358 102 C362 112,358 130,352 140 C348 148,342 148,338 140 C334 130,335 112,340 100Z" fill="#54AF3A" fillOpacity="0.15" stroke="#54AF3A" strokeWidth="1.5" />
                {/* SE Asia */}
                <path d="M380 95 C390 90,405 92,410 100 C415 110,410 120,400 118 C392 116,382 108,380 100Z" fill="none" stroke="var(--border)" strokeWidth="1.5" />
                {/* Australia */}
                <path d="M400 170 C415 162,440 165,448 175 C455 185,450 200,438 205 C425 210,408 205,402 195 C396 185,395 175,400 170Z" fill="none" stroke="var(--border)" strokeWidth="1.5" />

                {/* City nodes with pulse */}
                {[
                  { cx: 90, cy: 65, label: "New York" },
                  { cx: 115, cy: 155, label: "São Paulo" },
                  { cx: 255, cy: 50, label: "London" },
                  { cx: 260, cy: 110, label: "Lagos" },
                  { cx: 310, cy: 55, label: "Dubai" },
                  { cx: 348, cy: 115, label: "Mumbai" },
                  { cx: 370, cy: 60, label: "Delhi" },
                  { cx: 395, cy: 100, label: "Singapore" },
                  { cx: 425, cy: 180, label: "Sydney" },
                  { cx: 345, cy: 68, label: "Riyadh" },
                ].map((city, i) => (
                  <g key={i}>
                    <circle cx={city.cx} cy={city.cy} r="6" fill="none" stroke="#54AF3A" strokeWidth="1" opacity="0.3">
                      <animate attributeName="r" values="4;10;4" dur={`${2 + i * 0.25}s`} repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.4;0;0.4" dur={`${2 + i * 0.25}s`} repeatCount="indefinite" />
                    </circle>
                    <circle cx={city.cx} cy={city.cy} r="3" fill="#54AF3A" opacity="0.9" />
                    <text x={city.cx + 6} y={city.cy + 3} fontSize="7" fill="var(--text2)" fontFamily="Outfit,sans-serif">{city.label}</text>
                  </g>
                ))}

                {/* Route arcs */}
                {[
                  "M90 65 Q180 10 255 50",
                  "M255 50 Q290 40 310 55",
                  "M310 55 Q340 50 370 60",
                  "M370 60 Q380 80 395 100",
                  "M395 100 Q415 140 425 180",
                  "M348 115 Q330 85 310 55",
                  "M260 110 Q280 80 310 55",
                  "M90 65 Q100 110 115 155",
                  "M255 50 Q258 78 260 110",
                  "M348 115 Q375 80 395 100",
                ].map((d, i) => (
                  <path key={i} d={d} fill="none" stroke="#54AF3A" strokeWidth="1" opacity="0.3" strokeDasharray="4 3" />
                ))}
              </svg>
              {/* Stats row */}
              <div style={{ display: "flex", justifyContent: "space-around", marginTop: 16, padding: "12px 0", borderTop: "1px solid var(--border)" }}>
                {[
                  { val: "80K+", label: "Lanes" },
                  { val: "2200+", label: "Carriers" },
                  { val: "15+", label: "Countries" },
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
