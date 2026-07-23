import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Loader2, Bot, User, Calendar, Clock, MapPin, ChevronRight, Minimize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleGenAI } from "@google/genai";

const QUICK_REPLIES = [
  { label: "Book a Service", icon: Calendar, action: "I want to book a service" },
  { label: "Our Services", icon: Bot, action: "What services do you offer?" },
  { label: "Working Hours", icon: Clock, action: "What are your working hours?" },
  { label: "Location", icon: MapPin, action: "Where are you located?" },
];

// Offline fallback response generator for common customer inquiries
function getOfflineChatFallback(userMessage: string): string {
  const msg = (userMessage || "").toLowerCase();

  if (msg.includes("book") || msg.includes("appointment") || msg.includes("schedule") || msg.includes("slot")) {
    return "To book a service appointment, simply click the 'Book Service' button on the navigation bar, or call us directly at +91 94224 10051!";
  }
  if (msg.includes("hour") || msg.includes("time") || msg.includes("open") || msg.includes("timing") || msg.includes("close")) {
    return "Omkar Automotive Workshop is open Monday to Saturday from 9:00 AM to 7:00 PM. We are closed on Sundays.";
  }
  if (msg.includes("location") || msg.includes("where") || msg.includes("address") || msg.includes("map") || msg.includes("sangli")) {
    return "We are located at 100 Feet Rd, Ekta Chowk, Sangli, Maharashtra. Feel free to visit us or call +91 94224 10051 for directions!";
  }
  if (msg.includes("oil") || msg.includes("lubricat")) {
    return "Our synthetic engine oil change package includes premium oil replacement, oil filter check, and multi-point vehicle inspection starting at ₹1,499.";
  }
  if (msg.includes("brake") || msg.includes("pad") || msg.includes("disc")) {
    return "Our brake service covers front & rear brake pad inspection, rotor disc turning, and brake fluid flushing to ensure maximum road safety.";
  }
  if (msg.includes("ac") || msg.includes("cool") || msg.includes("air condition")) {
    return "Our climate control service includes R134a refrigerant gas top-up, cabin filter replacement, and condenser leak testing starting at ₹1,299.";
  }
  if (msg.includes("dent") || msg.includes("paint") || msg.includes("scratch")) {
    return "We provide expert computerized color-matched denting & booth painting services for scratch repairs and body restoration.";
  }
  if (msg.includes("price") || msg.includes("cost") || msg.includes("charge") || msg.includes("rate") || msg.includes("estimate")) {
    return "Our pricing is transparent! Basic servicing starts at ₹1,499, AC service at ₹1,299, and full multi-point maintenance at ₹2,999. Try our 'AI Estimator' page for an instant detailed quote!";
  }
  if (msg.includes("service") || msg.includes("offer") || msg.includes("repair") || msg.includes("do you do")) {
    return "We offer comprehensive car & bike care: Engine Overhaul, Oil Change, Denting & Painting, AC Gas Refill, Brake Repair, Suspension Tuning, and Foam Washing!";
  }

  return "Thank you for reaching out to Omkar Automotive Workshop! We offer complete vehicle servicing, engine diagnostics, denting/painting, and AC repairs. How can we assist you today? Click 'Book Service' to schedule your visit!";
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "model"; text: string }[]>([
    { role: "model", text: "Hello! I'm your Omkar Automotive assistant. How can I help you today? You can ask about our services, pricing, or book an appointment." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);

  const handleSend = async (customMessage?: string) => {
    const userMessage = customMessage || input.trim();
    if (!userMessage) return;

    if (!customMessage) setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const envKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
      const processKey = typeof process !== "undefined" && process.env ? process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY : "";
      const apiKey = envKey || processKey || "";

      if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
        const fallbackText = getOfflineChatFallback(userMessage);
        setMessages((prev) => [...prev, { role: "model", text: fallbackText }]);
        setIsLoading(false);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });

      const systemInstruction = `You are an intelligent, helpful, and professional customer support chatbot for "Omkar Automotive Workshop" in Sangli, Maharashtra, India.

Your role is to assist users with:
1. Answering questions about our services: Oil Change, Denting & Painting, AC Service & Gas Refill, Brake Repair, Engine Diagnostics, Washing & Detailing.
2. Providing estimated pricing based on services.
3. Guiding users on how to book an appointment (tell them to click the "Book Service" button or call +91 94224 10051).
4. Explaining our working hours (Monday to Saturday, 9:00 AM to 7:00 PM).
5. Providing workshop location (100 Feet Rd, Ekta Chowk, Sangli).

Important Formatting Rules:
- Keep responses concise, clean, and friendly.
- Do NOT use markdown bold stars (*) or hashes (#).
- Respond in natural, helpful conversational text as a human service advisor.`;

      const formattedHistory = messages.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.text }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          ...formattedHistory,
          { role: "user", parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const responseText = response.text || getOfflineChatFallback(userMessage);
      setMessages((prev) => [...prev, { role: "model", text: responseText }]);
    } catch (error) {
      console.error("Client-side chatbot error, using offline fallback:", error);
      const fallbackText = getOfflineChatFallback(userMessage);
      setMessages((prev) => [...prev, { role: "model", text: fallbackText }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => { setIsOpen(true); setIsMinimized(false); }}
          className="fixed bottom-6 right-6 w-16 h-16 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center z-50 group cursor-pointer"
        >
          <MessageSquare className="w-7 h-7 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full border-2 border-white animate-pulse" />
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: isMinimized ? "calc(100% - 60px)" : 0, 
              scale: 1,
              height: isMinimized ? "60px" : "min(600px, 85vh)",
              width: isMinimized ? "300px" : "min(400px, 95vw)"
            }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className={`fixed bottom-6 right-6 bg-white border border-steel/20 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden transition-all duration-300 ${isMinimized ? "cursor-pointer" : ""}`}
            onClick={() => isMinimized && setIsMinimized(false)}
          >
            {/* Header */}
            <div className="p-4 bg-primary flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-sm leading-none mb-1">Omkar Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <p className="text-[10px] text-white/70 font-medium uppercase tracking-wider">Expert Support</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }} 
                  className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                >
                  {isMinimized ? <ChevronRight className="w-5 h-5 -rotate-90" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} 
                  className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-light/30 scrollbar-thin scrollbar-thumb-steel/20">
                  {messages.map((msg, index) => (
                    <motion.div 
                      initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={index} 
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex gap-2 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                          msg.role === "user" ? "bg-secondary/10 border-secondary/20" : "bg-primary/10 border-primary/20"
                        }`}>
                          {msg.role === "user" ? <User className="w-4 h-4 text-secondary" /> : <Bot className="w-4 h-4 text-primary" />}
                        </div>
                        <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                          msg.role === "user" 
                            ? "bg-primary text-white rounded-tr-sm" 
                            : "bg-white border border-steel/10 text-darker rounded-tl-sm"
                        }`}>
                          {msg.text.split('\n').map((line, i) => (
                            <p key={i} className={i > 0 ? "mt-1" : ""}>{line}</p>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-2 items-center bg-white border border-steel/10 p-3 rounded-2xl rounded-tl-sm shadow-sm">
                        <Loader2 className="w-4 h-4 text-secondary animate-spin" />
                        <span className="text-xs text-steel font-medium">Assistant is thinking...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies */}
                {messages.length < 10 && (
                  <div className="px-4 py-2 bg-white flex gap-2 overflow-x-auto no-scrollbar border-t border-steel/5">
                    {QUICK_REPLIES.map((reply) => (
                      <button
                        key={reply.label}
                        onClick={() => handleSend(reply.action)}
                        className="flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 bg-light hover:bg-steel/10 border border-steel/10 rounded-full text-xs font-semibold text-darker transition-colors cursor-pointer"
                      >
                        <reply.icon className="w-3.5 h-3.5 text-secondary" />
                        {reply.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-steel/10">
                  <form 
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="flex items-center gap-2"
                  >
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask anything..."
                        className="w-full bg-light border border-steel/20 rounded-xl px-4 py-3 text-sm text-darker focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all pr-10"
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed shrink-0 active:scale-95 cursor-pointer"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                  <p className="text-[10px] text-center text-steel/60 mt-3 font-medium">
                    Powered by Omkar Automotive AI
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
