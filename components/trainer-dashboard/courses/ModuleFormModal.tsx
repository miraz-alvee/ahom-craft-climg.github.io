"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import {
    Module,
    useCreateModuleMutation,
    useUpdateModuleMutation,
} from "@/redux/features/trainer/courses/modulesApi";

interface ModuleFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    courseId?: number;
    module?: Module | null;
}

interface FormState {
    title: string;
    description: string;
    number_questions_every_exam: string;
    number_exam_attempts: string;
    is_free: "true" | "false";
    is_active: "true" | "false";
}

function getInitialState(module?: Module | null): FormState {
    return module
        ? {
            title: module.title,
            description: module.description,
            number_questions_every_exam: String(module.number_questions_every_exam),
            number_exam_attempts: String(module.number_exam_attempts),
            is_free: module.is_free ? "true" : "false",
            is_active: module.is_active ? "true" : "false",
        }
        : {
            title: "",
            description: "",
            number_questions_every_exam: "10",
            number_exam_attempts: "3",
            is_free: "true",
            is_active: "true",
        };
}

export default function ModuleFormModal({ isOpen, onClose, courseId, module }: ModuleFormModalProps) {
    const [form, setForm] = useState<FormState>(() => getInitialState(module));
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [createModule, { isLoading: isCreating }] = useCreateModuleMutation();
    const [updateModule, { isLoading: isUpdating }] = useUpdateModuleMutation();
    const isEditMode = Boolean(module);
    const isSubmitting = isCreating || isUpdating;

    if (!isOpen) return null;

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setForm((previous) => ({ ...previous, [name]: value }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (!form.title.trim() || (!isEditMode && courseId === undefined)) {
            toast.error("Module title and course are required.");
            return;
        }

        const formData = new FormData();
        if (!isEditMode) formData.append("course", String(courseId));
        formData.append("title", form.title.trim());
        formData.append("description", form.description);
        formData.append("number_questions_every_exam", form.number_questions_every_exam);
        formData.append("number_exam_attempts", form.number_exam_attempts);
        formData.append("is_free", form.is_free);
        formData.append("is_active", form.is_active);
        if (thumbnailFile) formData.append("thumbnail", thumbnailFile);

        try {
            if (module) {
                await updateModule({ formData, ModuleId: module.id }).unwrap();
                toast.success("Module updated successfully");
            } else {
                await createModule(formData).unwrap();
                toast.success("Module created successfully");
            }
            onClose();
        } catch {
            toast.error(isEditMode ? "Failed to update module" : "Failed to create module");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                    <h2 className="text-base font-semibold text-gray-900">{isEditMode ? "Edit Module" : "Add New Module"}</h2>
                    <button type="button" onClick={onClose} className="rounded-md p-1 text-gray-400 hover:bg-gray-100" aria-label="Close">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="max-h-[75vh] overflow-y-auto px-5 py-4">
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Title <span className="text-red-500">*</span>
                            <input name="title" value={form.title} onChange={handleChange} required className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal text-gray-900" />
                        </label>
                        <label className="block text-sm font-medium text-gray-700">
                            Description
                            <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal text-gray-900" />
                        </label>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <label className="text-sm font-medium text-gray-700">Questions per exam<input type="number" min="1" name="number_questions_every_exam" value={form.number_questions_every_exam} onChange={handleChange} required className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal text-gray-900" /></label>
                            <label className="text-sm font-medium text-gray-700">Exam attempts<input type="number" min="1" name="number_exam_attempts" value={form.number_exam_attempts} onChange={handleChange} required className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal text-gray-900" /></label>
                        </div>
                        <label className="block text-sm font-medium text-gray-700">Thumbnail
                            <span className="mt-1 flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal text-gray-600 hover:bg-gray-50"><ImagePlus className="h-4 w-4" />{thumbnailFile?.name ?? "Choose File"}<input type="file" accept="image/*" onChange={(event) => setThumbnailFile(event.target.files?.[0] ?? null)} className="hidden" /></span>
                        </label>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <label className="text-sm font-medium text-gray-700">Access<select name="is_free" value={form.is_free} onChange={handleChange} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal text-gray-900"><option value="true">Free</option><option value="false">Paid</option></select></label>
                            <label className="text-sm font-medium text-gray-700">Status<select name="is_active" value={form.is_active} onChange={handleChange} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal text-gray-900"><option value="true">Active</option><option value="false">Inactive</option></select></label>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-2 border-t border-gray-200 pt-4">
                        <button type="button" onClick={onClose} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
                        <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">{isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}{isEditMode ? "Save Changes" : "Create Module"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}