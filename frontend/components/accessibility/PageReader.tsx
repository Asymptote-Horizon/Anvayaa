"use client";
import { useEffect } from "react";

/**
 * A hidden component that adds 'F' key mock screen reading functionality
 * to whichever page it's placed on. 
 */
export default function PageReader({ text }: { text: string }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") return;
      
      if (e.key.toLowerCase() === "f") {
        e.preventDefault();
        
        // Wait a slight tick to allow AskAIChat's capture event to run/stop if chat is open
        setTimeout(() => {
          // If Chat is open, its handler stops immediate propagation, so this timeout avoids overlap
          // We can also double check by looking for the translate-x-0 class on the chat panel
          const isChatOpen = window.document.querySelector('[aria-label="AI Chat"]')?.classList.contains("translate-x-0");
          if (isChatOpen) return;

          if ("speechSynthesis" in window) {
             window.speechSynthesis.cancel();
             const utterance = new SpeechSynthesisUtterance(text);
             window.speechSynthesis.speak(utterance);
          }
        }, 10);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [text]);

  return <div aria-hidden="true" className="hidden" />;
}