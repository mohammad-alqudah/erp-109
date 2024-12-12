import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Building } from 'lucide-react';
import { getBranches, getBranchPermissions } from '../../services/api/branchApi';
import toast from 'react-hot-toast';

export default function BranchSwitcher() {
  const queryClient = useQueryClient();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const currentBranchId = user.branches?.[0]?.id;

  const { data: branchesResponse, isLoading } = useQuery('branches', getBranches);

  const switchBranchMutation = useMutation(
    async (branchId: number) => {
      const permissions = await getBranchPermissions(branchId);
      return { branchId, permissions: permissions.data };
    },
    {
      onSuccess: ({ branchId, permissions }) => {
        // Update the user's current branch and permissions in localStorage
        const updatedUser = { ...user };
        const selectedBranch = branchesResponse?.data.find(b => b.id === branchId);
        if (selectedBranch && updatedUser.branches) {
          updatedUser.branches[0] = { 
            id: selectedBranch.id, 
            name: selectedBranch.name,
            permissions
          };
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
        
        // Invalidate relevant queries
        queryClient.invalidateQueries('products');
        queryClient.invalidateQueries('customers');
        queryClient.invalidateQueries('users');
        
        toast.success('Branch switched successfully');
        
        // Force reload to apply new permissions
        window.location.reload();
      },
      onError: () => {
        toast.error('Failed to switch branch');
      },
    }
  );

  const handleBranchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const branchId = parseInt(e.target.value);
    if (branchId) {
      switchBranchMutation.mutate(branchId);
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse h-10 bg-gray-200 rounded"></div>
    );
  }

  if (!branchesResponse?.data.length) {
    return (
      <div className="text-sm text-gray-500">No branches available</div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Building className="h-5 w-5 text-gray-400" />
        </div>
        <select
          value={currentBranchId}
          onChange={handleBranchChange}
          className="block w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          disabled={switchBranchMutation.isLoading}
        >
          {branchesResponse.data.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.name}
            </option>
          ))}
        </select>
      </div>
      {switchBranchMutation.isLoading && (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
        </div>
      )}
    </div>
  );
}