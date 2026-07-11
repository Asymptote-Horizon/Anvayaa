"use client";

import { useEffect } from "react";

/**
 * VoiceModal — "You can speak now…" popup with pulsing animation.
 * Stub: no real speech recognition yet.
 * TODO: implement real speech recognition
 */
interface VoiceModalProps {
  onClose: () => void;
}

export default function VoiceModal({ onClose }: VoiceModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    console.log("[Anvaya] VoiceModal opened — speech recognition stub");
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Voice input"
    >
      <div
        className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-6 max-w-sm mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pulsing circle animation */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-24 h-24 rounded-full bg-teal-100 animate-ping opacity-30" />
          <div className="absolute w-20 h-20 rounded-full bg-teal-200 animate-pulse opacity-50" />
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-lg">
            <svg
              className="w-7 h-7 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-800">
            You can speak now…
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            We&apos;re listening. Say your command or question.
          </p>
        </div>

        <button
          onClick={onClose}
          className="px-6 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400"
          aria-label="Cancel voice input"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
