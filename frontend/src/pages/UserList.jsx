import React from 'react';
import DataTable from '../components/DataTable';

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
  { key: 'lastLogin', label: 'Last Login' }
];

const sampleData = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  email: `user${index + 1}@example.com`,
  role: ['Admin', 'User', 'Editor', 'Viewer'][Math.floor(Math.random() * 4)],
  status: ['Active', 'Inactive', 'Pending'][Math.floor(Math.random() * 3)],
  lastLogin: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString()
}));

const UserList = () => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">User Management</h2>
        <p className="mt-2 text-gray-600">Manage your system users and their permissions.</p>
      </div>
      <DataTable columns={columns} data={sampleData} />
    </div>
  );
};

export default UserList;