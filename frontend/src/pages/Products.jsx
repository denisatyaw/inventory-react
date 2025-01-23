import React from 'react';
import DataTable from '../components/DataTable';

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Product Name' },
  { key: 'category', label: 'Category' },
  { key: 'price', label: 'Price' },
  { key: 'stock', label: 'Stock' },
  { key: 'status', label: 'Status' }
];

const sampleData = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  name: `Product ${index + 1}`,
  category: ['Electronics', 'Clothing', 'Food', 'Books'][Math.floor(Math.random() * 4)],
  price: `$${(Math.random() * 1000).toFixed(2)}`,
  stock: Math.floor(Math.random() * 100),
  status: ['In Stock', 'Low Stock', 'Out of Stock'][Math.floor(Math.random() * 3)]
}));

const Products = () => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Products</h2>
        <p className="mt-2 text-gray-600">Manage your product inventory and categories.</p>
      </div>
      <DataTable columns={columns} data={sampleData} />
    </div>
  );
};

export default Products;