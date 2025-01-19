import axios from "axios";
import { ApiResponse } from "../models/models";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const handleApiError = <T>(error: unknown): ApiResponse<T> => {
  console.error(error);
  if (axios.isAxiosError(error) && error.response) {
    return {
      data: null,
      status: error.response.status,
      error: error.response.data || "An error occurred",
    };
  }
  return {
    data: null,
    status: 500,
    error: "An unexpected error occurred",
  };
};
