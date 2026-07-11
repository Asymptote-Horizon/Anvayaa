import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anvaya — Accessible Learning for Everyone",
  description:
    "Anvaya is an accessible Learning Management System designed for specially-abled students. Learn at your own pace with AI-powered tools and accessibility features.",
};

import { AudioProvider } from "@/components/accessibility/AudioContext";
import { SettingsProvider } from "@/components/accessibility/SettingsContext";
import AskAIChat from "@/components/course/AskAIChat";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[var(--color-bg)] text-[var(--color-text)]">
        <SettingsProvider>
          <AudioProvider>
            {children}
            <AskAIChat />
          </AudioProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
