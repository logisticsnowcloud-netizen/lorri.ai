import { motion } from "framer-motion";
import { ExternalLink, Trophy, ArrowRight, Sparkles } from "lucide-react";

const pressItems = [
  { name: "Economic Times", logo: "https://logo.clearbit.com/economictimes.com", url: "https://economictimes.indiatimes.com/tech/startups/logisticsnow-launches-benchmark-platform-for-road-freight-rates/articleshow/79562516.cms" },
  { name: "The Hindu", logo: "https://logo.clearbit.com/thehindu.com", url: "https://www.thehindubusinessline.com/economy/logistics/logisticsnow-launches-platform-for-contracted-truck-rates/article33231340.ece" },
  { name: "YourStory", logo: "https://logo.clearbit.com/yourstory.com", url: "https://yourstory.com/2020/04/indian-logistics-startups-revamp-coronavirus-logisticsnow" },
  { name: "Business Standard", logo: "https://logo.clearbit.com/business-standard.com", url: "https://newssection.blob.core.windows.net/images/Business%20Standard%20Mumbai_Page%2004_24th%20December%202020_LogisticsNow.pdf" },
  { name: "Manufacturing Today", logo: "https://logo.clearbit.com/manufacturingtodayindia.com", url: "https://www.manufacturingtodayindia.com/products-suppliers/9149-logisticsnow-launches-lorri-benchmark-indias-first-freight-benchmark-for-contracted-freight" },
  { name: "ANI News", logo: "https://logo.clearbit.com/aninews.in", url: "http://www.aninews.in/news/business/logisticsnow-wins-the-sustainability-leaders-track-at-supernova-challenge-dubai-202520260120111714" },
];

const featuredArticle = {
  outlet: "ANI News",
  title: "LogisticsNow Wins the Sustainability Leaders Track at Supernova Challenge Dubai 2025",
  impact: "Recognized globally for AI-driven freight optimization and sustainable logistics innovation",
  url: "http://www.aninews.in/news/business/logisticsnow-wins-the-sustainability-leaders-track-at-supernova-challenge-dubai-202520260120111714",
  date: "Jan 2026",
  tag: "🏆 Award",
};

const pressArticles = [
  {
    outlet: "Economic Times",
    title: "LogisticsNow Launches Benchmark Platform for Road Freight Rates",
    impact: "Enabling AI-driven freight pricing across 80,000+ routes nationwide",
    url: "https://economictimes.indiatimes.com/tech/startups/logisticsnow-launches-benchmark-platform-for-road-freight-rates/articleshow/79562516.cms",
    date: "Dec 2020",
    tag: "Milestone",
  },
  {
    outlet: "Business Standard",
    title: "Backed by Shell, LogisticsNow Ready to Improve Road Transportation Biz",
    impact: "Strategic backing to scale AI logistics intelligence platform across India",
    url: "https://newssection.blob.core.windows.net/images/Business%20Standard%20Mumbai_Page%2004_24th%20December%202020_LogisticsNow.pdf",
    date: "Dec 2020",
    tag: "Milestone",
  },
  {
    outlet: "Logistics Insider",
    title: "Freight Benchmarking: Elevating Supply Chain Standards",
    impact: "Setting new industry standards with data-driven freight intelligence",
    url: "https://newssection.blob.core.windows.net/images/LogisticsInsider_Pg10to16_January2021issue_LogisticsNow.pdf",
    date: "Jan 2021",
    tag: "Feature",
  },
  {
    outlet: "The Hindu Business Line",
    title: "LogisticsNow Launches Platform for Contracted Truck Rates",
    impact: "Bringing transparency to India's $150B road freight market",
    url: "https://www.thehindubusinessline.com/economy/logistics/logisticsnow-launches-platform-for-contracted-truck-rates/article33231340.ece",
    date: "Dec 2020",
    tag: "Milestone",
  },
  {
    outlet: "YourStory",
    title: "How Indian Logistics Can Revamp Despite Coronavirus Pandemic",
    impact: "Pioneering digital transformation in logistics during global disruption",
    url: "https://yourstory.com/2020/04/indian-logistics-startups-revamp-coronavirus-logisticsnow",
    date: "Apr 2020",
    tag: "Feature",
  },
];

export default function Newsroom() {
  return (
    <section id="newsroom" className="relative overflow-hidden px-4 py-4 sm:px-6 lg:px-8" style={{ background: "hsl(var(--background))" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 50%, hsl(var(--primary) / 0.06) 0%, transparent 65%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest" style={{ background: "hsl(var(--primary) / 0.12)", border: "1px solid hsl(var(--border))", color: "hsl(var(--l-blue))" }}>
            <Sparkles size={10} /> In The News
          </div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 900, color: "hsl(var(--foreground))", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 8 }} className="text-[1.4rem] sm:text-[1.5rem] lg:text-[1.6rem]">
            Recognized by <span style={{ color: "hsl(var(--primary-glow))" }}>Industry Leaders & Media</span>
          </h2>
          <p style={{ color: "hsl(var(--muted-foreground))", fontSize: 13, maxWidth: 560, margin: "0 auto", lineHeight: 1.5 }}>
            See how global media is recognizing LoRRI's AI-powered logistics intelligence platform.
          </p>
        </div>

        {/* As seen in - logo strip */}
        <div style={{ textAlign: "center", marginBottom: 4 }}>
          <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "hsl(var(--muted-dim))" }}>As seen in</span>
        </div>
        <div className="mx-auto mb-6 grid max-w-[960px] grid-cols-3 gap-3 sm:grid-cols-6">
          {pressItems.map((item, i) => (
            <motion.a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="group flex min-h-[68px] flex-col items-center justify-center gap-1.5 rounded-xl p-3 transition-all duration-300"
              style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border-subtle))" }}
              whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary) / 0.5)" }}
            >
              <img
                src={item.logo}
                alt={item.name}
                className="h-7 w-7 rounded object-contain transition-all duration-300 group-hover:opacity-100"
                style={{ filter: "grayscale(100%)", opacity: 0.5 }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                onMouseEnter={(e) => { (e.target as HTMLImageElement).style.filter = "grayscale(0%)"; }}
                onMouseLeave={(e) => { (e.target as HTMLImageElement).style.filter = "grayscale(100%)"; }}
              />
              <span className="text-center text-[10px] font-semibold leading-tight" style={{ color: "hsl(var(--muted-foreground))" }}>
                {item.name}
              </span>
            </motion.a>
          ))}
        </div>

        {/* Featured article */}
        <motion.a
          href={featuredArticle.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="group mx-auto mb-4 block max-w-[960px] rounded-2xl p-5 transition-all duration-300 hover:translate-y-[-3px] sm:p-6"
          style={{
            background: "linear-gradient(135deg, hsl(var(--card)), hsl(var(--card-alt)))",
            border: "1.5px solid hsl(var(--primary) / 0.35)",
            boxShadow: "0 8px 32px -12px hsl(var(--primary) / 0.15)",
          }}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                  style={{ background: "hsl(var(--success) / 0.14)", color: "hsl(var(--success))", border: "1px solid hsl(var(--success) / 0.25)" }}
                >
                  <Trophy size={10} /> {featuredArticle.tag}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: "hsl(var(--primary-glow))" }}>
                  {featuredArticle.outlet}
                </span>
                <span className="text-[9px] font-medium" style={{ color: "hsl(var(--muted-dim))" }}>
                  {featuredArticle.date}
                </span>
              </div>
              <h3 className="mb-1.5 text-[15px] font-bold leading-snug sm:text-[17px]" style={{ color: "hsl(var(--foreground))" }}>
                {featuredArticle.title}
              </h3>
              <p className="text-[12px] leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
                {featuredArticle.impact}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-[12px] font-semibold transition-colors" style={{ color: "hsl(var(--accent))" }}>
              Read Full Story
              <ExternalLink size={12} className="transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        </motion.a>

        {/* Article grid */}
        <div className="mx-auto grid max-w-[960px] grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {pressArticles.map((article, i) => (
            <motion.a
              key={i}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 + i * 0.06, duration: 0.4 }}
              className="group flex min-h-[140px] flex-col justify-between rounded-xl p-4 transition-all duration-300 hover:translate-y-[-3px]"
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border-subtle))",
              }}
              whileHover={{ boxShadow: "0 8px 24px -8px hsl(var(--primary) / 0.15)" }}
            >
              <div>
                <div className="mb-1.5 flex flex-wrap items-center gap-2">
                  <span
                    className="rounded px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider"
                    style={{
                      background: "hsl(var(--primary) / 0.1)",
                      color: "hsl(var(--primary-glow))",
                      border: "1px solid hsl(var(--primary) / 0.18)",
                    }}
                  >
                    {article.tag}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: "hsl(var(--primary-glow))" }}>
                    {article.outlet}
                  </span>
                  <span className="text-[9px] font-medium" style={{ color: "hsl(var(--muted-dim))" }}>
                    {article.date}
                  </span>
                </div>
                <p className="mb-1.5 text-[12px] font-semibold leading-snug" style={{ color: "hsl(var(--foreground))" }}>
                  {article.title}
                </p>
                <p className="text-[11px] leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
                  {article.impact}
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold transition-colors" style={{ color: "hsl(var(--accent))" }}>
                Read Article
                <ExternalLink size={10} className="transition-transform group-hover:translate-x-0.5" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-6 flex justify-center">
          <a
            href="https://www.logisticsnow.com/newsroom"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-xl px-7 py-3 text-[13px] font-bold transition-all duration-300"
            style={{
              background: "hsl(var(--primary) / 0.1)",
              border: "1.5px solid hsl(var(--primary) / 0.3)",
              color: "hsl(var(--foreground))",
            }}
          >
            View All Media Coverage
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
