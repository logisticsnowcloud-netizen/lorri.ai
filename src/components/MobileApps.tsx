import { motion } from "framer-motion";
import { Smartphone, Zap, BarChart3, Truck, Route, TrendingDown, TrendingUp, Activity } from "lucide-react";
import appStoreBadge from "@/assets/app-store-badge.svg";
import googlePlayBadge from "@/assets/google-play-badge.png";
import lorriBizIcon from "@/assets/lorri-biz-icon.png";
import mylorriIcon from "@/assets/mylorri-icon.png";
import lorriBizScreens from "@/assets/lorri-biz-screens.png";

const apps = [
  {
    name: "LoRRI Biz",
    tagline: "For Manufacturers",
    description: "Your AI command center for freight — benchmark lanes, predict costs, and get optimization insights in real time.",
    aiAction: "Track costs, benchmark lanes, and get AI optimization insights in real time",
    icon: lorriBizIcon,
    playLink: "https://play.google.com/store/apps/details?id=com.thelogisticsnow.lorri_biz&hl=en_IN",
    iosLink: "https://apps.apple.com/in/app/lorri-biz/id6480331865",
    features: ["Real-Time Cost Insights", "AI-Powered Reports", "Lane Benchmarking"],
    metrics: [
      { icon: TrendingDown, label: "Cost Visibility", value: "↓ 18%" },
      { icon: TrendingUp, label: "Faster Decisions", value: "↑ 25%" },
    ],
    liveIndicators: ["AI Recommendations Running", "Cost Analytics Live"],
    accent: "hsl(var(--primary))",
    accentRaw: "var(--primary)",
    screenContent: [
      { label: "Avg Freight Cost", value: "₹42.3/km", change: "-12%" },
      { label: "Active Routes", value: "1,247", change: "+8%" },
      { label: "AI Savings", value: "₹2.1Cr", change: "+22%" },
    ],
  },
  {
    name: "MyLoRRI",
    tagline: "For Transporters",
    description: "AI-powered load matching, real-time tracking, and fleet optimization — all from your pocket.",
    aiAction: "Get instant AI load matches, track shipments, and optimize fleet earnings on the go",
    icon: mylorriIcon,
    playLink: "https://play.google.com/store/apps/details?id=com.thelogisticsnow.lorri&hl=en_IN",
    iosLink: "https://apps.apple.com/us/app/mylorri/id6480161330",
    features: ["Smart Load Matching", "Live Fleet Tracking", "AI Route Optimization"],
    metrics: [
      { icon: TrendingUp, label: "Fleet Utilization", value: "↑ 22%" },
      { icon: TrendingDown, label: "Empty Miles", value: "↓ 31%" },
    ],
    liveIndicators: ["Live Tracking Active", "Smart Matching On"],
    accent: "hsl(var(--success))",
    accentRaw: "var(--success)",
    screenContent: [
      { label: "Matched Loads", value: "38", change: "+15%" },
      { label: "On-Time Rate", value: "94.2%", change: "+6%" },
      { label: "Fleet Score", value: "A+", change: "Top 5%" },
    ],
  },
];

function PhoneMockup({ app, index }: { app: typeof apps[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
      className="relative mx-auto w-[180px] sm:w-[200px]"
    >
      {/* Phone frame */}
      <div className="rounded-[24px] border border-border-subtle bg-card p-2 shadow-xl" style={{ boxShadow: `0 20px 60px -15px ${app.accent}30` }}>
        {/* Status bar */}
        <div className="flex items-center justify-between rounded-t-[18px] bg-bg-deep px-3 py-1.5">
          <span className="text-[8px] font-medium text-muted-foreground">9:41</span>
          <div className="flex gap-1">
            <Activity size={8} className="text-muted-foreground" />
            <div className="h-[8px] w-[14px] rounded-sm border border-muted-foreground" style={{ borderWidth: 1 }}>
              <div className="h-full w-[70%] rounded-sm bg-success" />
            </div>
          </div>
        </div>

        {/* Screen content */}
        <div className="space-y-2 bg-bg-deep px-3 py-3">
          {/* App header */}
          <div className="flex items-center gap-2">
            <img src={app.icon} alt="" className="h-5 w-5 rounded-md" />
            <span className="text-[9px] font-bold text-foreground">{app.name}</span>
          </div>

          {/* Mini dashboard cards */}
          {app.screenContent.map((item, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-border-subtle bg-card px-2.5 py-2">
              <div>
                <div className="text-[7px] text-muted-foreground">{item.label}</div>
                <div className="text-[11px] font-bold text-foreground">{item.value}</div>
              </div>
              <span
                className="rounded-full px-1.5 py-0.5 text-[7px] font-bold"
                style={{
                  background: item.change.startsWith("+") || item.change.startsWith("Top") ? "hsl(var(--success) / 0.15)" : "hsl(var(--accent) / 0.15)",
                  color: item.change.startsWith("+") || item.change.startsWith("Top") ? "hsl(var(--success))" : "hsl(var(--accent))",
                }}
              >
                {item.change}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex justify-center rounded-b-[18px] bg-bg-deep pb-2 pt-1">
          <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
        </div>
      </div>
    </motion.div>
  );
}

export default function MobileApps() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8" style={{ background: "hsl(var(--background))" }}>
      <div className="relative z-10 mx-auto max-w-[1100px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-card px-4 py-1.5">
            <Smartphone size={14} className="text-primary" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
              AI-Powered Mobile
            </span>
          </div>
          <h2 className="mb-3 font-['Outfit'] text-[clamp(24px,3.5vw,36px)] font-extrabold text-foreground">
            Your AI Logistics Control Tower —{" "}
            <span className="text-success">In Your Pocket</span>
          </h2>
          <p className="mx-auto max-w-[520px] text-sm leading-relaxed text-muted-foreground">
            Access your entire AI logistics intelligence system from your phone. Real-time decisions, anywhere.
          </p>
        </motion.div>

        {/* Trust signal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-8 flex flex-wrap items-center justify-center gap-6 text-center"
        >
          {[
            { value: "2,200+", label: "Carriers Daily" },
            { value: "80K+", label: "Routes Optimized" },
            { value: "4.6★", label: "App Rating" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-2">
              <span className="text-lg font-extrabold text-foreground">{stat.value}</span>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* App Cards */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {apps.map((app, i) => (
            <motion.div
              key={app.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group relative overflow-hidden rounded-2xl border border-border-subtle bg-card p-5 transition-all duration-300 hover:-translate-y-1 sm:p-6"
              style={{ boxShadow: `0 8px 40px -12px ${app.accent}15` }}
            >
              {/* Glow */}
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-30 transition-opacity duration-300 group-hover:opacity-50"
                style={{ background: `radial-gradient(circle, ${app.accent}40, transparent 70%)` }}
              />

              <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
                {/* Phone mockup */}
                <div className="flex-shrink-0">
                  <PhoneMockup app={app} index={i} />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  {/* Name & tag */}
                  <div className="mb-2 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
                    <div className="flex items-center gap-2.5">
                      <img src={app.icon} alt={`${app.name} icon`} className="h-10 w-10 rounded-xl shadow-lg" />
                      <h3 className="font-['Outfit'] text-xl font-bold text-foreground">{app.name}</h3>
                    </div>
                    <span
                      className="rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                      style={{ background: `${app.accent}15`, color: app.accent, border: `1px solid ${app.accent}30` }}
                    >
                      {app.tagline}
                    </span>
                  </div>

                  <p className="mb-3 text-[13px] leading-relaxed text-muted-foreground">{app.description}</p>

                  {/* AI in action */}
                  <div className="mb-3 flex items-start gap-2 rounded-lg border border-border-subtle bg-bg-deep px-3 py-2">
                    <Zap size={13} className="mt-0.5 flex-shrink-0 text-accent" />
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-accent">AI in Action</span>
                      <p className="text-[11px] leading-snug text-muted-foreground">{app.aiAction}</p>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="mb-3 flex flex-wrap gap-3">
                    {app.metrics.map((m) => (
                      <div key={m.label} className="flex items-center gap-1.5">
                        <m.icon size={12} className="text-success" />
                        <span className="text-xs font-bold text-foreground">{m.value}</span>
                        <span className="text-[10px] text-muted-foreground">{m.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Live indicators */}
                  <div className="mb-3 flex flex-wrap gap-2">
                    {app.liveIndicators.map((indicator) => (
                      <span key={indicator} className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                        </span>
                        {indicator}
                      </span>
                    ))}
                  </div>

                  {/* Feature tags */}
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {app.features.map((f) => (
                      <span key={f} className="rounded-full border border-border-subtle bg-card-alt px-2.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* Store badges */}
                  <div className="flex flex-wrap items-center gap-3">
                    <a href={app.playLink} target="_blank" rel="noopener noreferrer" className="transition-transform duration-200 hover:scale-105">
                      <img src={googlePlayBadge} alt="Get it on Google Play" className="h-10 w-auto" />
                    </a>
                    <a href={app.iosLink} target="_blank" rel="noopener noreferrer" className="transition-transform duration-200 hover:scale-105">
                      <img src={appStoreBadge} alt="Download on the App Store" className="h-8 w-auto rounded-md" />
                    </a>
                    {/* QR codes - desktop only */}
                    <div className="hidden items-center gap-2 md:flex" style={{ marginLeft: 4 }}>
                      <div className="h-7 w-px bg-border-subtle" />
                      {[
                        { link: app.playLink, label: "Android" },
                        { link: app.iosLink, label: "iOS" },
                      ].map((qr) => (
                        <div key={qr.label} className="flex flex-col items-center gap-0.5">
                          <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(qr.link)}&color=333333&bgcolor=ffffff`}
                            alt={`${app.name} ${qr.label} QR`}
                            className="h-9 w-9 rounded border border-border-subtle bg-white p-0.5 transition-transform duration-200 hover:scale-110"
                          />
                          <span className="text-[7px] font-semibold text-muted-foreground">{qr.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="mb-4 text-sm text-muted-foreground">
            Used by <span className="font-bold text-foreground">2,200+ carriers</span> and{" "}
            <span className="font-bold text-foreground">global manufacturers</span> daily
          </p>
        </motion.div>
      </div>
    </section>
  );
}
