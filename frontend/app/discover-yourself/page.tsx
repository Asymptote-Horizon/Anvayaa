import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";

import PageReader from "@/components/accessibility/PageReader";

export const metadata = {
  title: "Discover Yourself | Anvaya",
};

const reflectionPrompts = [
  "What are 3 things I do really well in class or daily life?",
  "When do I feel most confident while learning?",
  "What support helps me learn faster: visuals, audio, practice, or discussion?",
  "What is one challenge I handled well this month?",
];

const strengthsIdeas = [
  "Creative thinking and storytelling",
  "Problem-solving with step-by-step methods",
  "Strong memory for visuals or sounds",
  "Persistence and calm under pressure",
  "Helping friends and teamwork",
  "Clear communication with tools and assistive tech",
];

const growthPlan = [
  "Set one small goal for this week",
  "Track progress in 5-minute daily notes",
  "Celebrate effort, not just marks",
  "Ask for one specific support when needed",
];

export default function DiscoverYourselfPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <PageReader text="Discover Yourself page. Learn about your visual, auditory, kinesthetic, or reading learning styles and explore your personal strengths." />
      <Sidebar />
      <div className="ml-64">
        <TopBar title="Discover Yourself" />
        <main className="p-8 max-w-4xl">
          <article className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm prose prose-gray max-w-none">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              🌟 Discover Yourself
            </h1>
            <p className="text-gray-700">
              This space helps you understand your strengths, learning style,
              and goals. There is no right or wrong answer, only your journey.
            </p>

            <section className="mt-8 mb-8">
              <h2 className="text-xl font-semibold text-teal-700 mb-3">
                Know Your Learning Style
              </h2>
              <div className="grid sm:grid-cols-2 gap-3 not-prose">
                <div className="p-4 rounded-xl border border-teal-100 bg-teal-50">
                  <h3 className="font-semibold text-teal-900 mb-1">Visual Learner</h3>
                  <p className="text-sm text-teal-800">Charts, diagrams, colors, and videos help you understand better.</p>
                </div>
                <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50">
                  <h3 className="font-semibold text-indigo-900 mb-1">Auditory Learner</h3>
                  <p className="text-sm text-indigo-800">Listening, spoken explanations, and audio notes work best for you.</p>
                </div>
                <div className="p-4 rounded-xl border border-amber-100 bg-amber-50">
                  <h3 className="font-semibold text-amber-900 mb-1">Kinesthetic Learner</h3>
                  <p className="text-sm text-amber-800">Practice, movement, and hands-on activities improve understanding.</p>
                </div>
                <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50">
                  <h3 className="font-semibold text-emerald-900 mb-1">Reading/Writing Learner</h3>
                  <p className="text-sm text-emerald-800">You learn deeply through notes, lists, and structured reading.</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-teal-700 mb-3">
                Reflection Prompts
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                {reflectionPrompts.map((prompt) => (
                  <li key={prompt}>{prompt}</li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-teal-700 mb-3">
                Strengths Explorer
              </h2>
              <p>Mark the strengths that feel true for you today:</p>
              <div className="grid sm:grid-cols-2 gap-2 mt-3 not-prose">
                {strengthsIdeas.map((idea) => (
                  <div
                    key={idea}
                    className="px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-700"
                  >
                    {idea}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-teal-700 mb-3">
                My Weekly Growth Plan
              </h2>
              <ol className="list-decimal pl-6 space-y-2">
                {growthPlan.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </section>

            <div className="p-4 bg-teal-50 rounded-xl border border-teal-100 mt-6">
              <p className="text-sm text-teal-800 font-medium">
                💡 You are unique. Your way of learning is valid, powerful, and worth celebrating.
              </p>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}
