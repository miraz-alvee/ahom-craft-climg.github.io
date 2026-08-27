"use client";

import { useState } from "react";
import { ExamQuestion } from "@/redux/features/courses/exams/examsTypes";
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
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-10">
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

// ---------- Review Card item structure ----------

interface ReviewItem {
  id: number;
  quiz_question: string;
  selected_answer_text: string;
  correct_answer_text: string;
  explanation: string;
  is_correct: boolean;
  lesson_video?: string;
}

function ReviewCard({ item, index, total }: { item: ReviewItem; index: number; total: number }) {
  const isCorrect = item.is_correct;

  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-white p-6 shadow-xs flex flex-col justify-between relative ${
        isCorrect ? "border-l-4 border-l-emerald-500 border-gray-100" : "border-l-4 border-l-rose-500 border-gray-100"
      }`}
    >
      <div>
        <div className="mb-3 flex items-center justify-between">
          <span
            className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase text-white tracking-wider ${
              isCorrect ? "bg-emerald-600" : "bg-rose-600"
            }`}
          >
            {isCorrect ? "Correct" : "Incorrect"}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Question {index + 1} of {total}
          </span>
        </div>

        <h3 className="mb-5 text-base font-bold leading-snug text-gray-900">
          {item.quiz_question}
        </h3>

        {isCorrect ? (
          <div className="mb-4 flex items-start justify-between gap-3 rounded-xl bg-emerald-50/70 border border-emerald-100 p-3.5 text-sm text-emerald-900">
            <div className="flex items-start gap-2.5">
              <span className="text-emerald-600 font-bold text-base leading-none mt-0.5">✓</span>
              <span className="font-medium text-xs leading-relaxed">{item.selected_answer_text}</span>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-600 whitespace-nowrap pt-0.5">
              Your Choice (Correct)
            </span>
          </div>
        ) : (
          <>
            <div className="mb-2.5 flex items-start justify-between gap-3 rounded-xl bg-rose-50/70 border border-rose-100 p-3.5 text-sm text-rose-900">
              <div className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold text-base leading-none mt-0.5">✕</span>
                <span className="font-medium text-xs leading-relaxed">{item.selected_answer_text}</span>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-rose-500 whitespace-nowrap pt-0.5">
                Your Choice
              </span>
            </div>

            <div className="mb-4 flex items-start justify-between gap-3 rounded-xl bg-emerald-50/70 border border-emerald-100 p-3.5 text-sm text-emerald-900">
              <div className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold text-base leading-none mt-0.5">✓</span>
                <span className="font-medium text-xs leading-relaxed">{item.correct_answer_text}</span>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-600 whitespace-nowrap pt-0.5">
                Correct Answer
              </span>
            </div>
          </>
        )}

        {item.explanation && (
          <div className="mb-5">
            <p className="mb-1 flex items-center gap-1.5 text-xs font-bold text-rose-600">
              <span>💡</span> Expert Explanation
            </p>
            <p className="text-xs leading-relaxed text-gray-500">{item.explanation}</p>
          </div>
        )}
      </div>

      {item.lesson_video ? (
        <a
          href={item.lesson_video}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs font-semibold text-white shadow-xs transition hover:bg-blue-700"
        >
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] text-blue-600 font-bold">
            ▶
          </span>
          Jump to Video Lesson
        </a>
      ) : (
        <button
          disabled
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs font-semibold text-white shadow-xs opacity-95"
        >
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] text-blue-600 font-bold">
            ▶
          </span>
          Jump to Video Lesson
        </button>
      )}
    </div>
  );
}

// ---------- Review list (fetches + renders answer cards for an attempt) ----------

interface ExamReviewProps {
  moduleId: number;
  attemptId?: number;
  questions?: ExamQuestion[];
  answers?: Record<number, { optionId: number; isCorrect: boolean }>;
  summary?: { total: number; correct: number; wrong: number; unanswered: number };
}

export function ExamReview({ moduleId, attemptId, questions, answers, summary }: ExamReviewProps) {
  const shouldSkipApi = Boolean(questions && questions.length > 0);
  const { data, isLoading, isError } = useGetExamResultDetailsQuery(
    { module_id: moduleId, attempt_id: attemptId ?? 0 },
    { skip: shouldSkipApi || !attemptId }
  );

  const [filter, setFilter] = useState<"all" | "correct" | "incorrect">("all");

  if (!shouldSkipApi && isLoading) {
    return <div className="mx-auto h-64 max-w-6xl animate-pulse rounded-xl bg-gray-100 my-10" />;
  }

  // Construct items either from local questions/answers or API response
  let items: ReviewItem[] = [];

  if (shouldSkipApi && questions) {
    items = questions.map((q, idx) => {
      const chosenRecord = answers ? answers[q.quiz_id] : undefined;
      const chosenOption = q.questions.find((o) => o.id === chosenRecord?.optionId);
      const correctOption = q.questions.find((o) => o.is_correct);

      const isCorrect = chosenRecord?.isCorrect ?? (chosenOption?.is_correct || false);

      return {
        id: q.quiz_id || idx + 1,
        quiz_question: q.question,
        selected_answer_text: chosenOption ? chosenOption.option_text : "No answer selected",
        correct_answer_text: correctOption ? correctOption.option_text : "N/A",
        explanation: q.explanation || "",
        is_correct: isCorrect,
        lesson_video: "",
      };
    });
  } else if (data) {
    const rawData: any = data;
    let list: any[] = [];
    if (Array.isArray(rawData)) {
      if (rawData[0]?.incorrect_exams && Array.isArray(rawData[0].incorrect_exams)) {
        list = rawData[0].incorrect_exams;
      } else if (rawData[0]?.quiz_question) {
        list = rawData;
      } else if (Array.isArray(rawData[0])) {
        list = rawData[0];
      }
    } else if (typeof rawData === "object") {
      if (Array.isArray(rawData.incorrect_exams)) {
        list = rawData.incorrect_exams;
      } else if (Array.isArray(rawData.results)) {
        list = rawData.results;
      } else if (Array.isArray(rawData.data)) {
        list = rawData.data;
      }
    }

    items = list.map((item: any, idx: number) => ({
      id: item.id || idx + 1,
      quiz_question: item.quiz_question || item.question || "",
      selected_answer_text: item.selected_answer_text || item.selected_answer || "No answer selected",
      correct_answer_text: item.correct_answer_text || item.correct_answer || "",
      explanation: item.explanation || "",
      is_correct: item.is_correct ?? (item.selected_answer_text === item.correct_answer_text),
      lesson_video: item.lesson_video || "",
    }));
  }

  const totalCount = summary?.total ?? items.length;
  const correctCount = summary?.correct ?? items.filter((i) => i.is_correct).length;
  const incorrectCount = items.filter((i) => !i.is_correct).length;
  const pct = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;

  const filteredItems =
    filter === "correct"
      ? items.filter((i) => i.is_correct)
      : filter === "incorrect"
      ? items.filter((i) => !i.is_correct)
      : items;

  if (!shouldSkipApi && isError && items.length === 0) {
    return (
      <p className="mx-auto max-w-6xl my-10 rounded-lg bg-red-50 p-4 text-sm text-red-600">
        Failed to load exam results.
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">Exam Result</h1>

      {/* Top Banner Cards */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-6">
        {/* Left Brown Achievement Card */}
        <div className="rounded-2xl bg-[#a37648] p-6 text-white shadow-xs flex flex-col justify-between min-h-33">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-100/90">Final Achievement</p>
            <p className="mt-1 text-5xl font-extrabold tracking-tight">
              {pct}<span className="text-3xl align-top">%</span>
            </p>
          </div>
          <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-black/20">
            <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {/* Right Light Blue Correct Answers Card */}
        <div className="rounded-2xl bg-blue-50/70 border border-blue-100/60 p-6 flex flex-col justify-between min-h-33">
          <div className="flex items-center justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-100 text-pink-600">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-slate-800">
              {correctCount}/{totalCount}
            </p>
            <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Correct Answers
            </p>
          </div>
        </div>
      </div>

      {/* Filter Bar (if items exist) */}
      {items.length > 0 && (
        <div className="flex items-center justify-between pt-2">
          <h2 className="text-lg font-bold text-gray-900">Review Questions</h2>
          <div className="flex rounded-lg bg-gray-100 p-1 text-xs font-semibold text-gray-600">
            <button
              onClick={() => setFilter("all")}
              className={`cursor-pointer rounded-md px-3 py-1.5 transition ${
                filter === "all" ? "bg-white text-gray-900 shadow-xs" : "hover:text-gray-900"
              }`}
            >
              All ({items.length})
            </button>
            <button
              onClick={() => setFilter("correct")}
              className={`cursor-pointer rounded-md px-3 py-1.5 transition ${
                filter === "correct" ? "bg-white text-emerald-600 shadow-xs" : "hover:text-gray-900"
              }`}
            >
              Correct ({correctCount})
            </button>
            <button
              onClick={() => setFilter("incorrect")}
              className={`cursor-pointer rounded-md px-3 py-1.5 transition ${
                filter === "incorrect" ? "bg-white text-rose-600 shadow-xs" : "hover:text-gray-900"
              }`}
            >
              Incorrect ({incorrectCount})
            </button>
          </div>
        </div>
      )}

      {/* Review Questions Grid */}
      {filteredItems.length === 0 ? (
        <p className="rounded-xl bg-gray-50 p-6 text-center text-sm text-gray-500 border border-gray-100">
          {filter === "correct"
            ? "No correct answers to display."
            : filter === "incorrect"
            ? "No incorrect answers to display."
            : "No answers found for this exam attempt."}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map((item, i) => (
            <ReviewCard key={item.id || i} item={item} index={i} total={totalCount} />
          ))}
        </div>
      )}
    </div>
  );
}

