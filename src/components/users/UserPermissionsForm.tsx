import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getUserBranchPermissions } from '../../services/api/userPermissionsApi';
import Modal from '../shared/Modal';
import Button from '../shared/Button';
import BranchPermissionsForm from './BranchPermissionsForm';

interface UserPermissionsFormProps {
  userId: string;
  onComplete: () => void;
  onClose: () => void;
}

export default function UserPermissionsForm({ userId, onComplete, onClose }: UserPermissionsFormProps) {
  const [branchPermissions, setBranchPermissions] = useState([]);

  const { data: permissionsData, isLoading } = useQuery(
    ['userPermissions', userId],
    () => getUserBranchPermissions(userId),
    {
      onSuccess: (response) => {
        setBranchPermissions(response.data);
      },
    }
  );

  if (isLoading) {
    return (
      <Modal title="Loading Permissions" onClose={onClose}>
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal 
      title="Set User Permissions" 
      onClose={onClose}
      maxWidth="lg"
    >
      <div className="space-y-6">
        <div className="max-h-[60vh] overflow-y-auto px-1">
          <BranchPermissionsForm
            branchPermissions={branchPermissions}
            onChange={setBranchPermissions}
            userId={userId}
            isEditing={true}
          />
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onComplete}>
            Complete
          </Button>
        </div>
      </div>
    </Modal>
  );
}