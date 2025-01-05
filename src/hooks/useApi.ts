import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { axiosInstance, handleApiError, ApiError } from "../lib/api";

type ApiResponse<T> = {
  data: T;
  status: number;
};

export const useApiQuery = <TData = unknown>(
  queryKey: string[],
  url: string,
  options?: Omit<
    UseQueryOptions<ApiResponse<TData>, ApiError>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<ApiResponse<TData>, ApiError>({
    queryKey,
    queryFn: async () => {
      try {
        const response = await axiosInstance.get<TData>(url);
        return {
          data: response.data,
          status: response.status,
        };
      } catch (error) {
        throw handleApiError(error);
      }
    },
    ...options,
  });
};

export const useApiMutation = <TData = unknown, TVariables = unknown>(
  url: string,
  options?: Omit<
    UseMutationOptions<ApiResponse<TData>, ApiError, TVariables>,
    "mutationFn"
  >
) => {
  return useMutation<ApiResponse<TData>, ApiError, TVariables>({
    mutationFn: async (variables) => {
      try {
        const response = await axiosInstance.post<TData>(url, variables);
        return {
          data: response.data,
          status: response.status,
        };
      } catch (error) {
        throw handleApiError(error);
      }
    },
    ...options,
  });
};

export const useApiPut = <TData = unknown, TVariables = unknown>(
  url: string,
  options?: Omit<
    UseMutationOptions<ApiResponse<TData>, ApiError, TVariables>,
    "mutationFn"
  >
) => {
  return useMutation<ApiResponse<TData>, ApiError, TVariables>({
    mutationFn: async (variables) => {
      try {
        const response = await axiosInstance.put<TData>(url, variables);
        return {
          data: response.data,
          status: response.status,
        };
      } catch (error) {
        throw handleApiError(error);
      }
    },
    ...options,
  });
};

export const useApiDelete = <TData = unknown>(
  url: string,
  options?: Omit<
    UseMutationOptions<ApiResponse<TData>, ApiError, void>,
    "mutationFn"
  >
) => {
  return useMutation<ApiResponse<TData>, ApiError, void>({
    mutationFn: async () => {
      try {
        const response = await axiosInstance.delete<TData>(url);
        return {
          data: response.data,
          status: response.status,
        };
      } catch (error) {
        throw handleApiError(error);
      }
    },
    ...options,
  });
};
