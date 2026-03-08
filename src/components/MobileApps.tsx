import { motion } from "framer-motion";
import { Smartphone, TrendingUp, BarChart3, Truck } from "lucide-react";
import lorriBizIcon from "@/assets/lorri-biz-icon.png";
import mylorriIcon from "@/assets/mylorri-icon.png";
import googlePlayBadge from "@/assets/google-play-badge.png";
import lorriBizScreenshot from "@/assets/lorri-biz-screenshot.png";
import mylorriScreenshot from "@/assets/mylorri-screenshot.png";

const apps = [
  {
    name: "LoRRI Biz",
    tagline: "For Manufacturers",
    description:
      "Predictive analytics & benchmarking for multi-mode transportation. Manage operations, track shipments, and optimise costs — all from your phone.",
    icon: lorriBizIcon,
    screenshot: lorriBizScreenshot,
    link: "https://play.google.com/store/apps/details?id=com.thelogisticsnow.lorri_biz&hl=en_IN",
    features: ["Analytics Dashboard", "Benchmark Reports", "Company Profile"],
    accent: "#393185",
  },
  {
    name: "MyLoRRI",
    tagline: "For Transporters",
    description:
      "Cross-platform planner for transporters & manufacturers. Handle spot enquiries, view analytics, and build a stronger logistics business on the go.",
    icon: mylorriIcon,
    screenshot: mylorriScreenshot,
    link: "https://play.google.com/store/apps/details?id=com.thelogisticsnow.lorri&hl=en_IN",
    features: ["Spot Enquiries", "Live Tracking", "Enquiry Details"],
    accent: "#54AF3A",
  },
];

export default function MobileApps() {
  return (
    <section
      style={{
        padding: "80px 24px",
        background: "var(--bg)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 1px 1px, hsl(var(--grid-line)) 1px, transparent 0)",
          backgroundSize: "40px 40px",
          opacity: 0.5,
        }}
      />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "var(--purpleLt)",
              border: "1px solid var(--borderSm)",
              borderRadius: 20,
              padding: "6px 16px",
              marginBottom: 16,
            }}
          >
            <Smartphone size={14} style={{ color: "#54AF3A" }} />
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: ".06em",
                textTransform: "uppercase",
                color: "var(--text2)",
              }}
            >
              Mobile Apps
            </span>
          </div>
          <h2
            style={{
              fontSize: "clamp(26px, 4vw, 38px)",
              fontWeight: 800,
              color: "var(--text)",
              marginBottom: 12,
              fontFamily: "Outfit, sans-serif",
            }}
          >
            Logistics Intelligence,{" "}
            <span style={{ color: "#54AF3A" }}>In Your Pocket</span>
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "var(--text2)",
              maxWidth: 520,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Whether you're a manufacturer or transporter — manage your entire freight
            ecosystem from anywhere with our purpose-built mobile apps.
          </p>
        </motion.div>

        {/* App Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
            gap: 32,
          }}
        >
          {apps.map((app, i) => (
            <motion.div
              key={app.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              style={{
                background: "var(--card2)",
                border: "1px solid var(--borderSm)",
                borderRadius: 16,
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Top accent bar */}
              <div
                style={{
                  height: 3,
                  background: `linear-gradient(90deg, ${app.accent}, ${app.accent}88)`,
                }}
              />

              <div style={{ padding: "28px 28px 24px" }}>
                {/* App header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    marginBottom: 16,
                  }}
                >
                  <img
                    src={app.icon}
                    alt={`${app.name} icon`}
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 12,
                      boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                    }}
                  />
                  <div>
                    <h3
                      style={{
                        fontSize: 20,
                        fontWeight: 700,
                        color: "var(--text)",
                        fontFamily: "Outfit, sans-serif",
                        margin: 0,
                      }}
                    >
                      {app.name}
                    </h3>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: app.accent,
                        textTransform: "uppercase",
                        letterSpacing: ".05em",
                      }}
                    >
                      {app.tagline}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: 13.5,
                    color: "var(--text2)",
                    lineHeight: 1.7,
                    marginBottom: 18,
                  }}
                >
                  {app.description}
                </p>

                {/* Feature pills */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    marginBottom: 20,
                  }}
                >
                  {app.features.map((f) => (
                    <span
                      key={f}
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        padding: "4px 12px",
                        borderRadius: 20,
                        background: `${app.accent}18`,
                        color: app.accent,
                        border: `1px solid ${app.accent}30`,
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* Screenshot preview */}
                <div
                  style={{
                    borderRadius: 10,
                    overflow: "hidden",
                    border: "1px solid var(--borderSm)",
                    marginBottom: 20,
                  }}
                >
                  <img
                    src={app.screenshot}
                    alt={`${app.name} screenshot`}
                    style={{ width: "100%", display: "block" }}
                    loading="lazy"
                  />
                </div>

                {/* Download button */}
                <a
                  href={app.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.transform = "scale(1)")
                  }
                >
                  <img
                    src={googlePlayBadge}
                    alt="Get it on Google Play"
                    style={{ height: 48 }}
                  />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
