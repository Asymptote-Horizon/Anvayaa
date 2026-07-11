"use client";

import { Sparkles } from "lucide-react";

/**
 * TopPick — highlighted recommendation card at the top of dashboard.
 * Shows a hardcoded recommendation for new users.
 */
export default function TopPick() {
  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-700 p-6 md:p-8 text-white shadow-lg"
      role="region"
      aria-label="Top pick for you"
    >
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-xl" />

      <div className="relative z-10 flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-amber-300" />
        </div>
        <div className="flex-1">
          <p className="text-teal-200 text-sm font-medium mb-1">
            ✨ Top Pick for You
          </p>
          <h3 className="text-xl md:text-2xl font-bold mb-2">
            Getting Started with Anvaya
          </h3>
          <p className="text-teal-100 text-sm md:text-base mb-4 max-w-2xl">
            Learn how Anvaya adapts to your learning style. Discover AI-powered
            tools, accessibility features, and personalised content that makes
            learning enjoyable and effective.
          </p>
          <button
            className="px-5 py-2.5 bg-white text-teal-700 rounded-xl text-sm font-semibold hover:bg-teal-50 transition-colors shadow-md"
            aria-label="Start the getting started course"
          >
            Start Learning →
          </button>
        </div>
      </div>
    </div>
  );
}
