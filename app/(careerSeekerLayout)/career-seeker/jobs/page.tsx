"use client";

import { useState, useMemo } from "react";

const JOBS = [
  { id: 1, title: "Software Engineer", company: "Google", initial: "G", color: "#4f63e7", location: "Remote", ago: "2 days ago", type: "Remote", min: 120, max: 160, experience: "Senior" },
  { id: 2, title: "Product Manager", company: "Meta", initial: "M", color: "#e8457a", location: "New York, NY", ago: "1 day ago", type: "Full-time", min: 130, max: 170, experience: "Mid Level" },
  { id: 3, title: "UX Designer", company: "Apple", initial: "A", color: "#1a1a2e", location: "San Francisco, CA", ago: "3 hours ago", type: "Full-time", min: 110, max: 150, experience: "Senior" },
  { id: 4, title: "Data Scientist", company: "Netflix", initial: "N", color: "#e50914", location: "Remote", ago: "5 hours ago", type: "Remote", min: 140, max: 190, experience: "Lead" },
  { id: 5, title: "Backend Engineer", company: "Stripe", initial: "S", color: "#635bff", location: "Austin, TX", ago: "1 day ago", type: "Full-time", min: 125, max: 165, experience: "Senior" },
  { id: 6, title: "Frontend Developer", company: "Airbnb", initial: "A", color: "#ff5a5f", location: "Remote", ago: "2 days ago", type: "Remote", min: 100, max: 140, experience: "Mid Level" },
  { id: 7, title: "DevOps Engineer", company: "AWS", initial: "A", color: "#ff9900", location: "Seattle, WA", ago: "4 hours ago", type: "Full-time", min: 130, max: 175, experience: "Senior" },
  { id: 8, title: "Product Designer", company: "Figma", initial: "F", color: "#0acf83", location: "San Francisco, CA", ago: "6 hours ago", type: "Full-time", min: 115, max: 155, experience: "Mid Level" },
  { id: 9, title: "ML Engineer", company: "OpenAI", initial: "O", color: "#10a37f", location: "Remote", ago: "1 day ago", type: "Remote", min: 160, max: 220, experience: "Lead" },
  { id: 10, title: "Marketing Intern", company: "Spotify", initial: "S", color: "#1db954", location: "New York, NY", ago: "3 days ago", type: "Internship", min: 25, max: 35, experience: "Entry Level" },
  { id: 11, title: "Technical Writer", company: "Medium", initial: "M", color: "#292929", location: "Remote", ago: "2 days ago", type: "Part-time", min: 40, max: 65, experience: "Mid Level" },
  { id: 12, title: "iOS Developer", company: "Twitter", initial: "T", color: "#1da1f2", location: "San Francisco, CA", ago: "5 days ago", type: "Full-time", min: 120, max: 160, experience: "Senior" },
  { id: 13, title: "Cloud Architect", company: "Microsoft", initial: "M", color: "#00a4ef", location: "Seattle, WA", ago: "1 day ago", type: "Full-time", min: 170, max: 210, experience: "Executive" },
  { id: 14, title: "Security Engineer", company: "Cloudflare", initial: "C", color: "#f38020", location: "Austin, TX", ago: "2 days ago", type: "Full-time", min: 140, max: 180, experience: "Senior" },
  { id: 15, title: "Data Engineer", company: "Snowflake", initial: "S", color: "#29b5e8", location: "Remote", ago: "3 hours ago", type: "Remote", min: 130, max: 170, experience: "Mid Level" },
  { id: 16, title: "Engineering Manager", company: "Uber", initial: "U", color: "#000000", location: "New York, NY", ago: "4 days ago", type: "Full-time", min: 180, max: 230, experience: "Lead" },
  { id: 17, title: "QA Engineer", company: "Atlassian", initial: "A", color: "#0052cc", location: "Remote", ago: "1 day ago", type: "Part-time", min: 80, max: 110, experience: "Mid Level" },
  { id: 18, title: "Product Analyst", company: "LinkedIn", initial: "L", color: "#0077b5", location: "Los Angeles, CA", ago: "6 hours ago", type: "Contract", min: 90, max: 130, experience: "Entry Level" },
];

const JOB_TYPES = ["Full-time", "Part-time", "Remote", "Internship", "Contract"];
const EXPERIENCE_LEVELS = ["Entry Level", "Mid Level", "Senior", "Lead", "Executive"];
const LOCATIONS = ["Remote", "New York, NY", "San Francisco, CA", "Seattle, WA", "Austin, TX", "Los Angeles, CA"];
const SORT_OPTIONS = ["Most Recent", "Salary: High to Low", "Salary: Low to High", "Company A-Z"];

const typeStyle = {
  Remote: { bg: "#ecfdf5", color: "#15803d", border: "#bbf7d0" },
  "Full-time": { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
  "Part-time": { bg: "#fefce8", color: "#a16207", border: "#fde68a" },
  Internship: { bg: "#f5f3ff", color: "#6d28d9", border: "#ddd6fe" },
  Contract: { bg: "#fff7ed", color: "#c2410c", border: "#fed7aa" },
};

function Checkbox({ checked, onChange, label }:any) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 13.5, color: checked ? "#111827" : "#4b5563", fontWeight: checked ? 600 : 400, userSelect: "none" }}>
      <div onClick={onChange} style={{
        width: 17, height: 17, borderRadius: 5, border: checked ? "2px solid #4f63e7" : "2px solid #d1d5db",
        background: checked ? "#4f63e7" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s"
      }}>
        {checked && <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      </div>
      {label}
    </label>
  );
}

function JobCard({ job, bookmarked, onBookmark }: { job: typeof JOBS[0]; bookmarked: boolean; onBookmark: (id: number) => void }) {
  const ts = typeStyle[job.type as keyof typeof typeStyle] || typeStyle["Full-time"];
  const salary = job.min < 100 ? `$${job.min}–$${job.max}/hr` : `$${job.min}k – $${job.max}k`;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff", borderRadius: 16, border: `1px solid ${hovered ? "#c7d0f8" : "#e8eaf0"}`,
        padding: "20px 20px 18px", display: "flex", flexDirection: "column", gap: 14,
        boxShadow: hovered ? "0 6px 20px rgba(79,99,231,0.1)" : "0 1px 3px rgba(0,0,0,0.04)",
        cursor: "pointer", transition: "all 0.2s", transform: hovered ? "translateY(-2px)" : "none"
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 46, height: 46, borderRadius: 13, background: job.color, color: "#fff", fontWeight: 800, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            {job.initial}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14.5, color: "#111827" }}>{job.title}</div>
            <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}>
              <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
              {job.company}
            </div>
          </div>
        </div>
        <button onClick={e => { e.stopPropagation(); onBookmark(job.id); }}
          style={{ background: bookmarked ? "#eff2ff" : "transparent", border: "none", cursor: "pointer", padding: 6, borderRadius: 8, color: bookmarked ? "#4f63e7" : "#d1d5db", transition: "all 0.15s", flexShrink: 0 }}>
          <svg width="16" height="16" fill={bookmarked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
          </svg>
        </button>
      </div>

      <div style={{ display: "flex", gap: 16, fontSize: 12.5, color: "#6b7280" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
          {job.location}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
          {job.ago}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11.5, fontWeight: 600, background: ts.bg, color: ts.color, border: `1px solid ${ts.border}`, padding: "3px 10px", borderRadius: 99 }}>{job.type}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>{salary}</span>
        </div>
        <button style={{ background: "#4f63e7", color: "#fff", border: "none", borderRadius: 10, padding: "8px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "background 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.background = "#3b50d6"}
          onMouseLeave={e => e.currentTarget.style.background = "#4f63e7"}>
          Apply Now
        </button>
      </div>
    </div>
  );
}

export default function DiscoverJobs() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Most Recent");
  const [jobTypes, setJobTypes] = useState(new Set());
  const [expLevels, setExpLevels] = useState(new Set());
  const [locations, setLocations] = useState(new Set());
  const [salaryRange, setSalaryRange] = useState(200);
  const [bookmarks, setBookmarks] = useState(new Set());

  const toggle = (setFn:any, val:any) => {
    setFn((prev:any) => { const n = new Set(prev); n.has(val) ? n.delete(val) : n.add(val); return n; });
  };

  const toggleBookmark = (id:any) => {
    setBookmarks(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const clearAll = () => {
    setJobTypes(new Set()); setExpLevels(new Set()); setLocations(new Set()); setSalaryRange(200); setSearch("");
  };

  const filtered = useMemo(() => {
    let result = JOBS.filter(j => {
      const bySearch = !search || j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase());
      const byType = jobTypes.size === 0 || jobTypes.has(j.type);
      const byExp = expLevels.size === 0 || expLevels.has(j.experience);
      const byLoc = locations.size === 0 || locations.has(j.location);
      const bySalary = j.min <= salaryRange;
      return bySearch && byType && byExp && byLoc && bySalary;
    });
    if (sort === "Most Recent") result = result.sort((a, b) => a.id - b.id);
    if (sort === "Salary: High to Low") result = result.sort((a, b) => b.max - a.max);
    if (sort === "Salary: Low to High") result = result.sort((a, b) => a.min - b.min);
    if (sort === "Company A-Z") result = result.sort((a, b) => a.company.localeCompare(b.company));
    return result;
  }, [search, jobTypes, expLevels, locations, salaryRange, sort]);

  const activeFilters = jobTypes.size + expLevels.size + locations.size + (salaryRange < 200 ? 1 : 0);

  return (
    <div style={{ minHeight: "100vh", background: "#f4f6fb", fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>
      

      <div style={{margin: "0 auto", padding: "32px 24px" }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111827", marginBottom: 4 }}>Discover Jobs</h1>
          <p style={{ fontSize: 14, color: "#6b7280" }}>Find the perfect opportunity for your career</p>
        </div>

        {/* Search + Sort */}
        <div style={{ display: "flex", gap: 12, marginBottom: 24, alignItems: "center" }}>
          <div style={{ flex: 1, position: "relative" }}>
            <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by title, company, or keywords..."
              style={{ width: "100%", paddingLeft: 42, paddingRight: 16, paddingTop: 12, paddingBottom: 12, borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 14, color: "#111827", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", outline: "none" }}
              onFocus={e => e.target.style.borderColor = "#4f63e7"}
              onBlur={e => e.target.style.borderColor = "#e5e7eb"}
            />
          </div>
          <div style={{ position: "relative", flexShrink: 0}}>
            <select value={sort} onChange={e => setSort(e.target.value)}
              style={{ padding: "12px 40px 12px 16px", borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 14, fontWeight: 600, color: "#374151", background: "#fff", cursor: "pointer", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", outline: "none" }}>
              {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>

        <div className="layout" style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
          {/* Sidebar */}
          <div className="sidebar" style={{ width: 230, flexShrink: 0, background: "#fff", borderRadius: 18, border: "1px solid #e8eaf0", padding: "22px 20px", position: "sticky", top: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <span style={{ fontWeight: 750, fontSize: 15, color: "#111827" }}>Filters</span>
              {activeFilters > 0 && (
                <button onClick={clearAll} style={{ fontSize: 12, color: "#4f63e7", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>
                  Clear all ({activeFilters})
                </button>
              )}
            </div>

            {/* Job Type */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>Job Type</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {JOB_TYPES.map(t => (
                  <Checkbox key={t} label={t} checked={jobTypes.has(t)} onChange={() => toggle(setJobTypes, t)} />
                ))}
              </div>
            </div>

            <div style={{ height: 1, background: "#f3f4f6", marginBottom: 22 }} />

            {/* Salary */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.05em" }}>Salary Range</div>
              <input
                type="range" min={50} max={200} value={salaryRange}
                // style={{ "--val": `${((salaryRange - 50) / 150) * 100}%` }}
                onChange={e => setSalaryRange(Number(e.target.value))}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6b7280", marginTop: 8 }}>
                <span>$50k</span>
                <span style={{ color: "#4f63e7", fontWeight: 600 }}>${salaryRange}k{salaryRange === 200 ? "+" : ""}</span>
                <span>$200k+</span>
              </div>
            </div>

            <div style={{ height: 1, background: "#f3f4f6", marginBottom: 22 }} />

            {/* Experience */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>Experience Level</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {EXPERIENCE_LEVELS.map(e => (
                  <Checkbox key={e} label={e} checked={expLevels.has(e)} onChange={() => toggle(setExpLevels, e)} />
                ))}
              </div>
            </div>

            <div style={{ height: 1, background: "#f3f4f6", marginBottom: 22 }} />

            {/* Location */}
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>Location</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {LOCATIONS.map(l => (
                  <Checkbox key={l} label={l} checked={locations.has(l)} onChange={() => toggle(setLocations, l)} />
                ))}
              </div>
            </div>
          </div>

          {/* Main grid */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 18 }}>
              Showing <strong style={{ color: "#111827" }}>{filtered.length}</strong> job{filtered.length !== 1 ? "s" : ""}
              {activeFilters > 0 && <span style={{ color: "#4f63e7", marginLeft: 6 }}>• {activeFilters} filter{activeFilters > 1 ? "s" : ""} active</span>}
            </div>

            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 20px", background: "#fff", borderRadius: 18, border: "1px solid #e8eaf0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                <div style={{ fontWeight: 700, fontSize: 16, color: "#374151", marginBottom: 8 }}>No jobs match your filters</div>
                <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 20 }}>Try adjusting your search or clearing some filters</div>
                <button onClick={clearAll} style={{ background: "#4f63e7", color: "#fff", border: "none", borderRadius: 10, padding: "10px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                  Clear all filters
                </button>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 16 }}>
                {filtered.map(j => (
                  <JobCard key={j.id} job={j} bookmarked={bookmarks.has(j.id)} onBookmark={toggleBookmark} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
