import React, { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import api from '../utils/api'; 

const sampleData = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  email: `user${index + 1}@example.com`,
  role: ['Admin', 'User', 'Editor', 'Viewer'][Math.floor(Math.random() * 4)],
  status: ['Active', 'Inactive', 'Pending'][Math.floor(Math.random() * 3)],
  lastLogin: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString()
}));

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
  { key: 'lastLogin', label: 'Last Login' }
];

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/') // Menggunakan api.js untuk memanggil backend
      .then((response) => {
        setData(response.data);
        console.log('Dashboard data:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching dashboard data:', error);
      });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
          <p className="text-2xl font-semibold mt-2">1,234</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Active Sessions</h3>
          <p className="text-2xl font-semibold mt-2">56</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
          <p className="text-2xl font-semibold mt-2">$12,345</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Pending Tasks</h3>
          <p className="text-2xl font-semibold mt-2">23</p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Recent Users</h3>
        </div>
        <DataTable columns={columns} data={sampleData} />
      </div>
    </div>
  );
};

export default Dashboard;