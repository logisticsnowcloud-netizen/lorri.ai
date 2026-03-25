import { useEffect, useState, useRef } from "react";
import { Play, TrendingDown, TrendingUp, Zap, BarChart3, Eye, Bot, ArrowRight } from "lucide-react";
import { Quote } from "./Icons";

const quotes = [
  { text: "LoRRI will organise the fragmented logistics industry. This is the future of freight procurement in India.", role: "Head of Supply Chain", co: "Fortune 500 Company" },
  { text: "End to end one-stop solution. Great integration of technology — provides access, intelligence, drives cost savings and enhances services.", role: "Head of Supply Chain", co: "Leading MNC" },
  { text: "Very well designed and covers all major pain points. Such a system will drive real change in the industry.", role: "Head of Supply Chain", co: "Fortune 500 Company" },
  { text: "Informative platform with huge potential. This is exactly what Indian logistics has been waiting for.", role: "Head of Supply Chain", co: "Leading MNC" },
];

const videoTestimonials = [
  {
    name: "Apollo Tyres Limited (Global)",
    person: "Mr. Parmeshwaran Iyer",
    title: "Chief Supply Chain Officer",
    videoId: "hwRp72mT18E",
    domain: "apollotyres.com",
    metrics: [
      { icon: TrendingDown, label: "Freight Cost", value: "↓ 18%" },
      { icon: TrendingUp, label: "Efficiency", value: "↑ 25%" },
    ],
    aiTag: "AI Procurement",
    summary: "Reduced procurement cost by 18% within first 90 days using AI-driven rate optimization",
    featured: true,
  },
  {
    name: "Jyothy Labs Ltd.",
    person: "Mr. Ananth Rao",
    title: "Head – Operations",
    videoId: "T1sUqxHzX9c",
    domain: "jyothylabs.com",
    metrics: [
      { icon: TrendingDown, label: "TAT", value: "↓ 22%" },
      { icon: TrendingUp, label: "Fill Rate", value: "↑ 30%" },
    ],
    aiTag: "AI Optimization",
    summary: "Achieved 22% faster turnaround through intelligent load optimization",
  },
  {
    name: "Perfetti Van Melle (India)",
    person: "Mr. Vaseem Ahamad",
    title: "Associate Director, Logistics & Warehousing",
    videoId: "akFrzBqu-d0",
    domain: "perfettivanmelle.com",
    thumbnailLogo: "/newlogo/perfetti-van-melle-removebg-preview.png",
    metrics: [
      { icon: TrendingDown, label: "Cost/Ton", value: "↓ 15%" },
      { icon: Eye, label: "Visibility", value: "100%" },
    ],
    aiTag: "AI Visibility",
    summary: "Full supply chain visibility with 15% cost-per-ton reduction through AI analytics",
  },
  {
    name: "MIRC Electronics (Onida)",
    person: "Mr. Nilesh Patil",
    title: "VP – Global Supply Chain",
    videoId: "77_eYlVvehE",
    domain: "onida.com",
    metrics: [
      { icon: TrendingUp, label: "On-Time", value: "↑ 35%" },
      { icon: TrendingDown, label: "Damages", value: "↓ 40%" },
    ],
    aiTag: "AI Procurement",
    summary: "35% improvement in on-time delivery with AI-powered carrier scoring",
  },
  {
    name: "Saint-Gobain India",
    person: "Mr. Shekhar Kulkarni",
    title: "SCM Head",
    videoId: "dChAh9biv0c",
    domain: "saint-gobain.co.in",
    thumbnailLogo: "/newlogo/Saint-Gobain-Logo.png",
    metrics: [
      { icon: TrendingDown, label: "Spend", value: "↓ 20%" },
      { icon: BarChart3, label: "Analytics", value: "Real-time" },
    ],
    aiTag: "AI Intelligence",
    summary: "Real-time freight intelligence driving 20% logistics spend reduction",
  },
  {
    name: "New Darbar Transport",
    person: "Mr. Jatindra Vohra",
    title: "Director",
    videoId: "5jc7YnwtlwQ",
    domain: "newdarbartransport.com",
    metrics: [
      { icon: TrendingUp, label: "Utilization", value: "↑ 28%" },
      { icon: Zap, label: "Matching", value: "< 2s" },
    ],
    aiTag: "AI Load Matching",
    summary: "28% higher fleet utilization through AI-powered instant load matching",
  },
];

const trustMetrics = [
  { value: "$21M+", label: "Savings Delivered" },
  { value: "2,300+", label: "Carriers Onboarded" },
  { value: "80,000+", label: "Routes Optimized" },
];

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1600;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{display.toLocaleString()}{suffix}</span>;
}

function VideoThumbnail({ v }: { v: typeof videoTestimonials[0] }) {
  if (v.thumbnailLogo) {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, hsl(var(--card-alt)), hsl(var(--bg-deep)))",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "12% auto auto 8%",
            padding: "5px 10px",
            borderRadius: 999,
            background: "hsl(var(--success) / 0.14)",
            border: "1px solid hsl(var(--success) / 0.28)",
            color: "hsl(var(--success))",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: ".08em",
            textTransform: "uppercase",
          }}
        >
          Case Study
        </div>
        <div
          style={{
            position: "absolute",
            inset: "auto -8% -22% auto",
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: "radial-gradient(circle, hsl(var(--primary) / 0.28) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: "-30% auto auto -12%",
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: "radial-gradient(circle, hsl(var(--accent) / 0.22) 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center px-8">
          <img src={v.thumbnailLogo} alt={`${v.name} thumbnail`} className="max-h-20 w-full object-contain sm:max-h-24" />
        </div>
        <div
          style={{
            position: "absolute",
            inset: "auto 12px 12px 12px",
            borderRadius: 12,
            padding: "10px 12px",
            background: "hsl(var(--background) / 0.7)",
            border: "1px solid hsl(var(--border-subtle))",
            color: "hsl(var(--foreground))",
            fontSize: 12,
            fontWeight: 700,
            lineHeight: 1.25,
            backdropFilter: "blur(8px)",
          }}
        >
          {v.name}
        </div>
      </div>
    );
  }

  return (
    <img
      src={`https://img.youtube.com/vi/${v.videoId}/hqdefault.jpg`}
      alt={v.name}
      style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .4s ease" }}
      className="group-hover:scale-110"
    />
  );
}

function VideoCard({ v, featured = false }: { v: typeof videoTestimonials[0]; featured?: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={`https://www.youtube.com/watch?v=${v.videoId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      style={{ textDecoration: "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          borderRadius: 16,
          overflow: "hidden",
          background: "hsl(var(--card))",
          border: featured
            ? "1.5px solid hsl(var(--primary) / 0.4)"
            : "1.5px solid hsl(var(--border-subtle))",
          transition: "all .35s ease",
          boxShadow: hovered
            ? featured
              ? "0 12px 40px -12px hsl(var(--primary) / 0.3)"
              : "0 8px 30px -10px hsl(var(--primary) / 0.2)"
            : "none",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
        }}
      >
        <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden", background: "hsl(var(--bg-deep))" }}>
          <VideoThumbnail v={v} />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: hovered ? "hsl(var(--background) / 0.36)" : "hsl(var(--background) / 0.24)",
              transition: "background .3s ease",
            }}
          >
            <div
              style={{
                width: featured ? 60 : 52,
                height: featured ? 60 : 52,
                borderRadius: "50%",
                background: "linear-gradient(135deg, hsl(var(--destructive)), hsl(var(--destructive) / 0.8))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 24px -8px hsl(var(--destructive) / 0.6)",
                transition: "transform .3s ease",
                transform: hovered ? "scale(1.15)" : "scale(1)",
              }}
            >
              <Play size={featured ? 26 : 22} fill="white" color="white" style={{ marginLeft: 2 }} />
            </div>
          </div>

          {/* Hover summary overlay */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "32px 16px 14px",
              background: "linear-gradient(transparent, hsl(var(--background) / 0.92))",
              transform: hovered ? "translateY(0)" : "translateY(100%)",
              transition: "transform .35s ease",
            }}
          >
            <p style={{ fontSize: 12, color: "hsl(var(--foreground) / 0.9)", margin: 0, fontWeight: 500, lineHeight: 1.5 }}>
              {v.summary}
            </p>
          </div>
        </div>

        <div style={{ padding: "14px 16px" }}>
          {/* AI Tag */}
          <div style={{ marginBottom: 8 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: "3px 8px",
                borderRadius: 6,
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: ".06em",
                textTransform: "uppercase",
                background: "hsl(var(--primary) / 0.12)",
                color: "hsl(var(--primary-glow))",
                border: "1px solid hsl(var(--primary) / 0.2)",
              }}
            >
              <Bot size={10} /> {v.aiTag}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <img
              src={`https://www.google.com/s2/favicons?domain=${v.domain}&sz=32`}
              alt=""
              style={{ width: 20, height: 20, borderRadius: 4 }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            <span style={{ fontSize: 14, fontWeight: 700, color: "hsl(var(--foreground))", lineHeight: 1.2 }}>{v.name}</span>
          </div>
          <p style={{ fontSize: 12, color: "hsl(var(--muted-foreground))", lineHeight: 1.45, margin: "0 0 10px" }}>
            {v.person} — {v.title}
          </p>

          {/* Metrics */}
          <div style={{ display: "flex", gap: 8 }}>
            {v.metrics.map((m, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  padding: "8px 10px",
                  borderRadius: 10,
                  background: "hsl(var(--bg-deep))",
                  border: "1px solid hsl(var(--border-subtle))",
                }}
              >
                <div style={{ fontSize: 9, color: "hsl(var(--muted-foreground))", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 2 }}>
                  {m.label}
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "hsl(var(--success))", lineHeight: 1 }}>
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % 4), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="px-4 py-3 sm:px-6 lg:px-8" style={{ background: "hsl(var(--background))" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 20, fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", background: "hsl(var(--primary) / 0.12)", border: "1px solid hsl(var(--border))", color: "hsl(var(--primary-glow))", marginBottom: 8 }}>
          <Bot size={12} /> AI Impact Stories
        </div>
        <h2 style={{ fontSize: "1.6rem", fontWeight: 900, color: "hsl(var(--foreground))", letterSpacing: "-0.03em", marginBottom: 6 }} className="text-[1.4rem] sm:text-[1.5rem] lg:text-[1.6rem]">
          Real Results from AI-Powered Logistics
        </h2>
        <p style={{ fontSize: 15, color: "hsl(var(--muted-foreground))", marginBottom: 20, maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
          Leading manufacturers and carriers are using LoRRI's AI to reduce cost, improve efficiency, and gain real-time intelligence.
        </p>

        {/* Trust metrics bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 6,
            marginBottom: 24,
            flexWrap: "wrap",
          }}
        >
          {trustMetrics.map((m, i) => (
            <div
              key={i}
              style={{
                padding: "10px 20px",
                borderRadius: 12,
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border-subtle))",
                minWidth: 160,
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 900, color: "hsl(var(--success))", lineHeight: 1.1 }}>
                {m.value.startsWith("$") ? (
                  <><span>$</span><AnimatedNumber value={21} suffix="M+" /></>
                ) : m.value.includes("2,300") ? (
                  <AnimatedNumber value={2200} suffix="+" />
                ) : (
                  <AnimatedNumber value={80000} suffix="+" />
                )}
              </div>
              <div style={{ fontSize: 11, color: "hsl(var(--muted-foreground))", fontWeight: 600, marginTop: 2 }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Quotes carousel */}
        <div style={{ maxWidth: 840, margin: "0 auto 24px" }}>
          <div style={{ position: "relative", minHeight: 190 }} className="sm:min-h-[170px]">
            {quotes.map((q, i) => (
              <div key={i} style={{ position: i === active ? "relative" : "absolute", top: 0, left: 0, right: 0, opacity: i === active ? 1 : 0, transform: i === active ? "translateY(0)" : "translateY(12px)", transition: "all .5s ease", pointerEvents: i === active ? "auto" : "none" }}>
                <div style={{ padding: "18px 18px 20px", background: "hsl(var(--card))", border: "1.5px solid hsl(var(--border))", borderRadius: 16 }} className="sm:px-7">
                  <div style={{ color: "hsl(var(--primary))", marginBottom: 14, opacity: 0.4, display: "flex", justifyContent: "flex-start" }}><Quote /></div>
                  <p style={{ fontSize: 14, fontWeight: 500, color: "hsl(var(--foreground))", lineHeight: 1.6, marginBottom: 14, fontStyle: "italic" }}>
                    "{q.text}"
                  </p>
                  <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#393185,#1AA6DF)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "white", fontSize: 13 }}>{q.role[0]}</div>
                    <div className="text-center sm:text-left">
                      <div style={{ fontWeight: 700, fontSize: 14, color: "hsl(var(--foreground))" }}>{q.role}</div>
                      <div style={{ fontSize: 12, color: "hsl(var(--success))", fontWeight: 600 }}>{q.co}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 12 }}>
            {quotes.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} style={{ width: i === active ? 26 : 8, height: 8, borderRadius: 4, background: i === active ? "#393185" : "var(--border)", border: "none", cursor: "pointer", transition: "all .3s", padding: 0 }} />
            ))}
          </div>
        </div>

        {/* Case study videos */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 20, fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", background: "var(--greenLt)", border: "1px solid rgba(84,175,58,0.3)", color: "#54AF3A", marginBottom: 12 }}>
          <Play size={12} /> Case Study Videos
        </div>
        <div className="grid grid-cols-1 gap-4 text-left sm:grid-cols-2 xl:grid-cols-3">
          {videoTestimonials.map((v, i) => (
            <VideoCard key={i} v={v} featured={i === 0} />
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 24, display: "flex", justifyContent: "center" }}>
          <a
            href="https://www.youtube.com/@FretBox"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 28px",
              borderRadius: 12,
              background: "hsl(var(--primary) / 0.1)",
              border: "1.5px solid hsl(var(--primary) / 0.3)",
              color: "hsl(var(--foreground))",
              fontSize: 14,
              fontWeight: 700,
              textDecoration: "none",
              transition: "all .3s ease",
            }}
          >
            See How AI Can Transform Your Logistics
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
