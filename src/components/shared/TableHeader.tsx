import React from 'react';
import { LucideIcon } from 'lucide-react';

interface TableHeaderProps {
  title: string;
  icon: LucideIcon;
  totalCount?: number;
  totalLabel?: string;
}

export default function TableHeader({ 
  title, 
  icon: Icon, 
  totalCount, 
  totalLabel = 'Total'
}: TableHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-3">
        <Icon className="h-6 w-6 text-gray-500" />
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      </div>
      {totalCount !== undefined && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full">
            {totalLabel}: {totalCount.toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
}