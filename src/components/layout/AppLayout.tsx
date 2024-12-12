import React from 'react';
import { Toaster } from 'react-hot-toast';
import ResponsiveCheck from '../ResponsiveCheck';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <ResponsiveCheck>
      {children}
      <Toaster position="top-right" />
    </ResponsiveCheck>
  );
}