export interface ForumUser {
  user_id: number;
  full_name: string;
  email: string;
  profile_image: string | null;
}

export interface Forum {
  forum_id: number;
  content: string;
  location: string | null;
  total_likes: number;
  total_comments: number;
  is_liked_by_current_user: boolean;
  is_active: boolean;
  created_by: ForumUser;
  created_at: string;
  updated_at: string;
}


export interface CreateForumRequest {
  content: string;
  location?: string | null;
}

export interface UpdateForumRequest {
  id: number;
  data: {
    content?: string;
    location?: string | null;
  };
}