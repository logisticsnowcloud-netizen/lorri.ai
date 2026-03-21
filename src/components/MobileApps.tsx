import { motion } from "framer-motion";
import { Smartphone, Zap, TrendingDown, TrendingUp, Activity } from "lucide-react";
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
    screenContent: [
      { label: "Matched Loads", value: "38", change: "+15%" },
      { label: "On-Time Rate", value: "94.2%", change: "+6%" },
      { label: "Fleet Score", value: "A+", change: "Top 5%" },
    ],
  },
];

function CompactPhone({ app }: { app: typeof apps[0] }) {
  return (
    <div className="rounded-[20px] border border-border-subtle bg-card p-1.5 shadow-lg" style={{ boxShadow: `0 12px 40px -10px ${app.accent}25` }}>
      <div className="flex items-center justify-between rounded-t-[14px] bg-bg-deep px-2.5 py-1">
        <span className="text-[7px] font-medium text-muted-foreground">9:41</span>
        <div className="flex gap-1">
          <Activity size={7} className="text-muted-foreground" />
          <div className="h-[7px] w-[12px] rounded-sm border border-muted-foreground" style={{ borderWidth: 1 }}>
            <div className="h-full w-[70%] rounded-sm bg-success" />
          </div>
        </div>
      </div>
      <div className="space-y-1.5 bg-bg-deep px-2.5 py-2">
        <div className="flex items-center gap-1.5">
          <img src={app.icon} alt="" className="h-4 w-4 rounded" />
          <span className="text-[8px] font-bold text-foreground">{app.name}</span>
        </div>
        {app.screenContent.map((item, i) => (
          <div key={i} className="flex items-center justify-between rounded-md border border-border-subtle bg-card px-2 py-1.5">
            <div>
              <div className="text-[6px] text-muted-foreground">{item.label}</div>
              <div className="text-[10px] font-bold text-foreground">{item.value}</div>
            </div>
            <span
              className="rounded-full px-1 py-0.5 text-[6px] font-bold"
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
      <div className="flex justify-center rounded-b-[14px] bg-bg-deep pb-1.5 pt-0.5">
        <div className="h-0.5 w-8 rounded-full bg-muted-foreground/30" />
      </div>
    </div>
  );
}

export default function MobileApps() {
  return (
    <section className="relative overflow-hidden px-4 py-8 sm:px-6 lg:px-8" style={{ background: "hsl(var(--background))" }}>
      <div className="relative z-10 mx-auto max-w-[1200px]">
        {/* Header - compact */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-5 text-center"
        >
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-card px-3 py-1">
            <Smartphone size={12} className="text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">AI-Powered Mobile</span>
          </div>
          <h2 className="mb-1.5 font-['Outfit'] text-[clamp(20px,3vw,30px)] font-extrabold text-foreground">
            Your AI Logistics Control Tower — <span className="text-success">In Your Pocket</span>
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              { value: "2,200+", label: "Carriers Daily" },
              { value: "80K+", label: "Routes Optimized" },
              { value: "4.6★", label: "App Rating" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-1.5">
                <span className="text-sm font-extrabold text-foreground">{stat.value}</span>
                <span className="text-[10px] text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* App Cards - side by side */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {apps.map((app, i) => {
            const isLorriBiz = app.name === "LoRRI Biz";
            return (
              <motion.div
                key={app.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-xl border border-border-subtle bg-card p-4 transition-all duration-300 hover:-translate-y-0.5"
                style={{ boxShadow: `0 6px 30px -10px ${app.accent}15` }}
              >
                {/* Glow */}
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20 transition-opacity group-hover:opacity-40"
                  style={{ background: `radial-gradient(circle, ${app.accent}40, transparent 70%)` }}
                />

                <div className="flex gap-4">
                  {/* Phone mockup - compact */}
                  <div className="hidden flex-shrink-0 sm:block" style={{ width: isLorriBiz ? 160 : 140 }}>
                    {isLorriBiz ? (
                      <img
                        src={lorriBizScreens}
                        alt="LoRRI Biz app screenshots"
                        className="w-full rounded-lg"
                      />
                    ) : (
                      <CompactPhone app={app} />
                    )}
                  </div>

                  {/* Content - dense */}
                  <div className="min-w-0 flex-1">
                    {/* Header */}
                    <div className="mb-1.5 flex items-center gap-2">
                      <img src={app.icon} alt={`${app.name} icon`} className="h-8 w-8 rounded-lg shadow" />
                      <div>
                        <h3 className="font-['Outfit'] text-base font-bold leading-tight text-foreground">{app.name}</h3>
                        <span
                          className="text-[9px] font-bold uppercase tracking-wide"
                          style={{ color: app.accent }}
                        >
                          {app.tagline}
                        </span>
                      </div>
                    </div>

                    <p className="mb-2 text-[11px] leading-snug text-muted-foreground">{app.description}</p>

                    {/* AI in action - inline */}
                    <div className="mb-2 flex items-start gap-1.5 rounded-md border border-border-subtle bg-bg-deep px-2 py-1.5">
                      <Zap size={10} className="mt-0.5 flex-shrink-0 text-accent" />
                      <div>
                        <span className="text-[8px] font-bold uppercase tracking-wider text-accent">AI in Action</span>
                        <p className="text-[10px] leading-snug text-muted-foreground">{app.aiAction}</p>
                      </div>
                    </div>

                    {/* Metrics + Live indicators in one row */}
                    <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                      {app.metrics.map((m) => (
                        <div key={m.label} className="flex items-center gap-1">
                          <m.icon size={10} className="text-success" />
                          <span className="text-[10px] font-bold text-foreground">{m.value}</span>
                          <span className="text-[9px] text-muted-foreground">{m.label}</span>
                        </div>
                      ))}
                      {app.liveIndicators.map((indicator) => (
                        <span key={indicator} className="inline-flex items-center gap-1 text-[9px] text-muted-foreground">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                          </span>
                          {indicator}
                        </span>
                      ))}
                    </div>

                    {/* Feature tags */}
                    <div className="mb-2.5 flex flex-wrap gap-1">
                      {app.features.map((f) => (
                        <span key={f} className="rounded-full border border-border-subtle bg-card-alt px-2 py-0.5 text-[9px] font-semibold text-muted-foreground">
                          {f}
                        </span>
                      ))}
                    </div>

                    {/* Store badges - compact */}
                    <div className="flex flex-wrap items-center gap-2">
                      <a href={app.playLink} target="_blank" rel="noopener noreferrer" className="transition-transform duration-200 hover:scale-105">
                        <img src={googlePlayBadge} alt="Get it on Google Play" className="h-8 w-auto" />
                      </a>
                      <a href={app.iosLink} target="_blank" rel="noopener noreferrer" className="transition-transform duration-200 hover:scale-105">
                        <img src={appStoreBadge} alt="Download on the App Store" className="h-7 w-auto rounded" />
                      </a>
                      <div className="hidden items-center gap-1.5 xl:flex" style={{ marginLeft: 2 }}>
                        <div className="h-6 w-px bg-border-subtle" />
                        {[
                          { link: app.playLink, label: "Android" },
                          { link: app.iosLink, label: "iOS" },
                        ].map((qr) => (
                          <div key={qr.label} className="flex flex-col items-center gap-0">
                            <img
                              src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(qr.link)}&color=333333&bgcolor=ffffff`}
                              alt={`${app.name} ${qr.label} QR`}
                              className="h-7 w-7 rounded border border-border-subtle bg-white p-0.5 transition-transform duration-200 hover:scale-110"
                            />
                            <span className="text-[6px] font-semibold text-muted-foreground">{qr.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}