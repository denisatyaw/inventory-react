import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ChevronDown, 
  ChevronRight,
  ChevronFirst,
  ChevronLast,
  LayoutDashboard, 
  Users, 
  Settings, 
  Box, 
  FileText, 
  BarChart2, 
  Calendar, 
  Mail, 
  MessageSquare,
  ShieldAlert,
  Database,
  Trello
} from 'lucide-react';

const menuItems = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard'
  },
  {
    title: 'User Management',
    icon: Users,
    submenu: [
      { id: 'users', title: 'User List', path: '/users', icon: Users },
      { id: 'roles', title: 'User Roles', path: '/roles', icon: ShieldAlert },
      { id: 'permissions', title: 'Permissions', path: '/permissions', icon: Database }
    ]
  },
  {
    title: 'Products',
    icon: Box,
    submenu: [
      { id: 'products', title: 'Product List', path: '/products', icon: Box },
      { id: 'categories', title: 'Categories', path: '/categories', icon: FileText },
      { id: 'inventory', title: 'Inventory', path: '/inventory', icon: Database }
    ]
  },
  {
    title: 'Task Management',
    icon: Trello,
    submenu: [
      { id: 'kanban', title: 'Kanban Board', path: '/kanban', icon: Trello },
      { id: 'tasks', title: 'Task List', path: '/tasks', icon: FileText }
    ]
  },
  {
    title: 'Reports',
    icon: FileText,
    submenu: [
      { id: 'sales-report', title: 'Sales Report', path: '/reports/sales', icon: BarChart2 },
      { id: 'analytics-report', title: 'Analytics', path: '/reports/analytics', icon: BarChart2 },
      { id: 'export-data', title: 'Export Data', path: '/reports/export', icon: FileText }
    ]
  },
  {
    id: 'analytics',
    title: 'Analytics',
    icon: BarChart2,
    path: '/analytics'
  },
  {
    id: 'calendar',
    title: 'Calendar',
    icon: Calendar,
    path: '/calendar'
  },
  {
    title: 'Messages',
    icon: Mail,
    submenu: [
      { id: 'inbox', title: 'Inbox', path: '/messages/inbox', icon: Mail },
      { id: 'sent', title: 'Sent', path: '/messages/sent', icon: Mail },
      { id: 'drafts', title: 'Drafts', path: '/messages/drafts', icon: FileText }
    ]
  },
  {
    id: 'chat',
    title: 'Chat',
    icon: MessageSquare,
    path: '/chat'
  },
  {
    title: 'Security',
    icon: ShieldAlert,
    submenu: [
      { id: 'security-logs', title: 'Logs', path: '/security/logs', icon: FileText },
      { id: 'security-settings', title: 'Security Settings', path: '/security/settings', icon: Settings }
    ]
  },
  {
    title: 'Master Data',
    icon: Database,
    submenu: [
      { id: 'customers', title: 'Customers', path: '/master/customers', icon: Users },
      { id: 'suppliers', title: 'Suppliers', path: '/master/suppliers', icon: Box },
      { id: 'employees', title: 'Employees', path: '/master/employees', icon: Users }
    ]
  },
  {
    title: 'Settings',
    icon: Settings,
    submenu: [
      { id: 'general-settings', title: 'General', path: '/settings/general', icon: Settings },
      { id: 'security-settings', title: 'Security', path: '/settings/security', icon: ShieldAlert },
      { id: 'notifications', title: 'Notifications', path: '/settings/notifications', icon: Mail },
      { id: 'backup', title: 'Backup', path: '/settings/backup', icon: Database }
    ]
  }
];

const Sidebar = ({ onMenuClick, theme }) => {
  const [expandedItems, setExpandedItems] = useState({});
  const [isExpanded, setIsExpanded] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSubmenu = (title) => {
    setExpandedItems(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const handleNavigation = (item) => {
    if (item.path) {
      navigate(item.path);
      onMenuClick({
        id: item.id,
        title: item.title,
        path: item.path,
        icon: item.icon.name
      });
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div 
      className={`bg-white border-r transition-all duration-300 flex flex-col ${
        isExpanded ? 'w-64' : 'w-16'
      }`}
    >
      <div className={`p-4 border-b flex items-center ${!isExpanded && 'justify-center'}`}>
        {isExpanded && <h1 className="text-xl font-bold text-gray-800">Admin</h1>}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`p-2 rounded-lg hover:bg-gray-100 ${isExpanded ? 'ml-auto' : ''}`}
        >
          {isExpanded ? <ChevronFirst size={20} /> : <ChevronLast size={20} />}
        </button>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-2">
        {menuItems.map((item) => (
          <div key={item.title} className="relative">
            <button
              onClick={() => {
                if (item.submenu) {
                  if (isExpanded) {
                    toggleSubmenu(item.title);
                  }
                } else {
                  handleNavigation(item);
                }
              }}
              onMouseEnter={() => !isExpanded && setHoveredItem(item.title)}
              onMouseLeave={() => !isExpanded && setHoveredItem(null)}
              className={`w-full flex items-center justify-between p-2 rounded-md mb-1 ${
                isActive(item.path)
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-3 min-w-0">
                <item.icon size={20} />
                {isExpanded && <span className="truncate">{item.title}</span>}
              </div>
              {isExpanded && item.submenu && (
                expandedItems[item.title] ? <ChevronDown size={20} /> : <ChevronRight size={20} />
              )}
            </button>
            
            {/* Submenu for expanded state */}
            {isExpanded && item.submenu && expandedItems[item.title] && (
              <div className="ml-8 space-y-1">
                {item.submenu.map((subItem) => (
                  <button
                    key={subItem.title}
                    onClick={() => handleNavigation(subItem)}
                    className={`w-full flex items-center space-x-3 p-2 rounded-md ${
                      isActive(subItem.path)
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <subItem.icon size={16} />
                    <span className="truncate">{subItem.title}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Floating submenu for collapsed state */}
            {!isExpanded && item.submenu && hoveredItem === item.title && (
              <div 
                className="absolute left-full top-0 ml-2 w-48 bg-white rounded-md shadow-lg border py-1 z-50"
                onMouseEnter={() => setHoveredItem(item.title)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {item.submenu.map((subItem) => (
                  <button
                    key={subItem.title}
                    onClick={() => handleNavigation(subItem)}
                    className={`w-full flex items-center space-x-3 p-2 hover:bg-gray-100 ${
                      isActive(subItem.path)
                        ? 'text-primary-600'
                        : 'text-gray-600'
                    }`}
                  >
                    <subItem.icon size={16} />
                    <span className="truncate">{subItem.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;