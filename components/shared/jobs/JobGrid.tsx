"use client";

import { GetJobsParams } from "@/redux/features/jobs/types";
import { useGetJobsQuery } from "@/redux/features/jobs/jobsApis";

import JobCard from "./JobCard";

export default function JobsGrid({ filters }: { filters: GetJobsParams }) {
    const { data, isLoading, isFetching, isError } = useGetJobsQuery(filters);
    console.log("query filters:", filters, "data count:", data?.count);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="h-44 animate-pulse rounded-xl bg-gray-100" />
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <p className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
                Couldn't load jobs right now. Please try again.
            </p>
        );
    }

    if (!data?.results.length) {
        return <p className="p-8 text-center text-sm text-gray-500">No jobs match your filters.</p>;
    }

    return (
        <div>
            <p className="mb-4 text-sm text-gray-500">
                Showing <span className="font-medium text-gray-900">{data.count}</span> jobs
            </p>
            <div
                className={`grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 ${isFetching ? "opacity-60" : ""
                    }`}
            >
                {data.results.map((job) => (
                    <JobCard key={job.id} job={job} />
                ))}
            </div>
        </div>
    );
}