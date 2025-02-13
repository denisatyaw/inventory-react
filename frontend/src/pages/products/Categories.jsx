import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, MoreVertical, Box, Tag, Package, Smartphone, Laptop, Headphones, Camera, Watch, Keyboard, Mouse } from 'lucide-react';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: 1,
      name: 'Electronics',
      description: 'Electronic devices and accessories',
      icon: <Smartphone size={20} />,
      products: 1250,
      subcategories: [
        { name: 'Smartphones', count: 450 },
        { name: 'Laptops', count: 320 },
        { name: 'Audio Devices', count: 280 },
        { name: 'Cameras', count: 200 }
      ],
      created: '2024-02-15',
      lastModified: '2024-03-10',
      featuredBrands: ['Apple', 'Samsung', 'Sony', 'Dell']
    },
    {
      id: 2,
      name: 'Computers',
      description: 'Desktop computers and accessories',
      icon: <Laptop size={20} />,
      products: 856,
      subcategories: [
        { name: 'Desktop PCs', count: 220 },
        { name: 'Monitors', count: 180 },
        { name: 'Components', count: 456 }
      ],
      created: '2024-02-16',
      lastModified: '2024-03-09',
      featuredBrands: ['HP', 'Lenovo', 'ASUS', 'Acer']
    },
    {
      id: 3,
      name: 'Audio',
      description: 'Headphones and audio equipment',
      icon: <Headphones size={20} />,
      products: 645,
      subcategories: [
        { name: 'Headphones', count: 280 },
        { name: 'Speakers', count: 220 },
        { name: 'Microphones', count: 145 }
      ],
      created: '2024-02-17',
      lastModified: '2024-03-08',
      featuredBrands: ['Bose', 'Sony', 'JBL', 'Sennheiser']
    },
    {
      id: 4,
      name: 'Photography',
      description: 'Cameras and photography gear',
      icon: <Camera size={20} />,
      products: 432,
      subcategories: [
        { name: 'DSLR Cameras', count: 150 },
        { name: 'Lenses', count: 180 },
        { name: 'Accessories', count: 102 }
      ],
      created: '2024-02-18',
      lastModified: '2024-03-07',
      featuredBrands: ['Canon', 'Nikon', 'Sony', 'Fujifilm']
    },
    {
      id: 5,
      name: 'Wearables',
      description: 'Smart watches and fitness trackers',
      icon: <Watch size={20} />,
      products: 324,
      subcategories: [
        { name: 'Smart Watches', count: 180 },
        { name: 'Fitness Trackers', count: 144 }
      ],
      created: '2024-02-19',
      lastModified: '2024-03-06',
      featuredBrands: ['Apple', 'Samsung', 'Fitbit', 'Garmin']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2">
          <Plus size={20} />
          <span>Add Category</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Categories</p>
              <h3 className="text-2xl font-semibold mt-1">12</h3>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Tag size={24} className="text-blue-500" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <h3 className="text-2xl font-semibold mt-1">3,507</h3>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Box size={24} className="text-green-500" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Subcategories</p>
              <h3 className="text-2xl font-semibold mt-1">45</h3>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Package size={24} className="text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Categories List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search categories..."
                />
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 ${
                    selectedCategory?.id === category.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{category.name}</h3>
                        <p className="text-sm text-gray-500">{category.products} products</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-500">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Details */}
        <div className="lg:col-span-2">
          {selectedCategory ? (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{selectedCategory.name}</h2>
                    <p className="text-sm text-gray-500 mt-1">{selectedCategory.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-blue-500 rounded-lg">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-500 rounded-lg">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Total Products</div>
                    <div className="text-2xl font-semibold">{selectedCategory.products}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Created</div>
                    <div className="text-2xl font-semibold">{selectedCategory.created}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Last Modified</div>
                    <div className="text-2xl font-semibold">{selectedCategory.lastModified}</div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Subcategories */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Subcategories</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedCategory.subcategories.map((subcategory, index) => (
                        <div
                          key={index}
                          className="p-4 border rounded-lg flex items-center justify-between hover:border-blue-500 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Tag size={20} className="text-gray-400" />
                            <div>
                              <span className="text-sm font-medium">{subcategory.name}</span>
                              <p className="text-xs text-gray-500">{subcategory.count} products</p>
                            </div>
                          </div>
                          <button className="text-gray-400 hover:text-gray-500">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Featured Brands */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Featured Brands</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategory.featuredBrands.map((brand, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {brand}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Plus size={16} className="text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-900">New product added</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-50 rounded-lg">
                        <Edit2 size={16} className="text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-900">Category details updated</p>
                        <p className="text-xs text-gray-500">5 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <Box size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Category</h3>
              <p className="text-gray-500">Choose a category from the list to view and edit its details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;