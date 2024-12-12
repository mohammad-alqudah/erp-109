import React, { InputHTMLAttributes } from 'react';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
}

export default function FormField({ label, type = 'text', multiline = false, rows = 4, ...props }: FormFieldProps) {
  const inputClasses = "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent";
  
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {multiline ? (
        <textarea
          {...(props as any)}
          rows={rows}
          className={`${inputClasses} resize-none`}
        />
      ) : (
        <input
          {...(props as any)}
          type={type}
          className={`${inputClasses} h-10`}
        />
      )}
    </div>
  );
}