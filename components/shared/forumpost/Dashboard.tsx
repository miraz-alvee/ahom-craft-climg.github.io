"use client";

import { Forum } from "@/redux/features/forum/forumTypes";
import CreateForumPost from "./CreateForumPost";
import ForumPostCard from "./ForumPostCard";


interface CareerSeekersDashboardProps {
  forums: Forum[];
  onPostCreated: () => void;
}


export default function Dashboard({
  forums,
  onPostCreated,
}: CareerSeekersDashboardProps) {

  // console.log(
  //   "[CareerSeekersDashboard] Forums:",
  //   forums
  // );


  return (
    <div className="w-full max-w-3xl">

      <div className="flex justify-end mb-6">
        <CreateForumPost
          onPostCreated={
            onPostCreated
          }
        />
      </div>


      {/* ==================================================
          POSTS
      ================================================== */}

      <div className="space-y-6">
        {forums.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
            <p className="text-gray-500">
              No posts available.
            </p>
          </div>
        ) : (
          forums
            .filter(
              (forum) =>
                forum.is_active
            )
            .map((forum) => {

              // console.log(
              //   "[CareerSeekersDashboard] Rendering forum:",
              //   forum.forum_id
              // );

              return (
                <ForumPostCard
                  key={
                    forum.forum_id
                  }
                  forum={
                    forum
                  }
                />
              );
            })
        )}
      </div>
    </div>
  );
}