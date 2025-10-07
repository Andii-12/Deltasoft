import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import config from '../config';

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
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    
    try {
      const response = await fetch(`${config.API_URL}/api/quotes`, {
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-dark-bg">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 pt-20 pb-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary dark:text-dark-text mb-4">
            Үнийн санал авах
          </h1>
          <p className="text-lg text-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
            Бидэнтэй хамтран ажиллахыг хүсвэл доорх формыг бөглөнө үү. 
            Манай мэргэжлийн баг танд хамгийн тохирох шийдлийг санал болгох болно.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-surface dark:bg-dark-surface rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text mb-6">
                Холбоо барих мэдээлэл
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-primary text-lg">📧</span>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary">И-мэйл</p>
                    <p className="text-text-primary dark:text-dark-text font-medium">info@deltasoft.mn</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-primary text-lg">📞</span>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary">Утас</p>
                    <p className="text-text-primary dark:text-dark-text font-medium">+976 11 123456</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-primary text-lg">📍</span>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary dark:text-dark-text-secondary">Хаяг</p>
                    <p className="text-text-primary dark:text-dark-text font-medium">Улаанбаатар хот, Сүхбаатар дүүрэг</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8">
              <h4 className="text-xl font-bold text-text-primary dark:text-dark-text mb-4">
                Яагаад биднийг сонгох вэ?
              </h4>
              <ul className="space-y-3 text-text-secondary dark:text-dark-text-secondary">
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>10+ жилийн туршлага</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Мэргэжлийн баг</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>24/7 дэмжлэг</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Хямд үнэ</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="bg-surface dark:bg-dark-surface rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text mb-6">
              Хүсэлт илгээх
            </h3>

            {error && (
              <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-100 dark:bg-green-900/20 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg mb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">✅</span>
                  <span>Таны хүсэлтийг хүлээн авлаа. Удахгүй бид тантай холбогдох болно.</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-primary dark:text-dark-text mb-2">
                    Нэр *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border dark:border-dark-border bg-background dark:bg-dark-bg text-text-primary dark:text-dark-text focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    placeholder="Таны нэр"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-text-primary dark:text-dark-text mb-2">
                    Байгууллагын нэр *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border dark:border-dark-border bg-background dark:bg-dark-bg text-text-primary dark:text-dark-text focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    placeholder="Байгууллагын нэр"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-primary dark:text-dark-text mb-2">
                    И-мэйл *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border dark:border-dark-border bg-background dark:bg-dark-bg text-text-primary dark:text-dark-text focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-text-primary dark:text-dark-text mb-2">
                    Утасны дугаар *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border dark:border-dark-border bg-background dark:bg-dark-bg text-text-primary dark:text-dark-text focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    placeholder="+976 99 123456"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-text-primary dark:text-dark-text mb-2">
                  Төслийн талаар дэлгэрэнгүй *
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  required
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Та өөрийн хэрэгцээ, шаардлагын талаар дэлгэрэнгүй бичнэ үү..."
                  className="w-full px-4 py-3 rounded-lg border border-border dark:border-dark-border bg-background dark:bg-dark-bg text-text-primary dark:text-dark-text focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-4 px-6 rounded-lg hover:bg-primary-dark transition-all transform hover:scale-[1.02] font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Илгээж байна...</span>
                  </div>
                ) : (
                  'Үнийн санал авах'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteForm; 