import React from 'react';
import { WrenchIcon, Clock } from 'lucide-react';

const Maintenance = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="flex justify-center space-x-4 mb-6">
          <WrenchIcon className="h-16 w-16 text-primary-600 animate-bounce" />
          <Clock className="h-16 w-16 text-primary-600 animate-pulse" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Under Maintenance
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          We're currently updating our system to serve you better.
          Please check back soon.
        </p>
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Expected Downtime
          </h2>
          <div className="flex justify-center space-x-4">
            <div className="text-center">
              <span className="block text-3xl font-bold text-primary-600">02</span>
              <span className="text-sm text-gray-500">Hours</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-bold text-primary-600">45</span>
              <span className="text-sm text-gray-500">Minutes</span>
            </div>
          </div>
        </div>
        <p className="text-gray-600">
          For urgent matters, please contact{' '}
          <a href="mailto:support@example.com" className="text-primary-600 hover:text-primary-700">
            support@example.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default Maintenance;