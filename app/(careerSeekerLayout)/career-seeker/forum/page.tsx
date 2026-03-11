"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { Heart, MessageCircle } from "lucide-react";
import Image from "next/image";

import forumImage01 from "@/public/images/forum/engineering.jpg";
import forumImage02 from "@/public/images/forum/constraction.jpg";
import forumImage03 from "@/public/images/forum/Safety.webp";
import forumImage04 from "@/public/images/forum/equipment.jpg";

type StatusType =
  | "Engineering"
  | "Construction"
  | "Safety"
  | "Equipment"
  | "General";

const FILTERS = [
  "All",
  "Engineering",
  "Construction",
  "Safety",
  "Equipment",
  "General",
];

const filterMatch = (status: StatusType, filter: string) => {
  if (filter === "All") return true;
  if (filter === "Engineering") return status === "Engineering";
  if (filter === "Construction") return status === "Construction";
  if (filter === "Safety") return status === "Safety";
  if (filter === "Equipment") return status === "Equipment";
  if (filter === "General") return status === "General";
  return true;
};

const posts = [
  {
    id: 1,
    name: "Smart Kool",
    role: "Civil Engineer",
    status: "Engineering" as StatusType,
    title: "Building Solutions with Smart Engineering",
    description:
      "Innovative approaches to modern construction challenges require a blend of traditional engineering principles.",
    image: forumImage01,
    likes: 24,
    comments: 8,
  },
  {
    id: 2,
    name: "David Smith",
    role: "Site Manager",
    status: "Construction" as StatusType,
    title: "Modern Construction Techniques",
    description:
      "Using advanced technology to improve construction speed and reduce costs.",
    image: forumImage02,
    likes: 18,
    comments: 4,
  },
  {
    id: 3,
    name: "Robert Lee",
    role: "Safety Officer",
    status: "Safety" as StatusType,
    title: "Workplace Safety Best Practices",
    description:
      "Ensuring safety on construction sites with modern safety protocols.",
    image: forumImage03,
    likes: 31,
    comments: 12,
  },
  {
    id: 4,
    name: "Mark Johnson",
    role: "Equipment Specialist",
    status: "Equipment" as StatusType,
    title: "Heavy Equipment Innovations",
    description:
      "Latest innovations in construction equipment improving productivity.",
    image: forumImage04,
    likes: 14,
    comments: 3,
  },
];

export default function JobForum() {
  const [filter, setFilter] = useState("All");

  const filteredPosts = posts.filter((post) =>
    filterMatch(post.status, filter)
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6fb",
        fontFamily: "'DM Sans','Segoe UI',sans-serif",
      }}
    >
      <div style={{ margin: "0 auto", padding: "26px 28px" }}>
        {/* Header */}
        <div className="flex justify-between">
          <div style={{ marginBottom: 28 }}>
            <h1
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: "#111827",
                marginBottom: 4,
              }}
            >
              Forum
            </h1>
            <p style={{ fontSize: 14, color: "#6b7280" }}>
              Connect with industry professionals
            </p>
          </div>

          <div>
            <Button className="cursor-pointer bg-[#2563EB] px-6 py-5 shadow-lg transition-transform duration-300 hover:scale-110">
              <LuPlus /> Create Post
            </Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 24,
            flexWrap: "wrap",
          }}
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "9px 20px",
                borderRadius: 99,
                fontSize: 13,
                fontWeight: 600,
                border:
                  filter === f ? "1px solid #4f63e7" : "1px solid #e5e7eb",
                background: filter === f ? "#4f63e7" : "#fff",
                color: filter === f ? "#fff" : "#374151",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl border shadow-sm hover:shadow-md transition"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-4">
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                    SK
                  </div>

                  <div>
                    <p className="font-inter text-sm font-semibold">{post.name}</p>
                    <p className="font-inter text-xs text-gray-500">{post.role}</p>
                  </div>
                </div>

                <span className="font-inter text-xs font-medium bg-gray-200 px-3 py-1.5 rounded-full">
                  {post.status}
                </span>
              </div>

              {/* Content */}
              <div className="px-4 pb-4">
                <h3 className="font-semibold text-lg mb-2">{post.title}</h3>

                <p className="text-sm text-gray-600 mb-4">
                  {post.description}
                </p>

                <div className="rounded-lg overflow-hidden">
                  <Image
                    src={post.image}
                    alt="forum"
                    className="w-full h-55 object-cover"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex gap-6 px-4 py-3 border-t text-gray-500 text-sm">
                <div className="flex items-center gap-2">
                  <Heart size={16} />
                  {post.likes}
                </div>

                <div className="flex items-center gap-2">
                  <MessageCircle size={16} />
                  {post.comments}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}