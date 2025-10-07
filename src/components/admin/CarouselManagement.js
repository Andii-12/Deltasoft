import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import config from '../../config';

const CarouselManagement = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSlide = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setError('Please select an image');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('order', slides.length);

      console.log('Uploading to:', `${config.API_URL}/api/carousel`);
      console.log('File:', imageFile.name, imageFile.type);

      const response = await fetch(`${config.API_URL}/api/carousel`, {
        method: 'POST',
        headers: { 'x-auth-token': token },
        body: formData
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
        setImageFile(null);
        setImagePreview(null);
        setShowAddForm(false);
        fetchSlides();
      } else {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        try {
          const errorData = JSON.parse(errorText);
          setError(errorData.message || 'Failed to add slide');
        } catch {
          setError(`Server error: ${response.status}. Make sure the backend is deployed with carousel routes.`);
        }
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Error connecting to server. Make sure the backend is running and deployed.');
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
        method: 'POST',
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
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-dark-text">Add New Carousel Image</h3>
          <form onSubmit={handleAddSlide} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary text-gray-900"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Recommended size: 1920x600px or similar wide format</p>
            </div>

            {imagePreview && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">
                  Preview:
                </label>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg border border-gray-300"
                />
              </div>
            )}

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
                onClick={() => {
                  setShowAddForm(false);
                  setImageFile(null);
                  setImagePreview(null);
                }}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Slides List */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {slides.map((slide, index) => (
          <div
            key={slide._id}
            className="bg-white dark:bg-dark-surface rounded-lg shadow-md overflow-hidden"
          >
            {slide.image && (
              <img
                src={`${config.API_URL}${slide.image}`}
                alt={`Slide ${index + 1}`}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-dark-text-secondary">Slide {index + 1}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => moveSlide(slide._id, 'up')}
                    disabled={index === 0}
                    className="p-1.5 text-gray-600 hover:text-primary disabled:opacity-30"
                    title="Move up"
                  >
                    <FaArrowUp />
                  </button>
                  <button
                    onClick={() => moveSlide(slide._id, 'down')}
                    disabled={index === slides.length - 1}
                    className="p-1.5 text-gray-600 hover:text-primary disabled:opacity-30"
                    title="Move down"
                  >
                    <FaArrowDown />
                  </button>
                  <button
                    onClick={() => handleDeleteSlide(slide._id)}
                    className="p-1.5 text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
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

