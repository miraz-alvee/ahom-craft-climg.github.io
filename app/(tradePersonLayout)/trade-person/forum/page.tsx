"use client";
import { useState } from "react";

const posts = [
  {
    id: 1,
    author: "Smart Kool",
    initials: "SK",
    role: "Civil Engineer",
    time: "2 hours ago",
    category: "Engineering",
    title: "Building Solutions with Smart Engineering",
    excerpt:
      "Innovative approaches to modern construction challenges require a blend of traditional engineering principles and cutting-edge technology. Here are some key insights from our recent project...",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    likes: 24,
    comments: 8,
    color: "#2563eb",
  },
  {
    id: 2,
    author: "Jean Paul",
    initials: "JP",
    role: "Project Manager",
    time: "5 hours ago",
    category: "Construction",
    title: "Infrastructure Development Tips",
    excerpt:
      "Key considerations for large-scale infrastructure projects include proper planning, stakeholder management, and risk assessment. Let me share what I've learned over 15 years in the industry...",
    image: null,
    likes: 18,
    comments: 5,
    color: "#0891b2",
  },
  {
    id: 3,
    author: "Sasi Fonseka",
    initials: "SF",
    role: "Safety Officer",
    time: "1 day ago",
    category: "Safety",
    title: "Safety Guidelines Update 2024",
    excerpt:
      "New safety protocols for construction sites have been released. All employers must ensure compliance with the updated regulations. Key changes include enhanced PPE requirements and new emergency procedures...",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    likes: 42,
    comments: 12,
    color: "#16a34a",
  },
];

const tabs = ["All", "Engineering", "Construction", "Safety", "Equipment", "General"];

const categoryColors: Record<string, string> = {
  Engineering: "#dbeafe",
  Construction: "#cffafe",
  Safety: "#dcfce7",
  Equipment: "#fef9c3",
  General: "#f3e8ff",
};

const categoryTextColors: Record<string, string> = {
  Engineering: "#1d4ed8",
  Construction: "#0e7490",
  Safety: "#15803d",
  Equipment: "#a16207",
  General: "#7e22ce",
};

function HeartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export default function Forum() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered =
    activeTab === "All"
      ? posts
      : posts.filter((p) => p.category === activeTab);

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Header */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #e5e7eb",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#111827" }}>Forum</h1>
          <p style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>Connect with industry professionals</p>
        </div>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "8px 16px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <PlusIcon /> Create Post
        </button>
      </div>

      <div style={{ maxWidth: "820px", margin: "0 auto", padding: "24px 16px" }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "6px 16px",
                borderRadius: "20px",
                border: activeTab === tab ? "none" : "1px solid #d1d5db",
                background: activeTab === tab ? "#2563eb" : "#fff",
                color: activeTab === tab ? "#fff" : "#374151",
                fontSize: "14px",
                fontWeight: activeTab === tab ? 600 : 400,
                cursor: "pointer",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Posts */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {filtered.map((post) => (
            <div
              key={post.id}
              style={{
                background: "#fff",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                overflow: "hidden",
              }}
            >
              <div style={{ padding: "16px 20px" }}>
                {/* Author row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "12px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "50%",
                        background: post.color,
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "13px",
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {post.initials}
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>
                          {post.author}
                        </span>
                        <span style={{ fontSize: "12px", color: "#9ca3af" }}>· {post.time}</span>
                      </div>
                      <div style={{ fontSize: "12px", color: "#6b7280" }}>{post.role}</div>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 500,
                      padding: "3px 10px",
                      borderRadius: "20px",
                      background: categoryColors[post.category] || "#f3f4f6",
                      color: categoryTextColors[post.category] || "#374151",
                    }}
                  >
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <h2 style={{ margin: "0 0 6px", fontSize: "16px", fontWeight: 700, color: "#111827" }}>
                  {post.title}
                </h2>
                <p style={{ margin: "0 0 12px", fontSize: "14px", color: "#4b5563", lineHeight: "1.5" }}>
                  {post.excerpt}
                </p>
              </div>

              {/* Image */}
              {post.image && (
                <div style={{ paddingBottom: "0" }}>
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{ width: "100%", height: "200px", objectFit: "cover", display: "block" }}
                  />
                </div>
              )}

              {/* Actions */}
              <div style={{ padding: "12px 20px", display: "flex", gap: "20px" }}>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "none",
                    border: "none",
                    color: "#6b7280",
                    fontSize: "14px",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  <HeartIcon /> {post.likes}
                </button>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "none",
                    border: "none",
                    color: "#6b7280",
                    fontSize: "14px",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  <CommentIcon /> {post.comments}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}