import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, ChevronRight, Save } from 'lucide-react';
import * as Icons from 'lucide-react';
// import DataTable from 'datatables.net-react';
// import DT from 'datatables.net-dt'

// import '../../App.css';

const MenuManagement = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [formData, setFormData] = useState({
    menuId: '',
    name: '',
    parent_id: '',
    route: '',
    icon: '',
    is_active: true,
    created_by: 'admin',
    parent_order: 0,
    submenu_order: 0
  });

  // Current menu structure from the sidebar
  const menuList = [
    {
      menuId: '100089',
      name: 'Dashboard',
      parent_id: null,
      route: '/',
      icon: 'LayoutDashboard',
      is_active: true,
      created_by: 'admin',
      parent_order: 1,
      submenu_order: 0,
      level: 1
    },
    {
      menuId: '100090',
      name: 'Calendar',
      parent_id: null,
      route: '/calendar',
      icon: 'Calendar',
      is_active: true,
      created_by: 'admin',
      parent_order: 2,
      submenu_order: 0,
      level: 1
    },
    {
      menuId: '100091',
      name: 'User Management',
      parent_id: null,
      route: '#',
      icon: 'Users',
      is_active: true,
      created_by: 'admin',
      parent_order: 3,
      submenu_order: 0,
      level: 1
    },
    {
      menuId: '100092',
      name: 'Users List',
      parent_id: '100091',
      route: '/users',
      icon: 'Users',
      is_active: true,
      created_by: 'admin',
      parent_order: 3,
      submenu_order: 1,
      level: 2
    },
    {
      menuId: '100093',
      name: 'Roles',
      parent_id: '100091',
      route: '/roles',
      icon: 'Shield',
      is_active: true,
      created_by: 'admin',
      parent_order: 3,
      submenu_order: 2,
      level: 2
    },
    {
      menuId: '100094',
      name: 'Permissions',
      parent_id: '100091',
      route: '/permissions',
      icon: 'Lock',
      is_active: true,
      created_by: 'admin',
      parent_order: 3,
      submenu_order: 3,
      level: 2
    },
    {
      menuId: '100095',
      name: 'Products',
      parent_id: null,
      route: '#',
      icon: 'Box',
      is_active: true,
      created_by: 'admin',
      parent_order: 4,
      submenu_order: 0,
      level: 1
    },
    {
      menuId: '100096',
      name: 'All Products',
      parent_id: '100095',
      route: '/products',
      icon: 'Box',
      is_active: true,
      created_by: 'admin',
      parent_order: 4,
      submenu_order: 1,
      level: 2
    },
    {
      menuId: '100097',
      name: 'Categories',
      parent_id: '100095',
      route: '/categories',
      icon: 'Tag',
      is_active: true,
      created_by: 'admin',
      parent_order: 4,
      submenu_order: 2,
      level: 2
    },
    {
      menuId: '100098',
      name: 'Inventory',
      parent_id: '100095',
      route: '/inventory',
      icon: 'Package',
      is_active: true,
      created_by: 'admin',
      parent_order: 4,
      submenu_order: 3,
      level: 2
    },
    {
      menuId: '100099',
      name: 'Pages',
      parent_id: null,
      route: '#',
      icon: 'FileText',
      is_active: true,
      created_by: 'admin',
      parent_order: 5,
      submenu_order: 0,
      level: 1
    },
    {
      menuId: '100100',
      name: 'Todo List',
      parent_id: '100099',
      route: '/pages/todo',
      icon: 'ListTodo',
      is_active: true,
      created_by: 'admin',
      parent_order: 5,
      submenu_order: 1,
      level: 2
    },
    {
      menuId: '100101',
      name: 'Tables',
      parent_id: null,
      route: '#',
      icon: 'Table2',
      is_active: true,
      created_by: 'admin',
      parent_order: 6,
      submenu_order: 0,
      level: 1
    },
    {
      menuId: '100102',
      name: 'Basic Table',
      parent_id: '100101',
      route: '/tables/basic',
      icon: 'Table2',
      is_active: true,
      created_by: 'admin',
      parent_order: 6,
      submenu_order: 1,
      level: 2
    },
    {
      menuId: '100103',
      name: 'Data Table',
      parent_id: '100101',
      route: '/tables/data',
      icon: 'Table2',
      is_active: true,
      created_by: 'admin',
      parent_order: 6,
      submenu_order: 2,
      level: 2
    },
    {
      menuId: '100104',
      name: 'Advanced Table',
      parent_id: '100101',
      route: '/tables/advanced',
      icon: 'Table2',
      is_active: true,
      created_by: 'admin',
      parent_order: 6,
      submenu_order: 3,
      level: 2
    },
    {
      menuId: '100105',
      name: 'Forms',
      parent_id: null,
      route: '#',
      icon: 'FormInput',
      is_active: true,
      created_by: 'admin',
      parent_order: 7,
      submenu_order: 0,
      level: 1
    },
    {
      menuId: '100106',
      name: 'Basic Form',
      parent_id: '100105',
      route: '/forms/basic',
      icon: 'FormInput',
      is_active: true,
      created_by: 'admin',
      parent_order: 7,
      submenu_order: 1,
      level: 2
    },
    {
      menuId: '100107',
      name: 'Input Groups',
      parent_id: '100105',
      route: '/forms/input-groups',
      icon: 'FormInput',
      is_active: true,
      created_by: 'admin',
      parent_order: 7,
      submenu_order: 2,
      level: 2
    },
    {
      menuId: '100108',
      name: 'Checkbox & Radio',
      parent_id: '100105',
      route: '/forms/checkbox-radio',
      icon: 'ToggleLeft',
      is_active: true,
      created_by: 'admin',
      parent_order: 7,
      submenu_order: 3,
      level: 2
    },
    {
      menuId: '100109',
      name: 'Date & Time',
      parent_id: '100105',
      route: '/forms/datetime',
      icon: 'Calendar',
      is_active: true,
      created_by: 'admin',
      parent_order: 7,
      submenu_order: 4,
      level: 2
    },
    {
      menuId: '100110',
      name: 'UI Elements',
      parent_id: null,
      route: '#',
      icon: 'Palette',
      is_active: true,
      created_by: 'admin',
      parent_order: 8,
      submenu_order: 0,
      level: 1
    },
    {
      menuId: '100111',
      name: 'Buttons',
      parent_id: '100110',
      route: '/buttons',
      icon: 'Square',
      is_active: true,
      created_by: 'admin',
      parent_order: 8,
      submenu_order: 1,
      level: 2
    },
    {
      menuId: '100112',
      name: 'Cards',
      parent_id: '100110',
      route: '/cards',
      icon: 'CreditCard',
      is_active: true,
      created_by: 'admin',
      parent_order: 8,
      submenu_order: 2,
      level: 2
    },
    {
      menuId: '100113',
      name: 'Modals',
      parent_id: '100110',
      route: '/modals',
      icon: 'Square',
      is_active: true,
      created_by: 'admin',
      parent_order: 8,
      submenu_order: 3,
      level: 2
    },
    {
      menuId: '100114',
      name: 'Notifications',
      parent_id: '100110',
      route: '/notifications',
      icon: 'Bell',
      is_active: true,
      created_by: 'admin',
      parent_order: 8,
      submenu_order: 4,
      level: 2
    },
    {
      menuId: '100115',
      name: 'Utilities',
      parent_id: '100110',
      route: '/utilities',
      icon: 'Tool',
      is_active: true,
      created_by: 'admin',
      parent_order: 8,
      submenu_order: 5,
      level: 2
    },
    {
      menuId: '100116',
      name: 'Settings',
      parent_id: null,
      route: '#',
      icon: 'Settings',
      is_active: true,
      created_by: 'admin',
      parent_order: 9,
      submenu_order: 0,
      level: 1
    },
    {
      menuId: '100117',
      name: 'Menu Management',
      parent_id: '100116',
      route: '/settings/menu',
      icon: 'Menu',
      is_active: true,
      created_by: 'admin',
      parent_order: 9,
      submenu_order: 1,
      level: 2
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Get all available Lucide icons
  const iconList = Object.keys(Icons).filter(key => 
    typeof Icons[key] === 'function' && key !== 'createLucideIcon'
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Menu Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage system menu structure</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 lg:col-span-1">
          <h2 className="text-lg font-medium mb-4">Menu Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Menu ID</label>
                <input
                  type="text"
                  name="menuId"
                  value={formData.menuId}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="Enter Menu ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="Enter menu name"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Parent Menu</label>
                <select
                  name="parent_id"
                  value={formData.parent_id}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                >
                  <option value="">None</option>
                  {menuList
                    .filter(menu => menu.level === 1)
                    .map(menu => (
                      <option key={menu.menuId} value={menu.menuId}>
                        {menu.name}
                      </option>
                    ))
                  }
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Route</label>
                <input
                  type="text"
                  name="route"
                  value={formData.route}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="/example/route"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Icon</label>
                <select
                  name="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                >
                  <option value="">Select an icon</option>
                  {iconList.map(icon => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Created By</label>
                <input
                  type="text"
                  name="created_by"
                  value={formData.created_by}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="Enter creator name"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Parent Order</label>
                <input
                  type="number"
                  name="parent_order"
                  value={formData.parent_order}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Submenu Order</label>
                <input
                  type="number"
                  name="submenu_order"
                  value={formData.submenu_order}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                  min="0"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 rounded border-gray-300"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Active
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={() => setFormData({
                  menuId: '',
                  name: '',
                  parent_id: '',
                  route: '',
                  icon: '',
                  is_active: true,
                  created_by: 'admin',
                  parent_order: 0,
                  submenu_order: 0
                })}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
              >
                <Save size={20} />
                Save
              </button>
            </div>
          </form>
        </div>

        {/* Menu List Section */}
        <div className="bg-white rounded-lg shadow-sm lg:col-span-2">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search menus..."
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Menu ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Parent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {menuList.map((menu) => {
                  const IconComponent = Icons[menu.icon] || Icons.File;
                  const parentMenu = menuList.find(m => m.menuId === menu.parent_id);
                  return (
                    <tr key={menu.menuId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {menu.menuId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <IconComponent size={20} className="text-gray-400 mr-2" />
                          <span className="text-sm font-medium text-gray-900">
                            {menu.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Level {menu.level}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {parentMenu ? parentMenu.name : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {menu.parent_order}.{menu.submenu_order}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedMenu(menu)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuManagement;