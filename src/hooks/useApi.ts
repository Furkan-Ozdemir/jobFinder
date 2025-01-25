import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { axiosInstance, handleApiError } from "../lib/api";
import {
  ApiResponse,
  PaginatedApiResponse,
  PaginationMetadata,
} from "../models/models";

export interface PaginationParams {
  page?: number;
  limit?: number;
}

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

export const usePaginatedApiQuery = <TData = unknown>(
  queryKey: string[],
  url: string,
  pagination?: PaginationParams,
  options?: Omit<
    UseQueryOptions<PaginatedApiResponse<TData>, PaginatedApiResponse<TData>>,
    "queryKey" | "queryFn"
  >
) => {
  const finalUrl = new URL(url, window.location.origin);
  if (pagination?.page !== undefined) {
    finalUrl.searchParams.set("page", pagination.page.toString());
  }
  if (pagination?.limit !== undefined) {
    finalUrl.searchParams.set("limit", pagination.limit.toString());
  }

  return useQuery<PaginatedApiResponse<TData>, PaginatedApiResponse<TData>>({
    queryKey: [...queryKey, pagination?.page, pagination?.limit],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get<{
          data: TData;
          metadata: PaginationMetadata;
        }>(finalUrl.pathname + finalUrl.search);
        return {
          data: response.data.data,
          metadata: response.data.metadata,
        };
      } catch (error) {
        throw handleApiError<TData[]>(error);
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
        const config =
          variables instanceof FormData
            ? { headers: { "Content-Type": "multipart/form-data" } }
            : { headers: { "Content-Type": "application/json" } };

        const response = await axiosInstance.post<TData>(
          url,
          variables,
          config
        );
        console.log("response", response);
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
