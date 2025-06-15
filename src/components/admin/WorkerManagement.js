import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash, FaTrash, FaEdit } from 'react-icons/fa';
import config from '../../config';

const API_URL = `${config.API_URL}/api/workers`;

const WorkerManagement = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'worker' });
  const [creating, setCreating] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordWorkerId, setPasswordWorkerId] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [workerToDelete, setWorkerToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingWorkerId, setEditingWorkerId] = useState(null);

  const roles = [
    { value: 'worker', label: 'Ажилтан' },
    { value: 'supervisor', label: 'Хянагч' },
    { value: 'manager', label: 'Менежер' },
    { value: 'admin', label: 'Админ' },
    { value: 'developer', label: 'Хөгжүүлэгч' },
    { value: 'network_engineer', label: 'Сүлжээний инженер' },
    { value: 'system_admin', label: 'Системийн админ' },
    { value: 'project_manager', label: 'Төслийн менежер' },
    { value: 'designer', label: 'Дизайнер' },
    { value: 'qa_engineer', label: 'Чанар хянагч' }
  ];

  const fetchWorkers = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(API_URL, {
        headers: { 'x-auth-token': token }
      });
      const data = await response.json();
      if (response.ok) {
        setWorkers(data);
      } else {
        setError(data.message || 'Failed to fetch workers');
      }
    } catch (err) {
      setError('Server error');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddWorker = async (e) => {
    e.preventDefault();
    setCreating(true);
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setShowModal(false);
        setFormData({ name: '', email: '', password: '', role: 'worker' });
        fetchWorkers();
      } else {
        setError(data.message || 'Failed to create worker');
      }
    } catch (err) {
      setError('Server error');
    }
    setCreating(false);
  };

  const handleEditWorker = async (e) => {
    e.preventDefault();
    setCreating(true);
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/${editingWorkerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          role: formData.role
        })
      });
      const data = await response.json();
      if (response.ok) {
        setShowModal(false);
        setIsEditing(false);
        setEditingWorkerId(null);
        setFormData({ name: '', email: '', password: '', role: 'worker' });
        fetchWorkers();
      } else {
        setError(data.message || 'Failed to update worker');
      }
    } catch (err) {
      setError('Server error');
    }
    setCreating(false);
  };

  const handleOpenEditModal = (worker) => {
    setIsEditing(true);
    setEditingWorkerId(worker._id);
    setFormData({
      name: worker.name,
      email: worker.email,
      role: worker.role,
      password: '' // Don't show password when editing
    });
    setShowModal(true);
  };

  const handleDeleteWorker = async (workerId) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/${workerId}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': token
        }
      });
      if (response.ok) {
        setShowDeleteConfirm(false);
        setWorkerToDelete(null);
        fetchWorkers();
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to delete worker');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  const handleOpenPasswordModal = (workerId) => {
    setPasswordWorkerId(workerId);
    setNewPassword('');
    setShowPasswordModal(true);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setPasswordLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/${passwordWorkerId}/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({ password: newPassword })
      });
      const data = await response.json();
      if (response.ok) {
        setShowPasswordModal(false);
      } else {
        setError(data.message || 'Failed to update password');
      }
    } catch (err) {
      setError('Server error');
    }
    setPasswordLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Ажилчдын бүртгэл</h2>
        <button
          onClick={() => {
            setShowModal(true);
            setIsEditing(false);
            setFormData({ name: '', email: '', password: '', role: 'worker' });
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
        >
          + Ажилтан нэмэх
        </button>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Нэр</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Нэвтрэх нэр</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Эрх</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">Үйлдэл</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan={4} className="text-center text-gray-400 py-8">Уншиж байна...</td></tr>
            ) : workers.length === 0 ? (
              <tr><td colSpan={4} className="text-center text-gray-400 py-8">Ажилтан алга...</td></tr>
            ) : (
              workers.map((worker) => (
                <tr key={worker._id}>
                  <td className="px-6 py-4 text-gray-900">{worker.name}</td>
                  <td className="px-6 py-4 text-gray-900">{worker.email}</td>
                  <td className="px-6 py-4 text-gray-900">
                    {roles.find(r => r.value === worker.role)?.label || worker.role}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button 
                      onClick={() => handleOpenEditModal(worker)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      <FaEdit className="inline-block mr-1" />
                      Засах
                    </button>
                    <button 
                      onClick={() => handleOpenPasswordModal(worker._id)} 
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Нууц үг засах
                    </button>
                    <button 
                      onClick={() => {
                        setWorkerToDelete(worker);
                        setShowDeleteConfirm(true);
                      }}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      <FaTrash className="inline-block mr-1" />
                      Устгах
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Worker Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md relative">
            <button onClick={() => {
              setShowModal(false);
              setIsEditing(false);
              setEditingWorkerId(null);
            }} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">✕</button>
            <h3 className="text-xl font-bold mb-4 text-gray-900">{isEditing ? 'Ажилтан засах' : 'Ажилтан нэмэх'}</h3>
            <form onSubmit={isEditing ? handleEditWorker : handleAddWorker} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Нэр</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required 
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Нэвтрэх нэр</label>
                <input 
                  type="text" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  required 
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900" 
                />
              </div>
              {!isEditing && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Нууц үг</label>
                  <input 
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleInputChange} 
                    required 
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900" 
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">Эрх</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
                >
                  {roles.map(role => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => {
                    setShowModal(false);
                    setIsEditing(false);
                    setEditingWorkerId(null);
                  }} 
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Цуцлах
                </button>
                <button 
                  type="submit" 
                  disabled={creating} 
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  {creating ? 'Хадгалж байна...' : (isEditing ? 'Хадгалах' : 'Нэмэх')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && workerToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md relative">
            <button 
              onClick={() => {
                setShowDeleteConfirm(false);
                setWorkerToDelete(null);
              }} 
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4 text-gray-900">Ажилтан устгах</h3>
            <p className="mb-4 text-gray-900">
              Та {workerToDelete.name} ажилтныг устгахдаа итгэлтэй байна уу?
            </p>
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setWorkerToDelete(null);
                }} 
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Цуцлах
              </button>
              <button 
                onClick={() => handleDeleteWorker(workerToDelete._id)} 
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Устгах
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md relative">
            <button 
              onClick={() => setShowPasswordModal(false)} 
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4 text-gray-900">Нууц үг засах</h3>
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Шинэ нууц үг</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Цуцлах
                </button>
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  {passwordLoading ? 'Хадгалж байна...' : 'Хадгалах'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerManagement; 