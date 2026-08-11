"use client";

import { useState } from "react";
import { Search, BookOpen, Play, Star, Clock, Users } from "lucide-react";

interface ContinueCourse {
    id: string;
    title: string;
    instructor: string;
    progress: number;
    gradient: string;
}

interface BrowseCourse {
    id: string;
    title: string;
    instructor: string;
    hours: number;
    students: number;
    rating: number;
    category: string;
    gradient: string;
}

const filters = ["All", "Site", "Business", "Civil", "Electrical"] as const;

const continueCourses: ContinueCourse[] = [
    {
        id: "react-dev",
        title: "Complete React Developer Course",
        instructor: "John Smith",
        progress: 65,
        gradient: "from-sky-500 to-cyan-400",
    },
    {
        id: "system-design",
        title: "System Design Interview Prep",
        instructor: "Sarah Chen",
        progress: 30,
        gradient: "from-fuchsia-500 to-purple-500",
    },
];

const browseCourses: BrowseCourse[] = [
    {
        id: "product-mgmt",
        title: "Product Management",
        instructor: "Mike Johnson",
        hours: 12,
        students: 6700,
        rating: 4.7,
        category: "Business",
        gradient: "from-orange-500 to-red-500",
    },
    {
        id: "ux-masterclass",
        title: "UX Design Masterclass",
        instructor: "Emily Davis",
        hours: 20,
        students: 9200,
        rating: 4.8,
        category: "Design",
        gradient: "from-emerald-500 to-teal-500",
    },
    {
        id: "data-science",
        title: "Data Science with Python",
        instructor: "Alex Rivera",
        hours: 30,
        students: 15000,
        rating: 4.6,
        category: "Tech",
        gradient: "from-indigo-500 to-violet-500",
    },
    {
        id: "digital-marketing",
        title: "Digital Marketing Strategy",
        instructor: "Jessica Park",
        hours: 15,
        students: 5400,
        rating: 4.5,
        category: "Marketing",
        gradient: "from-pink-500 to-rose-500",
    },
    {
        id: "leadership",
        title: "Leadership & Management",
        instructor: "David Wilson",
        hours: 10,
        students: 4200,
        rating: 4.7,
        category: "Business",
        gradient: "from-amber-500 to-orange-500",
    },
];

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-1">
            <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${i < Math.round(rating)
                            ? "fill-amber-400 text-amber-400"
                            : "fill-transparent text-gray-300"
                            }`}
                    />
                ))}
            </div>
            <span className="text-sm text-gray-500">{rating}</span>
        </div>
    );
}

export default function CoursesAndLearning() {
    const [activeFilter, setActiveFilter] =
        useState<(typeof filters)[number]>("All");

    const visibleCourses =
        activeFilter === "All"
            ? browseCourses
            : browseCourses.filter((c) => c.category === activeFilter);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Search bar */}
            <div className="border-b border-gray-200 bg-white px-6 py-4">
                <div className="relative w-full">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search jobs, companies, or keywords..."
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                </div>
            </div>

            <div className="w-full px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Courses & Learning
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Enhance your skills with professional courses
                    </p>
                </div>

                {/* My Learning */}
                <section className="mb-10">
                    <div className="mb-4 flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                        <h2 className="text-lg font-semibold text-gray-900">
                            My Learning
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {continueCourses.map((course) => (
                            <div
                                key={course.id}
                                className="flex overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
                            >
                                <div
                                    className={`flex w-28 shrink-0 items-center justify-center bg-gradient-to-br ${course.gradient}`}
                                >
                                    <button
                                        aria-label={`Continue ${course.title}`}
                                        className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/80 text-white transition hover:bg-white/10"
                                    >
                                        <Play className="ml-0.5 h-4 w-4 fill-white" />
                                    </button>
                                </div>
                                <div className="flex flex-1 flex-col justify-center px-4 py-3">
                                    <h3 className="text-sm font-semibold text-gray-900">
                                        {course.title}
                                    </h3>
                                    <p className="mt-0.5 text-xs text-gray-500">
                                        {course.instructor}
                                    </p>
                                    <div className="mt-2 flex items-center gap-2">
                                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                                            <div
                                                className="h-full rounded-full bg-blue-600"
                                                style={{ width: `${course.progress}%` }}
                                            />
                                        </div>
                                        <span className="text-xs font-medium text-gray-500">
                                            {course.progress}% complete
                                        </span>
                                    </div>
                                    <a
                                        href="#"
                                        className="mt-2 text-xs font-medium text-blue-600 hover:underline"
                                    >
                                        Continue Learning →
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Browse Courses */}
                <section>
                    <h2 className="mb-4 text-lg font-semibold text-gray-900">
                        Browse Courses
                    </h2>

                    <div className="mb-6 flex flex-wrap gap-2">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${activeFilter === filter
                                    ? "bg-blue-600 text-white"
                                    : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                        {visibleCourses.map((course) => (
                            <div
                                key={course.id}
                                className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                            >
                                <div
                                    className={`relative flex h-36 items-center justify-center bg-gradient-to-br ${course.gradient}`}
                                >
                                    <span className="absolute right-3 top-3 rounded-md bg-black/40 px-2 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                                        {course.category}
                                    </span>
                                    <button
                                        aria-label={`Preview ${course.title}`}
                                        className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/80 text-white transition hover:bg-white/10"
                                    >
                                        <Play className="ml-0.5 h-5 w-5 fill-white" />
                                    </button>
                                </div>

                                <div className="flex flex-1 flex-col p-4">
                                    <h3 className="text-sm font-semibold text-gray-900">
                                        {course.title}
                                    </h3>
                                    <p className="mt-0.5 text-xs text-gray-500">
                                        {course.instructor}
                                    </p>

                                    <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3.5 w-3.5" />
                                            {course.hours} hours
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Users className="h-3.5 w-3.5" />
                                            {course.students.toLocaleString()} students
                                        </span>
                                    </div>

                                    <div className="mt-2">
                                        <StarRating rating={course.rating} />
                                    </div>

                                    <button className="mt-4 w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
                                        Enroll Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}