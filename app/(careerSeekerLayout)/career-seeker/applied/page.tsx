"use client"

import { useState, useMemo } from "react";

type StatusType = "Interview Scheduled" | "Under Review" | "Offer Received" | "Rejected";

type Application = {
  id: number;
  title: string;
  company: string;
  initial: string;
  color: string;
  location: string;
  appliedDate: string;
  status: StatusType;
};

const APPLICATIONS: Application[] = [
  { id: 1, title: "Software Engineer", company: "Google", initial: "G", color: "#4f63e7", location: "Remote", appliedDate: "Feb 15, 2026", status: "Interview Scheduled" },
  { id: 2, title: "Product Manager", company: "Meta", initial: "M", color: "#e8457a", location: "New York, NY", appliedDate: "Feb 12, 2026", status: "Under Review" },
  { id: 3, title: "UX Designer", company: "Apple", initial: "A", color: "#10a37f", location: "Cupertino, CA", appliedDate: "Feb 10, 2026", status: "Offer Received" },
  { id: 4, title: "Data Scientist", company: "Netflix", initial: "N", color: "#e50914", location: "Remote", appliedDate: "Feb 8, 2026", status: "Rejected" },
  { id: 5, title: "Frontend Developer", company: "Airbnb", initial: "A", color: "#ff5a5f", location: "San Francisco, CA", appliedDate: "Feb 5, 2026", status: "Under Review" },
  { id: 6, title: "Marketing Manager", company: "Spotify", initial: "S", color: "#1db954", location: "New York, NY", appliedDate: "Feb 3, 2026", status: "Interview Scheduled" },
];

const FILTERS = ["All Applications", "Under Review", "Interview", "Offers", "Rejected"];

const STATUS_CONFIG: Record<StatusType, { bg: string; color: string; border: string; icon: React.ReactElement }> = {
  "Interview Scheduled": { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe", icon: (
    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
  )},
  "Under Review": { bg: "#fefce8", color: "#a16207", border: "#fde68a", icon: (
    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
  )},
  "Offer Received": { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0", icon: (
    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
  )},
  "Rejected": { bg: "#fef2f2", color: "#dc2626", border: "#fecaca", icon: (
    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
  )},
};

const filterMatch = (status: StatusType, filter: string) => {
  if (filter === "All Applications") return true;
  if (filter === "Under Review") return status === "Under Review";
  if (filter === "Interview") return status === "Interview Scheduled";
  if (filter === "Offers") return status === "Offer Received";
  if (filter === "Rejected") return status === "Rejected";
  return true;
};

function StatCard({ icon, iconBg, value, label }:any) {
  return (
    <div style={{ flex: 1, minWidth: 140, background: "#fff", borderRadius: 16, border: "1px solid #e8eaf0", padding: "20px 22px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
      <div style={{ width: 40, height: 40, borderRadius: 11, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
        {icon}
      </div>
      <div style={{ fontSize: 26, fontWeight: 800, color: "#111827", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 13, color: "#6b7280", marginTop: 5 }}>{label}</div>
    </div>
  );
}

function DetailModal({ app, onClose, onStatusChange }: {app: Application | null; onClose: () => void; onStatusChange: (id: number, status: StatusType) => void}) {
  if (!app) return null;
  const cfg = STATUS_CONFIG[app.status];
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={onClose}>
      <div style={{ background: "#fff", borderRadius: 20, padding: 32, width: "100%", maxWidth: 480, boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: "#111827" }}>Application Details</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", padding: 4 }}>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
          <div style={{ width: 54, height: 54, borderRadius: 14, background: app.color, color: "#fff", fontWeight: 800, fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>{app.initial}</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 17, color: "#111827" }}>{app.title}</div>
            <div style={{ fontSize: 13, color: "#6b7280" }}>{app.company}</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
          {[["Location", app.location], ["Applied Date", app.appliedDate]].map(([k, v]) => (
            <div key={k} style={{ background: "#f9fafb", borderRadius: 12, padding: "12px 14px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{k}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>Update Status</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {Object.keys(STATUS_CONFIG).map(s => {
              const c = STATUS_CONFIG[s as StatusType];
              const active = app.status === s;
              return (
                <button key={s} onClick={() => onStatusChange(app.id, s as StatusType)}
                  style={{ padding: "7px 14px", borderRadius: 99, fontSize: 12, fontWeight: 600, cursor: "pointer", border: `1.5px solid ${active ? c.border : "#e5e7eb"}`, background: active ? c.bg : "#fff", color: active ? c.color : "#6b7280", transition: "all 0.15s" }}>
                  {s}
                </button>
              );
            })}
          </div>
        </div>
        <button onClick={onClose} style={{ width: "100%", background: "#4f63e7", color: "#fff", border: "none", borderRadius: 12, padding: "12px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Close</button>
      </div>
    </div>
  );
}

export default function MyApplications() {
  const [filter, setFilter] = useState("All Applications");
  const [apps, setApps] = useState<Application[]>(APPLICATIONS);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const updateStatus = (id: number, status: StatusType) => {
    setApps(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    setSelectedApp(prev => prev?.id === id ? { ...prev, status } : prev);
  };

  const filtered = useMemo(() => apps.filter(a => filterMatch(a.status, filter)), [apps, filter]);

  const stats = {
    total: apps.length,
    review: apps.filter(a => a.status === "Under Review").length,
    interview: apps.filter(a => a.status === "Interview Scheduled").length,
    offers: apps.filter(a => a.status === "Offer Received").length,
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f4f6fb", fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>

      <DetailModal app={selectedApp} onClose={() => setSelectedApp(null)} onStatusChange={updateStatus} />

      <div style={{ margin: "0 auto", padding: "36px 28px" }}>
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 4 }}>My Applications</h1>
          <p style={{ fontSize: 14, color: "#6b7280" }}>Track and manage your job applications</p>
        </div>

        {/* Stat Cards */}
        <div style={{ display: "flex", gap: 16, marginBottom: 30, flexWrap: "wrap" }}>
          <StatCard value={stats.total} label="Total Applied" iconBg="#f3f4f6" icon={
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#374151" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></svg>
          } />
          <StatCard value={stats.review} label="Under Review" iconBg="#fef9c3" icon={
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#ca8a04" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
          } />
          <StatCard value={stats.interview} label="Interviews" iconBg="#eff6ff" icon={
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#2563eb" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
          } />
          <StatCard value={stats.offers} label="Offers" iconBg="#f0fdf4" icon={
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#16a34a" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
          } />
        </div>

        {/* Filter Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding: "9px 20px", borderRadius: 99, fontSize: 13, fontWeight: 600, border: filter === f ? "1px solid #4f63e7" : "1px solid #e5e7eb", background: filter === f ? "#4f63e7" : "#fff", color: filter === f ? "#fff" : "#374151", cursor: "pointer", transition: "all 0.15s" }}>
              {f}
            </button>
          ))}
        </div>

        {/* Table */}
        <div style={{ background: "#fff", borderRadius: 18, border: "1px solid #e8eaf0", overflow: "hidden", boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}>
          {/* Table Header */}
          <div style={{ display: "grid", gridTemplateColumns: "2.5fr 1.2fr 1.2fr 1.4fr 80px", padding: "14px 24px", borderBottom: "1px solid #f3f4f6", background: "#fafafa" }}>
            {["Job", "Location", "Applied Date", "Status", "Action"].map(h => (
              <div key={h} style={{ fontSize: 12.5, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.04em" }}>{h}</div>
            ))}
          </div>

          {/* Rows */}
          {filtered.length === 0 ? (
            <div style={{ padding: "60px 24px", textAlign: "center", color: "#6b7280" }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>📋</div>
              <div style={{ fontWeight: 600, color: "#374151", marginBottom: 4 }}>No applications here</div>
              <div style={{ fontSize: 13 }}>Switch to "All Applications" to see everything</div>
            </div>
          ) : filtered.map((app, i) => {
            const cfg = STATUS_CONFIG[app.status];
            return (
              <div key={app.id}
                style={{ display: "grid", gridTemplateColumns: "2.5fr 1.2fr 1.2fr 1.4fr 80px", padding: "18px 24px", borderBottom: i < filtered.length - 1 ? "1px solid #f3f4f6" : "none", alignItems: "center", transition: "background 0.15s", cursor: "default" }}
                onMouseEnter={e => e.currentTarget.style.background = "#fafbff"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                {/* Job */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 11, background: app.color, color: "#fff", fontWeight: 800, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {app.initial}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>{app.title}</div>
                    <div style={{ fontSize: 12, color: "#6b7280", marginTop: 1 }}>{app.company}</div>
                  </div>
                </div>

                {/* Location */}
                <div style={{ fontSize: 14, color: "#374151" }}>{app.location}</div>

                {/* Date */}
                <div style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>{app.appliedDate}</div>

                {/* Status Badge */}
                <div>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12.5, fontWeight: 600, background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`, padding: "5px 12px", borderRadius: 99 }}>
                    {cfg.icon}
                    {app.status}
                  </span>
                </div>

                {/* Action */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button onClick={() => setSelectedApp(app)} title="View details"
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 6, borderRadius: 8, transition: "color 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#4f63e7"}
                    onMouseLeave={e => e.currentTarget.style.color = "#9ca3af"}>
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length > 0 && (
          <div style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "#9ca3af" }}>
            Showing {filtered.length} of {apps.length} application{apps.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>
    </div>
  );
}
