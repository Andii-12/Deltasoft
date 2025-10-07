import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaEdit, FaSave, FaTimes, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import config from '../../config';

const CarouselManagement = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingSlide, setEditingSlide] = useState(null);
  const [newSlide, setNewSlide] = useState({
    title: '',
    subtitle: '',
    description: '',
    icon: '',
    bgColor: 'bg-gradient-to-br from-primary/10 to-primary/5',
    image: null,
    order: 0
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const iconOptions = ['💻', '🌐', '🚀', '⚡', '🔒', '📱', '🎯', '✨', '🎨', '📊'];
  const bgColorOptions = [
    { value: 'bg-gradient-to-br from-primary/10 to-primary/5', label: 'Green' },
    { value: 'bg-gradient-to-br from-blue-500/10 to-blue-600/5', label: 'Blue' },
    { value: 'bg-gradient-to-br from-green-500/10 to-green-600/5', label: 'Light Green' },
    { value: 'bg-gradient-to-br from-purple-500/10 to-purple-600/5', label: 'Purple' },
    { value: 'bg-gradient-to-br from-orange-500/10 to-orange-600/5', label: 'Orange' },
    { value: 'bg-gradient-to-br from-pink-500/10 to-pink-600/5', label: 'Pink' }
  ];

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${config.API_URL}/api/carousel`, {
        headers: { 'x-auth-token': token }
      });
      if (response.ok) {
        const data = await response.json();
        setSlides(data.sort((a, b) => a.order - b.order));
      } else {
        setError('Failed to fetch slides');
      }
    } catch (err) {
      setError('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSlide = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const formData = new FormData();
      formData.append('title', newSlide.title);
      formData.append('subtitle', newSlide.subtitle);
      formData.append('description', newSlide.description);
      formData.append('icon', newSlide.icon);
      formData.append('bgColor', newSlide.bgColor);
      formData.append('order', slides.length);
      if (newSlide.image) {
        formData.append('image', newSlide.image);
      }

      const response = await fetch(`${config.API_URL}/api/carousel`, {
        method: 'POST',
        headers: { 'x-auth-token': token },
        body: formData
      });

      if (response.ok) {
        setNewSlide({
          title: '',
          subtitle: '',
          description: '',
          icon: '',
          bgColor: 'bg-gradient-to-br from-primary/10 to-primary/5',
          image: null,
          order: 0
        });
        setShowAddForm(false);
        fetchSlides();
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to add slide');
      }
    } catch (err) {
      setError('Error adding slide');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSlide = async (slideId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${config.API_URL}/api/carousel/${slideId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(editingSlide)
      });

      if (response.ok) {
        setEditingSlide(null);
        fetchSlides();
      } else {
        setError('Failed to update slide');
      }
    } catch (err) {
      setError('Error updating slide');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSlide = async (slideId) => {
    if (!window.confirm('Are you sure you want to delete this slide?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${config.API_URL}/api/carousel/${slideId}`, {
        method: 'DELETE',
        headers: { 'x-auth-token': token }
      });

      if (response.ok) {
        fetchSlides();
      } else {
        setError('Failed to delete slide');
      }
    } catch (err) {
      setError('Error deleting slide');
    }
  };

  const moveSlide = async (slideId, direction) => {
    const slideIndex = slides.findIndex(s => s._id === slideId);
    if (
      (direction === 'up' && slideIndex === 0) ||
      (direction === 'down' && slideIndex === slides.length - 1)
    ) {
      return;
    }

    const newSlides = [...slides];
    const targetIndex = direction === 'up' ? slideIndex - 1 : slideIndex + 1;
    [newSlides[slideIndex], newSlides[targetIndex]] = [newSlides[targetIndex], newSlides[slideIndex]];

    // Update order values
    newSlides.forEach((slide, index) => {
      slide.order = index;
    });

    setSlides(newSlides);

    try {
      const token = localStorage.getItem('adminToken');
      await fetch(`${config.API_URL}/api/carousel/reorder`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({ slides: newSlides.map(s => ({ id: s._id, order: s.order })) })
      });
    } catch (err) {
      setError('Error reordering slides');
      fetchSlides();
    }
  };

  if (loading && slides.length === 0) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text">Carousel Management</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center"
        >
          <FaPlus className="mr-2" />
          Add New Slide
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Add New Slide Form */}
      {showAddForm && (
        <div className="bg-white dark:bg-dark-surface rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-dark-text">Add New Slide</h3>
          <form onSubmit={handleAddSlide} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                Title
              </label>
              <input
                type="text"
                value={newSlide.title}
                onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary text-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                Subtitle
              </label>
              <input
                type="text"
                value={newSlide.subtitle}
                onChange={(e) => setNewSlide({ ...newSlide, subtitle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary text-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                Description
              </label>
              <textarea
                value={newSlide.description}
                onChange={(e) => setNewSlide({ ...newSlide, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary text-gray-900"
                rows="3"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                Icon (Emoji)
              </label>
              <div className="flex flex-wrap gap-2">
                {iconOptions.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setNewSlide({ ...newSlide, icon })}
                    className={`text-2xl p-2 border rounded-lg ${
                      newSlide.icon === icon ? 'border-primary bg-primary/10' : 'border-gray-300'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                Background Color
              </label>
              <select
                value={newSlide.bgColor}
                onChange={(e) => setNewSlide({ ...newSlide, bgColor: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary text-gray-900"
              >
                {bgColorOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                Background Image (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewSlide({ ...newSlide, image: e.target.files[0] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary text-gray-900"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                Add Slide
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Slides List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {slides.map((slide, index) => (
          <div
            key={slide._id}
            className={`bg-white dark:bg-dark-surface rounded-lg shadow-md p-6 ${slide.bgColor}`}
          >
            {editingSlide && editingSlide._id === slide._id ? (
              // Edit Mode
              <div className="space-y-3">
                <input
                  type="text"
                  value={editingSlide.title}
                  onChange={(e) => setEditingSlide({ ...editingSlide, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
                />
                <input
                  type="text"
                  value={editingSlide.subtitle}
                  onChange={(e) => setEditingSlide({ ...editingSlide, subtitle: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
                />
                <textarea
                  value={editingSlide.description}
                  onChange={(e) => setEditingSlide({ ...editingSlide, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
                  rows="2"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdateSlide(slide._id)}
                    className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-dark flex items-center"
                  >
                    <FaSave className="mr-1" /> Save
                  </button>
                  <button
                    onClick={() => setEditingSlide(null)}
                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 flex items-center"
                  >
                    <FaTimes className="mr-1" /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              // View Mode
              <>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{slide.icon}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => moveSlide(slide._id, 'up')}
                      disabled={index === 0}
                      className="p-2 text-gray-600 hover:text-primary disabled:opacity-30"
                    >
                      <FaArrowUp />
                    </button>
                    <button
                      onClick={() => moveSlide(slide._id, 'down')}
                      disabled={index === slides.length - 1}
                      className="p-2 text-gray-600 hover:text-primary disabled:opacity-30"
                    >
                      <FaArrowDown />
                    </button>
                    <button
                      onClick={() => setEditingSlide(slide)}
                      className="p-2 text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteSlide(slide._id)}
                      className="p-2 text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-dark-text">{slide.title}</h3>
                <p className="text-primary font-semibold mb-2">{slide.subtitle}</p>
                <p className="text-gray-700 dark:text-dark-text-secondary text-sm">{slide.description}</p>
                {slide.image && (
                  <img
                    src={`${config.API_URL}${slide.image}`}
                    alt={slide.title}
                    className="mt-3 w-full h-32 object-cover rounded"
                  />
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {slides.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No slides yet. Add your first slide to get started!
        </div>
      )}
    </div>
  );
};

export default CarouselManagement;

