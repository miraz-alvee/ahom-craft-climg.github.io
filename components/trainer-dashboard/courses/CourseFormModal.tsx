"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { X, Loader2, ImagePlus } from "lucide-react";
import { toast } from "sonner";
import {
    Course,
    useCreateCourseMutation,
    useUpdateCourseMutation,
} from "@/redux/features/trainer/courses/coursesApi";

interface CourseFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    course?: Course | null;
}

interface FormState {
    title: string;
    description: string;
    price: string;
    is_active: "true" | "false";
}

const initialFormState: FormState = {
    title: "",
    description: "",
    price: "",
    is_active: "true",
};

function CourseFormModalContent({
    isOpen,
    onClose,
    course,
}: CourseFormModalProps) {
    const isEditMode = Boolean(course);

    const [form, setForm] = useState<FormState>(() =>
        course
            ? {
                title: course.title,
                description: course.description,
                price: course.price,
                is_active: course.is_active ? "true" : "false",
            }
            : initialFormState
    );
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
        () => course?.thumbnail || null
    );

    const [createCourse, { isLoading: isCreating }] = useCreateCourseMutation();
    const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseMutation();
    const isSubmitting = isCreating || isUpdating;

    if (!isOpen) return null;

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setThumbnailFile(file);
        if (file) setThumbnailPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!form.title.trim() || !form.price.trim()) {
            toast.error("Title and price are required.");
            return;
        }

        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("price", form.price);
        formData.append("is_active", form.is_active);
        if (thumbnailFile) {
            formData.append("thumbnail", thumbnailFile);
        }

        try {
            if (isEditMode && course) {
                await updateCourse({ formData, courseId: course.id }).unwrap();
                toast.success("Course updated successfully");
            } else {
                await createCourse(formData).unwrap();
                toast.success("Course created successfully");
            }
            onClose();
        } catch {
            toast.error(isEditMode ? "Failed to update course" : "Failed to create course");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                    <h2 className="text-base font-semibold text-gray-900">
                        {isEditMode ? "Edit Course" : "Add New Course"}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                        aria-label="Close"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="max-h-[75vh] overflow-y-auto px-5 py-4">
                    <div className="space-y-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                                placeholder="e.g. Complete React Developer Course"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows={3}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                                placeholder="Briefly describe this course"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Thumbnail
                            </label>
                            <div className="flex items-center gap-3">
                                <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
                                    <ImagePlus className="h-4 w-4" />
                                    Choose File
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleThumbnailChange}
                                        className="hidden"
                                    />
                                </label>
                                {thumbnailFile ? (
                                    <span className="truncate text-xs text-gray-500">
                                        {thumbnailFile.name}
                                    </span>
                                ) : isEditMode ? (
                                    <span className="truncate text-xs text-gray-500">
                                        Keep current thumbnail
                                    </span>
                                ) : null}
                            </div>
                            {thumbnailPreview && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={thumbnailPreview}
                                    alt="Thumbnail preview"
                                    className="mt-3 h-24 w-full rounded-lg object-cover"
                                />
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Price <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                                placeholder="0.00"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Status
                            </label>
                            <select
                                name="is_active"
                                value={form.is_active}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                            >
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-2 border-t border-gray-200 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                        >
                            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                            {isEditMode ? "Save Changes" : "Create Course"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function CourseFormModal(props: CourseFormModalProps) {
    const key = `${props.isOpen ? "open" : "closed"}-${props.course?.id ?? "new"}`;

    return <CourseFormModalContent key={key} {...props} />;
}