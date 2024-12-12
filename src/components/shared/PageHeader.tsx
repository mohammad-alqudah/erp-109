import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: LucideIcon;
}

export default function PageHeader({ title, description, action, icon: Icon }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-6 h-6 text-gray-500" />}
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </div>
        {action}
      </div>
      {description && (
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
}