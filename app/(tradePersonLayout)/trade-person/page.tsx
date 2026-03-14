"use client";
import { useState } from "react";

const courses = [
  {
    id: 1,
    title: "Construction Work",
    students: 12,
    status: "Active",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80",
  },
  {
    id: 2,
    title: "Construction Work",
    students: 8,
    status: "Draft",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80",
  },
  {
    id: 3,
    title: "Construction Work",
    students: 24,
    status: "Active",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80",
  },
  {
    id: 4,
    title: "Construction Work",
    students: 5,
    status: "Active",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80",
  },
];

const statusColors: Record<string, string> = {
  Active: "#22c55e",
  Draft: "#6b7280",
};

export default function tradePersonDashboard() {
  const [menuOpen, setMenuOpen] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#f5f6fa", minHeight: "100vh", padding: "0" }}>
      {/* Welcome Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a3ed4 0%, #2d55f5 60%, #3b6ef8 100%)",
          borderRadius: "16px",
          margin: "20px",
          padding: "36px 40px",
          position: "relative",
          overflow: "hidden",
          color: "#fff",
        }}
      >
        {/* Decorative circle */}
        <div
          style={{
            position: "absolute",
            right: 40,
            top: "50%",
            transform: "translateY(-50%)",
            width: 120,
            height: 120,
            borderRadius: "50%",
            border: "2px solid rgba(255,255,255,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0.5,
          }}
        >
          <div style={{ width: 70, height: 70, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.25)" }} />
        </div>
        <h2 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: 0.2 }}>
          Welcome back, Moni! 👋
        </h2>
        <p style={{ margin: "10px 0 20px", fontSize: 14, opacity: 0.88, maxWidth: 340 }}>
          You have 3 new student inquiries and 2 pending course reviews. Keep up the great work!
        </p>
        <button
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "1.5px solid rgba(255,255,255,0.55)",
            color: "#fff",
            borderRadius: "8px",
            padding: "9px 22px",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            backdropFilter: "blur(4px)",
          }}
        >
          View Notifications
        </button>
      </div>

      {/* Stats Row */}
      <div style={{ display: "flex", gap: 20, margin: "0 20px 28px" }}>
        {/* Courses */}
        <div style={cardStyle}>
          <div style={{ ...iconBox, background: "#ede9fe" }}>
            <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
              <rect x="3" y="5" width="18" height="14" rx="3" stroke="#7c3aed" strokeWidth="1.8"/>
              <circle cx="8" cy="12" r="2" fill="#7c3aed"/>
              <path d="M13 10h5M13 14h3" stroke="#7c3aed" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </div>
          <span style={statLabel}>Courses</span>
          <span style={statValue}>3</span>
        </div>

        {/* Total Students */}
        <div style={cardStyle}>
          <div style={{ ...iconBox, background: "#fff3e0" }}>
            <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
              <circle cx="9" cy="8" r="3" stroke="#f59e0b" strokeWidth="1.8"/>
              <circle cx="16" cy="9" r="2" stroke="#f59e0b" strokeWidth="1.6"/>
              <path d="M3 20c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M16 15c2 0 4 1 4 4" stroke="#f59e0b" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </div>
          <span style={statLabel}>Total Students</span>
          <span style={statValue}>34</span>
        </div>

        {/* Total Earning */}
        <div style={cardStyle}>
          <div style={{ ...iconBox, background: "#e0f2fe" }}>
            <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
              <rect x="3" y="5" width="18" height="14" rx="3" stroke="#0ea5e9" strokeWidth="1.8"/>
              <path d="M3 9h18" stroke="#0ea5e9" strokeWidth="1.6"/>
              <path d="M7 14h4M15 14h2" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span style={statLabel}>Total Earning</span>
          <span style={statValue}>$114</span>
        </div>
      </div>

      {/* Recent Courses */}
      <div style={{ margin: "0 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontWeight: 700, fontSize: 17, color: "#111" }}>Recent Courses</span>
          <a href="#" style={{ color: "#2d55f5", fontSize: 13, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
            View All <span style={{ fontSize: 16 }}>→</span>
          </a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {courses.map((course) => (
            <div key={course.id} style={courseCard}>
              {/* Image */}
              <div style={{ position: "relative" }}>
                <img
                  src={course.image}
                  alt={course.title}
                  style={{ width: "100%", height: 130, objectFit: "cover", borderRadius: "10px 10px 0 0", display: "block" }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    background: course.status === "Active" ? "#d1fae5" : "#f3f4f6",
                    color: statusColors[course.status],
                    borderRadius: 20,
                    padding: "3px 12px",
                    fontSize: 12,
                    fontWeight: 700,
                    border: `1px solid ${course.status === "Active" ? "#bbf7d0" : "#e5e7eb"}`,
                  }}
                >
                  {course.status}
                </span>
              </div>

              {/* Card Body */}
              <div style={{ padding: "12px 14px 14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{course.title}</span>
                  <button
                    onClick={() => setMenuOpen(menuOpen === course.id ? null : course.id)}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: 18, lineHeight: 1, padding: "0 2px" }}
                  >
                    ···
                  </button>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                  <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
                    <circle cx="9" cy="7" r="3" stroke="#9ca3af" strokeWidth="1.7"/>
                    <circle cx="16" cy="8" r="2" stroke="#9ca3af" strokeWidth="1.5"/>
                    <path d="M2 20c0-3 2.5-5 7-5s7 2 7 5" stroke="#9ca3af" strokeWidth="1.7" strokeLinecap="round"/>
                    <path d="M16 14c2.5 0 5 1 5 4" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span style={{ fontSize: 12, color: "#9ca3af" }}>{course.students} Students</span>
                </div>
                <button
                  style={{
                    width: "100%",
                    padding: "9px 0",
                    background: "#fff",
                    border: "1.5px solid #2d55f5",
                    borderRadius: 8,
                    color: "#2d55f5",
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: "pointer",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#eef2ff")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
                >
                  Manage Course
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: 14,
  padding: "24px 28px",
  flex: 1,
  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  display: "flex",
  flexDirection: "column",
  gap: 6,
};

const iconBox: React.CSSProperties = {
  width: 50,
  height: 50,
  borderRadius: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 10,
};

const statLabel: React.CSSProperties = {
  fontSize: 13,
  color: "#9ca3af",
  fontWeight: 500,
};

const statValue: React.CSSProperties = {
  fontSize: 28,
  fontWeight: 800,
  color: "#111",
  letterSpacing: -0.5,
};

const courseCard: React.CSSProperties = {
  background: "#fff",
  borderRadius: 12,
  boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
  overflow: "hidden",
};