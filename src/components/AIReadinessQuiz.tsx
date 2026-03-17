import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDemoModal } from "@/hooks/use-demo-modal";

const questions = [
  {
    question: "What's your biggest logistics pain point right now?",
    options: ["High delivery costs", "Poor visibility & tracking", "Inventory inaccuracy", "Carrier performance"],
  },
  {
    question: "How many shipments do you process monthly?",
    options: ["Under 10,000", "10K – 100K", "100K – 1M", "1M+"],
  },
  {
    question: "What best describes your current tech stack?",
    options: ["Mostly manual / Excel", "Basic TMS / WMS", "Integrated ERP + TMS", "AI-augmented platform"],
  },
  {
    question: "Your primary goal for the next 12 months?",
    options: ["Reduce logistics cost", "Improve customer experience", "Scale to new markets", "Build supply chain resilience"],
  },
];

const scoreMap: Record<number, number[]> = {
  0: [15, 20, 18, 22],
  1: [10, 18, 23, 25],
  2: [8, 15, 22, 30],
  3: [20, 18, 22, 15],
};

const getResult = (score: number) => {
  if (score < 45) return { stage: "Early Stage", message: "Start with LoRRI benchmarking to identify quick wins. Our platform can automate 60% of your manual processes within 30 days." };
  if (score < 65) return { stage: "Developing Stage", message: "You have a solid foundation. Adding AI-driven route optimization and DemandPulse forecasting could cut costs by 15–25%." };
  if (score < 85) return { stage: "Growth Stage", message: "You're poised for transformation. LoRRI routing + DemandPulse forecasting would deliver measurable ROI within 90 days." };
  return { stage: "Advanced Stage", message: "You're an AI leader. Our enterprise APIs and custom models can push your competitive advantage even further." };
};

export default function AIReadinessQuiz() {
  const openDemoModal = useDemoModal();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const totalSteps = questions.length;
  const isResult = step >= totalSteps;

  const totalScore = answers.reduce((sum, ans, idx) => sum + (scoreMap[idx]?.[ans] ?? 0), 0);
  const result = getResult(totalScore);

  const handleSelect = (optIdx: number) => {
    setSelectedOption(optIdx);
    setTimeout(() => {
      setAnswers([...answers, optIdx]);
      setStep(step + 1);
      setSelectedOption(null);
    }, 300);
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setSelectedOption(null);
  };

  return (
    <section style={{ padding: "16px 24px", background: "var(--bg)" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        {/* Badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 10 }}>
          <span style={{ width: 28, height: 3, borderRadius: 2, background: "linear-gradient(90deg, #393185, #4D44A8)" }} />
          <span style={{ fontFamily: "Outfit, sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase" as const, color: "#4D44A8" }}>Interactive Tool</span>
        </div>

        {/* Title */}
        <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 800, lineHeight: 1.15, color: "var(--text)", marginBottom: 8 }}>
          Assess Your Logistics{" "}
          <span style={{ background: "linear-gradient(135deg, #393185, #4D44A8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AI Readiness</span>
        </h2>
        <p style={{ fontFamily: "Outfit, sans-serif", fontSize: 15, color: "var(--text3)", marginBottom: 40, margin: "0 auto 40px" }}>
          Answer {totalSteps} questions. Get an instant benchmark and personalized recommendation.
        </p>

        {/* Card */}
        <div style={{
          background: "var(--card2)",
          border: "1px solid var(--borderSm)",
          borderRadius: 16,
          padding: "36px 32px 40px",
          minHeight: 280,
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Progress bar */}
          {!isResult && (
            <div style={{ display: "flex", gap: 4, marginBottom: 32 }}>
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div key={i} style={{
                  flex: 1, height: 4, borderRadius: 2,
                  background: i < step
                    ? "linear-gradient(90deg, #393185, #1AA6DF)"
                    : i === step
                      ? "linear-gradient(90deg, #393185, #1AA6DF)"
                      : "var(--purpleLt)",
                  opacity: i <= step ? 1 : 0.4,
                  transition: "all .4s ease",
                }} />
              ))}
            </div>
          )}

          {isResult && (
            <div style={{ marginBottom: 8 }}>
              <div style={{ height: 4, borderRadius: 2, background: "linear-gradient(90deg, #393185, #1AA6DF)", marginBottom: 32 }} />
            </div>
          )}

          <AnimatePresence mode="wait">
            {!isResult ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
              >
                <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 24, textAlign: "left" }}>
                  {questions[step].question}
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {questions[step].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        fontSize: 14,
                        fontWeight: 500,
                        padding: "16px 12px",
                        borderRadius: 12,
                        border: selectedOption === idx ? "2px solid #4D44A8" : "1px solid var(--borderSm)",
                        background: selectedOption === idx ? "rgba(57, 49, 133, 0.15)" : "transparent",
                        color: "var(--text2)",
                        cursor: "pointer",
                        transition: "all .2s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (selectedOption !== idx) {
                          e.currentTarget.style.borderColor = "rgba(57, 49, 133, 0.5)";
                          e.currentTarget.style.background = "rgba(57, 49, 133, 0.08)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedOption !== idx) {
                          e.currentTarget.style.borderColor = "var(--borderSm)";
                          e.currentTarget.style.background = "transparent";
                        }
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{ textAlign: "center" }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  style={{ fontSize: 72, fontWeight: 900, fontFamily: "Outfit, sans-serif", background: "linear-gradient(135deg, #393185, #1AA6DF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 8 }}
                >
                  {totalScore}
                </motion.div>
                <p style={{ fontFamily: "Outfit, sans-serif", fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>
                  AI Readiness Score — {result.stage}
                </p>
                <p style={{ fontFamily: "Outfit, sans-serif", fontSize: 14, color: "var(--text3)", marginBottom: 28, maxWidth: 420, margin: "0 auto 28px" }}>
                  {result.message}
                </p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                  <button
                    onClick={() => openDemoModal()}
                    style={{
                      fontFamily: "Outfit, sans-serif", fontSize: 14, fontWeight: 700,
                      padding: "12px 28px", borderRadius: 10, border: "none",
                      background: "linear-gradient(135deg, #393185, #4D44A8)", color: "#fff",
                      cursor: "pointer", boxShadow: "0 4px 20px rgba(57,49,133,0.4)",
                    }}
                  >
                    Get My Custom Roadmap →
                  </button>
                  <button
                    onClick={reset}
                    style={{
                      fontFamily: "Outfit, sans-serif", fontSize: 14, fontWeight: 600,
                      padding: "12px 28px", borderRadius: 10,
                      border: "1px solid var(--borderSm)", background: "transparent",
                      color: "var(--text2)", cursor: "pointer",
                    }}
                  >
                    Retake Assessment
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
