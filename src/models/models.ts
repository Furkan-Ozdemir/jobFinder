export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  personType: string;
}
export interface RegisterResponse {
  user: {
    _id: string;
    fullName: string;
    email: string;
    personType: string;
  };
  token: string;
}

export interface ApiErrorResponse {
  message: string;
  code?: string;
  status: number;
  details?: Record<string, unknown>;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface PostJobRequest {
  jobTitle: string;
  aboutCompany: string;
  roleDescription: string;
  requirements: string[];
  responsibilities: string[];
  jobType: string;
  experience: string;
  salesPitch: string;
  additionalInfo: string;
}
