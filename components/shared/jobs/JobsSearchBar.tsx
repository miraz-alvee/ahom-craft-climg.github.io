"use client";

import { Search } from "lucide-react";
import { GetJobsParams } from "@/redux/features/jobs/types";

const SORT_OPTIONS: { label: string; value: string }[] = [
  { label: "Most Recent", value: "-created_at" },
  { label: "Oldest", value: "created_at" },
  { label: "Title (A-Z)", value: "title" },
];

interface Props {
  value: string;
  onChange: (value: string) => void;
  ordering: string;
  onOrderingChange: (value: string) => void;
}

export default function JobsSearchBar({ value, onChange, ordering, onOrderingChange }: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by title, company, or keywords..."
          className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-indigo-400"
        />
      </div>
      <select
        value={ordering}
        onChange={(e) => onOrderingChange(e.target.value)}
        className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-indigo-400"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}