import React, { useState, useEffect } from 'react';
import config from '../config';

const Logos = () => {
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLogos();
  }, []);

  const fetchLogos = async () => {
    try {
      console.log('📡 Fetching logos from:', `${config.API_URL}/api/logos/active`);
      const response = await fetch(`${config.API_URL}/api/logos/active`);
      const data = await response.json();
      if (response.ok) {
        console.log('✅ Logos loaded:', data.length, 'logos');
        setLogos(data);
      } else {
        console.log('⚠️ Failed to load logos');
        setError('Failed to load logos');
      }
    } catch (err) {
      console.error('❌ Logos fetch error:', err.message);
      setError('Failed to load logos');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-background dark:bg-dark-bg">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-dark-text mb-4">
              Our <span className="text-primary">Partners</span>
            </h2>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error || logos.length === 0) {
    return null; // Don't show section if no logos
  }

  return (
    <section className="flex-shrink-0 py-3 bg-surface dark:bg-dark-surface">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-1.5">
          <h2 className="text-sm md:text-base font-bold text-text-primary dark:text-dark-text">
            Our <span className="text-primary">Partners</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-1.5">
          {logos.map((logo) => (
            <div
              key={logo._id}
              className="group bg-white dark:bg-dark-bg rounded p-1.5 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
            >
              <div className="aspect-square flex items-center justify-center">
                {logo.imageType === 'file' ? (
                  <img
                    src={`${config.API_URL}${logo.image}`}
                    alt={logo.name}
                    loading="lazy"
                    decoding="async"
                    className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <img
                    src={logo.image}
                    alt={logo.name}
                    loading="lazy"
                    decoding="async"
                    className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Logos;
