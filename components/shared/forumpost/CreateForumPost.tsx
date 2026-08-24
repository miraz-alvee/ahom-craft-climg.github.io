"use client";

import {
  ChangeEvent,
  useEffect,
  useState,
} from "react";

import {
  Image as ImageIcon,
  MapPin,
  Plus,
  Video,
  X,
} from "lucide-react";

import {
  useCreateForumMutation,
} from "@/redux/features/forum/forumApis";


// ======================================================
// TYPES
// ======================================================

interface CreateForumPostProps {
  onPostCreated?: () => void;
}

interface SelectedMedia {
  id: string;
  file: File;
  preview: string;
  type: "image" | "video";
}


// ======================================================
// COMPONENT
// ======================================================

export default function CreateForumPost({
  onPostCreated,
}: CreateForumPostProps) {

  // ====================================================
  // STATES
  // ====================================================

  const [
    isOpen,
    setIsOpen,
  ] = useState(false);

  const [
    content,
    setContent,
  ] = useState("");

  const [
    location,
    setLocation,
  ] = useState("");

  const [
    selectedMedia,
    setSelectedMedia,
  ] = useState<SelectedMedia[]>(
    []
  );

  const [
    isUploadingMedia,
    setIsUploadingMedia,
  ] = useState(false);


  // ====================================================
  // API
  // ====================================================

  const [
    createForum,
    {
      isLoading: isCreatingForum,
    },
  ] = useCreateForumMutation();


  // ====================================================
  // CLEANUP PREVIEW URLS
  // ====================================================

  useEffect(() => {
    return () => {
      selectedMedia.forEach(
        (media) => {
          URL.revokeObjectURL(
            media.preview
          );
        }
      );
    };
  }, [selectedMedia]);


  // ====================================================
  // OPEN MODAL
  // ====================================================

  const openModal = () => {

    console.log(
      "[CreateForumPost] Opening create post modal"
    );

    setIsOpen(true);
  };


  // ====================================================
  // CLOSE MODAL
  // ====================================================

  const closeModal = () => {

    console.log(
      "[CreateForumPost] Closing create post modal"
    );

    selectedMedia.forEach(
      (media) => {
        URL.revokeObjectURL(
          media.preview
        );
      }
    );

    setContent("");

    setLocation("");

    setSelectedMedia([]);

    setIsOpen(false);
  };


  // ====================================================
  // IMAGE SELECT
  // ====================================================

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {

    const files =
      Array.from(
        event.target.files || []
      );

    if (!files.length) {
      return;
    }


    console.log(
      "[CreateForumPost] Images selected:",
      files
    );


    const imageFiles =
      files.filter(
        (file) =>
          file.type.startsWith(
            "image/"
          )
      );


    const newMedia =
      imageFiles.map(
        (file) => ({
          id:
            `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,

          file,

          preview:
            URL.createObjectURL(
              file
            ),

          type: "image" as const,
        })
      );


    setSelectedMedia(
      (previous) => [
        ...previous,
        ...newMedia,
      ]
    );


    // Reset input so the
    // same file can be selected again
    event.target.value = "";
  };


  // ====================================================
  // VIDEO SELECT
  // ====================================================

  const handleVideoChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {

    const files =
      Array.from(
        event.target.files || []
      );

    if (!files.length) {
      return;
    }


    console.log(
      "[CreateForumPost] Videos selected:",
      files
    );


    const videoFiles =
      files.filter(
        (file) =>
          file.type.startsWith(
            "video/"
          )
      );


    const newMedia =
      videoFiles.map(
        (file) => ({
          id:
            `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,

          file,

          preview:
            URL.createObjectURL(
              file
            ),

          type: "video" as const,
        })
      );


    setSelectedMedia(
      (previous) => [
        ...previous,
        ...newMedia,
      ]
    );


    event.target.value = "";
  };


  // ====================================================
  // REMOVE MEDIA
  // ====================================================

  const handleRemoveMedia = (
    mediaId: string
  ) => {

    console.log(
      "[CreateForumPost] Removing media:",
      mediaId
    );


    setSelectedMedia(
      (previous) => {

        const mediaToRemove =
          previous.find(
            (media) =>
              media.id === mediaId
          );


        if (mediaToRemove) {
          URL.revokeObjectURL(
            mediaToRemove.preview
          );
        }


        return previous.filter(
          (media) =>
            media.id !== mediaId
        );
      }
    );
  };


  // ====================================================
  // UPLOAD MEDIA
  // ====================================================
  //
  // IMPORTANT:
  // Connect this function with your actual
  // image/video POST endpoint after you send
  // me the Swagger endpoint.
  //
  // ====================================================

  const uploadMedia = async (
    forumId: number
  ) => {

    if (
      selectedMedia.length === 0
    ) {

      console.log(
        "[CreateForumPost] No media to upload"
      );

      return;
    }


    console.log(
      "[CreateForumPost] Starting media upload:",
      {
        forumId,
        totalMedia:
          selectedMedia.length,
      }
    );


    setIsUploadingMedia(true);


    try {

      for (
        let index = 0;
        index <
        selectedMedia.length;
        index++
      ) {

        const media =
          selectedMedia[index];


        console.log(
          `[CreateForumPost] Uploading media ${index + 1}/${selectedMedia.length}:`,
          {
            forumId,
            fileName:
              media.file.name,
            type:
              media.type,
          }
        );


        // =================================================
        // TODO:
        // Replace this with your actual media API.
        //
        // Example:
        //
        // await createForumMedia({
        //   forum: forumId,
        //   image:
        //     media.type === "image"
        //       ? media.file
        //       : undefined,
        //   video:
        //     media.type === "video"
        //       ? media.file
        //       : undefined,
        // }).unwrap();
        // =================================================


        console.log(
          "[CreateForumPost] Media ready for upload:",
          {
            forumId,
            file:
              media.file,
            type:
              media.type,
          }
        );
      }


      console.log(
        "[CreateForumPost] All media uploaded successfully"
      );

    } catch (error) {

      console.error(
        "[CreateForumPost] Media upload failed:",
        error
      );

      throw error;

    } finally {

      setIsUploadingMedia(false);
    }
  };


  // ====================================================
  // CREATE POST
  // ====================================================

  const handleCreatePost =
    async () => {

      const trimmedContent =
        content.trim();

      const trimmedLocation =
        location.trim();


      // =================================================
      // VALIDATION
      // =================================================

      if (!trimmedContent) {

        console.log(
          "[CreateForumPost] Content is required"
        );

        return;
      }


      // =================================================
      // PAYLOAD
      // =================================================

      const payload = {
        content:
          trimmedContent,

        location:
          trimmedLocation ||
          null,
      };


      console.log(
        "[CreateForumPost] Creating forum with:",
        payload
      );


      try {

        // =================================================
        // CREATE FORUM FIRST
        // =================================================

        const forum =
          await createForum(
            payload
          ).unwrap();


        console.log(
          "[CreateForumPost] Forum created successfully:",
          forum
        );


        // =================================================
        // GET FORUM ID
        // =================================================

        const forumId =
          forum.forum_id;


        console.log(
          "[CreateForumPost] New forum ID:",
          forumId
        );


        // =================================================
        // UPLOAD MEDIA
        // =================================================

        if (
          selectedMedia.length > 0
        ) {

          await uploadMedia(
            forumId
          );

        }


        // =================================================
        // SUCCESS
        // =================================================

        console.log(
          "[CreateForumPost] Post creation completed:",
          {
            forumId,
            mediaCount:
              selectedMedia.length,
          }
        );


        closeModal();


        // Refresh feed
        onPostCreated?.();


      } catch (error) {

        console.error(
          "[CreateForumPost] Post creation failed:",
          error
        );

      }
    };


  // ====================================================
  // LOADING STATE
  // ====================================================

  const isSubmitting =
    isCreatingForum ||
    isUploadingMedia;


  // ====================================================
  // RENDER
  // ====================================================

  return (
    <>
      {/* ==================================================
          CREATE POST BUTTON
      ================================================== */}

      <button
        type="button"
        onClick={openModal}
        className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-lg flex items-center gap-2 shadow-sm transition"
      >
        <Plus size={18} />

        Create Post
      </button>


      {/* ==================================================
          MODAL
      ================================================== */}

      {isOpen && (

        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">

          <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">


            {/* ============================================
                HEADER
            ============================================ */}

            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">

              <h2 className="text-xl font-semibold text-gray-900">
                Create Post
              </h2>


              <button
                type="button"
                onClick={closeModal}
                disabled={
                  isSubmitting
                }
                className="text-gray-400 hover:text-gray-700 disabled:opacity-50"
              >
                <X size={22} />
              </button>

            </div>


            {/* ============================================
                BODY
            ============================================ */}

            <div className="p-6 space-y-5">


              {/* ==========================================
                  CONTENT
              ========================================== */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What's on your mind?
                </label>


                <textarea
                  value={content}
                  onChange={(
                    event
                  ) =>
                    setContent(
                      event.target.value
                    )
                  }
                  placeholder="Write something..."
                  rows={5}
                  disabled={
                    isSubmitting
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                />

              </div>


              {/* ==========================================
                  LOCATION
              ========================================== */}

              <div>

                <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-2">

                  <MapPin size={16} />

                  Location

                </label>


                <input
                  type="text"
                  value={location}
                  onChange={(
                    event
                  ) =>
                    setLocation(
                      event.target.value
                    )
                  }
                  placeholder="e.g. Dhaka"
                  disabled={
                    isSubmitting
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                />

              </div>


              {/* ==========================================
                  MEDIA BUTTONS
              ========================================== */}

              <div>

                <p className="text-sm font-medium text-gray-700 mb-3">
                  Add to your post
                </p>


                <div className="flex gap-3">


                  {/* IMAGE */}

                  <label
                    className={`flex-1 border border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition ${
                      isSubmitting
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }`}
                  >

                    <ImageIcon
                      size={24}
                      className="text-green-600"
                    />

                    <span className="text-sm font-medium text-gray-700">
                      Photos
                    </span>


                    <span className="text-xs text-gray-400">
                      Multiple allowed
                    </span>


                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      hidden
                      onChange={
                        handleImageChange
                      }
                      disabled={
                        isSubmitting
                      }
                    />

                  </label>


                  {/* VIDEO */}

                  <label
                    className={`flex-1 border border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition ${
                      isSubmitting
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }`}
                  >

                    <Video
                      size={24}
                      className="text-blue-600"
                    />

                    <span className="text-sm font-medium text-gray-700">
                      Videos
                    </span>


                    <span className="text-xs text-gray-400">
                      Multiple allowed
                    </span>


                    <input
                      type="file"
                      accept="video/*"
                      multiple
                      hidden
                      onChange={
                        handleVideoChange
                      }
                      disabled={
                        isSubmitting
                      }
                    />

                  </label>

                </div>

              </div>


              {/* ==========================================
                  MEDIA PREVIEW
              ========================================== */}

              {selectedMedia.length > 0 && (

                <div>

                  <div className="flex items-center justify-between mb-3">

                    <p className="text-sm font-medium text-gray-700">
                      Selected media
                    </p>


                    <p className="text-xs text-gray-500">
                      {selectedMedia.length}{" "}
                      {selectedMedia.length === 1
                        ? "file"
                        : "files"}
                    </p>

                  </div>


                  <div className="grid grid-cols-2 gap-3">

                    {selectedMedia.map(
                      (media) => (

                        <div
                          key={
                            media.id
                          }
                          className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200"
                        >

                          {/* IMAGE */}

                          {media.type ===
                            "image" && (

                            <img
                              src={
                                media.preview
                              }
                              alt={
                                media.file
                                  .name
                              }
                              className="w-full h-full object-cover"
                            />

                          )}


                          {/* VIDEO */}

                          {media.type ===
                            "video" && (

                            <video
                              src={
                                media.preview
                              }
                              className="w-full h-full object-cover"
                              controls
                            />

                          )}


                          {/* REMOVE */}

                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveMedia(
                                media.id
                              )
                            }
                            disabled={
                              isSubmitting
                            }
                            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black disabled:opacity-50"
                          >
                            <X
                              size={16}
                            />
                          </button>


                          {/* TYPE */}

                          <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs">
                            {media.type ===
                            "image"
                              ? "Photo"
                              : "Video"}
                          </div>

                        </div>

                      )
                    )}

                  </div>

                </div>

              )}

            </div>


            {/* ============================================
                FOOTER
            ============================================ */}

            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">


              <button
                type="button"
                onClick={closeModal}
                disabled={
                  isSubmitting
                }
                className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>


              <button
                type="button"
                onClick={
                  handleCreatePost
                }
                disabled={
                  isSubmitting ||
                  !content.trim()
                }
                className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
              >

                {isCreatingForum
                  ? "Creating post..."
                  : isUploadingMedia
                    ? "Uploading media..."
                    : "Post"}

              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
}