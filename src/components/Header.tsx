import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Package } from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-indigo-600" />
            <h1 className="ml-2 text-2xl font-bold text-gray-900">Product Management</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">
              Welcome, {user.first_name} {user.last_name}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}