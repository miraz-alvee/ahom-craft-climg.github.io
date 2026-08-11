"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Search,
  Plus,
  Heart,
  MessageCircle,
  MoreHorizontal,
  MapPin,
  Clock,
  Bot,
} from "lucide-react";

// ---------- Types ----------

interface FeedPost {
  id: string;
  author: string;
  location: string;
  avatarUrl: string;
  images: [string, string, string]; // top-left, bottom-left, right (tall)
  likedByAvatarUrl: string;
  likedByName: string;
  otherLikesCount: number;
  caption: string;
  date: string;
}

interface JobListing {
  id: string;
  title: string;
  company: string;
  companyInitial: string;
  companyColor: string;
  location: string;
  postedAgo: string;
  employmentType: string;
  salaryRange: string;
}

// ---------- Mock data (swap with real API data) ----------

const post: FeedPost = {
  id: "1",
  author: "joshua_l",
  location: "Tokyo, Japan",
  avatarUrl:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
  images: [
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop&sat=-100",
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=620&fit=crop",
  ],
  likedByAvatarUrl:
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces",
  likedByName: "craig_love",
  otherLikesCount: 44686,
  caption: "The game in Japan was amazing and I want to share some photos",
  date: "September 19",
};

const job: JobListing = {
  id: "1",
  title: "Product Manager",
  company: "Meta",
  companyInitial: "M",
  companyColor: "bg-pink-500",
  location: "New York, NY",
  postedAgo: "1 day ago",
  employmentType: "Full-time",
  salaryRange: "$130k - $170k",
};

// ---------- Sub-components ----------

function TopSearchBar() {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
      <div className="flex w-full max-w-md items-center gap-2 rounded-lg bg-gray-100 px-3 py-2">
        <Search className="h-4 w-4 shrink-0 text-gray-400" />
        <input
          type="text"
          placeholder="Search jobs, companies, or keywords..."
          className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
        />
      </div>
    </div>
  );
}

function CreatePostButton() {
  return (
    <button
      type="button"
      className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
    >
      <Plus className="h-4 w-4" />
      Create Post
    </button>
  );
}

function PostImageGrid({ images }: { images: FeedPost["images"] }) {
  const [topLeft, bottomLeft, right] = images;
  return (
    <div className="grid grid-cols-2 gap-1 overflow-hidden rounded-xl">
      <div className="grid grid-rows-2 gap-1">
        <div className="relative h-[124px] w-full">
          <Image src={topLeft} alt="" fill sizes="200px" className="object-cover" />
        </div>
        <div className="relative h-[124px] w-full">
          <Image
            src={bottomLeft}
            alt=""
            fill
            sizes="200px"
            className="object-cover grayscale"
          />
        </div>
      </div>
      <div className="relative h-[253px] w-full">
        <Image src={right} alt="" fill sizes="260px" className="object-cover" />
      </div>
    </div>
  );
}

function FeedPostCard({ data }: { data: FeedPost }) {
  return (
    <article className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative h-9 w-9 overflow-hidden rounded-full">
            <Image src={data.avatarUrl} alt={data.author} fill sizes="36px" className="object-cover" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{data.author}</p>
            <p className="text-xs text-gray-500">{data.location}</p>
          </div>
        </div>
        <button
          type="button"
          aria-label="Post options"
          className="text-gray-400 hover:text-gray-600"
        >
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {/* Images */}
      <PostImageGrid images={data.images} />

      {/* Actions */}
      <div className="mt-3 flex items-center gap-4">
        <button type="button" aria-label="Like" className="text-gray-700 hover:text-red-500">
          <Heart className="h-5 w-5" />
        </button>
        <button type="button" aria-label="Comment" className="text-gray-700 hover:text-gray-900">
          <MessageCircle className="h-5 w-5" />
        </button>
      </div>

      {/* Likes */}
      <div className="mt-2 flex items-center gap-1.5">
        <div className="relative h-4 w-4 overflow-hidden rounded-full">
          <Image src={data.likedByAvatarUrl} alt="" fill sizes="16px" className="object-cover" />
        </div>
        <p className="text-xs text-gray-600">
          Liked by <span className="font-semibold text-gray-900">{data.likedByName}</span> and{" "}
          <span className="font-semibold text-gray-900">
            {data.otherLikesCount.toLocaleString()} others
          </span>
        </p>
      </div>

      {/* Caption */}
      <p className="mt-1 text-sm text-gray-800">
        <span className="font-semibold">{data.author}</span> {data.caption}
      </p>

      {/* Date */}
      <p className="mt-2 text-xs text-gray-400">{data.date}</p>
    </article>
  );
}

function JobListingCard({ data }: { data: JobListing }) {
  return (
    <article className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white ${data.companyColor}`}
        >
          {data.companyInitial}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{data.title}</h3>
          <p className="text-xs text-gray-500">{data.company}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          {data.location}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {data.postedAgo}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600">
            {data.employmentType}
          </span>
          <span className="text-xs font-semibold text-gray-700">{data.salaryRange}</span>
        </div>
        <button
          type="button"
          className="rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700"
        >
          Apply Now
        </button>
      </div>
    </article>
  );
}

function FloatingAssistantButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      aria-label="Open assistant"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-transform ${hovered ? "scale-105" : ""
        }`}
    >
      <Bot className="h-6 w-6" />
    </button>
  );
}

// ---------- Main component ----------

export default function SocialFeed() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopSearchBar />

      <div className="mx-auto flex max-w-2xl justify-end px-4 pt-4">
        <CreatePostButton />
      </div>

      <main className="mx-auto flex max-w-2xl flex-col gap-4 px-4 py-4">
        <FeedPostCard data={post} />
        <JobListingCard data={job} />
        <FeedPostCard data={post} />
      </main>

      <FloatingAssistantButton />
    </div>
  );
}