export default function Footer() {
  return (
    <footer className="bg-bg-deep border-t border-border-subtle pt-12 pb-7 px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-11 mb-11">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-[34px] h-[34px] rounded-[9px] bg-gradient-to-br from-primary to-success flex items-center justify-center">
                <span className="text-primary-foreground font-black text-sm font-outfit">LN</span>
              </div>
              <div className="font-extrabold text-[17px] text-foreground">Logistics<span className="text-success">Now</span></div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[260px] mb-4">
              Logistics Intelligence & Ratings Ecosystem. The Digital Backbone of India's Freight Industry.
            </p>
            <div className="text-xs text-muted-foreground/40">A LogisticsNow Product · Flipkart-Backed</div>
          </div>
          {[
            { title: "Platform", links: ["For Shippers", "For Carriers", "Intelligence", "Benchmarking", "Optimisation"] },
            { title: "Company", links: ["About Us", "Vision", "Customers", "Investors", "Careers", "News & Events"] },
            { title: "Contact", links: ["Request Demo", "lorri@logisticsnow.in", "+91-9867773508", "Mulund West, Mumbai"] },
          ].map((col, i) => (
            <div key={i}>
              <div className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase mb-4">{col.title}</div>
              <div className="flex flex-col gap-2.5">
                {col.links.map((l, j) => (
                  <span key={j} className="text-[13px] text-muted-foreground/50 cursor-pointer hover:text-foreground transition-colors">{l}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="pt-[22px] border-t border-border-subtle flex justify-between flex-wrap gap-2.5">
          <span className="text-xs text-muted-foreground/40">© 2025 LogisticsNow Private Limited. All rights reserved.</span>
          <div className="flex gap-[22px]">
            {["Privacy Policy", "Terms of Use", "Sitemap"].map((l) => (
              <span key={l} className="text-xs text-muted-foreground/40 cursor-pointer hover:text-foreground transition-colors">{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
