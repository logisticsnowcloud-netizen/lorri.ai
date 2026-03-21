import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { google, outlook, ics } from "calendar-link";

const API_URL = "https://production.lorri.in/api/apilorri/log";

const sources = ["Google Search", "Social Media", "Referral from an Existing Customer", "Industry Event", "Other"];

const TEAM_EMAILS = [
  "connect@logisticsnow.in",
  "raj@logisticsnow.in",
  "associate@logisticsnow.in",
  "sale@thelogisticsnow.com",
];

const CC_EMAILS = [
  "associate@logisticsnow.in",
  "raj@logisticsnow.in",
  "sales@thelogisticsnow.com",
  "smeet@thelogisticsnow.com",
  "partner@logisticsnow.in",
  "shaleen@lorri.in",
];

const RESTRICTED_DOMAINS = [
  "gmail.com", "yahoo.com", "yahoo.co.in", "hotmail.com", "outlook.com",
  "rediffmail.com", "live.com", "msn.com", "aol.com", "icloud.com",
];

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
  return /^\+?[\d\s-]{7,15}$/.test(phone);
}

function getDefaultDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

function getDefaultTime() {
  const d = new Date();
  const h = (d.getHours() + 1) % 24;
  return `${h.toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

export function useDemoModal() {
  const [open, setOpen] = useState(false);
  return { open, openModal: () => setOpen(true), closeModal: () => setOpen(false) };
}

export default function DemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [calMenuOpen, setCalMenuOpen] = useState(false);
  const calBtnRef = useRef<HTMLButtonElement>(null);
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "", email: "", company: "", designation: "", phone: "", source: "",
    date: getDefaultDate(), time: getDefaultTime(), updates: true,
  });
  const set = (k: string, v: string | boolean) => setForm(p => ({ ...p, [k]: v }));

  const mailingList = [
    "connect@logisticsnow.in",
    "raj@logisticsnow.in",
    "associate@logisticsnow.in",
  ];

  const getCalendarEvent = () => {
    const [year, month, day] = form.date.split("-").map(Number);
    const [hour, minute] = form.time.split(":").map(Number);
    const jsDate = new Date(year, month - 1, day, hour, minute, 0);
    return {
      title: "Lorri Demo",
      description: "Join the zoom meeting here - https://us02web.zoom.us/j/3115035961",
      start: jsDate.toISOString(),
      guests: mailingList,
      to: mailingList,
      location: "LogisticsNow",
      duration: [1, "hour"] as any,
    };
  };

  const downloadIcsFile = () => {
    const event = getCalendarEvent();
    const icsResponse = ics(event);
    const downloadLink = document.createElement("a");
    downloadLink.setAttribute("href", icsResponse);
    downloadLink.setAttribute("download", "Lorri-Demo.ics");
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const openInOutlook = () => {
    const event = getCalendarEvent();
    const outlookResponse = outlook(event);
    const toParam = mailingList.map(e => encodeURIComponent(e)).join("%2C");
    window.open(`${outlookResponse}&to=${toParam}&cc=${toParam}`, "_blank");
  };

  const openInGoogleCalendar = () => {
    const event = getCalendarEvent();
    const googleResponse = google(event);
    window.open(googleResponse, "_blank");
  };

  const handleCalendarAction = async (action: () => void) => {
    if (!validate()) return;
    setCalMenuOpen(false);
    action();
    // Also send emails
    setLoading(true);
    try {
      await Promise.all([sendTeamEmails(), sendMeetingInvite()]);
      setSent(true);
      toast({ title: "Success!", description: "Demo request sent & calendar event created." });
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const validate = (): boolean => {
    if (!form.email || !isValidEmail(form.email)) {
      toast({ title: "Invalid Email", description: "Please enter a valid email address.", variant: "destructive" });
      return false;
    }
    const domain = form.email.split("@")[1]?.toLowerCase();
    if (domain && RESTRICTED_DOMAINS.includes(domain)) {
      toast({ title: "Company Email Required", description: "Please enter a company email address.", variant: "destructive" });
      return false;
    }
    if (!form.phone || !isValidPhone(form.phone)) {
      toast({ title: "Invalid Phone", description: "Please enter a valid contact number.", variant: "destructive" });
      return false;
    }
    if (!form.date || !form.time) {
      toast({ title: "Date/Time Required", description: "Please select date and time for demo.", variant: "destructive" });
      return false;
    }
    return true;
  };

  const sendTeamEmails = async () => {
    const getBody = (toEmail: string) => ({
      from_email: "lorri@logisticsnow.in",
      user_type: "company",
      subject: `Demo Request for LoRRI ${form.name ? `( Name - ${form.name}` : ""}${form.company ? ` & Company Name- ${form.company}` : ""}${form.name ? " )" : ""}`,
      to_email: toEmail,
      content: `Demo Requested by ${form.name ? `Name - ${form.name} ` : ""}${form.company ? `Company Name - ${form.company} ` : ""}${form.designation ? `Designation - ${form.designation} ` : ""} Contact Email-${form.email} Contact Number - ${form.phone} Date - ${form.date} Time - ${form.time} Heard From - ${form.source}  Newsletter - ${form.updates ? "Yes" : "NO"}`,
      email_status: "Pending",
      activity: "Email Request",
    });

    await Promise.all(
      TEAM_EMAILS.map(mail =>
        fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(getBody(mail)),
        }).catch(err => console.error(err))
      )
    );
  };

  const sendMeetingInvite = async () => {
    const body = {
      type: "superlaunch",
      activity: "New Enquiry Email Request",
      mail_status: "Pending",
      from_email: "connect@logisticsnow.in",
      user_type: "company",
      subject: "LoRRI Demo scheduled",
      timestamp: new Date().toISOString(),
      to_email: form.email,
      cc: CC_EMAILS,
      content: `
        <div><span>Dear ${form.name || "User"}</span></div>
        <br/>
        <div>
        <span>
        Team LoRRI is inviting you to a scheduled Zoom meeting.<br/>
        <br/>
        Topic: LoRRI SCHEDULE MEETING <br/>
        <br/>
        Scheduled Date and Time: Date-${form.date}, Time-${form.time}<br/>
        <br/>
        Join Zoom Meeting <br/>
        <br/>
        <a href="https://us02web.zoom.us/j/3115035961" target="_blank" rel="noopener noreferrer">https://us02web.zoom.us/j/3115035961</a> <br/>
        
        Meeting ID: 3115035961 <br/>
        </span>
        </div>
        <br/>
        Warm Regards,<br/> 
        Team LoRRI.
        <br/>
        <div>
        The information contained in this electronic message and any attachments to this message are intended for
        the exclusive use of the addressee(s) and may contain proprietary, confidential or privileged information. 
        If you are not the intended recipient, you should not disseminate, distribute or copy this e-mail. 
        Please notify the sender immediately and destroy all copies of this message and any attachments contained in it.
        </div>`,
    };

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      await Promise.all([sendTeamEmails(), sendMeetingInvite()]);
      setSent(true);
      toast({ title: "Success!", description: "Demo request sent successfully." });
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

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
        position: "relative", width: "100%", maxWidth: 620, maxHeight: "90vh", overflowY: "auto", overflow: "visible",
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
                <input type="date" value={form.date} onChange={e => set("date", e.target.value)} min={getDefaultDate()} style={inputStyle} />
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
              <button onClick={handleSubmit} disabled={loading}
                style={{
                  padding: "14px 20px", background: "linear-gradient(135deg,#393185,#4D44A8)", color: "#fff",
                  border: "none", borderRadius: 8, fontFamily: "Outfit,sans-serif", fontSize: 14, fontWeight: 700,
                  cursor: loading ? "not-allowed" : "pointer", letterSpacing: ".05em", textTransform: "uppercase" as const,
                  boxShadow: "0 4px 20px rgba(57,49,133,0.4)", opacity: loading ? 0.7 : 1,
                }}>{loading ? "SENDING..." : "SCHEDULE DEMO"}</button>
              <div style={{ position: "relative" }}>
                <button
                  ref={calBtnRef}
                  onClick={() => setCalMenuOpen(prev => !prev)}
                  disabled={loading}
                  style={{
                    width: "100%", padding: "14px 20px", background: "transparent", color: "var(--text2)",
                    border: "1px solid var(--border)", borderRadius: 8, fontFamily: "Outfit,sans-serif",
                    fontSize: 14, fontWeight: 700, cursor: "pointer", letterSpacing: ".05em",
                    textTransform: "uppercase" as const, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  }}>📅 ADD TO CALENDAR</button>
                {calMenuOpen && (
                  <div style={{
                    position: "absolute", bottom: "calc(100% + 8px)", left: 0, right: 0,
                    background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10,
                    boxShadow: "0 8px 30px rgba(0,0,0,0.3)", overflow: "hidden", zIndex: 10,
                  }}>
                    <button onClick={() => handleCalendarAction(downloadIcsFile)} style={{
                      width: "100%", padding: "12px 16px", background: "transparent", border: "none",
                      color: "var(--text)", fontSize: 13, fontFamily: "Outfit,sans-serif", cursor: "pointer",
                      textAlign: "left", display: "flex", alignItems: "center", gap: 10,
                    }} onMouseOver={e => (e.currentTarget.style.background = "var(--accent)")}
                      onMouseOut={e => (e.currentTarget.style.background = "transparent")}>
                      📥 Download ICS File
                    </button>
                    <button onClick={() => handleCalendarAction(openInGoogleCalendar)} style={{
                      width: "100%", padding: "12px 16px", background: "transparent", border: "none",
                      color: "var(--text)", fontSize: 13, fontFamily: "Outfit,sans-serif", cursor: "pointer",
                      textAlign: "left", display: "flex", alignItems: "center", gap: 10,
                    }} onMouseOver={e => (e.currentTarget.style.background = "var(--accent)")}
                      onMouseOut={e => (e.currentTarget.style.background = "transparent")}>
                      📆 Open in Google Calendar
                    </button>
                    <button onClick={() => handleCalendarAction(openInOutlook)} style={{
                      width: "100%", padding: "12px 16px", background: "transparent", border: "none",
                      color: "var(--text)", fontSize: 13, fontFamily: "Outfit,sans-serif", cursor: "pointer",
                      textAlign: "left", display: "flex", alignItems: "center", gap: 10,
                    }} onMouseOver={e => (e.currentTarget.style.background = "var(--accent)")}
                      onMouseOut={e => (e.currentTarget.style.background = "transparent")}>
                      📧 Open in Outlook
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
