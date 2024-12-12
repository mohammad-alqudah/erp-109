import axios from 'axios';

export const api = axios.create();

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  const domain = localStorage.getItem('apiDomain') || 'https://demo.s3r.store';
  
  config.baseURL = domain;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const login = async (username: string, password: string) => {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  
  const response = await api.post('/auth/login', formData);
  return response.data;
};

// Products API
export const getProducts = async (page = 1) => {
  const response = await api.get(`/products/products?page=${page}`);
  return response.data;
};

export const addProduct = async (product: any) => {
  const formData = new FormData();
  Object.entries(product).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      formData.append(key, value.toString());
    }
  });
  
  const response = await api.post('/products/products', formData);
  return response.data;
};

export const updateProduct = async (id: string, product: any) => {
  const formData = new FormData();
  Object.entries(product).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      formData.append(key, value.toString());
    }
  });
  
  const response = await api.put(`/products/products/${id}/`, formData);
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/products/products/${id}/`);
  return response.data;
};

// File Processing API
export const extractHeaders = async (file: File, skippedRows: number) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('skipped_rows', skippedRows.toString());
  
  const response = await api.post('/products/extract-headers/', formData);
  return response.data;
};

export const importProducts = async (
  file: File,
  mappings: {
    name: string;
    barcode: string;
    quantity?: string;
    price?: string;
  },
  skippedRows: number
) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('skipped_rows', skippedRows.toString());
  
  // Only append non-empty mappings
  Object.entries(mappings).forEach(([key, value]) => {
    if (value) {
      formData.append(key, value);
    }
  });
  
  const response = await api.post('/products/import-products/', formData);
  return response.data;
};