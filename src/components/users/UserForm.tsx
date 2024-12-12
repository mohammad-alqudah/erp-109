import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { User } from '../../types/user';
import { getUserBranchPermissions } from '../../services/api/userPermissionsApi';
import Modal from '../shared/Modal';
import FormField from '../shared/FormField';
import Button from '../shared/Button';
import BranchPermissionsForm from './BranchPermissionsForm';

interface UserFormProps {
  user?: User | null;
  onSubmit: (formData: any) => void;
  onClose: () => void;
  isLoading: boolean;
  error?: string;
}

export default function UserForm({ user, onSubmit, onClose, isLoading, error }: UserFormProps) {
  const [branchPermissions, setBranchPermissions] = useState([]);

  const { data: permissionsData } = useQuery(
    ['userPermissions', user?.id],
    () => getUserBranchPermissions(user!.id),
    {
      enabled: !!user?.id,
      onSuccess: (response) => {
        setBranchPermissions(response.data);
      },
    }
  );

  useEffect(() => {
    if (!user && permissionsData) {
      setBranchPermissions(permissionsData.data.map(branch => ({
        ...branch,
        permissions: Object.fromEntries(
          Object.keys(branch.permissions).map(key => [key, false])
        ),
      })));
    }
  }, [user, permissionsData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, any> = {
      username: formData.get('username'),
      password: formData.get('password'),
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      email: formData.get('email'),
      branch_permissions: branchPermissions
    };

    // Remove empty values
    Object.keys(data).forEach(key => {
      if (data[key] === '' || data[key] === null) {
        delete data[key];
      }
    });

    onSubmit(data);
  };

  return (
    <Modal 
      title={user ? 'Edit User' : 'Add User'} 
      onClose={onClose}
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Username"
            name="username"
            defaultValue={user?.username}
            required={!user}
            disabled={!!user}
          />

          {!user && (
            <FormField
              label="Password"
              name="password"
              type="password"
              required
            />
          )}

          <FormField
            label="First Name"
            name="first_name"
            defaultValue={user?.first_name}
            required
          />

          <FormField
            label="Last Name"
            name="last_name"
            defaultValue={user?.last_name}
            required
          />

          <FormField
            label="Email"
            name="email"
            type="email"
            defaultValue={user?.email || ''}
          />
        </div>

        {branchPermissions.length > 0 && (
          <div className="border-t border-gray-200 pt-6">
            <BranchPermissionsForm
              branchPermissions={branchPermissions}
              onChange={setBranchPermissions}
              userId={user?.id}
              isEditing={!!user}
            />
          </div>
        )}

        <div className="flex justify-end gap-4 pt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isLoading || branchPermissions.length === 0}
          >
            {isLoading ? 'Saving...' : user ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}