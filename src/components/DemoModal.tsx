import { useState } from "react";
import { Arrow } from "./Icons";

const sources = ["Google Search", "LinkedIn", "Industry Event", "Referral", "Other"];

export function useDemoModal() {
  const [open, setOpen] = useState(false);
  return { open, openModal: () => setOpen(true), closeModal: () => setOpen(false) };
}

export default function DemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", designation: "", phone: "", source: "", date: "", time: "", updates: true });
  const set = (k: string, v: string | boolean) => setForm(p => ({ ...p, [k]: v }));

  if (!open) return null;

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "transparent", border: "1px solid var(--border)",
    borderRadius: 8, padding: "12px 14px", color: "var(--text)", fontFamily: "Outfit,sans-serif",
    fontSize: 14, outline: "none", transition: "border-color 0.2s",
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
      onClick={onClose}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }} />
      <div style={{
        position: "relative", width: "100%", maxWidth: 620, maxHeight: "90vh", overflowY: "auto",
        background: "var(--card)", border: "1.5px solid var(--border)", borderRadius: 22, padding: "36px 32px",
        animation: "botPop .3s ease", boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
      }}
        onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16, background: "none", border: "none",
          color: "var(--text3)", fontSize: 22, cursor: "pointer", lineHeight: 1,
        }}>✕</button>

        {sent ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ fontSize: 50, marginBottom: 14 }}>🎉</div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: "var(--text)", marginBottom: 10 }}>Meeting Scheduled!</h3>
            <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.7 }}>Our team will confirm your demo within 24 hours.</p>
          </div>
        ) : (
          <>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: "#393185", textAlign: "center", marginBottom: 24, letterSpacing: "-0.02em" }}>
              SCHEDULE MEETING / DEMO NOW
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <input value={form.name} onChange={e => set("name", e.target.value)} placeholder="Name" style={inputStyle} />
              <input value={form.email} onChange={e => set("email", e.target.value)} placeholder="Organization Email" style={inputStyle} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <input value={form.company} onChange={e => set("company", e.target.value)} placeholder="Company Name" style={inputStyle} />
              <input value={form.designation} onChange={e => set("designation", e.target.value)} placeholder="Designation" style={inputStyle} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <input value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="Contact Number" style={inputStyle} />
              <select value={form.source} onChange={e => set("source", e.target.value)}
                style={{ ...inputStyle, color: form.source ? "var(--text)" : "var(--text3)", appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236a6a8a' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}>
                <option value="" disabled>How did you hear about us?</option>
                {sources.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
              <div>
                <label style={{ fontSize: 11, color: "var(--text3)", marginBottom: 4, display: "block" }}>Date</label>
                <input type="date" value={form.date} onChange={e => set("date", e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: 11, color: "var(--text3)", marginBottom: 4, display: "block" }}>Time</label>
                <input type="time" value={form.time} onChange={e => set("time", e.target.value)} style={inputStyle} />
              </div>
            </div>

            <label style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22, cursor: "pointer" }}>
              <input type="checkbox" checked={form.updates} onChange={e => set("updates", e.target.checked)}
                style={{ width: 16, height: 16, accentColor: "#393185" }} />
              <span style={{ fontSize: 13, color: "var(--text3)" }}>I would like to receive updates on latest modules and news from LoRRI.</span>
            </label>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <button onClick={() => { if (form.name && form.email) setSent(true); }}
                style={{
                  padding: "14px 20px", background: "linear-gradient(135deg,#393185,#4D44A8)", color: "#fff",
                  border: "none", borderRadius: 8, fontFamily: "Outfit,sans-serif", fontSize: 14, fontWeight: 700,
                  cursor: "pointer", letterSpacing: ".05em", textTransform: "uppercase" as const,
                  boxShadow: "0 4px 20px rgba(57,49,133,0.4)",
                }}>SCHEDULE DEMO</button>
              <button style={{
                padding: "14px 20px", background: "transparent", color: "var(--text2)",
                border: "1px solid var(--border)", borderRadius: 8, fontFamily: "Outfit,sans-serif",
                fontSize: 14, fontWeight: 700, cursor: "pointer", letterSpacing: ".05em",
                textTransform: "uppercase" as const, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}>📅 ADD TO CALENDAR</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
