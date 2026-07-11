"use client";

/**
 * SmartContentPlayer — course content display with video embed and text area.
 * TODO: implement real video controls, TTS, and AI summary
 */

import { Volume2 } from "lucide-react";

interface SmartContentPlayerProps {
  title: string;
  contentStub: string;
  videoUrl?: string;
}

export default function SmartContentPlayer({
  title,
  contentStub,
  videoUrl,
}: SmartContentPlayerProps) {
  const handleReadAloud = () => {
    // TODO: implement text-to-speech
    console.log(`[Anvaya] TTS stub: reading content for "${title}"`);
  };

  return (
    <div className="space-y-6">
      {/* Video embed area */}
      <div className="relative rounded-2xl overflow-hidden bg-gray-900 aspect-video shadow-lg">
        <iframe
          src={videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"}
          title={`Video for ${title}`}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Text content */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Course Content
          </h2>
          <button
            onClick={handleReadAloud}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-700 text-sm font-medium transition-colors"
            aria-label="Read content aloud"
          >
            <Volume2 className="w-4 h-4" />
            Read Aloud
          </button>
        </div>
        <div className="prose prose-gray max-w-none">
          {contentStub
            .split("\n\n")
            .filter((paragraph) => paragraph.trim().length > 0)
            .map((paragraph, index) => (
              <p key={index} className="text-base leading-relaxed text-gray-700">
                {paragraph}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
}
