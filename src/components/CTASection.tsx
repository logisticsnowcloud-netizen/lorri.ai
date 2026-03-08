import { useState } from "react";
import { Check, Arrow } from "./Icons";

export default function CTASection() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", type: "shipper" });
  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <section id="cta" className="bg-bg-alt py-[100px] px-8 relative overflow-hidden max-md:py-16 max-md:px-4">
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none" style={{ background: "radial-gradient(ellipse,hsl(246 44% 36% / 0.18) 0%,transparent 65%)" }} />
      <div className="max-w-[1100px] mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[20px] text-[11px] font-bold tracking-wider uppercase bg-success/[0.12] border border-success/30 text-success mb-[22px]">
              Get Started Today
            </div>
            <h2 className="text-[2.6rem] max-md:text-[2rem] font-black text-foreground tracking-tight leading-[1.1] mb-5">
              Experience the<br /><span className="text-primary">LoRRI Difference</span>
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              Join India's most reputed companies that trust LoRRI for logistics intelligence, benchmarking, and procurement.
            </p>
            <div className="flex flex-col gap-[13px] mb-9">
              {["Access the National Freight Benchmark", "Guaranteed cost reduction results", "Full platform integration in days", "Dedicated onboarding support"].map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-[22px] h-[22px] rounded-full bg-success/[0.12] border border-success/30 flex items-center justify-center shrink-0">
                    <Check color="#54AF3A" size={11} />
                  </div>
                  <span className="text-[15px] text-muted-foreground">{f}</span>
                </div>
              ))}
            </div>
            <div className="p-5 px-6 bg-card border border-border-subtle rounded-[14px]">
              <div className="text-[10px] text-muted-foreground tracking-widest uppercase mb-2">Reach Us Directly</div>
              <div className="text-sm text-accent mb-1">lorri@logisticsnow.in</div>
              <div className="text-sm text-muted-foreground mb-1.5">+91-9867773508</div>
              <div className="text-[13px] text-muted-foreground/60">409, Neptune's Flying Colors, Mulund West, Mumbai 400080</div>
            </div>
          </div>
          <div className="bg-card border-[1.5px] border-border rounded-3xl p-9 max-md:p-6">
            {sent ? (
              <div className="text-center py-10">
                <div className="text-[52px] mb-4">🎉</div>
                <h3 className="text-[22px] font-extrabold text-foreground mb-3">Demo Requested!</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">Our team will reach out within 24 hours.</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-extrabold text-foreground mb-1.5">Schedule a Free Demo</h3>
                <p className="text-sm text-muted-foreground mb-[22px]">We'll show you how LoRRI transforms your logistics.</p>
                <div className="flex gap-2.5 mb-[18px]">
                  {[
                    { v: "shipper", l: "🏭 Shipper", c: "primary" },
                    { v: "carrier", l: "🚛 Carrier", c: "success" },
                  ].map((b) => (
                    <button key={b.v} onClick={() => set("type", b.v)}
                      className={`flex-1 py-2.5 rounded-[9px] font-outfit text-[13px] font-semibold cursor-pointer transition-all ${form.type === b.v ? `bg-${b.c}/20 border-[1.5px] border-${b.c} text-foreground` : "bg-transparent border-[1.5px] border-border-subtle text-muted-foreground"}`}>
                      {b.l}
                    </button>
                  ))}
                </div>
                {[
                  { k: "name", p: "Your full name", l: "Full Name" },
                  { k: "company", p: "Your company", l: "Company" },
                  { k: "email", p: "you@company.com", l: "Email" },
                  { k: "phone", p: "+91 XXXXX XXXXX", l: "Phone" },
                ].map((f) => (
                  <div key={f.k} className="mb-3.5">
                    <label className="text-[11px] text-muted-foreground font-bold tracking-wider block mb-1.5 uppercase">{f.l}</label>
                    <input
                      className="w-full bg-card-alt border border-border rounded-[9px] px-3.5 py-[11px] text-foreground font-outfit text-sm outline-none focus:border-primary focus:shadow-[0_0_0_3px_hsl(246_44%_36%/0.12)] transition-all placeholder:text-muted-foreground/50"
                      value={form[f.k as keyof typeof form]}
                      onChange={(e) => set(f.k, e.target.value)}
                      placeholder={f.p}
                    />
                  </div>
                ))}
                <button onClick={() => { if (form.name && form.email) setSent(true); }}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-br from-primary to-primary-glow text-primary-foreground border-none py-3.5 rounded-lg font-outfit text-[15px] font-bold cursor-pointer tracking-wider uppercase shadow-[0_4px_20px_hsl(246_44%_36%/0.45)] hover:-translate-y-0.5 transition-all mt-1.5">
                  Request My Demo <Arrow />
                </button>
                <p className="text-[11px] text-muted-foreground text-center mt-2.5 leading-relaxed">By submitting, you consent to us contacting you about your demo.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
