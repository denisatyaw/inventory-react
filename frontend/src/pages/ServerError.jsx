import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ServerCrash, RefreshCw } from 'lucide-react';

const ServerError = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <ServerCrash className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-6xl font-bold text-gray-900 mb-4">500</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Server Error</h2>
        <p className="text-gray-600 mb-8">
          Oops! Something went wrong on our end.
          Our team has been notified and is working on the issue.
        </p>
        <div className="space-x-4">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Retry
          </button>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServerError;