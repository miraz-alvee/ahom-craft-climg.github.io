"use client";

import { useGetExamResultSummaryQuery } from "@/redux/features/courses/exams/userExamsAPis";
import { useGetCourseByIdQuery } from "@/redux/features/courses/getAllCourseApis";
import Link from "next/link";


interface RowProps {
    thumbnail: string | null;
    title: string;
    rightSlot: React.ReactNode;
    href?: string;
}

function ContentRow({ thumbnail, title, rightSlot, href }: RowProps) {
    const inner = (
        <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-3 shadow-sm transition hover:shadow-md">
            <div className="flex items-center gap-3">
                <div className="h-10 w-10 overflow-hidden rounded-lg bg-gray-100">
                    {thumbnail && <img src={thumbnail} alt={title} className="h-full w-full object-cover" />}
                </div>
                <span className="text-sm font-medium text-gray-800">{title}</span>
            </div>
            {rightSlot}
        </div>
    );

    return href ? <Link href={href}>{inner}</Link> : inner;
}

function CircleIcon({ children }: { children: React.ReactNode }) {
    return (
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
            {children}
        </span>
    );
}

export default function ModuleContent({ courseId, moduleId }: { courseId: number; moduleId: number }) {
    const { data: course, isLoading, isError } = useGetCourseByIdQuery(courseId);
    const module = course?.modules.find((m) => m.id === moduleId);

    const { data: examSummary } = useGetExamResultSummaryQuery(moduleId, { skip: !module });

    if (isLoading) return <div className="mx-auto h-64 max-w-3xl animate-pulse rounded-xl bg-gray-100" />;

    if (isError || !course || !module) {
        return (
            <p className="mx-auto max-w-3xl rounded-lg bg-red-50 p-4 text-sm text-red-600">
                Failed to load this module.
            </p>
        );
    }

    const locked = !module.is_free && !course.is_purchased;
    const attempts = examSummary?.attempts ?? [];

    if (locked) {
        return (
            <div className="mx-auto max-w-3xl px-4 py-8">
                <h1 className="mb-4 text-xl font-bold text-gray-900">{module.title}</h1>
                <p className="rounded-lg bg-amber-50 p-4 text-sm text-amber-700">
                    Purchase this course to unlock this module.
                </p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl space-y-3 px-4 py-8">
            <h1 className="mb-2 text-xl font-bold text-gray-900">{module.title}</h1>

            <div className="mt-10 flex flex-col gap-5">

                {module.lessons.map((lesson) => (
                    <ContentRow
                        key={`lesson-${lesson.id}`}
                        thumbnail={module.thumbnail}
                        title={lesson.title}
                        href={`/trade-person/course/${courseId}/module/${moduleId}/lecture/${lesson.id}`}
                        rightSlot={<CircleIcon>▶</CircleIcon>}
                    />
                ))}

                {module.documents.map((doc) => (
                    <a key={`doc-${doc.id}`} href={doc.pdf_file} target="_blank" rel="noopener noreferrer">
                        <ContentRow thumbnail={module.thumbnail} title={doc.title || "PDF"} rightSlot={<CircleIcon>⬇</CircleIcon>} />
                    </a>
                ))}

                {attempts.map((attempt, i) => {
                    const total = attempt.correct_answers + attempt.incorrect_answers;
                    return (
                        <ContentRow
                            key={`attempt-${attempt.UserExamAttempt_id}`}
                            thumbnail={module.thumbnail}
                            title={`Test ${i + 1}`}
                            href={`/trade-person/course/${courseId}/module/${moduleId}/exam/result/${attempt.UserExamAttempt_id}`}
                            rightSlot={<span className="text-sm font-medium text-gray-500">{attempt.correct_answers}/{total}</span>}
                        />
                    );
                })}

                <ContentRow
                    thumbnail={module.thumbnail}
                    title={`Test ${attempts.length + 1}`}
                    href={`/trade-person/course/${courseId}/module/${moduleId}/exam`}
                    rightSlot={<CircleIcon>▶</CircleIcon>}
                />
            </div>

        </div >
    );
}