"use client";

import Dashboard from "@/components/shared/forumpost/Dashboard";
import { useGetForumsQuery } from "@/redux/features/forum/forumApis";

export default function EmployerDasboardPage() {
  const { data: forums = [], isLoading, isError, refetch } = useGetForumsQuery();

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
        <div className="w-full max-w-3xl space-y-6">
          <div className="flex justify-end">
            <div className="w-32 h-11 bg-gray-200 rounded-lg animate-pulse" />
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="p-4 flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
              <div className="space-y-2">
                <div className="w-28 h-3 bg-gray-200 rounded animate-pulse" />
                <div className="w-20 h-2 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>

            <div className="h-80 bg-gray-200 animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
              <div className="w-48 h-4 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
        <div className="w-full max-w-3xl">
          <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
            <p className="text-gray-600 mb-4">
              Something went wrong while loading posts.
            </p>
            <button
              type="button"
              onClick={() =>
                refetch()
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
       <Dashboard
        forums={
          forums
        }
        onPostCreated={
          () => {
            // console.log(
            //   "[Page] New post created. Refetching forums..."
            // );
            refetch();
          }
        }
      />
    </main>
  );
}