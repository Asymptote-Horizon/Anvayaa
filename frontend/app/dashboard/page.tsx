"use client";

import { useEffect, useState, useRef } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import TopPick from "@/components/dashboard/TopPick";
import CourseCard from "@/components/dashboard/CourseCard";
import MagicTransformer from "@/components/dashboard/MagicTransformer";
import { getCourses, type Course } from "@/lib/api";

/**
 * Dashboard Page — main hub with sidebar, course grid, top pick, and magic transformer.
 * Fetches courses from GET /courses FastAPI endpoint.
 */
export default function DashboardPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showVoicePopup, setShowVoicePopup] = useState(false);
  const [voiceInput, setVoiceInput] = useState("");
  const voiceInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        console.error("[Anvaya] Failed to fetch courses:", err);
        setError("Could not load courses. Make sure the backend is running.");
      }
      setLoading(false);
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Voice popup logic
      if (showVoicePopup) {
        if (e.key === "Enter") {
          e.preventDefault();
          window.dispatchEvent(new CustomEvent("send-to-ai-chat", { detail: voiceInput }));
          setShowVoicePopup(false);
          setVoiceInput("");
        } else if (e.key === "Escape") {
          setShowVoicePopup(false);
        }
        return;
      }

      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") return;

      const key = e.key.toLowerCase();
      if (key === "j") {
        e.preventDefault();
        setShowVoicePopup(true);
        window.dispatchEvent(new Event("open-ai-chat"));
      } else if (key === "f") {
        e.preventDefault();
        if ("speechSynthesis" in window) {
          const courseTitles = courses.map(c => c.title).join(". ");
          const text = `Anvaya Dashboard. You have ${courses.length} courses available. ${courseTitles}. Press J to ask me anything about your learning journey.`;
          const utterance = new SpeechSynthesisUtterance(text);
          window.speechSynthesis.speak(utterance);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showVoicePopup, voiceInput, courses]);

  useEffect(() => {
    if (showVoicePopup && voiceInputRef.current) {
      voiceInputRef.current.focus();
    }
  }, [showVoicePopup]);

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Sidebar />

      <div className="ml-64">
        <TopBar title="My Courses" />

        <main className="p-6 md:p-8 space-y-8 max-w-6xl">
          {/* Top Pick */}
          <TopPick />

          {/* Your Courses */}
          <section aria-label="Your courses">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              📚 Your Courses
            </h2>

            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-64 bg-gray-100 rounded-2xl animate-pulse"
                  />
                ))}
              </div>
            )}

            {error && (
              <div className="p-6 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}

            {!loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} progress={0} />
                ))}
              </div>
            )}
          </section>

          {/* Magic Transformer */}
          <MagicTransformer />
        </main>
      </div>

      {/* Voice Recognition Popup Mock */}
      {showVoicePopup && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-[var(--color-surface)] shadow-2xl rounded-2xl p-6 border-2 border-teal-500 z-50 animate-slide-up w-[90%] max-w-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
            <span className="font-bold text-[var(--color-text)]">
              Voice recognition started...
            </span>
          </div>
          <input
            ref={voiceInputRef}
            type="text"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Dictate your prompt..."
            value={voiceInput}
            onChange={(e) => setVoiceInput(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-2">Press Enter to send to Chatbot, ESC to cancel.</p>
        </div>
      )}
    </div>
  );
}
