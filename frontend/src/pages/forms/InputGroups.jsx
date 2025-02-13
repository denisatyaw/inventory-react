import React from 'react';
import { Mail, Lock, User, Phone, Building, MapPin, DollarSign, Search, Calendar, Clock } from 'lucide-react';

const InputGroups = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Input Groups</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-6">
          {/* Icon Prefix */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Icon Prefix</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Username"
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={20} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Email"
                />
              </div>
            </div>
          </div>

          {/* Text Prefix/Suffix */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Text Prefix/Suffix</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  https://
                </span>
                <input
                  type="text"
                  className="w-full pl-16 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="example.com"
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-3 pr-16 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Username"
                />
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                  @example.com
                </span>
              </div>
            </div>
          </div>

          {/* Button Groups */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Button Groups</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-3 pr-20 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search..."
                />
                <button className="absolute inset-y-0 right-0 px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600">
                  Search
                </button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-3 pr-24 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter code"
                />
                <button className="absolute inset-y-0 right-0 px-4 py-2 bg-green-500 text-white rounded-r-lg hover:bg-green-600">
                  Verify
                </button>
              </div>
            </div>
          </div>

          {/* Currency/Number Inputs */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Currency/Number Inputs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign size={20} className="text-gray-400" />
                </div>
                <input
                  type="number"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                />
              </div>
              <div className="relative">
                <input
                  type="number"
                  className="w-full pl-3 pr-16 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                  %
                </span>
              </div>
            </div>
          </div>

          {/* Combined Inputs */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Combined Inputs</h2>
            <div className="space-y-4">
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  <Building size={20} />
                </span>
                <input
                  type="text"
                  className="flex-1 px-3 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Company"
                />
                <span className="inline-flex items-center px-3 rounded-r-lg border border-l-0 border-gray-300 bg-gray-50 text-gray-500">
                  Inc.
                </span>
              </div>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  <MapPin size={20} />
                </span>
                <input
                  type="text"
                  className="flex-1 px-3 py-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Street Address"
                />
                <button className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600">
                  Find
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputGroups;