import { Arrow, CalendarIcon, Check } from "./Icons";
import { scrollTo } from "@/hooks/use-in-view";
import { useDemoModal } from "@/hooks/use-demo-modal";
import { useInView } from "@/hooks/use-in-view";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

/* ─── Live AI Activity Log ─── */
const aiSteps = [
  { text: "Evaluating 2,200+ carriers for Mumbai → Delhi...", delay: 0 },
  { text: "18 carriers matched — ranking by cost & reliability...", delay: 800 },
  { text: "5 shortlisted — running bid optimization...", delay: 1800 },
  { text: "Selected: TransCorp Logistics (98% reliability)", delay: 2800 },
  { text: "✔ Cost reduced by 16% vs market rate", delay: 3600 },
];

function LiveActivityLog({ visible }: { visible: boolean }) {
  const [shownSteps, setShownSteps] = useState<number>(0);
  const started = useRef(false);

  useEffect(() => {
    if (!visible || started.current) return;
    started.current = true;
    aiSteps.forEach((step, i) => {
      setTimeout(() => setShownSteps(i + 1), step.delay);
    });
  }, [visible]);

  return (
    <div className="rounded-xl p-3 mt-3 space-y-1.5" style={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border-subtle))" }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "hsl(var(--success))" }} />
          <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "hsl(var(--success))" }} />
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "hsl(var(--success))" }}>AI Procurement — Live</span>
      </div>
      {aiSteps.slice(0, shownSteps).map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-start gap-2 text-[11px] leading-relaxed"
          style={{ color: i === shownSteps - 1 ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))" }}
        >
          <span className="mt-0.5 shrink-0" style={{ color: step.text.startsWith("✔") ? "hsl(var(--success))" : "hsl(var(--accent))" }}>→</span>
          <span>{step.text}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Animated Counter ─── */
function CountUp({ target, suffix = "", visible }: { target: number; suffix?: string; visible: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const dur = 1200;
    const step = 16;
    const inc = target / (dur / step);
    const id = setInterval(() => {
      start += inc;
      if (start >= target) { setVal(target); clearInterval(id); }
      else setVal(Math.floor(start));
    }, step);
    return () => clearInterval(id);
  }, [visible, target]);
  return <>{val}{suffix}</>;
}

/* ─── Dashboard Metrics Overlay ─── */
function MetricsOverlay({ visible }: { visible: boolean }) {
  const metrics = [
    { label: "Best Rate", value: "₹82,500", color: "hsl(var(--success))" },
    { label: "Savings", value: "₹15,700", color: "hsl(var(--accent))" },
    { label: "Confidence", value: "94%", color: "hsl(var(--primary-glow))" },
  ];
  return (
    <div className="grid grid-cols-3 gap-2 mt-3">
      {metrics.map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={visible ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5 + i * 0.15, duration: 0.4 }}
          className="rounded-lg p-2.5 text-center"
          style={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border-subtle))" }}
        >
          <div className="text-sm font-bold font-mono" style={{ color: m.color }}>{m.value}</div>
          <div className="text-[10px]" style={{ color: "hsl(var(--muted-foreground))" }}>{m.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

export function ForShippers() {
  const openDemoModal = useDemoModal();
  const { ref, visible } = useInView();

  const routes = [
    { route: "Mumbai → Delhi", status: "Optimized", savings: "16%", rate: "₹82,500" },
    { route: "Pune → Surat", status: "Bidding", savings: "15%", rate: "₹26,800" },
    { route: "Bangalore → Hyderabad", status: "Optimized", savings: "18%", rate: "₹36,200" },
    { route: "Delhi → Kolkata", status: "Evaluating", savings: "17%", rate: "₹59,400" },
  ];

  const bullets = [
    { text: "Know the exact fair price before you bid", highlight: false },
    { text: "AI ranks 2,200+ carriers by reliability & cost", highlight: true },
    { text: "Auto-run tenders and select the best carrier instantly", highlight: false },
    { text: "Benchmark against ₹2.5B+ global freight data", highlight: false },
  ];

  return (
    <section id="shippers" ref={ref as any} className="px-4 py-10 sm:px-6 lg:px-8" style={{ background: "hsl(var(--bg2))" }}>
      <div className="mx-auto max-w-[1200px]">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* LEFT — Value Prop */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3" style={{ background: "hsl(var(--primary) / 0.15)", border: "1px solid hsl(var(--border))", color: "hsl(var(--primary-glow))" }}>
              For Shippers & Manufacturers
            </div>
            <h2 className="text-[1.4rem] sm:text-[1.5rem] lg:text-[1.7rem] font-black mb-2" style={{ color: "hsl(var(--foreground))", letterSpacing: "-0.03em", lineHeight: 1.15 }}>
              Let AI Procure Your Freight<br />
              <span style={{ color: "hsl(var(--accent))" }}>At the Best Price</span>
            </h2>
            <p className="text-sm mb-4" style={{ color: "hsl(var(--muted-foreground))", lineHeight: 1.7 }}>
              Autonomous freight procurement powered by national benchmarks, carrier intelligence, and real-time optimization.
            </p>

            {/* Bullets */}
            <div className="flex flex-col gap-1.5 mb-4">
              {bullets.map((b, i) => (
                <div key={i} className="flex items-start gap-2.5 px-3 py-2 rounded-lg" style={{ background: "hsl(var(--card))", border: `1px solid ${b.highlight ? "hsl(var(--primary) / 0.4)" : "hsl(var(--border-subtle))"}` }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "hsl(var(--primary-glow))" }} />
                  <span className={`text-[13px] leading-relaxed ${b.highlight ? "font-semibold" : ""}`} style={{ color: b.highlight ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))" }}>
                    {b.text}
                  </span>
                </div>
              ))}
            </div>

            {/* AI Action Line */}
            <div className="rounded-xl px-4 py-3 mb-5" style={{ background: "hsl(var(--primary) / 0.08)", border: "1px solid hsl(var(--primary) / 0.25)" }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm">🤖</span>
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "hsl(var(--primary-glow))" }}>AI in Action</span>
              </div>
              <p className="text-[12px] leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
                Running RFQs across 2,200+ carriers and selecting the best fit — in real time, autonomously.
              </p>
            </div>

            <button onClick={() => openDemoModal()} className="flex w-full items-center justify-center gap-2 sm:inline-flex sm:w-auto group transition-all duration-300 hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))", color: "#fff", border: "none", padding: "13px 28px", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: ".04em", textTransform: "uppercase", boxShadow: "0 4px 20px hsl(var(--primary) / 0.4)" }}>
              See AI Procurement in Action <Arrow />
            </button>
            <p className="text-[11px] mt-2.5" style={{ color: "hsl(var(--muted-dim))" }}>
              Trusted by global manufacturers across 80,000+ routes
            </p>
          </motion.div>

          {/* RIGHT — Live Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="rounded-2xl p-4 sm:p-5" style={{ background: "hsl(var(--card))", border: "1.5px solid hsl(var(--border))" }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold tracking-wider uppercase" style={{ color: "hsl(var(--muted-foreground))" }}>AI Procurement Dashboard</span>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "hsl(var(--success))" }} />
                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "hsl(var(--success))" }} />
                  </span>
                  <span className="text-[10px] font-semibold" style={{ color: "hsl(var(--success))" }}>Live</span>
                </div>
              </div>

              {/* Route rows */}
              {routes.map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={visible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.15, duration: 0.4 }}
                  className="py-2.5 flex items-center justify-between"
                  style={{ borderBottom: i < routes.length - 1 ? "1px solid hsl(var(--border-subtle))" : "none" }}
                >
                  <div>
                    <div className="text-[13px] font-semibold" style={{ color: "hsl(var(--foreground))" }}>{row.route}</div>
                    <div className="text-[10px] mt-0.5" style={{ color: row.status === "Optimized" ? "hsl(var(--success))" : row.status === "Bidding" ? "hsl(var(--accent))" : "hsl(var(--muted-foreground))" }}>
                      {row.status === "Optimized" ? "✔" : row.status === "Bidding" ? "⟳" : "◉"} {row.status}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-[13px] font-bold" style={{ color: "hsl(var(--foreground))", filter: "blur(5px)", userSelect: "none" }}>{row.rate}</div>
                    <div className="text-[10px] font-semibold" style={{ color: "hsl(var(--success))" }}>↓ {row.savings}</div>
                  </div>
                </motion.div>
              ))}

              {/* Metrics */}
              <MetricsOverlay visible={visible} />

              {/* Live AI Log */}
              <LiveActivityLog visible={visible} />

              {/* Unlock CTA */}
              <button onClick={() => openDemoModal()} className="w-full mt-3 flex items-center justify-center gap-2 py-3 rounded-lg transition-all duration-300 hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))", border: "1px solid hsl(var(--primary) / 0.5)", cursor: "pointer", boxShadow: "0 4px 16px hsl(var(--primary) / 0.3)" }}>
                <span className="text-[12px] text-white font-bold tracking-wide">🔓 Unlock Best Rates — Get Access</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
/* ─── AI Load Matching Live Panel with typing effect ─── */
const loadMatchSteps = [
  { text: "Scanning 340+ available loads on Pune → Delhi", delay: 0 },
  { text: "12 loads matched to fleet capacity & route", delay: 1200 },
  { text: "4 high-value loads shortlisted by AI", delay: 2400 },
  { text: "Best load assigned: ₹48,000 — Pune → Delhi (18T)", delay: 3800 },
  { text: "✔ Deadhead reduced by 22% — fleet optimized", delay: 5000 },
  { text: "⚡ Matched in 1.8 seconds", delay: 5800 },
];

function TypingText({ text, onDone }: { text: string; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const idx = useRef(0);
  useEffect(() => {
    idx.current = 0;
    setDisplayed("");
    const id = setInterval(() => {
      idx.current++;
      setDisplayed(text.slice(0, idx.current));
      if (idx.current >= text.length) {
        clearInterval(id);
        onDone?.();
      }
    }, 18);
    return () => clearInterval(id);
  }, [text]);
  return <>{displayed}<span className="inline-block w-[2px] h-[11px] ml-0.5 align-middle animate-pulse" style={{ background: "#54AF3A" }} /></>;
}

function LoadMatchLog({ visible }: { visible: boolean }) {
  const [shownSteps, setShownSteps] = useState<number>(0);
  const [typingDone, setTypingDone] = useState<Set<number>>(new Set());
  const started = useRef(false);

  useEffect(() => {
    if (!visible || started.current) return;
    started.current = true;
    loadMatchSteps.forEach((step, i) => {
      setTimeout(() => setShownSteps(i + 1), step.delay);
    });
  }, [visible]);

  return (
    <div className="rounded-xl p-3 mt-3 space-y-1.5" style={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border-subtle))" }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#54AF3A" }} />
          <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#54AF3A" }} />
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#54AF3A" }}>AI Load Matching — Live</span>
      </div>
      {loadMatchSteps.slice(0, shownSteps).map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-start gap-2 text-[11px] leading-relaxed"
          style={{ color: i === shownSteps - 1 ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))" }}
        >
          <span className="mt-0.5 shrink-0" style={{ color: step.text.startsWith("✔") ? "#54AF3A" : step.text.startsWith("⚡") ? "#54AF3A" : "hsl(var(--accent))" }}>→</span>
          <span>
            {i === shownSteps - 1 && !typingDone.has(i)
              ? <TypingText text={step.text} onDone={() => setTypingDone(prev => new Set(prev).add(i))} />
              : step.text}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Fleet Matching Trucks ─── */
const truckData = [
  { route: "Pune → Delhi", status: "Best Match", value: "₹48,000", saving: "22%", best: true },
  { route: "Bangalore → Mumbai", status: "Matching...", value: "₹35,200", saving: "18%", best: false },
  { route: "Ahmedabad → Chennai", status: "Optimized", value: "₹62,400", saving: "25%", best: false },
  { route: "Delhi → Kolkata", status: "Assigned", value: "₹54,800", saving: "20%", best: false },
];

export function ForTransporters() {
  const openDemoModal = useDemoModal();
  const { ref, visible } = useInView();

  const steps = [
    {
      num: "01",
      title: "Get Discovered by Global Shippers",
      desc: "Your fleet is automatically matched to demand across 80,000+ routes",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#54AF3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>,
    },
    {
      num: "02",
      title: "Improve Your Reliability Score",
      desc: "AI tracks performance and boosts your ranking for premium loads",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#54AF3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>,
    },
    {
      num: "03",
      title: "Maximize Fleet Utilization",
      desc: "Reduce empty runs and increase earnings with smart load matching",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#54AF3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>,
    },
  ];

  const metrics = [
    { label: "Load Utilization", value: "22", suffix: "%↑", color: "#54AF3A" },
    { label: "Earnings Increase", value: "18", suffix: "%↑", color: "hsl(var(--accent))" },
    { label: "Empty Miles Cut", value: "25", suffix: "%↓", color: "hsl(var(--primary-glow))" },
  ];

  return (
    <section id="transporters" ref={ref as any} className="px-4 py-10 sm:px-6 lg:px-8" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-[1200px]">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* LEFT — Value Prop */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3" style={{ background: "rgba(84,175,58,0.1)", border: "1px solid rgba(84,175,58,0.3)", color: "#54AF3A" }}>
              For Carriers & Transporters
            </div>
            <h2 className="text-[1.4rem] sm:text-[1.5rem] lg:text-[1.7rem] font-black mb-2" style={{ color: "hsl(var(--foreground))", letterSpacing: "-0.03em", lineHeight: 1.15 }}>
              Get AI-Matched Loads<br />
              <span style={{ color: "#54AF3A" }}>For Your Fleet — Instantly</span>
            </h2>
            <p className="text-sm mb-4" style={{ color: "hsl(var(--muted-foreground))", lineHeight: 1.7 }}>
              Let AI continuously fill your trucks with the most profitable loads — matched by route, capacity, and reliability score.
            </p>
              Let AI fill your trucks with high-value loads matched by route, capacity, and reliability — reducing empty miles and maximizing earnings.
            </p>

            {/* Steps */}
            <div className="flex flex-col gap-2.5 mb-4">
              {steps.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={visible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.4 }}
                  className="flex items-start gap-3 px-3 py-2.5 rounded-xl group cursor-default transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: "hsl(var(--card))", border: "1.5px solid hsl(var(--border-subtle))" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(84,175,58,0.4)";
                    e.currentTarget.style.boxShadow = "0 6px 24px rgba(84,175,58,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "hsl(var(--border-subtle))";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(84,175,58,0.1)", border: "1px solid rgba(84,175,58,0.2)" }}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-extrabold tracking-wider" style={{ color: "#54AF3A" }}>{item.num}</span>
                      <span className="text-[13px] font-bold" style={{ color: "hsl(var(--foreground))" }}>{item.title}</span>
                    </div>
                    <p className="text-[11.5px] leading-relaxed m-0" style={{ color: "hsl(var(--muted-foreground))" }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* AI Action Line */}
            <div className="rounded-xl px-4 py-3 mb-5" style={{ background: "rgba(84,175,58,0.08)", border: "1px solid rgba(84,175,58,0.25)" }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm">🤖</span>
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#54AF3A" }}>AI in Action</span>
              </div>
              <p className="text-[12px] leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
                Matching your fleet with high-value loads based on routes, capacity, and reliability score — in real time.
              </p>
            </div>

            <button onClick={() => openDemoModal()} className="flex w-full items-center justify-center gap-2 sm:inline-flex sm:w-auto group transition-all duration-300 hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg, #54AF3A, #3D8A28)", color: "#fff", border: "none", padding: "13px 28px", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: ".04em", textTransform: "uppercase", boxShadow: "0 4px 20px rgba(84,175,58,0.35)" }}>
              Start Getting AI-Matched Loads <Arrow />
            </button>
            <p className="text-[11px] mt-2.5" style={{ color: "hsl(var(--muted-dim))" }}>
              Join 2,200+ carriers across 80,000+ active routes
            </p>
          </motion.div>

          {/* RIGHT — Live AI Load Matching Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="rounded-2xl p-4 sm:p-5" style={{ background: "hsl(var(--card))", border: "1.5px solid hsl(var(--border))" }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold tracking-wider uppercase" style={{ color: "hsl(var(--muted-foreground))" }}>AI Fleet Matching</span>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#54AF3A" }} />
                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#54AF3A" }} />
                  </span>
                  <span className="text-[10px] font-semibold" style={{ color: "#54AF3A" }}>Live</span>
                </div>
              </div>

              {/* Truck rows */}
              {truckData.map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={visible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.15, duration: 0.4 }}
                  className="py-2.5 flex items-center justify-between"
                  style={{ borderBottom: i < truckData.length - 1 ? "1px solid hsl(var(--border-subtle))" : "none" }}
                >
                  <div>
                    <div className="text-[13px] font-semibold" style={{ color: "hsl(var(--foreground))" }}>{row.route}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] font-semibold" style={{ color: row.status === "Assigned" ? "#54AF3A" : row.status === "Optimized" ? "hsl(var(--accent))" : "hsl(var(--muted-foreground))" }}>
                      {row.status === "Assigned" ? "✔" : row.status === "Optimized" ? "✔" : "⟳"} {row.status}
                    </div>
                    <div className="flex items-center gap-2 justify-end mt-0.5">
                      <span className="font-mono text-[12px] font-bold" style={{ color: "hsl(var(--foreground))", filter: "blur(5px)", userSelect: "none" }}>{row.value}</span>
                      <span className="text-[10px] font-semibold" style={{ color: "#54AF3A" }}>↓{row.saving} empty</span>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 mt-3">
                {metrics.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={visible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.8 + i * 0.15, duration: 0.4 }}
                    className="rounded-lg p-2.5 text-center"
                    style={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border-subtle))" }}
                  >
                    <div className="text-sm font-bold font-mono" style={{ color: m.color }}>
                      <CountUp target={parseInt(m.value)} suffix={m.suffix} visible={visible} />
                    </div>
                    <div className="text-[10px]" style={{ color: "hsl(var(--muted-foreground))" }}>{m.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Live AI Log */}
              <LoadMatchLog visible={visible} />

              {/* CTA */}
              <button onClick={() => openDemoModal()} className="w-full mt-3 flex items-center justify-center gap-2 py-3 rounded-lg transition-all duration-300 hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg, #54AF3A, #3D8A28)", border: "1px solid rgba(84,175,58,0.5)", cursor: "pointer", boxShadow: "0 4px 16px rgba(84,175,58,0.3)" }}>
                <span className="text-[12px] text-white font-bold tracking-wide">🚛 Join & Fill Your Fleet Faster</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
