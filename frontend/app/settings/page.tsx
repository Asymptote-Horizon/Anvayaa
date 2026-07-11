"use client";

import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import { useSettings, ThemeType, TextSizeType } from "@/components/accessibility/SettingsContext";
import { useAudio } from "@/components/accessibility/AudioContext";
import PageReader from "@/components/accessibility/PageReader";
import { Check, Settings, Eye, Type, Volume2, TypeOutline } from "lucide-react";

export default function SettingsPage() {
  const {
    theme, setTheme,
    textSize, setTextSize,
    dyslexicFont, setDyslexicFont,
    ttsVoice, setTtsVoice
  } = useSettings();

  const { audioOn, setAudioOn, audioSpeed, setAudioSpeed } = useAudio();

  const themes: { id: ThemeType; label: string; desc: string }[] = [
    { id: "default", label: "Default Light", desc: "Clean, bright, and modern." },
    { id: "dark", label: "Premium Dark", desc: "Easier on eyes in low light." },
    { id: "high-contrast", label: "High Contrast", desc: "Maximum readability." },
  ];

  const sizes: { id: TextSizeType; label: string; desc: string }[] = [
    { id: "normal", label: "Normal", desc: "Standard text size." },
    { id: "large", label: "Large", desc: "Comfortably increased text size." },
    { id: "xlarge", label: "Extra Large", desc: "Maximum text size for visibility." },
  ];

  const voices = [
    { id: "female-1", label: "English (Female, Clear)" },
    { id: "male-1", label: "English (Male, Deep)" },
    { id: "hindi-1", label: "Hindi (Female)" },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <PageReader text="Settings page. Adjust your display preferences like color theme, text size, font choice, and global audio settings here." />
      <Sidebar />
      <div className="ml-64">
        <TopBar title="Settings" />
        <main className="p-8 max-w-4xl mx-auto space-y-8 animate-fade-in">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <Settings className="w-8 h-8 text-teal-600" />
              Accessibility & Preferences
            </h1>
            <p className="text-gray-500 mt-2">
              Customize Anvaya to perfectly match your learning needs. Changes apply immediately across all courses.
            </p>
          </div>

          {/* Theme Settings */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <Eye className="w-5 h-5 text-teal-600" />
              Visual Theme
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    theme === t.id
                      ? "border-teal-500 bg-teal-50 shadow-md transform scale-[1.02]"
                      : "border-gray-100 hover:border-teal-200 hover:bg-gray-50 bg-white"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-gray-800">{t.label}</span>
                    {theme === t.id && <Check className="w-5 h-5 text-teal-600" />}
                  </div>
                  <p className="text-xs text-gray-500">{t.desc}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Typography Settings */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <Type className="w-5 h-5 text-teal-600" />
              Text & Reading
            </h2>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Text Size</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {sizes.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setTextSize(s.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        textSize === s.id
                          ? "border-teal-500 bg-teal-50 shadow-md transform scale-[1.02]"
                          : "border-gray-100 hover:border-teal-200 hover:bg-gray-50 bg-white"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-gray-800">{s.label}</span>
                        {textSize === s.id && <Check className="w-5 h-5 text-teal-600" />}
                      </div>
                      <p className="text-xs text-gray-500">{s.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50">
                <div>
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <TypeOutline className="w-4 h-4 text-teal-600" />
                    Dyslexia-Friendly Font
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Use Comic Sans or OpenDyslexic to improve readability.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={dyslexicFont}
                    onChange={(e) => setDyslexicFont(e.target.checked)}
                  />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-teal-600"></div>
                </label>
              </div>
            </div>
          </section>

          {/* Audio & TTS Settings */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <Volume2 className="w-5 h-5 text-teal-600" />
              Audio & Narration (TTS)
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50">
                <div>
                  <h3 className="font-semibold text-gray-800">Global Audio (Sound Effects)</h3>
                  <p className="text-sm text-gray-500 mt-1">Play interface sounds and introductory audio.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={audioOn}
                    onChange={(e) => setAudioOn(e.target.checked)}
                  />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-teal-600"></div>
                </label>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Narration Speed: {audioSpeed}x</p>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.25"
                  value={audioSpeed}
                  onChange={(e) => setAudioSpeed(parseFloat(e.target.value))}
                  className="w-full h-2 bg-teal-100 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Slower (0.5x)</span>
                  <span>Normal (1x)</span>
                  <span>Faster (2.0x)</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Preferred Voice</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {voices.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setTtsVoice(v.id)}
                      className={`p-3 rounded-lg border text-sm text-left transition-all ${
                        ttsVoice === v.id
                          ? "border-teal-500 bg-teal-50 text-teal-800 font-medium"
                          : "border-gray-200 hover:border-teal-300 hover:bg-gray-50 text-gray-700 bg-white"
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
                <button 
                  className="mt-4 px-4 py-2 text-sm text-teal-700 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors border border-teal-200"
                  onClick={() => alert(`This is a stub. Would test voice: ${ttsVoice}`)}
                >
                  Listen to a sample
                </button>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
