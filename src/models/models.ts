export interface ApiResponse<T> {
  data: T | null;
  status: number;
  error: string | null;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  personType: string;
}

export interface RegisterResponseData {
  user: User;
  token: string;
}

export type RegisterResponse = ApiResponse<RegisterResponseData>;

export interface LoginRequest {
  email: string;
  password: string;
}

export type LoginResponse = ApiResponse<RegisterResponseData>;

export interface PostJobRequest {
  role: string;
  about_the_company: string;
  role_description: string;
  required_skills: string[];
  responsibilities: string[];
  employment_type: string;
  experience_level: string;
  work_model: string;
  salesPitch: string;
  additionalInfo: string;
  company_name: string | undefined;
}

export interface Job {
  _id: string;
  role: string;
  about_the_company: string;
  role_description: string;
  required_skills: string[];
  responsibilities: string[];
  employment_type: string;
  experience_level: string;
  work_model: string;
  salesPitch: string;
  additionalInfo: string;
  company_name: string;
}

export type PostJobResponse = ApiResponse<Job>;

export interface User {
  fullName: string;
  email: string;
  personType: string;
  company_name?: string;
}

export type JobCategoryResponse = ApiResponse<JobCategory[]>;

export interface JobCategory {
  _id: string;
  category_name: string;
  description: string;
  total_listings_count: string;
  img_path: string;
}

export interface Company {
  _id: string;
  company_name: string;
  address: string;
  category: string;
  people_count: number;
  company_locations: string[];
  img_path: string;
}

export interface Filters {
  _id: string;
  value: string;
  label: string;
}

export type JobType = Filters;
export type ExperienceLevel = Filters;
export type LocationType = Filters;
export type DatePosted = Filters;
export type Salary = Filters;

export interface PaginationMetadata {
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export interface PaginatedApiResponse<T> {
  data: T;
  metadata: PaginationMetadata;
}
