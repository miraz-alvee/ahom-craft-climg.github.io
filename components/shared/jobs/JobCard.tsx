"use client";

import { Job } from "@/redux/features/jobs/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ApplyJobModal from "./ApplyJobModal";
import { useCreateRoomMutation } from "@/redux/features/chat/chatApis";
import { MessageSquare, Loader2, MapPin, Clock, Briefcase, DollarSign, Sparkles } from "lucide-react";
import { toast } from "sonner";

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

const GRADIENTS = [
  "from-blue-600 to-indigo-600",
  "from-violet-600 to-purple-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-rose-500 to-pink-600",
  "from-cyan-500 to-blue-600",
];

function getGradient(seed: string) {
  const idx = (seed.charCodeAt(0) || 0) % GRADIENTS.length;
  return GRADIENTS[idx];
}

function timeAgo(dateString: string) {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function JobCard({ job }: { job: Job }) {
  const [showApply, setShowApply] = useState(false);
  const [createRoom, { isLoading: isCreatingRoom }] = useCreateRoomMutation();
  const router = useRouter();

  const handleChatWithEmployer = async () => {
    const employerId =
      typeof job.user === "object"
        ? job.user?.id
        : (job as unknown as { user_id?: number }).user_id || job.user;

    if (!employerId) {
      toast.error("Employer details not found for this job post.");
      return;
    }

    try {
      const room = await createRoom({ user2: Number(employerId) }).unwrap();
      const rId = room?.room_id || (room as unknown as { id?: number })?.id;

      if (rId) {
        toast.success("Opening chat room...");
        router.push(`/trade-person/chat?roomId=${rId}`);
      } else {
        toast.success("Opening chat...");
        router.push("/trade-person/chat");
      }
    } catch (err: unknown) {
      console.error("Failed to create chat room:", err);
      const apiErr = err as { data?: { detail?: string; error?: string } };
      toast.error(apiErr?.data?.detail || apiErr?.data?.error || "Could not start chat.");
    }
  };

  const gradientClass = getGradient(job.title);

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 dark:hover:border-blue-900 hover:shadow-xl hover:shadow-blue-500/5">
      <div>
        {/* Header Avatar & Details */}
        <div className="flex items-start gap-3.5">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradientClass} font-inter text-base font-bold text-white shadow-md shadow-blue-500/10 ring-2 ring-white dark:ring-slate-900 transition-transform duration-300 group-hover:scale-105`}
          >
            {job.title.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="truncate font-inter text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {job.title}
              </h3>
            </div>
            <p className="mt-0.5 truncate text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Briefcase className="h-3 w-3 text-slate-400" />
              {job.category}
            </p>
          </div>
        </div>

        {/* Location & Post Time Meta */}
        <div className="mt-3.5 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-900 pt-3">
          <span className="flex items-center gap-1 truncate">
            <MapPin className="h-3.5 w-3.5 text-blue-500 shrink-0" />
            {job.job_location}
          </span>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="flex items-center gap-1 shrink-0">
            <Clock className="h-3.5 w-3.5 text-amber-500 shrink-0" />
            {timeAgo(job.created_at)}
          </span>
        </div>

        {/* Badges / Pill Tags */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 text-[11px] font-semibold text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900">
            {JOB_TYPE_LABEL[job.job_type]}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 dark:bg-purple-950/60 px-2.5 py-0.5 text-[11px] font-semibold text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900">
            {EMPLOYEE_TYPE_LABEL[job.employee_type]}
          </span>
          {job.salary_range && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900">
              <DollarSign className="h-3 w-3 text-emerald-500 -mr-0.5" />
              {job.salary_range}
            </span>
          )}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 dark:border-slate-900 pt-3.5">
        <span
          className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
            job.deadline_status === "expired"
              ? "text-rose-500"
              : "text-slate-400 dark:text-slate-500"
          }`}
        >
          {job.deadline_status === "expired" ? (
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
          ) : (
            <Sparkles className="h-3 w-3 text-amber-400" />
          )}
          {job.deadline_status || "Active"}
        </span>

        <div className="flex items-center gap-2">
          {/* Fancy Chat Button */}
          <button
            onClick={handleChatWithEmployer}
            disabled={isCreatingRoom}
            className="flex items-center gap-1.5 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/80 dark:bg-blue-950/60 px-3.5 py-2 text-xs font-bold text-blue-600 dark:text-blue-400 shadow-2xs transition-all duration-200 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white disabled:opacity-50 cursor-pointer"
            title="Chat with Employer"
          >
            {isCreatingRoom ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <MessageSquare className="h-3.5 w-3.5" />
            )}
            <span>Chat</span>
          </button>

          {/* Fancy Apply Button */}
          <button
            onClick={() => setShowApply(true)}
            className="rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30 cursor-pointer"
          >
            Apply Now
          </button>
        </div>
      </div>

      {showApply && (
        <ApplyJobModal jobId={job.id} jobTitle={job.title} onClose={() => setShowApply(false)} />
      )}
    </div>
  );
}