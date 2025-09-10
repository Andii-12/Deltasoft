import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaEye, FaEyeSlash, FaPlus, FaImage } from 'react-icons/fa';
import config from '../../config';

const LogoManagement = () => {
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingLogo, setEditingLogo] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    image: null,
    imagePreview: null
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchLogos();
  }, []);

  const fetchLogos = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${config.API_URL}/api/logos`, {
        headers: { 'x-auth-token': token }
      });
      const data = await response.json();
      if (response.ok) {
        setLogos(data);
      }
    } catch (error) {
      console.error('Error fetching logos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const token = localStorage.getItem('adminToken');
      const formDataToSend = new FormData();
      
      formDataToSend.append('name', formData.name);
      
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const url = editingLogo 
        ? `${config.API_URL}/api/logos/${editingLogo._id}`
        : `${config.API_URL}/api/logos`;
      
      const method = editingLogo ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'x-auth-token': token },
        body: formDataToSend
      });

      if (response.ok) {
        await fetchLogos();
        resetForm();
        setShowModal(false);
      } else {
        const error = await response.json();
        alert(error.message || 'Error saving logo');
      }
    } catch (error) {
      console.error('Error saving logo:', error);
      alert('Error saving logo');
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (logo) => {
    setEditingLogo(logo);
    setFormData({
      name: logo.name,
      image: null,
      imagePreview: logo.imageType === 'file' ? `${config.API_URL}${logo.image}` : logo.image
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this logo?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${config.API_URL}/api/logos/${id}`, {
        method: 'DELETE',
        headers: { 'x-auth-token': token }
      });

      if (response.ok) {
        await fetchLogos();
      } else {
        const error = await response.json();
        alert(error.message || 'Error deleting logo');
      }
    } catch (error) {
      console.error('Error deleting logo:', error);
      alert('Error deleting logo');
    }
  };

  const handleToggleActive = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${config.API_URL}/api/logos/${id}/toggle`, {
        method: 'PATCH',
        headers: { 'x-auth-token': token }
      });

      if (response.ok) {
        await fetchLogos();
      }
    } catch (error) {
      console.error('Error toggling logo status:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      image: null,
      imagePreview: null
    });
    setEditingLogo(null);
  };

  const openModal = () => {
    resetForm();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 dark:bg-dark-surface rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-300 dark:bg-dark-surface rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text">Logo Management</h1>
        <button
          onClick={openModal}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center"
        >
          <FaPlus className="w-4 h-4 mr-2" />
          Add Logo
        </button>
      </div>

      {/* Logo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {logos.map((logo) => (
          <div key={logo._id} className="bg-white dark:bg-dark-surface rounded-lg shadow-md overflow-hidden">
            <div className="aspect-square bg-gray-100 dark:bg-dark-bg flex items-center justify-center p-4">
              {logo.imageType === 'file' ? (
                <img 
                  src={`${config.API_URL}${logo.image}`} 
                  alt={logo.name}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <img 
                  src={logo.image} 
                  alt={logo.name}
                  className="max-w-full max-h-full object-contain"
                />
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-dark-text mb-1">{logo.name}</h3>
              <div className="flex items-center justify-end text-xs text-gray-500 dark:text-dark-text-light mb-3">
                <span className={`px-2 py-1 rounded ${logo.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {logo.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(logo)}
                  className="flex-1 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors flex items-center justify-center"
                >
                  <FaEdit className="w-3 h-3 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleToggleActive(logo._id)}
                  className={`px-3 py-1 rounded text-sm transition-colors flex items-center justify-center ${
                    logo.isActive 
                      ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {logo.isActive ? <FaEyeSlash className="w-3 h-3" /> : <FaEye className="w-3 h-3" />}
                </button>
                <button
                  onClick={() => handleDelete(logo._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors flex items-center justify-center"
                >
                  <FaTrash className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {logos.length === 0 && (
        <div className="text-center py-12">
          <FaImage className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-2">No logos yet</h3>
          <p className="text-gray-500 dark:text-dark-text-secondary mb-4">Get started by adding your first logo</p>
          <button
            onClick={openModal}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Add Logo
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-surface rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-dark-text mb-4">
              {editingLogo ? 'Edit Logo' : 'Add New Logo'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
                  Logo Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-dark-bg dark:text-dark-text"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
                  Logo Image *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-dark-bg dark:text-dark-text"
                  required={!editingLogo}
                />
                {formData.imagePreview && (
                  <div className="mt-2">
                    <img 
                      src={formData.imagePreview} 
                      alt="Preview" 
                      className="w-20 h-20 object-contain border border-gray-300 dark:border-dark-border rounded"
                    />
                  </div>
                )}
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-dark-border text-gray-700 dark:text-dark-text rounded-lg hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
                >
                  {uploading ? 'Saving...' : (editingLogo ? 'Update' : 'Add')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoManagement;
