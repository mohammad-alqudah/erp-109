import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getUserBranchPermissions, updateUserPermission } from '../../services/api/userPermissionsApi';
import { handleApiError } from '../../utils/errorHandling';
import toast from 'react-hot-toast';

export const useUserPermissions = (userId: string) => {
  const queryClient = useQueryClient();

  const {
    data: permissionsData,
    isLoading,
    error,
  } = useQuery(
    ['userPermissions', userId],
    () => getUserBranchPermissions(userId),
    {
      enabled: !!userId,
    }
  );

  const updatePermissionMutation = useMutation(
    (data: { branchId: number; permission: string; isPermitted: boolean }) =>
      updateUserPermission({
        user_id: userId,
        branch_id: data.branchId,
        permission: data.permission,
        is_permitted: data.isPermitted,
      }),
    {
      onError: (error) => {
        toast.error(handleApiError(error));
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['userPermissions', userId]);
      },
    }
  );

  return {
    permissions: permissionsData?.data || [],
    isLoading,
    error,
    updatePermission: updatePermissionMutation.mutate,
    isUpdating: updatePermissionMutation.isLoading,
  };
};