import { useState, useEffect } from "react";
import { MailIcon, PhoneIcon, MenuIcon, CloseIcon } from "./Icons";
import { scrollTo } from "@/hooks/use-in-view";

function TopBar() {
  return (
    <div className="bg-bg-deep border-b border-border-subtle px-8 py-2 flex items-center justify-between flex-wrap gap-2">
      <div className="flex items-center gap-6">
        <span className="text-muted-foreground text-xs flex items-center gap-1.5"><MailIcon />lorri@logisticsnow.in</span>
        <span className="text-muted-foreground text-xs flex items-center gap-1.5"><PhoneIcon />+91-9867773508</span>
      </div>
      <button onClick={() => scrollTo("cta")} className="inline-flex items-center gap-2 bg-gradient-to-br from-primary to-primary-glow text-primary-foreground border-none px-4 py-1.5 rounded-lg font-outfit text-[11px] font-bold cursor-pointer tracking-wider uppercase shadow-[0_4px_20px_hsl(246_44%_36%/0.45)] hover:-translate-y-0.5 transition-all">
        Schedule Meeting / Demo Now
      </button>
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
    <nav className={`sticky top-0 z-[100] backdrop-blur-[22px] border-b transition-all ${scrolled ? "bg-background/[0.97] border-border" : "bg-background/85 border-border-subtle"}`}>
      <div className="max-w-[1280px] mx-auto px-8 h-[62px] flex items-center justify-between">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => scrollTo("hero")}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-success flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm font-outfit">LN</span>
          </div>
          <div>
            <span className="font-extrabold text-base text-foreground">Logistics<span className="text-success">Now</span></span>
            <div className="text-[8px] text-muted-foreground tracking-widest uppercase">powered by LoRRI</div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button key={l} className="bg-transparent border-none text-muted-foreground font-outfit text-xs font-bold cursor-pointer tracking-wider uppercase hover:text-foreground transition-colors p-0">
              {l}
            </button>
          ))}
          <button onClick={() => scrollTo("cta")} className="inline-flex items-center gap-2 bg-gradient-to-br from-primary to-primary-glow text-primary-foreground border-none px-5 py-2.5 rounded-lg font-outfit text-xs font-bold cursor-pointer tracking-wider uppercase shadow-[0_4px_20px_hsl(246_44%_36%/0.45)] hover:-translate-y-0.5 transition-all">
            Schedule Demo
          </button>
        </div>
        <button onClick={() => setMobileOpen((m) => !m)} className="md:hidden bg-transparent border border-border rounded-lg text-muted-foreground cursor-pointer p-1.5">
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
      {mobileOpen && (
        <div className="bg-background/[0.98] backdrop-blur-[24px] border-t border-border px-6 py-5 flex flex-col gap-4 md:hidden">
          {links.map((l) => (
            <button key={l} className="bg-transparent border-none text-muted-foreground font-outfit text-[15px] font-bold cursor-pointer tracking-wider uppercase text-left hover:text-foreground transition-colors p-0" onClick={() => setMobileOpen(false)}>
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

export { TopBar, Nav };
