"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AccessibilityBar from "@/components/accessibility/AccessibilityBar";
import GuidedQuestions from "@/components/onboarding/GuidedQuestions";
import { submitOnboarding } from "@/lib/api";
import { GraduationCap } from "lucide-react";

/**
 * Onboarding Page — 5 guided questions.
 * On completion, POSTs to FastAPI /onboarding/answers, then redirects to /dashboard.
 */
export default function OnboardingPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"questions" | "submitting" | "success" | "error">("questions");
  const [errorMsg, setErrorMsg] = useState("");

  const handleComplete = async (answers: Record<string, string>) => {
    setStatus("submitting");
    try {
      const result = await submitOnboarding({ answers });
      // Store user_id for later use
      if (typeof window !== "undefined") {
        localStorage.setItem("anvaya_user_id", result.user_id);
      }
      setStatus("success");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err) {
      console.error("[Anvaya] Onboarding submission error:", err);
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-gray-800">Anvaya</span>
        </div>
        <AccessibilityBar />
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        {status === "questions" && (
          <GuidedQuestions onComplete={handleComplete} />
        )}

        {status === "submitting" && (
          <div className="text-center animate-fade-in">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full border-4 border-teal-200 border-t-teal-600 animate-spin" />
            <p className="text-lg text-gray-600">Saving your preferences…</p>
          </div>
        )}

        {status === "success" && (
          <div className="text-center animate-fade-in">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              All set! 🎉
            </h2>
            <p className="text-gray-500">
              Taking you to your personalised dashboard…
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="text-center animate-fade-in max-w-md">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-500 mb-4">{errorMsg}</p>
            <button
              onClick={() => setStatus("questions")}
              className="px-6 py-3 rounded-xl bg-teal-600 text-white font-medium hover:bg-teal-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
