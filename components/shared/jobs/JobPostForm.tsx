"use client";

import { useState } from "react";

import { CreateJobRequest, EmployeeType, JobType } from "@/redux/features/jobs/types";
import { useGetCategoriesQuery } from "@/redux/features/categories/categoriesApis";
import { useCreateJobMutation } from "@/redux/features/jobs/jobsApis";

const EMPTY_FORM: Omit<CreateJobRequest, "job_banner"> = {
  title: "",
  category: 0,
  employee_type: "full_time",
  job_type: "onsite",
  job_summary: "",
  key_responsibilities: "",
  job_requirements: "",
  job_location: "",
  salary_range: "",
  minimum_experience: "",
  deadline: "",
  is_active: true,
};

export default function JobPostForm() {
  const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery();
  const [createJob, { isLoading: submitting }] = useCreateJobMutation();

  const [form, setForm] = useState(EMPTY_FORM);
  const [banner, setBanner] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.category) {
      setError("Please select a category.");
      return;
    }

    // job_banner is a file, so the request body must be FormData, not JSON.
    // Make sure your baseApi's fetchBaseQuery doesn't force a Content-Type: application/json
    // header (it should let the browser set the multipart boundary itself when body is FormData).
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
    if (banner) formData.append("job_banner", banner);

    try {
      await createJob(formData as unknown as CreateJobRequest).unwrap();
      setForm(EMPTY_FORM);
      setBanner(null);
    } catch (err) {
      setError("Failed to post job. Please check the fields and try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-4 rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-gray-900">Post a Job</h2>

      {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>}

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          required
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-400"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Category</label>
        <select
          required
          disabled={categoriesLoading}
          value={form.category || ""}
          onChange={(e) => update("category", Number(e.target.value))}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-400"
        >
          <option value="" disabled>
            {categoriesLoading ? "Loading categories..." : "Select a category"}
          </option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Employee Type</label>
          <select
            value={form.employee_type}
            onChange={(e) => update("employee_type", e.target.value as EmployeeType)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-400"
          >
            <option value="full_time">Full Time</option>
            <option value="part_time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Job Type</label>
          <select
            value={form.job_type}
            onChange={(e) => update("job_type", e.target.value as JobType)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-400"
          >
            <option value="remote">Remote</option>
            <option value="onsite">Onsite</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Job Summary</label>
        <textarea
          required
          rows={3}
          value={form.job_summary}
          onChange={(e) => update("job_summary", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-400"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Key Responsibilities</label>
        <textarea
          required
          rows={3}
          value={form.key_responsibilities}
          onChange={(e) => update("key_responsibilities", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-400"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Job Requirements</label>
        <textarea
          required
          rows={3}
          value={form.job_requirements}
          onChange={(e) => update("job_requirements", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-400"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Job Location</label>
          <input
            type="text"
            required
            value={form.job_location}
            onChange={(e) => update("job_location", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-400"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Salary Range</label>
          <input
            type="text"
            placeholder="e.g. 200-300"
            value={form.salary_range}
            onChange={(e) => update("salary_range", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Minimum Experience</label>
          <input
            type="text"
            required
            placeholder="e.g. 5 years"
            value={form.minimum_experience}
            onChange={(e) => update("minimum_experience", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-400"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Deadline</label>
          <input
            type="datetime-local"
            required
            value={form.deadline}
            onChange={(e) => update("deadline", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-400"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Job Banner</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setBanner(e.target.files?.[0] ?? null)}
          className="max-w-50 p-2 font-medium text-[#0shf50] text-sm rounded-sm bg-[#f1f2f3] cursor-pointer"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={form.is_active}
          onChange={(e) => update("is_active", e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600"
        />
        Active
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
      >
        {submitting ? "Posting..." : "Post Job"}
      </button>
    </form>
  );
}