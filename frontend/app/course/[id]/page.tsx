"use client";

import { useEffect, useState, useRef, use } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import SmartContentPlayer from "@/components/course/SmartContentPlayer";
import VideoOverlay from "@/components/course/VideoOverlay";
import PageReader from "@/components/accessibility/PageReader";
import RevisionTest from "@/components/course/RevisionTest";
import { getCourse, getProgress, saveProgress, type CourseDetail } from "@/lib/api";
import Link from "next/link";

/**
 * Course Player Page — two-column layout with content player and sign language overlay.
 * Auto-saves progress after 10 seconds on the page.
 */
export default function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const isPhysicsCourse = id === "course-physics-101";
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasResumeData, setHasResumeData] = useState(false);
  const progressSaved = useRef(false);

  // Fetch course data
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getCourse(id);
        setCourse(data);
      } catch (err) {
        console.error("[Anvaya] Failed to load course:", err);
      }
      setLoading(false);
    };
    fetch();
  }, [id]);

  // Check for existing progress
  useEffect(() => {
    const checkProgress = async () => {
      const userId =
        typeof window !== "undefined"
          ? localStorage.getItem("anvaya_user_id")
          : null;
      if (!userId) return;

      try {
        const progress = await getProgress(userId, id);
        if (progress) {
          setHasResumeData(true);
        }
      } catch {
        // No progress found — that's fine
      }
    };
    checkProgress();
  }, [id]);

  // Auto-save progress after 10 seconds
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (progressSaved.current) return;
      const userId =
        typeof window !== "undefined"
          ? localStorage.getItem("anvaya_user_id")
          : null;
      if (!userId) return;

      try {
        await saveProgress({
          user_id: userId,
          course_id: id,
          last_position: 0,
          timestamp: new Date().toISOString(),
        });
        progressSaved.current = true;
        console.log("[Anvaya] Progress saved for course:", id);
      } catch (err) {
        console.error("[Anvaya] Failed to save progress:", err);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)]">
        <Sidebar />
        <div className="ml-64">
          <TopBar title="Loading…" />
          <main className="p-8">
            <div className="h-96 bg-gray-100 rounded-2xl animate-pulse" />
          </main>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)]">
        <Sidebar />
        <div className="ml-64">
          <TopBar title="Course Not Found" />
          <main className="p-8 text-center">
            <p className="text-gray-500">This course could not be found.</p>
            <Link
              href="/dashboard"
              className="inline-block mt-4 px-6 py-3 bg-teal-600 text-white rounded-xl"
            >
              Back to Dashboard
            </Link>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <PageReader text={`Course page for ${course.title}. Press J to ask questions to the AI assistant.`} />
      <Sidebar />

      <div className="ml-64">
        <TopBar title={course.title} />

        <main className="p-6 md:p-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-gray-500" aria-label="Breadcrumb">
            <Link href="/dashboard" className="hover:text-teal-600 transition-colors">
              Dashboard
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-medium">{course.title}</span>
          </nav>

          {/* Resume banner */}
          {hasResumeData && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-between animate-fade-in">
              <p className="text-sm text-amber-800">
                📍 You&apos;ve been here before. Resume where you left off?
              </p>
              <button
                className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors"
                aria-label="Resume course"
              >
                Resume
              </button>
            </div>
          )}

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
            {/* Left: Content (70%) */}
            <div className="relative">
              <SmartContentPlayer
                title={course.title}
                contentStub={course.content_stub}
                videoUrl={course.video_url}
              />
            </div>

            {/* Right: Sign language area */}
            <div className="space-y-6">
              {isPhysicsCourse ? (
                <div className="hidden lg:block w-full rounded-xl overflow-hidden border border-gray-200 bg-white shadow-xl mt-0">
                  <div className="px-3 py-2 bg-gray-900 text-white text-xs font-semibold tracking-wide">
                    Sign Language Overlay
                  </div>
                  <div className="relative aspect-video bg-black">
                    <iframe
                      src="https://www.youtube.com/embed/YOkH62jOgV4?si=MkP9qU1zRRvuyET4"
                      title="Physics Sign Language Overlay"
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              ) : (
                <VideoOverlay />
              )}
            </div>
          </div>
          
          <RevisionTest />
        </main>
      </div>
    </div>
  );
}
