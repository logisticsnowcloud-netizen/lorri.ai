import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon, PinIcon, CalendarIcon, GlobeNetIcon } from "./Icons";
import { useDemoModal } from "@/hooks/use-demo-modal";
import NetworkBg from "./NetworkBg";
import lorriLogo from "@/assets/lorri-logo-transparent.png";
import { searchLocations, type LocationSuggestion } from "@/lib/map-api";
import LiveSimPanel from "./LiveSimPanel";

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

export default function Hero({ dark }: { dark: boolean }) {
  const openDemoModal = useDemoModal();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [tab, setTab] = useState("Intelligence");
  const [userPicked, setUserPicked] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      const results = await searchLocations(query.trim());
      setSuggestions(results);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  useEffect(() => {
    if (userPicked) return;
    // Total simulation cycle: input(2200) + processing(2000) + result(7500) = 11700ms
    const t = setInterval(() => setTab((cur) => TABS[(TABS.indexOf(cur) + 1) % TABS.length]), 11700);
    return () => clearInterval(t);
  }, [userPicked]);

  function pickTab(nextTab: string) {
    setTab(nextTab);
    setUserPicked(true);
  }

  const td = TAB_DATA[tab];

  return (
    <section
      id="hero"
      className="relative overflow-visible px-4 pb-5 pt-3 sm:px-6 sm:pt-4 lg:px-8"
      style={{
        minHeight: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
        marginBottom: '5%'
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px,transparent 1px),linear-gradient(90deg,var(--grid-line) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 65% 55% at 50% 42%,rgba(57,49,133,0.18) 0%,transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "12%", left: "5%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle,rgba(26,166,223,0.06),transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "15%", right: "10%", width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle,rgba(84,175,58,0.06),transparent 70%)", pointerEvents: "none" }} />
      <NetworkBg />

      <div className="relative z-[2] mx-auto flex w-full max-w-[1200px] flex-col gap-5 lg:flex-row lg:items-start">
        <div className="flex min-w-0 flex-1 flex-col items-start">
          <div className="mb-2">
            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: 16 }}>
              <img
                src={lorriLogo}
                alt="LoRRI Logo"
                className="h-16 w-auto max-w-[240px] object-contain sm:h-20 sm:max-w-[300px]"
                style={{
                  filter: dark ? "brightness(10) drop-shadow(0 2px 18px rgba(57,49,133,0.5))" : "none",
                }}
              />
            </div>
          </div>

          <div style={{ width: 160, height: 1.5, background: "linear-gradient(90deg,transparent,#393185,#1AA6DF,transparent)", margin: "4px 0 14px", borderRadius: 1 }} />

          <div className="relative z-[40] w-full max-w-[540px]" style={{ position: "relative" }}>
            <div
              className="flex items-center gap-3"
              style={{
                background: focused ? "var(--card2)" : "var(--purpleLt)",
                border: `1.5px solid ${focused ? "#393185" : "var(--border)"}`,
                borderRadius: 14,
                padding: "14px 16px",
                transition: "all .3s",
                boxShadow: focused ? "0 0 0 4px rgba(57,49,133,0.1),0 12px 40px rgba(57,49,133,0.18)" : "none",
              }}
            >
              <SearchIcon color={focused ? "#393185" : "var(--text3)"} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 200)}
                placeholder="Search locations, connect the digital dots!"
                style={{
                  flex: 1,
                  minWidth: 0,
                  background: "none",
                  border: "none",
                  outline: "none",
                  color: "var(--text)",
                  fontFamily: "Outfit,sans-serif",
                  fontSize: 15,
                  fontWeight: 400,
                }}
              />
              <span className="hidden sm:inline-flex">
                <PinIcon />
              </span>
            </div>

            {focused && suggestions.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  left: 0,
                  right: 0,
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  zIndex: 60,
                  boxShadow: "0 20px 60px var(--shadow)",
                  maxHeight: 300,
                  overflowY: "auto",
                }}
              >
                <div style={{ padding: "8px 18px 6px", borderBottom: "1px solid var(--borderSm)" }}>
                  <span style={{ fontSize: 10, color: "var(--text3)", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>Suggestions</span>
                </div>
                {suggestions.map((s, i) => (
                  <div
                    key={i}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setQuery(s.name);
                      setFocused(false);
                      navigate(`/map?location=${encodeURIComponent(s.name)}&lat=${s.lat}&lon=${s.lon}`);
                    }}
                    style={{
                      padding: "12px 18px",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      cursor: "pointer",
                      transition: "background .15s",
                      borderBottom: i < suggestions.length - 1 ? "1px solid var(--borderSm)" : "none",
                      color: "var(--text)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--purpleLt)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1AA6DF" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="10" r="3" /><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z" /></svg>
                    <span style={{ fontSize: 14 }}>{s.name}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" strokeWidth="2" strokeLinecap="round" style={{ marginLeft: "auto" }}><path d="M9 18l6-6-6-6" /></svg>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-3 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center" style={{marginTop: '10%'}}>
            <button
              onClick={() => openDemoModal()}
              className="w-full justify-center sm:w-auto"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "linear-gradient(135deg,#393185,#4D44A8)",
                color: "#fff",
                border: "none",
                padding: "11px 24px",
                borderRadius: 10,
                fontFamily: "Outfit,sans-serif",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                letterSpacing: ".04em",
                boxShadow: "0 4px 16px rgba(57,49,133,0.35)",
                transition: "all .25s",
              }}
            >
              <CalendarIcon /> Schedule Demo
            </button>

            <button
              onClick={() => navigate("/global-grid")}
              className="w-full justify-center sm:w-auto"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "11px 22px",
                borderRadius: 10,
                border: "1px solid var(--border)",
                background: "var(--card)",
                color: "var(--text)",
                fontFamily: "Outfit,sans-serif",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all .25s",
              }}
            >
              <GlobeNetIcon />
              <span>Explore Global Grid</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-center gap-4">
          <div className="flex w-full flex-wrap items-center justify-center gap-2" style={{ padding: 5, background: "var(--card2)", border: "1px solid var(--border)", borderRadius: 14 }}>
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => pickTab(t)}
                style={{
                  padding: "10px 18px",
                  borderRadius: 10,
                  border: "none",
                  fontFamily: "Outfit,sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all .25s",
                  letterSpacing: ".03em",
                  ...(tab === t
                    ? { background: "linear-gradient(135deg,#393185,#4D44A8)", color: "#fff", boxShadow: "0 4px 16px rgba(57,49,133,0.35)" }
                    : { color: "var(--text2)", background: "transparent" }),
                }}
              >
                {TAB_DATA[t].icon} {t}
              </button>
            ))}
          </div>

          {!userPicked && (
            <div style={{ display: "flex", gap: 6, marginTop: -4 }}>
              {TABS.map((t) => (
                <div key={t} style={{ height: 2, borderRadius: 1, background: tab === t ? "#393185" : "var(--border)", transition: "all .4s", width: tab === t ? 28 : 14 }} />
              ))}
            </div>
          )}

          <LiveSimPanel tab={tab} />
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 70, background: "linear-gradient(transparent,var(--bg))", pointerEvents: "none" }} />
    </section>
  );
}
