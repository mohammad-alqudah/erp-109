import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package, Users, MessageSquare, LogOut, UserCog, Settings } from 'lucide-react';
import Logo from './Logo';
import BranchSwitcher from './BranchSwitcher';

export default function Sidebar() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const permissions = user.branches?.[0]?.permissions || {};

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('apiDomain');
    window.location.href = '/login';
  };

  const menuItems = [
    { icon: Settings, label: 'Settings', path: '/settings', permission: true },
    { icon: Package, label: 'Products', path: '/products', permission: '100_product' },
    { icon: Users, label: 'Customers', path: '/customers', permission: '200_customers' },
    { icon: MessageSquare, label: 'Messaging', path: '/messaging', permission: '300_messaging' },
    { icon: UserCog, label: 'Users', path: '/users', permission: 'G1_manual_scan' },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.permission === true || permissions[item.permission as string]
  );

  return (
    <div className="flex flex-col h-screen w-64 bg-white border-r border-gray-200">
      <div className="p-6">
        <Logo />
      </div>
      
      <div className="flex-1 px-4 space-y-2">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="text-indigo-600 font-semibold">
              {user.first_name?.[0]}
              {user.last_name?.[0]}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              {user.first_name} {user.last_name}
            </p>
            <p className="text-xs text-gray-500">{user.branches?.[0]?.name}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 w-full px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}