export interface BranchPermission {
  branch_id: number;
  branch_name: string;
  permissions: {
    '100_product': boolean;
    '200_customers': boolean;
    '300_messaging': boolean;
    '400_inventory': boolean;
    'G1_manual_scan': boolean;
  };
}

export interface User {
  id: string;
  username: string;
  email: string | null;
  first_name: string;
  last_name: string;
}

export interface UsersResponse {
  data: User[];
  status: boolean;
  detail: null | string;
}

export interface CreateUserData {
  username: string;
  password: string;
  email?: string;
  first_name: string;
  last_name: string;
  branch_permissions: BranchPermission[];
}

export interface UpdateUserData extends Partial<Omit<CreateUserData, 'password'>> {
  branch_permissions?: BranchPermission[];
}

export interface BranchPermissionsResponse {
  data: BranchPermission[];
  status: boolean;
  detail: null | string;
}