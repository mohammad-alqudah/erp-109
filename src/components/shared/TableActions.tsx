import React, { ReactNode } from 'react';
import SearchField from './SearchField';

interface TableActionsProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  children?: ReactNode;
}

export default function TableActions({ 
  searchValue, 
  onSearchChange, 
  searchPlaceholder = "Search...",
  children 
}: TableActionsProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="w-96">
        <SearchField
          value={searchValue}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
        />
      </div>
      <div className="flex gap-4">
        {children}
      </div>
    </div>
  );
}