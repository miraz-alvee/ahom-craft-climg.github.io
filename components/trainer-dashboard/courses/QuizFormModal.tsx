"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Loader2, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import {
    Quizze,
    QuizzePayload,
    useCreateQuizzeMutation,
    useUpdateQuizzeMutation,
} from "@/redux/features/trainer/courses/moduleQuizzesApi";

interface QuizFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    moduleId: number;
    quiz?: Quizze | null;
}

interface FormState {
    question: string;
    explanation: string;
    options: Array<{ option_text: string; is_correct: boolean }>;
}

function getInitialState(quiz?: Quizze | null): FormState {
    return quiz
        ? { question: quiz.question, explanation: quiz.explanation, options: quiz.questions.map(({ option_text, is_correct }) => ({ option_text, is_correct })) }
        : { question: "", explanation: "", options: [{ option_text: "", is_correct: true }, { option_text: "", is_correct: false }] };
}

export default function QuizFormModal({ isOpen, onClose, moduleId, quiz }: QuizFormModalProps) {
    const [form, setForm] = useState<FormState>(() => getInitialState(quiz));
    const [createQuizze, { isLoading: isCreating }] = useCreateQuizzeMutation();
    const [updateQuizze, { isLoading: isUpdating }] = useUpdateQuizzeMutation();
    const isEditMode = Boolean(quiz);
    const isSubmitting = isCreating || isUpdating;

    if (!isOpen) return null;

    const handleTextChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setForm((previous) => ({ ...previous, [name]: value }));
    };

    const updateOption = (index: number, changes: Partial<FormState["options"][number]>) => {
        setForm((previous) => ({ ...previous, options: previous.options.map((option, optionIndex) => optionIndex === index ? { ...option, ...changes } : option) }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const options = form.options.map((option) => ({ ...option, option_text: option.option_text.trim() }));
        if (!form.question.trim() || options.length < 2 || options.some((option) => !option.option_text) || !options.some((option) => option.is_correct)) {
            toast.error("Add a question, at least two options, and one correct answer.");
            return;
        }

        const body: QuizzePayload = { question: form.question.trim(), explanation: form.explanation.trim(), questions: options };
        if (!isEditMode) body.module = moduleId;

        try {
            if (quiz) {
                await updateQuizze({ body, QuizzeId: quiz.quiz_id }).unwrap();
                toast.success("Quiz updated successfully");
            } else {
                await createQuizze(body).unwrap();
                toast.success("Quiz created successfully");
            }
            onClose();
        } catch {
            toast.error(isEditMode ? "Failed to update quiz" : "Failed to create quiz");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4"><h2 className="text-base font-semibold text-gray-900">{isEditMode ? "Edit Quiz" : "Add New Quiz"}</h2><button type="button" onClick={onClose} className="rounded-md p-1 text-gray-400 hover:bg-gray-100" aria-label="Close"><X className="h-5 w-5" /></button></div>
                <form onSubmit={handleSubmit} className="max-h-[78vh] overflow-y-auto px-5 py-4">
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700">Question <span className="text-red-500">*</span><textarea name="question" value={form.question} onChange={handleTextChange} required rows={3} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal text-gray-900" /></label>
                        <label className="block text-sm font-medium text-gray-700">Explanation<textarea name="explanation" value={form.explanation} onChange={handleTextChange} rows={3} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal text-gray-900" /></label>
                        <div><div className="mb-2 flex items-center justify-between"><p className="text-sm font-medium text-gray-700">Answer options <span className="text-red-500">*</span></p><button type="button" onClick={() => setForm((previous) => ({ ...previous, options: [...previous.options, { option_text: "", is_correct: false }] }))} className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"><Plus className="h-4 w-4" />Add option</button></div><div className="space-y-2">{form.options.map((option, index) => <div key={index} className="flex items-center gap-2"><input value={option.option_text} onChange={(event) => updateOption(index, { option_text: event.target.value })} placeholder={`Option ${index + 1}`} required className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900" /><label className="flex shrink-0 items-center gap-1 text-xs text-gray-600"><input type="radio" name="correct-option" checked={option.is_correct} onChange={() => setForm((previous) => ({ ...previous, options: previous.options.map((item, optionIndex) => ({ ...item, is_correct: optionIndex === index })) }))} />Correct</label>{form.options.length > 2 && <button type="button" onClick={() => setForm((previous) => ({ ...previous, options: previous.options.filter((_, optionIndex) => optionIndex !== index) }))} className="rounded-md p-2 text-red-600 hover:bg-red-50" aria-label={`Remove option ${index + 1}`} title="Remove option"><Trash2 className="h-4 w-4" /></button>}</div>)}</div></div>
                    </div>
                    <div className="mt-6 flex justify-end gap-2 border-t border-gray-200 pt-4"><button type="button" onClick={onClose} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button><button type="submit" disabled={isSubmitting} className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">{isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}{isEditMode ? "Save Changes" : "Create Quiz"}</button></div>
                </form>
            </div>
        </div>
    );
}