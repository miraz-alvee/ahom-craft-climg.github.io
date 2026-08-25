"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, Clock, Loader2, Pencil, Trash2, XCircle } from "lucide-react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import ModuleFormModal from "@/components/trainer-dashboard/courses/ModuleFormModal";
import LessonsSection from "@/components/trainer-dashboard/courses/LessonsSection";
import DocumentsSection from "@/components/trainer-dashboard/courses/DocumentsSection";
import {
    useDeleteModuleMutation,
    useGetSingleModuleQuery,
} from "@/redux/features/trainer/courses/modulesApi";
import QuizzesSection from "@/components/trainer-dashboard/courses/QuizzesSection";

export default function ModuleDetailsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [deleteModule] = useDeleteModuleMutation();
    const rawModuleId = searchParams.get("moduleId");
    const moduleId = useMemo(() => {
        if (!rawModuleId) return null;
        const parsed = Number(rawModuleId);
        return Number.isNaN(parsed) ? null : parsed;
    }, [rawModuleId]);
    const { data: module, isLoading, isError } = useGetSingleModuleQuery(moduleId ?? "", {
        skip: moduleId === null,
    });

    const handleDelete = async () => {
        if (!module) return;
        const result = await Swal.fire({
            title: "Delete this module?",
            text: `"${module.title}" will be permanently removed.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            confirmButtonColor: "#dc2626",
        });
        if (!result.isConfirmed) return;

        try {
            await deleteModule(module.id).unwrap();
            toast.success("Module deleted successfully");
            router.back();
        } catch {
            toast.error("Failed to delete module");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
                <button type="button" onClick={() => router.back()} className="inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                    <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <div className="flex items-center gap-2">
                    <button type="button" onClick={() => setIsFormOpen(true)} disabled={!module || isLoading || isError} className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-700 hover:bg-gray-100 disabled:opacity-50" aria-label="Edit module" title="Edit module"><Pencil className="h-4 w-4" /></button>
                    <button type="button" onClick={handleDelete} disabled={!module || isLoading || isError} className="flex h-9 w-9 items-center justify-center rounded-md border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50" aria-label="Delete module" title="Delete module"><Trash2 className="h-4 w-4" /></button>
                </div>
            </div>

            <main className="w-full px-6 py-8">
                {moduleId === null && <div className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-700">Invalid or missing module id.</div>}
                {isLoading && <div className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-10 text-sm text-gray-500"><Loader2 className="h-4 w-4 animate-spin" />Loading module...</div>}
                {isError && !isLoading && <div className="rounded-lg border border-red-200 bg-red-50 px-5 py-10 text-center text-sm text-red-500">Couldn&apos;t load this module. Please try again.</div>}

                {module && !isLoading && !isError && (
                    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                        {module.thumbnail ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={module.thumbnail} alt={module.title} className="h-64 w-full object-cover" />
                        ) : <div className="flex h-40 items-center justify-center bg-gray-100 text-sm text-gray-400">No thumbnail</div>}
                        <div className="space-y-5 p-6">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                                <div><p className="text-sm text-gray-500">Course: {module.course}</p><h1 className="mt-1 text-2xl font-semibold text-gray-900">{module.title}</h1></div>
                                <span className={`flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-white ${module.is_active ? "bg-emerald-600" : "bg-gray-500"}`}>{module.is_active ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}{module.is_active ? "Active" : "Inactive"}</span>
                            </div>
                            <p className="text-sm leading-6 text-gray-600">{module.description}</p>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                <div className="rounded-lg bg-gray-50 p-3"><p className="text-xs text-gray-500">Access</p><p className="mt-1 text-sm font-semibold text-gray-900">{module.is_free ? "Free" : "Paid"}</p></div>
                                <div className="rounded-lg bg-gray-50 p-3"><p className="text-xs text-gray-500">Questions per exam</p><p className="mt-1 text-sm font-semibold text-gray-900">{module.number_questions_every_exam}</p></div>
                                <div className="rounded-lg bg-gray-50 p-3"><p className="text-xs text-gray-500">Exam attempts</p><p className="mt-1 text-sm font-semibold text-gray-900">{module.number_exam_attempts}</p></div>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-500"><Clock className="h-3.5 w-3.5" />Added {new Date(module.created_at).toLocaleDateString()}</div>
                            {module.warning.length > 0 && <div className="space-y-2 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800"><p className="font-semibold">Attention</p>{module.warning.map((warning) => <p key={warning}>{warning}</p>)}</div>}
                            <LessonsSection moduleId={module.id} moduleTitle={module.title} />
                            <DocumentsSection moduleId={module.id} moduleTitle={module.title} />
                            <QuizzesSection moduleId={module.id} moduleTitle={module.title} />
                        </div>
                    </article>
                )}
            </main>
            <ModuleFormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} module={module ?? null} />
        </div>
    );
}
