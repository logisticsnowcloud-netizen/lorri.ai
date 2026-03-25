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
    <div
      className="px-4 py-1.5 sm:px-6 lg:px-8"
      style={{
        background: "var(--topBar)",
        borderBottom: "1px solid hsl(var(--border))",
      }}
    >
      <div className="mx-auto flex max-w-[1280px] flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span style={{ color: "var(--text2)", fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
            <MailIcon />
            lorri@logisticsnow.in
          </span>
          <span className="hidden xs:flex" style={{ color: "var(--text2)", fontSize: 12, alignItems: "center", gap: 6 }}>
            <PhoneIcon />
            +91-9867773508
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <button
            onClick={() => setDark((d) => !d)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "7px 12px",
              borderRadius: 20,
              border: "1px solid hsl(var(--border))",
              background: "var(--purpleLt)",
              cursor: "pointer",
              fontFamily: "Outfit,sans-serif",
              fontSize: 12,
              fontWeight: 700,
              color: "var(--text2)",
              transition: "all .2s",
            }}
          >
            {dark ? (
              <>
                <SunIcon /> Light Mode
              </>
            ) : (
              <>
                <MoonIcon /> Dark Mode
              </>
            )}
          </button>
          <button
            onClick={() => openDemoModal()}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "linear-gradient(135deg,#393185,#4D44A8)",
              color: "#fff",
              border: "none",
              padding: "7px 14px",
              borderRadius: 8,
              fontFamily: "Outfit,sans-serif",
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              letterSpacing: ".05em",
              textTransform: "uppercase",
              boxShadow: "0 4px 20px rgba(57,49,133,0.4)",
            }}
          >
            <CalendarIcon /> Schedule Demo
          </button>
        </div>
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
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "var(--navBg)",
        backdropFilter: "blur(22px)",
        borderBottom: `1px solid ${scrolled ? "hsl(var(--border))" : "hsl(var(--border-subtle))"}`,
        transition: "all .3s",
      }}
    >
      <div className="mx-auto flex h-12 max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          className="flex items-center"
          style={{ cursor: "pointer" }}
          onClick={() => scrollTo("hero")}
        >
          <span style={{ fontWeight: 800, fontSize: 24, color: "#393185" }}>
            LoRRI<span style={{ color: "#54AF3A" }}>.ai</span>
          </span>
          {/* <img src={logoImg} alt="LogisticsNow" className="nav-logo h-8 w-auto sm:h-9" style={{ mixBlendMode: "multiply" }} /> */}
        </button>

        <div className="hidden lg:flex" style={{ alignItems: "center", gap: 24 }}>
          {links.map((l) => (
            <button
              key={l}
              style={{
                background: "none",
                border: "none",
                color: "var(--text2)",
                fontFamily: "Outfit,sans-serif",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                letterSpacing: ".07em",
                textTransform: "uppercase",
                transition: "color .2s",
                padding: 0,
              }}
            >
              {l}
            </button>
          ))}
        </div>

        <button
          onClick={() => setMobileOpen((m) => !m)}
          className="lg:hidden"
          style={{
            background: "none",
            border: "1px solid hsl(var(--border))",
            borderRadius: 8,
            color: "var(--text2)",
            cursor: "pointer",
            padding: "6px 8px",
          }}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {mobileOpen && (
        <div
          className="px-4 pb-4 pt-2 sm:px-6"
          style={{
            background: "var(--navBg)",
            backdropFilter: "blur(24px)",
            borderTop: "1px solid hsl(var(--border))",
          }}
        >
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <button
                key={l}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text2)",
                  fontFamily: "Outfit,sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  letterSpacing: ".07em",
                  textTransform: "uppercase",
                  textAlign: "left",
                  padding: 0,
                }}
                onClick={() => setMobileOpen(false)}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export { TopBar, Nav };
