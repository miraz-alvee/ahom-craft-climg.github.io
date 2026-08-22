"use client";

import { useGetCourseByIdQuery } from "@/redux/features/career-seeker/courses/getAllCourseApis";


export default function LectureDetail({
  courseId,
  moduleId,
  lessonId,
}: {
  courseId: number;
  moduleId: number;
  lessonId: number;
}) {
  const { data: course, isLoading, isError } = useGetCourseByIdQuery(courseId);
  const module = course?.modules.find((m) => m.id === moduleId);
  const lesson = module?.lessons.find((l) => l.id === lessonId);

  if (isLoading) return <div className="mx-auto h-64 max-w-3xl animate-pulse rounded-xl bg-gray-100" />;

  if (isError || !lesson) {
    return (
      <p className="mx-auto max-w-3xl rounded-lg bg-red-50 p-4 text-sm text-red-600">
        Failed to load this lecture.
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-8">
      <h1 className="text-xl font-bold text-gray-900">{lesson.title} hello</h1>
      <video src={lesson.video} controls className="w-full rounded-xl bg-black" />
      <p className="text-sm leading-relaxed text-gray-600">{lesson.description}</p>
    </div>
  );
}