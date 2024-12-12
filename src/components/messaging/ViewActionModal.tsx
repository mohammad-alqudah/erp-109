import React, { useState } from 'react';
import Modal from '../shared/Modal';
import Button from '../shared/Button';
import { mockCustomers, mockActions } from '../../utils/mockData';

interface ViewActionModalProps {
  actionId: string;
  onClose: () => void;
}

export default function ViewActionModal({ actionId, onClose }: ViewActionModalProps) {
  const [autoApply, setAutoApply] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const action = mockActions.find(a => a.id === actionId);

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setSelectedCustomers(checked ? mockCustomers.map(c => c.id) : []);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCustomers.length === 0) {
      alert('Please select at least one customer');
      return;
    }
    console.log('Sending message:', {
      actionId,
      selectedCustomers,
      autoApply
    });
    onClose();
  };

  return (
    <Modal title={`Send Message: ${action?.name}`} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="autoApply"
            checked={autoApply}
            onChange={(e) => setAutoApply(e.target.checked)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="autoApply" className="text-sm font-medium text-gray-700">
            Auto Apply
          </label>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">
              Select Recipients
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="selectAll"
                checked={selectAll}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="selectAll" className="text-sm text-gray-600">
                Select All
              </label>
            </div>
          </div>
          
          <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md p-2">
            {mockCustomers.map((customer) => (
              <div key={customer.id} className="flex items-center space-x-2 py-2 hover:bg-gray-50">
                <input
                  type="checkbox"
                  id={`customer-${customer.id}`}
                  checked={selectedCustomers.includes(customer.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCustomers([...selectedCustomers, customer.id]);
                    } else {
                      setSelectedCustomers(selectedCustomers.filter(id => id !== customer.id));
                      setSelectAll(false);
                    }
                  }}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={`customer-${customer.id}`}
                  className="flex-1 text-sm text-gray-700 cursor-pointer"
                >
                  <div>{customer.first_name} {customer.last_name}</div>
                  <div className="text-xs text-gray-500">
                    {customer.email && <span className="mr-2">{customer.email}</span>}
                    {customer.phone_number && <span>{customer.phone_number}</span>}
                  </div>
                </label>
              </div>
            ))}
          </div>
          
          <div className="text-sm text-gray-500">
            Selected: {selectedCustomers.length} customer(s)
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={selectedCustomers.length === 0}
          >
            Send Message
          </Button>
        </div>
      </form>
    </Modal>
  );
}