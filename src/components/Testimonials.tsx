import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { Quote } from "./Icons";

const quotes = [
  { text: "LoRRI will organise the fragmented logistics industry. This is the future of freight procurement in India.", role: "Head of Supply Chain", co: "Fortune 500 Company" },
  { text: "End to end one-stop solution. Great integration of technology — provides access, intelligence, drives cost savings and enhances services.", role: "Head of Supply Chain", co: "Leading MNC" },
  { text: "Very well designed and covers all major pain points. Such a system will drive real change in the industry.", role: "Head of Supply Chain", co: "Fortune 500 Company" },
  { text: "Informative platform with huge potential. This is exactly what Indian logistics has been waiting for.", role: "Head of Supply Chain", co: "Leading MNC" },
];

const videoTestimonials = [
  { name: "Apollo Tyres Limited (Global)", person: "Mr. Parmeshwaran Iyer", title: "Chief Supply Chain Officer", videoId: "hwRp72mT18E", domain: "apollotyres.com" },
  { name: "Jyothy Labs Ltd.", person: "Mr. Ananth Rao", title: "Head – Operations", videoId: "T1sUqxHzX9c", domain: "jyothylabs.com" },
  { name: "Perfetti Van Melle (India)", person: "Mr. Vaseem Ahamad", title: "Associate Director, Logistics & Warehousing", videoId: "akFrzBqu-d0", domain: "perfettivanmelle.com" },
  { name: "MIRC Electronics (Onida)", person: "Mr. Nilesh Patil", title: "VP – Global Supply Chain", videoId: "77_eYlVvehE", domain: "onida.com" },
  { name: "Saint-Gobain India", person: "Mr. Shekhar Kulkarni", title: "SCM Head", videoId: "dChAh9biv0c", domain: "saint-gobain.co.in" },
  { name: "New Darbar Transport", person: "Mr. Jatindra Vohra", title: "Director", videoId: "5jc7YnwtlwQ", domain: "newdarbartransport.com" },
];

function VideoCard({ v }: { v: typeof videoTestimonials[0] }) {
  return (
    <a href={`https://www.youtube.com/watch?v=${v.videoId}`} target="_blank" rel="noopener noreferrer" className="group block" style={{ textDecoration: "none" }}>
      <div style={{ borderRadius: 16, overflow: "hidden", background: "var(--card)", border: "1.5px solid var(--border)", transition: "all .3s ease" }} className="group-hover:scale-[1.02] group-hover:shadow-[0_8px_32px_rgba(57,49,133,0.25)]">
        <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden", background: "#0a0a1a" }}>
          <img src={`https://img.youtube.com/vi/${v.videoId}/hqdefault.jpg`} alt={v.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .4s ease" }} className="group-hover:scale-110" />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.25)", transition: "background .3s" }} className="group-hover:!bg-black/40">
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(135deg, #FF0000, #CC0000)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(255,0,0,0.4)", transition: "transform .3s" }} className="group-hover:scale-110">
              <Play size={22} fill="white" color="white" style={{ marginLeft: 2 }} />
            </div>
          </div>
        </div>

        <div style={{ padding: "14px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <img src={`https://www.google.com/s2/favicons?domain=${v.domain}&sz=32`} alt="" style={{ width: 20, height: 20, borderRadius: 4 }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", lineHeight: 1.2 }}>{v.name}</span>
          </div>
          <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.45, margin: 0 }}>
            {v.person} — {v.title}
          </p>
        </div>
      </div>
    </a>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % 4), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="px-4 py-4 sm:px-6 lg:px-8" style={{ background: "var(--bg)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 20, fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", background: "var(--purpleLt)", border: "1px solid var(--border)", color: "#B1D0EF", marginBottom: 8 }}>Client Voices</div>
        <h2 style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--text)", letterSpacing: "-0.03em", marginBottom: 6 }} className="text-[1.4rem] sm:text-[1.5rem] lg:text-[1.6rem]">What Industry Leaders Say</h2>
        <p style={{ fontSize: 15, color: "var(--text2)", marginBottom: 8 }}>Freight Savings in excess of <strong style={{ color: "#54AF3A" }}>$21 Mn</strong> and growing!</p>

        <div style={{ maxWidth: 840, margin: "0 auto 24px" }}>
          <div style={{ position: "relative", minHeight: 190 }} className="sm:min-h-[170px]">
            {quotes.map((q, i) => (
              <div key={i} style={{ position: i === active ? "relative" : "absolute", top: 0, left: 0, right: 0, opacity: i === active ? 1 : 0, transform: i === active ? "translateY(0)" : "translateY(12px)", transition: "all .5s ease", pointerEvents: i === active ? "auto" : "none" }}>
                <div style={{ padding: "18px 18px 20px", background: "var(--card)", border: "1.5px solid var(--border)", borderRadius: 16 }} className="sm:px-7">
                  <div style={{ color: "#393185", marginBottom: 14, opacity: 0.4, display: "flex", justifyContent: "flex-start" }}><Quote /></div>
                  <p style={{ fontSize: 14, fontWeight: 500, color: "var(--text)", lineHeight: 1.6, marginBottom: 14, fontStyle: "italic" }}>
                    "{q.text}"
                  </p>
                  <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#393185,#1AA6DF)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "white", fontSize: 13 }}>{q.role[0]}</div>
                    <div className="text-center sm:text-left">
                      <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{q.role}</div>
                      <div style={{ fontSize: 12, color: "#54AF3A", fontWeight: 600 }}>{q.co}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 12 }}>
            {quotes.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} style={{ width: i === active ? 26 : 8, height: 8, borderRadius: 4, background: i === active ? "#393185" : "var(--border)", border: "none", cursor: "pointer", transition: "all .3s", padding: 0 }} />
            ))}
          </div>
        </div>

        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 20, fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", background: "var(--greenLt)", border: "1px solid rgba(84,175,58,0.3)", color: "#54AF3A", marginBottom: 12 }}>
          <Play size={12} /> Case Study Videos
        </div>
        <div className="grid grid-cols-1 gap-4 text-left sm:grid-cols-2 xl:grid-cols-3">
          {videoTestimonials.map((v, i) => <VideoCard key={i} v={v} />)}
        </div>
      </div>
    </section>
  );
}
