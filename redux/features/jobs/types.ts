interface User {
  id: number;
  username: string;
  email: string;
}

export type EmployeeType = 'full_time' | 'part_time' | 'contract' | 'internship';
export type JobType = 'remote' | 'hybrid' | 'onsite';

export interface Job {
  id: number;
  user: User;
  title: string;
  category: string;
  employee_type: EmployeeType;
  job_type: JobType;
  job_summary: string;
  key_responsibilities: string;
  job_requirements: string;
  job_location: string;
  salary_range: string;
  minimum_experience: string;
  deadline: string;
  job_banner: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deadline_status: string;
}

export type JobList = Job[];

export interface CreateJobRequest {
  title: string;
  category: number;
  employee_type: EmployeeType;
  job_type: JobType;
  job_summary: string;
  key_responsibilities: string;
  job_requirements: string;
  job_location: string;
  salary_range: string;
  minimum_experience: string;
  deadline: string;
  job_banner: string;
  is_active: boolean;
}

export interface CreateJobResponse {
  message: string;
  data: Job;
}

export interface UpdateJobRequest {
  title?: string;
  category?: number;
  employee_type?: EmployeeType;
  job_type?: JobType;
  job_summary?: string;
  key_responsibilities?: string;
  job_requirements?: string;
  job_location?: string;
  salary_range?: string;
  minimum_experience?: string;
  deadline?: string;
  job_banner?: string;
  is_active?: boolean;
}

export interface PaginatedJobResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: JobList;
}

// query params for GET /jobs/
export interface GetJobsParams {
  search?: string;
  employee_type?: EmployeeType;
  job_type?: JobType;
  category?: number;
  ordering?: string;
  is_active?: boolean;
  page?: number;
}