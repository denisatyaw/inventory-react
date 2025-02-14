import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, EyeOff, Eye } from 'lucide-react';
import { login } from '../../services/authService';
import axios from 'axios';
import { debounce } from 'lodash';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // ✅ Gunakan state untuk menyimpan fungsi debounce agar tidak berubah setiap render
  const [debouncedFetchRoles] = useState(() => 
    debounce(async (username) => {
      if (!username.trim()) {
        setRoles([]);
        setSelectedRole('');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:5000/user/${username}/roles`);
        const fetchedRoles = response.data.data.roles || [];
        setRoles(fetchedRoles);
        setSelectedRole(fetchedRoles.length > 0 ? fetchedRoles[0] : '');
      } catch (error) {
        console.error('Error fetching roles:', error);
        setRoles([]);
        setSelectedRole('');
      }
    }, 1000) // Delay 1 detik
  );

  // ✅ Panggil fungsi debounce setiap kali username berubah
  useEffect(() => {
    debouncedFetchRoles(username);
    return () => debouncedFetchRoles.cancel(); // Bersihkan debounce jika username berubah lagi
  }, [username, debouncedFetchRoles]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        username,
        password,
        role: selectedRole,
      });
      login(response.data.token);
      navigate('/');
    } catch (error) {
      alert('Login failed!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Username Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="block w-full pl-3 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <div className="mt-1 relative">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  required
                  className="block w-full pl-3 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  disabled={roles.length === 0} // Disable jika tidak ada role tersedia
                >
                  {roles.length > 0 ? (
                    roles.map((role) => (
                      <option key={role} value={role}>{role}</option>
                    ))
                  ) : (
                    <option value="">No roles available</option>
                  )}
                </select>
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full pl-3 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                disabled={!selectedRole} // Hanya bisa login jika role dipilih
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
