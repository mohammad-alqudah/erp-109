import React, { ButtonHTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  icon?: LucideIcon;
}

export default function Button({ 
  variant = 'primary', 
  icon: Icon,
  children,
  className = '',
  ...props 
}: ButtonProps) {
  const baseClasses = "px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center gap-2";
  
  const variantClasses = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary: "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-indigo-500",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={20} />}
      {children}
    </button>
  );
}