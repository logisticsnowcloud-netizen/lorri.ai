import { useInView } from "@/hooks/use-in-view";

const feats = [
  { icon: "📊", title: "Get benchmark for your lanes", desc: "Access real-time freight rate benchmarks across 80K+ routes nationwide.", color: "#393185", gradient: "linear-gradient(135deg, #393185, #4D44A8)" },
  { icon: "🚛", title: "Create and manage indents and track vehicles", desc: "Streamline indent creation, carrier allocation and live GPS tracking.", color: "#1AA6DF", gradient: "linear-gradient(135deg, #1AA6DF, #0D8ECF)" },
  { icon: "⚖️", title: "Run contracted and spot procurements with end-to-end auction", desc: "AI-powered auction engine for optimal pricing on every shipment.", color: "#54AF3A", gradient: "linear-gradient(135deg, #54AF3A, #3D9228)" },
  { icon: "🔄", title: "Find best fit transporters for your plants", desc: "Smart matching algorithm pairs your loads with ideal carriers.", color: "#E8A317", gradient: "linear-gradient(135deg, #E8A317, #D4920F)" },
  { icon: "📈", title: "Run synergy for your lanes", desc: "Identify consolidation opportunities to reduce empty miles and costs.", color: "#1AA6DF", gradient: "linear-gradient(135deg, #1AA6DF, #0D8ECF)" },
  { icon: "📉", title: "Generate analytics to gauge transporter performance", desc: "Detailed scorecards on reliability, pricing and service quality.", color: "#393185", gradient: "linear-gradient(135deg, #393185, #4D44A8)" },
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
              borderRadius: 18,
              padding: "32px 24px 28px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
              transition: "all .35s cubic-bezier(.4,0,.2,1)",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              animation: visible ? `fadeUp .7s ${i * 0.1}s ease both` : "none",
              opacity: visible ? undefined : 0,
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = p.color;
                e.currentTarget.style.boxShadow = `0 12px 40px ${p.color}25, 0 0 0 1px ${p.color}15`;
                e.currentTarget.style.transform = "translateY(-6px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Background glow */}
              <div style={{ position: "absolute", top: -40, left: "50%", transform: "translateX(-50%)", width: 120, height: 120, borderRadius: "50%", background: `radial-gradient(circle, ${p.color}15, transparent 70%)`, pointerEvents: "none" }} />
              
              {/* Icon */}
              <div style={{
                width: 72, height: 72, borderRadius: 18,
                background: p.gradient,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 32,
                boxShadow: `0 8px 24px ${p.color}30`,
                position: "relative",
              }}>
                <span style={{ filter: "grayscale(0) brightness(1.1)" }}>{p.icon}</span>
              </div>

              {/* Title */}
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", lineHeight: 1.4, marginTop: 4 }}>{p.title}</h3>

              {/* Description */}
              <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6, margin: 0 }}>{p.desc}</p>

              {/* Bottom accent line */}
              <div style={{ position: "absolute", bottom: 0, left: "20%", right: "20%", height: 3, borderRadius: "3px 3px 0 0", background: p.gradient, opacity: 0.6 }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}