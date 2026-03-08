const clients = [
  { n: "APOLLO TYRES LTD", c: "#D0D0E8" },
  { n: "MAERSK", c: "#1AA6DF", b: true },
  { n: "VREDESTEIN", c: "#D0D0E8" },
  { n: "KUEHNE+NAGEL", c: "#1AA6DF" },
  { n: "Kimberly-Clark", c: "#D0D0E8" },
  { n: "DSV", c: "#FFFFFF", b: true },
  { n: "Shell", c: "#F5C518", b: true },
  { n: "FM>LOGISTIC", c: "#D0D0E8" },
  { n: "PepsiCo", c: "#5570CC", b: true },
];

const lanes = [
  "🟢 Mumbai → Delhi   ₹82,500   -18% vs Market",
  "🔵 Bangalore → Chennai   ₹28,200   Normal",
  "🟡 Pune → Ahmedabad   ₹41,000   Moderate",
  "🟢 Delhi → Kolkata   ₹67,800   -12% vs Market",
  "🔴 Chennai → Delhi   ₹79,500   High Demand",
  "🟢 Surat → Jaipur   ₹38,600   -8% vs Market",
];

export default function ClientLogos() {
  return (
    <section className="bg-bg-alt border-t border-border-subtle py-[52px] px-8">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/[0.15] border border-border rounded-[20px] mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-success" style={{ animation: "pulse-dot 2s infinite" }} />
            <span className="text-accent text-[11px] font-bold tracking-wider uppercase">LoRRI Makes a Difference</span>
          </div>
          <h2 className="text-[1.9rem] font-extrabold text-foreground tracking-tight mb-2">Trusted by Global Industry Leaders</h2>
          <p className="text-sm text-muted-foreground">Fortune 500 companies and leading logistics players rely on LoRRI</p>
        </div>
        <div className="flex flex-wrap gap-3 justify-center items-center">
          {clients.map((cl, i) => (
            <div key={i} className="flex items-center justify-center px-[26px] py-3.5 rounded-[10px] bg-foreground/[0.03] border border-foreground/[0.07] hover:bg-foreground/[0.07] hover:border-primary/50 hover:-translate-y-[3px] transition-all shrink-0">
              <span style={{ fontSize: cl.b ? 15 : 13, fontWeight: cl.b ? 800 : 700, color: cl.c, letterSpacing: ".04em" }}>{cl.n}</span>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-7 border-t border-border-subtle">
          <div className="flex items-center bg-card rounded-[10px] border border-border-subtle overflow-hidden">
            <div className="px-[18px] py-2.5 bg-primary/[0.15] border-r border-border shrink-0 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-success" style={{ animation: "pulse-dot 1.5s infinite" }} />
              <span className="font-mono text-primary text-[10px] font-bold tracking-widest whitespace-nowrap">LIVE FREIGHT</span>
            </div>
            <div className="flex-1 overflow-hidden py-2.5" style={{ maskImage: "linear-gradient(90deg,transparent,black 6%,black 94%,transparent)", WebkitMaskImage: "linear-gradient(90deg,transparent,black 6%,black 94%,transparent)" }}>
              <div className="inline-flex gap-14 whitespace-nowrap" style={{ animation: "ticker 40s linear infinite" }}>
                {[...lanes, ...lanes].map((l, i) => (
                  <span key={i} className="font-mono text-muted-foreground text-xs">{l}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
