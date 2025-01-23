import React, { useState } from 'react';
import { Bell, User, LogOut, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';

const Navbar = ({ tabs, activeTab, onTabClick, onCloseTab, maxTabs }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabClick = (tab) => {
    onTabClick(tab.id);
    navigate(tab.path);
  };

  const handleLogout = () => {
    // Clear authentication state
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const user = JSON.parse(localStorage.getItem('user') || '{"email": "admin@admin.com"}');

  return (
    <div className="bg-white border-b">
      {/* Top bar with profile */}
      <div className="h-16 px-4 flex items-center justify-between border-b">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
          {tabs.length >= maxTabs && (
            <span className="text-sm text-amber-600">
              Tab limit reached ({maxTabs} max)
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="relative">
            <button
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-gray-700">{user.email}</span>
            </button>
            
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border z-50">
                <button
                  onClick={() => navigate('/profile')}
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 w-full"
                >
                  <User size={16} className="mr-2" />
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 w-full"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex items-center h-10 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = LucideIcons[tab.icon];
          return (
            <div
              key={tab.id}
              className={`
                flex items-center min-w-[160px] max-w-[200px] h-full px-4
                border-r cursor-pointer group
                ${activeTab === tab.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}
              `}
              onClick={() => handleTabClick(tab)}
            >
              <div className="flex items-center space-x-2 flex-1 overflow-hidden">
                {Icon && <Icon size={16} />}
                <span className="truncate">{tab.title}</span>
              </div>
              {tabs.length > 1 && (
                <button
                  className="ml-2 p-1 rounded-full hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseTab(tab.id);
                  }}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;