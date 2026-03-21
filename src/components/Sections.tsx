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
export function ForTransporters() {
  const { ref, visible } = useInView();

  return (
    <section id="transporters" ref={ref as any} className="px-4 py-4 sm:px-6 lg:px-8" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-[1200px]">
        <div className="grid items-center gap-8 xl:grid-cols-2">
          <div className="hidden xl:block" style={{ animation: visible ? "fadeUp .7s ease both" : "none", opacity: visible ? undefined : 0 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                {
                  num: "01",
                  title: "Get Discovered",
                  desc: "Connect with new customers, including Fortune 500 companies and global leaders. Receive business inquiries from companies in your lanes, matching your preferred truck types.",
                  icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#54AF3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>,
                },
                {
                  num: "02",
                  title: "Track Your Performance",
                  desc: "Get feedback from customers and grow your reputation on LoRRI – The Trusted Platform for Transporters. Use your ratings to attract more business and build a strong industry presence.",
                  icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#54AF3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>,
                },
                {
                  num: "03",
                  title: "Take Control of Your Brand Presence",
                  desc: "Create a standout LoRRI profile with details about your branches, fleet, and lanes. Help customers make informed decisions, leading to more business opportunities for you.",
                  icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#54AF3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--card)",
                    border: "1.5px solid var(--border)",
                    borderRadius: 16,
                    padding: "14px 18px",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(84,175,58,0.5)";
                    e.currentTarget.style.boxShadow = "0 8px 30px rgba(84,175,58,0.12)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 3, background: "linear-gradient(90deg, #54AF3A, #3D8A28)", borderRadius: "16px 16px 0 0" }} />
                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(84,175,58,0.1)", border: "1px solid rgba(84,175,58,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <span style={{ fontSize: 11, fontWeight: 800, color: "#54AF3A", fontFamily: "Outfit,sans-serif", letterSpacing: ".06em" }}>{item.num}</span>
                        <span style={{ fontSize: 15, fontWeight: 800, color: "var(--text)", fontFamily: "Outfit,sans-serif" }}>{item.title}</span>
                      </div>
                      <p style={{ fontSize: 12.5, color: "var(--text2)", lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ animation: visible ? "fadeUp .7s .2s ease both" : "none", opacity: visible ? undefined : 0 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 20, fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", background: "var(--greenLt)", border: "1px solid rgba(84,175,58,0.3)", color: "#54AF3A", marginBottom: 10 }}>
              For Carriers & Transporters
            </div>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 10 }} className="text-[1.4rem] sm:text-[1.5rem] lg:text-[1.6rem]">
              Grow Your Fleet<br />
              <span style={{ color: "#54AF3A" }}>With Better Loads</span>
            </h2>
            <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.7, marginBottom: 14 }}>
              LoRRI helps carriers find better loads, build a verified reputation, and access freight intelligence that keeps your trucks moving profitably.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
              {["Build a verified carrier profile trusted by top shippers", "AI load matching for your routes, truck types and capacity", "LoRRI Reliability Score unlocks premium loads", "Market rate visibility for every lane before you bid"].map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 10, padding: "8px 12px", background: "var(--card)", border: "1px solid var(--borderSm)", borderRadius: 9 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#54AF3A", flexShrink: 0, marginTop: 7 }} />
                  <span style={{ fontSize: 13.5, color: "var(--text2)", lineHeight: 1.6 }}>{f}</span>
                </div>
              ))}
            </div>
            <button onClick={() => scrollTo("cta")} className="flex w-full items-center justify-center gap-2 sm:inline-flex sm:w-auto" style={{ background: "linear-gradient(135deg,#54AF3A,#3D8A28)", color: "#fff", border: "none", padding: "13px 24px", borderRadius: 8, fontFamily: "Outfit,sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: ".05em", textTransform: "uppercase", boxShadow: "0 4px 20px rgba(84,175,58,0.3)" }}>
              Join as a Transporter <Arrow />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
