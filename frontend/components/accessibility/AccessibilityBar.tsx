"use client";

import { useState } from "react";
import { useAudio } from "@/components/accessibility/AudioContext";
import { Globe, Volume2, VolumeX, Mic } from "lucide-react";
import VoiceModal from "./VoiceModal";
import { playLanguageAudio } from "@/lib/api";

/**
 * AccessibilityBar — always-visible icon row (top-right corner).
 * Contains: Language selector, Audio toggle with speed, Mic button.
 * Appears on EVERY page.
 */
export default function AccessibilityBar() {

  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  // Use global audio context
  const { audioOn, setAudioOn, audioSpeed, setAudioSpeed } = useAudio();

  const handleLanguageSelect = (type: "page" | "audio", lang: string) => {
    // TODO: implement language switching
    console.log(`[Anvaya] Language selected: ${type} → ${lang}`);
    if (type === "audio") {
      playLanguageAudio(lang);
    }
    setShowLangMenu(false);
  };

  return (
    <>
      <div
        className="flex items-center gap-2"
        role="toolbar"
        aria-label="Accessibility controls"
      >
        {/* ──── Language Icon ──── */}
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="p-2 rounded-lg hover:bg-teal-50 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400"
            aria-label="Language options"
            aria-expanded={showLangMenu}
          >
            <Globe className="w-5 h-5 text-teal-700" />
          </button>

          {showLangMenu && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 p-2 z-50">
              <p className="text-xs text-gray-400 uppercase tracking-wide px-3 py-1">
                Page Language
              </p>
              {["English", "Hindi"].map((lang) => (
                <button
                  key={`page-${lang}`}
                  onClick={() => handleLanguageSelect("page", lang.toLowerCase())}
                  className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-teal-50 text-gray-700 transition-colors"
                >
                  {lang}
                </button>
              ))}
              <hr className="my-2 border-gray-100" />
              <p className="text-xs text-gray-400 uppercase tracking-wide px-3 py-1">
                Audio Language
              </p>
              {["English", "Hindi"].map((lang) => (
                <button
                  key={`audio-${lang}`}
                  onClick={() => handleLanguageSelect("audio", lang.toLowerCase())}
                  className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-teal-50 text-gray-700 transition-colors"
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ──── Audio Toggle ──── */}
        <div className="relative flex items-center gap-1">
          <button
            onClick={() => setAudioOn(!audioOn)}
            className="p-2 rounded-lg hover:bg-teal-50 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400"
            aria-label={audioOn ? "Turn audio off" : "Turn audio on"}
          >
            {audioOn ? (
              <Volume2 className="w-5 h-5 text-teal-700" />
            ) : (
              <VolumeX className="w-5 h-5 text-gray-400" />
            )}
          </button>

          {audioOn && (
            <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-lg px-3 py-1 shadow-sm">
              <span className="text-xs text-gray-500">{audioSpeed}x</span>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.25"
                value={audioSpeed}
                onChange={(e) => {
                  const speed = parseFloat(e.target.value);
                  setAudioSpeed(speed);
                  // TODO: implement actual TTS speed control
                  console.log(`[Anvaya] Audio speed set to ${speed}x`);
                }}
                className="w-20 h-1 accent-teal-600"
                aria-label="Audio playback speed"
              />
            </div>
          )}
        </div>

        {/* ──── Mic Button ──── */}
        <button
          onClick={() => setShowVoiceModal(true)}
          className="p-2 rounded-lg hover:bg-teal-50 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400"
          aria-label="Activate voice input"
        >
          <Mic className="w-5 h-5 text-teal-700" />
        </button>
      </div>

      {/* Voice Modal */}
      {showVoiceModal && (
        <VoiceModal onClose={() => setShowVoiceModal(false)} />
      )}
    </>
  );
}
