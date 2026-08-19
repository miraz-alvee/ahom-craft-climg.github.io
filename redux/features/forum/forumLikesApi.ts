import { baseApi } from "@/redux/api/baseApi";

// ======================================================
// TYPES
// ======================================================
export interface MediaFile {
  id?: number;
  url: string;
  type: "image" | "video";
}

export interface ForumLikeUser {
  id?: number;
  user_id?: number;
  full_name: string;
  email: string;
  profile_image: string | null;
}

export interface ForumLike {
  id: number;
  forum: number;
  user: ForumLikeUser;
  created_at: string;
  updated_at: string;
  is_liked_by_current_user: boolean;
}

export interface CreateForumLikeResponse {
  message: string;
  like: ForumLike;
}

export interface ForumLikeListResponse {
  forum_id: number;
  content: string;
  users: ForumLikeUser[];
}


// ======================================================
// API
// ======================================================

const forumLikesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ==================================================
    // POST LIKE
    // POST /api/v1/forum/like/{forum_id}/
    // ==================================================

    createForumLike: builder.mutation<
      CreateForumLikeResponse,
      number
    >({
      query: (forum_id) => ({
        url: `api/v1/forum/like/${forum_id}/`,
        method: "POST",
      }),
    }),


    // ==================================================
    // GET FORUM LIKES
    // GET /api/v1/forum/like/forum/list/{forum_id}/
    // ==================================================

    getForumLikes: builder.query<
      ForumLikeListResponse,
      number
    >({
      query: (forum_id) => ({
        url: `api/v1/forum/like/forum/list/${forum_id}/`,
        method: "GET",
      }),
    }),

  }),
});


// ======================================================
// HOOKS
// ======================================================

export const {
  useCreateForumLikeMutation,
  useGetForumLikesQuery,
} = forumLikesApi;