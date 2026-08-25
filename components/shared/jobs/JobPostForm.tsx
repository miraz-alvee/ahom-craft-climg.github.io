"use client";

import { useState } from "react";
import { Briefcase, MapPin, DollarSign, Calendar, Upload, ChevronDown, X } from "lucide-react";

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

const FIELD =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

const LABEL = "mb-1.5 block text-xs font-medium text-gray-600";

function Field({
  label,
  required,
  children,
  span,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  span?: boolean;
}) {
  return (
    <div className={span ? "sm:col-span-2" : ""}>
      <label className={LABEL}>
        {label}
        {required && <span className="ml-0.5 text-indigo-500">*</span>}
      </label>
      {children}
    </div>
  );
}

function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`flex-1 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${value === opt.value
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
            }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default function JobPostForm() {
  const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery();
  const [createJob, { isLoading: submitting }] = useCreateJobMutation();

  const [form, setForm] = useState(EMPTY_FORM);
  const [banner, setBanner] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleBanner(file: File | null) {
    setBanner(file);
    setBannerPreview(file ? URL.createObjectURL(file) : null);
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
      setBannerPreview(null);
    } catch (err) {
      setError("Failed to post job. Please check the fields and try again.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-7xl flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50">
          <Briefcase className="h-4 w-4 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-gray-900">Post a job</h2>
          <p className="text-xs text-gray-500">Fill in the details below to publish a new listing.</p>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
        {error && (
          <div className="flex items-center justify-between rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-600">
            {error}
            <button type="button" onClick={() => setError(null)} className="text-red-400 hover:text-red-600">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* Basics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Job title" required span>
            <input
              type="text"
              required
              placeholder="e.g. Senior Frontend Engineer"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              className={FIELD}
            />
          </Field>

          <Field label="Category" required>
            <div className="relative">
              <select
                required
                disabled={categoriesLoading}
                value={form.category || ""}
                onChange={(e) => update("category", Number(e.target.value))}
                className={`${FIELD} appearance-none pr-8 disabled:opacity-60`}
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
              <ChevronDown className="pointer-events-none absolute right-2.5 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </Field>

          <Field label="Minimum experience" required>
            <input
              type="text"
              required
              placeholder="e.g. 5 years"
              value={form.minimum_experience}
              onChange={(e) => update("minimum_experience", e.target.value)}
              className={FIELD}
            />
          </Field>
        </div>

        {/* Type toggles */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Employee type">
            <SegmentedControl<EmployeeType>
              value={form.employee_type}
              onChange={(v) => update("employee_type", v)}
              options={[
                { value: "full_time", label: "Full time" },
                { value: "part_time", label: "Part time" },
                { value: "contract", label: "Contract" },
                { value: "internship", label: "Intern" },
              ]}
            />
          </Field>
          <Field label="Work setting">
            <SegmentedControl<JobType>
              value={form.job_type}
              onChange={(v) => update("job_type", v)}
              options={[
                { value: "remote", label: "Remote" },
                { value: "onsite", label: "Onsite" },
                { value: "hybrid", label: "Hybrid" },
              ]}
            />
          </Field>
        </div>

        <hr className="border-gray-100" />

        {/* Description block */}
        <Field label="Job summary" required>
          <textarea
            required
            rows={2}
            placeholder="A short overview of the role..."
            value={form.job_summary}
            onChange={(e) => update("job_summary", e.target.value)}
            className={`${FIELD} resize-none`}
          />
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Key responsibilities" required>
            <textarea
              required
              rows={3}
              placeholder="One per line..."
              value={form.key_responsibilities}
              onChange={(e) => update("key_responsibilities", e.target.value)}
              className={`${FIELD} resize-none`}
            />
          </Field>
          <Field label="Requirements" required>
            <textarea
              required
              rows={3}
              placeholder="One per line..."
              value={form.job_requirements}
              onChange={(e) => update("job_requirements", e.target.value)}
              className={`${FIELD} resize-none`}
            />
          </Field>
        </div>

        <hr className="border-gray-100" />

        {/* Logistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Location" required>
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                required
                placeholder="e.g. Dhaka, Bangladesh"
                value={form.job_location}
                onChange={(e) => update("job_location", e.target.value)}
                className={`${FIELD} pl-9 w-full`}
              />
            </div>
          </Field>

          <Field label="Salary range">
            <div className="relative">
              <DollarSign className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="e.g. 2,000-3,000"
                value={form.salary_range}
                onChange={(e) => update("salary_range", e.target.value)}
                className={`${FIELD} pl-9 w-full`}
              />
            </div>
          </Field>

          {/* Removed 'span' prop so it fits perfectly into 1 of the 3 columns */}
          <Field label="Application deadline" required>
            {/* Removed 'max-w-xs' so it fills the column width equally */}
            <div className="relative w-full">
              <Calendar className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="datetime-local"
                required
                value={form.deadline}
                onChange={(e) => update("deadline", e.target.value)}
                className={`${FIELD} pl-9 w-full`}
              />
            </div>
          </Field>
        </div>

        <hr className="border-gray-100" />

        {/* Banner upload */}
        <Field label="Job banner">
          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-gray-300 px-4 py-3 text-sm text-gray-500 transition-colors hover:border-indigo-300 hover:bg-indigo-50/40">
            {bannerPreview ? (
              <img src={bannerPreview} alt="" className="h-10 w-16 rounded object-cover" />
            ) : (
              <div className="flex h-10 w-16 items-center justify-center rounded bg-gray-100">
                <Upload className="h-4 w-4 text-gray-400" />
              </div>
            )}
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700">
                {banner ? banner.name : "Upload an image"}
              </p>
              <p className="text-xs text-gray-400">PNG or JPG, up to 5MB</p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleBanner(e.target.files?.[0] ?? null)}
              className="hidden"
            />
          </label>
        </Field>
      </div>

      {/* Sticky footer */}
      <div className="flex items-center justify-between gap-4 border-t border-gray-100 bg-gray-50 px-6 py-4">
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(e) => update("is_active", e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-400"
          />
          Publish immediately
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
        >
          {submitting ? "Posting..." : "Post job"}
        </button>
      </div>
    </form>
  );
}