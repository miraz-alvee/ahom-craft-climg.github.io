"use client";

import { Job } from "@/redux/features/jobs/types";
import Link from "next/link";
import { useState } from "react";
import ApplyJobModal from "./ApplyJobModal";


const EMPLOYEE_TYPE_LABEL: Record<Job["employee_type"], string> = {
    full_time: "Full-time",
    part_time: "Part-time",
    contract: "Contract",
    internship: "Internship",
};

const JOB_TYPE_LABEL: Record<Job["job_type"], string> = {
    remote: "Remote",
    onsite: "Onsite",
    hybrid: "Hybrid",
};

const AVATAR_COLORS = [
    "bg-indigo-500",
    "bg-rose-500",
    "bg-slate-900",
    "bg-red-500",
    "bg-emerald-500",
    "bg-amber-500",
];

function avatarColor(seed: string) {
    const idx = seed.charCodeAt(0) % AVATAR_COLORS.length;
    return AVATAR_COLORS[idx];
}

function timeAgo(dateString: string) {
    const diffMs = Date.now() - new Date(dateString).getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? "s" : ""} ago`;
}

export default function JobCard({ job }: { job: Job }) {
    const [showApply, setShowApply] = useState(false);
    return (
        <div className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div>
                <div className="flex items-start gap-3">
                    <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-semibold text-white ${avatarColor(
                            job.title
                        )}`}
                    >
                        {job.title.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                        <h3 className="truncate font-semibold text-gray-900">{job.title}</h3>
                        <p className="truncate text-sm text-gray-500">{job.category}</p>
                    </div>
                </div>

                <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
                    <span className="truncate">{job.job_location}</span>
                    <span>·</span>
                    <span>{timeAgo(job.created_at)}</span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                        {JOB_TYPE_LABEL[job.job_type]}
                    </span>
                    <span className="rounded-full bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-700">
                        {EMPLOYEE_TYPE_LABEL[job.employee_type]}
                    </span>
                    {job.salary_range && (
                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                            {job.salary_range}
                        </span>
                    )}
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
                <span
                    className={`text-xs font-medium ${job.deadline_status === "expired" ? "text-red-500" : "text-gray-400"
                        }`}
                >
                    {job.deadline_status}
                </span>
                <button
                    onClick={() => setShowApply(true)}
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
                >
                    Apply Now
                </button>
            </div>

            {showApply && (
                <ApplyJobModal jobId={job.id} jobTitle={job.title} onClose={() => setShowApply(false)} />
            )}
        </div>
    );
}