import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    
    try {
      const response = await fetch(`${config.API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();
      console.log('Login response:', data); // Debug log

      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin/news');
      } else {
        setError(data.message || 'Нэвтрэх нэр эсвэл нууц үг буруу байна');
      }
    } catch (err) {
      console.error('Login error:', err); // Debug log
      setError('Сервертэй холбогдоход алдаа гарлаа. Дахин оролдоно уу.');
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Админ нэвтрэх
        </h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-900">
              Хэрэглэгчийн нэр
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={credentials.username}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Нууц үг
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={credentials.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Нэвтрэх
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; 