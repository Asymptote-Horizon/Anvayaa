"use client";

import Link from "next/link";
import Image from "next/image";
import type { Course } from "@/lib/api";
import {
  Atom,
  FlaskConical,
  Calculator,
  BookOpen,
  Monitor,
  Heart,
} from "lucide-react";

const subjectIcons: Record<string, React.ReactNode> = {
  Physics: <Atom className="w-6 h-6" />,
  Chemistry: <FlaskConical className="w-6 h-6" />,
  Mathematics: <Calculator className="w-6 h-6" />,
  English: <BookOpen className="w-6 h-6" />,
  "Computer Science": <Monitor className="w-6 h-6" />,
  "Life Skills": <Heart className="w-6 h-6" />,
};

const subjectColors: Record<string, string> = {
  Physics: "from-blue-500 to-indigo-600",
  Chemistry: "from-emerald-500 to-green-600",
  Mathematics: "from-purple-500 to-violet-600",
  English: "from-rose-500 to-pink-600",
  "Computer Science": "from-cyan-500 to-teal-600",
  "Life Skills": "from-amber-500 to-orange-600",
};

interface CourseCardProps {
  course: Course;
  progress?: number;
}

export default function CourseCard({ course, progress = 0 }: CourseCardProps) {
  const icon = subjectIcons[course.subject] || <BookOpen className="w-6 h-6" />;
  const gradient = subjectColors[course.subject] || "from-gray-500 to-gray-600";

  return (
    <Link
      href={`/course/${course.id}`}
      className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
      aria-label={`Open course: ${course.title}`}
    >
      {/* Poster header */}
      <div
        className={`h-40 bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}
      >
        <Image
          src={course.thumbnail_url}
          alt={`${course.subject} poster`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent" />
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold tracking-wide">
          {course.subject}
        </div>
        <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white flex items-center justify-center transform group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-base font-semibold text-gray-800 mb-1 group-hover:text-teal-700 transition-colors">
          {course.title}
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Progress bar */}
        <div>
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
