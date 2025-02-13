import React, { useState } from 'react';
import { ChevronDown, ChevronRight, LayoutDashboard, Users, Settings, Box, Table2, FormInput, Palette, Menu, MessageSquare, Bell, FileText, ListTodo } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const menuItems = [
  {
    title: 'Dashboard',
    icon: <LayoutDashboard size={20} />,
    path: '/'
  },
  {
    title: 'User Management',
    icon: <Users size={20} />,
    submenu: [
      { title: 'Users List', path: '/users' },
      { title: 'Roles', path: '/roles' },
      { title: 'Permissions', path: '/permissions' }
    ]
  },
  {
    title: 'Products',
    icon: <Box size={20} />,
    submenu: [
      { title: 'All Products', path: '/products' },
      { title: 'Categories', path: '/categories' },
      { title: 'Inventory', path: '/inventory' }
    ]
  },
  {
    title: 'Pages',
    icon: <FileText size={20} />,
    submenu: [
      { title: 'Todo List', path: '/pages/todo' }
    ]
  },
  {
    title: 'Tables',
    icon: <Table2 size={20} />,
    submenu: [
      { title: 'Basic Table', path: '/tables/basic' },
      { title: 'Data Table', path: '/tables/data' },
      { title: 'Advanced Table', path: '/tables/advanced' }
    ]
  },
  {
    title: 'Forms',
    icon: <FormInput size={20} />,
    submenu: [
      { title: 'Basic Form', path: '/forms/basic' },
      { title: 'Input Groups', path: '/forms/input-groups' },
      { title: 'Checkbox & Radio', path: '/forms/checkbox-radio' },
      { title: 'Date & Time', path: '/forms/datetime' }
    ]
  },
  {
    title: 'UI Elements',
    icon: <Palette size={20} />,
    submenu: [
      { title: 'Buttons', path: '/buttons' },
      { title: 'Cards', path: '/cards' },
      { title: 'Modals', path: '/modals' },
      { title: 'Notifications', path: '/notifications' }
    ]
  },
  {
    title: 'Settings',
    icon: <Settings size={20} />,
    path: '/settings'
  }
];

const MenuItem = ({ item, isCollapsed }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (item.submenu) {
    return (
      <div className="mb-1">
        <button
          className="w-full flex items-center justify-between px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => !isCollapsed && setIsOpen(!isOpen)}
          title={isCollapsed ? item.title : undefined}
        >
          <div className="flex items-center">
            <div className="w-5 h-5 flex items-center justify-center">
              {item.icon}
            </div>
            {!isCollapsed && <span className="ml-3">{item.title}</span>}
          </div>
          {!isCollapsed && (isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
        </button>
        {!isCollapsed && isOpen && (
          <div className="ml-8 mt-1 space-y-1">
            {item.submenu.map((subItem, index) => (
              <NavLink
                key={index}
                to={subItem.path}
                className={({ isActive }) =>
                  `block px-4 py-2 text-sm ${
                    isActive
                      ? 'text-blue-600 bg-blue-50 rounded-lg'
                      : 'text-gray-600 hover:bg-gray-100 rounded-lg'
                  }`
                }
              >
                {subItem.title}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `flex items-center px-4 py-2 mb-1 ${
          isActive
            ? 'text-blue-600 bg-blue-50 rounded-lg'
            : 'text-gray-600 hover:bg-gray-100 rounded-lg'
        }`
      }
      title={isCollapsed ? item.title : undefined}
    >
      <div className="w-5 h-5 flex items-center justify-center">
        {item.icon}
      </div>
      {!isCollapsed && <span className="ml-3">{item.title}</span>}
    </NavLink>
  );
};

const Sidebar = ({ isCollapsed, onToggleSidebar }) => {
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