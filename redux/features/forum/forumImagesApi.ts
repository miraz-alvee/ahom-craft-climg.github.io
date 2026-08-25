import { baseApi } from "@/redux/api/baseApi";

// ==============================
// Interfaces
// ==============================

export interface ForumImage {
  id: number;
  forum: number;
  image: string | null;
  video: string | null;
  is_primary: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}


// ==============================
// Request Types
// ==============================

export interface CreateForumImageRequest {
  forum_id: number;
  image?: File;
  video?: File;
  is_primary?: boolean;
}

export interface UpdateForumImageRequest {
  id: number;
  data: {
    image?: File;
    video?: File;
    is_primary?: boolean;
    is_active?: boolean;
  };
}


// ==============================
// API
// ==============================

const forumImagesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // GET /api/v1/forum/{forum_id}/images/
    getForumImages: builder.query<ForumImage[], number>({
      query: (forum_id) => ({
        url: `api/v1/forum/${forum_id}/images/`,
        method: "GET",
      }),
    }),

    // POST /api/v1/forum/{forum_id}/images/
    createForumImage: builder.mutation<
      ForumImage,
      CreateForumImageRequest
    >({
      query: ({ forum_id, image, video, is_primary }) => {
        const formData = new FormData();

        if (image) {
          formData.append("image", image);
        }

        if (video) {
          formData.append("video", video);
        }

        if (is_primary !== undefined) {
          formData.append("is_primary", String(is_primary));
        }

        return {
          url: `api/v1/forum/${forum_id}/images/`,
          method: "POST",
          body: formData,
        };
      },
    }),

    // GET /api/v1/forum/images/{id}/
    getForumImageById: builder.query<ForumImage, number>({
      query: (id) => ({
        url: `api/v1/forum/images/${id}/`,
        method: "GET",
      }),
    }),

    // PATCH /api/v1/forum/images/{id}/
    updateForumImage: builder.mutation<
      ForumImage,
      UpdateForumImageRequest
    >({
      query: ({ id, data }) => {
        const formData = new FormData();

        if (data.image) {
          formData.append("image", data.image);
        }

        if (data.video) {
          formData.append("video", data.video);
        }

        if (data.is_primary !== undefined) {
          formData.append(
            "is_primary",
            String(data.is_primary)
          );
        }

        if (data.is_active !== undefined) {
          formData.append(
            "is_active",
            String(data.is_active)
          );
        }

        return {
          url: `api/v1/forum/images/${id}/`,
          method: "PATCH",
          body: formData,
        };
      },
    }),

    // DELETE /api/v1/forum/images/{id}/
    deleteForumImage: builder.mutation<void, number>({
      query: (id) => ({
        url: `api/v1/forum/images/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});


// ==============================
// Hooks
// ==============================

export const {
  useGetForumImagesQuery,
  useCreateForumImageMutation,
  useGetForumImageByIdQuery,
  useUpdateForumImageMutation,
  useDeleteForumImageMutation,
} = forumImagesApi;