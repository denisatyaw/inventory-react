import React, { useState } from 'react';
import { Search, Shield, Lock, Plus, Edit2, Trash2, ChevronRight, Check } from 'lucide-react';

const Permissions = () => {
  const [selectedPermission, setSelectedPermission] = useState(null);

  const permissions = [
    {
      id: 1,
      name: 'User Management',
      description: 'Manage user accounts and access',
      category: 'Administration',
      actions: ['create', 'read', 'update', 'delete'],
      roles: ['Administrator', 'Manager'],
      lastModified: '2024-03-10'
    },
    {
      id: 2,
      name: 'Content Management',
      description: 'Manage website content and media',
      category: 'Content',
      actions: ['create', 'read', 'update', 'delete'],
      roles: ['Administrator', 'Editor'],
      lastModified: '2024-03-09'
    },
    {
      id: 3,
      name: 'Report Access',
      description: 'View and export system reports',
      category: 'Reports',
      actions: ['read', 'export'],
      roles: ['Administrator', 'Manager', 'Viewer'],
      lastModified: '2024-03-08'
    },
    {
      id: 4,
      name: 'System Settings',
      description: 'Configure system-wide settings',
      category: 'Administration',
      actions: ['read', 'update'],
      roles: ['Administrator'],
      lastModified: '2024-03-07'
    }
  ];

  const categories = [
    'All',
    'Administration',
    'Content',
    'Reports',
    'Security',
    'API',
    'Billing'
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Permissions</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2">
          <Plus size={20} />
          <span>Create Permission</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium">Categories</h2>
            </div>
            <div className="p-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center justify-between"
                >
                  <span className="text-sm text-gray-700">{category}</span>
                  <ChevronRight size={16} className="text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Permissions List and Details */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search permissions..."
              />
            </div>
          </div>

          {/* Permissions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {permissions.map((permission) => (
              <div
                key={permission.id}
                className={`bg-white rounded-lg shadow-sm p-6 cursor-pointer border-2 ${
                  selectedPermission?.id === permission.id
                    ? 'border-blue-500'
                    : 'border-transparent'
                }`}
                onClick={() => setSelectedPermission(permission)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Lock size={20} className="text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{permission.name}</h3>
                      <p className="text-sm text-gray-500">{permission.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-1 text-gray-400 hover:text-blue-500">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-500">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-2">Actions</div>
                    <div className="flex flex-wrap gap-2">
                      {permission.actions.map((action, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full"
                        >
                          {action}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-500 mb-2">Assigned Roles</div>
                    <div className="flex flex-wrap gap-2">
                      {permission.roles.map((role, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full flex items-center gap-1"
                        >
                          <Shield size={12} />
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Last modified</span>
                      <span>{permission.lastModified}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Permission Details */}
          {selectedPermission && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Permission Details</h2>
                  <p className="text-sm text-gray-500 mt-1">Configure permission settings and access</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Permission Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      value={selectedPermission.name}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                      {categories.map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                    value={selectedPermission.description}
                  ></textarea>
                </div>

                {/* Actions */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Actions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {['create', 'read', 'update', 'delete', 'export', 'import'].map((action, index) => (
                      <label
                        key={index}
                        className="flex items-center p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          checked={selectedPermission.actions.includes(action)}
                        />
                        <span className="ml-3 text-sm font-medium text-gray-700 capitalize">
                          {action}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Role Assignment */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Role Assignment</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['Administrator', 'Manager', 'Editor', 'Viewer'].map((role, index) => (
                      <div
                        key={index}
                        className={`p-4 border rounded-lg flex items-center justify-between ${
                          selectedPermission.roles.includes(role)
                            ? 'border-blue-200 bg-blue-50'
                            : ''
                        }`}
                      >
                        <div className="flex items-center">
                          <Shield size={20} className="text-gray-400 mr-3" />
                          <span className="text-sm font-medium">{role}</span>
                        </div>
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          checked={selectedPermission.roles.includes(role)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Permissions;