import { api, ApiResponse, PaginatedResponse } from './baseApi';
import { MessageHistory } from '../../types/messageHistory';

interface SendMessageRequest {
  actionId: string;
  customerIds: string[];
  autoApply: boolean;
}

export const sendMessage = async (data: SendMessageRequest): Promise<ApiResponse<string>> => {
  const formData = new FormData();
  formData.append('action_id', data.actionId);
  formData.append('auto_apply', data.autoApply.toString());
  data.customerIds.forEach(id => {
    formData.append('customer_ids', id);
  });

  const response = await api.post<ApiResponse<string>>('/messaging/send/', formData);
  return response.data;
};

export const getMessageHistory = async (actionId: string, page = 1): Promise<PaginatedResponse<MessageHistory>> => {
  const response = await api.get<PaginatedResponse<MessageHistory>>(`/messaging/history/${actionId}/?page=${page}`);
  return response.data;
};