"use client";

import { CourseDetail } from "@/redux/features/courses/courseTypes";
import Link from "next/link";


export default function ModulesList({ course }: { course: CourseDetail }) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold text-gray-900">All Modules</h2>

      {course.modules.map((module) => {
        const locked = !module.is_free && !course.is_purchased;

        const row = (
          <div
            className={`flex items-center justify-between rounded-xl border border-gray-100 bg-white p-3 mt-2 shadow-sm transition
              ${locked ? "opacity-60" : "hover:shadow-md"}`}
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-lg bg-gray-100">
                {module.thumbnail && (
                  <img src={module.thumbnail} alt={module.title} className="h-full w-full object-cover" />
                )}
              </div>
              <span className="text-sm font-medium text-gray-800">{module.title}</span>
            </div>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              {locked ? "🔒" : "→"}
            </span>
          </div>
        );

        return locked ? (
          <div key={module.id}>{row}</div>
        ) : (
          <Link key={module.id} href={`/trade-person/course/${course.id}/module/${module.id}`}>
            {row}
          </Link>
        );
      })}
    </div>
  );
}