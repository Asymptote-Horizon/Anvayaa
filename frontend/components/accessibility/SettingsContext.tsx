"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ThemeType = "default" | "high-contrast" | "dark";
export type TextSizeType = "normal" | "large" | "xlarge";

interface SettingsContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  textSize: TextSizeType;
  setTextSize: (size: TextSizeType) => void;
  dyslexicFont: boolean;
  setDyslexicFont: (enabled: boolean) => void;
  ttsVoice: string;
  setTtsVoice: (voice: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>("default");
  const [textSize, setTextSize] = useState<TextSizeType>("normal");
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [ttsVoice, setTtsVoice] = useState("female-1"); // Example default

  // Load from local storage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("anvaya_theme") as ThemeType;
    const savedSize = localStorage.getItem("anvaya_textSize") as TextSizeType;
    const savedFont = localStorage.getItem("anvaya_dyslexic");
    const savedVoice = localStorage.getItem("anvaya_voice");

    if (savedTheme) setTheme(savedTheme);
    if (savedSize) setTextSize(savedSize);
    if (savedFont) setDyslexicFont(savedFont === "true");
    if (savedVoice) setTtsVoice(savedVoice);
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem("anvaya_theme", theme);
    localStorage.setItem("anvaya_textSize", textSize);
    localStorage.setItem("anvaya_dyslexic", dyslexicFont.toString());
    localStorage.setItem("anvaya_voice", ttsVoice);

    // Scaling the entire UI via rem units mapping to root html font-size
    if (textSize === "large") {
      document.documentElement.style.fontSize = "18px";
    } else if (textSize === "xlarge") {
      document.documentElement.style.fontSize = "22px";
    } else {
      document.documentElement.style.fontSize = "16px";
    }

    // Apply to body classes for global theme/font overrides
    document.body.className = `min-h-full flex flex-col bg-background text-foreground theme-${theme} ${dyslexicFont ? 'font-dyslexic' : ''}`;
  }, [theme, textSize, dyslexicFont, ttsVoice]);

  return (
    <SettingsContext.Provider value={{
      theme, setTheme,
      textSize, setTextSize,
      dyslexicFont, setDyslexicFont,
      ttsVoice, setTtsVoice
    }}>
      {children}
    </SettingsContext.Provider>
  );
}
