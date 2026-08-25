"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Clock, CheckCircle2, XCircle, Loader2, Pencil, Trash2, Plus, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import {
    useDeleteCourseMutation,
    useGetSingleCourseQuery,
} from "@/redux/features/trainer/courses/coursesApi";
import CourseFormModal from "@/components/trainer-dashboard/courses/CourseFormModal";
import ModuleFormModal from "@/components/trainer-dashboard/courses/ModuleFormModal";
import { useGetModuleListQuery } from "@/redux/features/trainer/courses/modulesApi";

function formatPrice(price: string) {
    const value = Number(price);
    if (Number.isNaN(value)) return price;
    if (value <= 0) return "Free";
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

export default function CourseDetailsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isModuleFormOpen, setIsModuleFormOpen] = useState(false);
    const [deleteCourse] = useDeleteCourseMutation();

    const rawCourseId = searchParams.get("courseId");
    const courseId = useMemo(() => {
        if (!rawCourseId) return null;
        const parsed = Number(rawCourseId);
        return Number.isNaN(parsed) ? null : parsed;
    }, [rawCourseId]);

    const {
        data: course,
        isLoading,
        isError,
    } = useGetSingleCourseQuery(courseId ?? "", {
        skip: courseId === null,
    });
    const { data: modules = [], isLoading: areModulesLoading, isError: areModulesError } = useGetModuleListQuery();

    const courseModules = useMemo(
        () => course ? modules.filter((module) => String(module.course) === String(course.id) || String(module.course) === course.title) : [],
        [course, modules]
    );

    const handleDelete = async () => {
        if (!course) return;

        const result = await Swal.fire({
            title: "Delete this course?",
            text: `"${course.title}" will be permanently removed.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            confirmButtonColor: "#dc2626",
        });

        if (!result.isConfirmed) return;

        try {
            await deleteCourse(course.id).unwrap();
            toast.success("Course deleted successfully");
            router.push("/trainer/courses");
        } catch {
            toast.error("Failed to delete course");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="border-b border-gray-200 bg-white px-6 py-4">
                <div className="flex w-full items-center justify-between gap-3">
                    <button
                        type="button"
                        onClick={() => router.push("/trainer/courses")}
                        className="inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to courses
                    </button>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setIsFormOpen(true)}
                            disabled={!course || isLoading || isError}
                            className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label="Edit course"
                            title="Edit course"
                        >
                            <Pencil className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={!course || isLoading || isError}
                            className="flex h-9 w-9 items-center justify-center rounded-md border border-red-200 text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label="Delete course"
                            title="Delete course"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full px-6 py-8">
                {courseId === null && (
                    <div className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-700">
                        Invalid or missing course id.
                    </div>
                )}

                {isLoading && (
                    <div className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-10 text-sm text-gray-500">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Loading course...
                    </div>
                )}

                {isError && !isLoading && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-5 py-10 text-center text-sm text-red-500">
                        Couldn&apos;t load this course. Please try again.
                    </div>
                )}

                {course && !isLoading && !isError && (
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                        {course.thumbnail && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="h-64 w-full object-cover"
                            />
                        )}

                        <div className="space-y-4 p-6">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                                <h1 className="text-2xl font-semibold text-gray-900">{course.title}</h1>
                                <span
                                    className={`flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-white ${course.is_active ? "bg-emerald-600" : "bg-gray-500"
                                        }`}
                                >
                                    {course.is_active ? (
                                        <CheckCircle2 className="h-3 w-3" />
                                    ) : (
                                        <XCircle className="h-3 w-3" />
                                    )}
                                    {course.is_active ? "Active" : "Inactive"}
                                </span>
                            </div>

                            <p className="text-sm leading-6 text-gray-600">{course.description}</p>

                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Clock className="h-3.5 w-3.5" />
                                Added {new Date(course.created_at).toLocaleDateString()}
                            </div>

                            <div className="text-lg font-semibold text-gray-900">
                                {formatPrice(course.price)}
                            </div>

                            <div className="border-t border-gray-100 pt-5">
                                <div className="flex items-center justify-between gap-3">
                                    <h2 className="text-lg font-semibold text-gray-900">Course modules</h2>
                                    <button
                                        type="button"
                                        onClick={() => setIsModuleFormOpen(true)}
                                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Add new module
                                    </button>
                                </div>

                                {areModulesLoading && <p className="mt-4 text-sm text-gray-500">Loading modules...</p>}
                                {areModulesError && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">Couldn&apos;t load modules.</p>}
                                {!areModulesLoading && !areModulesError && courseModules.length === 0 && (
                                    <p className="mt-4 rounded-lg border border-dashed border-gray-300 p-5 text-center text-sm text-gray-500">No modules have been added yet.</p>
                                )}
                                <div className="mt-4 space-y-2">
                                    {courseModules.map((module) => (
                                        <button
                                            type="button"
                                            key={module.id}
                                            onClick={() => router.push(`/trainer/courses/courseDetails/courseModules?moduleId=${module.id}`)}
                                            className="flex w-full items-center justify-between gap-3 rounded-lg border border-gray-200 p-3 text-left hover:border-blue-300 hover:bg-blue-50/40"
                                        >
                                            <span className="min-w-0">
                                                <span className="block truncate text-sm font-medium text-gray-900">{module.title}</span>
                                                <span className="mt-1 block text-xs text-gray-500">{module.is_free ? "Free" : "Paid"} · {module.is_exam_complete ? "Exam complete" : "Exam in progress"}</span>
                                            </span>
                                            <ChevronRight className="h-4 w-4 shrink-0 text-gray-400" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <CourseFormModal
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                course={course ?? null}
            />
            <ModuleFormModal
                key={`${isModuleFormOpen ? "open" : "closed"}-${course?.id ?? "new"}`}
                isOpen={isModuleFormOpen}
                onClose={() => setIsModuleFormOpen(false)}
                courseId={course?.id}
            />
        </div>
    );
}