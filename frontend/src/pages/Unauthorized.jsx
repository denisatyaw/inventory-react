import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldX, LogIn } from 'lucide-react';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <ShieldX className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-6xl font-bold text-gray-900 mb-4">401</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Unauthorized Access</h2>
        <p className="text-gray-600 mb-8">
          You don't have permission to access this page.
          Please log in with appropriate credentials.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
        >
          <LogIn className="h-5 w-5 mr-2" />
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;