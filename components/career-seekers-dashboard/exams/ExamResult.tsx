"use client";

import { IncorrectExam } from "@/redux/features/courses/exams/examsTypes";
import { useGetExamResultDetailsQuery } from "@/redux/features/courses/exams/userExamsAPis";


// ---------- Summary screen (right after finishing the exam) ----------

interface SummaryProps {
  totalQuestions: number;
  correct: number;
  wrong: number;
  unanswered: number;
  onReviewAnswers: () => void;
}

function getMessage(pct: number) {
  if (pct >= 80) return { title: "Excellent Work!", note: "You have a strong grasp of these concepts." };
  if (pct >= 60) return { title: "Good Job!", note: "You're on the right track, review the ones you missed." };
  return { title: "Keep Practicing!", note: "Revisit the lessons and try again." };
}

export function ExamSummary({ totalQuestions, correct, wrong, unanswered, onReviewAnswers }: SummaryProps) {
  const pct = totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0;
  const { title, note } = getMessage(pct);

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-10">
      <div className="rounded-2xl bg-linear-to-r from-amber-700 to-amber-500 p-8 text-center text-white shadow-lg">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-100">Final Achievement</p>
        <p className="mt-2 text-5xl font-extrabold">{pct}<span className="align-top text-2xl">%</span></p>
        <p className="mt-3 text-lg font-semibold">{title}</p>
        <p className="text-sm text-amber-100">{note}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-blue-50 p-5">
          <p className="text-2xl font-bold text-gray-900">{totalQuestions}</p>
          <p className="text-xs uppercase text-gray-500">Total Questions</p>
        </div>
        <div className="rounded-xl bg-blue-50 p-5">
          <p className="text-2xl font-bold text-emerald-600">{correct}</p>
          <p className="text-xs uppercase text-gray-500">Correct Answers</p>
        </div>
        <div className="rounded-xl bg-blue-50 p-5">
          <p className="text-2xl font-bold text-red-500">{String(wrong).padStart(2, "0")}</p>
          <p className="text-xs uppercase text-gray-500">Wrong Answers</p>
        </div>
        <div className="rounded-xl bg-blue-50 p-5">
          <p className="text-2xl font-bold text-amber-600">{String(unanswered).padStart(2, "0")}</p>
          <p className="text-xs uppercase text-gray-500">Unanswered</p>
        </div>
      </div>

      <div className="rounded-xl bg-blue-50 p-6">
        <p className="text-sm font-semibold text-gray-900">Performance Summary</p>
        <p className="mb-4 text-xs text-gray-400">Visualizing your progress</p>
        <div className="h-2 w-full overflow-hidden rounded-full bg-pink-100">
          <div className="h-full bg-emerald-600" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-gray-600">
            <span className="h-2 w-2 rounded-full bg-emerald-600" /> Accuracy
          </span>
          <span className="font-semibold text-emerald-600">{pct}%</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-gray-600">
            <span className="h-2 w-2 rounded-full bg-rose-500" /> Complexity
          </span>
          {/* Placeholder heuristic — no "complexity" field exists in your types. Replace if backend adds one. */}
          <span className="font-semibold text-rose-500">{pct >= 80 ? "High" : pct >= 50 ? "Medium" : "Low"}</span>
        </div>
      </div>

      <button
        onClick={onReviewAnswers}
        className="w-full rounded-xl bg-blue-50 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
      >
        Review Answers
      </button>
    </div>
  );
}

// ---------- Single incorrect-answer card (used in the review list) ----------

function ReviewCard({ item, index, total }: { item: IncorrectExam; index: number; total: number }) {
  return (
    <div className="overflow-hidden rounded-xl border-l-4 border-red-500 bg-blue-50/40">
      <div className="p-6">
        <div className="mb-3 flex items-center gap-3">
          <span className="rounded bg-red-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white">Incorrect</span>
          <span className="text-xs font-medium text-gray-400">Question {index + 1} of {total}</span>
        </div>

        <p className="mb-4 text-base font-semibold text-gray-900">{item.quiz_question}</p>

        <div className="mb-2 flex items-center justify-between rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">
          <span className="flex items-center gap-2">✕ {item.selected_answer_text}</span>
          <span className="text-[10px] font-semibold uppercase text-rose-400">Your Choice</span>
        </div>

        <div className="mb-4 flex items-center justify-between rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <span className="flex items-center gap-2">✓ {item.correct_answer_text}</span>
          <span className="text-[10px] font-semibold uppercase text-emerald-500">Correct Answer</span>
        </div>

        <div className="rounded-lg bg-white p-4">
          <p className="mb-1 flex items-center gap-1 text-xs font-semibold text-rose-500">💡 Expert Explanation</p>
          <p className="text-sm text-gray-500">{item.explanation}</p>
        </div>
      </div>

      {item.lesson_video && (
        <a
          href={item.lesson_video}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          ▶ Jump to Video Lesson
        </a>
      )}
    </div>
  );
}

// ---------- Review list (fetches + renders all incorrect answers for an attempt) ----------

export function ExamReview({ moduleId, attemptId }: { moduleId: number; attemptId: number }) {
  const { data, isLoading, isError } = useGetExamResultDetailsQuery({ module_id: moduleId, attempt_id: attemptId });

  if (isLoading) return <div className="mx-auto h-64 max-w-3xl animate-pulse rounded-xl bg-gray-100" />;

  if (isError || !data) {
    return (
      <p className="mx-auto max-w-3xl rounded-lg bg-red-50 p-4 text-sm text-red-600">
        Failed to load exam results.
      </p>
    );
  }

  // Assumes the API returns a single-element array for one attempt — verify against your real response.
  const incorrect = data[0]?.incorrect_exams ?? [];

  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-10">
      <h1 className="text-xl font-bold text-gray-900">Exam Result</h1>
      {incorrect.length === 0 ? (
        <p className="rounded-lg bg-emerald-50 p-4 text-sm text-emerald-700">
          Perfect score — no incorrect answers to review!
        </p>
      ) : (
        incorrect.map((item, i) => <ReviewCard key={item.id} item={item} index={i} total={incorrect.length} />)
      )}
    </div>
  );
}