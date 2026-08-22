"use client";


import { useGetCourseByIdQuery } from "@/redux/features/career-seeker/courses/getAllCourseApis";
import ModulesList from "./ModulesList";
import EnrollButton from "./EnrolledButton";


export default function CourseDetail({ courseId }: { courseId: number }) {
  const { data: course, isLoading, isError } = useGetCourseByIdQuery(courseId);

  if (isLoading) return <div className="h-96 animate-pulse rounded-xl bg-gray-100" />;
  if (isError || !course) {
    return (
      <p className="rounded-lg bg-red-50 p-4 text-sm text-red-600">Failed to load this course.</p>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="overflow-hidden rounded-xl border border-gray-200">
        {course.thumbnail ? (
          <img src={course.thumbnail} alt={course.title} className="h-64 w-full object-cover" />
        ) : (
          <div className="flex h-64 w-full items-center justify-center bg-gray-100 text-sm text-gray-400">
            No thumbnail
          </div>
        )}
        <div className="space-y-3 p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">{course.title} hello</h1>
            <span className="text-lg font-bold text-emerald-600">${course.price}</span>
          </div>
          <p className="text-sm text-gray-500">{course.description}</p>
          <div className="flex items-center gap-4 pt-2">
            <img src={course.user.profile_picture} alt={course.user.full_name} className="h-8 w-8 rounded-full object-cover" />
            <span className="text-sm text-gray-600">{course.user.full_name}</span>
            {course.is_purchased ? (
              <span className="ml-auto rounded bg-emerald-50 px-2 py-1 text-xs text-emerald-600">Purchased</span>
            ) : (
              <div className="ml-auto"><EnrollButton courseId={course.id} /></div>
            )}
          </div>
        </div>
      </div>

      <ModulesList course={course} />
    </div>
  );
}