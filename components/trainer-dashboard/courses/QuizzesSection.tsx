"use client";

import { useEffect, useMemo, useState } from "react";
import {
    CheckCircle2,
    ChevronRight,
    CircleHelp,
    Loader2,
    Pencil,
    Plus,
    Sparkles,
    Trash2,
    X,
} from "lucide-react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import QuizFormModal from "@/components/trainer-dashboard/courses/QuizFormModal";
import {
    useFinalizeQuizzeQuery,
    useGenerateQuizzeMutation,
} from "@/redux/features/trainer/courses/aiGeneratedQuizzeApi";
import {
    Quizze,
    useDeleteQuizzeMutation,
    useGetQuizzeListQuery,
    useGetSingleQuizzeQuery,
} from "@/redux/features/trainer/courses/moduleQuizzesApi";
import { useGetLessonListQuery } from "@/redux/features/trainer/courses/moduleLessonsApi";

interface QuizzesSectionProps {
    moduleId: number;
    moduleTitle?: string;
}

export default function QuizzesSection({ moduleId, moduleTitle }: QuizzesSectionProps) {
    const [selectedQuizId, setSelectedQuizId] = useState<number | null>(null);
    const [editingQuiz, setEditingQuiz] = useState<Quizze | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

    const {
        data: quizzes = [],
        isLoading,
        isError,
        refetch: refetchQuizzes,
    } = useGetQuizzeListQuery();

    const { data: selectedQuiz, isFetching: isQuizFetching } = useGetSingleQuizzeQuery(
        selectedQuizId ?? "",
        { skip: selectedQuizId === null },
    );

    const [deleteQuizze] = useDeleteQuizzeMutation();
    const [generateQuizze, { isLoading: isGenerating }] = useGenerateQuizzeMutation();
    const { data: lessons = [], isLoading: isLessonsLoading } = useGetLessonListQuery();

    const { data: finalizedData, isFetching: isPollingFinalize } = useFinalizeQuizzeQuery(
        activeTaskId ?? "",
        {
            skip: !activeTaskId,
            pollingInterval: activeTaskId ? 3000 : 0,
        },
    );

    const moduleQuizzes = useMemo(
        () => quizzes.filter((quiz) => String(quiz.module) === String(moduleId) || String(quiz.module) === String(moduleTitle)),
        [quizzes, moduleId, moduleTitle],
    );

    const moduleLessons = useMemo(
        () => lessons.filter((lesson) => String(lesson.module) === String(moduleId) || String(lesson.module) === String(moduleTitle)),
        [lessons, moduleId, moduleTitle],
    );

    const openCreate = () => {
        setEditingQuiz(null);
        setIsFormOpen(true);
    };

    const openEdit = () => {
        if (selectedQuiz) {
            setEditingQuiz(selectedQuiz);
            setIsFormOpen(true);
        }
    };

    useEffect(() => {
        if (!activeTaskId || !finalizedData?.status) return;

        const status = finalizedData.status.toLowerCase();

        if (status === "processing") return;

        if (status === "completed") {
            const generatedQuestions = finalizedData.questions?.questions ?? [];
            toast.success(
                generatedQuestions.length > 0
                    ? `AI generated ${generatedQuestions.length} question(s).`
                    : "AI quiz generation completed.",
            );
            setActiveTaskId(null);
            void refetchQuizzes();
            return;
        }

        toast.error(`AI generation ended with status: ${finalizedData.status}`);
        setActiveTaskId(null);
    }, [activeTaskId, finalizedData, refetchQuizzes]);

    const handleDelete = async () => {
        if (!selectedQuiz) return;

        const result = await Swal.fire({
            title: "Delete this quiz?",
            text: `"${selectedQuiz.question}" will be permanently removed.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            confirmButtonColor: "#dc2626",
        });

        if (!result.isConfirmed) return;

        try {
            await deleteQuizze(selectedQuiz.quiz_id).unwrap();
            toast.success("Quiz deleted successfully");
            setSelectedQuizId(null);
        } catch {
            toast.error("Failed to delete quiz");
        }
    };

    const handleGenerateWithAi = async () => {
        if (moduleLessons.length === 0) {
            toast.error("No lessons found for this module. Add a lesson first.");
            return;
        }

        const escapeHtml = (value: string) =>
            value
                .replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;")
                .replaceAll("'", "&#39;");

        const lessonOptionsHtml = moduleLessons
            .map((lesson) => `<option value="${lesson.id}">${escapeHtml(lesson.title)}</option>`)
            .join("");

        const result = await Swal.fire({
            title: "Generate quizze using AI",
            html: `
                <div style="display:flex;flex-direction:column;gap:10px;text-align:left;">
                    <label style="font-size:13px;color:#334155;">lesson_id</label>
                    <select id="swal-lesson-id" class="swal2-input" style="height:42px;">
                        ${lessonOptionsHtml}
                    </select>
                    <label style="font-size:13px;color:#334155;">document_id (optional)</label>
                    <input id="swal-document-id" class="swal2-input" placeholder="document_id" type="number" min="1" />
                    <label style="font-size:13px;color:#334155;">number_questions</label>
                    <input id="swal-number-questions" class="swal2-input" placeholder="number_questions" type="number" min="1" value="5" />
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: "Generate",
            focusConfirm: false,
            preConfirm: () => {
                const lessonIdInput = document.getElementById("swal-lesson-id") as HTMLSelectElement | null;
                const documentIdInput = document.getElementById("swal-document-id") as HTMLInputElement | null;
                const numberQuestionsInput = document.getElementById("swal-number-questions") as HTMLInputElement | null;

                const lessonId = lessonIdInput?.value.trim() ?? "";
                const documentId = documentIdInput?.value.trim() ?? "";
                const numberQuestions = numberQuestionsInput?.value.trim() ?? "";

                if (!lessonId) {
                    Swal.showValidationMessage("lesson_id is required");
                    return null;
                }

                if (!numberQuestions) {
                    Swal.showValidationMessage("number_questions is required");
                    return null;
                }

                const parsedLessonId = Number(lessonId);
                const parsedNumberQuestions = Number(numberQuestions);

                if (Number.isNaN(parsedLessonId) || parsedLessonId <= 0) {
                    Swal.showValidationMessage("lesson_id must be a positive number");
                    return null;
                }

                if (Number.isNaN(parsedNumberQuestions) || parsedNumberQuestions <= 0) {
                    Swal.showValidationMessage("number_questions must be a positive number");
                    return null;
                }

                if (documentId) {
                    const parsedDocumentId = Number(documentId);
                    if (Number.isNaN(parsedDocumentId) || parsedDocumentId <= 0) {
                        Swal.showValidationMessage("document_id must be a positive number when provided");
                        return null;
                    }
                }

                return {
                    lesson_id: parsedLessonId,
                    document_id: documentId ? Number(documentId) : null,
                    number_questions: parsedNumberQuestions,
                };
            },
        });

        if (!result.isConfirmed || !result.value) return;

        try {
            const payload = {
                lesson_id: result.value.lesson_id,
                number_questions: result.value.number_questions,
                ...(result.value.document_id ? { document_id: result.value.document_id } : {}),
            };

            const response = await generateQuizze(payload).unwrap();
            if (!response.task_id) {
                toast.error("Task id was not returned from AI generation API.");
                return;
            }

            setActiveTaskId(response.task_id);
            toast.info("AI generation started. Checking status every 3 seconds...");
        } catch (error) {
            const fallback = "Failed to start AI quiz generation";
            if (typeof error === "object" && error !== null && "data" in error) {
                const apiError = (error as { data?: unknown }).data;
                if (typeof apiError === "string") {
                    toast.error(apiError);
                    return;
                }
                if (typeof apiError === "object" && apiError !== null) {
                    const message = (apiError as { message?: unknown }).message;
                    if (typeof message === "string" && message.trim()) {
                        toast.error(message);
                        return;
                    }
                    const firstEntry = Object.values(apiError as Record<string, unknown>)[0];
                    if (Array.isArray(firstEntry) && typeof firstEntry[0] === "string") {
                        toast.error(firstEntry[0]);
                        return;
                    }
                }
            }

            toast.error(fallback);
        }
    };

    return (
        <section className="border-t border-gray-100 pt-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">Quizzes</h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Create manual questions and answer options for this module.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={handleGenerateWithAi}
                        disabled={isLessonsLoading || isGenerating || isPollingFinalize || Boolean(activeTaskId)}
                        className="flex items-center gap-2 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {(isLessonsLoading || isGenerating || isPollingFinalize || Boolean(activeTaskId)) ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Sparkles className="h-4 w-4" />
                        )}
                        Generate quizze using AI
                    </button>
                    <button
                        type="button"
                        onClick={openCreate}
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        <Plus className="h-4 w-4" />
                        Add quiz
                    </button>
                </div>
            </div>

            {activeTaskId && (
                <p className="mt-3 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-700">
                    AI generation task is in progress. Task ID: {activeTaskId}
                </p>
            )}

            {isLoading && (
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading quizzes...
                </div>
            )}

            {isError && (
                <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                    Couldn&apos;t load quizzes.
                </p>
            )}

            {!isLoading && !isError && moduleQuizzes.length === 0 && (
                <p className="mt-4 rounded-lg border border-dashed border-gray-300 p-5 text-center text-sm text-gray-500">
                    No quizzes have been added yet.
                </p>
            )}

            <div className="mt-4 space-y-2">
                {moduleQuizzes.map((quiz) => (
                    <button
                        type="button"
                        key={quiz.quiz_id}
                        onClick={() => setSelectedQuizId(quiz.quiz_id)}
                        className={`flex w-full items-center justify-between gap-3 rounded-lg border p-3 text-left ${selectedQuizId === quiz.quiz_id ? "border-blue-400 bg-blue-50/60" : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/40"}`}
                    >
                        <span className="min-w-0">
                            <span className="flex items-center gap-2 truncate text-sm font-medium text-gray-900">
                                <CircleHelp className="h-4 w-4 shrink-0 text-blue-600" />
                                {quiz.question}
                            </span>
                            <span className="mt-1 block text-xs text-gray-500">
                                {quiz.questions.length} answer options
                            </span>
                        </span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-gray-400" />
                    </button>
                ))}
            </div>

            {selectedQuizId !== null && (
                <div
                    className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-4 py-6"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Quiz details"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) setSelectedQuizId(null);
                    }}
                >
                    <div className="max-h-full w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-2xl">
                        {isQuizFetching || !selectedQuiz ? (
                            <div className="flex items-center justify-center gap-2 px-5 py-16 text-sm text-gray-500">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Loading quiz...
                            </div>
                        ) : (
                            <>
                                <div className="flex items-start justify-between gap-3 border-b border-gray-200 px-5 py-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{selectedQuiz.question}</h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            {selectedQuiz.explanation || "No explanation provided"}
                                        </p>
                                    </div>
                                    <div className="flex shrink-0 items-center gap-1">
                                        <button
                                            type="button"
                                            onClick={openEdit}
                                            className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-700 hover:bg-gray-100"
                                            aria-label="Edit quiz"
                                            title="Edit quiz"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleDelete}
                                            className="flex h-8 w-8 items-center justify-center rounded-md border border-red-200 text-red-600 hover:bg-red-50"
                                            aria-label="Delete quiz"
                                            title="Delete quiz"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedQuizId(null)}
                                            className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
                                            aria-label="Close quiz details"
                                            title="Close"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-2 p-5">
                                    {selectedQuiz.questions.map((option) => (
                                        <div
                                            key={option.id ?? option.option_text}
                                            className={`flex items-center gap-2 rounded-lg border p-3 text-sm ${option.is_correct ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-gray-200 text-gray-700"}`}
                                        >
                                            {option.is_correct && (
                                                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                                            )}
                                            {option.option_text}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            <QuizFormModal
                key={`${isFormOpen ? "open" : "closed"}-${editingQuiz?.quiz_id ?? "new"}`}
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                moduleId={moduleId}
                quiz={editingQuiz}
            />
        </section>
    );
}
