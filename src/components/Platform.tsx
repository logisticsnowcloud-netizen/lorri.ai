import { useInView } from "@/hooks/use-in-view";

const columns = [
  {
    icon: "📊",
    title: "Freight Benchmarks",
    color: "#393185",
    gradient: "linear-gradient(135deg, #393185, #4D44A8)",
    points: [
      { text: "LoRRI Benchmark integrated with Rapid procurement and Carrier Discovery" },
      { text: "Enable up to ", bold: "20% in Savings", after: ", with access to national networks & synergy at scale" },
      { text: "Major industries covered, discover the best fit Carriers for your lanes locally, regionally and nationally" },
    ],
  },
  {
    icon: "🔄",
    title: "Synergy Alignment",
    color: "#1AA6DF",
    gradient: "linear-gradient(135deg, #1AA6DF, #0D8ECF)",
    points: [
      { text: "Leverage ", bold: "Synergies", after: " spanning back haul, scale and multi-hop/multi-drop opportunities and more!" },
      { text: "", bold: "Internal synergy:", after: " across raw material, packaging material and finished goods", prefix: "a." },
      { text: "", bold: "External synergy:", after: " horizontal collaboration across networks enabled by LoRRI as a neutral orchestrator", prefix: "b." },
    ],
  },
  {
    icon: "⚖️",
    title: "Contracted & Spot Procurement",
    color: "#54AF3A",
    gradient: "linear-gradient(135deg, #54AF3A, #3D9228)",
    points: [
      { text: "Rapid freight procurement leveraging LoRRI" },
      { text: "Industry first ", bold: "Mega RFQs (multi-company collaborative", after: " freight ~100 Mn procurement)" },
      { text: "Immediate access to the national network: ", bold: "80,000+ lanes, 2200+ carriers", after: " and 100+ truck types" },
      { text: "National, regional and local reach" },
    ],
  },
  {
    icon: "🖥️",
    title: "Intelligent TMS",
    color: "#E8A317",
    gradient: "linear-gradient(135deg, #E8A317, #D4920F)",
    points: [
      { text: "LoRRI is world's only Transport Management System (TMS) integrated with intelligence and procurement" },
      { text: "", bold: "Rapid Go-live", prefix: "a." },
      { text: "Fastest SPOT and Procurement engines, integrated with 2200+ Carriers (", bold: "95%+ response rate!", after: ")", prefix: "b." },
      { text: "100% cloud based, can be ", bold: "integrated", after: " with existing portfolio of systems / system of record", prefix: "c." },
    ],
  },
];

function RenderPoint({ point }: { point: { text: string; bold?: string; after?: string; prefix?: string } }) {
  return (
    <li style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.65, marginBottom: 6 }}>
      {point.prefix && <span style={{ fontWeight: 600, color: "var(--text)", marginRight: 4 }}>{point.prefix}</span>}
      {point.text}
      {point.bold && <strong style={{ fontWeight: 700, color: "var(--text)" }}>{point.bold}</strong>}
      {point.after && <span>{point.after}</span>}
    </li>
  );
}

export default function Platform() {
  const { ref, visible } = useInView();

  return (
    <section id="platform" ref={ref as any} style={{ background: "var(--bg)", padding: "100px 32px" }} className="max-md:py-16 max-md:px-4">
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", background: "var(--purpleLt)", border: "1px solid var(--border)", color: "#B1D0EF", marginBottom: 18 }}>Industry Use Cases & Innovations</div>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#393185", lineHeight: 1.3, marginBottom: 16, maxWidth: 800, margin: "0 auto 16px" }} className="max-md:!text-[1.4rem]">
            Save cost, expand reach, save time & our planet!
          </h2>
          <p style={{ fontSize: 15, color: "var(--text2)", maxWidth: 700, margin: "0 auto", lineHeight: 1.75 }}>
            Powering Freight Intelligence, Procurement and End to End Digitization/TMS at Leading Companies globally.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }} className="max-md:!grid-cols-1 max-lg:!grid-cols-2">
          {columns.map((col, i) => (
            <div key={i} style={{
              background: "var(--card)",
              border: "1.5px solid var(--border)",
              borderRadius: 18,
              padding: "28px 22px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
              transition: "all .35s cubic-bezier(.4,0,.2,1)",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              animation: visible ? `fadeUp .7s ${i * 0.12}s ease both` : "none",
              opacity: visible ? undefined : 0,
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = col.color;
                e.currentTarget.style.boxShadow = `0 12px 40px ${col.color}25, 0 0 0 1px ${col.color}15`;
                e.currentTarget.style.transform = "translateY(-6px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Background glow */}
              <div style={{ position: "absolute", top: -40, left: "50%", transform: "translateX(-50%)", width: 120, height: 120, borderRadius: "50%", background: `radial-gradient(circle, ${col.color}15, transparent 70%)`, pointerEvents: "none" }} />

              {/* Icon */}
              <div style={{
                width: 64, height: 64, borderRadius: 16,
                background: col.gradient,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28,
                boxShadow: `0 8px 24px ${col.color}30`,
                position: "relative",
              }}>
                <span style={{ filter: "grayscale(0) brightness(1.1)" }}>{col.icon}</span>
              </div>

              {/* Title */}
              <h3 style={{ fontSize: 15, fontWeight: 700, color: col.color, lineHeight: 1.4, textAlign: "center", marginTop: 2 }}>{col.title}</h3>

              {/* Bullet points */}
              <ul style={{ listStyle: "none", padding: 0, margin: 0, textAlign: "left", width: "100%" }}>
                {col.points.map((point, j) => (
                  <RenderPoint key={j} point={point} />
                ))}
              </ul>

              {/* Bottom accent line */}
              <div style={{ position: "absolute", bottom: 0, left: "20%", right: "20%", height: 3, borderRadius: "3px 3px 0 0", background: col.gradient, opacity: 0.6 }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
