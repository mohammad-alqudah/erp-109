import { api } from './baseApi';
import { BranchesResponse, BranchPermissionsResponse } from '../../types/branch';

export const getBranches = async (): Promise<BranchesResponse> => {
  const response = await api.get<BranchesResponse>('/auth/branches/');
  return response.data;
};

export const getBranchPermissions = async (branchId: number): Promise<BranchPermissionsResponse> => {
  const response = await api.get<BranchPermissionsResponse>(`/auth/branches/${branchId}/permissions`);
  return response.data;
};

export const switchBranch = async (branchId: number): Promise<void> => {
  const formData = new FormData();
  formData.append('branch_id', branchId.toString());
  await api.post('/auth/switch-branch/', formData);
};