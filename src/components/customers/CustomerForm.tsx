import React from 'react';
import { Customer, CreateCustomerData } from '../../types/customer';
import Modal from '../shared/Modal';
import FormField from '../shared/FormField';
import Button from '../shared/Button';

interface CustomerFormProps {
  customer?: Customer | null;
  onSubmit: (formData: CreateCustomerData) => void;
  onClose: () => void;
  isLoading: boolean;
  error?: string;
}

export default function CustomerForm({
  customer,
  onSubmit,
  onClose,
  isLoading,
  error
}: CustomerFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: CreateCustomerData = {
      first_name: formData.get('first_name') as string,
      last_name: formData.get('last_name') as string,
    };

    const email = formData.get('email') as string;
    if (email) {
      data.email = email;
    }

    const phone_number = formData.get('phone_number') as string;
    if (phone_number) {
      data.phone_number = phone_number;
    }

    onSubmit(data);
  };

  return (
    <Modal title={customer ? 'Edit Customer' : 'Add Customer'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <FormField
          label="First Name"
          name="first_name"
          defaultValue={customer?.first_name}
          required
        />

        <FormField
          label="Last Name"
          name="last_name"
          defaultValue={customer?.last_name}
          required
        />

        <FormField
          label="Email"
          name="email"
          type="email"
          defaultValue={customer?.email || ''}
        />

        <FormField
          label="Phone Number"
          name="phone_number"
          type="tel"
          defaultValue={customer?.phone_number || ''}
          placeholder="+1234567890"
        />

        <div className="flex justify-end gap-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : customer ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}