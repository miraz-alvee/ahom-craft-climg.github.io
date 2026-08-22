"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { StartExamModal, ExitExamModal } from "./ExamModals";
import ExamQuestionView from "./ExamQuestionView";
import { ExamSummary, ExamReview } from "./ExamResult";
import { useExamRunner } from "./userExamRunner";
import { useGetExamResultSummaryQuery } from "@/redux/features/career-seeker/courses/exams/userExamsAPis";

// ---------- Full exam-taking flow (confirm start → questions → summary → review) ----------

export default function ExamRunner({ courseId, moduleId }: { courseId: number; moduleId: number }) {
    const router = useRouter();
    const exam = useExamRunner(moduleId);
    // console.log("Exam", exam);
    // console.log("Exam API error:", exam.error);

    const exitToModule = () => router.push(`/career-seeker/course/${courseId}`);

    if (exam.isLoading) {
        return <div className="mx-auto mt-10 h-64 max-w-3xl animate-pulse rounded-xl bg-gray-100" />;
    }

    if (exam.isError) {
        const errorData = exam.error as { status?: number; data?: { message?: string } } | undefined;
        const message = errorData?.data?.message ?? "Failed to load exam questions.";

        return (
            <div className="flex min-h-screen items-center justify-center p-4 -mt-20">
                <div className="mx-auto max-w-sm space-y-4 rounded-xl border border-amber-200 bg-amber-50 p-6 text-center">
                    <p className="text-sm font-medium text-amber-800">{message}</p>
                    <button
                        onClick={exitToModule}
                        className="cursor-pointer rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700">
                        Back to Course
                    </button>
                </div>
            </div>
        );
    }

    if (exam.questions.length === 0) {
        return (
            <p className="mx-auto mt-10 max-w-3xl rounded-lg bg-red-50 p-4 text-sm text-red-600">
                No questions available for this exam.
            </p>
        );
    }

    return (
        <>
            <StartExamModal open={exam.stage === "confirm-start"} onClose={exitToModule} onStart={exam.startExam} />
            <ExitExamModal open={exam.showExitConfirm} onClose={exam.cancelExit} onConfirmExit={exitToModule} />

            {exam.stage === "in-progress" && exam.currentQuestion && (
                <ExamQuestionView
                    question={exam.currentQuestion}
                    index={exam.currentIndex}
                    total={exam.questions.length}
                    selectedOptionId={exam.answers[exam.currentQuestion.quiz_id]?.optionId ?? null}
                    flagged={exam.flagged.has(exam.currentQuestion.quiz_id)}
                    onSelect={(optionId) => exam.selectOption(exam.currentQuestion!.quiz_id, optionId)}
                    onToggleFlag={() => exam.toggleFlag(exam.currentQuestion!.quiz_id)}
                    onNext={exam.goNext}
                    onExit={exam.requestExit}
                    isSubmitting={exam.isSubmitting}
                />
            )}

            {exam.stage === "summary" && (
                <ExamSummary
                    totalQuestions={exam.summary.total}
                    correct={exam.summary.correct}
                    wrong={exam.summary.wrong}
                    unanswered={exam.summary.unanswered}
                    onReviewAnswers={exam.goToReview}
                />
            )}

            {exam.stage === "review" && exam.attemptId && (
                <ExamReview moduleId={moduleId} attemptId={exam.attemptId} />
            )}
        </>
    );
}

// ---------- "Tests" block shown inside a module in the course page ----------
// This is the bridge between courseApi (module data) and examApi (attempt data).

export function ModuleTestSection({ courseId, moduleId }: { courseId: number; moduleId: number }) {
    const { data, isLoading } = useGetExamResultSummaryQuery(moduleId);

    if (isLoading) return <div className="h-12 animate-pulse rounded-lg bg-gray-100" />;

    const attempts = data?.attempts ?? [];
    //   console.log("Attamps", attempts);

    return (
        <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase text-gray-400">Tests</h4>

            {attempts.map((attempt, i) => {
                const total = attempt.correct_answers + attempt.incorrect_answers;
                return (
                    <Link
                        key={attempt.UserExamAttempt_id}
                        href={`/career-seeker/course/${courseId}/module/${moduleId}/exam/result/${attempt.UserExamAttempt_id}`}
                        className="flex items-center justify-between rounded-lg border border-gray-100 p-3 text-sm hover:bg-gray-50"
                    >
                        <span className="font-medium text-gray-800">Test {i + 1}</span>
                        <span className="text-gray-500">{attempt.correct_answers}/{total}</span>
                    </Link>
                );
            })}

            <Link
                href={`/career-seeker/course/${courseId}/module/${moduleId}/exam`}
                className="flex items-center justify-between rounded-lg border border-gray-100 p-3 text-sm hover:bg-gray-50"
            >
                <span className="font-medium text-gray-800">Test {attempts.length + 1}</span>
                <span className="text-blue-600">▶</span>
            </Link>
        </div>
    );
}