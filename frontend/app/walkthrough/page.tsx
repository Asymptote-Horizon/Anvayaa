import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import PageReader from "@/components/accessibility/PageReader";
import { Keyboard } from "lucide-react";

export const metadata = {
  title: "Walkthrough & Hotkeys | Anvaya",
};

export default function WalkthroughPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <PageReader text="Walkthrough page. Here is a list of all keyboard shortcuts and accessibility gestures available throughout Anvaya." />
      <Sidebar />
      <div className="ml-64">
        <TopBar title="Walkthrough & Hotkeys" />
        <main className="p-8 max-w-4xl mx-auto">
          <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] p-8 shadow-sm prose prose-gray max-w-none text-[var(--color-text)]">
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Keyboard className="w-8 h-8 text-teal-600" />
              Keyboard Shortcuts Guide
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Anvaya is designed to be fully navigable without a mouse. Below is the complete list of hotkeys to enhance your learning experience.
            </p>

            <div className="space-y-8 not-prose">
              
              {/* Global Section */}
              <section className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-bold text-teal-700 dark:text-teal-400 mb-4">🌍 Global (Everywhere)</h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <kbd className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm font-mono text-sm min-w-[60px] text-center">Tab</kbd>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">Navigate through interactive elements sequentially.</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <kbd className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm font-mono text-sm min-w-[60px] text-center">F</kbd>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">Read out loud the main content summary of the current page. If the AI Chatbot is actively open, it reads out the latest AI response instead.</p>
                  </li>
                </ul>
              </section>

              {/* Landing Page */}
              <section className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-bold text-teal-700 dark:text-teal-400 mb-4">🏠 Landing Page</h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <kbd className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm font-mono text-sm min-w-[60px] text-center">Enter</kbd>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">Act as clicking "Get Started" to launch the platform.</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <kbd className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm font-mono text-sm min-w-[60px] text-center">J</kbd>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">Play the detailed introduction audio track (stops background music).</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <kbd className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm font-mono text-sm min-w-[60px] text-center">F</kbd>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">Toggle the AI Chatbot window.</p>
                  </li>
                </ul>
              </section>

              {/* Onboarding */}
              <section className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-bold text-teal-700 dark:text-teal-400 mb-4">📋 Onboarding Questionnaire</h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <kbd className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm font-mono text-sm min-w-[60px] text-center">J</kbd>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">Open the voice dictation menu to speak your answer aloud.</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="flex gap-1">
                      <kbd className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm font-mono text-sm">J</kbd>
                      <kbd className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm font-mono text-sm">J</kbd>
                    </span>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">Double press quickly to immediately launch the AI Chatbot for help.</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <kbd className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm font-mono text-sm min-w-[60px] text-center">F</kbd>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">Skip the current question and bypass it entirely.</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <kbd className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm font-mono text-sm min-w-[60px] text-center">&larr; &rarr;</kbd>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">Navigate seamlessly between given multiple-choice options.</p>
                  </li>
                </ul>
              </section>

              {/* Dashboard */}
              <section className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-bold text-teal-700 dark:text-teal-400 mb-4">📚 Main Dashboard</h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <kbd className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm font-mono text-sm min-w-[60px] text-center">J</kbd>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">Simultaneously open the Chatbot and Voice Dictation immediately. Speak your query and press Enter to auto-send it to the AI.</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <kbd className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm font-mono text-sm min-w-[60px] text-center">F</kbd>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">Triggers the native screen reader to announce all your available Active Courses natively.</p>
                  </li>
                </ul>
              </section>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}