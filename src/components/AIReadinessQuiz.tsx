import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

const analysisSteps = [
  "Evaluating cost inefficiencies…",
  "Benchmarking against global data…",
  "Running optimization models…",
  "Generating recommendations…",
];

interface BreakdownScores {
  costEfficiency: number;
  visibility: number;
  techMaturity: number;
  carrierPerformance: number;
}

interface Insight {
  type: "warning" | "success";
  text: string;
}

interface Recommendation {
  text: string;
  saving: string;
}

const getBreakdown = (answers: number[], totalScore: number): BreakdownScores => {
  const base = totalScore;
  return {
    costEfficiency: Math.min(100, Math.max(20, base - 3 + (answers[0] === 0 ? -8 : answers[0] === 3 ? 5 : 0))),
    visibility: Math.min(100, Math.max(20, base + 3 + (answers[0] === 1 ? -10 : 0))),
    techMaturity: Math.min(100, Math.max(20, base - 10 + answers[2] * 8)),
    carrierPerformance: Math.min(100, Math.max(20, base + 1 + (answers[0] === 3 ? -6 : 3))),
  };
};

const getInsights = (breakdown: BreakdownScores, answers: number[]): Insight[] => {
  const insights: Insight[] = [];
  if (breakdown.costEfficiency < 70) insights.push({ type: "warning", text: "High procurement cost detected" });
  if (breakdown.visibility < 70) insights.push({ type: "warning", text: "Limited real-time visibility" });
  if (breakdown.techMaturity < 55) insights.push({ type: "warning", text: "Technology stack needs modernization" });
  if (breakdown.carrierPerformance >= 70) insights.push({ type: "success", text: "Strong carrier performance baseline" });
  if (answers[1] >= 2) insights.push({ type: "success", text: "Strong shipment volume advantage" });
  if (breakdown.techMaturity >= 70) insights.push({ type: "success", text: "Mature technology foundation" });
  return insights.slice(0, 4);
};

const getRecommendations = (breakdown: BreakdownScores): Recommendation[] => {
  const recs: Recommendation[] = [];
  if (breakdown.costEfficiency < 75) recs.push({ text: "Deploy AI procurement agent", saving: "save 12–18%" });
  if (breakdown.visibility < 75) recs.push({ text: "Enable real-time tracking layer", saving: "reduce delays by 22%" });
  if (breakdown.techMaturity < 65) recs.push({ text: "Introduce route optimization AI", saving: "cut transit time 15%" });
  recs.push({ text: "Enable carbon tracking module", saving: "EU-ready compliance" });
  return recs.slice(0, 3);
};

const getResult = (score: number) => {
  if (score < 45) return { stage: "Early Stage", percentile: 28 };
  if (score < 65) return { stage: "Developing Stage", percentile: 47 };
  if (score < 85) return { stage: "Growth Stage", percentile: 63 };
  return { stage: "Advanced Stage", percentile: 89 };
};

// Animated counter hook
function useCountUp(target: number, duration = 1200, start = false) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>();
  useEffect(() => {
    if (!start) { setValue(0); return; }
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      setValue(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration, start]);
  return value;
}

// Mini bar component
function ScoreBar({ label, value, delay }: { label: string; value: number; delay: number }) {
  return (
    <div style={{ textAlign: "left" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontFamily: "Outfit, sans-serif", fontSize: 12, fontWeight: 600, color: "hsl(var(--muted-foreground))" }}>{label}</span>
        <span style={{ fontFamily: "Outfit, sans-serif", fontSize: 12, fontWeight: 700, color: "hsl(var(--foreground))" }}>{value}</span>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: "hsl(var(--primary) / 0.12)", overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: "100%",
            borderRadius: 3,
            background: value >= 70 ? "linear-gradient(90deg, #1AA6DF, #26c6da)" : "linear-gradient(90deg, #393185, #4D44A8)",
          }}
        />
      </div>
    </div>
  );
}

export default function AIReadinessQuiz() {
  const openDemoModal = useDemoModal();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [phase, setPhase] = useState<"quiz" | "analyzing" | "result">("quiz");
  const [analysisStep, setAnalysisStep] = useState(0);

  const totalSteps = questions.length;
  const totalScore = answers.reduce((sum, ans, idx) => sum + (scoreMap[idx]?.[ans] ?? 0), 0);
  const result = getResult(totalScore);
  const breakdown = getBreakdown(answers, totalScore);
  const insights = getInsights(breakdown, answers);
  const recommendations = getRecommendations(breakdown);

  const animatedScore = useCountUp(totalScore, 1400, phase === "result");

  // Analysis sequence
  useEffect(() => {
    if (phase !== "analyzing") return;
    setAnalysisStep(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    analysisSteps.forEach((_, i) => {
      timers.push(setTimeout(() => setAnalysisStep(i + 1), (i + 1) * 700));
    });
    timers.push(setTimeout(() => setPhase("result"), analysisSteps.length * 700 + 600));
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  const handleSelect = (optIdx: number) => {
    setSelectedOption(optIdx);
    setTimeout(() => {
      const newAnswers = [...answers, optIdx];
      setAnswers(newAnswers);
      setSelectedOption(null);
      if (step + 1 >= totalSteps) {
        setStep(step + 1);
        setPhase("analyzing");
      } else {
        setStep(step + 1);
      }
    }, 300);
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setSelectedOption(null);
    setPhase("quiz");
    setAnalysisStep(0);
  };

  return (
    <section className="px-4 py-3 sm:px-6 lg:px-8" style={{ background: "hsl(var(--background))" }}>
      <div style={{ maxWidth: phase === "result" ? 960 : 720, margin: "0 auto", textAlign: "center", transition: "max-width 0.4s ease" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 10 }}>
          <span style={{ width: 28, height: 3, borderRadius: 2, background: "linear-gradient(90deg, #393185, #4D44A8)" }} />
          <span style={{ fontFamily: "Outfit, sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "hsl(var(--primary-glow))" }}>AI Diagnostic Engine</span>
        </div>

        <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 800, lineHeight: 1.15, color: "hsl(var(--foreground))", marginBottom: 8 }}>
          Assess Your Logistics <span style={{ background: "linear-gradient(135deg, #393185, #4D44A8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AI Readiness</span>
        </h2>
        <p style={{ fontFamily: "Outfit, sans-serif", fontSize: 13, color: "hsl(var(--muted-foreground))", margin: "0 auto 20px", maxWidth: 520 }}>
          Answer {totalSteps} questions. Our AI benchmarks your logistics stack and generates a personalized analysis.
        </p>

        <div style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border-subtle))", borderRadius: 16, padding: "18px 16px 22px", minHeight: 200, position: "relative", overflow: "hidden" }} className="sm:px-6 sm:py-5">
          {/* Progress bar */}
          {phase === "quiz" && (
            <div style={{ display: "flex", gap: 4, marginBottom: 24 }} className="sm:mb-8">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: 4,
                    borderRadius: 2,
                    background: i <= step ? "linear-gradient(90deg, #393185, #1AA6DF)" : "var(--purpleLt)",
                    opacity: i <= step ? 1 : 0.4,
                    transition: "all .4s ease",
                  }}
                />
              ))}
            </div>
          )}

          {(phase === "analyzing" || phase === "result") && (
            <div style={{ marginBottom: 8 }}>
              <div style={{ height: 4, borderRadius: 2, background: "linear-gradient(90deg, #393185, #1AA6DF)", marginBottom: 24 }} className="sm:mb-8" />
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* QUIZ PHASE */}
            {phase === "quiz" && step < totalSteps && (
              <motion.div key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
                <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 20, textAlign: "left" }}>
                  {questions[step].question}
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {questions[step].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      className="quiz-option-btn"
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        fontSize: 14,
                        fontWeight: 500,
                        padding: "15px 12px",
                        borderRadius: 12,
                        border: selectedOption === idx ? "2px solid #4D44A8" : "1px solid var(--borderSm)",
                        background: selectedOption === idx ? "rgba(57, 49, 133, 0.15)" : "transparent",
                        color: "var(--text2)",
                        cursor: "pointer",
                        transition: "all .2s ease",
                        textAlign: "left",
                      }}
                      onMouseEnter={(e) => {
                        if (selectedOption !== idx) {
                          e.currentTarget.style.borderColor = "rgba(57, 49, 133, 0.5)";
                          e.currentTarget.style.background = "rgba(57, 49, 133, 0.08)";
                          e.currentTarget.style.transform = "translateY(-1px)";
                          e.currentTarget.style.boxShadow = "0 4px 12px rgba(57,49,133,0.1)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedOption !== idx) {
                          e.currentTarget.style.borderColor = "var(--borderSm)";
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "none";
                        }
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ANALYZING PHASE */}
            {phase === "analyzing" && (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                style={{ textAlign: "center", padding: "20px 0" }}
              >
                <motion.div
                  animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ fontSize: 48, marginBottom: 16 }}
                >
                  🧠
                </motion.div>
                <p style={{ fontFamily: "Outfit, sans-serif", fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 20 }}>
                  LoRRI AI analyzing your logistics network...
                </p>
                <div style={{ maxWidth: 320, margin: "0 auto", textAlign: "left" }}>
                  {analysisSteps.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: analysisStep > i ? 1 : 0.3, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 10,
                        fontFamily: "Outfit, sans-serif",
                        fontSize: 13,
                        color: analysisStep > i ? "var(--text)" : "var(--text3)",
                      }}
                    >
                      <motion.span
                        animate={analysisStep > i ? { rotate: 0 } : { rotate: 360 }}
                        transition={analysisStep > i ? {} : { duration: 1, repeat: Infinity, ease: "linear" }}
                        style={{ fontSize: 14, display: "inline-block" }}
                      >
                        {analysisStep > i ? "✓" : "◌"}
                      </motion.span>
                      {s}
                    </motion.div>
                  ))}
                </div>
                <div style={{ maxWidth: 320, margin: "16px auto 0", height: 3, borderRadius: 2, background: "var(--purpleLt)", overflow: "hidden" }}>
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: `${(analysisStep / analysisSteps.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ height: "100%", borderRadius: 2, background: "linear-gradient(90deg, #393185, #1AA6DF)" }}
                  />
                </div>
              </motion.div>
            )}

            {/* RESULT PHASE — Two-column layout */}
            {phase === "result" && (
              <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8" style={{ textAlign: "left" }}>
                  
                  {/* LEFT COLUMN — Score + Breakdown */}
                  <div className="flex flex-col items-center lg:items-center justify-center">
                    {/* Score */}
                    <div style={{ marginBottom: 4, textAlign: "center" }}>
                      <span style={{ fontSize: 56, fontWeight: 900, fontFamily: "Outfit, sans-serif", background: "linear-gradient(135deg, #393185, #1AA6DF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}>
                        {animatedScore}
                      </span>
                    </div>
                    <p style={{ fontFamily: "Outfit, sans-serif", fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 4, textAlign: "center" }}>
                      AI Readiness Score — {result.stage}
                    </p>
                    <p style={{ fontFamily: "Outfit, sans-serif", fontSize: 12, color: "#1AA6DF", fontWeight: 600, marginBottom: 16, textAlign: "center" }}>
                      You're ahead of {result.percentile}% of logistics companies globally
                    </p>

                    {/* Breakdown Bars */}
                    <div style={{ width: "100%", maxWidth: 360, display: "grid", gap: 10 }}>
                      <ScoreBar label="Cost Efficiency" value={breakdown.costEfficiency} delay={0.1} />
                      <ScoreBar label="Visibility" value={breakdown.visibility} delay={0.2} />
                      <ScoreBar label="Technology Maturity" value={breakdown.techMaturity} delay={0.3} />
                      <ScoreBar label="Carrier Performance" value={breakdown.carrierPerformance} delay={0.4} />
                    </div>

                    {/* Powered by */}
                    <p style={{ fontFamily: "Outfit, sans-serif", fontSize: 10, color: "var(--text3)", marginTop: 14, letterSpacing: ".04em", textAlign: "center" }}>
                      Powered by LoRRI AI Agents: <span style={{ color: "#4D44A8", fontWeight: 600 }}>Procurement</span> · <span style={{ color: "#4D44A8", fontWeight: 600 }}>Optimization</span> · <span style={{ color: "#4D44A8", fontWeight: 600 }}>Intelligence</span>
                    </p>
                  </div>

                  {/* RIGHT COLUMN — Insights + Recommendations + CTA */}
                  <div className="flex flex-col justify-between" style={{ borderLeft: "none" }}>
                    {/* Divider for lg screens */}
                    <div className="hidden lg:block absolute left-1/2 top-[15%] bottom-[15%]" style={{ width: 1, background: "var(--borderSm)" }} />

                    {/* Insights */}
                    <div style={{ marginBottom: 14 }}>
                      <p style={{ fontFamily: "Outfit, sans-serif", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "#4D44A8", marginBottom: 8 }}>
                        Key Insights
                      </p>
                      <div style={{ display: "grid", gap: 5 }}>
                        {insights.map((ins, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + i * 0.1 }}
                            style={{
                              fontFamily: "Outfit, sans-serif",
                              fontSize: 12,
                              fontWeight: 500,
                              color: ins.type === "warning" ? "#e67e22" : "#27ae60",
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                              padding: "5px 10px",
                              borderRadius: 8,
                              background: ins.type === "warning" ? "rgba(230,126,34,0.08)" : "rgba(39,174,96,0.08)",
                            }}
                          >
                            <span>{ins.type === "warning" ? "⚠" : "✔"}</span>
                            {ins.text}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* AI Recommendations */}
                    <div style={{ marginBottom: 14 }}>
                      <p style={{ fontFamily: "Outfit, sans-serif", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "#4D44A8", marginBottom: 8 }}>
                        AI Recommendations
                      </p>
                      {recommendations.map((rec, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.9 + i * 0.12 }}
                          style={{
                            fontFamily: "Outfit, sans-serif",
                            fontSize: 12,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "7px 10px",
                            borderRadius: 8,
                            border: "1px solid var(--borderSm)",
                            marginBottom: 5,
                          }}
                        >
                          <span style={{ color: "var(--text2)", fontWeight: 500 }}>→ {rec.text}</span>
                          <span style={{ color: "#1AA6DF", fontWeight: 700, fontSize: 11, whiteSpace: "nowrap", marginLeft: 8 }}>{rec.saving}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <button
                        onClick={() => openDemoModal()}
                        style={{
                          fontFamily: "Outfit, sans-serif",
                          fontSize: 13,
                          fontWeight: 700,
                          padding: "10px 20px",
                          borderRadius: 10,
                          border: "none",
                          background: "linear-gradient(135deg, #393185, #4D44A8)",
                          color: "#fff",
                          cursor: "pointer",
                          boxShadow: "0 4px 20px rgba(57,49,133,0.4)",
                          transition: "all .25s cubic-bezier(.16,1,.3,1)",
                          flex: 1,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-2px) scale(1.03)";
                          e.currentTarget.style.boxShadow = "0 8px 28px rgba(57,49,133,0.5)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0) scale(1)";
                          e.currentTarget.style.boxShadow = "0 4px 20px rgba(57,49,133,0.4)";
                        }}
                      >
                        See Your AI-Powered Savings →
                      </button>
                      <button
                        onClick={reset}
                        style={{
                          fontFamily: "Outfit, sans-serif",
                          fontSize: 13,
                          fontWeight: 600,
                          padding: "10px 20px",
                          borderRadius: 10,
                          border: "1px solid var(--borderSm)",
                          background: "transparent",
                          color: "var(--text2)",
                          cursor: "pointer",
                          transition: "all .2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "rgba(57,49,133,0.4)";
                          e.currentTarget.style.background = "rgba(57,49,133,0.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "var(--borderSm)";
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        Retake
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
