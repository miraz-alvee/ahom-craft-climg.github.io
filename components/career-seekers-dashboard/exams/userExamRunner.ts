"use client";

import { useGetExamByIdQuery, useSubmitExamAnswerMutation } from "@/redux/features/career-seeker/courses/exams/userExamsAPis";
import { useState, useMemo } from "react";


type Stage = "confirm-start" | "in-progress" | "summary" | "review";

interface AnswerRecord {
  optionId: number;
  isCorrect: boolean;
}

export function useExamRunner(moduleId: number) {
  const { data, isLoading, isError, error } = useGetExamByIdQuery(moduleId);
  const [submitAnswer, { isLoading: isSubmitting }] = useSubmitExamAnswerMutation();

  const [stage, setStage] = useState<Stage>("confirm-start");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, AnswerRecord>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const questions = data?.questions ?? [];
  const currentQuestion = questions[currentIndex];
  const attemptId = data?.exam_attempt_id;

  const startExam = () => setStage("in-progress");

  const selectOption = (quizId: number, optionId: number) => {
    setAnswers((prev) => ({
      ...prev,
      [quizId]: { optionId, isCorrect: prev[quizId]?.isCorrect ?? false },
    }));
  };

  const toggleFlag = (quizId: number) => {
    setFlagged((prev) => {
      const next = new Set(prev);
      next.has(quizId) ? next.delete(quizId) : next.add(quizId);
      return next;
    });
  };

  const goNext = async () => {
    if (!currentQuestion || !attemptId) return;
    const chosen = answers[currentQuestion.quiz_id];

    if (chosen) {
      try {
        const res = await submitAnswer({
          attempt_number: attemptId,
          quiz: currentQuestion.quiz_id,
          selected_answer: chosen.optionId,
        }).unwrap();

        setAnswers((prev) => ({
          ...prev,
          [currentQuestion.quiz_id]: {
            optionId: chosen.optionId,
            isCorrect: res.exam_result.is_correct,
          },
        }));
      } catch {
        return; // stay on the question so they can retry
      }
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      setStage("summary");
    }
  };

  const requestExit = () => setShowExitConfirm(true);
  const cancelExit = () => setShowExitConfirm(false);
  const goToReview = () => setStage("review");

  const summary = useMemo(() => {
    const total = questions.length;
    const answeredEntries = Object.values(answers);
    const correct = answeredEntries.filter((a) => a.isCorrect).length;
    const wrong = answeredEntries.length - correct;
    const unanswered = total - answeredEntries.length;
    return { total, correct, wrong, unanswered };
  }, [answers, questions.length]);

  return {
    isLoading, isError, error, stage, questions, currentIndex, currentQuestion,
    attemptId, answers, flagged, isSubmitting, showExitConfirm,
    startExam, selectOption, toggleFlag, goNext, requestExit, cancelExit,
    goToReview, summary,
  };
}