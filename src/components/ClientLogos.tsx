const row1 = [
  { n: "Apollo Tyres", logo: "/newlogo/Apollo.png" },
  { n: "Ceat", logo: "/logos/ceat.png" },
  { n: "Bajaj Electricals", logo: "/newlogo/Bajaj_Electricals_logo.png" },
  { n: "Jyothy Labs", logo: "/newlogo/Jyothy_Labs_Logo.png" },
  // { n: "Hidromas", logo: "/logos/hidromas.png" },
  { n: "Onida", logo: "/logos/mirc.png" },
  { n: "Maersk", logo: "/newlogo/maersk.png" },
  { n: "General Mills", logo: "/newlogo/general-mills.png" },
  { n: "Kimbal", logo: "/logos/kimbal.png" },
  { n: "Kimberly-Clark", logo: "/newlogo/kimberly+clark.png" },
  { n: "Perfetti", logo: "/newlogo/perfetti-van-melle-removebg-preview.png" },
  { n: "Pernod Ricard", logo: "/newlogo/Pernod_Ricard.png" },
  { n: "Schreiber Foods", logo: "/newlogo/Schreiber_Foods.png" },
  { n: "Saint-Gobain", logo: "/newlogo/Saint-Gobain-Logo.png" },
  { n: "Shell", logo: "/newlogo/Shell.png" },
  { n: "Vredestein", logo: "/newlogo/Vredestein.png" },
  { n: "Zydus Wellness", logo: "/newlogo/zydus.png" },
];

const row2 = [
  { n: "CJ Darcl", logo: "/newlogo/CJ_Darcl.png" },
  { n: "CEVA Logistics", logo: "/newlogo/CEVA_Logo_HR.png" },
  { n: "DHL", logo: "/newlogo/dhl-logo.png" },
  { n: "DSV ", logo: "/logos/dsv.png" },
  { n: "FM Logistics", logo: "/logos/fm.png" },
  { n: "Fiege", logo: "/logos/fiege.png" },
  { n: "Maersk", logo: "/logos/Maersk.png" },
  // { n: "RCI Logistics", logo: "/logos/rci.jpeg" },
  { n: "Rhenus Logistics", logo: "/newlogo/Rhenus_Logistics.png" },
  { n: "Sennder", logo: "/logos/sennder.png" },
  // { n: "SCC India", logo: "/newlogo/SCC-India-logo.png" },
  { n: "TCI Freight", logo: "/newlogo/TCI_Logo.png" },
  { n: "TOLL", logo: "/newlogo/toll-group.png" },
  { n: "Western Carriers ", logo: "/newlogo/western-carriers.png" },
  { n: "Quehenberger", logo: "/newlogo/Quehenberger.png" },
];

type ClientItem = { n: string; logo: string };

function LogoCard({ n, logo, tooltipPosition = "top" }: ClientItem & { tooltipPosition?: "top" | "bottom" }) {
  return (
    <div className="group relative flex min-w-[74px] flex-shrink-0 items-center justify-center rounded-[12px] px-3.5 py-2.5 sm:min-w-[92px] sm:px-5 sm:py-3" style={{ background: "var(--purpleLt)", border: "1px solid var(--border)", cursor: "pointer" }}>
      <img src={logo} alt={n} className="h-11 w-11 rounded object-contain sm:h-14 sm:w-14 lg:h-16 lg:w-16" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
      <div className="pointer-events-none absolute left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded-md px-2.5 py-1 text-[11px] font-semibold md:block group-hover:!opacity-100" style={{ [tooltipPosition === "top" ? "bottom" : "top"]: "calc(100% + 6px)", background: "var(--text)", color: "var(--bg)", opacity: 0, transition: "opacity 0.2s" }}>
        {n}
      </div>
    </div>
  );
}

function MarqueeRow({ items, direction = "left", duration = 30, tooltipPosition = "top" }: { items: ClientItem[]; direction?: "left" | "right"; duration?: number; tooltipPosition?: "top" | "bottom" }) {
  const seamlessItems = [...items, ...items, ...items];
  return (
    <div style={{ overflow: "hidden", maskImage: "linear-gradient(90deg,transparent,black 8%,black 92%,transparent)", WebkitMaskImage: "linear-gradient(90deg,transparent,black 8%,black 92%,transparent)", padding: tooltipPosition === "top" ? "24px 0 0" : "0 0 24px" }}>
      <div style={{ display: "flex", width: "max-content", gap: 12, animation: `${direction === "left" ? "tickerSeamless" : "tickerReverseSeamless"} ${duration}s linear infinite`, whiteSpace: "nowrap", willChange: "transform" }}>
        {seamlessItems.map((cl, i) => <LogoCard key={`${cl.n}-${i}`} n={cl.n} logo={cl.logo} tooltipPosition={tooltipPosition} />)}
      </div>
    </div>
  );
}

export default function ClientLogos() {
  return (
    <section className="px-4 py-4 sm:px-6 lg:px-8" style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
      <style>{`
        @keyframes tickerSeamless {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }

        @keyframes tickerReverseSeamless {
          0% { transform: translate3d(-33.333%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
      `}</style>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 10 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 14px", background: "var(--greenLt)", border: "1px solid rgba(84,175,58,0.3)", borderRadius: 20, marginBottom: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#54AF3A", animation: "pulse-dot 2s infinite" }} />
            <span style={{ color: "#54AF3A", fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" }}>LoRRI Makes a Difference</span>
          </div>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 4 }} className="text-[1.2rem] sm:text-[1.3rem] lg:text-[1.4rem]">Trusted by <span style={{ color: "#393185" }}>Global Industry Leaders</span></h2>
          <p style={{ fontSize: 14, color: "var(--text2)" }}>Fortune 500 companies and global logistics players rely on LoRRI</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <MarqueeRow items={row1} direction="left" duration={30} tooltipPosition="top" />
          <MarqueeRow items={row2} direction="right" duration={35} tooltipPosition="bottom" />
        </div>
      </div>
    </section>
  );
}
