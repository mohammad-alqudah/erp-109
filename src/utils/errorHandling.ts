import { AxiosError } from 'axios';

interface ApiErrorResponse {
  error?: string;
  detail?: string;
  message?: string;
}

export const handleApiError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiErrorResponse | undefined;
    
    if (data?.error) return data.error;
    if (data?.detail) return data.detail;
    if (data?.message) return data.message;
    if (error.message) return error.message;
  }
  
  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred. Please try again.';
};