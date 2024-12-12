import React from 'react';
import { Smartphone, Monitor } from 'lucide-react';

export default function ResponsiveCheck({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Mobile Warning - Only shown on small screens */}
      <div className="lg:hidden fixed inset-0 bg-white z-50 p-8 flex flex-col items-center justify-center text-center">
        <Monitor className="w-16 h-16 text-indigo-600 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Desktop Access Only</h1>
        <p className="text-gray-600 max-w-md mx-auto mb-4">
          We apologize, but this application is optimized for desktop use only. Please access it from a device with a larger screen for the best experience.
        </p>
        <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg">
          <Smartphone className="w-5 h-5" />
          <span className="text-sm">Minimum screen width: 1024px</span>
        </div>
      </div>

      {/* Main content - Only shown on large screens */}
      <div className="hidden lg:block h-full">
        {children}
      </div>
    </>
  );
}