import React from 'react';
import Modal from '../shared/Modal';
import FormField from '../shared/FormField';
import Button from '../shared/Button';

interface UserBasicFormProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
  isLoading: boolean;
  error?: string;
}

export default function UserBasicForm({ onSubmit, onClose, isLoading, error }: UserBasicFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      username: formData.get('username'),
      password: formData.get('password'),
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      email: formData.get('email'),
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
      title="Add User - Basic Information" 
      onClose={onClose}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <FormField
            label="Username"
            name="username"
            required
          />

          <FormField
            label="Password"
            name="password"
            type="password"
            required
          />

          <FormField
            label="First Name"
            name="first_name"
            required
          />

          <FormField
            label="Last Name"
            name="last_name"
            required
          />

          <FormField
            label="Email"
            name="email"
            type="email"
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Next'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}