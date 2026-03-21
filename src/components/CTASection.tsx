import { useState, useEffect, useRef } from "react";
import { Arrow, Check } from "./Icons";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Clock, Phone, Zap, BarChart3, Route, Brain, ArrowRight, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const API_URL = "https://production.lorri.in/api/apilorri/log";

const TEAM_EMAILS = [
  "connect@logisticsnow.in",
  "raj@logisticsnow.in",
  "associate@logisticsnow.in",
  "sale@thelogisticsnow.com",
];

const CC_EMAILS = [
  "associate@logisticsnow.in",
  "raj@logisticsnow.in",
  "sales@thelogisticsnow.com",
  "smeet@thelogisticsnow.com",
  "partner@logisticsnow.in",
  "shaleen@lorri.in",
];

const RESTRICTED_DOMAINS = [
  "gmail.com", "yahoo.com", "yahoo.co.in", "hotmail.com", "outlook.com",
  "rediffmail.com", "live.com", "msn.com", "aol.com", "icloud.com",
];

/* ─── Animated counter ─── */
function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      let start = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const id = setInterval(() => {
        start += step;
        if (start >= target) { setVal(target); clearInterval(id); }
        else setVal(start);
      }, 30);
      obs.disconnect();
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* ─── Pulsing dot ─── */
const PulseDot = () => (
  <span className="relative flex h-2 w-2">
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--success))] opacity-75" />
    <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(var(--success))]" />
  </span>
);

/* ─── Demo preview items ─── */
const demoPreviewItems = [
  { icon: BarChart3, label: "AI Procurement Simulation", desc: "Watch AI optimize your freight bidding" },
  { icon: Route, label: "Lane Benchmarking Engine", desc: "See your lanes scored against national data" },
  { icon: Brain, label: "Cost Optimization Insights", desc: "Discover savings you didn't know existed" },
  { icon: Zap, label: "Fleet Matching Intelligence", desc: "AI matches you with ideal carriers instantly" },
];

const demoIncludes = [
  "See your lanes benchmarked against 2,300+ carriers",
  "Discover cost-saving opportunities with AI",
  "Experience AI procurement live",
  "Get a custom logistics roadmap",
];

const trustLogos = ["Apollo Tyres", "Saint-Gobain", "Perfetti Van Melle", "Jyothy Labs", "Hector Beverages"];

export default function CTASection() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", type: "shipper" });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <section id="cta" className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8" style={{ background: "hsl(var(--bg2))" }}>
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 bg-[radial-gradient(ellipse,hsl(var(--primary)/0.12)_0%,transparent_65%)]" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[400px] bg-[radial-gradient(ellipse,hsl(var(--accent)/0.06)_0%,transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-[1140px]">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--success)/0.3)] bg-[hsl(var(--success)/0.08)] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[hsl(var(--success))]">
            <PulseDot /> AI-Powered Demo
          </div>
          <h2 className="text-2xl font-black leading-tight tracking-tight text-[hsl(var(--foreground))] sm:text-3xl lg:text-4xl">
            See How AI Can <span className="bg-gradient-to-r from-[hsl(var(--primary-glow))] to-[hsl(var(--accent))] bg-clip-text text-transparent">Reduce Your Logistics Cost</span> — Live
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-[hsl(var(--muted-foreground))] sm:text-base">
            Join global manufacturers and carriers using LoRRI's AI-powered logistics intelligence platform.
          </p>
        </motion.div>

        <div className="grid gap-8 xl:grid-cols-2 xl:items-start">
          {/* ─── LEFT ─── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* What you'll see in the demo */}
            <div className="mb-6 rounded-2xl border border-[hsl(var(--border-subtle))] bg-[hsl(var(--card))] p-5">
              <div className="mb-4 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[hsl(var(--accent))]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[hsl(var(--accent))]">What You'll See in the Demo</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {demoPreviewItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className="group flex gap-3 rounded-xl border border-[hsl(var(--border-subtle))] bg-[hsl(var(--background)/0.5)] p-3 transition-all hover:border-[hsl(var(--primary)/0.4)] hover:bg-[hsl(var(--primary)/0.05)]"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--primary)/0.15)]">
                      <item.icon className="h-4 w-4 text-[hsl(var(--primary-glow))]" />
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold text-[hsl(var(--foreground))]">{item.label}</div>
                      <div className="text-[11px] text-[hsl(var(--muted-foreground))]">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Benefits checklist */}
            <div className="mb-6 space-y-2.5">
              {demoIncludes.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.06 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[hsl(var(--success)/0.3)] bg-[hsl(var(--success)/0.1)]">
                    <Check color="hsl(var(--success))" size={10} />
                  </div>
                  <span className="text-[13px] text-[hsl(var(--muted-foreground))]">{f}</span>
                </motion.div>
              ))}
            </div>

            {/* Urgency + trust */}
            <div className="mb-5 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-[12px] text-[hsl(var(--muted-foreground))]">
                <Clock className="h-3.5 w-3.5 text-[hsl(var(--accent))]" />
                Takes 30 seconds to request
              </div>
              <div className="flex items-center gap-2 text-[12px] text-[hsl(var(--muted-foreground))]">
                <Phone className="h-3.5 w-3.5 text-[hsl(var(--accent))]" />
                We respond within 24 hours
              </div>
            </div>

            {/* Contact card */}
            <div className="rounded-xl border border-[hsl(var(--border-subtle))] bg-[hsl(var(--card))] p-4">
              <div className="mb-2 text-[10px] uppercase tracking-widest text-[hsl(var(--muted-dim))]">Reach Us Directly</div>
              <div className="mb-1 text-sm text-[hsl(var(--accent))]" style={{ overflowWrap: "anywhere" }}>lorri@logisticsnow.in</div>
              <div className="mb-1 text-sm text-[hsl(var(--muted-foreground))]">+91-9867773508</div>
              <div className="text-xs leading-relaxed text-[hsl(var(--muted-dim))]">409, Neptune's Flying Colors, Mulund West, Mumbai 400080</div>
            </div>
          </motion.div>

          {/* ─── RIGHT: FORM ─── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-2xl border-2 border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--card))] p-5 shadow-[0_8px_40px_hsl(var(--primary)/0.1)] sm:p-7"
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 10 }}
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[hsl(var(--success)/0.15)]"
                  >
                    <Check color="hsl(var(--success))" size={28} />
                  </motion.div>
                  <h3 className="mb-2 text-xl font-extrabold text-[hsl(var(--foreground))]">You're In! 🎉</h3>
                  <p className="mb-4 text-sm text-[hsl(var(--muted-foreground))]">Our AI team will reach out within 24 hours with your personalized demo.</p>
                  <div className="mx-auto max-w-xs rounded-lg border border-[hsl(var(--border-subtle))] bg-[hsl(var(--background)/0.5)] p-3">
                    <div className="flex items-center justify-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                      <Shield className="h-3.5 w-3.5 text-[hsl(var(--success))]" />
                      Your data is secured with enterprise-grade encryption
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="form" exit={{ opacity: 0 }}>
                  {/* AI badge */}
                  <div className="mb-4 flex items-center gap-2">
                    <Brain className="h-4 w-4 text-[hsl(var(--primary-glow))]" />
                    <span className="text-xs font-bold uppercase tracking-widest text-[hsl(var(--primary-glow))]">AI-Powered Demo</span>
                  </div>

                  <h3 className="mb-1 text-lg font-extrabold text-[hsl(var(--foreground))] sm:text-xl">
                    See AI in Action for Your Logistics
                  </h3>
                  <p className="mb-5 text-[13px] text-[hsl(var(--muted-foreground))]">
                    We'll show you exactly how AI will optimize your freight — with your data.
                  </p>

                  {/* Shipper / Carrier toggle */}
                  <div className="mb-5 grid grid-cols-2 gap-3">
                    {[
                      { v: "shipper", l: "🏭 Shipper", c: "var(--primary)" },
                      { v: "carrier", l: "🚛 Carrier", c: "var(--success)" },
                    ].map((b) => (
                      <button
                        key={b.v}
                        onClick={() => set("type", b.v)}
                        className="rounded-xl border-2 px-4 py-2.5 font-semibold transition-all duration-200"
                        style={{
                          borderColor: form.type === b.v ? `hsl(${b.c})` : "hsl(var(--border-subtle))",
                          background: form.type === b.v ? `hsl(${b.c} / 0.1)` : "transparent",
                          color: form.type === b.v ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                          fontSize: 13,
                        }}
                      >
                        {b.l}
                      </button>
                    ))}
                  </div>

                  {/* Form fields */}
                  {[
                    { k: "name", p: "Your full name", l: "Full Name" },
                    { k: "company", p: "Your company", l: "Company" },
                    { k: "email", p: "you@company.com", l: "Work Email" },
                    { k: "phone", p: "+91 XXXXX XXXXX", l: "Phone" },
                  ].map((f) => (
                    <div key={f.k} className="mb-3">
                      <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">{f.l}</label>
                      <input
                        value={form[f.k as keyof typeof form]}
                        onChange={(e) => set(f.k, e.target.value)}
                        onFocus={() => setFocusedField(f.k)}
                        onBlur={() => setFocusedField(null)}
                        placeholder={f.p}
                        className="w-full rounded-lg border bg-[hsl(var(--input))] px-3.5 py-2.5 text-sm text-[hsl(var(--foreground))] outline-none transition-all duration-200 placeholder:text-[hsl(var(--muted-dim))]"
                        style={{
                          borderColor: focusedField === f.k ? "hsl(var(--primary-glow))" : "hsl(var(--border-subtle))",
                          boxShadow: focusedField === f.k ? "0 0 0 3px hsl(var(--primary) / 0.15)" : "none",
                        }}
                      />
                    </div>
                  ))}

                  {/* CTA button */}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { if (form.name && form.email) setSent(true); }}
                    className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary-glow))] px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-[0_4px_24px_hsl(var(--primary)/0.4)] transition-shadow hover:shadow-[0_6px_32px_hsl(var(--primary)/0.5)]"
                  >
                    <Sparkles className="h-4 w-4" />
                    Show Me My Savings
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </motion.button>

                  <p className="mt-3 text-center text-[11px] text-[hsl(var(--muted-dim))]">
                    {/* ⏱ Takes 30 seconds  */}
                    {/* · No credit card required */}
                  </p>

                  {/* Inline social proof */}
                  <div className="mt-5 border-t border-[hsl(var(--border-subtle))] pt-4">
                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-[hsl(var(--muted-dim))]">
                      <span className="font-semibold text-[hsl(var(--muted-foreground))]">Trusted by:</span>
                      {trustLogos.map((name) => (
                        <span key={name}>{name}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Bottom stats bar */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {[
            { n: 2200, s: "+", l: "Verified Carriers" },
            { n: 18, s: "%", l: "Avg Cost Reduction" },
            { n: 500, s: "+", l: "Enterprise Clients" },
            { n: 98, s: "%", l: "Client Satisfaction" },
          ].map((stat, i) => (
            <div key={i} className="rounded-xl border border-[hsl(var(--border-subtle))] bg-[hsl(var(--card)/0.6)] px-4 py-3 text-center backdrop-blur-sm">
              <div className="text-xl font-black text-[hsl(var(--foreground))] sm:text-2xl">
                <AnimatedNumber target={stat.n} suffix={stat.s} />
              </div>
              <div className="text-[11px] text-[hsl(var(--muted-foreground))]">{stat.l}</div>
            </div>
          ))}
        </motion.div> */}
      </div>
    </section>
  );
}
