"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Heart,
  MessageCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Trash2,
  MoreVertical,
} from "lucide-react";

type MediaFile = {
  url: string;
  type: "image" | "video";
};

type Post = {
  id: number;
  caption: string;
  media: MediaFile[];
};

// ─── Reusable Media Item (image or video) ────────────────────────────────────
function MediaItem({
  item,
  fill = true,
  controls = false,
  className = "",
}: {
  item: MediaFile;
  fill?: boolean;
  controls?: boolean;
  className?: string;
}) {
  if (item.type === "video") {
    return (
      <video
        src={item.url}
        className={`absolute inset-0 w-full h-full object-cover ${className}`}
        autoPlay={!controls}
        muted
        loop={!controls}
        playsInline
        controls={controls}
      />
    );
  }
  return fill ? (
    <Image src={item.url} alt="" fill className={`object-cover ${className}`} />
  ) : (
    <Image
      src={item.url}
      alt=""
      width={1200}
      height={1200}
      className={`max-h-[85vh] w-auto object-contain rounded-lg ${className}`}
    />
  );
}

export default function Home() {
  const [caption, setCaption] = useState("");
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewingPost, setViewingPost] = useState<Post | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [posts, setPosts] = useState<Post[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("my-app-posts");
      if (saved) return JSON.parse(saved);
    }
    return [
      {
        id: 1,
        caption: "The game in Japan was amazing! Here are some photos 🇯🇵",
        media: [
          { url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&auto=format&fit=crop&q=80", type: "image" },
          { url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80", type: "image" },
          { url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80", type: "image" },
          { url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&auto=format&fit=crop&q=80", type: "image" },
          { url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop&q=80", type: "image" },
        ],
      },
      {
        id: 2,
        caption: "Working on new ideas with the team 🚀",
        media: [
          { url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&auto=format&fit=crop&q=80", type: "image" },
          { url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&auto=format&fit=crop&q=80", type: "image" },
          { url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=1200&auto=format&fit=crop&q=80", type: "image" },
        ],
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("my-app-posts", JSON.stringify(posts));
  }, [posts]);

  // ── File handler ────────────────────────────────────────────────────────────
  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const formatted: MediaFile[] = Array.from(files).map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith("video") ? "video" : "image",
    }));
    setMediaFiles((prev) => [...prev, ...formatted]);
  };

  const removePreview = (idx: number) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  // ── Create / Delete ─────────────────────────────────────────────────────────
  const createPost = () => {
    if (!mediaFiles.length) return;
    setPosts((prev) => [
      { id: Date.now(), caption, media: mediaFiles },
      ...prev,
    ]);
    setCaption("");
    setMediaFiles([]);
    setIsCreateModalOpen(false);
  };

  const deletePost = (id: number) => {
    if (confirm("Delete this post?")) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // ── Gallery ─────────────────────────────────────────────────────────────────
  const openGallery = (post: Post, idx = 0) => {
    setViewingPost(post);
    setCurrentIndex(idx);
  };
  const closeGallery = () => setViewingPost(null);
  const nextImage = () =>
    setCurrentIndex((i) => (i + 1) % viewingPost!.media.length);
  const prevImage = () =>
    setCurrentIndex((i) => (i - 1 + viewingPost!.media.length) % viewingPost!.media.length);

  // ── Grid layouts ─────────────────────────────────────────────────────────────
  const renderGrid = (post: Post) => {
    const { media } = post;
    const n = media.length;

    // Single
    if (n === 1) {
      return (
        <div
          className="relative h-80 w-full cursor-pointer"
          onClick={() => openGallery(post, 0)}
        >
          <MediaItem item={media[0]} controls={media[0].type === "video"} />
        </div>
      );
    }

    // Two
    if (n === 2) {
      return (
        <div className="grid grid-cols-2 gap-0.5 h-80">
          {media.map((item, idx) => (
            <div
              key={idx}
              className="relative cursor-pointer bg-gray-100"
              onClick={() => openGallery(post, idx)}
            >
              <MediaItem item={item} />
            </div>
          ))}
        </div>
      );
    }

    // Three
    if (n === 3) {
      return (
        <div className="grid grid-cols-2 gap-0.5 h-80">
          <div
            className="relative bg-gray-100 cursor-pointer"
            onClick={() => openGallery(post, 0)}
          >
            <MediaItem item={media[0]} />
          </div>
          <div className="flex flex-col gap-0.5 h-full">
            {media.slice(1).map((item, idx) => (
              <div
                key={idx}
                className="relative flex-1 bg-gray-100 cursor-pointer"
                onClick={() => openGallery(post, idx + 1)}
              >
                <MediaItem item={item} />
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Four+
    return (
      <div className="grid grid-cols-3 gap-0.5 h-80">
        {/* Left col: first 3 */}
        <div className="flex flex-col gap-0.5 h-full">
          {media.slice(0, 3).map((item, idx) => (
            <div
              key={idx}
              className="relative flex-1 bg-gray-100 cursor-pointer"
              onClick={() => openGallery(post, idx)}
            >
              <MediaItem item={item} />
              {idx === 2 && n > 3 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-xl">
                  +{n - 3}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Right col: last item */}
        <div
          className="col-span-2 relative bg-gray-100 cursor-pointer"
          onClick={() => openGallery(post, n - 1)}
        >
          <MediaItem item={media[n - 1]} />
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center font-sans">
      <div className="w-full max-w-3xl space-y-6">

        {/* Top bar */}
        <div className="flex justify-end">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow font-medium transition"
          >
            + Create Post
          </button>
        </div>

        {/* ── Create Modal ─────────────────────────────────────────────────── */}
        {isCreateModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={(e) => e.target === e.currentTarget && setIsCreateModalOpen(false)}
          >
            <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Create Post</h2>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Caption */}
              <div className="flex gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-linear-to-tr from-yellow-400 to-pink-500 shrink-0" />
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full resize-none bg-gray-50 rounded-xl p-3 outline-none text-sm border border-transparent focus:border-blue-400 transition"
                  placeholder="Write a caption..."
                  rows={3}
                />
              </div>

              {/* Drop zone / previews */}
              {mediaFiles.length === 0 ? (
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-8 cursor-pointer bg-gray-50/50 hover:bg-gray-50 transition">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" x2="12" y1="3" y2="15" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-700">Upload Photos / Videos</p>
                  <p className="text-xs text-gray-400 mt-1">JPG, PNG, MP4, MOV supported</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={(e) => handleFiles(e.target.files)}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {mediaFiles.map((f, i) => (
                      <div
                        key={i}
                        className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 group"
                      >
                        {/* ✅ FIX: render <video> for video previews, not <Image> */}
                        {f.type === "video" ? (
                          <video
                            src={f.url}
                            className="absolute inset-0 w-full h-full object-cover"
                            muted
                            playsInline
                          />
                        ) : (
                          <Image src={f.url} alt="preview" fill className="object-cover" />
                        )}
                        <button
                          onClick={() => removePreview(i)}
                          className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {/* Add more */}
                    <label className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50 text-gray-400 text-2xl transition">
                      +
                      <input
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        onChange={(e) => handleFiles(e.target.files)}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => { setIsCreateModalOpen(false); setMediaFiles([]); setCaption(""); }}
                  className="flex-1 border border-gray-300 text-gray-700 rounded-xl py-3 text-sm font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={createPost}
                  disabled={!mediaFiles.length}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl py-3 text-sm font-semibold shadow-lg transition"
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Feed ─────────────────────────────────────────────────────────── */}
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

            {/* Post header */}
            <div className="flex justify-between items-center px-4 py-3">
              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 rounded-full bg-linear-to-r from-pink-500 via-red-500 to-yellow-500 p-0.5 shrink-0">
                  <div className="w-full h-full bg-white rounded-full p-0.5">
                    <div className="w-full h-full bg-gray-200 rounded-full overflow-hidden relative">
                      <Image
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60"
                        alt="avatar"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">joshua_j</p>
                  <p className="text-xs text-gray-500">Tokyo, Japan</p>
                </div>
              </div>

              {/* More / Delete */}
              <div className="relative group">
                <button className="text-gray-400 hover:text-gray-600 p-1 transition">
                  <MoreVertical size={20} />
                </button>
                <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                  <button
                    onClick={() => deletePost(post.id)}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 flex items-center gap-2 hover:bg-red-50 rounded-xl transition"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>

            {/* Media grid */}
            <div className="overflow-hidden bg-gray-100">
              {renderGrid(post)}
            </div>

            {/* Actions */}
            <div className="px-4 pt-3 pb-4 space-y-1.5">
              <div className="flex gap-4">
                <Heart className="w-6 h-6 cursor-pointer text-gray-700 hover:text-red-500 transition" strokeWidth={1.8} />
                <MessageCircle className="w-6 h-6 cursor-pointer text-gray-700 hover:text-blue-500 transition" strokeWidth={1.8} />
              </div>
              <p className="text-sm font-semibold text-gray-900">45,892 likes</p>
              <p className="text-sm text-gray-800">
                <span className="font-semibold text-gray-900 mr-1">joshua_j</span>
                {post.caption}
              </p>
              <p className="text-[10px] text-gray-400 uppercase tracking-wide">2 Hours Ago</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Gallery Modal ───────────────────────────────────────────────────── */}
      {viewingPost && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={closeGallery}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition"
          >
            <X size={32} />
          </button>

          {viewingPost.media.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 text-white hover:text-gray-300 transition"
              >
                <ChevronLeft size={40} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 text-white hover:text-gray-300 transition"
              >
                <ChevronRight size={40} />
              </button>
            </>
          )}

          {/* Counter */}
          {viewingPost.media.length > 1 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
              {currentIndex + 1} / {viewingPost.media.length}
            </div>
          )}

          <div className="relative flex items-center justify-center max-w-5xl w-full">
            {viewingPost.media[currentIndex].type === "video" ? (
              <video
                key={currentIndex}      // re-mount on index change so src reloads
                src={viewingPost.media[currentIndex].url}
                controls
                autoPlay
                muted
                playsInline
                className="max-h-[85vh] w-auto rounded-lg"
              />
            ) : (
              <Image
                src={viewingPost.media[currentIndex].url}
                alt=""
                width={1200}
                height={1200}
                className="max-h-[85vh] w-auto object-contain rounded-lg"
              />
            )}
          </div>
        </div>
      )}
    </main>
  );
}