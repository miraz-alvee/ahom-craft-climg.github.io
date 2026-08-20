"use client";

import { useState } from "react";

import { EmployeeType, JobType } from "@/redux/features/jobs/types";
import JobsGrid from "@/components/shared/jobs/JobGrid";
import JobsFilters from "@/components/shared/jobs/JobsFilters";
import JobsSearchBar from "@/components/shared/jobs/JobsSearchBar";
import Link from "next/link";


export default function DiscoverJobsPage() {
    const [search, setSearch] = useState("");
    const [ordering, setOrdering] = useState("-created_at");
    const [employeeType, setEmployeeType] = useState<EmployeeType | undefined>();
    const [jobType, setJobType] = useState<JobType | undefined>();

    return (
        <div className="px-4 py-8">
            <div className="flex justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Discover Jobs</h1>
                    <p className="mt-1 text-sm text-gray-500">Find the perfect opportunity for your career</p>
                </div>
                <Link href="/career-seeker/jobs/post"><button

                    className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
                >
                    Create job Post
                </button>
                </Link>
            </div>

            <div className="mt-6">
                <JobsSearchBar value={search} onChange={setSearch} ordering={ordering} onOrderingChange={setOrdering} />
            </div>

            <div className="mt-6 flex flex-col gap-6 lg:flex-row">
                <JobsFilters
                    employeeType={employeeType}
                    jobType={jobType}
                    onEmployeeTypeChange={setEmployeeType}
                    onJobTypeChange={setJobType}
                />
                <div className="flex-1">
                    <JobsGrid
                        filters={{
                            search: search || undefined,
                            ordering,
                            employee_type: employeeType,
                            job_type: jobType,
                            is_active: true,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}