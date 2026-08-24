import { CourseListItem } from "@/redux/features/courses/courseTypes";
import Image from "next/image";
import Link from "next/link";

interface Props {
  course: CourseListItem;
}

export default function CourseCard({ course }: Props) {
  return (
    <Link
      href={`/career-seeker/course/${course.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative h-40 w-full overflow-hidden bg-gray-100">

        {course.thumbnail ? (
          <Image
            height={400}
            width={400}
            src={course.thumbnail}
            alt={course.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
            No thumbnail
          </div>
        )}
        {!course.is_active && (
          <span className="absolute left-2 top-2 rounded bg-gray-800/80 px-2 py-0.5 text-xs text-white">
            Inactive
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 text-base font-semibold text-gray-900">
          {course.title}
        </h3>
        <p className="line-clamp-2 text-sm text-gray-500">
          {course.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-xs text-gray-400">By {course.user}</span>
          <span className="text-sm font-bold text-emerald-600">
            ${course.price}
          </span>
        </div>
      </div>
    </Link>
  );
}