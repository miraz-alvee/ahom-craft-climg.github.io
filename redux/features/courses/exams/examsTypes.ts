
export interface ExamQuestionOption {
  id: number;
  quiz: string;
  option_text: string;
  is_correct: boolean;
  created_at: string;
  updated_at: string;
}

export interface ExamQuestion {
  quiz_id: number;
  module: string;
  question: string;
  questions: ExamQuestionOption[];
  explanation: string;
  created_at: string;
  updated_at: string;
}

export interface ExamAttemptResponse {
  exam_attempt_id: number;
  already_attempted_exam_attempts: number;
  total_number_exam_attempts: number;
  questions: ExamQuestion[];
}

// =========================
// Submit Exam Answer
// =========================

export interface SubmitExamAnswerPayload {
  attempt_number: number;
  quiz: number;
  selected_answer: number;
}

export interface ExamResult {
  id: number;
  user: number;
  attempt_number: number;
  quiz: number;
  selected_answer: number;
  is_correct: boolean;
  created_at: string;
}

export interface SubmitExamAnswerResponse {
  message: string;
  exam_result: ExamResult;
}

// =========================
// Exam Result Details
// GET /results/{module_id}/{attempt_id}/
// =========================

export interface IncorrectExam {
  id: number;
  user: number;
  quiz: number;
  module_name: string;
  lesson_video: string;
  quiz_question: string;
  selected_answer: number;
  selected_answer_text: string;
  correct_answer_text: string;
  explanation: string;
  is_correct: boolean;
  created_at: string;
}

export interface ExamResultDetails {
  attempt_number: number;
  incorrect_exams: IncorrectExam[];
}

export interface GetExamResultDetailsPayload {
  module_id: number;
  attempt_id: number;
}

// =========================
// Exam Result Summary
// GET /results/summary/{module_id}/
// =========================

export interface ExamAttemptSummary {
  UserExamAttempt_id: number;
  module_id: number;
  correct_answers: number;
  incorrect_answers: number;
  accuracy: number;
}

export interface ExamResultSummaryResponse {
  module_id: number;
  attempts: ExamAttemptSummary[];
}