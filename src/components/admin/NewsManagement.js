import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const API_URL = 'http://localhost:5001/api/news';

const NewsManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    status: 'draft',
    image: null,
    category: 'Мэдээ',
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNews = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(API_URL, {
        headers: { 'x-auth-token': token }
      });
      const data = await response.json();
      if (response.ok) {
        setNewsList(data);
      } else {
        setError(data.message || 'Мэдээ авахад алдаа гарлаа');
      }
    } catch (err) {
      setError('Сервертэй холбогдоход алдаа гарлаа');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleAddNews = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      const form = new FormData();
      form.append('title', formData.title);
      form.append('content', formData.content);
      form.append('status', formData.status);
      form.append('category', formData.category);
      if (formData.image) form.append('image', formData.image);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'x-auth-token': token
          // Do NOT set Content-Type here!
        },
        body: form
      });
      const data = await response.json();
      if (response.ok) {
        setNewsList([data, ...newsList]);
        setShowModal(false);
        setFormData({ title: '', content: '', status: 'draft', image: null, category: 'Мэдээ' });
        setImagePreview(null);
      } else {
        setError(data.message || 'Мэдээ нэмэхэд алдаа гарлаа');
      }
    } catch (err) {
      setError('Сервертэй холбогдоход алдаа гарлаа');
    }
  };

  const handleEditNews = (news) => {
    setEditingId(news._id);
    setFormData({
      title: news.title,
      content: news.content,
      status: news.status,
      image: news.image,
      category: news.category,
    });
    setShowModal(true);
  };

  const handleUpdateNews = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      const form = new FormData();
      form.append('title', formData.title);
      form.append('content', formData.content);
      form.append('status', formData.status);
      form.append('category', formData.category);
      if (formData.image && typeof formData.image !== 'string') {
        form.append('image', formData.image);
      }

      const response = await fetch(`${API_URL}/${editingId}`, {
        method: 'PUT',
        headers: {
          'x-auth-token': token
        },
        body: form
      });
      const data = await response.json();
      if (response.ok) {
        setNewsList(newsList.map(news => news._id === editingId ? data : news));
        setShowModal(false);
        setEditingId(null);
        setFormData({ title: '', content: '', status: 'draft', image: null, category: 'Мэдээ' });
        setImagePreview(null);
      } else {
        setError(data.message || 'Мэдээ засахад алдаа гарлаа');
      }
    } catch (err) {
      setError('Сервертэй холбогдоход алдаа гарлаа');
    }
  };

  const handleDeleteNews = async (id) => {
    if (!window.confirm('Энэ мэдээг устгахдаа итгэлтэй байна уу?')) return;
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { 'x-auth-token': token }
      });
      if (response.ok) {
        setNewsList(newsList.filter(news => news._id !== id));
      } else {
        const data = await response.json();
        setError(data.message || 'Мэдээ устгахад алдаа гарлаа');
      }
    } catch (err) {
      setError('Сервертэй холбогдоход алдаа гарлаа');
    }
  };

  // Image change handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Мэдээний жагсаалт</h2>
        <button
          onClick={() => { setShowModal(true); setEditingId(null); setFormData({ title: '', content: '', status: 'draft', image: null, category: 'Мэдээ' }); }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
        >
          <FaPlus /> Шинэ мэдээ нэмэх
        </button>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <div>Уншиж байна...</div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Гарчиг</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Огноо</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Төлөв</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Үйлдэл</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {newsList.map((news) => (
                <tr key={news._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{news.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(news.date).toLocaleDateString('mn-MN')}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      news.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {news.status === 'published' ? 'Нийтлэгдсэн' : 'Ноорог'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleEditNews(news)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <FaEdit className="text-xl" />
                      </button>
                      <button
                        onClick={() => handleDeleteNews(news._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash className="text-xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* News Form Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {editingId ? 'Мэдээ засах' : 'Шинэ мэдээ нэмэх'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTrash />
              </button>
            </div>
            <form onSubmit={editingId ? handleUpdateNews : handleAddNews} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Гарчиг</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Ангилал</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  required
                >
                  <option value="Онцлох мэдээ">Онцлох мэдээ</option>
                  <option value="Мэдээ">Мэдээ</option>
                </select>
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">Агуулга</label>
                <textarea
                  id="content"
                  name="content"
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Төлөв</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="draft">Ноорог</option>
                  <option value="published">Нийтлэх</option>
                </select>
              </div>
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">Зураг (thumbnail)</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-1 block w-full text-gray-900"
                />
                {imagePreview && (
                  <img src={imagePreview} alt="preview" className="mt-2 h-32 object-contain rounded border" />
                )}
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Цуцлах
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  {editingId ? 'Хадгалах' : 'Нэмэх'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsManagement; 