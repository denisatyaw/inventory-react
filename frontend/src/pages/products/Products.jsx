import React, { useState } from 'react';
import { Search, Filter, Plus, Edit2, Trash2, MoreVertical, Tag, Package, DollarSign, Star, Truck, Box } from 'lucide-react';

const Products = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
    price: 'all'
  });

  const products = [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      sku: 'HDX-100',
      category: 'Electronics',
      price: 199.99,
      stock: 45,
      rating: 4.5,
      sales: 1234,
      status: 'In Stock',
      vendor: 'TechGear Pro',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      name: 'Ergonomic Office Chair',
      sku: 'FRN-200',
      category: 'Furniture',
      price: 299.99,
      stock: 15,
      rating: 4.8,
      sales: 856,
      status: 'Low Stock',
      vendor: 'Comfort Plus',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      name: 'Smart Watch Pro',
      sku: 'WTC-300',
      category: 'Electronics',
      price: 249.99,
      stock: 0,
      rating: 4.2,
      sales: 2156,
      status: 'Out of Stock',
      vendor: 'SmartTech',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      name: 'Professional Camera Kit',
      sku: 'CAM-400',
      category: 'Electronics',
      price: 1299.99,
      stock: 8,
      rating: 4.9,
      sales: 432,
      status: 'Low Stock',
      vendor: 'PhotoPro',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 5,
      name: 'Mechanical Keyboard',
      sku: 'KBD-500',
      category: 'Electronics',
      price: 159.99,
      stock: 30,
      rating: 4.7,
      sales: 978,
      status: 'In Stock',
      vendor: 'TechGear Pro',
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 6,
      name: 'Gaming Mouse',
      sku: 'MOU-600',
      category: 'Electronics',
      price: 89.99,
      stock: 65,
      rating: 4.6,
      sales: 1567,
      status: 'In Stock',
      vendor: 'GameTech',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
    }
  ];

  // Stats data
  const stats = [
    { title: 'Total Products', value: '2,345', icon: Box, color: 'bg-blue-500' },
    { title: 'Total Sales', value: '$123,456', icon: DollarSign, color: 'bg-green-500' },
    { title: 'Active Categories', value: '18', icon: Tag, color: 'bg-purple-500' },
    { title: 'Pending Orders', value: '56', icon: Truck, color: 'bg-orange-500' }
  ];

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProducts(products.map(product => product.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (id) => {
    setSelectedProducts(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Products</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2">
          <Plus size={20} />
          <span>Add Product</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <h3 className="text-2xl font-semibold mt-1">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        {/* Filters and search */}
        <div className="p-4 border-b border-gray-200 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search products..."
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
              </select>
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.price}
                onChange={(e) => setFilters(prev => ({ ...prev, price: e.target.value }))}
              >
                <option value="all">All Prices</option>
                <option value="0-100">$0 - $100</option>
                <option value="101-500">$101 - $500</option>
                <option value="501+">$501+</option>
              </select>
            </div>
          </div>
          
          {selectedProducts.length > 0 && (
            <div className="flex items-center justify-between bg-blue-50 p-2 rounded-lg">
              <span className="text-sm text-blue-600">{selectedProducts.length} products selected</span>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-1">
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
                <button className="px-3 py-1 text-blue-600 hover:bg-blue-100 rounded-lg flex items-center gap-1">
                  <Edit2 size={16} />
                  <span>Edit</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleSelectProduct(product.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <div className="absolute bottom-2 left-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    product.status === 'In Stock' 
                      ? 'bg-green-100 text-green-800'
                      : product.status === 'Low Stock'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.status}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-500">
                    <MoreVertical size={16} />
                  </button>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Tag size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-600">{product.category}</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}
                        fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">({product.sales} sales)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-gray-900">${product.price}</div>
                  <div className="text-sm text-gray-500">{product.stock} in stock</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">6</span> of <span className="font-medium">24</span> results
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
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50">
              3
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

export default Products;