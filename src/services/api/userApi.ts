import { api } from './baseApi';
import { User, CreateUserData, UpdateUserData } from '../../types/user';

export const getUsers = async (page = 1) => {
  const response = await api.get(`/auth/users/?page=${page}`);
  return response.data;
};

export const createUser = async (userData: CreateUserData) => {
  const formData = new FormData();
  
  // Add basic user info
  formData.append('username', userData.username);
  formData.append('password', userData.password);
  formData.append('first_name', userData.first_name);
  formData.append('last_name', userData.last_name);
  if (userData.email) {
    formData.append('email', userData.email);
  }

  const response = await api.post('/auth/users/', formData);
  return response.data;
};

export const updateUser = async (id: string, userData: UpdateUserData) => {
  const formData = new FormData();
  
  // Add user basic info
  if (userData.first_name) formData.append('first_name', userData.first_name);
  if (userData.last_name) formData.append('last_name', userData.last_name);
  if (userData.email) formData.append('email', userData.email);

  const response = await api.put(`/auth/users/${id}/`, formData);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await api.delete(`/auth/users/${id}/`);
  return response.data;
};