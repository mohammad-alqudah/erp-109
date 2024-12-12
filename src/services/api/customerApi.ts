import { api, PaginatedResponse, ApiResponse } from './baseApi';
import { Customer, CreateCustomerData, UpdateCustomerData } from '../../types/customer';
import { createFormData } from '../../utils/formData';

export const getCustomers = async (page = 1): Promise<PaginatedResponse<Customer>> => {
  const response = await api.get<PaginatedResponse<Customer>>(`/customers/customers/?page=${page}`);
  return response.data;
};

export const createCustomer = async (customerData: CreateCustomerData): Promise<ApiResponse<Customer>> => {
  const formData = createFormData(customerData);
  const response = await api.post<ApiResponse<Customer>>('/customers/customers/', formData);
  return response.data;
};

export const updateCustomer = async (id: string, customerData: UpdateCustomerData): Promise<ApiResponse<Customer>> => {
  const formData = createFormData(customerData);
  const response = await api.put<ApiResponse<Customer>>(`/customers/customers/${id}/`, formData);
  return response.data;
};

export const deleteCustomer = async (id: string): Promise<ApiResponse<string>> => {
  const response = await api.delete<ApiResponse<string>>(`/customers/customers/${id}/`);
  return response.data;
};