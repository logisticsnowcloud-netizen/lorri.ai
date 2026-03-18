const row1 = [
  { n: "Apollo Tyres", logo: "/newlogo/Apollo.png" },
  { n: "Ceat", logo: "/logos/ceat.png" },
  { n: "Bajaj Electricals", logo: "/newlogo/Bajaj_Electricals_logo.png" },
  { n: "Jyothy Labs", logo: "/newlogo/Jyothy_Labs_Logo.png" },
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
  { n: "Rhenus Logistics", logo: "/newlogo/Rhenus_Logistics.png" },
  { n: "Sennder", logo: "/logos/sennder.png" },
  { n: "TCI Freight", logo: "/newlogo/TCI_Logo.png" },
  { n: "TOLL", logo: "/newlogo/toll-group.png" },
  { n: "Western Carriers ", logo: "/newlogo/western-carriers.png" },
  { n: "Quehenberger", logo: "/newlogo/Quehenberger.png" },
];

type ClientItem = { n: string; logo: string };

function LogoCard({ n, logo, tooltipPosition = "top" }: ClientItem & { tooltipPosition?: "top" | "bottom" }) {
  return (
    <div
      className="group relative flex min-w-[96px] flex-shrink-0 items-center justify-center rounded-2xl px-4 py-3 sm:min-w-[118px] sm:px-5 sm:py-4 lg:min-w-[132px]"
      style={{
        background: "linear-gradient(180deg, hsl(var(--card) / 0.92), hsl(var(--card-alt) / 0.9))",
        border: "1px solid hsl(var(--border-subtle))",
        boxShadow: "0 10px 30px -18px hsl(var(--background) / 0.85)",
        cursor: "pointer",
      }}
    >
      <img
        src={logo}
        alt={n}
        className="h-12 w-12 rounded object-contain opacity-75 grayscale transition-all duration-500 ease-out group-hover:scale-[1.06] group-hover:opacity-100 group-hover:grayscale-0 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded-md px-2.5 py-1 text-[11px] font-semibold md:block group-hover:opacity-100"
        style={{
          [tooltipPosition === "top" ? "bottom" : "top"]: "calc(100% + 8px)",
          background: "hsl(var(--foreground))",
          color: "hsl(var(--background))",
          opacity: 0,
          transition: "opacity 0.25s ease",
          boxShadow: "0 12px 28px -18px hsl(var(--background) / 0.9)",
        }}
      >
        {n}
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  direction = "left",
  duration = 30,
  tooltipPosition = "top",
}: {
  items: ClientItem[];
  direction?: "left" | "right";
  duration?: number;
  tooltipPosition?: "top" | "bottom";
}) {
  const seamlessItems = [...items, ...items, ...items];

  return (
    <div
      style={{
        overflow: "hidden",
        maskImage: "linear-gradient(90deg,transparent,black 6%,black 94%,transparent)",
        WebkitMaskImage: "linear-gradient(90deg,transparent,black 6%,black 94%,transparent)",
        padding: tooltipPosition === "top" ? "26px 0 2px" : "2px 0 26px",
      }}
    >
      <div
        className="hover:[animation-play-state:paused]"
        style={{
          display: "flex",
          width: "max-content",
          gap: 14,
          whiteSpace: "nowrap",
          willChange: "transform",
          transform: "translate3d(0, 0, 0)",
          animation: `${direction === "left" ? "tickerSeamless" : "tickerReverseSeamless"} ${duration}s linear infinite`,
        }}
      >
        {seamlessItems.map((cl, i) => (
          <LogoCard key={`${cl.n}-${i}`} n={cl.n} logo={cl.logo} tooltipPosition={tooltipPosition} />
        ))}
      </div>
    </div>
  );
}

export default function ClientLogos() {
  return (
    <section
      className="px-4 py-5 sm:px-6 lg:px-8"
      style={{ background: "hsl(var(--bg2))", borderTop: "1px solid hsl(var(--border-subtle))" }}
    >
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
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <div
            className="mb-2 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5"
            style={{
              background: "hsl(var(--success) / 0.12)",
              border: "1px solid hsl(var(--success) / 0.28)",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "hsl(var(--success))",
                animation: "pulse-dot 2s infinite",
              }}
            />
            <span
              style={{
                color: "hsl(var(--success))",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: ".1em",
                textTransform: "uppercase",
              }}
            >
              LoRRI Makes a Difference
            </span>
          </div>

          <h2
            style={{
              fontSize: "1.4rem",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              marginBottom: 6,
              color: "hsl(var(--foreground))",
            }}
            className="text-[1.2rem] sm:text-[1.3rem] lg:text-[1.4rem]"
          >
            Trusted by <span style={{ color: "hsl(var(--primary-glow))" }}>Global Industry Leaders</span>
          </h2>
          <p style={{ fontSize: 14, color: "hsl(var(--muted-foreground))" }}>
            Fortune 500 companies and global logistics players rely on LoRRI
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <MarqueeRow items={row1} direction="left" duration={40} tooltipPosition="top" />
          <MarqueeRow items={row2} direction="right" duration={46} tooltipPosition="bottom" />
        </div>
      </div>
    </section>
  );
}
