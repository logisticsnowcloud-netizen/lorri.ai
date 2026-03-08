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
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % 4), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="about" className="bg-background py-[100px] px-8 max-md:py-16 max-md:px-4">
      <div className="max-w-[860px] mx-auto text-center">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[20px] text-[11px] font-bold tracking-wider uppercase bg-primary/[0.15] border border-border text-accent mb-5">
          Client Voices
        </div>
        <h2 className="text-[2.6rem] max-md:text-[2rem] font-black text-foreground tracking-tight mb-[52px]">What Industry Leaders Say</h2>
        <div className="relative min-h-[240px]">
          {quotes.map((q, i) => (
            <div key={i} className={`${i === active ? "relative" : "absolute"} top-0 left-0 right-0 transition-all duration-500`}
              style={{ opacity: i === active ? 1 : 0, transform: i === active ? "translateY(0)" : "translateY(14px)", pointerEvents: i === active ? "auto" : "none" }}>
              <div className="p-[36px_44px] max-md:p-6 bg-card border-[1.5px] border-border rounded-3xl">
                <div className="text-primary/45 mb-4 flex justify-start"><Quote /></div>
                <p className="text-[19px] max-md:text-base font-medium text-foreground leading-relaxed mb-6 italic">"{q.text}"</p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-extrabold text-primary-foreground text-sm">{q.role[0]}</div>
                  <div className="text-left">
                    <div className="font-bold text-sm text-foreground">{q.role}</div>
                    <div className="text-xs text-success font-semibold">{q.co}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-7">
          {quotes.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} className={`h-2 rounded-sm border-none cursor-pointer transition-all p-0 ${i === active ? "w-7 bg-primary" : "w-2 bg-primary/30"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
