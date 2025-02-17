import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronDown, ChevronRight, Menu } from 'lucide-react';
import { LayoutDashboard, Users, Box, Table2, FormInput, Palette, Settings, FileText } from 'lucide-react'; // Impor semua icon yang mungkin
import { NavLink } from 'react-router-dom';

// Mapping icon string ke komponen icon yang sesuai
const iconMapping = {
  LayoutDashboard: <LayoutDashboard size={20} />,
  Users: <Users size={20} />,
  Box: <Box size={20} />,
  Table2: <Table2 size={20} />,
  FormInput: <FormInput size={20} />,
  Palette: <Palette size={20} />,
  Settings: <Settings size={20} />,
  FileText: <FileText size={20} />,
};

// MenuItem untuk menangani submenu dan icon
const MenuItem = ({ item, isCollapsed }) => {
  const [isOpen, setIsOpen] = useState(false);

  const renderIcon = (iconName) => {
    return iconMapping[iconName] || <div className="w-5 h-5" />; // Jika icon tidak ditemukan, tampilkan div kosong
  };

  if (item.children && item.children.length > 0) {
    return (
      <div className="mb-1">
        <button
          className="w-full flex items-center justify-between px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => !isCollapsed && setIsOpen(!isOpen)}
          title={isCollapsed ? item.name : undefined}
        >
          <div className="flex items-center">
            <div className="w-5 h-5 flex items-center justify-center">
              {renderIcon(item.icon)}
            </div>
            {!isCollapsed && <span className="ml-3">{item.name}</span>}
          </div>
          {!isCollapsed && (isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
        </button>
        {!isCollapsed && isOpen && (
          <div className="ml-8 mt-1 space-y-1">
            {item.children.map((subItem, index) => (
              <NavLink
                key={index}
                to={subItem.route}
                className={({ isActive }) =>
                  `block px-4 py-2 text-sm ${
                    isActive
                      ? 'text-blue-600 bg-blue-50 rounded-lg'
                      : 'text-gray-600 hover:bg-gray-100 rounded-lg'
                  }`
                }
              >
                {subItem.name}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <NavLink
      to={item.route}
      className={({ isActive }) =>
        `flex items-center px-4 py-2 mb-1 ${
          isActive
            ? 'text-blue-600 bg-blue-50 rounded-lg'
            : 'text-gray-600 hover:bg-gray-100 rounded-lg'
        }`
      }
      title={isCollapsed ? item.name : undefined}
    >
      <div className="w-5 h-5 flex items-center justify-center">
        {renderIcon(item.icon)}
      </div>
      {!isCollapsed && <span className="ml-3">{item.name}</span>}
    </NavLink>
  );
};

const Sidebar = ({ isCollapsed, onToggleSidebar }) => {
  const [menuItems, setMenuItems] = useState([]);

  // Ambil data menu dari API
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/menu/get-menu');
        if (response.data.success) {
          setMenuItems(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchMenuData();
  }, []);

  return (
    <aside className="fixed top-0 left-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-50"
      style={{ width: isCollapsed ? '5rem' : '16rem' }}>
      {/* Header */}
      <div className="h-16 border-b border-gray-200 flex items-center px-4 gap-4">
        <button 
          className="p-2 hover:bg-gray-100 rounded-lg"
          onClick={onToggleSidebar}
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <Menu size={20} />
          </div>
        </button>
        {!isCollapsed && (
          <h1 className="text-xl font-semibold text-gray-800 whitespace-nowrap">Admin Panel</h1>
        )}
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {menuItems.map((item, index) => (
          <MenuItem key={index} item={item} isCollapsed={isCollapsed} />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
