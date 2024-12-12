import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  title: string;
  variant?: 'primary' | 'danger' | 'success' | 'info';
}

export default function ActionButton({ 
  icon: Icon, 
  onClick, 
  title,
  variant = 'primary' 
}: ActionButtonProps) {
  const variantClasses = {
    primary: 'text-indigo-600 hover:text-indigo-900',
    danger: 'text-red-600 hover:text-red-900',
    success: 'text-green-600 hover:text-green-700',
    info: 'text-blue-600 hover:text-blue-900',
  };

  return (
    <button
      onClick={onClick}
      className={variantClasses[variant]}
      title={title}
    >
      <Icon size={20} />
    </button>
  );
}