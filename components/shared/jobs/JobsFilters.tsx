"use client";

import { EmployeeType, JobType } from "@/redux/features/jobs/types";

const EMPLOYEE_TYPES: { label: string; value: EmployeeType }[] = [
  { label: "Full-time", value: "full_time" },
  { label: "Part-time", value: "part_time" },
  { label: "Contract", value: "contract" },
  { label: "Internship", value: "internship" },
];

const JOB_TYPES: { label: string; value: JobType }[] = [
  { label: "Remote", value: "remote" },
  { label: "Onsite", value: "onsite" },
  { label: "Hybrid", value: "hybrid" },
];

interface Props {
  employeeType: EmployeeType | undefined;
  jobType: JobType | undefined;
  onEmployeeTypeChange: (v: EmployeeType | undefined) => void;
  onJobTypeChange: (v: JobType | undefined) => void;
}

export default function JobsFilters({
  employeeType,
  jobType,
  onEmployeeTypeChange,
  onJobTypeChange,
}: Props) {
  return (
    <aside className="w-full space-y-6 rounded-xl border border-gray-200 bg-white p-5 lg:w-64">
      <h2 className="font-semibold text-gray-900">Filters</h2>

      <div>
        <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500">
          Employee Type
        </h3>
        <div className="space-y-2">
          {EMPLOYEE_TYPES.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={employeeType === opt.value}
                onChange={() => onEmployeeTypeChange(employeeType === opt.value ? undefined : opt.value)}
                className="h-4 w-4 rounded border-white text-indigo-600"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500">Job Type</h3>
        <div className="space-y-2">
          {JOB_TYPES.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={jobType === opt.value}
                onChange={() => onJobTypeChange(jobType === opt.value ? undefined : opt.value)}
                className="h-4 w-4 rounded border-white text-indigo-600"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}