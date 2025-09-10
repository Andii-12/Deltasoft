import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../config';

const News = () => {
  const [newsItems, setNewsItems] = useState([]);
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
          setNewsItems(data.filter(item => item.status === 'published'));
        } else {
          setError(data.message || 'Мэдээ авахад алдаа гарлаа');
        }
      } catch (err) {
        setError('Сервертэй холбогдоход алдаа гарлаа');
      }
      setLoading(false);
    };
    fetchNews();
  }, []);

  const featuredNews = newsItems.filter(item => item.category === 'Онцлох мэдээ');
  const visibleNews = featuredNews.slice(0, 3);

  return (
    <section id="news" className="py-16 bg-surface dark:bg-dark-surface">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-dark-text mb-4">
            <span className="text-primary">ШИНЭ</span> МЭДЭЭ
          </h2>
          <p className="text-lg text-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
            Сүүлийн үеийн мэдээлэл болон шинэчлэлтүүд
          </p>
        </div>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {loading ? (
          <div className="text-center text-text-secondary dark:text-dark-text-secondary">Уншиж байна...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleNews.length === 0 ? (
                <div className="col-span-3 text-center text-text-light dark:text-dark-text-secondary">Одоогоор нийтлэгдсэн мэдээ алга байна.</div>
              ) : (
                visibleNews.map((item, index) => (
                  <Link
                    to={`/news/${item._id}`}
                    key={item._id || index}
                    className="card card-hover block"
                  >
                    <div className="relative h-40 overflow-hidden bg-surface dark:bg-dark-surface flex items-center justify-center rounded">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-text-light dark:text-dark-text-secondary">No Image</span>
                      )}
                      <div className="absolute top-2 right-2 bg-primary px-2 py-1 rounded text-white text-xs">
                        {item.category || 'Мэдээ'}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="text-text-light dark:text-dark-text-secondary text-xs mb-2">{new Date(item.date).toLocaleDateString('mn-MN')}</div>
                      <h3 className="text-lg font-medium text-text-primary dark:text-dark-text mb-2 hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-text-light dark:text-dark-text-secondary text-sm">{item.content?.slice(0, 100)}...</p>
                    </div>
                  </Link>
                ))
              )}
            </div>
            <div className="flex justify-center mt-6">
              <Link
                to="/news"
                className="btn btn-primary"
              >
                Бүх мэдээ үзэх
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default News; 