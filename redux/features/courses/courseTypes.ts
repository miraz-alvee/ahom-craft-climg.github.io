// ---------- List endpoint (GET /courses/all/) ----------
export interface CourseListItem {
  id: number;
  user: string; // just a name string in the list response
  title: string;
  description: string;
  thumbnail: string | null;
  price: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ---------- Detail endpoint (GET /courses/all/:id/) ----------
export interface CourseUser {
  id: number;
  full_name: string;
  email: string;
  profile_picture: string;
}

export interface QuizOption {
  id: number;
  quiz: string; // parent question text (denormalized by backend)
  option_text: string;
  is_correct: boolean;
  created_at: string;
  updated_at: string;
}

export interface Quiz {
  quiz_id: number;
  module: string;
  question: string;
  questions: QuizOption[]; // <- actually the answer options
  explanation: string;
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: number;
  module: string;
  title: string;
  description: string;
  video: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CourseDocument {
  id: number;
  module: string;
  title: string;
  pdf_file: string;
  created_at: string;
  updated_at: string;
}

export interface CourseModule {
  id: number;
  course: number;
  title: string;
  description: string;
  warning: string[];
  thumbnail: string;
  is_free: boolean;
  is_active: boolean;
  is_module_complete: boolean;
  created_at: string;
  updated_at: string;
  lessons: Lesson[];
  documents: CourseDocument[];
  quizzes: Quiz[];
}

export interface CourseDetail {
  id: number;
  user: CourseUser;
  title: string;
  description: string;
  thumbnail: string;
  price: string;
  is_purchased: boolean;
  modules: CourseModule[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}