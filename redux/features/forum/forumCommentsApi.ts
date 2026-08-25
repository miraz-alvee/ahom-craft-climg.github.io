import { baseApi } from "@/redux/api/baseApi";


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

export interface GetAllForumCommentsRequest {
  forum_id: number;
  ordering?: string;
  search?: string;
}

const forumCommentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllForumCommentByID: builder.query<ForumComment[], GetAllForumCommentsRequest>
      ({
        query: ({ forum_id, ordering, search }) => {
          const params = new URLSearchParams();

          if (ordering) {
            params.append("ordering", ordering);
          }

          if (search) {
            params.append("search", search);
          }

          const queryString = params.toString();

          return {
            url: `api/v1/forum/comments/list/${forum_id}/${queryString ? `?${queryString}` : ""
              }`,
            method: "GET",
          };
        },

        providesTags: (_result, _error, { forum_id }) => [
          {
            type: "ForumComments",
            id: forum_id,
          },
        ],
      }),

    createForumComment: builder.mutation< CreateForumCommentResponse, CreateForumCommentRequest>({
      query: (commentData) => {
        return {
          url: "api/v1/forum/comments/",
          method: "POST",
          body: commentData,
        };
      },

      invalidatesTags: (_result, _error, commentData) => [
        {
          type: "ForumComments",
          id: commentData.forum,
        },
      ],
    }),
  }),
});


export const { useCreateForumCommentMutation, useGetAllForumCommentByIDQuery, } = forumCommentsApi;