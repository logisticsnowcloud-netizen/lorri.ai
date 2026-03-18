import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const pressItems = [
  {
    name: "Economic Times",
    logo: "https://logo.clearbit.com/economictimes.com",
    url: "https://economictimes.indiatimes.com/tech/startups/logisticsnow-launches-benchmark-platform-for-road-freight-rates/articleshow/79562516.cms",
  },
  {
    name: "The Hindu",
    logo: "https://logo.clearbit.com/thehindu.com",
    url: "https://www.thehindubusinessline.com/economy/logistics/logisticsnow-launches-platform-for-contracted-truck-rates/article33231340.ece",
  },
  {
    name: "YourStory",
    logo: "https://logo.clearbit.com/yourstory.com",
    url: "https://yourstory.com/2020/04/indian-logistics-startups-revamp-coronavirus-logisticsnow",
  },
  {
    name: "Business Standard",
    logo: "https://logo.clearbit.com/business-standard.com",
    url: "https://newssection.blob.core.windows.net/images/Business%20Standard%20Mumbai_Page%2004_24th%20December%202020_LogisticsNow.pdf",
  },
  {
    name: "Manufacturing Today",
    logo: "https://logo.clearbit.com/manufacturingtodayindia.com",
    url: "https://www.manufacturingtodayindia.com/products-suppliers/9149-logisticsnow-launches-lorri-benchmark-indias-first-freight-benchmark-for-contracted-freight",
  },
  {
    name: "ANI News",
    logo: "https://logo.clearbit.com/aninews.in",
    url: "http://www.aninews.in/news/business/logisticsnow-wins-the-sustainability-leaders-track-at-supernova-challenge-dubai-202520260120111714",
  },
];

const pressArticles = [
  {
    outlet: "ANI News",
    title: "LogisticsNow Wins the Sustainability Leaders Track at Supernova Challenge Dubai 2025",
    url: "http://www.aninews.in/news/business/logisticsnow-wins-the-sustainability-leaders-track-at-supernova-challenge-dubai-202520260120111714",
    date: "Jan 2026",
  },
  {
    outlet: "Economic Times",
    title: "LogisticsNow Launches Benchmark Platform for Road Freight Rates",
    url: "https://economictimes.indiatimes.com/tech/startups/logisticsnow-launches-benchmark-platform-for-road-freight-rates/articleshow/79562516.cms",
    date: "Dec 2020",
  },
  {
    outlet: "Logistics Insider",
    title: "Freight Benchmarking: Elevating Supply Chain Standards",
    url: "https://newssection.blob.core.windows.net/images/LogisticsInsider_Pg10to16_January2021issue_LogisticsNow.pdf",
    date: "Jan 2021",
  },
  {
    outlet: "Telangana Today",
    title: "LogisticsNow to Go Multi-Modal — Plans to Foray Into Rail & Coastal Shipping",
    url: "https://telanganatoday.com/logisticsnow-to-go-multi-modal",
    date: "Dec 2020",
  },
  {
    outlet: "The Hindu Business Line",
    title: "LogisticsNow Launches Platform for Contracted Truck Rates",
    url: "https://www.thehindubusinessline.com/economy/logistics/logisticsnow-launches-platform-for-contracted-truck-rates/article33231340.ece",
    date: "Dec 2020",
  },
  {
    outlet: "ITLN",
    title: "Democratising Indian Logistics With a Trusted Freight-Rate Referee",
    url: "https://www.itln.in/democratising-indian-logistics-with-a-trusted-freightrate-referee",
    date: "Dec 2020",
  },
  {
    outlet: "YourStory",
    title: "How Indian Logistics Can Revamp Despite Coronavirus Pandemic",
    url: "https://yourstory.com/2020/04/indian-logistics-startups-revamp-coronavirus-logisticsnow",
    date: "Apr 2020",
  },
  {
    outlet: "Business Standard",
    title: "Backed by Shell, LogisticsNow Ready to Improve Road Transportation Biz",
    url: "https://newssection.blob.core.windows.net/images/Business%20Standard%20Mumbai_Page%2004_24th%20December%202020_LogisticsNow.pdf",
    date: "Dec 2020",
  },
  {
    outlet: "Manufacturing Today",
    title: "How Data Science Can Enable Solutions for the Logistics Industry",
    url: "https://www.manufacturingtodayindia.com/people/9058-how-data-science-can-enable-solutions-for-and-help-organize-the-logistics-industry",
    date: "Nov 2020",
  },
];

export default function Newsroom() {
  return (
    <section className="relative overflow-hidden px-4 py-4 sm:px-6 lg:px-8" style={{ background: "hsl(var(--background))" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 50%, hsl(var(--primary) / 0.06) 0%, transparent 65%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest" style={{ background: "hsl(var(--primary) / 0.12)", border: "1px solid hsl(var(--border))", color: "hsl(var(--l-blue))" }}>
            In The News
          </div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 900, color: "hsl(var(--foreground))", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 8 }} className="text-[1.4rem] sm:text-[1.5rem] lg:text-[1.6rem]">
            Newsroom & <span style={{ color: "hsl(var(--primary-glow))" }}>Press Coverage</span>
          </h2>
          <p style={{ color: "hsl(var(--muted-foreground))", fontSize: 13, maxWidth: 520, margin: "0 auto", lineHeight: 1.5 }}>
            See what leading publications are saying about LogisticsNow's mission to transform the global freight ecosystem.
          </p>
        </div>

        <div className="mx-auto mb-4 grid max-w-[960px] grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
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
              className="group flex min-h-[72px] flex-col items-center justify-center gap-1.5 rounded-xl p-3 transition-all duration-300"
              style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border-subtle))" }}
              whileHover={{ scale: 1.04, borderColor: "hsl(var(--primary) / 0.5)" }}
            >
              <img src={item.logo} alt={item.name} className="h-7 w-7 rounded object-contain opacity-60 transition-opacity group-hover:opacity-100" style={{ filter: "grayscale(80%)" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              <span className="text-center text-[10px] font-semibold leading-tight" style={{ color: "hsl(var(--muted-foreground))" }}>
                {item.name}
              </span>
            </motion.a>
          ))}
        </div>

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
              className="group flex min-h-[140px] flex-col justify-between rounded-xl p-4 transition-all duration-300 hover:translate-y-[-2px]"
              style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border-subtle))" }}
            >
              <div>
                <div className="mb-1.5 flex flex-wrap items-center gap-2">
                  <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: "hsl(var(--primary-glow))" }}>
                    {article.outlet}
                  </span>
                  <span className="text-[9px] font-medium" style={{ color: "hsl(var(--muted-dim))" }}>
                    {article.date}
                  </span>
                </div>
                <p className="text-[12px] font-medium leading-snug" style={{ color: "hsl(var(--foreground))" }}>
                  {article.title}
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold transition-colors" style={{ color: "hsl(var(--accent))" }}>
                Read Article
                <ExternalLink size={10} className="transition-transform group-hover:translate-x-0.5" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
