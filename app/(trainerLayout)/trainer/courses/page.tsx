"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Play, Clock, CheckCircle2, XCircle, Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import {
    Course,
    useGetCourseListQuery,
    useDeleteCourseMutation,
} from "@/redux/features/trainer/courses/coursesApi";
import CourseFormModal from "@/components/trainer-dashboard/courses/CourseFormModal";

const gradients = [
    "from-sky-500 to-cyan-400",
    "from-fuchsia-500 to-purple-500",
    "from-orange-500 to-red-500",
    "from-emerald-500 to-teal-500",
    "from-indigo-500 to-violet-500",
    "from-pink-500 to-rose-500",
    "from-amber-500 to-orange-500",
];

function getGradient(id: number) {
    return gradients[id % gradients.length];
}

function formatPrice(price: string) {
    const value = Number(price);
    if (Number.isNaN(value)) return price;
    if (value <= 0) return "Free";
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function CourseCardSkeleton() {
    return (
        <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="h-36 animate-pulse bg-gray-200" />
            <div className="flex flex-1 flex-col gap-2 p-4">
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
                <div className="mt-2 h-3 w-full animate-pulse rounded bg-gray-200" />
                <div className="mt-4 h-9 w-full animate-pulse rounded-lg bg-gray-200" />
            </div>
        </div>
    );
}

interface CourseCardProps {
    course: Course;
    onView: (id: number) => void;
    onEdit: (course: Course) => void;
    onDelete: (course: Course) => void;
}

function CourseCard({ course, onView, onEdit, onDelete }: CourseCardProps) {
    const [thumbFailed, setThumbFailed] = useState(false);
    const showThumb = course.thumbnail && !thumbFailed;

    return (
        <div
            onClick={() => onView(course.id)}
            className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
        >
            <div
                className={`relative flex h-36 items-center justify-center bg-gradient-to-br ${getGradient(
                    course.id
                )}`}
            >
                {showThumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="absolute inset-0 h-full w-full object-cover"
                        onError={() => setThumbFailed(true)}
                    />
                ) : (
                    <button
                        aria-label={`Preview ${course.title}`}
                        className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/80 text-white transition hover:bg-white/10"
                    >
                        <Play className="ml-0.5 h-5 w-5 fill-white" />
                    </button>
                )}

                <span
                    className={`absolute right-3 top-3 flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-white backdrop-blur-sm ${course.is_active ? "bg-emerald-600/80" : "bg-gray-600/80"
                        }`}
                >
                    {course.is_active ? (
                        <CheckCircle2 className="h-3 w-3" />
                    ) : (
                        <XCircle className="h-3 w-3" />
                    )}
                    {course.is_active ? "Active" : "Inactive"}
                </span>

                <div className="absolute left-3 top-3 flex gap-1 opacity-0 transition group-hover:opacity-100">
                    <button
                        type="button"
                        aria-label="Edit course"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(course);
                        }}
                        className="flex h-7 w-7 items-center justify-center rounded-md bg-white/90 text-gray-700 hover:bg-white"
                    >
                        <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                        type="button"
                        aria-label="Delete course"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(course);
                        }}
                        className="flex h-7 w-7 items-center justify-center rounded-md bg-white/90 text-red-600 hover:bg-white"
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                    </button>
                </div>
            </div>

            <div className="flex flex-1 flex-col p-4">
                <h3 className="line-clamp-1 text-sm font-semibold text-gray-900">{course.title}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-gray-500">{course.description}</p>

                <div className="mt-3 flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3.5 w-3.5" />
                    Added {new Date(course.created_at).toLocaleDateString()}
                </div>

                <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900">
                        {formatPrice(course.price)}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default function Courses() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const { data: courses = [], isLoading, isError } = useGetCourseListQuery();
    const [deleteCourse] = useDeleteCourseMutation();

    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const visibleCourses = useMemo(() => {
        if (!searchTerm.trim()) return courses;
        const term = searchTerm.toLowerCase();
        return courses.filter(
            (c) =>
                c.title.toLowerCase().includes(term) ||
                c.description.toLowerCase().includes(term)
        );
    }, [courses, searchTerm]);

    const openCreateModal = () => {
        setEditingCourse(null);
        setIsFormOpen(true);
    };

    const openEditModal = (course: Course) => {
        setEditingCourse(course);
        setIsFormOpen(true);
    };

    const closeFormModal = () => {
        setIsFormOpen(false);
        setEditingCourse(null);
    };

    const handleDelete = async (course: Course) => {
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
        } catch {
            toast.error("Failed to delete course");
        }
    };

    const openCourseDetails = (courseId: number) => {
        router.push(`/trainer/courses/courseDetails?courseId=${courseId}`);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex flex-col gap-3 border-b border-gray-200 bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:max-w-sm">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search courses by title or description..."
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                <button
                    type="button"
                    onClick={openCreateModal}
                    className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                >
                    <Plus className="h-4 w-4" />
                    Add Course
                </button>
            </div>

            <div className="w-full px-6 py-8">
                <section>
                    <h2 className="mb-4 text-lg font-semibold text-gray-900">Browse Courses</h2>

                    {isError && (
                        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                            Couldn&apos;t load courses. Please try again later.
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                        {isLoading
                            ? Array.from({ length: 5 }).map((_, i) => <CourseCardSkeleton key={i} />)
                            : visibleCourses.map((course) => (
                                <CourseCard
                                    key={course.id}
                                    course={course}
                                    onView={openCourseDetails}
                                    onEdit={openEditModal}
                                    onDelete={handleDelete}
                                />
                            ))}
                    </div>

                    {!isLoading && !isError && visibleCourses.length === 0 && (
                        <div className="rounded-lg border border-dashed border-gray-300 px-6 py-10 text-center text-sm text-gray-500">
                            No courses match your search.
                        </div>
                    )}
                </section>
            </div>

            <CourseFormModal isOpen={isFormOpen} onClose={closeFormModal} course={editingCourse} />
        </div>
    );
}