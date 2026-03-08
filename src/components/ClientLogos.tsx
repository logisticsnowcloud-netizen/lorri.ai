const row1 = [
  { n: "APOLLO TYRES", c: "var(--text2)", b: false },
  { n: "MAERSK", c: "#1AA6DF", b: true },
  { n: "VREDESTEIN", c: "var(--text2)", b: false },
  { n: "KUEHNE+NAGEL", c: "#1AA6DF", b: true },
  { n: "KIMBERLY-CLARK", c: "var(--text2)", b: false },
];

const row2 = [
  { n: "DSV", c: "var(--text)", b: true },
  { n: "SHELL", c: "#F5C518", b: true },
  { n: "FM LOGISTIC", c: "var(--text2)", b: false },
  { n: "PEPSICO", c: "#5570CC", b: true },
  { n: "BAJAJ", c: "var(--text2)", b: false },
  { n: "TATA STEEL", c: "#1AA6DF", b: true },
];

const row3 = [
  { n: "RELIANCE", c: "var(--text2)", b: false },
  { n: "DELHIVERY", c: "#E53935", b: true },
  { n: "MAHINDRA", c: "var(--text2)", b: false },
  { n: "ULTRATECH", c: "#393185", b: true },
  { n: "BLUE DART", c: "#1AA6DF", b: true },
];

const lanes = [
  "🟢 Mumbai → Delhi   ₹82,500   -18% vs Market",
  "🔵 Bangalore → Chennai   ₹28,200   Normal",
  "🟡 Pune → Ahmedabad   ₹41,000   Moderate",
  "🟢 Delhi → Kolkata   ₹67,800   -12% vs Market",
  "🔴 Chennai → Delhi   ₹79,500   High Demand",
  "🟢 Surat → Jaipur   ₹38,600   -8% vs Market",
];

function LogoCard({ n, c, b }: { n: string; c: string; b: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "14px 32px", borderRadius: 10, background: "var(--purpleLt)", border: "1px solid var(--border)", flexShrink: 0, cursor: "pointer", whiteSpace: "nowrap" }}>
      <span style={{ fontSize: b ? 14 : 12, fontWeight: b ? 800 : 700, color: c, letterSpacing: ".04em" }}>{n}</span>
    </div>
  );
}

function MarqueeRow({ items, direction = "left", duration = 30 }: { items: typeof row1; direction?: "left" | "right"; duration?: number }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", maskImage: "linear-gradient(90deg,transparent,black 8%,black 92%,transparent)", WebkitMaskImage: "linear-gradient(90deg,transparent,black 8%,black 92%,transparent)" }}>
      <div style={{
        display: "inline-flex",
        gap: 10,
        animation: `${direction === "left" ? "ticker" : "tickerReverse"} ${duration}s linear infinite`,
        whiteSpace: "nowrap",
      }}>
        {doubled.map((cl, i) => <LogoCard key={i} {...cl} />)}
      </div>
    </div>
  );
}

export default function ClientLogos() {
  return (
    <section style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", padding: "52px 32px" }}>
      <style>{`
        @keyframes tickerReverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
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
          <MarqueeRow items={row3} direction="left" duration={28} />
        </div>

        <div style={{ marginTop: 36, paddingTop: 24, borderTop: "1px solid var(--borderSm)" }}>
          <div style={{ display: "flex", alignItems: "center", background: "var(--card)", borderRadius: 10, border: "1px solid var(--border)", overflow: "hidden" }}>
            <div style={{ padding: "10px 18px", background: "var(--purpleLt)", borderRight: "1px solid var(--border)", flexShrink: 0, display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#54AF3A", animation: "pulse-dot 1.5s infinite" }} />
              <span className="font-mono" style={{ color: "#393185", fontSize: 10, fontWeight: 700, letterSpacing: ".12em", whiteSpace: "nowrap" }}>LIVE FREIGHT</span>
            </div>
            <div style={{ flex: 1, overflow: "hidden", padding: "10px 0", maskImage: "linear-gradient(90deg,transparent,black 6%,black 94%,transparent)", WebkitMaskImage: "linear-gradient(90deg,transparent,black 6%,black 94%,transparent)" }}>
              <div style={{ display: "inline-flex", gap: 56, animation: "ticker 40s linear infinite", whiteSpace: "nowrap" }}>
                {[...lanes, ...lanes].map((l, i) => (
                  <span key={i} className="font-mono" style={{ color: "var(--text2)", fontSize: 12 }}>{l}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}