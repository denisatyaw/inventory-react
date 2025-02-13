import React, { useState } from 'react';
import { Search, Shield, Users, Settings, Box, ShoppingCart, FileText, Bell, Lock, Plus, Edit2, Trash2 } from 'lucide-react';

const Roles = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = [
    {
      id: 1,
      name: 'Administrator',
      description: 'Full access to all features and settings',
      users: 3,
      permissions: [
        'User Management',
        'Role Management',
        'Permission Management',
        'System Settings',
        'Audit Logs',
        'API Access'
      ],
      created: '2024-01-15',
      lastModified: '2024-03-10'
    },
    {
      id: 2,
      name: 'Manager',
      description: 'Access to manage team and view reports',
      users: 8,
      permissions: [
        'User Management',
        'Team Management',
        'Report Access',
        'Content Management'
      ],
      created: '2024-01-20',
      lastModified: '2024-03-08'
    },
    {
      id: 3,
      name: 'Editor',
      description: 'Can edit and publish content',
      users: 12,
      permissions: [
        'Content Management',
        'Media Library',
        'Comment Management'
      ],
      created: '2024-02-01',
      lastModified: '2024-03-05'
    },
    {
      id: 4,
      name: 'Viewer',
      description: 'Read-only access to content',
      users: 25,
      permissions: [
        'View Content',
        'View Reports'
      ],
      created: '2024-02-15',
      lastModified: '2024-03-01'
    }
  ];

  const modules = [
    { icon: Users, name: 'User Management' },
    { icon: Shield, name: 'Role Management' },
    { icon: Lock, name: 'Permission Management' },
    { icon: Settings, name: 'System Settings' },
    { icon: Box, name: 'Product Management' },
    { icon: ShoppingCart, name: 'Order Management' },
    { icon: FileText, name: 'Content Management' },
    { icon: Bell, name: 'Notification Management' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Roles</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2">
          <Plus size={20} />
          <span>Create Role</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Roles List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search roles..."
              />
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {roles.map((role) => (
              <div
                key={role.id}
                className={`p-4 cursor-pointer hover:bg-gray-50 ${
                  selectedRole?.id === role.id ? 'bg-blue-50' : ''
                }`}
                onClick={() => setSelectedRole(role)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{role.name}</h3>
                    <p className="text-sm text-gray-500">{role.users} users</p>
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
              </div>
            ))}
          </div>
        </div>

        {/* Role Details */}
        <div className="lg:col-span-2 space-y-6">
          {selectedRole ? (
            <>
              {/* Role Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{selectedRole.name}</h2>
                    <p className="text-sm text-gray-500 mt-1">{selectedRole.description}</p>
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

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Total Users</div>
                    <div className="text-2xl font-semibold">{selectedRole.users}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Last Modified</div>
                    <div className="text-2xl font-semibold">{selectedRole.lastModified}</div>
                  </div>
                </div>

                {/* Module Permissions */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Module Permissions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {modules.map((module, index) => {
                      const Icon = module.icon;
                      const hasPermission = selectedRole.permissions.includes(module.name);
                      return (
                        <div
                          key={index}
                          className={`p-4 border rounded-lg flex items-center justify-between ${
                            hasPermission ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${
                              hasPermission ? 'bg-blue-100' : 'bg-gray-100'
                            }`}>
                              <Icon size={20} className={hasPermission ? 'text-blue-500' : 'text-gray-500'} />
                            </div>
                            <span className="text-sm font-medium">{module.name}</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={hasPermission}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            onChange={() => {}}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Users with this Role */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium mb-4">Users with this Role</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Assigned Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">John Doe</div>
                              <div className="text-sm text-gray-500">john@example.com</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          2024-03-01
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-red-600 hover:text-red-900">Remove</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <Shield size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Role</h3>
              <p className="text-gray-500">Choose a role from the list to view and edit its details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Roles;