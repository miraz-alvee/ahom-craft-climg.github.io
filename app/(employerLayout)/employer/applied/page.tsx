"use client";

import { useState } from "react";
import { Briefcase, Clock, CalendarCheck, CheckCircle2, Eye } from "lucide-react";
import { useGetMyApplicationsQuery } from "@/redux/features/job-apply/jobApplyApis";
import { ApplicationStatus, JobApplication } from "@/redux/features/job-apply/types";

const STATUS_CONFIG: Record< ApplicationStatus, { label: string; className: string; icon: React.ReactNode }> 
= {
  in_progress: {
    label: "Under Review",
    className: "bg-amber-50 text-amber-700 border border-amber-200",
    icon: <Clock className="h-3.5 w-3.5" />,
  },
  reviewed: {
    label: "Reviewed",
    className: "bg-slate-50 text-slate-700 border border-slate-200",
    icon: <Eye className="h-3.5 w-3.5" />,
  },
  shortlisted: {
    label: "Interview Scheduled",
    className: "bg-blue-50 text-blue-700 border border-blue-200",
    icon: <CalendarCheck className="h-3.5 w-3.5" />,
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-50 text-red-600 border border-red-200",
    icon: <Clock className="h-3.5 w-3.5" />,
  },
  hired: {
    label: "Offer Received",
    className: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
  },
};

const TABS: { label: string; value: ApplicationStatus | "all" }[] = [
  { label: "All Applications", value: "all" },
  { label: "Under Review", value: "in_progress" },
  { label: "Interview", value: "shortlisted" },
  { label: "Offers", value: "hired" },
  { label: "Rejected", value: "rejected" },
];

const AVATAR_COLORS = [
  "bg-indigo-500",
  "bg-rose-500",
  "bg-slate-900",
  "bg-red-500",
  "bg-emerald-500",
  "bg-amber-500",
];

function avatarColor(seed: string) {
  return AVATAR_COLORS[seed.charCodeAt(0) % AVATAR_COLORS.length];
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function StatCard({
  icon,
  value,
  label,
  iconBg,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  iconBg: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${iconBg}`}>
        {icon}
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}

export default function MyApplications() {
  const { data: applications, isLoading: applicationsLoading, isError } = useGetMyApplicationsQuery();
  const [activeTab, setActiveTab] = useState<ApplicationStatus | "all">("all");

  const counts = {
    total: applications?.length ?? 0,
    inProgress: applications?.filter((a) => a.job.job_progress === "in_progress").length ?? 0,
    shortlisted: applications?.filter((a) => a.job.job_progress === "shortlisted").length ?? 0,
    hired: applications?.filter((a) => a.job.job_progress === "hired").length ?? 0,
  };

  const filtered =
    activeTab === "all"
      ? applications
      : applications?.filter((a) => a.job.job_progress === activeTab);

  return (
    <div className="min-h-screen bg-[#f4f6fb] font-sans">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
        <p className="mt-1 text-sm text-gray-500">Track and manage your job applications</p>

        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            icon={<Briefcase className="h-5 w-5 text-gray-600" />}
            value={counts.total}
            label="Total Applied"
            iconBg="bg-gray-100"
          />
          <StatCard
            icon={<Clock className="h-5 w-5 text-amber-600" />}
            value={counts.inProgress}
            label="Under Review"
            iconBg="bg-amber-100"
          />
          <StatCard
            icon={<CalendarCheck className="h-5 w-5 text-blue-600" />}
            value={counts.shortlisted}
            label="Interviews"
            iconBg="bg-blue-100"
          />
          <StatCard
            icon={<CheckCircle2 className="h-5 w-5 text-emerald-600" />}
            value={counts.hired}
            label="Offers"
            iconBg="bg-emerald-100"
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${activeTab === tab.value
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white">
          {applicationsLoading ? (
            <div className="p-8 text-center text-sm text-gray-500">Loading applications...</div>
          ) : isError ? (
            <div className="p-8 text-center text-sm text-red-600">Couldn't load your applications.</div>
          ) : !filtered?.length ? (
            <div className="p-8 text-center text-sm text-gray-500">No applications in this category.</div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
                  <th className="px-6 py-3 font-medium">Job</th>
                  <th className="px-6 py-3 font-medium">Location</th>
                  <th className="px-6 py-3 font-medium">Applied Date</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((app: JobApplication) => {
                  const status = STATUS_CONFIG[app.job.job_progress];
                  return (
                    <tr key={app.application_id} className="border-b border-gray-50 last:border-0">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-semibold text-white ${avatarColor(
                              app.job.title
                            )}`}
                          >
                            {app.job.title.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate font-medium text-gray-900">{app.job.title}</p>
                            <p className="truncate text-xs text-gray-400">{app.job.salary_range}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{app.job.job_location}</td>
                      <td className="px-6 py-4 text-gray-600">{formatDate(app.applied_at)}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${status.className}`}
                        >
                          {status.icon}
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={app.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-600"
                          aria-label="View resume"
                        >
                          <Eye className="h-4 w-4" />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}