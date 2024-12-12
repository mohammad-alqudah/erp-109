import React, { useState } from 'react';
import { Action } from '../../types/action';
import Modal from '../shared/Modal';
import FormField from '../shared/FormField';
import Button from '../shared/Button';

interface ActionFormProps {
  action?: Action | null;
  onClose: () => void;
}

export default function ActionForm({ action, onClose }: ActionFormProps) {
  const [formData, setFormData] = useState({
    name: action?.name || '',
    content: action?.content || '',
    condition: action?.condition || '',
    includeSurvey: action?.includeSurvey || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement form submission
    console.log('Form data:', formData);
    onClose();
  };

  return (
    <Modal title={action ? 'Edit Action' : 'Add Action'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter action name"
          required
        />

        <FormField
          label="Content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder="Enter message content"
          multiline
          rows={4}
          required
        />

        <FormField
          label="Condition"
          value={formData.condition}
          onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
          placeholder="Enter condition"
          required
        />

        <div className="flex items-center">
          <input
            type="checkbox"
            id="includeSurvey"
            checked={formData.includeSurvey}
            onChange={(e) => setFormData({ ...formData, includeSurvey: e.target.checked })}
            className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="includeSurvey" className="ml-2 block text-sm text-gray-900">
            Include Survey
          </label>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {action ? 'Update' : 'Add'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}