import React from 'react';
import { format } from 'date-fns';
import Modal from '../shared/Modal';
import { mockMessageHistory } from '../../utils/mockData';

interface HistoryModalProps {
  actionId: string;
  onClose: () => void;
}

export default function HistoryModal({ actionId, onClose }: HistoryModalProps) {
  return (
    <Modal title="Message History" onClose={onClose}>
      <div className="space-y-4">
        {mockMessageHistory.map((record) => (
          <div
            key={record.id}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  {record.customer_name}
                </h3>
                <p className="text-sm text-gray-500">{record.customer_phone}</p>
              </div>
              <span className="text-xs text-gray-500">
                {format(new Date(record.sent_at), 'MMM d, yyyy HH:mm')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}