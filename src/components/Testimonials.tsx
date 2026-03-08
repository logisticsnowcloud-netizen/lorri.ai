import { useState, useEffect } from "react";
import { Quote } from "./Icons";

const quotes = [
  { text: "LoRRI will organise the fragmented logistics industry. This is the future of freight procurement in India.", role: "Head of Supply Chain", co: "Fortune 500 Company" },
  { text: "End to end one-stop solution. Great integration of technology — provides access, intelligence, drives cost savings and enhances services.", role: "Head of Supply Chain", co: "Leading MNC" },
  { text: "Very well designed and covers all major pain points. Such a system will drive real change in the industry.", role: "Head of Supply Chain", co: "Fortune 500 Company" },
  { text: "Informative platform with huge potential. This is exactly what Indian logistics has been waiting for.", role: "Head of Supply Chain", co: "Leading MNC" },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  useEffect(() => { const t = setInterval(() => setActive(a => (a + 1) % 4), 4500); return () => clearInterval(t); }, []);

  return (
    <section style={{ background: "var(--bg)", padding: "60px 32px" }} className="max-md:py-10 max-md:px-4">
      <div style={{ maxWidth: 840, margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", background: "var(--purpleLt)", border: "1px solid var(--border)", color: "#B1D0EF", marginBottom: 18 }}>Client Voices</div>
        <h2 style={{ fontSize: "2.5rem", fontWeight: 900, color: "var(--text)", letterSpacing: "-0.03em", marginBottom: 50 }} className="max-md:!text-[1.9rem]">What Industry Leaders Say</h2>
        <div style={{ position: "relative", minHeight: 240 }}>
          {quotes.map((q, i) => (
            <div key={i} style={{ position: i === active ? "relative" : "absolute", top: 0, left: 0, right: 0, opacity: i === active ? 1 : 0, transform: i === active ? "translateY(0)" : "translateY(12px)", transition: "all .5s ease", pointerEvents: i === active ? "auto" : "none" }}>
              <div style={{ padding: "34px 42px", background: "var(--card)", border: "1.5px solid var(--border)", borderRadius: 22 }}>
                <div style={{ color: "#393185", marginBottom: 14, opacity: 0.4, display: "flex", justifyContent: "flex-start" }}><Quote /></div>
                <p style={{ fontSize: 18, fontWeight: 500, color: "var(--text)", lineHeight: 1.7, marginBottom: 22, fontStyle: "italic" }}>"{q.text}"</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#393185,#1AA6DF)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "white", fontSize: 13 }}>{q.role[0]}</div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{q.role}</div>
                    <div style={{ fontSize: 12, color: "#54AF3A", fontWeight: 600 }}>{q.co}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 26 }}>
          {quotes.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} style={{ width: i === active ? 26 : 8, height: 8, borderRadius: 4, background: i === active ? "#393185" : "var(--border)", border: "none", cursor: "pointer", transition: "all .3s", padding: 0 }} />
          ))}
        </div>
      </div>
    </section>
  );
}
