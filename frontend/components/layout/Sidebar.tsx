"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Compass,
  Gamepad2,
  Settings,
  Scale,
  GraduationCap,
  Sparkles,
  Map,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "My Courses", icon: BookOpen },
  { href: "/discover-yourself", label: "Discover Yourself", icon: Compass },
  { href: "/magic-transformer", label: "Magic Transformer", icon: Sparkles },
  { href: "/activities", label: "Activities & Games", icon: Gamepad2 },
  { href: "/know-your-rights", label: "Know Your Rights", icon: Scale },
  { href: "/walkthrough", label: "Walkthrough", icon: Map },
  { href: "/settings", label: "Settings", icon: Settings },
];

/**
 * Sidebar — left navigation for dashboard and inner pages.
 * Shows Anvaya logo, nav links, and user avatar placeholder at bottom.
 */
export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-100 flex flex-col z-40"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-50">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 group"
          aria-label="Anvaya home"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-800 tracking-tight">
            Anvaya
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-teal-50 text-teal-700 border-l-4 border-teal-600 pl-3"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* User avatar placeholder */}
      <div className="p-4 border-t border-gray-50">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">A</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">Student</p>
            <p className="text-xs text-gray-400">Anvaya Learner</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
