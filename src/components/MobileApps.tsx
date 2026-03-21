import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Smartphone, Zap, TrendingDown, TrendingUp, X, ArrowRight } from "lucide-react";
import appStoreBadge from "@/assets/app-store-badge.svg";
import googlePlayBadge from "@/assets/google-play-badge.png";
import lorriBizIcon from "@/assets/lorri-biz-icon.png";
import mylorriIcon from "@/assets/mylorri-icon.png";
import lorriBizScreens from "@/assets/lorri-biz-screens.png";
import lorriBizScreens2 from "@/assets/lorri-biz-screens-2.png";
import mylorriScreens1 from "@/assets/mylorri-screens-1.png";
import mylorriScreens2 from "@/assets/mylorri-screens-2.png";

const apps = [
  {
    name: "LoRRI Biz",
    tagline: "For Manufacturers",
    description: "Your AI command center for freight — benchmark lanes, predict costs, and optimize in real time.",
    aiAction: "Track costs, benchmark lanes, and get AI optimization insights in real time",
    icon: lorriBizIcon,
    playLink: "https://play.google.com/store/apps/details?id=com.thelogisticsnow.lorri_biz&hl=en_IN",
    iosLink: "https://apps.apple.com/in/app/lorri-biz/id6480331865",
    features: ["Real-Time Cost Insights", "AI-Powered Reports"],
    metrics: [
      { icon: TrendingDown, label: "Cost Visibility", value: "18", suffix: "%", prefix: "↓" },
      { icon: TrendingUp, label: "Faster Decisions", value: "25", suffix: "%", prefix: "↑" },
    ],
    liveIndicators: ["AI Recommendations Running", "Cost Analytics Live"],
    accent: "hsl(var(--primary))",
    featured: true,
    images: [
      { src: lorriBizScreens2, alt: "LoRRI Biz - Sign in, Registration & Analytics Dashboard" },
      { src: lorriBizScreens, alt: "LoRRI Biz - Enquiries & Spot Details" },
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
    features: ["Smart Load Matching", "Live Fleet Tracking"],
    metrics: [
      { icon: TrendingUp, label: "Fleet Utilization", value: "22", suffix: "%", prefix: "↑" },
      { icon: TrendingDown, label: "Empty Miles", value: "31", suffix: "%", prefix: "↓" },
    ],
    liveIndicators: ["Live Tracking Active", "Smart Matching On"],
    accent: "hsl(var(--success))",
    featured: false,
    images: [
      { src: mylorriScreens1, alt: "MyLoRRI - Trusted Platform, Sign In & Dashboard" },
      { src: mylorriScreens2, alt: "MyLoRRI - Spot Enquiries, Details & Indents" },
    ],
  },
];

/* ── Animated counter ── */
function AnimatedNumber({ value, prefix, suffix }: { value: string; prefix: string; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const target = parseInt(value);
          const duration = 1200;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="text-[10px] font-bold text-foreground">
      {prefix} {display}{suffix}
    </span>
  );
}

/* ── 3D tilt screenshot gallery ── */
function ScreenGallery({
  images,
  accent,
  onImageClick,
}: {
  images: { src: string; alt: string }[];
  accent: string;
  onImageClick: (img: { src: string; alt: string }) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [4, -4]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-4, 4]), { stiffness: 150, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, perspective: 800 }}
      className="relative flex flex-col gap-2"
    >
      {/* Live overlay badge */}
      <div className="absolute -right-1 top-1 z-10 flex items-center gap-1 rounded-full border border-border-subtle bg-card px-2 py-0.5 shadow-md">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
        </span>
        <span className="text-[7px] font-bold text-success">LIVE</span>
      </div>

      {images.map((img, idx) => (
        <motion.img
          key={img.alt}
          src={img.src}
          alt={img.alt}
          className="w-full cursor-pointer rounded-lg shadow-lg"
          style={{ boxShadow: `0 8px 24px -6px ${accent}30` }}
          whileHover={{ scale: 1.04, y: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          animate={{ y: [0, idx === 0 ? -3 : 3, 0] }}
          // @ts-ignore
          transition2={{ repeat: Infinity, duration: 4 + idx, ease: "easeInOut" }}
          onClick={() => onImageClick(img)}
        />
      ))}
    </motion.div>
  );
}

/* ── Lightbox ── */
function ImageLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
      >
        <X size={20} />
      </button>
      <motion.img
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        src={src}
        alt={alt}
        className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </motion.div>
  );
}

/* ── Animated stat counter for header ── */
function HeaderStat({ value, label }: { value: string; label: string }) {
  const numericMatch = value.match(/^([\d,]+)/);
  const suffix = value.replace(/^[\d,]+/, "");
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!numericMatch) return;
    const target = parseInt(numericMatch[1].replace(/,/g, ""));
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1400;
          const start = performance.now();
          const step = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            const current = Math.round(eased * target);
            setDisplay(current.toLocaleString() + suffix);
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex items-center gap-1.5">
      <span ref={ref} className="text-sm font-extrabold text-foreground">{display}</span>
      <span className="text-[10px] text-muted-foreground">{label}</span>
    </div>
  );
}

export default function MobileApps() {
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);

  return (
    <>
      <section className="relative overflow-hidden px-4 py-8 sm:px-6 lg:px-8" style={{ background: "hsl(var(--background))" }}>
        <div className="relative z-10 mx-auto max-w-[1200px]">
          {/* Header */}
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
            <p className="mx-auto mb-2 max-w-md text-[11px] text-muted-foreground">
              Download the app and start using AI for your logistics today
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <HeaderStat value="2,200+" label="Carriers Daily" />
              <HeaderStat value="80,000+" label="Routes Optimized" />
              <HeaderStat value="4.6★" label="App Rating" />
            </div>
          </motion.div>

          {/* App Cards */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {apps.map((app, i) => (
              <motion.div
                key={app.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`group relative overflow-hidden rounded-xl border bg-card p-4 transition-all duration-300 hover:-translate-y-0.5 ${
                  app.featured ? "border-primary/30" : "border-border-subtle"
                }`}
                style={{
                  boxShadow: app.featured
                    ? `0 8px 40px -10px ${app.accent}25, inset 0 1px 0 ${app.accent}15`
                    : `0 6px 30px -10px ${app.accent}15`,
                }}
              >
                {/* Featured ribbon */}
                {app.featured && (
                  <div className="absolute left-0 top-0 rounded-br-lg px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-primary-foreground" style={{ background: app.accent }}>
                    ★ Flagship
                  </div>
                )}

                {/* Glow */}
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-20 transition-opacity group-hover:opacity-40"
                  style={{ background: `radial-gradient(circle, ${app.accent}50, transparent 70%)` }}
                />

                <div className="flex gap-4">
                  {/* Screenshots with 3D tilt */}
                  <div className="hidden flex-shrink-0 sm:block" style={{ width: 160, perspective: 800 }}>
                    <ScreenGallery
                      images={app.images}
                      accent={app.accent}
                      onImageClick={setLightboxImage}
                    />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className={`mb-1.5 flex items-center gap-2 ${app.featured ? "mt-3" : ""}`}>
                      <img src={app.icon} alt={`${app.name} icon`} className="h-8 w-8 rounded-lg shadow" />
                      <div>
                        <h3 className="font-['Outfit'] text-base font-bold leading-tight text-foreground">{app.name}</h3>
                        <span className="text-[9px] font-bold uppercase tracking-wide" style={{ color: app.accent }}>
                          {app.tagline}
                        </span>
                      </div>
                    </div>

                    <p className="mb-2 text-[11px] leading-snug text-muted-foreground">{app.description}</p>

                    {/* AI in action */}
                    <div className="mb-2 flex items-start gap-1.5 rounded-md border border-border-subtle bg-bg-deep px-2 py-1.5">
                      <Zap size={10} className="mt-0.5 flex-shrink-0 text-accent" />
                      <div>
                        <span className="text-[8px] font-bold uppercase tracking-wider text-accent">AI in Action</span>
                        <p className="text-[10px] leading-snug text-muted-foreground">{app.aiAction}</p>
                      </div>
                    </div>

                    {/* Animated metrics + live indicators */}
                    <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                      {app.metrics.map((m) => (
                        <div key={m.label} className="flex items-center gap-1">
                          <m.icon size={10} className="text-success" />
                          <AnimatedNumber value={m.value} prefix={m.prefix} suffix={m.suffix} />
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

                    {/* Store badges */}
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
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="mt-5 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#platform"
              className="group/cta inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-5 py-2 text-xs font-semibold text-primary transition-all hover:bg-primary/10"
            >
              Explore Platform
              <ArrowRight size={14} className="transition-transform group-hover/cta:translate-x-0.5" />
            </a>
            <span className="text-[10px] text-muted-foreground">
              Used by <span className="font-bold text-foreground">2,200+ carriers</span> and{" "}
              <span className="font-bold text-foreground">global manufacturers</span> daily
            </span>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <ImageLightbox src={lightboxImage.src} alt={lightboxImage.alt} onClose={() => setLightboxImage(null)} />
        )}
      </AnimatePresence>
    </>
  );
}