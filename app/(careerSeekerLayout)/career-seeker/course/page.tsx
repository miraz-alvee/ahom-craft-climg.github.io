"use client"

import CourseCard from "@/components/career-seekers-dashboard/courses/CourseCard";
import { useGetCourseQuery } from "@/redux/features/courses/getAllCourseApis";


export default function CoursePage() {
  const { data: courses, isLoading, isError } = useGetCourseQuery();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-64 animate-pulse rounded-xl bg-gray-100"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
        Failed to load courses. Please try again.
      </p>
    );
  }

  if (!courses || courses.length === 0) {
    return <p className="text-sm text-gray-500">No courses found.</p>;
  }
  return (

    <main className="min-h-screen bg-[#f4f6fb]">
      <div className="px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-inter text-2xl font-bold">Courses & Learning</h1>
          <p className="font-inter text-gray-500 text-sm">
            Enhance your skills with professional courses
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

      </div>
    </main>
  )
}
