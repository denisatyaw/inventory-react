import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const TabBar = ({ tabs, activeTab, onTabClick, onCloseTab }) => {
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    onTabClick(tab.id);
    navigate(tab.path);
  };

  return (
    <div className="bg-white border-b flex items-center h-10 overflow-x-auto">
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
  );
}

export default TabBar;