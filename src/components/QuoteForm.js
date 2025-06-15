import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('http://localhost:5001/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          description: ''
        });
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        setError(data.message || 'Алдаа гарлаа. Дахин оролдоно уу.');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setError('Серверт холбогдоход алдаа гарлаа. Дахин оролдоно уу.');
    }
  };

  return (
    <div className="min-h-screen bg-darker">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 pt-32 pb-16">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">Үнийн санал</h2>
          <p className="text-gray-600 text-center mb-8">
            Бидэнтэй хамтран ажиллахыг хүсвэл доорх формыг бөглөнө үү
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
              Таны хүсэлтийг хүлээн авлаа. Удахгүй бид тантай холбогдох болно.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Нэр
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-neon-green focus:ring-neon-green text-gray-900"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                Байгууллагын нэр
              </label>
              <input
                type="text"
                id="company"
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-neon-green focus:ring-neon-green text-gray-900"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                И-мэйл
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-neon-green focus:ring-neon-green text-gray-900"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Утасны дугаар
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-neon-green focus:ring-neon-green text-gray-900"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Тайлбар
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Та өөрийн хэрэгцээ шаардлагын талаар дэлгэрэнгүй бичнэ үү..."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-neon-green focus:ring-neon-green text-gray-900"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-neon-green text-darker py-3 px-4 rounded-lg hover:bg-neon-green/90 transition-all transform hover:scale-[1.02] font-medium"
              >
                Илгээх
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuoteForm; 