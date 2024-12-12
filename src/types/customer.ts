export interface Customer {
  id: string;
  email: string | null;
  first_name: string;
  last_name: string;
  phone_number: string | null;
}

export interface CreateCustomerData {
  email?: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
}

export interface UpdateCustomerData extends Partial<CreateCustomerData> {}