import axios from 'axios';

const api = axios.create({
  baseURL: localStorage.getItem('apiDomain') || 'https://demo.s3r.store',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface UsersResponse {
  data: User[];
  next: number | null;
  previous: number | null;
  count: number;
  status: boolean;
  detail: string | null;
}

export const getUsers = async (page = 1) => {
  const response = await api.get<UsersResponse>(`/auth/users/?page=${page}`);
  return response.data;
};

export const createUser = async (userData: any) => {
  const formData = new FormData();
  Object.entries(userData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value.toString());
    }
  });
  const response = await api.post('/auth/users/', formData);
  return response.data;
};

export const updateUser = async (id: string, userData: any) => {
  const formData = new FormData();
  Object.entries(userData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value.toString());
    }
  });
  const response = await api.put(`/auth/users/${id}/`, formData);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await api.delete(`/auth/users/${id}/`);
  return response.data;
};