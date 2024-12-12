import { api } from './baseApi';
import { BranchPermissionsResponse } from '../../types/user';

interface UpdatePermissionData {
  user_id: string;
  branch_id: number;
  permission: string;
  is_permitted: boolean;
}

export const getUserBranchPermissions = async (userId: string): Promise<BranchPermissionsResponse> => {
  const response = await api.get(`/auth/branches/permissions/all?user_id=${userId}`);
  return response.data;
};

export const updateUserPermission = async (data: UpdatePermissionData) => {
  const response = await api.post('/auth/update-permissions/', data);
  return response.data;
};