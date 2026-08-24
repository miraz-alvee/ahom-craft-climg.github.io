"use client";

import { useState } from "react";

import {
    Heart,
    MessageCircle,
    X,
    ChevronLeft,
    ChevronRight,
    MoreVertical,
} from "lucide-react";

import {
    ForumImage,
    useGetForumImagesQuery,
} from "@/redux/features/forum/forumImagesApi";

import {
    MediaFile,
    useCreateForumLikeMutation,
    useGetForumLikesQuery,
} from "@/redux/features/forum/forumLikesApi";

import {
    useCreateForumCommentMutation,
    useGetAllForumCommentByIDQuery,
} from "@/redux/features/forum/forumCommentsApi";
import { Forum } from "@/redux/features/forum/forumTypes";


interface ForumPostCardProps {
    forum: Forum;
}


// ======================================================
// DATE FORMATTER
// ======================================================

function formatTimeAgo(
    dateString: string
) {
    const createdDate = new Date(dateString);

    const now = new Date();

    const differenceInSeconds = Math.floor(
        (now.getTime() - createdDate.getTime()) /
        1000
    );

    if (differenceInSeconds < 60) {
        return "JUST NOW";
    }

    const minutes = Math.floor(
        differenceInSeconds / 60
    );

    if (minutes < 60) {
        return `${minutes} ${minutes === 1
            ? "MINUTE"
            : "MINUTES"
            } AGO`;
    }

    const hours = Math.floor(
        minutes / 60
    );

    if (hours < 24) {
        return `${hours} ${hours === 1
            ? "HOUR"
            : "HOURS"
            } AGO`;
    }

    const days = Math.floor(
        hours / 24
    );

    if (days < 30) {
        return `${days} ${days === 1
            ? "DAY"
            : "DAYS"
            } AGO`;
    }

    return createdDate.toLocaleDateString();
}


// ======================================================
// MEDIA ITEM
// ======================================================

function MediaItem({
    item,
    controls = false,
}: {
    item: MediaFile;
    controls?: boolean;
}) {
    if (item.type === "video") {
        return (
            <video
                src={item.url}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay={!controls}
                muted
                loop={!controls}
                playsInline
                controls={controls}
            />
        );
    }

    return (
        <img
            src={item.url}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
        />
    );
}


// ======================================================
// COMPONENT
// ======================================================

export default function ForumPostCard({forum}: ForumPostCardProps) {

    const [showAllComments, setShowAllComments] = useState(false);

    const {
        data: comments = [],
        isLoading: isCommentsLoading,
        isFetching: isCommentsFetching,
        error: commentsError,
    } = useGetAllForumCommentByIDQuery(
        {
            forum_id: forum.forum_id,
        },
        {
            skip: !showAllComments,
        }
    );

    // ====================================================
    // LOG FORUM
    // ====================================================

    console.log(
        "[ForumPostCard] Rendering forum:",
        forum
    );

    console.log(
        "[ForumPostCard] Forum ID:",
        forum.forum_id
    );


    // ====================================================
    // GALLERY
    // ====================================================

    const [
        viewingMedia,
        setViewingMedia,
    ] = useState<number | null>(null);


    // ====================================================
    // COMMENT INPUT
    // ====================================================

    const [
        commentText,
        setCommentText,
    ] = useState("");

    const [
        createdComments,
        setCreatedComments,
    ] = useState<
        {
            comment_id: number;
            comment_content: string;
            user: {
                user_id: number;
                full_name: string;
                email: string;
                profile_image: string | null;
            };
            created_at: string;
        }[]
    >([]);


    // ====================================================
    // LOCAL LIKE STATE
    // ====================================================

    const [
        localLiked,
        setLocalLiked,
    ] = useState(
        forum.is_liked_by_current_user
    );

    const [
        localLikeCount,
        setLocalLikeCount,
    ] = useState(
        forum.total_likes
    );


    // ====================================================
    // GET IMAGES / VIDEOS
    // ====================================================

    const {
        data: forumImages,
        isLoading: isImagesLoading,
        isError: isImagesError,
    } = useGetForumImagesQuery(
        forum.forum_id
    );


    // ====================================================
    // GET LIKES
    // ====================================================

    const {
        data: forumLikes,
        isLoading: isLikesLoading,
    } = useGetForumLikesQuery(
        forum.forum_id
    );


    // ====================================================
    // CREATE LIKE
    // ====================================================

    const [
        createForumLike,
        {
            isLoading: isLiking,
        },
    ] = useCreateForumLikeMutation();


    // ====================================================
    // CREATE COMMENT
    // ====================================================

    const [
        createForumComment,
        {
            isLoading: isCommentCreating,
        },
    ] = useCreateForumCommentMutation();


    // ====================================================
    // CONVERT MEDIA
    // ====================================================

    const media: MediaFile[] =
        forumImages
            ?.filter(
                (item: ForumImage) =>
                    item.is_active
            )
            .map(
                (item: ForumImage) => ({
                    id: item.id,

                    url:
                        item.image ||
                        item.video ||
                        "",

                    type: (item.video ? "video" : "image") as "image" | "video",
                })
            )
            .filter(
                (item: MediaFile) =>
                    Boolean(item.url)
            ) || [];


    // ====================================================
    // OPEN GALLERY
    // ====================================================

    const openGallery = (
        index: number
    ) => {
        console.log(
            "[ForumPostCard] Opening media:",
            {
                forumId: forum.forum_id,
                index,
            }
        );

        setViewingMedia(index);
    };


    // ====================================================
    // CLOSE GALLERY
    // ====================================================

    const closeGallery = () => {
        setViewingMedia(null);
    };


    // ====================================================
    // NEXT MEDIA
    // ====================================================

    const nextMedia = () => {
        if (
            viewingMedia === null ||
            media.length === 0
        ) {
            return;
        }

        setViewingMedia(
            (viewingMedia + 1) %
            media.length
        );
    };


    // ====================================================
    // PREVIOUS MEDIA
    // ====================================================

    const previousMedia = () => {
        if (
            viewingMedia === null ||
            media.length === 0
        ) {
            return;
        }

        setViewingMedia(
            (
                viewingMedia -
                1 +
                media.length
            ) % media.length
        );
    };

    // ====================================================
    // LIKE / UNLIKE HANDLER
    // ====================================================

    const handleLike = async () => {
        if (isLiking) {
            return;
        }

        // Save previous state in case API fails
        const previousLiked = localLiked;
        const previousLikeCount = localLikeCount;

        // Toggle the current state
        const newLikedState = !localLiked;

        console.log("[ForumPostCard] Like button clicked:", {
            forumId: forum.forum_id,
            previousLiked,
            newLikedState,
            previousLikeCount,
        });

        // ==============================================
        // OPTIMISTIC UI UPDATE
        // ==============================================

        setLocalLiked(newLikedState);

        setLocalLikeCount((previousCount) => {
            return newLikedState
                ? previousCount + 1
                : Math.max(0, previousCount - 1);
        });

        try {
            const response = await createForumLike(
                forum.forum_id
            ).unwrap();

            console.log(
                "[ForumPostCard] Like/Unlike API response:",
                response
            );

            // ==============================================
            // Only sync from backend if `like` exists
            // ==============================================

            if (response?.like) {
                const backendLiked =
                    response.like.is_liked_by_current_user;

                setLocalLiked(backendLiked);

                console.log(
                    "[ForumPostCard] Backend like state:",
                    backendLiked
                );
            } else {
                console.log(
                    "[ForumPostCard] No `like` object returned. Optimistic state kept."
                );
            }
        } catch (error) {
            console.error(
                "[ForumPostCard] Like/Unlike API failed:",
                error
            );

            // Restore previous state when API fails
            setLocalLiked(previousLiked);
            setLocalLikeCount(previousLikeCount);
        }
    };


    // ====================================================
    // COMMENT HANDLER
    // ====================================================

    const handleCreateComment =
        async () => {

            const content =
                commentText.trim();


            // ----------------------------------------------
            // Empty validation
            // ----------------------------------------------

            if (!content) {

                console.log(
                    "[ForumPostCard] Empty comment."
                );

                return;
            }


            // ----------------------------------------------
            // PAYLOAD
            // ----------------------------------------------

            const commentData = {
                forum: forum.forum_id,

                comment_content:
                    content,

                parent_comment:
                    null,
            };


            console.log(
                "[ForumPostCard] Comment payload:",
                commentData
            );


            try {

                const response =
                    await createForumComment(
                        commentData
                    ).unwrap();

                console.log(
                    "[ForumPostCard] Comment created successfully:",
                    response
                );

                console.log(
                    "[ForumPostCard] New comment:",
                    response.comment
                );

                setCreatedComments(
                    (previousComments) => [
                        ...previousComments,
                        {
                            comment_id:
                                response.comment.comment_id,

                            comment_content:
                                response.comment.comment_content,

                            user:
                                response.comment.user,

                            created_at:
                                response.comment.created_at,
                        },
                    ]
                );

                setCommentText("");


            } catch (error) {

                console.error(
                    "[ForumPostCard] Comment creation failed:",
                    error
                );

            }
        };


    // ====================================================
    // LIKE COUNT
    // ====================================================

    const displayedLikeCount = localLikeCount;


    // ====================================================
    // MEDIA GRID
    // ====================================================

    const renderMedia = () => {

        if (isImagesLoading) {
            return (
                <div className="h-80 bg-gray-200 animate-pulse" />
            );
        }


        if (isImagesError) {
            console.error(
                "[ForumPostCard] Failed to load media:",
                forum.forum_id
            );

            return null;
        }


        if (media.length === 0) {
            return null;
        }


        // ================================================
        // ONE
        // ================================================

        if (media.length === 1) {
            return (
                <div
                    className="relative h-80 w-full cursor-pointer"
                    onClick={() =>
                        openGallery(0)
                    }
                >
                    <MediaItem
                        item={media[0]}
                        controls={
                            media[0].type ===
                            "video"
                        }
                    />
                </div>
            );
        }


        // ================================================
        // TWO
        // ================================================

        if (media.length === 2) {
            return (
                <div className="grid grid-cols-2 gap-0.5 h-80">

                    {media.map(
                        (item, index) => (
                            <div
                                key={
                                    item.id ??
                                    index
                                }
                                className="relative bg-gray-100 cursor-pointer"
                                onClick={() =>
                                    openGallery(index)
                                }
                            >
                                <MediaItem
                                    item={item}
                                />
                            </div>
                        )
                    )}

                </div>
            );
        }


        // ================================================
        // THREE
        // ================================================

        if (media.length === 3) {
            return (
                <div className="grid grid-cols-2 gap-0.5 h-80">

                    <div
                        className="relative cursor-pointer"
                        onClick={() =>
                            openGallery(0)
                        }
                    >
                        <MediaItem
                            item={media[0]}
                        />
                    </div>


                    <div className="flex flex-col gap-0.5">

                        {media
                            .slice(1)
                            .map(
                                (
                                    item,
                                    index
                                ) => (
                                    <div
                                        key={
                                            item.id ??
                                            index
                                        }
                                        className="relative flex-1 cursor-pointer"
                                        onClick={() =>
                                            openGallery(
                                                index + 1
                                            )
                                        }
                                    >
                                        <MediaItem
                                            item={
                                                item
                                            }
                                        />
                                    </div>
                                )
                            )}

                    </div>

                </div>
            );
        }


        // ================================================
        // FOUR OR MORE
        // ================================================

        return (
            <div className="grid grid-cols-3 gap-0.5 h-80">

                <div className="flex flex-col gap-0.5">

                    {media
                        .slice(0, 3)
                        .map(
                            (
                                item,
                                index
                            ) => (
                                <div
                                    key={
                                        item.id ??
                                        index
                                    }
                                    className="relative flex-1 cursor-pointer"
                                    onClick={() =>
                                        openGallery(
                                            index
                                        )
                                    }
                                >

                                    <MediaItem
                                        item={item}
                                    />

                                    {index === 2 &&
                                        media.length >
                                        4 && (
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-xl">
                                                +
                                                {media.length -
                                                    4 +
                                                    1}
                                            </div>
                                        )}

                                </div>
                            )
                        )}

                </div>


                <div
                    className="col-span-2 relative cursor-pointer"
                    onClick={() =>
                        openGallery(
                            media.length - 1
                        )
                    }
                >
                    <MediaItem
                        item={
                            media[
                            media.length - 1
                            ]
                        }
                    />
                </div>

            </div>
        );
    };


    // ====================================================
    // RENDER
    // ====================================================

    return (
        <>
            <article className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

                {/* ==================================================
            HEADER
        ================================================== */}

                <div className="flex justify-between items-center px-4 py-3">

                    <div className="flex gap-3 items-center">

                        {/* PROFILE */}

                        <div className="w-10 h-10 rounded-full bg-linear-to-r from-pink-500 via-red-500 to-yellow-500 p-0.5 shrink-0">

                            <div className="w-full h-full bg-white rounded-full p-0.5">

                                <div className="w-full h-full bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">

                                    {forum.created_by
                                        .profile_image ? (

                                        <img
                                            src={
                                                forum
                                                    .created_by
                                                    .profile_image
                                            }
                                            alt={
                                                forum
                                                    .created_by
                                                    .full_name
                                            }
                                            className="w-full h-full object-cover"
                                        />

                                    ) : (

                                        <span className="text-gray-600 font-semibold">

                                            {forum
                                                .created_by
                                                .full_name
                                                .charAt(0)
                                                .toUpperCase()}

                                        </span>

                                    )}

                                </div>

                            </div>

                        </div>


                        {/* USER */}

                        <div>

                            <p className="text-sm font-semibold text-gray-900">
                                {
                                    forum.created_by
                                        .full_name
                                }
                            </p>

                            {forum.location && (
                                <p className="text-xs text-gray-500">
                                    {
                                        forum.location
                                    }
                                </p>
                            )}

                        </div>

                    </div>


                    {/* MORE */}

                    <button
                        type="button"
                        className="text-gray-400 hover:text-gray-600 p-1"
                    >
                        <MoreVertical
                            size={20}
                        />
                    </button>

                </div>


                {/* ==================================================
            MEDIA
        ================================================== */}

                {renderMedia()}


                {/* ==================================================
            ACTIONS
        ================================================== */}

                <div className="px-4 pt-3 pb-4">

                    <div className="flex gap-4">

                        {/* LIKE */}

                        <button
                            type="button"
                            onClick={handleLike}
                            disabled={isLiking}
                            className="cursor-pointer disabled:opacity-50"
                        >
                            <Heart
                                className={`w-6 h-6 transition ${localLiked
                                    ? "text-red-500 fill-red-500"
                                    : "text-gray-700 hover:text-red-500"
                                    }`}
                                strokeWidth={1.8}
                            />
                        </button>


                        {/* COMMENT */}

                        <button
                            type="button"
                            onClick={() => {
                                document
                                    .getElementById(
                                        `comment-${forum.forum_id}`
                                    )
                                    ?.focus();
                            }}
                            className="cursor-pointer"
                        >
                            <MessageCircle
                                className="w-6 h-6 text-gray-700 hover:text-blue-500"
                                strokeWidth={1.8}
                            />
                        </button>

                    </div>


                    {/* ==================================================
              LIKES
          ================================================== */}

                    <p className="text-sm font-semibold text-gray-900 mt-1">

                        {isLikesLoading
                            ? forum.total_likes
                            : displayedLikeCount}

                        {" "}

                        {displayedLikeCount ===
                            1
                            ? "like"
                            : "likes"}

                    </p>


                    {/* ==================================================
              CAPTION
          ================================================== */}

                    <p className="text-sm text-gray-800 mt-1">

                        <span className="font-semibold text-gray-900 mr-1">
                            {
                                forum
                                    .created_by
                                    .full_name
                            }
                        </span>

                        {forum.content}

                    </p>


                    {/* ==================================================
    COMMENT COUNT
================================================== */}

                    {forum.total_comments > 0 && (
                        <button
                            type="button"
                            className="text-sm text-gray-500 mt-2"
                        >
                            View all {forum.total_comments}{" "}
                            {forum.total_comments === 1
                                ? "comment"
                                : "comments"}
                        </button>
                    )}


                    {/* ==================================================
    NEWLY CREATED COMMENTS
================================================== */}

                    {createdComments.length > 0 && (
                        <div className="mt-3 space-y-3">

                            {createdComments.map(
                                (comment) => (
                                    <div
                                        key={
                                            comment.comment_id
                                        }
                                        className="flex gap-2"
                                    >

                                        {/* COMMENT USER IMAGE */}

                                        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center shrink-0">

                                            {comment.user
                                                .profile_image ? (

                                                <img
                                                    src={
                                                        comment.user
                                                            .profile_image
                                                    }
                                                    alt={
                                                        comment.user
                                                            .full_name
                                                    }
                                                    className="w-full h-full object-cover"
                                                />

                                            ) : (

                                                <span className="text-xs font-semibold text-gray-600">
                                                    {comment.user.full_name
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </span>

                                            )}

                                        </div>


                                        {/* COMMENT */}

                                        <div className="bg-gray-100 rounded-2xl px-3 py-2">

                                            <p className="text-xs font-semibold text-gray-900">
                                                {
                                                    comment.user
                                                        .full_name
                                                }
                                            </p>

                                            <p className="text-sm text-gray-700">
                                                {
                                                    comment.comment_content
                                                }
                                            </p>

                                        </div>

                                    </div>
                                )
                            )}

                        </div>
                    )}

                    {/* ==================================================
              COMMENT INPUT
          ================================================== */}

                    <div className="flex gap-2 mt-3">

                        <input
                            id={`comment-${forum.forum_id}`}
                            value={
                                commentText
                            }
                            onChange={(event) =>
                                setCommentText(
                                    event.target
                                        .value
                                )
                            }
                            onKeyDown={(
                                event
                            ) => {

                                if (
                                    event.key ===
                                    "Enter" &&
                                    !event.shiftKey
                                ) {
                                    event.preventDefault();

                                    handleCreateComment();
                                }

                            }}
                            placeholder="Add a comment..."
                            className="flex-1 text-sm border border-gray-200 rounded-full px-4 py-2 outline-none focus:border-blue-400"
                        />


                        <button
                            type="button"
                            disabled={
                                !commentText.trim() ||
                                isCommentCreating
                            }
                            onClick={
                                handleCreateComment
                            }
                            className="text-sm font-semibold text-blue-600 disabled:text-gray-300 disabled:cursor-not-allowed"
                        >
                            {isCommentCreating
                                ? "..."
                                : "Post"}
                        </button>

                    </div>


                    {/* ==================================================
              TIME
          ================================================== */}

                    <p className="text-[10px] text-gray-400 uppercase tracking-wide mt-2">
                        {formatTimeAgo(
                            forum.created_at
                        )}
                    </p>

                </div>

            </article>


            {/* ====================================================
          GALLERY
      ==================================================== */}

            {viewingMedia !== null &&
                media[
                viewingMedia
                ] && (

                    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">

                        {/* CLOSE */}

                        <button
                            type="button"
                            onClick={
                                closeGallery
                            }
                            className="absolute top-4 right-4 text-white z-10"
                        >
                            <X size={32} />
                        </button>


                        {/* PREVIOUS */}

                        {media.length >
                            1 && (
                                <button
                                    type="button"
                                    onClick={
                                        previousMedia
                                    }
                                    className="absolute left-4 text-white z-10"
                                >
                                    <ChevronLeft
                                        size={40}
                                    />
                                </button>
                            )}


                        {/* NEXT */}

                        {media.length >
                            1 && (
                                <button
                                    type="button"
                                    onClick={
                                        nextMedia
                                    }
                                    className="absolute right-4 text-white z-10"
                                >
                                    <ChevronRight
                                        size={40}
                                    />
                                </button>
                            )}


                        {/* MEDIA */}

                        {media[
                            viewingMedia
                        ].type ===
                            "video" ? (

                            <video
                                src={
                                    media[
                                        viewingMedia
                                    ].url
                                }
                                controls
                                autoPlay
                                playsInline
                                className="max-h-[85vh] max-w-full rounded-lg"
                            />

                        ) : (

                            <img
                                src={
                                    media[
                                        viewingMedia
                                    ].url
                                }
                                alt=""
                                className="max-h-[85vh] max-w-full object-contain rounded-lg"
                            />

                        )}

                    </div>
                )}

        </>
    );
}