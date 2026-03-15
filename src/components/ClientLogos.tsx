const row1 = [
  { n: "Apollo Tyres", logo: "/logos/apollo-tyres.png" },
  { n: "Ceat", logo: "/logos/ceat.png" },
  { n: "Bajaj Electricals", logo: "/logos/bajaj.png" },
  { n: "Jyothy Labs", logo: "/logos/jyothy-labs.png" },
  { n: "Hidromas", logo: "/logos/hidromas.png" },
  { n: "Onida", logo: "/logos/mirc.png" },  
  { n: "Maersk", logo: "/logos/Maersk.png" },
  { n: "General Mills", logo: "/logos/general-mills.png" },
  { n: "Kimbal", logo: "/logos/kimbal.png" },
  { n: "Kimberly-Clark", logo: "/logos/kimberly-clark.png" },
  { n: "DHL", logo: "/logos/dhl.png" },
  { n: "Perfetti", logo: "/logos/perfetti.png" },
  { n: "Pernod Ricard", logo: "/logos/pernod.png" },
  { n: "Schreiber Foods", logo: "/logos/schreiber.png" },
  { n: "Saint-Gobain", logo: "/logos/saint-gobain.png" },
  { n: "Shell", logo: "/logos/shell.png" },
  { n: "Vredestein", logo: "/logos/vredestein.jpg" },
  { n: "Zydus Wellness", logo: "/logos/zydus.jpeg" },
];

const row2 = [
  { n: "CJ Darcl", logo: "/logos/cjdarcl.png" },
    // { name: "CCI Group", logo: "/cci.png" },
  { n: "CEVA Logistics", logo: "/logos/ceva.png" },
  { n: "DHL", logo: "/logos/dhl.png" },
  { n: "DSV ", logo: "/logos/dsv.png" },
  // { name: "Delhivery", logo: "/delhivery.png" },
  { n: "FM Logistics", logo: "/logos/fm.png" },
  { n: "Fiege", logo: "/logos/fiege.png" },
  { n: "Maersk", logo: "/logos/Maersk.png" },
  { n: "RCI Logistics", logo: "/logos/rci.jpeg" },
  { n: "Rhenus Logistics", logo: "/logos/rhenus.png" },
  { n: "Sennder", logo: "/logos/sennder.png" },
  { n: "SCC India", logo: "/logos/scc.jpeg" },
  { n: "TCI Freight", logo: "/logos/tci.png" },
  { n: "TOLL", logo: "/logos/toll.png" },
  { n: "Western Carriers ", logo: "/logos/wc.png" },
  { n: "Quehenberger", logo: "/logos/quehenberger.png" },
];

const row3 = [
  // { n: "Flipkart", logo: "/logos/flipkart.jpeg" },
];

type ClientItem = { n: string; logo: string };

function LogoCard({ n, logo }: ClientItem) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "14px 28px", borderRadius: 10, background: "var(--purpleLt)", border: "1px solid var(--border)", flexShrink: 0, cursor: "pointer", whiteSpace: "nowrap", minWidth: 160 }}>
      <img
        src={logo}
        alt={n}
        style={{ width: 36, height: 36, borderRadius: 4, objectFit: "contain" }}
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
      />
      <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text2)", letterSpacing: ".04em" }}>{n}</span>
    </div>
  );
}
function MarqueeRow({ items, direction = "left", duration = 30 }: { items: ClientItem[]; direction?: "left" | "right"; duration?: number }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", maskImage: "linear-gradient(90deg,transparent,black 8%,black 92%,transparent)", WebkitMaskImage: "linear-gradient(90deg,transparent,black 8%,black 92%,transparent)" }}>
      <div style={{
        display: "inline-flex",
        gap: 10,
        animation: `${direction === "left" ? "ticker" : "tickerReverse"} ${duration}s linear infinite`,
        whiteSpace: "nowrap",
      }}>
        {doubled.map((cl, i) => <LogoCard key={i} n={cl.n} logo={cl.logo} />)}
      </div>
    </div>
  );
}

export default function ClientLogos() {
  return (
    <section style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", padding: "28px 32px" }}>
      <style>{`
        @keyframes tickerReverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 16px", background: "var(--greenLt)", border: "1px solid rgba(84,175,58,0.3)", borderRadius: 20, marginBottom: 14 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#54AF3A", animation: "pulse-dot 2s infinite" }} />
            <span style={{ color: "#54AF3A", fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" }}>LoRRI Makes a Difference</span>
          </div>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em", marginBottom: 6 }}>Trusted by Global Industry Leaders</h2>
          <p style={{ fontSize: 14, color: "var(--text2)" }}>Fortune 500 companies and global logistics players rely on LoRRI</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <MarqueeRow items={row1} direction="left" duration={25} />
          <MarqueeRow items={row2} direction="right" duration={30} />
          {/* <MarqueeRow items={row3} direction="left" duration={28} /> */}
        </div>

      </div>
    </section>
  );
}