import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

const TabBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tabs, setTabs] = useState([
    { path: '/', title: 'Dashboard', active: true },
  ]);

  // Update active tab when location changes
  React.useEffect(() => {
    const currentPath = location.pathname;
    if (!tabs.find(tab => tab.path === currentPath)) {
      // Add new tab
      const newTab = {
        path: currentPath,
        title: currentPath.split('/').pop()?.charAt(0).toUpperCase() + currentPath.split('/').pop()?.slice(1) || 'Dashboard',
        active: true
      };
      setTabs(prevTabs => 
        prevTabs.map(tab => ({ ...tab, active: false })).concat(newTab)
      );
    } else {
      // Update active state of existing tabs
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
      const newTabs = tabs.filter((_, i) => i !== index);
      setTabs(newTabs);
      if (tabs[index].active && newTabs.length > 0) {
        navigate(newTabs[newTabs.length - 1].path);
      }
    }
  };

  return (
    <div className="h-16 bg-gray-50 border-b border-gray-200 flex items-center px-4">
      <div className="flex space-x-1 overflow-x-auto hide-scrollbar">
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => handleTabClick(tab.path)}
            className={`flex items-center px-4 py-2 rounded-t-lg cursor-pointer ${
              tab.active
                ? 'bg-white border-t-2 border-blue-500 border-x border-b-white border-gray-200'
                : 'hover:bg-gray-100'
            }`}
          >
            <span className="text-sm font-medium">{tab.title}</span>
            {tabs.length > 1 && (
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
  );
};

export default TabBar;