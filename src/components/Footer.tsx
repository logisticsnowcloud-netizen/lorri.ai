export default function Footer() {
  return (
    <footer className="px-4 pb-3 pt-5 sm:px-6 lg:px-8" style={{ background: "var(--topBar)", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr_1fr]" style={{ marginBottom: 20 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              {/* <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg,#393185,#54AF3A)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "white", fontWeight: 900, fontSize: 13, fontFamily: "Outfit,sans-serif" }}>LN</span>
              </div> */}
              <div style={{ fontWeight: 800, fontSize: 16, color: "var(--text)" }}>LoRRI<span style={{ color: "#54AF3A" }}>.ai</span></div>
            </div>
            <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.7, maxWidth: 250, marginBottom: 14 }}>Logistics Intelligence & Ratings Ecosystem. The Digital Backbone of India's Freight Industry.</p>
            <div style={{ fontSize: 11, color: "var(--text3)" }}>A LogisticsNow Product · Backed by Shell & Flipkart</div>
          </div>

          {[
            { title: "Platform", links: ["For Shippers", "For Carriers", "Intelligence", "Benchmarking", "Optimisation"] },
            { title: "Company", links: ["About Us", "Vision", "Customers", "Investors", "Careers", "News"] },
            { title: "Contact", links: ["Request Demo", "lorri@logisticsnow.in", "+91-9867773508", "Mulund West, Mumbai"] },
          ].map((col, i) => (
            <div key={i}>
              <div style={{ fontSize: 10, color: "var(--text2)", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 14 }}>{col.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {col.links.map((l, j) => (
                  <span key={j} style={{ fontSize: 13, color: "var(--text3)", cursor: "pointer", transition: "color .2s", overflowWrap: "anywhere" }} onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--text)")} onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text3)")}>{l}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between" style={{ borderColor: "var(--borderSm)" }}>
          <span style={{ fontSize: 12, color: "var(--text3)" }}>© 2025 LogisticsNow Private Limited. All rights reserved.</span>
          <div className="flex flex-wrap gap-4 sm:gap-5">
            {["Privacy Policy", "Terms of Use", "Sitemap"].map((l) => (
              <span key={l} style={{ fontSize: 12, color: "var(--text3)", cursor: "pointer" }}>{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
