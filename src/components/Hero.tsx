import { useState, useEffect } from "react";
import { SearchIcon, PinIcon, CalendarIcon, GlobeIcon, Arrow } from "./Icons";
import { scrollTo } from "@/hooks/use-in-view";
import NetworkBg from "./NetworkBg";
import lorriLogo from "@/assets/lorri-logo.png";

const routes = [
  { from: "Mumbai", to: "Delhi", saving: "18%", time: "42h", status: "Optimised" },
  { from: "Bangalore", to: "Chennai", saving: "12%", time: "8h", status: "Live" },
  { from: "Pune", to: "Ahmedabad", saving: "21%", time: "14h", status: "Optimised" },
  { from: "Hyderabad", to: "Kolkata", saving: "16%", time: "30h", status: "Analysing" },
];

const suggestions = ["Mumbai → Delhi", "Bangalore → Chennai", "Pune → Ahmedabad", "Delhi → Kolkata", "Hyderabad → Mumbai"];

export default function Hero() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [activeRoute, setActiveRoute] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveRoute((r) => (r + 1) % 4), 2400);
    return () => clearInterval(t);
  }, []);

  const r = routes[activeRoute];

  return (
    <section id="hero" className="relative min-h-[88vh] flex flex-col items-center justify-center px-6 py-16 md:py-20 overflow-hidden bg-background">
      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(hsl(246 44% 36% / 0.06) 1px,transparent 1px),linear-gradient(90deg,hsl(246 44% 36% / 0.06) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 65% 55% at 50% 42%,hsl(246 44% 36% / 0.22) 0%,transparent 65%)" }} />
      <div className="absolute top-[15%] left-[6%] w-[220px] h-[220px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,hsl(196 77% 49% / 0.07),transparent 70%)" }} />
      <div className="absolute bottom-[18%] right-[12%] w-[260px] h-[260px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,hsl(105 50% 46% / 0.07),transparent 70%)" }} />
      <NetworkBg />

      <div className="relative z-[2] flex flex-col items-center max-w-[760px] w-full">
        {/* Logo */}
        <div className="animate-fade-up mb-1">
          <img src={lorriLogo} alt="LoRRI - Logistics Intelligence & Ratings Ecosystem" className="h-[90px] md:h-[110px] w-auto object-contain" />
        </div>

        {/* Accent line */}
        <div className="w-[140px] h-[1.5px] bg-gradient-to-r from-transparent via-primary to-accent rounded-sm mt-0.5 mb-8 animate-fade-up" style={{ animationDelay: "0.12s" }} />

        {/* Search bar */}
        <div className="w-full max-w-[640px] relative animate-fade-up" style={{ animationDelay: "0.24s" }}>
          <div className={`rounded-[14px] px-[18px] py-[15px] flex items-center gap-3 transition-all ${focused ? "bg-foreground/[0.07] border-primary shadow-[0_0_0_4px_hsl(246_44%_36%/0.12),0_12px_40px_hsl(246_44%_36%/0.2)]" : "bg-foreground/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.3)]"}`} style={{ border: `1.5px solid ${focused ? "hsl(246 44% 36%)" : "hsl(246 44% 36% / 0.45)"}`, animation: focused ? "none" : "searchGlow 4s ease-in-out infinite" }}>
            <SearchIcon color={focused ? "#393185" : "#555570"} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 200)}
              placeholder="Search locations, connect the digital dots!"
              className="flex-1 bg-transparent border-none outline-none text-foreground font-outfit text-[15px] font-normal placeholder:text-muted-foreground"
            />
            <PinIcon />
            <button className="bg-gradient-to-br from-primary to-primary-glow border-none rounded-lg px-[22px] py-[9px] text-primary-foreground font-outfit text-[13px] font-bold cursor-pointer tracking-wider shrink-0 hover:opacity-85 transition-opacity">
              Search
            </button>
          </div>
          {focused && (
            <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-card-alt border border-border rounded-xl overflow-hidden z-20 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <div className="px-[18px] py-2 border-b border-border-subtle">
                <span className="text-[10px] text-muted-foreground font-bold tracking-wider uppercase">Popular Routes</span>
              </div>
              {suggestions.map((s, i) => (
                <div key={i} onClick={() => { setQuery(s); setFocused(false); }}
                  className="px-[18px] py-3 flex items-center gap-3 cursor-pointer hover:bg-primary/[0.18] transition-colors"
                  style={{ borderBottom: i < suggestions.length - 1 ? "1px solid hsl(246 44% 36% / 0.12)" : "none" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1AA6DF" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="10" r="3" /><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z" /></svg>
                  <span className="text-sm text-foreground">{s}</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#555570" strokeWidth="2" strokeLinecap="round" className="ml-auto"><path d="M9 18l6-6-6-6" /></svg>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Module pills */}
        <div className="flex items-center gap-2 mt-[22px] animate-fade-up" style={{ animationDelay: "0.36s" }}>
          {[{ l: "Intelligence", a: false }, { l: "Procurement", a: true }, { l: "TMS", a: false }].map((m, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className={`px-4 py-1.5 rounded-[20px] text-xs cursor-pointer transition-all ${m.a ? "bg-primary/20 border border-primary/70 text-accent font-bold" : "bg-transparent border border-muted-foreground/25 text-muted-foreground font-medium"}`}>
                {m.l}
              </span>
              {i < 2 && <span className="text-muted-foreground/30 text-sm">•</span>}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center mt-7 px-9 py-[18px] bg-foreground/[0.03] border border-border-subtle rounded-[14px] backdrop-blur-[10px] flex-wrap justify-center animate-fade-up" style={{ animationDelay: "0.48s" }}>
          {[
            { v: "$500M+", l: "Procured", c: "text-success" },
            { v: "$21M+", l: "Saved", c: "text-accent" },
            { v: "80K+", l: "Routes", c: "text-primary" },
            { v: "2,200+", l: "Carriers", c: "text-accent" },
          ].map((s, i) => (
            <div key={i} className={`text-center min-w-[100px] ${i > 0 ? "pl-7 border-l border-border-subtle" : ""} ${i < 3 ? "pr-7" : ""}`}>
              <div className={`font-mono text-[22px] font-bold leading-none tracking-tight ${s.c}`}>{s.v}</div>
              <div className="text-[10px] text-muted-foreground mt-1.5 tracking-wider uppercase">{s.l}</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex gap-3.5 mt-[30px] flex-wrap justify-center animate-fade-up" style={{ animationDelay: "0.6s" }}>
          <button onClick={() => scrollTo("cta")} className="inline-flex items-center gap-2 bg-gradient-to-br from-primary to-primary-glow text-primary-foreground border-none px-[30px] py-3.5 rounded-lg font-outfit text-[13px] font-bold cursor-pointer tracking-wider uppercase shadow-[0_4px_20px_hsl(246_44%_36%/0.45)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_hsl(246_44%_36%/0.65)] transition-all">
            <CalendarIcon /> Schedule Meeting / Demo Now
          </button>
          <button className="inline-flex items-center gap-2 bg-transparent text-accent border-[1.5px] border-accent/50 px-[30px] py-[13px] rounded-lg font-outfit text-[13px] font-bold cursor-pointer tracking-wider uppercase hover:bg-accent/[0.08] hover:border-accent hover:-translate-y-0.5 transition-all">
            <GlobeIcon /> Global Smart Logistics Grid
          </button>
        </div>
      </div>

      {/* Live route card - desktop */}
      <div className="hidden lg:block absolute right-[3%] top-1/2 -translate-y-1/2 w-[280px] bg-card border-[1.5px] border-border rounded-2xl overflow-hidden shadow-[0_0_60px_hsl(246_44%_36%/0.2)] animate-float z-[3]">
        <div className="px-4 py-3 bg-card-alt border-b border-border-subtle flex items-center justify-between">
          <span className="font-bold text-xs text-foreground">Live Route Intelligence</span>
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-success/[0.12] border border-success/30 rounded-[20px]">
            <div className="w-[5px] h-[5px] rounded-full bg-success" style={{ animation: "pulse-dot 1.5s infinite" }} />
            <span className="text-[9px] font-bold text-success tracking-wider">LIVE</span>
          </div>
        </div>
        <div className="p-4">
          <div className="text-[9px] text-muted-foreground tracking-widest uppercase mb-2.5">Current Optimisation</div>
          <div className="flex items-center gap-2 mb-3.5">
            <div className="flex-1 p-2.5 bg-primary/[0.15] border border-border rounded-lg text-center">
              <div className="text-[9px] text-muted-foreground mb-0.5">FROM</div>
              <div className="font-extrabold text-[15px] text-foreground">{r.from}</div>
            </div>
            <div className="text-primary text-lg font-light">→</div>
            <div className="flex-1 p-2.5 bg-success/[0.1] border border-success/25 rounded-lg text-center">
              <div className="text-[9px] text-muted-foreground mb-0.5">TO</div>
              <div className="font-extrabold text-[15px] text-foreground">{r.to}</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { l: "Saving", v: r.saving, c: "success" },
              { l: "Transit", v: r.time, c: "accent" },
              { l: "Status", v: r.status, c: "accent" },
            ].map((m, i) => (
              <div key={i} className={`p-2 rounded-md text-center border bg-${m.c}/[0.05] border-${m.c}/[0.15]`}>
                <div className="text-[9px] text-muted-foreground mb-0.5">{m.l}</div>
                <div className={`font-mono text-[11px] font-bold text-${m.c}`}>{m.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
