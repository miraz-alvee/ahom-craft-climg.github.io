export interface ApplicationUser {
  user_id: number;
  full_name: string;
  email: string;
}

export interface ApplicationJob {
  job_id: number;
  title: string;
  job_location: string;
  salary_range: string;
  job_banner: string;
  job_progress: ApplicationStatus;
}

export interface JobApplication {
  application_id: number;
  user: ApplicationUser;
  job: ApplicationJob;
  score: number;
  resume: string;
  expected_salary: string;
  applied_at: string;
}

export interface CreateApplicationRequest {
  job: number;
  resume: File | string;
  expected_salary?: string;
  score?: number;
}

export interface CreateApplicationResponse {
  message: string;
  application: JobApplication;
}

export type JobApplicationList = JobApplication[];

export interface PaginatedApplicationResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: JobApplicationList;
}

export type ApplicationStatus = 'in_progress' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';