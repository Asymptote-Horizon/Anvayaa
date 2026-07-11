"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import AccessibilityBar from "@/components/accessibility/AccessibilityBar";
import { GraduationCap } from "lucide-react";

/**
 * Landing Page — Anvaya welcome screen with logo, tagline, and "Get Started" button.
 */
import { useEffect, useRef } from "react";

export default function LandingPage() {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dynamicAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is focused on an input or button (except body)
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") return;
      
      const key = e.key.toLowerCase();
      
      if (key === "enter" || e.code === "Space") {
        e.preventDefault();
        router.push("/onboarding");
      } else if (key === "j") {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        if (dynamicAudioRef.current) {
          dynamicAudioRef.current.pause();
          dynamicAudioRef.current.currentTime = 0;
        }
        const audio = new Audio("/audio/learn_more_v2.wav");
        dynamicAudioRef.current = audio;
        audio.play().catch(() => {});
      } else if (key === "f") {
        window.dispatchEvent(new Event("toggle-ai-chat"));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Landing page should always have audio on.
    audio.muted = false;
    audio.volume = 1;

    const tryPlay = () => {
      audio.play().catch(() => {});
    };

    // First attempt on mount.
    tryPlay();

    // If autoplay with sound is blocked, retry on first user interaction.
    const onFirstInteraction = () => {
      tryPlay();
      window.removeEventListener("click", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
      window.removeEventListener("touchstart", onFirstInteraction);
    };

    window.addEventListener("click", onFirstInteraction, { once: true });
    window.addEventListener("keydown", onFirstInteraction, { once: true });
    window.addEventListener("touchstart", onFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("click", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
      window.removeEventListener("touchstart", onFirstInteraction);
      // Clean up playing audio to prevent overlapping when navigating away
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      if (dynamicAudioRef.current) {
        dynamicAudioRef.current.pause();
        dynamicAudioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background text-foreground transition-colors duration-500">
      {/* Dynamic Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 -left-32 w-[30rem] h-[30rem] bg-teal-500/20 rounded-full blur-[100px] opacity-60 mix-blend-multiply dark:mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-20 -right-32 w-[30rem] h-[30rem] bg-amber-500/20 rounded-full blur-[100px] opacity-60 mix-blend-multiply dark:mix-blend-screen animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-indigo-500/10 rounded-full blur-[120px] opacity-50 mix-blend-multiply dark:mix-blend-screen" />
      </div>

      {/* Hidden audio element for landing page */}
      <audio ref={audioRef} src="/audio/landing-page.wav" preload="auto" loop />

      {/* Top bar with accessibility */}
      <header className="relative z-10 flex items-center justify-end px-8 py-6">
        <AccessibilityBar />
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center w-full max-w-5xl mx-auto">
        {/* Logo & Headline */}
        <div className="mb-12 animate-fade-in flex flex-col items-center">
          <div className="w-24 h-24 mb-8 rounded-3xl bg-gradient-to-br from-teal-400 via-teal-500 to-teal-700 flex items-center justify-center shadow-[0_0_40px_rgba(20,184,166,0.3)] ring-1 ring-white/20 dark:ring-white/10 transform transition hover:scale-105 duration-300">
            <GraduationCap className="w-12 h-12 text-white drop-shadow-md" />
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-indigo-600 dark:from-teal-400 dark:to-indigo-400 pb-2">
            Anvaya
          </h1>
          <p className="mt-8 text-xl md:text-2xl text-muted max-w-2xl mx-auto leading-relaxed font-medium">
            Accessible learning, designed exclusively for you.
            <br className="hidden md:block" />
            <span className="text-teal-600 dark:text-teal-400 font-semibold mt-2 inline-block">
              Every learner belongs here.
            </span>
          </p>
        </div>

        {/* CTA Button */}
        <div className="animate-fade-in z-20" style={{ animationDelay: "200ms" }}>
          <Link
            href="/onboarding"
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-teal-600 to-teal-700 dark:from-teal-500 dark:to-teal-600 text-white text-xl font-bold rounded-full shadow-[0_10px_40px_rgba(13,115,119,0.3)] hover:shadow-[0_15px_50px_rgba(13,115,119,0.5)] transition-all hover:-translate-y-1 active:scale-[0.98] overflow-hidden"
            aria-label="Get started with Anvaya"
          >
            <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full -translate-x-full transform transition-transform duration-700 ease-out skew-x-12" />
            <span>Get Started</span>
            <svg
              className="w-6 h-6 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>

        {/* Premium Feature hints */}
        <div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full animate-fade-in"
          style={{ animationDelay: "400ms" }}
        >
          {[
            {
              emoji: "🎯",
              title: "Personalised Growth",
              desc: "Content adapts dynamically to match your unique learning pace.",
            },
            {
              emoji: "♿",
              title: "Built Accessible",
              desc: "Designed ground-up for screen readers, high contrast, and focus.",
            },
            {
              emoji: "✨",
              title: "Smart Assistance",
              desc: "In-built tools that summarize, clarify, and simplify complex topics.",
            },
          ].map(({ emoji, title, desc }) => (
            <div
              key={title}
              className="p-8 rounded-3xl bg-card/60 backdrop-blur-xl border border-border/50 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-16 h-16 rounded-2xl bg-background shadow-inner flex items-center justify-center text-3xl mb-6 ring-1 ring-border">
                {emoji}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {title}
              </h3>
              <p className="text-muted leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 mt-auto">
        <p className="text-sm font-medium text-muted tracking-wide">
          Anvaya &copy; {new Date().getFullYear()} — Empowering inclusive education through technology
        </p>
      </footer>
    </div>
  );
}
