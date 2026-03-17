import { motion } from "framer-motion";
import { Smartphone, ArrowRight } from "lucide-react";
import lorriBizIcon from "@/assets/lorri-biz-icon.png";
import mylorriIcon from "@/assets/mylorri-icon.png";
import googlePlayBadge from "@/assets/google-play-badge.png";
import appStoreBadge from "@/assets/app-store-badge.svg";

const apps = [
  {
    name: "LoRRI Biz",
    tagline: "For Manufacturers",
    description:
      "Predictive analytics & benchmarking for multi-mode transportation. Manage operations and optimise costs.",
    icon: lorriBizIcon,
    playLink: "https://play.google.com/store/apps/details?id=com.thelogisticsnow.lorri_biz&hl=en_IN",
    iosLink: "https://apps.apple.com/in/app/lorri-biz/id6480331865",
    features: ["Analytics Dashboard", "Benchmark Reports", "Company Profile", "Easy Registration"],
    accent: "#393185",
    accentLight: "rgba(57,49,133,0.12)",
    accentBorder: "rgba(57,49,133,0.25)",
  },
  {
    name: "MyLoRRI",
    tagline: "For Transporters",
    description:
      "Handle spot enquiries, view analytics, and build a stronger logistics business — on the go.",
    icon: mylorriIcon,
    playLink: "https://play.google.com/store/apps/details?id=com.thelogisticsnow.lorri&hl=en_IN",
    iosLink: "https://apps.apple.com/us/app/mylorri/id6480161330",
    features: ["Spot Enquiries", "Live Tracking", "Enquiry Details", "Smart Matching"],
    accent: "#54AF3A",
    accentLight: "rgba(84,175,58,0.10)",
    accentBorder: "rgba(84,175,58,0.25)",
  },
];

export default function MobileApps() {
  return (
    <section
      style={{
        padding: "16px 24px",
        background: "var(--bg)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: 14 }}
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
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: ".08em",
                textTransform: "uppercase",
                color: "var(--text2)",
              }}
            >
              Available on Android
            </span>
          </div>
          <h2
            style={{
              fontSize: "clamp(24px, 3.5vw, 36px)",
              fontWeight: 800,
              color: "var(--text)",
              marginBottom: 10,
              fontFamily: "Outfit, sans-serif",
            }}
          >
            Logistics Intelligence,{" "}
            <span style={{ color: "#54AF3A" }}>In Your Pocket</span>
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "var(--text2)",
              maxWidth: 460,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Two purpose-built apps for every side of the freight ecosystem.
          </p>
        </motion.div>

        {/* App Cards — horizontal compact layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
            gap: 24,
          }}
        >
          {apps.map((app, i) => (
            <motion.div
              key={app.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -4 }}
              style={{
                display: "block",
                background: "var(--card2)",
                border: `1px solid var(--borderSm)`,
                borderRadius: 14,
                padding: 24,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Glow */}
              <div
                style={{
                  position: "absolute",
                  top: -40,
                  right: -40,
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${app.accent}20 0%, transparent 70%)`,
                  pointerEvents: "none",
                }}
              />

              {/* Row: Icon + Info */}
              <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <img
                  src={app.icon}
                  alt={`${app.name} icon`}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    boxShadow: `0 4px 20px ${app.accent}30`,
                    flexShrink: 0,
                  }}
                />

                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Name + tagline */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <h3
                      style={{
                        fontSize: 18,
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
                        fontSize: 10,
                        fontWeight: 700,
                        color: app.accent,
                        textTransform: "uppercase",
                        letterSpacing: ".06em",
                        padding: "2px 8px",
                        borderRadius: 6,
                        background: app.accentLight,
                        border: `1px solid ${app.accentBorder}`,
                      }}
                    >
                      {app.tagline}
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: 13,
                      color: "var(--text2)",
                      lineHeight: 1.6,
                      margin: "6px 0 14px",
                    }}
                  >
                    {app.description}
                  </p>

                  {/* Feature dots */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                      marginBottom: 16,
                    }}
                  >
                    {app.features.map((f) => (
                      <span
                        key={f}
                        style={{
                          fontSize: 10.5,
                          fontWeight: 600,
                          padding: "3px 10px",
                          borderRadius: 14,
                          background: "var(--purpleLt)",
                          color: "var(--text3)",
                          border: "1px solid var(--borderSm)",
                        }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* Store badges + QR codes inline */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <a href={app.playLink} target="_blank" rel="noopener noreferrer">
                      <img src={googlePlayBadge} alt="Get it on Google Play" style={{ height: 44, margin: "-5px 0" }} />
                    </a>
                    <a href={app.iosLink} target="_blank" rel="noopener noreferrer">
                      <img src={appStoreBadge} alt="Download on the App Store" style={{ height: 34, borderRadius: 6 }} />
                    </a>
                    <div className="hidden md:flex" style={{ alignItems: "center", gap: 8, marginLeft: 6 }}>
                      <div style={{ width: 1, height: 28, background: "var(--borderSm)" }} />
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(app.playLink)}&color=333333&bgcolor=ffffff`}
                          alt={`${app.name} Android QR`}
                          title="Scan for Android"
                          style={{ width: 36, height: 36, borderRadius: 4, background: "#fff", padding: 2, border: "1px solid var(--borderSm)" }}
                        />
                        <span style={{ fontSize: 8, color: "var(--text3)", fontWeight: 600 }}>Android</span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(app.iosLink)}&color=333333&bgcolor=ffffff`}
                          alt={`${app.name} iOS QR`}
                          title="Scan for iOS"
                          style={{ width: 36, height: 36, borderRadius: 4, background: "#fff", padding: 2, border: "1px solid var(--borderSm)" }}
                        />
                        <span style={{ fontSize: 8, color: "var(--text3)", fontWeight: 600 }}>iOS</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
