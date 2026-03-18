export type ChatIntent = "general" | "demo" | "contact";

export interface ChatbotResult {
  answer: string;
  intent: ChatIntent;
}

const BOT_KNOWLEDGE: Record<string, string> = {
  "what is lorri": "LoRRI is LogisticsNow's AI-powered logistics intelligence platform for freight benchmarking, procurement, and transport management.",
  "what does lorri do": "LoRRI helps teams benchmark freight rates, discover reliable carriers, automate procurement, and manage shipments end to end.",
  products: "LogisticsNow offers LoRRI for freight intelligence, benchmarking, carrier discovery, procurement workflows, and transport management support.",
  savings: "Customers typically unlock meaningful cost savings through better benchmarking, smarter procurement, and improved lane-level visibility.",
  carriers: "LoRRI connects businesses with a large network of verified carriers and transport partners, helping improve reliability and service quality.",
  routes: "The platform tracks freight intelligence across thousands of routes, helping teams compare rates and make better lane decisions.",
  procurement: "LoRRI streamlines freight procurement with automated tendering, carrier discovery, and data-backed decision support.",
  tms: "LoRRI's TMS capabilities support shipment visibility, coordination, and operational control across the transport lifecycle.",
  intelligence: "The intelligence layer gives you market-backed freight benchmarks, trend visibility, and stronger pricing confidence.",
  contact: "You can reach the LogisticsNow team at lorri@logisticsnow.in or request a demo directly from this page.",
  demo: "Absolutely — I can help you get a demo scheduled. Use the demo action below and the team will follow up.",
  support: "For support, share your requirement here or reach out to lorri@logisticsnow.in and the team will help you quickly.",
  clients: "LogisticsNow works with large enterprise and high-growth logistics teams across multiple industries.",
  price: "Pricing depends on your use case, freight volume, and modules needed. The fastest way to get accurate pricing is to request a demo.",
  transporter: "Transport partners can use the platform to build credibility, access opportunities, and improve visibility with shippers.",
  default: "I can help with products, LoRRI, freight savings, carrier network, procurement, TMS, pricing, support, or booking a demo. What would you like to know?",
};

function inferIntent(message: string): ChatIntent {
  const lower = message.toLowerCase();

  if (lower.includes("demo") || lower.includes("book") || lower.includes("schedule")) {
    return "demo";
  }

  if (lower.includes("contact") || lower.includes("email") || lower.includes("phone") || lower.includes("call")) {
    return "contact";
  }

  return "general";
}

function getBotReply(message: string): string {
  const lower = message.toLowerCase();

  for (const [key, value] of Object.entries(BOT_KNOWLEDGE)) {
    if (key !== "default" && lower.includes(key)) return value;
  }

  if (lower.includes("product") || lower.includes("solution") || lower.includes("platform")) return BOT_KNOWLEDGE.products;
  if (lower.includes("sav") || lower.includes("cost") || lower.includes("cheap")) return BOT_KNOWLEDGE.savings;
  if (lower.includes("carrier") || lower.includes("transport") || lower.includes("truck")) return BOT_KNOWLEDGE.carriers;
  if (lower.includes("route") || lower.includes("lane") || lower.includes("map")) return BOT_KNOWLEDGE.routes;
  if (lower.includes("procure") || lower.includes("tender") || lower.includes("bid")) return BOT_KNOWLEDGE.procurement;
  if (lower.includes("track") || lower.includes("shipment") || lower.includes("visibility") || lower.includes("tms")) return BOT_KNOWLEDGE.tms;
  if (lower.includes("data") || lower.includes("benchmark") || lower.includes("rate")) return BOT_KNOWLEDGE.intelligence;
  if (lower.includes("support") || lower.includes("help") || lower.includes("issue") || lower.includes("problem")) return BOT_KNOWLEDGE.support;
  if (lower.includes("client") || lower.includes("customer") || lower.includes("who use")) return BOT_KNOWLEDGE.clients;
  if (lower.includes("price") || lower.includes("plan") || lower.includes("quote")) return BOT_KNOWLEDGE.price;
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return "Hi! I'm the LogisticsNow assistant. Ask me about LoRRI, freight intelligence, procurement, pricing, or getting a demo.";
  }

  return BOT_KNOWLEDGE.default;
}

export const CHATBOT_SUGGESTIONS = [
  "What is LoRRI?",
  "How can LogisticsNow help reduce freight costs?",
  "How many carriers do you work with?",
  "Book a demo",
];

export async function generateAnswer(message: string): Promise<ChatbotResult> {
  return {
    answer: getBotReply(message),
    intent: inferIntent(message),
  };
}
