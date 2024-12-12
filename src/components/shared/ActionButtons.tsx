import React from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';
import ActionButton from './ActionButton';

interface ActionButtonsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  customActions?: Array<{
    icon: any;
    onClick: () => void;
    title: string;
    variant?: 'primary' | 'danger' | 'success' | 'info';
  }>;
}

export default function ActionButtons({ 
  onView, 
  onEdit, 
  onDelete,
  customActions = []
}: ActionButtonsProps) {
  return (
    <div className="flex gap-3">
      {onView && (
        <ActionButton
          icon={Eye}
          onClick={onView}
          title="View Details"
          variant="info"
        />
      )}
      {onEdit && (
        <ActionButton
          icon={Edit}
          onClick={onEdit}
          title="Edit"
          variant="primary"
        />
      )}
      {customActions.map((action, index) => (
        <ActionButton
          key={index}
          {...action}
        />
      ))}
      {onDelete && (
        <ActionButton
          icon={Trash2}
          onClick={onDelete}
          title="Delete"
          variant="danger"
        />
      )}
    </div>
  );
}