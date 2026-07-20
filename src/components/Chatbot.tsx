import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Loader2, Bot, User, Phone, Calendar, Clock, MapPin, ChevronRight, Minimize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const QUICK_REPLIES = [
  { label: "Book a Service", icon: Calendar, action: "I want to book a service" },
  { label: "Our Services", icon: Bot, action: "What services do you offer?" },
  { label: "Working Hours", icon: Clock, action: "What are your working hours?" },
  { label: "Location", icon: MapPin, action: "Where are you located?" },
];

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
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, history: messages })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "model", text: data.text || "I'm sorry, I couldn't process that." }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages((prev) => [...prev, { role: "model", text: "I'm sorry, I'm having trouble connecting right now. Please call us at +91 94224 10051 for immediate assistance." }]);
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
          className="fixed bottom-6 right-6 w-16 h-16 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center z-50 group"
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
                  className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  {isMinimized ? <ChevronRight className="w-5 h-5 -rotate-90" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} 
                  className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
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
                        className="flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 bg-light hover:bg-steel/10 border border-steel/10 rounded-full text-xs font-semibold text-darker transition-colors"
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
                      className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed shrink-0 active:scale-95"
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
