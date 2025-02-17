import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Bell } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import AuthService from '../../services/authService';

const Navbar = ({ isSidebarCollapsed }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [tabs, setTabs] = useState([
    { path: '/', title: 'Dashboard', active: true },
  ]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  React.useEffect(() => {
    const currentPath = location.pathname;
    if (!tabs.find(tab => tab.path === currentPath)) {
      const newTab = {
        path: currentPath,
        title: currentPath.split('/').pop()?.charAt(0).toUpperCase() + currentPath.split('/').pop()?.slice(1) || 'Dashboard',
        active: true
      };
      setTabs(prevTabs => 
        prevTabs.map(tab => ({ ...tab, active: false })).concat(newTab)
      );
    } else {
      setTabs(prevTabs =>
        prevTabs.map(tab => ({
          ...tab,
          active: tab.path === currentPath
        }))
      );
    }
  }, [location]);

  const handleTabClick = (path) => {
    navigate(path);
  };

  const handleTabClose = (e, index) => {
    e.stopPropagation();
    if (tabs.length > 1) {
      if (tabs[index].path === '/') {
        return;
      }
      
      const newTabs = tabs.filter((_, i) => i !== index);
      setTabs(newTabs);
      if (tabs[index].active && newTabs.length > 0) {
        navigate(newTabs[newTabs.length - 1].path);
      }
    }
  };

  const handleLogout = () => {
    AuthService.logout();  // Hapus token dari sessionStorage
  
    setTimeout(() => {
      navigate('/auth/login', { replace: true });
    }, 500);
  };
  

  return (
    <nav className="fixed top-0 right-0 h-16 bg-white border-b border-gray-200 z-40"
         style={{ width: `calc(100% - ${isSidebarCollapsed ? '5rem' : '16rem'})` }}>
      <div className="h-full px-4 flex items-center">
        <div className="flex-1 flex items-center overflow-x-auto hide-scrollbar">
          <div className="flex space-x-1">
            {tabs.map((tab, index) => (
              <div
                key={index}
                onClick={() => handleTabClick(tab.path)}
                className={`flex items-center px-4 py-2 rounded-lg cursor-pointer ${
                  tab.active
                    ? 'bg-gray-100 text-blue-600'
                    : 'hover:bg-gray-50'
                }`}
              >
                <span className="text-sm font-medium whitespace-nowrap">{tab.title}</span>
                {tab.path !== '/' && tabs.length > 1 && (
                  <button
                    onClick={(e) => handleTabClose(e, index)}
                    className="ml-2 p-1 rounded-full hover:bg-gray-200"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 min-w-[120px]">
          <button className="p-2 hover:bg-gray-100 rounded-full relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <span className="hidden sm:inline text-sm font-medium">John Doe</span>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-gray-500">admin@example.com</p>
                </div>
                <button
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
