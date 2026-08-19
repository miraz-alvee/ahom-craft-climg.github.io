import { baseApi } from "@/redux/api/baseApi";

// ======================================================
// TYPES
// ======================================================

export interface CreateForumCommentRequest {
  forum: number;
  comment_content: string;
  parent_comment?: number | null;
}

export interface ForumCommentUser {
  user_id: number;
  full_name: string;
  email: string;
  profile_image: string | null;
}

export interface ForumComment {
  comment_id: number;
  forum: string;
  comment_content: string;
  parent_comment: number | null;
  user: ForumCommentUser;
  created_at: string;
  updated_at: string;
}

export interface CreateForumCommentResponse {
  message: string;
  comment: ForumComment;
}


// ======================================================
// API
// ======================================================

const forumCommentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createForumComment: builder.mutation<
      CreateForumCommentResponse,
      CreateForumCommentRequest
    >({
      query: (commentData) => {
        console.log(
          "[Forum Comments API] Request:",
          commentData
        );

        return {
          url: "api/v1/forum/comments/",
          method: "POST",
          body: commentData,
        };
      },

      async onQueryStarted(
        commentData,
        { queryFulfilled }
      ) {
        console.log(
          "[Forum Comments API] Started:",
          commentData
        );

        try {
          const { data } = await queryFulfilled;

          console.log(
            "[Forum Comments API] Success:",
            data
          );
        } catch (error) {
          console.error(
            "[Forum Comments API] Error:",
            error
          );
        }
      },
    }),
  }),
});


// ======================================================
// HOOKS
// ======================================================

export const {
  useCreateForumCommentMutation,
} = forumCommentsApi;