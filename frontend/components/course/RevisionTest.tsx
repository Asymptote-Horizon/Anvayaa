import React, { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

const SAMPLE_QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "What is the primary goal of this course?",
    options: [
      "To understand the fundamental concepts",
      "To memorize everything without practice",
      "To pass a test without learning",
      "To watch videos and do nothing"
    ],
    correctAnswer: 0
  },
  {
    id: "q2",
    text: "Which of the following describes continuous learning best?",
    options: [
      "Learning only once and stopping",
      "Consistently acquiring new skills and knowledge over time",
      "Reading a book and never reading again",
      "Memorizing a textbook in one day"
    ],
    correctAnswer: 1
  },
  {
    id: "q3",
    text: "What is the most effective way to retain information?",
    options: [
      "Skimming through text quickly",
      "Watching television while studying",
      "Active recall and spaced repetition",
      "Ignoring the revision sections entirely"
    ],
    correctAnswer: 2
  }
];

export default function RevisionTest() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const score = SAMPLE_QUESTIONS.reduce((acc, q) => {
    return acc + (answers[q.id] === q.correctAnswer ? 1 : 0);
  }, 0);

  return (
    <div className="mt-12 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Revision & Test</h2>
        <p className="text-gray-500 dark:text-slate-400 mt-1">Check your understanding with a quick quiz.</p>
      </div>

      <div className="space-y-8">
        {SAMPLE_QUESTIONS.map((q, index) => {
          const isAnswered = answers[q.id] !== undefined;
          const selectedAnswer = answers[q.id];
          const isCorrect = selectedAnswer === q.correctAnswer;

          return (
            <div key={q.id} className="space-y-3">
              <h3 className="text-lg font-medium text-gray-800 dark:text-slate-200">
                {index + 1}. {q.text}
              </h3>
              <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                {q.options.map((opt, optIdx) => {
                  let buttonClass = "p-4 text-left rounded-xl border transition-all ";
                  
                  if (submitted) {
                    if (optIdx === q.correctAnswer) {
                      buttonClass += "bg-green-50 border-green-500 text-green-800 dark:bg-green-900/30 dark:border-green-600 dark:text-green-300";
                    } else if (selectedAnswer === optIdx) {
                      buttonClass += "bg-red-50 border-red-500 text-red-800 dark:bg-red-900/30 dark:border-red-600 dark:text-red-300";
                    } else {
                      buttonClass += "bg-gray-50 border-gray-200 text-gray-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 opacity-60";
                    }
                  } else {
                    if (selectedAnswer === optIdx) {
                      buttonClass += "bg-indigo-50 border-indigo-500 ring-2 ring-indigo-200 text-indigo-800 dark:bg-indigo-900/50 dark:border-indigo-400 dark:ring-indigo-800/50 dark:text-indigo-200";
                    } else {
                      buttonClass += "bg-white border-gray-200 text-gray-700 hover:border-indigo-300 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500";
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(q.id, optIdx)}
                      disabled={submitted}
                      className={buttonClass}
                    >
                      <div className="flex items-center justify-between">
                        <span>{opt}</span>
                        {submitted && optIdx === q.correctAnswer && <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />}
                        {submitted && selectedAnswer === optIdx && optIdx !== q.correctAnswer && <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-700 flex items-center justify-between">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < SAMPLE_QUESTIONS.length}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors"
          >
            Submit Quiz
          </button>
        ) : (
          <div className="flex items-center gap-4 w-full justify-between">
            <div className="flex-1">
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                Your Score: {score} / {SAMPLE_QUESTIONS.length}
              </p>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                {score === SAMPLE_QUESTIONS.length ? "Perfect! Excellent work." : "Good effort. Review the correct answers above."}
              </p>
            </div>
            <button
              onClick={() => {
                setAnswers({});
                setSubmitted(false);
              }}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-800 dark:text-white font-medium rounded-xl transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
