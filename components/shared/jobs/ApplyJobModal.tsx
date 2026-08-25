"use client";

import { useApplyToJobMutation } from "@/redux/features/job-apply/jobApplyApis";
import { useState } from "react";


interface Props {
  jobId: number;
  jobTitle: string;
  onClose: () => void;
}

export default function ApplyJobModal({ jobId, jobTitle, onClose }: Props) {
  const [applyToJob, { isLoading }] = useApplyToJobMutation();
  const [resume, setResume] = useState<File | null>(null);
  const [expectedSalary, setExpectedSalary] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!resume) {
      setError("Please attach your resume.");
      return;
    }

    try {
      await applyToJob({
        job: jobId,
        resume,
        expected_salary: expectedSalary || undefined,
      }).unwrap();
      setSuccess(true);
    } catch {
      setError("Failed to submit your application. Please try again.");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        {success ? (
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900">Application submitted</h3>
            <p className="mt-2 text-sm text-gray-500">
              Your application for <span className="font-medium">{jobTitle}</span> has been sent.
            </p>
            <button
              onClick={onClose}
              className="cursor-pointer mt-5 w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Apply for role</h3>
                <p className="text-sm text-gray-500">{jobTitle}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>
            )}

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Resume</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                required
                onChange={(e) => setResume(e.target.files?.[0] ?? null)}
                className="w-full text-sm font-medium text-[#0shf50] cursor-pointer"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Expected Salary
              </label>
              <input
                type="text"
                placeholder="e.g. 200"
                value={expectedSalary}
                onChange={(e) => setExpectedSalary(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-400"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
            >
              {isLoading ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}