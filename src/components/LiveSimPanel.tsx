import { useState, useEffect, useRef } from "react";

/*
  Live Simulation Panel — shows a mini product demo per tab.
  Each tab has a scripted sequence of steps that auto-play:
  1. Input appears (typed effect)
  2. Processing spinner
  3. Results animate in
  Then loops.
*/

interface SimStep {
  type: "input" | "processing" | "result";
  lines: { text: string; color?: string; bold?: boolean; mono?: boolean; indent?: boolean; icon?: string }[];
  duration: number; // ms to show this step
}

interface SimScenario {
  steps: SimStep[];
}

const SCENARIOS: Record<string, SimScenario> = {
  Procurement: {
    steps: [
      {
        type: "input",
        duration: 2200,
        lines: [
          { text: "📦  New Procurement Request", bold: true, color: "#393185" },
          { text: "Mumbai → Bangalore", icon: "🛣️", mono: true },
          { text: "Weight: 12T  ·  Full Truck Load", icon: "⚖️", mono: true },
          { text: "Category: FMCG Goods", icon: "📋", mono: true },
        ],
      },
      {
        type: "processing",
        duration: 2000,
        lines: [
          { text: "Scanning 2,300+ carriers...", icon: "🔍" },
          { text: "Matching fleet availability...", icon: "🚛" },
          { text: "Running rate negotiation AI...", icon: "🤖" },
        ],
      },
      {
        type: "result",
        duration: 7500,
        lines: [
          { text: "✅  Best Carrier Match Found", bold: true, color: "#54AF3A" },
          { text: "Carrier: Shrinidhi Chemicals Pvt Ltd", mono: true },
          { text: "Rating: ★★★★★  (4.8)  ·  Verified", mono: true },
          { text: "", bold: false },
          { text: "💰  Cost Before:   ₹82,000", color: "var(--text3)" },
          { text: "💰  Cost After:     ₹69,500", color: "#54AF3A", bold: true },
          { text: "🎯  Savings:  ₹12,500 (15.2%)", color: "#54AF3A", bold: true },
        ],
      },
    ],
  },
  TMS: {
    steps: [
      {
        type: "input",
        duration: 2200,
        lines: [
          { text: "🗺️  Route Planning Request", bold: true, color: "#1AA6DF" },
          { text: "Origin: Mumbai, Maharashtra", icon: "📍", mono: true },
          { text: "Stops: Indore → Jaipur", icon: "🔗", mono: true },
          { text: "Destination: Delhi NCR", icon: "🏁", mono: true },
        ],
      },
      {
        type: "processing",
        duration: 2000,
        lines: [
          { text: "Analyzing 14 route options...", icon: "🛣️" },
          { text: "Computing fuel efficiency...", icon: "⛽" },
          { text: "Optimizing multi-stop sequence...", icon: "🔄" },
        ],
      },
      {
        type: "result",
        duration: 7500,
        lines: [
          { text: "✅  Route Optimized Successfully", bold: true, color: "#54AF3A" },
          { text: "Mumbai → Indore → Jaipur → Delhi", mono: true },
          { text: "Total: 1,392 km  ·  ETA: 26h", mono: true },
          { text: "", bold: false },
          { text: "🛣️  Distance Reduced:  48 km saved", color: "#1AA6DF", bold: true },
          { text: "⛽  Fuel Savings:  9.1% efficiency gain", color: "#54AF3A", bold: true },
          { text: "📍  Live Tracking:  Activated", color: "#393185", bold: true },
        ],
      },
    ],
  },
  Intelligence: {
    steps: [
      {
        type: "input",
        duration: 2200,
        lines: [
          { text: "📊  Network Intelligence Scan", bold: true, color: "#393185" },
          { text: "Region: Pan-India Network", icon: "🌐", mono: true },
          { text: "Period: Last 24 hours", icon: "🕐", mono: true },
          { text: "Scope: 80,000+ routes", icon: "🛣️", mono: true },
        ],
      },
      {
        type: "processing",
        duration: 2000,
        lines: [
          { text: "Aggregating shipment data...", icon: "📦" },
          { text: "Computing lane benchmarks...", icon: "📈" },
          { text: "Generating market insights...", icon: "🧠" },
        ],
      },
      {
        type: "result",
        duration: 7500,
        lines: [
          { text: "✅  Intelligence Report Ready", bold: true, color: "#54AF3A" },
          { text: "Active Shipments:    1,284", mono: true },
          { text: "On-Time Rate:         96.2%", mono: true },
          { text: "", bold: false },
          { text: "📈  Avg Rate Change:  ↓ 3.8% vs last week", color: "#54AF3A", bold: true },
          { text: "🌿  CO₂ Reduced:  18% via route optimization", color: "#1AA6DF", bold: true },
          { text: "⚡  Demand Surge:  Chennai–BLR lane (+34%)", color: "#E8A838", bold: true },
        ],
      },
    ],
  },
};

export default function LiveSimPanel({ tab }: { tab: string }) {
  const scenario = SCENARIOS[tab] || SCENARIOS.Intelligence;
  const [stepIndex, setStepIndex] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const [activeDuration, setActiveDuration] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const lineTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const rafRef = useRef<number>();
  const prevTabRef = useRef(tab);

  // Reset on tab change — clear everything synchronously
  useEffect(() => {
    if (prevTabRef.current !== tab) {
      prevTabRef.current = tab;
      clearTimeout(timeoutRef.current);
      clearTimeout(lineTimerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      setStepIndex(0);
      setVisibleLines(0);
      setActiveDuration(0);
      setProgressKey((k) => k + 1);
    }
  }, [tab]);

  // Auto-advance steps
  useEffect(() => {
    const step = scenario.steps[stepIndex];
    if (!step) return;

    // Reset progress bar then start it
    setActiveDuration(0);
    setProgressKey((k) => k + 1);
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = requestAnimationFrame(() => {
        setActiveDuration(step.duration);
      });
    });

    // Animate lines in one by one
    setVisibleLines(0);
    let lineIdx = 0;
    const revealLine = () => {
      lineIdx++;
      setVisibleLines(lineIdx);
      if (lineIdx < step.lines.length) {
        lineTimerRef.current = setTimeout(revealLine, step.type === "processing" ? 500 : 180);
      }
    };
    lineTimerRef.current = setTimeout(revealLine, 300);

    // Move to next step after duration
    timeoutRef.current = setTimeout(() => {
      const nextIdx = (stepIndex + 1) % scenario.steps.length;
      setStepIndex(nextIdx);
    }, step.duration);

    return () => {
      clearTimeout(timeoutRef.current);
      clearTimeout(lineTimerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [stepIndex, scenario]);

  const step = scenario.steps[stepIndex];
  if (!step) return null;

  return (
    <div
      style={{
        width: "100%",
        background: "hsl(var(--card))",
        border: "1.5px solid hsl(var(--border))",
        borderRadius: 14,
        overflow: "hidden",
      }}
    >
      {/* Terminal header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 14px",
          borderBottom: "1px solid hsl(var(--border-subtle))",
          background: step.type === "processing"
            ? "linear-gradient(135deg, rgba(57,49,133,0.12), rgba(26,166,223,0.06))"
            : step.type === "result"
              ? "linear-gradient(135deg, rgba(84,175,58,0.08), rgba(57,49,133,0.04))"
              : "transparent",
          transition: "background .4s",
        }}
      >
        <div style={{ display: "flex", gap: 5 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#ffbd2e" }} />
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#27c93f" }} />
        </div>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: "hsl(var(--muted-foreground))",
            letterSpacing: ".08em",
            textTransform: "uppercase",
            marginLeft: 4,
          }}
        >
          lorri:~/{tab.toLowerCase()}-simulator
        </span>
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: step.type === "processing" ? "#E8A838" : "#54AF3A",
              boxShadow: `0 0 6px ${step.type === "processing" ? "rgba(232,168,56,0.5)" : "rgba(84,175,58,0.5)"}`,
              animation: "pulse-dot 1.5s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 8,
              color: step.type === "processing" ? "#E8A838" : "#54AF3A",
              fontWeight: 700,
              letterSpacing: ".08em",
              textTransform: "uppercase",
            }}
          >
            {step.type === "input" ? "INPUT" : step.type === "processing" ? "PROCESSING" : "COMPLETE"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "12px 16px", minHeight: 160 }}>
        {step.lines.map((line, i) => {
          if (i >= visibleLines) return null;
          if (line.text === "") return <div key={i} style={{ height: 6 }} />;

          return (
            <div
              key={`${tab}-${stepIndex}-${i}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "3px 0",
                animation: "logSlideIn .35s cubic-bezier(.16,1,.3,1) both",
              }}
            >
              {line.icon && <span style={{ fontSize: 12, width: 16, textAlign: "center" }}>{line.icon}</span>}
              <span
                style={{
                  fontFamily: line.mono ? "'JetBrains Mono', monospace" : "Outfit, sans-serif",
                  fontSize: line.bold ? 13 : 12,
                  fontWeight: line.bold ? 700 : 400,
                  color: line.color || "var(--text2)",
                  lineHeight: 1.5,
                }}
              >
                {line.text}
              </span>
            </div>
          );
        })}

        {/* Processing spinner */}
        {step.type === "processing" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginTop: 10,
              animation: "logSlideIn .35s cubic-bezier(.16,1,.3,1) both",
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                border: "2px solid rgba(57,49,133,0.2)",
                borderTop: "2px solid #393185",
                borderRadius: "50%",
                animation: "spin .8s linear infinite",
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: "#393185",
                fontWeight: 600,
              }}
            >
              AI processing...
            </span>
          </div>
        )}
      </div>

      <div style={{ height: 3, background: "var(--borderSm)", overflow: "hidden" }}>
        <div
          key={progressKey}
          style={{
            height: "100%",
            width: activeDuration > 0 ? "100%" : "0%",
            background: step.type === "result" ? "#54AF3A" : step.type === "processing" ? "#E8A838" : "#393185",
            transition: activeDuration > 0 ? `width ${activeDuration}ms linear` : "none",
            borderRadius: 2,
          }}
        />
      </div>
    </div>
  );
}
