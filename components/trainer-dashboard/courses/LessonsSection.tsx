"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, ChevronRight, Clock, Eye, FileVideo, Loader2, Pencil, Plus, Trash2, X, XCircle } from "lucide-react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import LessonFormModal from "@/components/trainer-dashboard/courses/LessonFormModal";
import {
    Lesson,
    useDeleteLessonMutation,
    useGetLessonListQuery,
    useGetSingleLessonQuery,
} from "@/redux/features/trainer/courses/moduleLessonsApi";

interface LessonsSectionProps {
    moduleId: number;
    moduleTitle?: string;
}

export default function LessonsSection({ moduleId, moduleTitle }: LessonsSectionProps) {
    const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
    const { data: lessons = [], isLoading, isError } = useGetLessonListQuery();
    const { data: selectedLesson, isFetching: isLessonFetching } = useGetSingleLessonQuery(selectedLessonId ?? "", { skip: selectedLessonId === null });
    const [deleteLesson] = useDeleteLessonMutation();

    const moduleLessons = useMemo(
        () => lessons.filter((lesson) => String(lesson.module) === String(moduleId) || String(lesson.module) === moduleTitle),
        [lessons, moduleId, moduleTitle]
    );

    const openCreate = () => {
        setEditingLesson(null);
        setIsFormOpen(true);
    };

    const openEdit = () => {
        if (!selectedLesson) return;
        setEditingLesson(selectedLesson);
        setIsFormOpen(true);
    };

    const handleDelete = async () => {
        if (!selectedLesson) return;
        const result = await Swal.fire({ title: "Delete this lesson?", text: `"${selectedLesson.title}" will be permanently removed.`, icon: "warning", showCancelButton: true, confirmButtonText: "Delete", confirmButtonColor: "#dc2626" });
        if (!result.isConfirmed) return;
        try {
            await deleteLesson(selectedLesson.id).unwrap();
            toast.success("Lesson deleted successfully");
            setSelectedLessonId(null);
        } catch {
            toast.error("Failed to delete lesson");
        }
    };

    return (
        <section className="border-t border-gray-100 pt-5">
            <div className="flex items-center justify-between gap-3">
                <div><h2 className="text-lg font-semibold text-gray-900">Lessons</h2><p className="mt-1 text-sm text-gray-500">Build the lesson content for this module.</p></div>
                <button type="button" onClick={openCreate} className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"><Plus className="h-4 w-4" />Add lesson</button>
            </div>

            {isLoading && <div className="mt-4 flex items-center gap-2 text-sm text-gray-500"><Loader2 className="h-4 w-4 animate-spin" />Loading lessons...</div>}
            {isError && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">Couldn&apos;t load lessons.</p>}
            {!isLoading && !isError && moduleLessons.length === 0 && <p className="mt-4 rounded-lg border border-dashed border-gray-300 p-5 text-center text-sm text-gray-500">No lessons have been added yet.</p>}
            <div className="mt-4 space-y-2">
                {moduleLessons.map((lesson) => <button type="button" key={lesson.id} onClick={() => setSelectedLessonId(lesson.id)} className={`flex w-full items-center justify-between gap-3 rounded-lg border p-3 text-left ${selectedLessonId === lesson.id ? "border-blue-400 bg-blue-50/60" : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/40"}`}><span className="min-w-0"><span className="flex items-center gap-2 truncate text-sm font-medium text-gray-900">{lesson.is_active ? <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" /> : <XCircle className="h-4 w-4 shrink-0 text-gray-400" />}{lesson.title}</span><span className="mt-1 block truncate text-xs text-gray-500">{lesson.description || "No description"}</span></span><ChevronRight className="h-4 w-4 shrink-0 text-gray-400" /></button>)}
            </div>

            {selectedLessonId !== null && <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-4 py-6" role="dialog" aria-modal="true" aria-label="Lesson video" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedLessonId(null); }}><div className="max-h-full w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-2xl">{isLessonFetching || !selectedLesson ? <div className="flex items-center justify-center gap-2 px-5 py-16 text-sm text-gray-500"><Loader2 className="h-4 w-4 animate-spin" />Loading lesson...</div> : <><div className="flex items-start justify-between gap-3 border-b border-gray-200 px-5 py-4"><div><h3 className="text-lg font-semibold text-gray-900">{selectedLesson.title}</h3><p className="mt-1 text-sm leading-6 text-gray-600">{selectedLesson.description || "No description"}</p></div><div className="flex shrink-0 items-center gap-1"><button type="button" onClick={openEdit} className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-700 hover:bg-gray-100" aria-label="Edit lesson" title="Edit lesson"><Pencil className="h-4 w-4" /></button><button type="button" onClick={handleDelete} className="flex h-8 w-8 items-center justify-center rounded-md border border-red-200 text-red-600 hover:bg-red-50" aria-label="Delete lesson" title="Delete lesson"><Trash2 className="h-4 w-4" /></button><button type="button" onClick={() => setSelectedLessonId(null)} className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100" aria-label="Close lesson video" title="Close"><X className="h-5 w-5" /></button></div></div><div className="p-5">{selectedLesson.video ? <video controls autoPlay preload="metadata" className="aspect-video w-full rounded-lg bg-black" src={selectedLesson.video}><track kind="captions" /></video> : <div className="flex aspect-video items-center justify-center rounded-lg bg-gray-200 text-sm text-gray-500">No video available</div>}<div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-500"><span className="flex items-center gap-1"><FileVideo className="h-3.5 w-3.5" />{selectedLesson.video ? "Video attached" : "No video"}</span><span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />Added {new Date(selectedLesson.created_at).toLocaleDateString()}</span><span className={`flex items-center gap-1 font-medium ${selectedLesson.is_active ? "text-emerald-600" : "text-gray-500"}`}><Eye className="h-3.5 w-3.5" />{selectedLesson.is_active ? "Active" : "Inactive"}</span></div></div></>}</div></div>}

            <LessonFormModal key={`${isFormOpen ? "open" : "closed"}-${editingLesson?.id ?? "new"}`} isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} moduleId={moduleId} lesson={editingLesson} />
        </section>
    );
}
