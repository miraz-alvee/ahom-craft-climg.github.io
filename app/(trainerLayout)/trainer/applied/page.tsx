"use client";

import { useMemo, useState } from "react";
import {
    Briefcase,
    Clock,
    CalendarCheck,
    CheckCircle2,
    Search,
    Eye,
    XCircle,
} from "lucide-react";

type Status = "Interview Scheduled" | "Under Review" | "Offer Received" | "Rejected";
type Filter = "All Applications" | "Under Review" | "Interview" | "Offers" | "Rejected";

interface Application {
    id: string;
    role: string;
    company: string;
    companyInitial: string;
    companyColor: string;
    location: string;
    appliedDate: string;
    status: Status;
}

const applications: Application[] = [
    {
        id: "1",
        role: "Software Engineer",
        company: "Google",
        companyInitial: "G",
        companyColor: "bg-blue-500",
        location: "Remote",
        appliedDate: "Feb 15, 2026",
        status: "Interview Scheduled",
    },
    {
        id: "2",
        role: "Product Manager",
        company: "Meta",
        companyInitial: "M",
        companyColor: "bg-pink-500",
        location: "New York, NY",
        appliedDate: "Feb 12, 2026",
        status: "Under Review",
    },
    {
        id: "3",
        role: "UX Designer",
        company: "Apple",
        companyInitial: "A",
        companyColor: "bg-teal-500",
        location: "Cupertino, CA",
        appliedDate: "Feb 10, 2026",
        status: "Offer Received",
    },
    {
        id: "4",
        role: "Data Scientist",
        company: "Netflix",
        companyInitial: "N",
        companyColor: "bg-emerald-600",
        location: "Remote",
        appliedDate: "Feb 8, 2026",
        status: "Rejected",
    },
    {
        id: "5",
        role: "Frontend Developer",
        company: "Airbnb",
        companyInitial: "A",
        companyColor: "bg-indigo-500",
        location: "San Francisco, CA",
        appliedDate: "Feb 5, 2026",
        status: "Under Review",
    },
    {
        id: "6",
        role: "Marketing Manager",
        company: "Spotify",
        companyInitial: "S",
        companyColor: "bg-green-500",
        location: "New York, NY",
        appliedDate: "Feb 3, 2026",
        status: "Interview Scheduled",
    },
];

const statusStyles: Record<Status, { bg: string; text: string; icon: React.ReactNode }> = {
    "Interview Scheduled": {
        bg: "bg-blue-50",
        text: "text-blue-700",
        icon: <CalendarCheck className="h-3.5 w-3.5" />,
    },
    "Under Review": {
        bg: "bg-amber-50",
        text: "text-amber-700",
        icon: <Clock className="h-3.5 w-3.5" />,
    },
    "Offer Received": {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        icon: <CheckCircle2 className="h-3.5 w-3.5" />,
    },
    Rejected: {
        bg: "bg-red-50",
        text: "text-red-700",
        icon: <XCircle className="h-3.5 w-3.5" />,
    },
};

const filters: Filter[] = ["All Applications", "Under Review", "Interview", "Offers", "Rejected"];

function StatusBadge({ status }: { status: Status }) {
    const style = statusStyles[status];
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${style.bg} ${style.text}`}
        >
            {style.icon}
            {status}
        </span>
    );
}

interface SummaryCardProps {
    icon: React.ReactNode;
    iconBg: string;
    value: number;
    label: string;
}

function SummaryCard({ icon, iconBg, value, label }: SummaryCardProps) {
    return (
        <div className="flex-1 rounded-xl border border-gray-200 bg-white p-5">
            <div className={`mb-4 flex h-9 w-9 items-center justify-center rounded-lg ${iconBg}`}>
                {icon}
            </div>
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            <div className="mt-0.5 text-sm text-gray-500">{label}</div>
        </div>
    );
}

export default function JobApplicationsTracker() {
    const [activeFilter, setActiveFilter] = useState<Filter>("All Applications");
    const [searchQuery, setSearchQuery] = useState("");

    const summary = useMemo(
        () => ({
            total: applications.length,
            underReview: applications.filter((a) => a.status === "Under Review").length,
            interviews: applications.filter((a) => a.status === "Interview Scheduled").length,
            offers: applications.filter((a) => a.status === "Offer Received").length,
        }),
        []
    );

    const filteredApplications = useMemo(() => {
        let result = applications;

        if (activeFilter === "Under Review") {
            result = result.filter((a) => a.status === "Under Review");
        } else if (activeFilter === "Interview") {
            result = result.filter((a) => a.status === "Interview Scheduled");
        } else if (activeFilter === "Offers") {
            result = result.filter((a) => a.status === "Offer Received");
        } else if (activeFilter === "Rejected") {
            result = result.filter((a) => a.status === "Rejected");
        }

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (a) =>
                    a.role.toLowerCase().includes(q) ||
                    a.company.toLowerCase().includes(q) ||
                    a.location.toLowerCase().includes(q)
            );
        }

        return result;
    }, [activeFilter, searchQuery]);

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-6">
            <div className="w-full">
                {/* Search bar */}
                <div className="relative mb-6">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search jobs, companies, or keywords..."
                        className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
                    <p className="mt-1 text-sm text-gray-500">Track and manage your job applications</p>
                </div>

                {/* Summary cards */}
                <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <SummaryCard
                        icon={<Briefcase className="h-4.5 w-4.5 text-gray-600" />}
                        iconBg="bg-gray-100"
                        value={summary.total}
                        label="Total Applied"
                    />
                    <SummaryCard
                        icon={<Clock className="h-4.5 w-4.5 text-amber-600" />}
                        iconBg="bg-amber-100"
                        value={summary.underReview}
                        label="Under Review"
                    />
                    <SummaryCard
                        icon={<CalendarCheck className="h-4.5 w-4.5 text-blue-600" />}
                        iconBg="bg-blue-100"
                        value={summary.interviews}
                        label="Interviews"
                    />
                    <SummaryCard
                        icon={<CheckCircle2 className="h-4.5 w-4.5 text-emerald-600" />}
                        iconBg="bg-emerald-100"
                        value={summary.offers}
                        label="Offers"
                    />
                </div>

                {/* Filter tabs */}
                <div className="mb-4 flex flex-wrap gap-2">
                    {filters.map((filter) => {
                        const isActive = activeFilter === filter;
                        return (
                            <button
                                key={filter}
                                type="button"
                                onClick={() => setActiveFilter(filter)}
                                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${isActive
                                    ? "bg-blue-600 text-white"
                                    : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                                    }`}
                            >
                                {filter}
                            </button>
                        );
                    })}
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-100 text-xs font-medium uppercase tracking-wide text-gray-400">
                                    <th className="px-6 py-3">Job</th>
                                    <th className="px-6 py-3">Location</th>
                                    <th className="px-6 py-3">Applied Date</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredApplications.map((app) => (
                                    <tr
                                        key={app.id}
                                        className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50/60"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-semibold text-white ${app.companyColor}`}
                                                >
                                                    {app.companyInitial}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-semibold text-gray-900">{app.role}</div>
                                                    <div className="text-xs text-gray-500">{app.company}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{app.location}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{app.appliedDate}</td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={app.status} />
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                type="button"
                                                aria-label={`View ${app.role} application`}
                                                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {filteredApplications.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-400">
                                            No applications match your search or filter.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}