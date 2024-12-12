export interface MessageHistory {
  id: string;
  customer_name: string;
  customer_phone: string;
  sent_at: string;
}

export interface MessageHistoryResponse {
  data: MessageHistory[];
  status: boolean;
  detail: string | null;
}