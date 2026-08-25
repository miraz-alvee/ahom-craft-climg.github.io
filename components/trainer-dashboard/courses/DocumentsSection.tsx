"use client";

import { useMemo, useState } from "react";
import { ChevronRight, ExternalLink, FileText, Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import DocumentFormModal from "@/components/trainer-dashboard/courses/DocumentFormModal";
import {
    Document,
    useDeleteDocumentMutation,
    useGetDocumentListQuery,
    useGetSingleDocumentQuery,
} from "@/redux/features/trainer/courses/moduleDocumentsApi";

interface DocumentsSectionProps {
    moduleId: number;
    moduleTitle?: string;
}

export default function DocumentsSection({ moduleId, moduleTitle }: DocumentsSectionProps) {
    const [selectedDocumentId, setSelectedDocumentId] = useState<number | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingDocument, setEditingDocument] = useState<Document | null>(null);

    const { data: documents = [], isLoading, isError } = useGetDocumentListQuery();
    const { data: selectedDocument, isFetching: isDocumentFetching } = useGetSingleDocumentQuery(selectedDocumentId ?? "", {
        skip: selectedDocumentId === null,
    });
    const [deleteDocument] = useDeleteDocumentMutation();

    const moduleDocuments = useMemo(
        () =>
            documents.filter(
                (document) => String(document.module) === String(moduleId) || String(document.module) === moduleTitle
            ),
        [documents, moduleId, moduleTitle]
    );

    const openCreate = () => {
        setEditingDocument(null);
        setIsFormOpen(true);
    };

    const openEdit = () => {
        if (!selectedDocument) return;
        setEditingDocument(selectedDocument);
        setIsFormOpen(true);
    };

    const handleDelete = async () => {
        if (!selectedDocument) return;

        const result = await Swal.fire({
            title: "Delete this document?",
            text: `"${selectedDocument.title}" will be permanently removed.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            confirmButtonColor: "#dc2626",
        });

        if (!result.isConfirmed) return;

        try {
            await deleteDocument(selectedDocument.id).unwrap();
            toast.success("Document deleted successfully");
            setSelectedDocumentId(null);
        } catch {
            toast.error("Failed to delete document");
        }
    };

    return (
        <section className="border-t border-gray-100 pt-5">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">Documents</h2>
                    <p className="mt-1 text-sm text-gray-500">Attach PDF documents for this module.</p>
                </div>
                <button
                    type="button"
                    onClick={openCreate}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    <Plus className="h-4 w-4" />
                    Add document
                </button>
            </div>

            {isLoading && (
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading documents...
                </div>
            )}

            {isError && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">Couldn&apos;t load documents.</p>}

            {!isLoading && !isError && moduleDocuments.length === 0 && (
                <p className="mt-4 rounded-lg border border-dashed border-gray-300 p-5 text-center text-sm text-gray-500">
                    No documents have been added yet.
                </p>
            )}

            <div className="mt-4 space-y-2">
                {moduleDocuments.map((document) => (
                    <button
                        type="button"
                        key={document.id}
                        onClick={() => setSelectedDocumentId(document.id)}
                        className={`flex w-full items-center justify-between gap-3 rounded-lg border p-3 text-left ${selectedDocumentId === document.id
                                ? "border-blue-400 bg-blue-50/60"
                                : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/40"
                            }`}
                    >
                        <span className="min-w-0">
                            <span className="flex items-center gap-2 truncate text-sm font-medium text-gray-900">
                                <FileText className="h-4 w-4 shrink-0 text-blue-600" />
                                {document.title}
                            </span>
                            <span className="mt-1 block truncate text-xs text-gray-500">{document.module}</span>
                        </span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-gray-400" />
                    </button>
                ))}
            </div>

            {selectedDocumentId !== null && (
                <div
                    className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-4 py-6"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Document details"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) setSelectedDocumentId(null);
                    }}
                >
                    <div className="max-h-full w-full max-w-4xl overflow-y-auto rounded-xl bg-white shadow-2xl">
                        {isDocumentFetching || !selectedDocument ? (
                            <div className="flex items-center justify-center gap-2 px-5 py-16 text-sm text-gray-500">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Loading document...
                            </div>
                        ) : (
                            <>
                                <div className="flex items-start justify-between gap-3 border-b border-gray-200 px-5 py-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{selectedDocument.title}</h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Added {new Date(selectedDocument.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex shrink-0 items-center gap-1">
                                        <button
                                            type="button"
                                            onClick={openEdit}
                                            className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-700 hover:bg-gray-100"
                                            aria-label="Edit document"
                                            title="Edit document"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleDelete}
                                            className="flex h-8 w-8 items-center justify-center rounded-md border border-red-200 text-red-600 hover:bg-red-50"
                                            aria-label="Delete document"
                                            title="Delete document"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedDocumentId(null)}
                                            className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
                                            aria-label="Close document details"
                                            title="Close"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4 p-5">
                                    <a
                                        href={selectedDocument.pdf_file}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                        Open document in new tab
                                    </a>
                                    <p className="text-sm text-gray-500">Preview is disabled here. Use the button above to open the file directly in a new tab.</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            <DocumentFormModal
                key={`${isFormOpen ? "open" : "closed"}-${editingDocument?.id ?? "new"}`}
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                moduleId={moduleId}
                document={editingDocument}
            />
        </section>
    );
}
