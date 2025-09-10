import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import config from '../config';

const NewsSingle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`${config.API_URL}/api/news`);
        const data = await response.json();
        if (response.ok) {
          const found = data.find(n => n._id === id);
          setNews(found);
        } else {
          setError(data.message || 'Мэдээ авахад алдаа гарлаа');
        }
      } catch (err) {
        setError('Сервертэй холбогдоход алдаа гарлаа');
      }
      setLoading(false);
    };
    fetchNews();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-text-secondary">Уншиж байна...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  if (!news) return <div className="min-h-screen flex items-center justify-center text-text-light">Мэдээ олдсонгүй.</div>;

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-secondary mb-6"
          >
            ← Буцах
          </button>
        </div>
        
        <article className="card">
          {news.image && (
            <img
              src={news.image}
              alt={news.title}
              loading="lazy"
              decoding="async"
              className="w-full h-64 md:h-80 object-cover rounded mb-6"
            />
          )}
          
          <div className="mb-4">
            <div className="text-text-light text-sm mb-3">{new Date(news.date).toLocaleDateString('mn-MN')}</div>
            <h1 className="text-2xl md:text-3xl font-semibold text-text-primary mb-4 leading-tight">{news.title}</h1>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <div className="text-text-primary text-base leading-relaxed whitespace-pre-line">{news.content}</div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default NewsSingle; 