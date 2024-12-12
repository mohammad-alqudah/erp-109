import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getUsers, createUser, updateUser, deleteUser } from '../../services/api/userApi';
import { handleApiError } from '../../utils/errorHandling';
import toast from 'react-hot-toast';

export const useUserManagement = (page: number) => {
  const queryClient = useQueryClient();

  const {
    data: usersData,
    isLoading,
    error,
  } = useQuery(['users', page], () => getUsers(page), {
    keepPreviousData: true,
  });

  const createMutation = useMutation(createUser, {
    onSuccess: (response) => {
      if (response.status) {
        queryClient.invalidateQueries('users');
        return response.data;
      }
      throw new Error(response.detail || 'Failed to create user');
    },
    onError: (error) => {
      throw error;
    },
  });

  const updateMutation = useMutation(
    ({ id, data }) => updateUser(id, data),
    {
      onSuccess: (response) => {
        if (response.status) {
          queryClient.invalidateQueries('users');
          toast.success('User updated successfully');
        } else {
          throw new Error(response.detail || 'Failed to update user');
        }
      },
      onError: (error) => {
        throw error;
      },
    }
  );

  const deleteMutation = useMutation(deleteUser, {
    onSuccess: (response) => {
      if (response.status) {
        queryClient.invalidateQueries('users');
        toast.success('User deleted successfully');
      } else {
        throw new Error(response.detail || 'Failed to delete user');
      }
    },
    onError: (error) => {
      toast.error(handleApiError(error));
    },
  });

  return {
    users: usersData?.data || [],
    totalCount: usersData?.count || 0,
    isLoading,
    error,
    createUser: createMutation.mutate,
    updateUser: updateMutation.mutate,
    deleteUser: deleteMutation.mutate,
    isCreating: createMutation.isLoading,
    isUpdating: updateMutation.isLoading,
    isDeleting: deleteMutation.isLoading,
  };
};