"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useAudio } from "@/components/accessibility/AudioContext";

const QUESTIONS = [
  {
    id: "interests",
    question: "What would you like to learn?",
    type: "text" as const,
    placeholder: "e.g. Physics, Art, Mathematics, Life Skills…",
  },
  {
    id: "visual",
    question: "Do you have any visual considerations?",
    type: "single" as const,
    options: [
      "No",
      "I use screen readers",
      "I prefer high contrast",
      "I prefer large text",
    ],
  },
  {
    id: "hearing",
    question: "Do you have any hearing considerations?",
    type: "single" as const,
    options: [
      "No",
      "I prefer captions/subtitles",
      "I use sign language",
    ],
  },
  {
    id: "learning_style",
    question: "How do you prefer to learn?",
    type: "single" as const,
    options: ["Reading", "Videos", "Audio", "Mixed"],
  },
];

interface GuidedQuestionsProps {
  onComplete: (answers: Record<string, string>) => void;
}

export default function GuidedQuestions({ onComplete }: GuidedQuestionsProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedIndex, setSelectedIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { audioOn, audioSpeed } = useAudio();

  const [showVoicePopup, setShowVoicePopup] = useState(false);
  const [voiceInput, setVoiceInput] = useState("");
  const lastJPress = useRef(0);
  const voiceInputRef = useRef<HTMLInputElement>(null);

  const question = QUESTIONS[currentStep];
  const totalSteps = QUESTIONS.length;
  const isLast = currentStep === totalSteps - 1;

  const handleSelect = useCallback(
    (value: string) => {
      setAnswers((prev) => ({ ...prev, [question.id]: value }));
    },
    [question.id]
  );

  const handleNext = useCallback(() => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(50);
    // Even if empty, allow logic to pass if skipped (though normally button is disabled unless answered)
    if (!answers[question.id] && answers[question.id] !== "Skipped") return;
    if (isLast) {
      onComplete(answers);
    } else {
      setCurrentStep((s) => s + 1);
      setSelectedIndex(0);
      setShowVoicePopup(false);
      setVoiceInput("");
    }
  }, [answers, question.id, isLast, onComplete]);

  const handleBack = useCallback(() => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(50);
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
      setSelectedIndex(0);
      setShowVoicePopup(false);
      setVoiceInput("");
    }
  }, [currentStep]);

  const handleSkip = useCallback(() => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(50);
    handleSelect("Skipped");
    setTimeout(() => {
      // Small timeout to allow state to catch up before next
      if (isLast) {
        onComplete({ ...answers, [question.id]: "Skipped" });
      } else {
        setCurrentStep((s) => s + 1);
        setSelectedIndex(0);
        setShowVoicePopup(false);
        setVoiceInput("");
      }
    }, 50);
  }, [handleSelect, isLast, onComplete, answers, question.id]);

  const submitVoiceInput = useCallback(() => {
    if (!voiceInput.trim()) return;
    
    if (question.type === "text") {
      handleSelect(voiceInput);
      setTimeout(handleNext, 100);
    } else if (question.type === "single" && question.options) {
      // simple fuzzy matching
      const lowerVoice = voiceInput.toLowerCase();
      let matchedOption = question.options[0]; // fallback
      for (const opt of question.options) {
        // e.g if voice says "screen reader" and option is "I use screen readers"
        const optWords = opt.toLowerCase().split(" ").filter(w => w.length > 2);
        const matches = optWords.some(w => lowerVoice.includes(w)) || lowerVoice.includes(opt.toLowerCase());
        if (matches) {
          matchedOption = opt;
          break;
        }
      }
      handleSelect(matchedOption);
      setTimeout(handleNext, 100);
    }
  }, [voiceInput, question, handleSelect, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block base listeners if voice popup is active
      if (showVoicePopup) {
        if (e.key === "Enter") {
          e.preventDefault();
          submitVoiceInput();
        } else if (e.key === "Escape") {
          setShowVoicePopup(false);
        }
        return;
      }

      // Voice recognition & Chatbot sequence
      if (e.key.toLowerCase() === "j" && document.activeElement?.tagName !== "INPUT") {
        const now = Date.now();
        if (now - lastJPress.current < 400) {
          // Double J
          setShowVoicePopup(false);
          window.dispatchEvent(new Event("open-ai-chat"));
          lastJPress.current = 0;
        } else {
          lastJPress.current = now;
          // Set a timeout to check if a second J comes
          setTimeout(() => {
            if (lastJPress.current === now && !showVoicePopup) {
              setShowVoicePopup(true);
            }
          }, 400);
        }
        return;
      }

      // F for Skip
      if (e.key.toLowerCase() === "f" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        handleSkip();
        return;
      }

      if (document.activeElement?.tagName === "INPUT" && e.key !== "Enter") return;

      if (question.type === "single" && question.options) {
        if (e.key === "ArrowDown" || e.key === "ArrowRight") {
          e.preventDefault();
          setSelectedIndex((i) =>
            Math.min(i + 1, question.options!.length - 1)
          );
        } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
          e.preventDefault();
          setSelectedIndex((i) => Math.max(i - 1, 0));
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (answers[question.id]) {
            handleNext();
          } else {
            handleSelect(question.options![selectedIndex]);
          }
        }
      } else if (e.key === "Enter" && question.type === "text") {
        e.preventDefault();
        handleNext();
      }

      if (e.key === "Backspace" && question.type !== "text") {
        handleBack();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    question,
    selectedIndex,
    answers,
    handleNext,
    handleBack,
    handleSelect,
    showVoicePopup,
    submitVoiceInput,
    handleSkip
  ]);

  useEffect(() => {
    if (showVoicePopup && voiceInputRef.current) {
      voiceInputRef.current.focus();
    }
  }, [showVoicePopup]);

  // Auto-select when using arrow keys
  useEffect(() => {
    if (question.type === "single" && question.options) {
      handleSelect(question.options[selectedIndex]);
    }
  }, [selectedIndex, question, handleSelect]);


  // Play onboarding audio for each question
  useEffect(() => {
    // Determine audio file name: onboarding-q1.wav, onboarding-q2.wav, ...
    const audioFile = `/audio/onboarding-q${currentStep + 1}.wav`;
    if (audioRef.current) {
      audioRef.current.src = audioFile;
      audioRef.current.load();
      if (audioOn) {
        audioRef.current.play().catch((e) => {
          // Autoplay may be blocked by browser
          console.warn("[Anvaya] Audio play failed:", e);
        });
      }
    }
  }, [currentStep]);

  // Mute/unmute and set playback speed when audioOn/audioSpeed changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = !audioOn;
      audioRef.current.playbackRate = audioSpeed;
      if (audioOn) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [audioOn, audioSpeed, currentStep]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-card shadow-2xl rounded-3xl p-8 md:p-12 border border-border transition-colors duration-500">
      {/* Hidden audio element for onboarding question */}
      <audio ref={audioRef} style={{ display: "none" }} preload="auto" />
      {/* Progress bar */}
      <div className="mb-10">
        <div className="flex items-center justify-between text-sm text-muted font-bold tracking-wider uppercase mb-4">
          <span>
            Question {currentStep + 1} of {totalSteps}
          </span>
          <span className="text-teal-600 dark:text-teal-400">{Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
        </div>
        <div className="h-3 bg-background rounded-full overflow-hidden shadow-inner ring-1 ring-border/50">
          <div
            className="h-full bg-gradient-to-r from-teal-400 via-teal-500 to-indigo-500 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            role="progressbar"
            aria-valuenow={currentStep + 1}
            aria-valuemin={1}
            aria-valuemax={totalSteps}
          />
        </div>
      </div>

      {/* Question */}
      <div className="text-center mb-10 animate-fade-in transition-all duration-300">
        <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
          {question.question}
        </h2>
        <p className="text-muted text-base md:text-lg font-medium">
          {question.type === "single"
            ? "Use arrow keys to navigate, press Enter to confirm"
            : "Type your answer below and press Enter"}
        </p>
      </div>

      {/* Answer area */}
      <div className="space-y-4 mb-12 animate-fade-in delay-100">
        {question.type === "single" &&
          question.options?.map((option, idx) => (
            <button
              key={option}
              onClick={() => {
                setSelectedIndex(idx);
                handleSelect(option);
              }}
              className={`w-full group text-left px-8 py-5 rounded-2xl border-2 transition-all duration-300 transform outline-none focus:ring-4 focus:ring-teal-500 focus:ring-opacity-50 ${
                answers[question.id] === option
                  ? "border-teal-500 bg-teal-500/10 text-teal-800 dark:text-teal-400 shadow-[0_0_20px_rgba(20,184,166,0.15)] scale-[1.02]"
                  : idx === selectedIndex
                  ? "border-teal-300 bg-teal-50/50 dark:bg-teal-900/20 text-foreground shadow-md scale-[1.01]"
                  : "border-border bg-background text-foreground hover:border-teal-200 hover:bg-card hover:shadow-sm"
              }`}
              aria-pressed={answers[question.id] === option}
              role="option"
              aria-selected={answers[question.id] === option}
            >
              <span className="flex items-center gap-4">
                <span
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    answers[question.id] === option
                      ? "border-teal-500 bg-teal-500"
                      : "border-muted group-hover:border-teal-300"
                  }`}
                >
                  {answers[question.id] === option && (
                    <svg
                      className="w-3.5 h-3.5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </span>
                <span className="font-semibold">{option}</span>
              </span>
            </button>
          ))}

        {question.type === "text" && (
          <input
            type="text"
            value={answers[question.id] || ""}
            onChange={(e) => handleSelect(e.target.value)}
            placeholder={question.placeholder}
            className="w-full px-8 py-6 rounded-2xl border-2 border-border bg-background text-2xl font-medium text-foreground placeholder:text-muted/60 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 focus:outline-none transition-all shadow-inner"
            autoFocus
            aria-label={question.question}
          />
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className="px-8 py-4 rounded-xl font-bold text-muted hover:text-foreground hover:bg-background disabled:opacity-30 disabled:hover:text-muted disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors outline-none focus:ring-2 focus:ring-teal-500"
          aria-label="Go back"
        >
          ← Back
        </button>

        <div className="flex gap-4">
          <button
            onClick={handleSkip}
            className="px-8 py-4 rounded-xl font-bold text-muted hover:text-foreground hover:bg-background transition-colors outline-none focus:ring-2 focus:ring-teal-500"
            aria-label="Skip question (Press F)"
          >
            Skip (F)
          </button>
          <button
            onClick={handleNext}
            disabled={!answers[question.id] && answers[question.id] !== "Skipped"}
            className="px-10 py-4 bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:-translate-y-1 active:scale-95 outline-none focus:ring-4 focus:ring-teal-500/40"
            aria-label={isLast ? "Submit answers" : "Next question"}
          >
            {isLast ? "Complete Setup ✓" : "Next Step →"}
          </button>
        </div>
      </div>

      {/* Voice Recognition Popup Mock */}
      {showVoicePopup && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-6 border-2 border-teal-500 z-50 animate-slide-up w-[90%] max-w-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
            <span className="font-bold text-gray-800 dark:text-gray-100">
              Voice recognition started...
            </span>
          </div>
          <input
            ref={voiceInputRef}
            type="text"
            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Dictate your answer..."
            value={voiceInput}
            onChange={(e) => setVoiceInput(e.target.value)}
          />
          <p className="text-xs text-muted mt-2">Press Enter to submit, ESC to cancel.</p>
        </div>
      )}
    </div>
  );
}
