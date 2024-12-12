import React from 'react';
import { Package } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Package className="h-8 w-8 text-indigo-600" />
      <span className="text-xl font-bold text-gray-900">Inventory Pro</span>
    </div>
  );
}