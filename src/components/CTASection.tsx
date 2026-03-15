import { useState } from "react";
import { Check, Arrow } from "./Icons";

export default function CTASection() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", type: "shipper" });
  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  return (
    <section id="cta" style={{ background: "var(--bg2)", padding: "28px 32px", position: "relative", overflow: "hidden" }} className="max-md:py-6 max-md:px-4">
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 600, height: 400, background: "radial-gradient(ellipse,rgba(57,49,133,0.12) 0%,transparent 65%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }} className="max-md:!grid-cols-1">
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", background: "var(--greenLt)", border: "1px solid rgba(84,175,58,0.3)", color: "#54AF3A", marginBottom: 20 }}>Get Started Today</div>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 900, color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 18 }} className="max-md:!text-[1.9rem]">
              Experience the<br /><span style={{ color: "#393185" }}>LoRRI Difference</span>
            </h2>
            <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.8, marginBottom: 28 }}>Join India's most reputed companies that trust LoRRI for logistics intelligence, benchmarking, and procurement.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {["Access the National Freight Benchmark", "Guaranteed cost reduction results", "Full platform integration in days", "Dedicated onboarding support"].map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: "var(--greenLt)", border: "1px solid rgba(84,175,58,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Check color="#54AF3A" size={11} /></div>
                  <span style={{ fontSize: 14, color: "var(--text2)" }}>{f}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: "18px 22px", background: "var(--card)", border: "1px solid var(--borderSm)", borderRadius: 14 }}>
              <div style={{ fontSize: 10, color: "var(--text3)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>Reach Us Directly</div>
              <div style={{ fontSize: 14, color: "#1AA6DF", marginBottom: 4 }}>lorri@logisticsnow.in</div>
              <div style={{ fontSize: 14, color: "var(--text2)", marginBottom: 5 }}>+91-9867773508</div>
              <div style={{ fontSize: 13, color: "var(--text3)" }}>409, Neptune's Flying Colors, Mulund West, Mumbai 400080</div>
            </div>
          </div>
          <div style={{ background: "var(--card)", border: "1.5px solid var(--border)", borderRadius: 22, padding: 34 }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 50, marginBottom: 14 }}>🎉</div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: "var(--text)", marginBottom: 10 }}>Demo Requested!</h3>
                <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7 }}>Our team will reach out within 24 hours.</p>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)", marginBottom: 6 }}>Schedule a Free Demo</h3>
                <p style={{ fontSize: 14, color: "var(--text2)", marginBottom: 20 }}>We'll show you how LoRRI transforms your logistics.</p>
                <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                  {[{ v: "shipper", l: "🏭 Shipper", c: "#393185", d: "var(--purpleLt)" }, { v: "carrier", l: "🚛 Carrier", c: "#54AF3A", d: "var(--greenLt)" }].map(b => (
                    <button key={b.v} onClick={() => set("type", b.v)} style={{ flex: 1, padding: 10, borderRadius: 9, border: `1.5px solid ${form.type === b.v ? b.c : "var(--border)"}`, background: form.type === b.v ? b.d : "transparent", color: form.type === b.v ? "var(--text)" : "var(--text2)", fontFamily: "Outfit,sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .2s" }}>{b.l}</button>
                  ))}
                </div>
                {[{ k: "name", p: "Your full name", l: "Full Name" }, { k: "company", p: "Your company", l: "Company" }, { k: "email", p: "you@company.com", l: "Email" }, { k: "phone", p: "+91 XXXXX XXXXX", l: "Phone" }].map(f => (
                  <div key={f.k} style={{ marginBottom: 12 }}>
                    <label style={{ fontSize: 11, color: "var(--text2)", fontWeight: 700, letterSpacing: ".06em", display: "block", marginBottom: 5, textTransform: "uppercase" }}>{f.l}</label>
                    <input
                      value={form[f.k as keyof typeof form]} onChange={e => set(f.k, e.target.value)} placeholder={f.p}
                      style={{ width: "100%", background: "var(--inputBg)", border: "1px solid var(--border)", borderRadius: 9, padding: "11px 14px", color: "var(--text)", fontFamily: "Outfit,sans-serif", fontSize: 14, outline: "none" }}
                    />
                  </div>
                ))}
                <button onClick={() => { if (form.name && form.email) setSent(true); }}
                  style={{ width: "100%", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, background: "linear-gradient(135deg,#393185,#4D44A8)", color: "#fff", border: "none", padding: 14, borderRadius: 8, fontFamily: "Outfit,sans-serif", fontSize: 15, fontWeight: 700, cursor: "pointer", letterSpacing: ".05em", textTransform: "uppercase" as const, boxShadow: "0 4px 20px rgba(57,49,133,0.4)", marginTop: 4 }}>
                  Request My Demo <Arrow />
                </button>
                <p style={{ fontSize: 11, color: "var(--text3)", textAlign: "center", marginTop: 10, lineHeight: 1.6 }}>By submitting, you consent to us contacting you about your demo.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
