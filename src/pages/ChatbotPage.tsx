import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const quickSuggestions = [
  "Find nearby cricket academies",
  "Best coaches for badminton",
  "Upcoming tournaments this month",
  "Training tips for beginners",
];

const mockResponses: Record<string, string> = {
  default:
    "I'm your SportSync AI assistant! I can help you find nearby sports opportunities, get training advice, and discover upcoming tournaments. What would you like to know?",
  cricket:
    "🏏 There are **3 cricket academies** near you:\n\n1. **Elite Sports Academy** – 2.3 km away, rated 4.7⭐\n2. **Delhi Cricket Club** – 3.1 km away\n3. **ProStar Training Hub** – 4.5 km away\n\nWould you like details on any of these?",
  coach:
    "🏅 Here are top-rated coaches near you:\n\n1. **Rajesh Kumar** – Cricket (Batting) – 4.8⭐\n2. **Priya Sharma** – Badminton (Singles) – 4.9⭐\n3. **Amit Singh** – Football (Midfield) – 4.6⭐\n\nWant to connect with any of them?",
  tournament:
    "🏆 Upcoming events:\n\n1. **Inter-City Cricket Championship** – May 15, 2026\n2. **State Badminton Trials** – Apr 28, 2026\n3. **Youth Football Workshop** – May 5, 2026\n\nRegistration is open for all! Shall I help you register?",
  training:
    "💪 Here are some tips for beginners:\n\n1. **Start with fundamentals** – Focus on basic techniques\n2. **Stay consistent** – Train at least 3-4 times/week\n3. **Warm up properly** – Prevent injuries\n4. **Set small goals** – Track your progress\n5. **Get a coach** – Professional guidance accelerates growth\n\nWant me to find a coach for your sport?",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("cricket") || lower.includes("academ")) return mockResponses.cricket;
  if (lower.includes("coach") || lower.includes("badminton")) return mockResponses.coach;
  if (lower.includes("tournament") || lower.includes("event") || lower.includes("upcoming")) return mockResponses.tournament;
  if (lower.includes("training") || lower.includes("tip") || lower.includes("beginner")) return mockResponses.training;
  return mockResponses.default;
}

const ChatbotPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "👋 Hi! I'm your **SportSync AI** assistant. I can help you discover sports opportunities, find coaches, and get training advice. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(text);
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: response }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="px-4 pt-6 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gradient-hero flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold font-display text-foreground">AI Assistant</h1>
            <p className="text-[11px] text-secondary font-medium">Online · Ready to help</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 space-y-3 pb-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "assistant" && (
              <div className="w-7 h-7 rounded-full bg-gradient-hero flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-card text-card-foreground shadow-card rounded-bl-md"
              }`}
            >
              {msg.content.split("\n").map((line, i) => (
                <p key={i} className={i > 0 ? "mt-1" : ""}>
                  {line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
                    j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                  )}
                </p>
              ))}
            </div>
            {msg.role === "user" && (
              <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                <User className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
            )}
          </motion.div>
        ))}
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-hero flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <div className="bg-card rounded-2xl rounded-bl-md px-4 py-3 shadow-card">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-pulse" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-pulse" style={{ animationDelay: "200ms" }} />
                <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-pulse" style={{ animationDelay: "400ms" }} />
              </div>
            </div>
          </motion.div>
        )}

        {/* Quick suggestions (show when few messages) */}
        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {quickSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => sendMessage(suggestion)}
                className="text-[11px] font-medium bg-primary/10 text-primary px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-4 pb-4 pt-2 border-t border-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Ask me anything about sports..."
            className="flex-1 px-4 py-3 bg-card rounded-xl text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 text-card-foreground placeholder:text-muted-foreground"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            className="w-11 h-11 bg-gradient-hero rounded-xl flex items-center justify-center text-primary-foreground disabled:opacity-40 transition-opacity"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
