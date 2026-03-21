import { useInView } from "@/hooks/use-in-view";
import { motion } from "framer-motion";
import { useState } from "react";

const columns = [
  {
    step: "01",
    icon: "🎯",
    title: "Reduce Procurement Cost by 20%",
    color: "hsl(246, 44%, 36%)",
    gradient: "linear-gradient(135deg, hsl(246,44%,36%), hsl(248,40%,48%))",
    metric: { value: "20%", label: "Avg. Savings", direction: "↑" },
    points: [
      { text: "LoRRI Benchmark with Rapid procurement & Carrier Discovery" },
      { text: "Best fit Carriers for your lanes — locally, regionally & nationally" },
    ],
    aiAction: "Auto-benchmarks rates against 80K+ lanes in real-time",
    flowLabel: "Procurement",
  },
  {
    step: "02",
    icon: "🔗",
    title: "Unlock Hidden Network Synergies",
    color: "hsl(196, 77%, 49%)",
    gradient: "linear-gradient(135deg, hsl(196,77%,49%), hsl(196,77%,39%))",
    metric: { value: "18%", label: "Cost Reduction", direction: "↓" },
    points: [
      { text: "Synergies across back haul, multi-hop & multi-drop" },
      { text: "Cross-network collaboration via LoRRI intelligence" },
    ],
    aiAction: "Maps internal + external freight flows to find hidden savings",
    flowLabel: "Optimization",
  },
  {
    step: "03",
    icon: "⚡",
    title: "Automate Freight Procurement",
    color: "hsl(105, 50%, 46%)",
    gradient: "linear-gradient(135deg, hsl(105,50%,46%), hsl(105,50%,36%))",
    metric: { value: "2300+", label: "Active Carriers", direction: "↑" },
    highlight: true,
    points: [
      { text: "Industry first Mega RFQs — multi-company collaborative" },
      { text: "80K+ lanes, 100+ truck types, instant responses" },
    ],
    aiAction: "Auto-runs RFQs across 2300+ carriers in seconds",
    flowLabel: "Execution",
  },
  {
    step: "04",
    icon: "🧠",
    title: "Run Autonomous Logistics Operations",
    color: "hsl(40, 82%, 50%)",
    gradient: "linear-gradient(135deg, hsl(40,82%,50%), hsl(40,82%,40%))",
    metric: { value: "95%+", label: "Response Rate", direction: "↑" },
    points: [
      { text: "World's only TMS integrated with intelligence & procurement" },
      { text: "Rapid Go-live with fastest SPOT engines, cloud based" },
    ],
    aiAction: "Continuously re-optimizes routes based on live data",
    flowLabel: "Intelligence",
  },
];

function MetricBadge({ metric }: { metric: { value: string; label: string; direction: string } }) {
  return (
    <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: "hsl(var(--card))" }}>
      <span className="text-lg font-bold" style={{ color: metric.direction === "↑" ? "hsl(var(--success))" : "hsl(var(--accent))" }}>
        {metric.direction} {metric.value}
      </span>
      <span className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{metric.label}</span>
    </div>
  );
}

export default function Platform() {
  const { ref, visible } = useInView();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="platform" ref={ref as any} className="px-4 py-6 sm:px-6 lg:px-8 relative" style={{ background: "hsl(var(--background))" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3" style={{ background: "hsl(var(--primary) / 0.15)", border: "1px solid hsl(var(--border))", color: "hsl(var(--primary-glow))" }}>
            Industry Use Cases & Innovations
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold mb-2" style={{ color: "hsl(var(--foreground))", lineHeight: 1.3 }}>
            From Procurement to Execution — <span style={{ color: "hsl(var(--accent))" }}>Powered by AI</span>
          </h2>
          <p className="text-sm max-w-2xl mx-auto" style={{ color: "hsl(var(--muted-foreground))", lineHeight: 1.6 }}>
            Where AI delivers real logistics outcomes — measurable savings, autonomous operations, and intelligent decision-making.
          </p>
        </div>

        {/* Flow connector */}
        <div className="hidden lg:flex items-center justify-center gap-0 mb-6">
          {columns.map((col, i) => (
            <div key={i} className="flex items-center">
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold" style={{
                background: hoveredIdx === i ? col.gradient : "hsl(var(--card))",
                color: hoveredIdx === i ? "#fff" : "hsl(var(--muted-foreground))",
                border: `1px solid ${hoveredIdx === i ? col.color : "hsl(var(--border-subtle))"}`,
                transition: "all .3s ease",
              }}>
                <span className="text-[10px] font-mono opacity-70">{col.step}</span>
                {col.flowLabel}
              </div>
              {i < columns.length - 1 && (
                <div className="w-8 h-px mx-1" style={{ background: "hsl(var(--border))" }}>
                  <div className="w-full h-full" style={{ background: `linear-gradient(90deg, ${columns[i].color}50, ${columns[i + 1].color}50)` }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {columns.map((col, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="relative overflow-hidden rounded-2xl cursor-pointer group"
              style={{
                background: "hsl(var(--card))",
                border: `1.5px solid ${hoveredIdx === i ? col.color : "hsl(var(--border-subtle))"}`,
                padding: "20px 18px 18px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                transition: "all .35s cubic-bezier(.4,0,.2,1)",
                transform: hoveredIdx === i ? "translateY(-6px)" : "translateY(0)",
                boxShadow: hoveredIdx === i ? `0 12px 40px ${col.color}25, 0 0 0 1px ${col.color}15` : "none",
              }}
            >
              {/* Glow */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full pointer-events-none transition-opacity duration-500" style={{ background: `radial-gradient(circle, ${col.color}20, transparent 70%)`, opacity: hoveredIdx === i ? 1 : 0.3 }} />

              {/* Step + Icon */}
              <div className="flex items-center gap-3 relative">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 transition-transform duration-300 group-hover:scale-110" style={{ background: col.gradient, boxShadow: `0 6px 20px ${col.color}30` }}>
                  <span>{col.icon}</span>
                </div>
                <span className="text-[10px] font-mono font-bold rounded-md px-2 py-0.5" style={{ background: `${col.color}15`, color: col.color }}>{col.step}</span>
              </div>

              {/* Title */}
              <h3 className="text-[14px] font-bold leading-snug" style={{ color: col.color }}>{col.title}</h3>

              {/* Metric Badge */}
              <MetricBadge metric={col.metric} />

              {/* Points */}
              <ul className="text-left w-full space-y-1 flex-1">
                {col.points.map((point, j) => (
                  <li key={j} className="text-[12px] leading-relaxed flex items-start gap-1.5" style={{ color: "hsl(var(--muted-foreground))" }}>
                    <span className="mt-1 w-1 h-1 rounded-full shrink-0" style={{ background: col.color }} />
                    {point.text}
                  </li>
                ))}
              </ul>

              {/* AI Action */}
              <div className="rounded-lg px-3 py-2 mt-auto" style={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border-subtle))" }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[10px]">🤖</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: col.color }}>AI in Action</span>
                </div>
                <p className="text-[11px] leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>{col.aiAction}</p>
              </div>

              {/* Bottom bar */}
              <div className="absolute bottom-0 left-[20%] right-[20%] h-[3px] rounded-t transition-opacity duration-300" style={{ background: col.gradient, opacity: hoveredIdx === i ? 1 : 0.4 }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
