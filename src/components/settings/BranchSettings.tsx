import React from 'react';
import { useQuery } from 'react-query';
import { Building } from 'lucide-react';
import { getBranches } from '../../services/api/branchApi';
import BranchSwitcher from '../ui/BranchSwitcher';

export default function BranchSettings() {
  const { data: branchesResponse, isLoading } = useQuery('branches', getBranches);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Building className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-medium text-gray-900">Branch Settings</h2>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Select which branch you want to manage. Each branch has its own inventory and settings.
        </p>
      </div>
      
      <div className="px-6 py-4">
        <div className="max-w-xl">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Branch
          </label>
          <BranchSwitcher />
          
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Available Branches</h3>
            <div className="space-y-2">
              {branchesResponse?.data.map((branch) => (
                <div
                  key={branch.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Building className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-900">{branch.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">ID: {branch.id}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}