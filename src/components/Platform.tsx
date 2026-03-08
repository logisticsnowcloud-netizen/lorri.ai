import { useInView } from "@/hooks/use-in-view";

const feats = [
  { icon: "📊", title: "Get benchmark for your lanes", color: "#393185" },
  { icon: "🚛", title: "Create and manage indents and track vehicles", color: "#1AA6DF" },
  { icon: "⚖️", title: "Run contracted and spot procurements with end-to-end auction", color: "#54AF3A" },
  { icon: "🔄", title: "Find best fit transporters for your plants", color: "#393185" },
  { icon: "📈", title: "Run synergy for your lanes", color: "#1AA6DF" },
  { icon: "📉", title: "Generate analytics to gauge transporter performance", color: "#54AF3A" },
];

export default function Platform() {
  const { ref, visible } = useInView();

  return (
    <section id="platform" ref={ref as any} style={{ background: "var(--bg)", padding: "100px 32px" }} className="max-md:py-16 max-md:px-4">
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", background: "var(--purpleLt)", border: "1px solid var(--border)", color: "#B1D0EF", marginBottom: 18 }}>Platform Capabilities</div>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#393185", lineHeight: 1.3, marginBottom: 16, maxWidth: 800, margin: "0 auto 16px" }} className="max-md:!text-[1.4rem]">
            Powering Freight Intelligence, Procurement and End to End Digitization/TMS at Leading Companies globally.
          </h2>
          <p style={{ fontSize: 15, color: "var(--text2)", maxWidth: 700, margin: "0 auto", lineHeight: 1.75 }}>
            An end-to-end logistics platform to take control of your logistical challenges and create friction-less trucking and supply chain operations.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="max-md:!grid-cols-1">
          {feats.map((p, i) => (
            <div key={i} style={{
              background: "var(--card)",
              border: "1.5px solid var(--border)",
              borderRadius: 16,
              padding: "36px 24px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              transition: "all .3s",
              cursor: "pointer",
              animation: visible ? `fadeUp .7s ${i * 0.1}s ease both` : "none",
              opacity: visible ? undefined : 0,
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = p.color; e.currentTarget.style.boxShadow = `0 8px 30px ${p.color}20`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = ""; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ width: 64, height: 64, borderRadius: 16, background: `${p.color}12`, border: `1px solid ${p.color}28`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30 }}>
                {p.icon}
              </div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", lineHeight: 1.5 }}>{p.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}