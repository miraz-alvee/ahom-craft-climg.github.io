"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { FileText, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import {
    Document,
    useCreateDocumentMutation,
    useUpdateDocumentMutation,
} from "@/redux/features/trainer/courses/moduleDocumentsApi";

interface DocumentFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    moduleId: number;
    document?: Document | null;
}

interface FormState {
    title: string;
}

function getInitialState(document?: Document | null): FormState {
    return document ? { title: document.title } : { title: "" };
}

export default function DocumentFormModal({ isOpen, onClose, moduleId, document }: DocumentFormModalProps) {
    const [form, setForm] = useState<FormState>(() => getInitialState(document));
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [createDocument, { isLoading: isCreating }] = useCreateDocumentMutation();
    const [updateDocument, { isLoading: isUpdating }] = useUpdateDocumentMutation();
    const isEditMode = Boolean(document);
    const isSubmitting = isCreating || isUpdating;

    if (!isOpen) return null;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm((previous) => ({ ...previous, [name]: value }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!form.title.trim() || (!isEditMode && !pdfFile)) {
            toast.error(isEditMode ? "Document title is required." : "Document title and PDF are required.");
            return;
        }

        const formData = new FormData();
        if (!isEditMode) formData.append("module", String(moduleId));
        formData.append("title", form.title.trim());
        if (pdfFile) formData.append("pdf_file", pdfFile);

        try {
            if (document) {
                await updateDocument({ formData, DocumentId: document.id }).unwrap();
                toast.success("Document updated successfully");
            } else {
                await createDocument(formData).unwrap();
                toast.success("Document created successfully");
            }
            onClose();
        } catch {
            toast.error(isEditMode ? "Failed to update document" : "Failed to create document");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                    <h2 className="text-base font-semibold text-gray-900">{isEditMode ? "Edit Document" : "Add New Document"}</h2>
                    <button type="button" onClick={onClose} className="rounded-md p-1 text-gray-400 hover:bg-gray-100" aria-label="Close">
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="max-h-[75vh] overflow-y-auto px-5 py-4">
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Title <span className="text-red-500">*</span>
                            <input
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal text-gray-900"
                            />
                        </label>

                        <label className="block text-sm font-medium text-gray-700">
                            PDF {!isEditMode && <span className="text-red-500">*</span>}
                            <span className="mt-1 flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-normal text-gray-600 hover:bg-gray-50">
                                <FileText className="h-4 w-4" />
                                {pdfFile?.name ?? (document?.pdf_file ? "Replace PDF" : "Choose PDF")}
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    required={!isEditMode}
                                    onChange={(event) => setPdfFile(event.target.files?.[0] ?? null)}
                                    className="hidden"
                                />
                            </span>
                        </label>
                    </div>

                    <div className="mt-6 flex justify-end gap-2 border-t border-gray-200 pt-4">
                        <button type="button" onClick={onClose} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                            {isEditMode ? "Save Changes" : "Create Document"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
