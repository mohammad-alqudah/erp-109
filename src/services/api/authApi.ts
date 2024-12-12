import { api } from './baseApi';
import { LoginResponse } from '../../types/auth';

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  
  const response = await api.post<LoginResponse>('/auth/login/', formData);
  return response.data;
};