"use client";

/**
 * VideoOverlay — placeholder for sign language interpretation overlay.
 * TODO: implement real sign language video overlay integration
 */
export default function VideoOverlay() {
  return (
    <div
      className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 flex items-center justify-center min-h-[240px]"
      role="region"
      aria-label="Sign language overlay area"
    >
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </div>
        <p className="text-sm font-medium text-gray-500">
          Sign Language Overlay
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Sign language interpretation will appear here
        </p>
        {/* TODO: integrate sign language video overlay */}
      </div>
    </div>
  );
}
