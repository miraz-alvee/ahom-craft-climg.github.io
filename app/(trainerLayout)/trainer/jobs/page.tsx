"use client";

import { useMemo, useState } from "react";
import { Search, MapPin, Clock, ChevronDown } from "lucide-react";

type Category =
    | "Civil Engineer"
    | "EEE Engineer"
    | "Electric Mechanic"
    | "Cleaner"
    | "Contract";

type JobType = "Full-time" | "Remote" | "Contract";

interface Job {
    id: string;
    title: string;
    company: string;
    companyInitial: string;
    companyColor: string;
    location: string;
    postedAgo: string;
    jobType: JobType;
    salaryRange: string;
    category: Category;
}

const CATEGORIES: Category[] = [
    "Civil Engineer",
    "EEE Engineer",
    "Electric Mechanic",
    "Cleaner",
    "Contract",
];

const SORT_OPTIONS = ["Most Recent", "Oldest First", "Salary: High to Low", "Salary: Low to High"] as const;
type SortOption = (typeof SORT_OPTIONS)[number];

const JOBS: Job[] = [
    {
        id: "1",
        title: "Product Manager",
        company: "Meta",
        companyInitial: "M",
        companyColor: "bg-pink-600",
        location: "New York, NY",
        postedAgo: "1 day ago",
        jobType: "Full-time",
        salaryRange: "$130k - $170k",
        category: "Contract",
    },
    {
        id: "2",
        title: "Product Manager",
        company: "Meta",
        companyInitial: "M",
        companyColor: "bg-pink-600",
        location: "New York, NY",
        postedAgo: "1 day ago",
        jobType: "Full-time",
        salaryRange: "$130k - $170k",
        category: "Contract",
    },
    {
        id: "3",
        title: "Product Manager",
        company: "Meta",
        companyInitial: "M",
        companyColor: "bg-pink-600",
        location: "New York, NY",
        postedAgo: "1 day ago",
        jobType: "Full-time",
        salaryRange: "$130k - $170k",
        category: "Contract",
    },
    {
        id: "4",
        title: "Software Engineer",
        company: "Google",
        companyInitial: "G",
        companyColor: "bg-indigo-600",
        location: "Remote",
        postedAgo: "2 days ago",
        jobType: "Remote",
        salaryRange: "$120k - $160k",
        category: "Electric Mechanic",
    },
    {
        id: "5",
        title: "Product Manager",
        company: "Meta",
        companyInitial: "M",
        companyColor: "bg-pink-600",
        location: "New York, NY",
        postedAgo: "1 day ago",
        jobType: "Full-time",
        salaryRange: "$130k - $170k",
        category: "Contract",
    },
    {
        id: "6",
        title: "Software Engineer",
        company: "Google",
        companyInitial: "G",
        companyColor: "bg-indigo-600",
        location: "Remote",
        postedAgo: "2 days ago",
        jobType: "Remote",
        salaryRange: "$120k - $160k",
        category: "Electric Mechanic",
    },
    {
        id: "7",
        title: "Product Manager",
        company: "Meta",
        companyInitial: "M",
        companyColor: "bg-pink-600",
        location: "New York, NY",
        postedAgo: "1 day ago",
        jobType: "Full-time",
        salaryRange: "$130k - $170k",
        category: "Contract",
    },
    {
        id: "8",
        title: "Software Engineer",
        company: "Google",
        companyInitial: "G",
        companyColor: "bg-indigo-600",
        location: "Remote",
        postedAgo: "2 days ago",
        jobType: "Remote",
        salaryRange: "$120k - $160k",
        category: "Electric Mechanic",
    },
    {
        id: "9",
        title: "Product Manager",
        company: "Meta",
        companyInitial: "M",
        companyColor: "bg-pink-600",
        location: "New York, NY",
        postedAgo: "1 day ago",
        jobType: "Full-time",
        salaryRange: "$130k - $170k",
        category: "Contract",
    },
];

const jobTypeStyles: Record<JobType, string> = {
    "Full-time": "bg-blue-50 text-blue-700",
    Remote: "bg-emerald-50 text-emerald-700",
    Contract: "bg-amber-50 text-amber-700",
};

function JobCard({ job }: { job: Job }) {
    return (
        <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
                <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-sm font-semibold text-white ${job.companyColor}`}
                >
                    {job.companyInitial}
                </div>
                <div className="min-w-0">
                    <h3 className="truncate text-[15px] font-semibold text-gray-900">
                        {job.title}
                    </h3>
                    <p className="mt-0.5 flex items-center gap-1 text-sm text-gray-500">
                        <svg
                            className="h-3.5 w-3.5 shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path d="M3 21h18M5 21V7l8-4v18M13 21V11h6v10M9 9h.01M9 12h.01M9 15h.01" />
                        </svg>
                        {job.company}
                    </p>
                </div>
            </div>

            <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {job.location}
                </span>
                <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {job.postedAgo}
                </span>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${jobTypeStyles[job.jobType]}`}
                    >
                        {job.jobType}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                        {job.salaryRange}
                    </span>
                </div>
                <button
                    type="button"
                    className="shrink-0 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                    Apply Now
                </button>
            </div>
        </div>
    );
}

export default function DiscoverJobs() {
    const [search, setSearch] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const [sortBy, setSortBy] = useState<SortOption>("Most Recent");
    const [sortOpen, setSortOpen] = useState(false);

    const toggleCategory = (category: Category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    const filteredJobs = useMemo(() => {
        let jobs = JOBS.filter((job) => {
            const matchesSearch =
                search.trim() === "" ||
                job.title.toLowerCase().includes(search.toLowerCase()) ||
                job.company.toLowerCase().includes(search.toLowerCase());
            const matchesCategory =
                selectedCategories.length === 0 ||
                selectedCategories.includes(job.category);
            return matchesSearch && matchesCategory;
        });

        if (sortBy === "Salary: High to Low" || sortBy === "Salary: Low to High") {
            jobs = [...jobs].sort((a, b) => {
                const parse = (range: string) =>
                    parseInt(range.split(" - ")[0].replace(/[^0-9]/g, ""), 10);
                const diff = parse(a.salaryRange) - parse(b.salaryRange);
                return sortBy === "Salary: High to Low" ? -diff : diff;
            });
        }

        return jobs;
    }, [search, selectedCategories, sortBy]);

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-8">
            <div className="w-full">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Discover Jobs</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Find the perfect opportunity for your career
                    </p>
                </div>

                {/* Search + Sort */}
                <div className="mb-6 flex flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1">
                        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by title, company, or keywords..."
                            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setSortOpen((o) => !o)}
                            className="flex w-full items-center justify-between gap-8 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 sm:w-48"
                        >
                            {sortBy}
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                        </button>
                        {sortOpen && (
                            <div className="absolute right-0 z-10 mt-1 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg sm:w-48">
                                {SORT_OPTIONS.map((option) => (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => {
                                            setSortBy(option);
                                            setSortOpen(false);
                                        }}
                                        className={`block w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 ${option === sortBy
                                            ? "font-medium text-blue-600"
                                            : "text-gray-700"
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-6 lg:flex-row">
                    {/* Sidebar */}
                    <aside className="w-full shrink-0 rounded-xl border border-gray-200 bg-white p-5 lg:w-56">
                        <h2 className="mb-3 text-sm font-semibold text-gray-900">
                            Category
                        </h2>
                        <div className="flex flex-col gap-3">
                            {CATEGORIES.map((category) => (
                                <label
                                    key={category}
                                    className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-600"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(category)}
                                        onChange={() => toggleCategory(category)}
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    {category}
                                </label>
                            ))}
                        </div>
                    </aside>

                    {/* Job list */}
                    <div className="flex-1">
                        <p className="mb-4 text-sm text-gray-500">
                            Showing <span className="font-semibold text-gray-900">{filteredJobs.length}</span> jobs
                        </p>

                        {filteredJobs.length === 0 ? (
                            <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center text-sm text-gray-500">
                                No jobs match your filters. Try adjusting your search or category.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                                {filteredJobs.map((job) => (
                                    <JobCard key={job.id} job={job} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}