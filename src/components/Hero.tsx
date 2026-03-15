import { useState, useEffect } from "react";
import { SearchIcon, PinIcon, CalendarIcon, Check, Arrow, GlobeNetIcon } from "./Icons";
import { scrollTo } from "@/hooks/use-in-view";
import { useDemoModal } from "@/hooks/use-demo-modal";
import NetworkBg from "./NetworkBg";
import lorriLogo from "@/assets/lorri-logo-transparent.png";

const TAB_DATA: Record<string, { icon: string; headline: string; sub: string; stats: { v: string; l: string }[]; pts: string[]; color: string }> = {
  Intelligence: {
    icon: "🧠",
    headline: "National Freight Intelligence Engine",
    sub: "Real-time benchmarks, lane analytics and market insights across 80,000+ routes.",
    stats: [{ v: "80K+", l: "Routes Tracked" }, { v: "₹2.5B+", l: "Spend Analysed" }, { v: "3", l: "Continents" }],
    pts: ["Live national freight benchmark", "Historical price trend analysis", "Demand index forecasting", "Lane-level market intelligence"],
    color: "#393185",
  },
  Procurement: {
    icon: "📊",
    headline: "AI-Powered Procurement Engine",
    sub: "Guaranteed savings through automated carrier matching, tenders and intelligent bidding.",
    stats: [{ v: "$500M+", l: "Procured" }, { v: "$21M+", l: "Saved" }, { v: "2200+", l: "Carriers" }],
    pts: ["Automated tender & bidding engine", "AI-matched carrier recommendations", "Real-time quote comparison", "Guaranteed cost reduction results"],
    color: "#54AF3A",
  },
  TMS: {
    icon: "🗺️",
    headline: "Transport Management System",
    sub: "End-to-end logistics optimisation — from route planning to multi-modal execution at scale.",
    stats: [{ v: "99%", l: "On-Time Rate" }, { v: "24/7", l: "Live Tracking" }, { v: "Multi", l: "Modal Support" }],
    pts: ["Real-time shipment tracking", "Route & load optimisation", "Multi-modal transport planning", "Performance dashboards & reporting"],
    color: "#1AA6DF",
  },
};

const TABS = Object.keys(TAB_DATA);
const suggestions = ["Mumbai → Delhi", "Bangalore → Chennai", "Pune → Ahmedabad", "Delhi → Kolkata", "Hyderabad → Mumbai"];
const gridDots = [0, 2, 4, 7, 12, 14, 17, 22];

export default function Hero({ dark }: { dark: boolean }) {
  const openDemoModal = useDemoModal();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [tab, setTab] = useState("Intelligence");
  const [userPicked, setUserPicked] = useState(false);

  useEffect(() => {
    if (userPicked) return;
    const t = setInterval(() => setTab(cur => TABS[(TABS.indexOf(cur) + 1) % TABS.length]), 1800);
    return () => clearInterval(t);
  }, [userPicked]);

  function pickTab(t: string) { setTab(t); setUserPicked(true); }
  const td = TAB_DATA[tab];

  return (
    <section id="hero" style={{ position: "relative", minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px 16px 72px", overflow: "hidden", background: "var(--bg)" }}>
      {/* Bg patterns */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(var(--gridLine) 1px,transparent 1px),linear-gradient(90deg,var(--gridLine) 1px,transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 65% 55% at 50% 42%,rgba(57,49,133,0.18) 0%,transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "12%", left: "5%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle,rgba(26,166,223,0.06),transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "15%", right: "10%", width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle,rgba(84,175,58,0.06),transparent 70%)", pointerEvents: "none" }} />
      <NetworkBg />

      <div style={{ position: "relative", zIndex: 2, display: "flex", gap: 32, maxWidth: 1200, width: "100%", alignItems: "flex-start", flexWrap: "wrap" }}>
        {/* LEFT SIDE — Logo + Search */}
        <div style={{ flex: "1 1 280px", minWidth: 0, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          {/* LOGO */}
          <div className="fu" style={{ marginBottom: 8 }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 16,
            }}>
              <img
                src={lorriLogo}
                alt="LoRRI Logo"
                style={{
                  height: 110,
                  maxWidth: 380,
                  objectFit: "contain" as const,
                  filter: dark
                    ? "brightness(10) drop-shadow(0 2px 18px rgba(57,49,133,0.5))"
                    : "none",
                }}
              />
            </div>
          </div>

          <div className="fu1" style={{ width: 160, height: 1.5, background: "linear-gradient(90deg,transparent,#393185,#1AA6DF,transparent)", margin: "4px 0 28px", borderRadius: 1 }} />

          {/* SEARCH */}
          <div className="fu2" style={{ width: "100%", maxWidth: 540, position: "relative" }}>
            <div style={{ background: focused ? "var(--card2)" : "var(--purpleLt)", border: `1.5px solid ${focused ? "#393185" : "var(--border)"}`, borderRadius: 14, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12, transition: "all .3s", boxShadow: focused ? "0 0 0 4px rgba(57,49,133,0.1),0 12px 40px rgba(57,49,133,0.18)" : "none" }}>
              <SearchIcon color={focused ? "#393185" : "var(--text3)"} />
              <input
                value={query} onChange={e => setQuery(e.target.value)}
                onFocus={() => setFocused(true)} onBlur={() => setTimeout(() => setFocused(false), 200)}
                placeholder="Search locations, connect the digital dots!"
                style={{ flex: 1, background: "none", border: "none", outline: "none", color: "var(--text)", fontFamily: "Outfit,sans-serif", fontSize: 15, fontWeight: 400 }}
              />
              <PinIcon />
              <button style={{ background: "linear-gradient(135deg,#393185,#4D44A8)", border: "none", borderRadius: 8, padding: "9px 22px", color: "white", fontFamily: "Outfit,sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: ".04em", flexShrink: 0 }}>Search</button>
            </div>
            {focused && (
              <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", zIndex: 20, boxShadow: "0 20px 60px var(--shadow)" }}>
                <div style={{ padding: "8px 18px 6px", borderBottom: "1px solid var(--borderSm)" }}>
                  <span style={{ fontSize: 10, color: "var(--text3)", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>Popular Routes</span>
                </div>
                {suggestions.map((s, i) => (
                  <div key={i} onClick={() => { setQuery(s); setFocused(false); }}
                    style={{ padding: "12px 18px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", transition: "background .15s", borderBottom: i < suggestions.length - 1 ? "1px solid var(--borderSm)" : "none", color: "var(--text)" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "var(--purpleLt)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1AA6DF" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="10" r="3" /><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z" /></svg>
                    <span style={{ fontSize: 14 }}>{s}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="2" strokeLinecap="round" style={{ marginLeft: "auto" }}><path d="M9 18l6-6-6-6" /></svg>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CTAs */}
          <div className="fu5" style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap", alignItems: "center" }}>
            <button onClick={() => openDemoModal()} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,#393185,#4D44A8)", color: "#fff", border: "none", padding: "11px 24px", borderRadius: 10, fontFamily: "Outfit,sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: ".04em", boxShadow: "0 4px 16px rgba(57,49,133,0.35)", transition: "all .25s" }}>
              <CalendarIcon /> Schedule Demo
            </button>

            <button onClick={() => scrollTo("intelligence")} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--card)", color: "var(--text)", fontFamily: "Outfit,sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .25s" }}>
              <GlobeNetIcon />
              <span>Explore Global Grid</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>

        {/* RIGHT SIDE — Module Tabs */}
        <div className="fu3" style={{ flex: "1 1 280px", minWidth: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", gap: 4, padding: 5, background: "var(--card2)", border: "1px solid var(--border)", borderRadius: 14 }}>
            {TABS.map(t => (
              <button key={t} onClick={() => pickTab(t)}
                style={{
                  padding: "10px 22px", borderRadius: 10, border: "none", fontFamily: "Outfit,sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all .25s", letterSpacing: ".03em",
                  ...(tab === t
                    ? { background: "linear-gradient(135deg,#393185,#4D44A8)", color: "#fff", boxShadow: "0 4px 16px rgba(57,49,133,0.35)" }
                    : { color: "var(--text2)", background: "transparent" })
                }}
              >
                {TAB_DATA[t].icon} {t}
              </button>
            ))}
          </div>

          {!userPicked && (
            <div style={{ display: "flex", gap: 6, marginTop: -8 }}>
              {TABS.map(t => (
                <div key={t} style={{ height: 2, borderRadius: 1, background: tab === t ? "#393185" : "var(--border)", transition: "all .4s", width: tab === t ? 28 : 14 }} />
              ))}
            </div>
          )}

          {/* Tab content panel */}
          <div key={tab} style={{ width: "100%", background: "var(--card)", border: "1.5px solid var(--border)", borderRadius: 16, padding: "20px 24px", display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap", animation: "tabSlide .18s ease both" }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontWeight: 800, fontSize: 16, color: "var(--text)", marginBottom: 6 }}>{td.headline}</div>
              <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.7, marginBottom: 14 }}>{td.sub}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {td.pts.map((p, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Check color={td.color} size={12} /><span style={{ fontSize: 13, color: "var(--text2)" }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
              {td.stats.map((s, i) => (
                <div key={i} style={{ padding: "10px 18px", background: `${td.color}12`, border: `1px solid ${td.color}28`, borderRadius: 10, textAlign: "center", minWidth: 100 }}>
                  <div className="font-mono" style={{ fontSize: 18, fontWeight: 700, color: td.color, lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 4, letterSpacing: ".06em", textTransform: "uppercase" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 70, background: "linear-gradient(transparent,var(--bg))", pointerEvents: "none" }} />
    </section>
  );
}
