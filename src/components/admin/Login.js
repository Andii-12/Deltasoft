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
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="max-w-sm w-full p-6 bg-background border border-border rounded">
        <h2 className="text-xl font-semibold text-center text-text-primary mb-6">
          Admin Login
        </h2>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm text-text-primary mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={credentials.username}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-text-primary mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={credentials.password}
              onChange={handleChange}
              className="input"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; 