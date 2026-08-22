"use client";

import { ExamQuestion } from "@/redux/features/career-seeker/courses/exams/examsTypes";


interface Props {
  question: ExamQuestion;
  index: number;
  total: number;
  selectedOptionId: number | null;
  flagged: boolean;
  onSelect: (optionId: number) => void;
  onToggleFlag: () => void;
  onNext: () => void;
  onExit: () => void;
  isSubmitting: boolean;
}

const LABELS = ["A", "B", "C", "D", "E", "F"];

export default function ExamQuestionView({
  question, index, total, selectedOptionId, flagged,
  onSelect, onToggleFlag, onNext, onExit, isSubmitting,
}: Props) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-gray-900">Test</h1>
            <button onClick={onExit} className="text-xs font-medium text-gray-400 hover:text-red-500">
              Exit
            </button>
          </div>
          <p className="text-sm text-gray-400">Question {index + 1}/{total}</p>
        </div>

        <button
          onClick={onToggleFlag}
          className={`flex items-center gap-1 rounded-full border px-4 py-2 text-sm font-medium transition
            ${flagged ? "border-amber-400 bg-amber-50 text-amber-600" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}
        >
          🚩 Flag
        </button>
      </div>

      <p className="mb-8 text-center text-xl font-semibold text-gray-900">
        {question.question}
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {question.questions.map((option, i) => {
          const isSelected = selectedOptionId === option.id;
          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left text-sm transition
                ${isSelected ? "border-blue-500 bg-blue-50/40" : "border-gray-200 hover:border-gray-300"}`}
            >
              <span className="text-gray-800">
                <span className="font-semibold">{LABELS[i]}.</span> {option.option_text}
              </span>
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full border-2
                  ${isSelected ? "border-blue-600 bg-blue-600 text-white" : "border-gray-300"}`}
              >
                {isSelected && "✓"}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={onNext}
          disabled={isSubmitting}
          className="w-full max-w-xs rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50 sm:w-auto sm:px-16"
        >
          {isSubmitting ? "Saving..." : index + 1 === total ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}