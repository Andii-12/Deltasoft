import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const News = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch('http://localhost:5001/api/news');
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
    <section id="news" className="py-20 bg-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            <span className="text-neon-green">ШИНЭ</span> МЭДЭЭ
          </h2>
        </div>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {loading ? (
          <div className="text-center text-white">Уншиж байна...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleNews.length === 0 ? (
                <div className="col-span-3 text-center text-gray-400">Одоогоор нийтлэгдсэн мэдээ алга байна.</div>
              ) : (
                visibleNews.map((item, index) => (
                  <Link
                    to={`/news/${item._id}`}
                    key={item._id || index}
                    className="bg-darker rounded-xl overflow-hidden hover:shadow-xl hover:shadow-neon-green/10 transition-all duration-300 block"
                  >
                    <div className="relative h-48 overflow-hidden bg-black flex items-center justify-center">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-700">No Image</span>
                      )}
                      <div className="absolute top-4 right-4 bg-neon-green px-3 py-1 rounded-full text-darker text-sm font-medium">
                        {item.category || 'Мэдээ'}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="text-gray-400 text-sm mb-2">{new Date(item.date).toLocaleDateString('mn-MN')}</div>
                      <h3 className="text-xl font-semibold text-white mb-3 hover:text-neon-green transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 mb-4">{item.content?.slice(0, 100)}...</p>
                    </div>
                  </Link>
                ))
              )}
            </div>
            <div className="flex justify-center mt-8">
              <Link
                to="/news"
                className="px-8 py-3 bg-neon-green text-darker font-bold rounded-lg hover:bg-neon-green/90 transition-all text-lg shadow-lg"
              >
                Бүх мэдээ үзэх
              </Link>
            </div>
          </>
        )}
      </div>
      {/* Decorative elements */}
      <div className="absolute left-0 top-1/4 w-96 h-96 bg-neon-green/5 rounded-full filter blur-[128px]" />
      <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-neon-green/5 rounded-full filter blur-[128px]" />
    </section>
  );
};

export default News; 