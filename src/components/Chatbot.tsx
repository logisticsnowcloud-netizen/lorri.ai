import { useState, useEffect, useRef } from "react";
import { CloseIcon, BotIcon, SendIcon } from "./Icons";

const BOT_KNOWLEDGE: Record<string, string> = {
  "what is lorri": "LoRRI (Logistics Intelligence & Ratings Ecosystem) is India's AI-powered logistics intelligence platform by LogisticsNow — a Flipkart-backed company. It digitises and optimises freight procurement, benchmarking, and transport management.",
  "what does lorri do": "LoRRI provides three core capabilities: (1) Freight Intelligence — national benchmark pricing across 80,000+ routes; (2) Procurement — AI-powered carrier matching with guaranteed savings; (3) TMS — end-to-end transport management and route optimisation.",
  savings: "LoRRI clients have saved over $21 million in logistics costs. On average, shippers save 12–21% vs market rates on key lanes like Mumbai–Delhi, Pune–Ahmedabad and more.",
  carriers: "LoRRI is connected to 2,200+ verified carriers and transporters across India and globally. Each carrier has a LoRRI Reliability Score based on on-time delivery, service quality and response rate.",
  routes: "LoRRI maps 80,000+ freight routes worldwide, with deep intelligence on Indian domestic lanes and global shipping corridors.",
  procurement: "LoRRI's procurement engine runs automated tenders, matches you with AI-recommended carriers, and guarantees cost savings vs market. Over $500M in freight has been procured through the platform.",
  tms: "LoRRI's TMS gives you real-time shipment tracking, route optimisation, multi-modal planning, and performance dashboards — all in one place.",
  intelligence: "LoRRI's intelligence layer provides a National Freight Benchmark — live, data-backed pricing for every major lane. It analyses ₹2.5B+ in logistics spend to give you market visibility.",
  contact: "You can reach LoRRI at lorri@logisticsnow.in or call +91-9867773508. The office is at 409, Neptune's Flying Colors, Mulund West, Mumbai 400080.",
  demo: "To schedule a demo, click the 'Schedule Demo' button on this page or email lorri@logisticsnow.in. The team typically responds within 24 hours.",
  clients: "LoRRI is trusted by Fortune 500 companies and global industry leaders including Apollo Tyres, Maersk, Kuehne+Nagel, DSV, Shell, PepsiCo, Kimberly-Clark and more.",
  price: "LoRRI's pricing is customised based on your logistics spend volume and modules needed. Contact lorri@logisticsnow.in for a tailored proposal.",
  transporter: "Transporters can join LoRRI to access better loads, build a verified reputation, and use the AI load-matching engine. Your LoRRI Reliability Score unlocks premium freight opportunities.",
  default: "I can help you with information about LoRRI's platform, savings, carriers, routes, procurement, TMS, or how to get a demo. What would you like to know?",
};

function getBotReply(msg: string): string {
  const m = msg.toLowerCase();
  for (const [k, v] of Object.entries(BOT_KNOWLEDGE)) {
    if (m.includes(k)) return v;
  }
  if (m.includes("sav") || m.includes("cost") || m.includes("cheap")) return BOT_KNOWLEDGE.savings;
  if (m.includes("carrier") || m.includes("transport") || m.includes("truck")) return BOT_KNOWLEDGE.carriers;
  if (m.includes("route") || m.includes("lane") || m.includes("map")) return BOT_KNOWLEDGE.routes;
  if (m.includes("procure") || m.includes("tender") || m.includes("bid")) return BOT_KNOWLEDGE.procurement;
  if (m.includes("track") || m.includes("tms") || m.includes("shipment")) return BOT_KNOWLEDGE.tms;
  if (m.includes("data") || m.includes("benchmark") || m.includes("rate")) return BOT_KNOWLEDGE.intelligence;
  if (m.includes("contact") || m.includes("email") || m.includes("phone") || m.includes("office")) return BOT_KNOWLEDGE.contact;
  if (m.includes("demo") || m.includes("meeting") || m.includes("trial")) return BOT_KNOWLEDGE.demo;
  if (m.includes("client") || m.includes("customer") || m.includes("who use")) return BOT_KNOWLEDGE.clients;
  if (m.includes("price") || m.includes("plan")) return BOT_KNOWLEDGE.price;
  if (m.includes("hello") || m.includes("hi") || m.includes("hey")) return "Hi! 👋 I'm the LoRRI assistant. I can tell you about our logistics intelligence platform, freight savings, carrier network, or how to get a demo. What would you like to know?";
  return BOT_KNOWLEDGE.default;
}

const SUGGEST = ["What is LoRRI?", "How much can I save?", "How many carriers?", "Schedule a demo"];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ role: "bot", text: "Hi! I'm LoRRI's assistant 🤖\n\nAsk me about our platform, freight savings, carrier network, or how to get started!" }]);
  const [inp, setInp] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

  function send(text?: string) {
    const t = (text || inp).trim();
    if (!t) return;
    setInp("");
    setMsgs(m => [...m, { role: "user", text: t }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(m => [...m, { role: "bot", text: getBotReply(t) }]);
    }, 900 + Math.random() * 400);
  }

  return (
    <>
      {open && (
        <div style={{ position: "fixed", bottom: 100, right: 28, width: 360, background: "var(--card)", border: "1.5px solid var(--border)", borderRadius: 20, boxShadow: "0 20px 60px var(--shadow)", zIndex: 999, overflow: "hidden", animation: "botPop .3s ease both" }} className="max-md:!w-[calc(100vw-40px)] max-md:!right-5">
          {/* Header */}
          <div style={{ padding: "16px 18px", background: "linear-gradient(135deg,#393185,#1AA6DF)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}><BotIcon /></div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 14, color: "#fff" }}>LoRRI Assistant</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#54AF3A", animation: "pulse-dot 1.5s infinite" }} />Online
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%", width: 30, height: 30, cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><CloseIcon /></button>
          </div>
          {/* Messages */}
          <div style={{ height: 300, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 10, background: "var(--card)" }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  padding: "10px 14px", borderRadius: 12, maxWidth: "82%", fontSize: 13.5, lineHeight: 1.6, whiteSpace: "pre-line",
                  ...(m.role === "bot"
                    ? { background: "var(--purpleLt)", border: "1px solid var(--borderSm)", color: "var(--text)", alignSelf: "flex-start", borderBottomLeftRadius: 4 }
                    : { background: "linear-gradient(135deg,#393185,#4D44A8)", color: "#fff", alignSelf: "flex-end", borderBottomRightRadius: 4 })
                }}>{m.text}</div>
              </div>
            ))}
            {typing && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{ background: "var(--purpleLt)", border: "1px solid var(--borderSm)", borderRadius: 12, borderBottomLeftRadius: 4, display: "flex", gap: 5, alignItems: "center", padding: "12px 16px" }}>
                  {[0, 1, 2].map(i => <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "#393185", animation: `pulse-dot 1.2s ${i * 0.2}s infinite` }} />)}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
          {/* Suggestions */}
          {msgs.length <= 1 && (
            <div style={{ padding: "8px 16px", display: "flex", flexWrap: "wrap", gap: 6, background: "var(--card)" }}>
              {SUGGEST.map(s => (
                <button key={s} onClick={() => send(s)} style={{ padding: "5px 12px", borderRadius: 16, border: "1px solid var(--border)", background: "var(--purpleLt)", color: "var(--text2)", fontSize: 12, cursor: "pointer", fontFamily: "Outfit,sans-serif", transition: "all .2s" }}>{s}</button>
              ))}
            </div>
          )}
          {/* Input */}
          <div style={{ padding: "12px 14px", borderTop: "1px solid var(--border)", background: "var(--card)", display: "flex", gap: 8 }}>
            <input value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Ask about LoRRI..."
              style={{ flex: 1, background: "var(--inputBg)", border: "1px solid var(--border)", borderRadius: 20, padding: "9px 16px", color: "var(--text)", fontFamily: "Outfit,sans-serif", fontSize: 14, outline: "none" }}
            />
            <button onClick={() => send()} style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#393185,#4D44A8)", border: "none", cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <SendIcon />
            </button>
          </div>
        </div>
      )}
      <button onClick={() => setOpen(o => !o)} title="Ask LoRRI"
        style={{ position: "fixed", bottom: 28, right: 28, width: 58, height: 58, borderRadius: "50%", background: "linear-gradient(135deg,#393185,#1AA6DF)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 28px rgba(57,49,133,0.5)", zIndex: 1000, animation: "float 4s ease-in-out infinite", transition: "all .3s" }}>
        {open ? <CloseIcon /> : <BotIcon />}
      </button>
    </>
  );
}
