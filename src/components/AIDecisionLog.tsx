import { useState, useEffect, useRef } from "react";

interface LogEntry {
  type: "route" | "carrier" | "savings" | "alert" | "prediction";
  icon: string;
  text: string;
  detail: string;
  color: string;
}

const LOG_ENTRIES: LogEntry[] = [
  { type: "route", icon: "🛣️", text: "Route Optimized", detail: "Mumbai → Delhi via NH48 · 1,398 km · ETA 22h", color: "#54AF3A" },
  { type: "carrier", icon: "🚛", text: "Carrier Selected", detail: "Shrinidhi Chemicals · 4.8★ · ₹47,200", color: "#1AA6DF" },
  { type: "savings", icon: "💰", text: "Cost Reduced 18%", detail: "Benchmark ₹57,500 → Negotiated ₹47,200", color: "#54AF3A" },
  { type: "alert", icon: "⚡", text: "Demand Surge Detected", detail: "Chennai–Bangalore lane · +34% volume spike", color: "#E8A838" },
  { type: "prediction", icon: "🧠", text: "Rate Forecast Updated", detail: "Pune–Hyderabad ↓ 6.2% predicted next 7d", color: "#393185" },
  { type: "route", icon: "🔄", text: "Load Consolidated", detail: "3 shipments merged · Kolkata hub · 12T capacity", color: "#1AA6DF" },
  { type: "carrier", icon: "✅", text: "Carrier Verified", detail: "Parasmani Roadlines · GST + Insurance confirmed", color: "#54AF3A" },
  { type: "savings", icon: "📊", text: "Tender Completed", detail: "7 bids received · Best: ₹38,900 (↓22% vs spot)", color: "#393185" },
  { type: "alert", icon: "📍", text: "Live Tracking Active", detail: "MH-04-AB-1234 · 847 km completed · On schedule", color: "#1AA6DF" },
  { type: "prediction", icon: "🔮", text: "Capacity Alert", detail: "Gujarat corridor · Low availability in 48h", color: "#E8A838" },
  { type: "route", icon: "🛣️", text: "Multi-Modal Switch", detail: "Rail segment added · Nagpur–Vizag · ₹12K saved", color: "#54AF3A" },
  { type: "carrier", icon: "🚛", text: "Auto-Dispatched", detail: "Smart India Supply Chain · Pickup in 2h", color: "#1AA6DF" },
];

const STATS = [
  { value: "₹21M+", label: "Saved This Quarter", color: "#54AF3A" },
  { value: "2,847", label: "Routes Optimized Today", color: "#393185" },
  { value: "99.2%", label: "On-Time Delivery", color: "#1AA6DF" },
];

export default function AIDecisionLog() {
  const [visibleEntries, setVisibleEntries] = useState<number[]>([0, 1, 2, 3, 4]);
  const [currentIndex, setCurrentIndex] = useState(5);
  const [pulsingDot, setPulsingDot] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleEntries((prev) => {
        const next = [...prev.slice(1), currentIndex % LOG_ENTRIES.length];
        return next;
      });
      setCurrentIndex((prev) => prev + 1);
    }, 2400);
    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    const pulse = setInterval(() => setPulsingDot((p) => !p), 1200);
    return () => clearInterval(pulse);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        width: "100%",
      }}
    >
      {/* Live Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 14px",
          background: "linear-gradient(135deg, rgba(57,49,133,0.15), rgba(26,166,223,0.08))",
          border: "1px solid rgba(57,49,133,0.25)",
          borderRadius: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#54AF3A",
              boxShadow: "0 0 8px rgba(84,175,58,0.6)",
              animation: "pulse-dot 1.5s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              fontWeight: 700,
              color: "#54AF3A",
              letterSpacing: ".1em",
              textTransform: "uppercase",
            }}
          >
            AI Engine Live
          </span>
        </div>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: "var(--text3)",
            letterSpacing: ".05em",
          }}
        >
          {new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })} IST
        </span>
      </div>

      {/* Decision Log */}
      <div
        ref={containerRef}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 0,
          background: "var(--card)",
          border: "1.5px solid var(--border)",
          borderRadius: 14,
          overflow: "hidden",
        }}
      >
        {visibleEntries.map((entryIdx, i) => {
          const entry = LOG_ENTRIES[entryIdx];
          const isNewest = i === visibleEntries.length - 1;
          return (
            <div
              key={`${entryIdx}-${i}-${currentIndex}`}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                padding: "10px 14px",
                borderBottom:
                  i < visibleEntries.length - 1
                    ? "1px solid var(--borderSm)"
                    : "none",
                animation: isNewest ? "logSlideIn .45s cubic-bezier(.16,1,.3,1) both" : undefined,
                opacity: isNewest ? undefined : 0.7 + i * 0.075,
              }}
            >
              <span style={{ fontSize: 14, lineHeight: 1, marginTop: 2 }}>{entry.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    fontWeight: 700,
                    color: entry.color,
                    lineHeight: 1.2,
                    marginBottom: 2,
                  }}
                >
                  {entry.text}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--text3)",
                    lineHeight: 1.4,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {entry.detail}
                </div>
              </div>
              {isNewest && (
                <span
                  style={{
                    fontSize: 8,
                    fontFamily: "'JetBrains Mono', monospace",
                    color: entry.color,
                    background: `${entry.color}18`,
                    padding: "2px 6px",
                    borderRadius: 4,
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    marginTop: 2,
                  }}
                >
                  NOW
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Live Stats */}
      <div style={{ display: "flex", gap: 6 }}>
        {STATS.map((s, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              padding: "8px 8px",
              background: `${s.color}10`,
              border: `1px solid ${s.color}25`,
              borderRadius: 10,
              textAlign: "center",
            }}
          >
            <div
              className="font-mono-code"
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: s.color,
                lineHeight: 1.1,
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontSize: 8,
                color: "var(--text3)",
                marginTop: 3,
                letterSpacing: ".06em",
                textTransform: "uppercase",
                lineHeight: 1.2,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
