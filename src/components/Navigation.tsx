import { useState, useEffect } from "react";
import { MailIcon, PhoneIcon, MenuIcon, CloseIcon, CalendarIcon, SunIcon, MoonIcon } from "./Icons";
import { scrollTo } from "@/hooks/use-in-view";
import logoImg from "@/assets/logisticsnow-logo.png";
import { useDemoModal } from "@/hooks/use-demo-modal";

interface TopBarProps {
  dark: boolean;
  setDark: (fn: (d: boolean) => boolean) => void;
}

function TopBar({ dark, setDark }: TopBarProps) {
  const openDemoModal = useDemoModal();
  return (
    <div style={{ background: "var(--topBar)", borderBottom: "1px solid var(--border)", padding: "7px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
        <span style={{ color: "var(--text2)", fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}><MailIcon />lorri@logisticsnow.in</span>
        <span style={{ color: "var(--text2)", fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}><PhoneIcon />+91-9867773508</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button
          onClick={() => setDark(d => !d)}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 20, border: "1px solid var(--border)", background: "var(--purpleLt)", cursor: "pointer", fontFamily: "Outfit,sans-serif", fontSize: 12, fontWeight: 700, color: "var(--text2)", transition: "all .2s" }}
        >
          {dark ? <><SunIcon /> Light Mode</> : <><MoonIcon /> Dark Mode</>}
        </button>
        <button
          onClick={() => { openDemoModal(); }}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,#393185,#4D44A8)", color: "#fff", border: "none", padding: "6px 16px", borderRadius: 8, fontFamily: "Outfit,sans-serif", fontSize: 11, fontWeight: 700, cursor: "pointer", letterSpacing: ".05em", textTransform: "uppercase" as const, boxShadow: "0 4px 20px rgba(57,49,133,0.4)" }}
        >
          <CalendarIcon /> Schedule Demo
        </button>
      </div>
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = ["About Us", "Manufacturer Login", "Transporter / LSP Login"];

  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "var(--navBg)", backdropFilter: "blur(22px)", borderBottom: `1px solid ${scrolled ? "var(--border)" : "var(--borderSm)"}`, transition: "all .3s" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", height: 62, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => scrollTo("hero")}>
          <img src={logoImg} alt="LogisticsNow" className="nav-logo" style={{ height: 36 }} />
        </div>
        <div className="hidden md:flex" style={{ alignItems: "center", gap: 28 }}>
          {links.map(l => (
            <button key={l} style={{ background: "none", border: "none", color: "var(--text2)", fontFamily: "Outfit,sans-serif", fontSize: 12, fontWeight: 700, cursor: "pointer", letterSpacing: ".07em", textTransform: "uppercase" as const, transition: "color .2s", padding: 0 }}>{l}</button>
          ))}
        </div>
        <button onClick={() => setMobileOpen(m => !m)} className="md:hidden" style={{ background: "none", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text2)", cursor: "pointer", padding: "6px 8px" }}>
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
      {mobileOpen && (
        <div style={{ background: "var(--navBg)", backdropFilter: "blur(24px)", borderTop: "1px solid var(--border)", padding: "18px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
          {links.map(l => (
            <button key={l} style={{ background: "none", border: "none", color: "var(--text2)", fontFamily: "Outfit,sans-serif", fontSize: 14, fontWeight: 700, cursor: "pointer", letterSpacing: ".07em", textTransform: "uppercase" as const, textAlign: "left" as const, padding: 0 }} onClick={() => setMobileOpen(false)}>{l}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

export { TopBar, Nav };
