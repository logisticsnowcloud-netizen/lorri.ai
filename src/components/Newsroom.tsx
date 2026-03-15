import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const pressItems = [
  {
    name: "Economic Times",
    logo: "https://logo.clearbit.com/economictimes.com",
    url: "https://economictimes.indiatimes.com",
  },
  {
    name: "YourStory",
    logo: "https://logo.clearbit.com/yourstory.com",
    url: "https://yourstory.com",
  },
  {
    name: "Inc42",
    logo: "https://logo.clearbit.com/inc42.com",
    url: "https://inc42.com",
  },
  {
    name: "Business Standard",
    logo: "https://logo.clearbit.com/business-standard.com",
    url: "https://business-standard.com",
  },
  {
    name: "Mint",
    logo: "https://logo.clearbit.com/livemint.com",
    url: "https://livemint.com",
  },
  {
    name: "Forbes India",
    logo: "https://logo.clearbit.com/forbesindia.com",
    url: "https://forbesindia.com",
  },
];

const pressArticles = [
  {
    outlet: "Economic Times",
    title: "How LogisticsNow Is Using AI to Transform India's Freight Industry",
    url: "#",
  },
  {
    outlet: "YourStory",
    title: "LogisticsNow Raises Funding to Scale AI-Driven Logistics Platform",
    url: "#",
  },
  {
    outlet: "Inc42",
    title: "This Startup Is Building the Operating System for Indian Logistics",
    url: "#",
  },
];

export default function Newsroom() {
  return (
    <section
      className="max-md:py-10 max-md:px-4"
      style={{
        background: "hsl(var(--background))",
        padding: "32px 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, hsl(var(--primary) / 0.06) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div
            className="inline-flex items-center gap-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-4"
            style={{
              padding: "5px 14px",
              background: "hsl(var(--primary) / 0.12)",
              border: "1px solid hsl(var(--border))",
              color: "hsl(var(--l-blue))",
            }}
          >
            In The News
          </div>
          <h2
            className="max-md:!text-[1.9rem]"
            style={{
              fontSize: "2.7rem",
              fontWeight: 900,
              color: "hsl(var(--foreground))",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: 14,
            }}
          >
            Newsroom &{" "}
            <span style={{ color: "hsl(var(--primary-glow))" }}>
              Press Coverage
            </span>
          </h2>
          <p
            style={{
              color: "hsl(var(--muted-foreground))",
              fontSize: 16,
              maxWidth: 520,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            See what leading publications are saying about LogisticsNow's
            mission to transform India's freight ecosystem.
          </p>
        </div>

        {/* Media Logos */}
        <div
          className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-12"
          style={{ maxWidth: 900, margin: "0 auto 48px" }}
        >
          {pressItems.map((item, i) => (
            <motion.a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="group flex flex-col items-center justify-center gap-2 rounded-xl p-5 transition-all duration-300"
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border-subtle))",
              }}
              whileHover={{
                scale: 1.04,
                borderColor: "hsl(var(--primary) / 0.5)",
              }}
            >
              <img
                src={item.logo}
                alt={item.name}
                className="h-8 w-8 rounded object-contain opacity-60 group-hover:opacity-100 transition-opacity"
                style={{ filter: "grayscale(80%)" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <span
                className="text-[11px] font-semibold text-center leading-tight"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                {item.name}
              </span>
            </motion.a>
          ))}
        </div>

        {/* Press Articles */}
        <div className="grid md:grid-cols-3 gap-4" style={{ maxWidth: 900, margin: "0 auto" }}>
          {pressArticles.map((article, i) => (
            <motion.a
              key={i}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              className="group flex flex-col justify-between rounded-xl p-5 transition-all duration-300 hover:translate-y-[-2px]"
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border-subtle))",
              }}
            >
              <div>
                <span
                  className="text-[10px] font-bold uppercase tracking-wider mb-2 block"
                  style={{ color: "hsl(var(--primary-glow))" }}
                >
                  {article.outlet}
                </span>
                <p
                  className="text-sm font-medium leading-snug"
                  style={{ color: "hsl(var(--foreground))" }}
                >
                  {article.title}
                </p>
              </div>
              <div
                className="flex items-center gap-1 mt-4 text-[12px] font-semibold transition-colors"
                style={{ color: "hsl(var(--accent))" }}
              >
                Read Article
                <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
