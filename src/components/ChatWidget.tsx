import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, ChevronRight, ExternalLink, MessageSquare, Send, Sparkles, X } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDemoModal } from "@/hooks/use-demo-modal";
import { CHATBOT_SUGGESTIONS, generateAnswer, type ChatIntent } from "@/lib/chatbot";
import { cn } from "@/lib/utils";

interface Message {
  role: "bot" | "user";
  text: string;
  time: string;
  intent?: ChatIntent;
}

const initialMessage: Message = {
  role: "bot",
  text: "Hi — I'm the LogisticsNow assistant. Ask about LoRRI, freight intelligence, pricing, carrier discovery, or booking a demo.",
  time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  intent: "general",
};

const launcherGradient = {
  backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
};

const panelGradient = {
  backgroundImage: "linear-gradient(160deg, hsl(var(--card)) 0%, hsl(var(--card-alt)) 100%)",
};

const ChatWidget = () => {
  const openDemoModal = useDemoModal();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [lastIntent, setLastIntent] = useState<ChatIntent>("general");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const suggestions = useMemo(
    () => CHATBOT_SUGGESTIONS.map((query) => ({ label: query, query })),
    [],
  );

  const handleSendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [...prev, { role: "user", text: trimmed, time }]);
    setInput("");
    setIsLoading(true);

    try {
      const result = await generateAnswer(trimmed);
      setLastIntent(result.intent);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: result.answer,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          intent: result.intent,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Sorry — I hit an issue. Please try again in a moment.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          intent: "general",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => {
          setIsOpen((prev) => !prev);
          setShowNotification(false);
        }}
        className="fixed bottom-4 right-4 z-[500] flex h-14 w-14 items-center justify-center rounded-full border border-border-subtle text-primary-foreground shadow-2xl ring-1 ring-white/10 transition-transform duration-300 hover:scale-105 md:bottom-6 md:right-6 md:h-16 md:w-16"
        style={launcherGradient}
        whileTap={{ scale: 0.96 }}
        aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
            >
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1, y: [0, -3, 0] }}
              transition={{ y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } }}
              className="relative"
            >
              <MessageSquare className="h-6 w-6 md:h-7 md:w-7" />
              {showNotification && <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-accent ring-2 ring-background" />}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed bottom-20 right-3 z-[500] flex h-[min(72vh,38rem)] w-[calc(100vw-1.5rem)] max-w-[25rem] flex-col overflow-hidden rounded-[1.75rem] border border-border-subtle bg-card/95 shadow-2xl backdrop-blur-xl sm:bottom-24 sm:right-4 md:right-6"
            style={panelGradient}
          >
            <div
              className="relative overflow-hidden border-b border-border-subtle px-4 py-4 text-primary-foreground md:px-5"
              style={launcherGradient}
            >
              <div className="absolute inset-0 opacity-20" aria-hidden>
                <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-white/15 blur-2xl" />
                <div className="absolute -bottom-10 left-0 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
              </div>
              <div className="relative flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-semibold md:text-base">NowAssist</p>
                      <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-white/85">
                        <Sparkles className="h-3 w-3" /> AI
                      </span>
                    </div>
                    <p className="mt-1 flex items-center gap-2 text-xs text-white/80">
                      <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                      Live answers for LoRRI and LogisticsNow
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-9 w-9 shrink-0 rounded-full text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <ScrollArea className="flex-1 px-3 py-3 md:px-4">
              <div className="flex flex-col gap-4 pb-2">
                {messages.map((message, index) => (
                  <motion.div
                    key={`${message.role}-${index}-${message.time}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn("flex gap-2.5", message.role === "user" ? "justify-end" : "justify-start")}
                  >
                    {message.role === "bot" && (
                      <Avatar className="mt-1 h-8 w-8 border border-border-subtle bg-card-alt">
                        <AvatarFallback className="bg-card-alt text-xs font-semibold text-accent">LN</AvatarFallback>
                      </Avatar>
                    )}
                    <div className={cn("max-w-[85%]", message.role === "user" ? "items-end" : "items-start")}>
                      <div
                        className={cn(
                          "rounded-2xl px-4 py-3 text-[13px] leading-6 shadow-sm md:text-sm",
                          message.role === "user"
                            ? "rounded-tr-md text-primary-foreground"
                            : "rounded-tl-md border border-border-subtle bg-card-alt text-card-foreground",
                        )}
                        style={message.role === "user" ? launcherGradient : undefined}
                      >
                        {message.text}
                      </div>
                      <p className="mt-1 px-1 text-[10px] text-muted-foreground">{message.time}</p>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <div className="flex justify-start gap-2.5">
                    <Avatar className="mt-1 h-8 w-8 border border-border-subtle bg-card-alt">
                      <AvatarFallback className="bg-card-alt text-xs font-semibold text-accent">LN</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-1 rounded-2xl rounded-tl-md border border-border-subtle bg-card-alt px-4 py-3">
                      {[0, 1, 2].map((dot) => (
                        <span
                          key={dot}
                          className="h-2 w-2 rounded-full bg-accent"
                          style={{ animation: `pulse-dot 1s ${dot * 0.16}s infinite` }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="border-t border-border-subtle bg-background/40 px-3 py-3 backdrop-blur md:px-4">
              {messages.length <= 2 && !isLoading && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {suggestions.map((suggestion) => (
                    <Button
                      key={suggestion.query}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleSendMessage(suggestion.query)}
                      className="h-auto rounded-full border-border-subtle bg-card-alt px-3 py-2 text-[11px] text-foreground hover:bg-accent/10 hover:text-accent sm:text-xs"
                    >
                      <span className="truncate">{suggestion.label}</span>
                      <ChevronRight className="h-3 w-3" />
                    </Button>
                  ))}
                </div>
              )}

              {(lastIntent === "demo" || lastIntent === "contact") && !isLoading && (
                <Button
                  type="button"
                  onClick={openDemoModal}
                  className="mb-3 h-11 w-full justify-between rounded-2xl px-4 text-sm font-semibold"
                  style={launcherGradient}
                >
                  Open demo request form
                  <ExternalLink className="h-4 w-4" />
                </Button>
              )}

              <div className="flex items-center gap-2">
                <Input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => event.key === "Enter" && handleSendMessage(input)}
                  placeholder="Ask about LoRRI, pricing, carriers…"
                  disabled={isLoading}
                  className="h-11 rounded-2xl border-border-subtle bg-card-alt text-sm"
                />
                <Button
                  type="button"
                  size="icon"
                  onClick={() => handleSendMessage(input)}
                  disabled={isLoading || !input.trim()}
                  className="h-11 w-11 shrink-0 rounded-2xl"
                  style={launcherGradient}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-2 text-center text-[10px] text-muted-foreground">
                AI can be imperfect — please verify important business details.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
