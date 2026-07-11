"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { sendAIChat } from "@/lib/api";

/**
 * AskAIChat — slide-in chat panel for AI assistance.
 * Sends messages to /ai/chat stub endpoint.
 * TODO: implement real AI chat with LLM integration
 */

interface Message {
  role: "user" | "ai";
  content: string;
}

interface AskAIChatProps {
  courseId?: string;
}

export default function AskAIChat({ courseId }: AskAIChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content:
        "Hi! I am your Anvaya AI learning assistant. Ask me anything.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle Voice interaction & Global events
  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    const handleToggleChat = () => setIsOpen(prev => !prev);
    
    const handleSendFromVoice = async (e: any) => {
      setIsOpen(true);
      const userMessage = e.detail;
      if (!userMessage) return;

      setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
      setLoading(true);
      try {
        const res = await sendAIChat(userMessage, courseId);
        setMessages((prev) => [...prev, { role: "ai", content: res.reply }]);
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          { role: "ai", content: "my wisdom is clouded right now. wait and ill help you soon." },
        ]);
      }
      setLoading(false);
    };

    window.addEventListener("open-ai-chat", handleOpenChat);
    window.addEventListener("toggle-ai-chat", handleToggleChat);
    window.addEventListener("send-to-ai-chat", handleSendFromVoice);
    return () => {
      window.removeEventListener("open-ai-chat", handleOpenChat);
      window.removeEventListener("toggle-ai-chat", handleToggleChat);
      window.removeEventListener("send-to-ai-chat", handleSendFromVoice);
    };
  }, [courseId]);

  // Mock Screen Reader for latest Chat response and toggle key handling
  useEffect(() => {
    const handleChatspeak = (e: KeyboardEvent) => {
      // Toggle logic matching the rest of the application
      // (f key is used on the landing page, j key is used elsewhere)
      const key = e.key.toLowerCase();
      if ((key === 'f' || key === 'j') && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        // If the chat is open, close it (toggling effect)
        if (isOpen) {
          e.preventDefault();
          e.stopImmediatePropagation();
          setIsOpen(false);
          // And read the last message
          const lastAiMessage = [...messages].reverse().find(m => m.role === 'ai');
          if (lastAiMessage && "speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(lastAiMessage.content);
            window.speechSynthesis.speak(utterance);
          }
        }
      }
    };
    window.addEventListener("keydown", handleChatspeak, { capture: true });
    return () => window.removeEventListener("keydown", handleChatspeak, { capture: true });
  }, [isOpen, messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const res = await sendAIChat(userMessage, courseId);
      setMessages((prev) => [...prev, { role: "ai", content: res.reply }]);
    } catch (err) {
      console.error("[Anvaya] AI chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "my wisdom is clouded right now. wait and ill help you soon.",
        },
      ]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Toggle button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
          aria-label="Open AI chat"
        >
          <MessageCircle className="w-5 h-5" />
          AI Chat
        </button>
      )}

      {/* Chat panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="AI Chat"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-teal-600 to-teal-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">
                Anvaya AI Assistant
              </h3>
              <p className="text-teal-200 text-xs">Ask any question</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(100vh-140px)]">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap break-words leading-relaxed ${
                  msg.role === "user"
                    ? "bg-teal-600 text-white rounded-br-md"
                    : "bg-gray-100 text-gray-800 rounded-bl-md"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-white">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your question…"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 focus:outline-none"
              aria-label="Chat message input"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="p-3 rounded-xl bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
