import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { axiosInstance, handleApiError, ApiError } from "../lib/api";
import { ApiErrorResponse } from "../models/models";

type ApiResponse<T> = {
  data: T;
  status: number;
  error?: ApiErrorResponse;
};

export const useApiQuery = <TData = unknown>(
  queryKey: string[],
  url: string,
  options?: Omit<
    UseQueryOptions<ApiResponse<TData>, ApiErrorResponse>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<ApiResponse<TData>, ApiErrorResponse>({
    queryKey,
    queryFn: async () => {
      try {
        const response = await axiosInstance.get<TData>(url);
        return {
          data: response.data,
          status: response.status,
        };
      } catch (error) {
        const apiError = handleApiError(error);
        return {
          data: null as unknown as TData,
          status: apiError.status,
          error: apiError,
        };
      }
    },
    ...options,
  });
};

export const useApiMutation = <TData = unknown, TVariables = unknown>(
  url: string,
  options?: Omit<
    UseMutationOptions<ApiResponse<TData>, ApiErrorResponse, TVariables>,
    "mutationFn"
  >
) => {
  return useMutation<ApiResponse<TData>, ApiErrorResponse, TVariables>({
    mutationFn: async (variables) => {
      try {
        const response = await axiosInstance.post<TData>(url, variables);
        return {
          data: response.data,
          status: response.status,
        };
      } catch (error) {
        const apiError = handleApiError(error);
        return {
          data: null as unknown as TData,
          status: apiError.status,
          error: apiError,
        };
      }
    },
    ...options,
  });
};

export const useApiPut = <TData = unknown, TVariables = unknown>(
  url: string,
  options?: Omit<
    UseMutationOptions<ApiResponse<TData>, ApiErrorResponse, TVariables>,
    "mutationFn"
  >
) => {
  return useMutation<ApiResponse<TData>, ApiErrorResponse, TVariables>({
    mutationFn: async (variables) => {
      try {
        const response = await axiosInstance.put<TData>(url, variables);
        return {
          data: response.data,
          status: response.status,
        };
      } catch (error) {
        const apiError = handleApiError(error);
        return {
          data: null as unknown as TData,
          status: apiError.status,
          error: apiError,
        };
      }
    },
    ...options,
  });
};

export const useApiDelete = <TData = unknown>(
  url: string,
  options?: Omit<
    UseMutationOptions<ApiResponse<TData>, ApiErrorResponse, void>,
    "mutationFn"
  >
) => {
  return useMutation<ApiResponse<TData>, ApiErrorResponse, void>({
    mutationFn: async () => {
      try {
        const response = await axiosInstance.delete<TData>(url);
        return {
          data: response.data,
          status: response.status,
        };
      } catch (error) {
        const apiError = handleApiError(error);
        return {
          data: null as unknown as TData,
          status: apiError.status,
          error: apiError,
        };
      }
    },
    ...options,
  });
};
