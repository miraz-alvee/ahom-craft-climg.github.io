"use client";
import { useState } from "react";
import { HiUsers, HiStar, HiPencil, HiEye, HiTrash } from "react-icons/hi2";

const courseImage = "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80";

const initialCourses = [
  { id: 1, title: "Construction Work & Safety", price: 49, students: 124, rating: 4.8, updated: "2 days ago", status: "Active", image: courseImage },
  { id: 2, title: "Construction Work & Safety", price: 49, students: 124, rating: 4.8, updated: "2 days ago", status: "Draft", image: courseImage },
  { id: 3, title: "Construction Work & Safety", price: 49, students: 124, rating: 4.8, updated: "2 days ago", status: "Active", image: courseImage },
];

export default function MyCourses() {
  const [courses, setCourses] = useState(initialCourses);

  const handleDelete = (id) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  return (
    <div style={{ background: "#f3f4f6", minHeight: "100vh", padding: "32px 40px", fontFamily: "system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "20px", fontWeight: 700, color: "#111827" }}>My Courses</h1>
          <p style={{ margin: "4px 0 0", fontSize: "14px", color: "#6b7280" }}>Manage your content and students</p>
        </div>
        <button
          style={{
            background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px",
            padding: "10px 20px", fontSize: "14px", fontWeight: 600, cursor: "pointer",
          }}
        >
          Create New Course
        </button>
      </div>

      {/* Course Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
        {courses.map((course) => (
          <div
            key={course.id}
            style={{
              background: "#fff", borderRadius: "12px", overflow: "hidden",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)", border: "1px solid #e5e7eb",
            }}
          >
            {/* Image */}
            <div style={{ position: "relative" }}>
              <img src={course.image} alt={course.title} style={{ width: "100%", height: "160px", objectFit: "cover", display: "block" }} />
              <span
                style={{
                  position: "absolute", top: "10px", left: "10px",
                  background: course.status === "Active" ? "#d1fae5" : "#f3f4f6",
                  color: course.status === "Active" ? "#065f46" : "#374151",
                  fontSize: "12px", fontWeight: 600, padding: "3px 10px",
                  borderRadius: "20px", border: `1px solid ${course.status === "Active" ? "#6ee7b7" : "#d1d5db"}`,
                }}
              >
                {course.status}
              </span>
            </div>

            {/* Body */}
            <div style={{ padding: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "15px", fontWeight: 700, color: "#111827" }}>{course.title}</span>
                <span style={{ fontSize: "15px", fontWeight: 700, color: "#2563eb" }}>${course.price}</span>
              </div>

              <div style={{ display: "flex", gap: "6px", alignItems: "center", fontSize: "13px", color: "#6b7280", marginBottom: "16px" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><HiUsers /> {course.students} Students</span>
                <span>•</span>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><HiStar /> {course.rating} Rating</span>
                <span>•</span>
                <span>Last updated {course.updated}</span>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: "8px" }}>
                <button style={{
                  flex: 1, padding: "8px", border: "1px solid #d1d5db", borderRadius: "6px",
                  background: "#fff", color: "#374151", fontSize: "13px", fontWeight: 500,
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                }}>
                  <HiPencil /> Edit
                </button>
                <button style={{
                  flex: 1, padding: "8px", border: "1px solid #d1d5db", borderRadius: "6px",
                  background: "#fff", color: "#374151", fontSize: "13px", fontWeight: 500,
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                }}>
                  <HiEye /> Preview
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  style={{
                    padding: "8px 12px", border: "none", borderRadius: "6px",
                    background: "#ef4444", color: "#fff", fontSize: "14px",
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <HiTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}