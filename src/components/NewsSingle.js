import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
        const response = await fetch(`http://localhost:5001/api/news`);
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

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Уншиж байна...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  if (!news) return <div className="min-h-screen flex items-center justify-center text-gray-400">Мэдээ олдсонгүй.</div>;

  return (
    <section className="min-h-screen bg-dark flex flex-col items-center justify-center py-16 px-4">
      <div className="max-w-2xl w-full bg-darker rounded-xl shadow-lg overflow-hidden">
        <div className="p-8 pb-0 flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-block px-6 py-2 bg-neon-green text-darker font-semibold rounded-lg hover:bg-neon-green/90 transition-all mb-4"
          >
            Буцах
          </button>
        </div>
        {news.image && (
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-72 object-cover object-center"
          />
        )}
        <div className="p-8 pt-4">
          <div className="text-gray-400 text-sm mb-2">{new Date(news.date).toLocaleDateString('mn-MN')}</div>
          <h1 className="text-3xl font-bold text-white mb-4">{news.title}</h1>
          <div className="text-gray-300 mb-6 whitespace-pre-line">{news.content}</div>
        </div>
      </div>
    </section>
  );
};

export default NewsSingle; 