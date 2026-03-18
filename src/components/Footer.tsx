const footerColumns = [
  {
    title: "Platform",
    links: [
      { label: "For Shipper", href: "https://company.lorri.in" },
      { label: "For Carrier", href: "https://transporter.lorr.in" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "https://logisticsnow-redesign.vercel.app/about" },
      { label: "Vision", href: "https://logisticsnow-redesign.vercel.app/about#our-vision" },
      { label: "Investors", href: "https://logisticsnow-redesign.vercel.app/about#investors-partners" },
      { label: "Careers", href: "https://logisticsnow-redesign.vercel.app/careers" },
      { label: "Newsroom & Press Coverage", href: "/#newsroom" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Request Demo" },
      { label: "lorri@logisticsnow.in" },
      { label: "+91-9867773508" },
      { label: "Mulund West, Mumbai" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="px-4 pb-3 pt-5 sm:px-6 lg:px-8" style={{ background: "var(--topBar)", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr_1fr]" style={{ marginBottom: 20 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ fontWeight: 800, fontSize: 16, color: "var(--text)" }}>
                LoRRI<span style={{ color: "#54AF3A" }}>.ai</span>
              </div>
            </div>
            <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.7, maxWidth: 250, marginBottom: 14 }}>
              Logistics Intelligence & Ratings Ecosystem. The Digital Backbone of India's Freight Industry.
            </p>
            <div style={{ fontSize: 11, color: "var(--text3)" }}>A LogisticsNow Product · Backed by Shell & Flipkart</div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <div style={{ fontSize: 10, color: "var(--text2)", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 14 }}>
                {col.title}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {col.links.map((link) => {
                  const contentStyle = {
                    fontSize: 13,
                    color: "var(--text3)",
                    cursor: link.href ? "pointer" : "default",
                    transition: "color .2s",
                    overflowWrap: "anywhere" as const,
                    textDecoration: "none",
                  };

                  if (!link.href) {
                    return (
                      <span key={link.label} style={contentStyle}>
                        {link.label}
                      </span>
                    );
                  }

                  const isExternal = link.href.startsWith("http");

                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      style={contentStyle}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text3)")}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between" style={{ borderColor: "var(--borderSm)" }}>
          <span style={{ fontSize: 12, color: "var(--text3)" }}>© 2025 LogisticsNow Private Limited. All rights reserved.</span>
          <div className="flex flex-wrap gap-4 sm:gap-5">
            {[
              {
                label: "Privacy Policy",
                href: "https://lntermsandconditions.blob.core.windows.net/tnc/privacypolicy.html",
              },
              {
                label: "Terms of Use",
                href: "https://lntermsandconditions.blob.core.windows.net/tnc/benchmark_tnc.html",
              },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 12, color: "var(--text3)", cursor: "pointer", textDecoration: "none" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text3)")}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
