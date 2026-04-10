import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useAuth } from "@/contexts/AuthContext";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const quickSuggestions = [
  "Find nearby cricket academies",
  "Best coaches for badminton",
  "Upcoming tournaments this month",
  "Training tips for beginners",
];

const ChatbotPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "assistant", content: "👋 Hi! I'm your **SportSync AI** assistant. I can help you discover sports opportunities, find coaches, and get training advice. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { session } = useAuth();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    let assistantContent = "";

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session ? { Authorization: `Bearer ${session.access_token}` } : { Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` }),
        },
        body: JSON.stringify({
          messages: newMessages.filter(m => m.id !== "welcome").map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!resp.ok || !resp.body) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to get response");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIdx: number;
        while ((newlineIdx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIdx);
          buffer = buffer.slice(newlineIdx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant" && last.id !== "welcome") {
                  return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantContent } : m);
                }
                return [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: assistantContent }];
              });
            }
          } catch {}
        }
      }
    } catch (e: any) {
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: `Sorry, I couldn't process that. ${e.message || "Please try again."}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="px-4 pt-6 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gradient-hero flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold font-display text-foreground">AI Assistant</h1>
            <p className="text-[11px] text-secondary font-medium">Powered by Lovable AI</p>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 space-y-3 pb-4">
        {messages.map((msg) => (
          <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <div className="w-7 h-7 rounded-full bg-gradient-hero flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
            )}
            <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-br-md" : "bg-card text-card-foreground shadow-card rounded-bl-md"}`}>
              <div className="prose prose-sm max-w-none [&_p]:my-0.5 [&_ul]:my-1 [&_li]:my-0">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
            {msg.role === "user" && (
              <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                <User className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
            )}
          </motion.div>
        ))}
        {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-hero flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <div className="bg-card rounded-2xl rounded-bl-md px-4 py-3 shadow-card">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-pulse" style={{ animationDelay: "200ms" }} />
                <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-pulse" style={{ animationDelay: "400ms" }} />
              </div>
            </div>
          </motion.div>
        )}
        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {quickSuggestions.map((s) => (
              <button key={s} onClick={() => sendMessage(s)} className="text-[11px] font-medium bg-primary/10 text-primary px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors">{s}</button>
            ))}
          </div>
        )}
      </div>

      <div className="px-4 pb-4 pt-2 border-t border-border">
        <div className="flex gap-2">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage(input)} placeholder="Ask me anything about sports..." className="flex-1 px-4 py-3 bg-card rounded-xl text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 text-card-foreground placeholder:text-muted-foreground" />
          <button onClick={() => sendMessage(input)} disabled={!input.trim() || isLoading} className="w-11 h-11 bg-gradient-hero rounded-xl flex items-center justify-center text-primary-foreground disabled:opacity-40 transition-opacity">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
