"use client";

import AccessibilityBar from "@/components/accessibility/AccessibilityBar";

/**
 * TopBar — appears at top of pages with sidebar layout.
 * Contains page title and AccessibilityBar on the right.
 */
interface TopBarProps {
  title?: string;
}

export default function TopBar({ title }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-800">
          {title || "Dashboard"}
        </h1>
        <AccessibilityBar />
      </div>
    </header>
  );
}
