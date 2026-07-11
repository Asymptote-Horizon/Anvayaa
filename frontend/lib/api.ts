/**
 * Anvaya LMS — API Client
 * All functions that communicate with the FastAPI backend.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

// ──── Generic fetch helper ────
async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch (err) {
    console.error(`[apiFetch] Network error calling ${path}:`, err);
    throw new Error("Cannot connect to the backend server. Please check your connection and try again.");
  }

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }
  return res.json();
}

// ──── Onboarding ────
export interface OnboardingAnswers {
  user_id?: string;
  answers: Record<string, string | string[]>;
}

export interface OnboardingResponse {
  success: boolean;
  user_id: string;
}

export function submitOnboarding(data: OnboardingAnswers) {
  return apiFetch<OnboardingResponse>("/onboarding/answers", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ──── Courses ────
export interface Course {
  id: string;
  title: string;
  subject: string;
  description: string;
  thumbnail_url: string;
  video_url?: string;
}

export interface CourseDetail extends Course {
  content_stub: string;
  video_url?: string;
}

export function getCourses() {
  return apiFetch<Course[]>("/courses/");
}

export function getCourse(id: string) {
  return apiFetch<CourseDetail>(`/courses/${id}`);
}

// ──── Progress ────
export interface ProgressRecord {
  id: string;
  user_id: string;
  course_id: string;
  last_position: number;
  updated_at: string;
}

export interface SaveProgressData {
  user_id: string;
  course_id: string;
  last_position: number;
  timestamp?: string;
}

export function getProgress(userId: string, courseId: string) {
  return apiFetch<ProgressRecord | null>(`/progress/${userId}/${courseId}`);
}

export function saveProgress(data: SaveProgressData) {
  return apiFetch<ProgressRecord>("/progress/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ──── AI (Stubs) ────
export interface ChatResponse {
  reply: string;
}

export function sendAIChat(message: string, courseId?: string) {
  return apiFetch<ChatResponse>("/ai/chat", {
    method: "POST",
    body: JSON.stringify({ message, course_id: courseId || "" }),
  });
}

export interface TransformResponse {
  transformed: string;
}

export function transformContent(content: string) {
  return apiFetch<TransformResponse>("/ai/transform", {
    method: "POST",
    body: JSON.stringify({ content }),
  });
}

// ──── Audio Stub ────
/**
 * Stub: play language audio file.
 * TODO: implement real TTS / audio playback
 */
export function playLanguageAudio(lang: string) {
  console.log(`[Anvaya] playLanguageAudio called for language: ${lang}`);
  // TODO: implement actual audio playback from public/audio/ directory
}
