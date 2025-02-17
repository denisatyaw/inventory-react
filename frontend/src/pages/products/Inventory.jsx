import React, { useState } from 'react';
import { Search, Filter, AlertTriangle, ArrowDown, ArrowUp, Package, MoreVertical, RefreshCw, Box, Truck, AlertCircle, BarChart2 } from 'lucide-react';

const Inventory = () => {
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all'
  });

  const inventory = [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      sku: 'HDX-100',
      category: 'Electronics',
      inStock: 45,
      minStock: 20,
      maxStock: 100,
      reorderPoint: 25,
      status: 'In Stock',
      lastUpdated: '2024-03-10',
      trend: 'up',
      supplier: 'TechGear Pro',
      location: 'Warehouse A',
      value: 8955.55
    },
    {
      id: 2,
      name: 'Ergonomic Office Chair',
      sku: 'FRN-200',
      category: 'Furniture',
      inStock: 15,
      minStock: 10,
      maxStock: 50,
      reorderPoint: 20,
      status: 'Low Stock',
      lastUpdated: '2024-03-09',
      trend: 'down',
      supplier: 'Comfort Plus',
      location: 'Warehouse B',
      value: 4499.85
    },
    {
      id: 3,
      name: 'Smart Watch Pro',
      sku: 'WTC-300',
      category: 'Electronics',
      inStock: 0,
      minStock: 5,
      maxStock: 30,
      reorderPoint: 10,
      status: 'Out of Stock',
      lastUpdated: '2024-03-08',
      trend: 'down',
      supplier: 'SmartTech',
      location: 'Warehouse A',
      value: 0
    },
    {
      id: 4,
      name: 'Professional Camera Kit',
      sku: 'CAM-400',
      category: 'Electronics',
      inStock: 8,
      minStock: 5,
      maxStock: 25,
      reorderPoint: 10,
      status: 'Low Stock',
      lastUpdated: '2024-03-07',
      trend: 'down',
      supplier: 'PhotoPro',
      location: 'Warehouse C',
      value: 10399.92
    },
    {
      id: 5,
      name: 'Gaming Mouse',
      sku: 'MOU-500',
      category: 'Electronics',
      inStock: 120,
      minStock: 50,
      maxStock: 200,
      reorderPoint: 75,
      status: 'Overstocked',
      lastUpdated: '2024-03-06',
      trend: 'up',
      supplier: 'GameTech',
      location: 'Warehouse A',
      value: 10799.88
    }
  ];

  // Calculate inventory statistics
  const stats = {
    totalItems: inventory.reduce((acc, item) => acc + item.inStock, 0),
    totalValue: inventory.reduce((acc, item) => acc + item.value, 0),
    lowStock: inventory.filter(item => item.status === 'Low Stock').length,
    outOfStock: inventory.filter(item => item.status === 'Out of Stock').length,
    overstocked: inventory.filter(item => item.status === 'Overstocked').length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Inventory</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2">
          <RefreshCw size={20} />
          <span>Update Stock</span>
        </button>
      </div>

      {/* Inventory Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Items</p>
              <h3 className="text-2xl font-semibold mt-1">{stats.totalItems}</h3>
              <p className="text-sm text-gray-500 mt-1">In stock</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Box size={24} className="text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Inventory Value</p>
              <h3 className="text-2xl font-semibold mt-1">${stats.totalValue.toLocaleString()}</h3>
              <p className="text-sm text-gray-500 mt-1">Total value</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <BarChart2 size={24} className="text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Low Stock Items</p>
              <h3 className="text-2xl font-semibold mt-1">{stats.lowStock}</h3>
              <p className="text-sm text-gray-500 mt-1">Need attention</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <AlertTriangle size={24} className="text-yellow-500" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Out of Stock</p>
              <h3 className="text-2xl font-semibold mt-1">{stats.outOfStock}</h3>
              <p className="text-sm text-gray-500 mt-1">Items to reorder</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <AlertCircle size={24} className="text-red-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        {/* Filters and search */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search inventory..."
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Filter size={20} className="text-gray-400" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              >
                <option value="all">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Accessories">Accessories</option>
              </select>
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              >
                <option value="all">All Status</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Overstocked">Overstocked</option>
              </select>
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">SKU: {item.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.inStock} units</div>
                    <div className="text-xs text-gray-500">
                      Min: {item.minStock} | Max: {item.maxStock}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.location}</div>
                    <div className="text-xs text-gray-500">{item.supplier}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === 'In Stock' 
                        ? 'bg-green-100 text-green-800'
                        : item.status === 'Low Stock'
                        ? 'bg-yellow-100 text-yellow-800'
                        : item.status === 'Out of Stock'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {item.trend === 'up' ? (
                        <ArrowUp size={16} className="text-green-500" />
                      ) : (
                        <ArrowDown size={16} className="text-red-500" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${item.value.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-500">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{inventory.length}</span> of <span className="font-medium">{inventory.length}</span> results
            </span>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-500 rounded-lg">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;