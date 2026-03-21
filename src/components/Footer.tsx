import { useState, useEffect, useRef } from "react";
import { ArrowRight, Sparkles, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { useDemoModal } from "@/hooks/use-demo-modal";

/* ── Animated counter ── */
function AnimatedNum({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          let start = 0;
          const step = Math.max(1, Math.floor(value / 40));
          const id = setInterval(() => {
            start += step;
            if (start >= value) { setCount(value); clearInterval(id); }
            else setCount(start);
          }, 30);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const footerColumns = [
  {
    title: "Platform",
    links: [
      { label: "For Shippers", href: "https://company.lorri.in" },
      { label: "For Carriers", href: "https://transporter.lorr.in" },
      { label: "AI Procurement", href: "#platform" },
      { label: "Freight Benchmarking", href: "#platform" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "https://logisticsnow-redesign.vercel.app/about" },
      { label: "Vision", href: "https://logisticsnow-redesign.vercel.app/about#our-vision" },
      { label: "Careers", href: "https://logisticsnow-redesign.vercel.app/careers" },
      { label: "Newsroom", href: "/#newsroom" },
    ],
  },
  {
    title: "Get in Touch",
    links: [
      { label: "lorri@logisticsnow.in", href: "mailto:lorri@logisticsnow.in", icon: Mail },
      { label: "+91-9867773508", href: "tel:+919867773508", icon: Phone },
      { label: "Mulund West, Mumbai", icon: MapPin },
    ],
  },
];

const trustStats = [
  { value: 2200, suffix: "+", label: "Verified Carriers" },
  { value: 80000, suffix: "+", label: "Routes Covered" },
  { value: 21, suffix: "M+", label: "Savings Delivered" },
];

const productTags = ["AI Procurement", "Freight Benchmarking", "Fleet Optimization", "TMS"];

export default function Footer() {
  const openDemo = useDemoModal();

  return (
    <footer>
      {/* ── Final CTA strip ── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, hsl(var(--primary) / .15) 0%, hsl(var(--bg-deep)) 50%, hsl(var(--accent) / .08) 100%)",
          borderTop: "1px solid hsl(var(--border))",
        }}
      >
        <div
          className="mx-auto flex flex-col items-center gap-4 px-4 py-8 text-center sm:py-10"
          style={{ maxWidth: 800 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5" style={{ background: "hsl(var(--primary) / .12)", border: "1px solid hsl(var(--primary) / .25)" }}>
            <Sparkles size={13} style={{ color: "hsl(var(--accent))" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: "hsl(var(--accent))", letterSpacing: ".06em", textTransform: "uppercase" }}>
              Ready to transform?
            </span>
          </div>

          <h3 className="text-2xl font-bold sm:text-3xl" style={{ color: "hsl(var(--foreground))", lineHeight: 1.25 }}>
            See How AI Can Reduce Your Logistics Cost
          </h3>
          <p className="mx-auto" style={{ fontSize: 14, color: "hsl(var(--muted-foreground))", maxWidth: 520, lineHeight: 1.7 }}>
            Join leading manufacturers and carriers using LoRRI's AI-powered intelligence platform to benchmark, optimize, and save.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={openDemo}
              className="group inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all hover:scale-[1.03] active:scale-[0.97]"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                color: "hsl(var(--primary-foreground))",
                fontSize: 14,
                boxShadow: "0 0 24px hsl(var(--primary) / .35)",
              }}
            >
              <Sparkles size={15} />
              Show Me My Savings
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </button>
            <a
              href="#platform"
              className="inline-flex items-center gap-2 rounded-lg border px-6 py-3 font-semibold transition-all hover:scale-[1.03]"
              style={{
                borderColor: "hsl(var(--border))",
                color: "hsl(var(--foreground))",
                fontSize: 14,
                background: "hsl(var(--card) / .5)",
              }}
            >
              See AI in Action
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* ── Main footer ── */}
      <div
        style={{
          background: "hsl(var(--bg-deep))",
          borderTop: "1px solid hsl(var(--border-subtle))",
        }}
      >
        <div className="mx-auto px-4 pb-3 pt-6 sm:px-6 lg:px-8" style={{ maxWidth: 1200 }}>
          {/* Grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-[2.2fr_1fr_1fr_1fr]" style={{ marginBottom: 32 }}>
            {/* Brand column */}
            <div>
              <div className="mb-4 flex items-center gap-2.5">
                <span className="text-lg font-extrabold" style={{ color: "hsl(var(--foreground))" }}>
                  LoRRI<span style={{ color: "hsl(var(--success))" }}>.ai</span>
                </span>
              </div>
              <p className="mb-4" style={{ fontSize: 13, color: "hsl(var(--muted-foreground))", lineHeight: 1.75, maxWidth: 280 }}>
                The AI-Powered Logistics Intelligence Platform for Global Freight.
              </p>

              {/* Product tags */}
              <div className="mb-5 flex flex-wrap gap-1.5">
                {productTags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full px-2.5 py-0.5"
                    style={{ fontSize: 10, fontWeight: 600, color: "hsl(var(--accent))", background: "hsl(var(--accent) / .08)", border: "1px solid hsl(var(--accent) / .15)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Backing highlight */}
              <div
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2"
                style={{ background: "hsl(var(--primary) / .08)", border: "1px solid hsl(var(--primary) / .18)" }}
              >
                <Sparkles size={12} style={{ color: "hsl(var(--primary-glow))" }} />
                <span style={{ fontSize: 11, fontWeight: 600, color: "hsl(var(--foreground))", letterSpacing: ".02em" }}>
                  Backed by <span style={{ color: "hsl(var(--accent))" }}>Shell</span> &amp; <span style={{ color: "hsl(var(--accent))" }}>Flipkart</span>
                </span>
              </div>
            </div>

            {/* Link columns */}
            {footerColumns.map((col) => (
              <div key={col.title}>
                <div
                  className="mb-4"
                  style={{ fontSize: 10, color: "hsl(var(--muted-foreground))", fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase" }}
                >
                  {col.title}
                </div>
                <div className="flex flex-col gap-2.5">
                  {col.links.map((link) => {
                    const Icon = (link as any).icon;
                    const isExternal = link.href?.startsWith("http");

                    if (!link.href) {
                      return (
                        <span key={link.label} className="flex items-center gap-2" style={{ fontSize: 13, color: "hsl(var(--muted-dim))" }}>
                          {Icon && <Icon size={13} />}
                          {link.label}
                        </span>
                      );
                    }

                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group flex items-center gap-2 transition-colors"
                        style={{ fontSize: 13, color: "hsl(var(--muted-dim))", textDecoration: "none" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(var(--foreground))")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(var(--muted-dim))")}
                      >
                        {Icon && <Icon size={13} />}
                        {link.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Trust stats bar */}
          <div
            className="mb-6 flex flex-wrap items-center justify-center gap-6 rounded-xl px-6 py-4 sm:gap-10"
            style={{ background: "hsl(var(--card) / .4)", border: "1px solid hsl(var(--border-subtle))" }}
          >
            {trustStats.map((s, i) => (
              <div key={i} className="flex items-baseline gap-1.5 text-center">
                <span className="font-bold" style={{ fontSize: 18, color: "hsl(var(--accent))" }}>
                  {s.suffix.includes("M") ? "$" : ""}
                  <AnimatedNum value={s.value} suffix={s.suffix} />
                </span>
                <span style={{ fontSize: 11, color: "hsl(var(--muted-foreground))" }}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div
            className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between"
            style={{ borderColor: "hsl(var(--border-subtle))" }}
          >
            <span style={{ fontSize: 12, color: "hsl(var(--muted-dim))" }}>© 2025 LogisticsNow Private Limited. All rights reserved.</span>
            <div className="flex flex-wrap gap-4 sm:gap-5">
              {[
                { label: "Privacy Policy", href: "https://lntermsandconditions.blob.core.windows.net/tnc/privacypolicy.html" },
                { label: "Terms of Use", href: "https://lntermsandconditions.blob.core.windows.net/tnc/benchmark_tnc.html" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  style={{ fontSize: 12, color: "hsl(var(--muted-dim))", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(var(--foreground))")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(var(--muted-dim))")}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
