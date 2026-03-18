import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { generateAnswer } from "@/lib/chatbot";
import { Send, X, Bot, MessageSquare, ChevronRight, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "bot" | "user";
  text: string;
  time: string;
}

const ChatWidget = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "👋 Hello! I'm the LogisticsNow Assistant. I can answer questions about LogisticsNow and LoRRI — our products, services, vision, and how to get in touch.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      role: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const result = await generateAnswer(text);
      const botMsg: Message = {
        role: "bot",
        text: result.answer,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);

      // Check for demo/contact intent to redirect
      const lowerInput = text.toLowerCase();
      const lowerAnswer = result.answer.toLowerCase();
      if (
        lowerInput.includes("demo") || 
        lowerInput.includes("contact") || 
        lowerInput.includes("schedule") ||
        lowerAnswer.includes("redirecting you")
      ) {
        setTimeout(() => {
          setIsOpen(false);
          navigate("/contact");
        }, 2500);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Sorry, I encountered an error. Please try again.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    { label: "What is LoRRI?", query: "What is LoRRI?" },
    { label: "Why choose us?", query: "How is LogisticsNow better than others?" },
    { label: "Book a Demo", query: "I want to request a demo." },
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowNotification(false);
        }}
        className={`fixed bottom-7 right-7 z-[500] w-[62px] h-[62px] rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110 active:scale-95 group ${
          isOpen ? "bg-ln-purple" : "gradient-primary"
        }`}
        style={{ boxShadow: isOpen ? '0 8px 28px rgba(0,0,0,0.2)' : '0 8px 32px rgba(var(--ln-purple), 0.4)' }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
            >
              <X className="w-7 h-7 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: [0, -4, 0],
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="relative text-3xl"
            >
              🤖
              {showNotification && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full animate-bounce" />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Chat Widget Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-[104px] right-7 z-[500] w-[390px] h-[580px] bg-white dark:bg-zinc-950 rounded-[28px] shadow-2xl overflow-hidden flex flex-col border border-border/50 backdrop-blur-xl"
            style={{ 
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.15)',
              background: 'rgba(255, 255, 255, 0.98)'
            }}
          >
            {/* Header */}
            <div className="p-4 gradient-primary flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center shadow-inner">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-sm">LoRRIAssit</div>
                  <div className="flex items-center gap-1.5 text-[11px] text-white/80">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    Online & Ready
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-white/70" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-zinc-200">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`flex flex-col max-w-[85%] ${m.role === "bot" ? "self-start" : "self-end"}`}
                >
                  <div 
                    className={`px-4 py-3 rounded-2xl text-[13.5px] leading-relaxed relative ${
                      m.role === "bot" 
                        ? "bg-zinc-100 text-zinc-800 rounded-tl-none border border-zinc-200/50 shadow-sm"
                        : "gradient-primary text-white rounded-tr-none shadow-md"
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className={`text-[10px] mt-1.5 px-1 font-medium text-zinc-400 ${m.role === "bot" ? "text-left" : "text-right"}`}>
                    {m.time}
                  </span>
                </motion.div>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="self-start max-w-[80%] bg-zinc-100 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1"
                >
                  <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" />
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Footer / Input Area */}
            <div className="p-4 bg-zinc-50 border-t border-zinc-100 flex flex-col gap-3">
              {/* Suggestion Chips */}
              {messages.length < 3 && !isLoading && (
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(s.query)}
                      className="px-3 py-1.5 bg-white border border-zinc-200 rounded-full text-[12px] font-semibold text-zinc-600 hover:border-ln-purple hover:text-ln-purple transition-all shadow-sm flex items-center gap-1"
                    >
                      {s.label}
                      <ChevronRight className="w-3 h-3 opacity-50" />
                    </button>
                  ))}
                </div>
              )}

              {/* Input Box */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage(input)}
                  placeholder="Ask about LogisticsNow..."
                  className="flex-1 bg-white border border-zinc-200 rounded-2xl px-4 py-3 text-[14px] outline-none focus:border-ln-purple/50 focus:ring-4 focus:ring-ln-purple/5 transition-all"
                  disabled={isLoading}
                />
                <button
                  onClick={() => handleSendMessage(input)}
                  disabled={isLoading || !input.trim()}
                  className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center text-white shadow-md disabled:opacity-50 hover:scale-105 active:scale-95 transition-all shrink-0"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <div className="text-center text-[10px] text-zinc-400 font-medium">
                AI can make mistakes. Check important info.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
