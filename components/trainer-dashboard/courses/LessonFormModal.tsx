"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { FileVideo, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import {
    Lesson,
    useCreateLessonMutation,
    useUpdateLessonMutation,
} from "@/redux/features/trainer/courses/moduleLessonsApi";

interface LessonFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    moduleId: number;
    lesson?: Lesson | null;
}

interface FormState {
    title: string;
    description: string;
    is_active: "true" | "false";
}

function getInitialState(lesson?: Lesson | null): FormState {
    return lesson
        ? { title: lesson.title, description: lesson.description, is_active: lesson.is_active ? "true" : "false" }
        : { title: "", description: "", is_active: "true" };
}

export default function LessonFormModal({ isOpen, onClose, moduleId, lesson }: LessonFormModalProps) {
    const [form, setForm] = useState<FormState>(() => getInitialState(lesson));
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [createLesson, { isLoading: isCreating }] = useCreateLessonMutation();
    const [updateLesson, { isLoading: isUpdating }] = useUpdateLessonMutation();
    const isEditMode = Boolean(lesson);
    const isSubmitting = isCreating || isUpdating;

    if (!isOpen) return null;

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setForm((previous) => ({ ...previous, [name]: value }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (!form.title.trim() || (!isEditMode && !videoFile)) {
            toast.error(isEditMode ? "Lesson title is required." : "Lesson title and video are required.");
            return;
        }

        const formData = new FormData();
        if (!isEditMode) formData.append("module", String(moduleId));
        formData.append("title", form.title.trim());
        formData.append("description", form.description);
        formData.append("is_active", form.is_active);
        if (videoFile) formData.append("video", videoFile);

        try {
            if (lesson) {
                await updateLesson({ formData, LessonId: lesson.id }).unwrap();
                toast.success("Lesson updated successfully");
            } else {
                await createLesson(formData).unwrap();
                toast.success("Lesson created successfully");
            }
            onClose();
        } catch {
            toast.error(isEditMode ? "Failed to update lesson" : "Failed to create lesson");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                    <h2 className="text-base font-semibold text-gray-900">{isEditMode ? "Edit Lesson" : "Add New Lesson"}</h2>
                    <button type="button" onClick={onClose} className="rounded-md p-1 text-gray-400 hover:bg-gray-100" aria-label="Close"><X className="h-5 w-5" /></button>
                </div>
                <form onSubmit={handleSubmit} className="max-h-[75vh] overflow-y-auto px-5 py-4">
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700">Title <span className="text-red-500">*</span><input name="title" value={form.title} onChange={handleChange} required className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal text-gray-900" /></label>
                        <label className="block text-sm font-medium text-gray-700">Description<textarea name="description" value={form.description} onChange={handleChange} rows={4} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal text-gray-900" /></label>
                        <label className="block text-sm font-medium text-gray-700">Video {!isEditMode && <span className="text-red-500">*</span>}<span className="mt-1 flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal text-gray-600 hover:bg-gray-50"><FileVideo className="h-4 w-4" />{videoFile?.name ?? (lesson?.video ? "Replace video" : "Choose video")}<input type="file" accept="video/*" required={!isEditMode} onChange={(event) => setVideoFile(event.target.files?.[0] ?? null)} className="hidden" /></span></label>
                        <label className="block text-sm font-medium text-gray-700">Status<select name="is_active" value={form.is_active} onChange={handleChange} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal text-gray-900"><option value="true">Active</option><option value="false">Inactive</option></select></label>
                    </div>
                    <div className="mt-6 flex justify-end gap-2 border-t border-gray-200 pt-4"><button type="button" onClick={onClose} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button><button type="submit" disabled={isSubmitting} className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">{isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}{isEditMode ? "Save Changes" : "Create Lesson"}</button></div>
                </form>
            </div>
        </div>
    );
}
