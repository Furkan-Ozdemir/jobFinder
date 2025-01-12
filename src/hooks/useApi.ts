import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { axiosInstance, handleApiError } from "../lib/api";
import { ApiResponse } from "../models/models";

export const useApiQuery = <TData = unknown>(
  queryKey: string[],
  url: string,
  options?: Omit<
    UseQueryOptions<ApiResponse<TData>, ApiResponse<TData>>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<ApiResponse<TData>, ApiResponse<TData>>({
    queryKey,
    queryFn: async () => {
      try {
        const response = await axiosInstance.get<TData>(url);
        return {
          data: response.data,
          status: response.status,
          error: null,
        };
      } catch (error) {
        throw handleApiError<TData>(error);
      }
    },
    ...options,
  });
};

export const useApiMutation = <TData = unknown, TVariables = unknown>(
  url: string,
  options?: Omit<
    UseMutationOptions<ApiResponse<TData>, ApiResponse<TData>, TVariables>,
    "mutationFn"
  >
) => {
  return useMutation<ApiResponse<TData>, ApiResponse<TData>, TVariables>({
    mutationFn: async (variables) => {
      try {
        const response = await axiosInstance.post<TData>(url, variables);
        return {
          data: response.data,
          status: response.status,
          error: null,
        };
      } catch (error) {
        throw handleApiError<TData>(error);
      }
    },
    ...options,
  });
};

export const useApiPut = <TData = unknown, TVariables = unknown>(
  url: string,
  options?: Omit<
    UseMutationOptions<ApiResponse<TData>, ApiResponse<TData>, TVariables>,
    "mutationFn"
  >
) => {
  return useMutation<ApiResponse<TData>, ApiResponse<TData>, TVariables>({
    mutationFn: async (variables) => {
      try {
        const response = await axiosInstance.put<TData>(url, variables);
        return {
          data: response.data,
          status: response.status,
          error: null,
        };
      } catch (error) {
        throw handleApiError<TData>(error);
      }
    },
    ...options,
  });
};

export const useApiDelete = <TData = unknown>(
  url: string,
  options?: Omit<
    UseMutationOptions<ApiResponse<TData>, ApiResponse<TData>, void>,
    "mutationFn"
  >
) => {
  return useMutation<ApiResponse<TData>, ApiResponse<TData>, void>({
    mutationFn: async () => {
      try {
        const response = await axiosInstance.delete<TData>(url);
        return {
          data: response.data,
          status: response.status,
          error: null,
        };
      } catch (error) {
        throw handleApiError<TData>(error);
      }
    },
    ...options,
  });
};
