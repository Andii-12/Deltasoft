import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import config from '../config';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${config.API_URL}/api/news`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setNews(
          data
            .filter(n => n.status === 'published')
            .sort((a, b) => new Date(b.date) - new Date(a.date))
        );
        setLoading(false);
      })
      .catch(error => {
        setError('Сервертэй холбогдоход алдаа гарлаа');
        setLoading(false);
        console.error(error);
      });
  }, []);

  if (loading) return <div className="text-center py-20 text-gray-400 bg-darker min-h-screen"><Navbar />Уншиж байна...<Footer /></div>;
  if (!news.length) return <div className="text-center py-20 text-gray-400 bg-darker min-h-screen"><Navbar />Мэдээ олдсонгүй.<Footer /></div>;

  const [main, ...rest] = news;
  const featured = rest.slice(0, 2);
  const others = rest.slice(2);

  return (
    <div className="bg-darker min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 w-full py-10 mt-24">
        {/* Featured Section */}
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Main Featured */}
          <div className="lg:col-span-2">
            <Link to={`/news/${main._id}`} className="relative rounded-xl overflow-hidden shadow-lg group bg-dark block h-full min-h-[340px]">
              {main.image && (
                <img src={main.image} alt={main.title} className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <div className="text-neon-green text-lg font-bold mb-2 line-clamp-2">{main.title}</div>
                <div className="text-gray-300 text-sm mb-2">{new Date(main.date).toLocaleDateString('mn-MN')}</div>
                <div className="text-gray-200 text-base line-clamp-2">{main.content?.slice(0, 100)}...</div>
              </div>
            </Link>
          </div>
          {/* Side Featured */}
          <div className="flex flex-col gap-4">
            <div className="text-white text-lg font-bold mb-2">Мэдээ мэдээлэл</div>
            {featured.map(item => (
              <Link to={`/news/${item._id}`} key={item._id} className="flex gap-4 bg-dark rounded-xl shadow hover:shadow-lg transition p-3 min-h-[100px] items-center">
                {item.image && (
                  <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-lg" />
                )}
                <div className="flex-1">
                  <div className="text-white font-semibold line-clamp-2 text-base">{item.title}</div>
                  <div className="text-gray-400 text-xs mt-1">{new Date(item.date).toLocaleDateString('mn-MN')}</div>
                  <div className="text-gray-400 text-xs line-clamp-2">{item.content?.slice(0, 60)}...</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* Other News */}
        <div className="w-full bg-dark/80 py-10">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-white">Бусад нийтлэлүүд</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {others.length === 0 ? (
                <div className="col-span-full text-center text-gray-400">Бусад нийтлэл алга байна.</div>
              ) : (
                others.map(item => (
                  <Link to={`/news/${item._id}`} key={item._id} className="bg-dark rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col">
                    {item.image && (
                      <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
                    )}
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="text-white font-semibold mb-2 line-clamp-2">{item.title}</div>
                      <div className="text-gray-400 text-xs mb-2">{new Date(item.date).toLocaleDateString('mn-MN')}</div>
                      <div className="text-gray-400 text-sm line-clamp-3">{item.content?.slice(0, 80)}...</div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {error && <div style={{ color: 'red', margin: '1em 0' }}>{error}</div>}
    </div>
  );
};

export default NewsPage; 