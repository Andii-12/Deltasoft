import React, { useState, useEffect, useMemo } from 'react';

const SimpleCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const slides = useMemo(() => [
    {
      image: "/images/carousel/slide1.jpg",
      fallback: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop&crop=center"
    },
    {
      image: "/images/carousel/slide2.jpg", 
      fallback: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop&crop=center"
    },
    {
      image: "/images/carousel/slide3.jpg",
      fallback: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=400&fit=crop&crop=center"
    }
  ], []);

  useEffect(() => {
    // Test if image loads
    const img = new Image();
    img.onload = () => {
      console.log('✅ Simple carousel image loaded:', slides[currentSlide].image);
      setImageLoaded(true);
    };
    img.onerror = () => {
      console.log('❌ Simple carousel image failed:', slides[currentSlide].image);
      console.log('🔄 Trying fallback image...');
      setImageLoaded(false);
    };
    img.src = slides[currentSlide].image;
  }, [currentSlide, slides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-80 md:h-96 lg:h-[40vh] overflow-hidden bg-gray-200 dark:bg-gray-700">
      <div className="absolute inset-0">
        <img
          src={imageLoaded ? slides[currentSlide].image : slides[currentSlide].fallback}
          alt={`Slide ${currentSlide + 1}`}
          className="w-full h-full object-cover"
          onLoad={() => {
            console.log('✅ Image displayed successfully');
            setImageLoaded(true);
          }}
          onError={(e) => {
            console.log('❌ Both image and fallback failed');
            e.target.style.display = 'none';
          }}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/10">
            <div className="text-center">
              <div className="text-6xl mb-4">🚀</div>
              <h2 className="text-2xl font-bold text-primary mb-2">Deltasoft</h2>
              <p className="text-sm mb-2">Орчин үеийн програм хангамжийн шийдэл</p>
              <p className="text-xs text-gray-400">Loading: {slides[currentSlide].image}</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
      >
        ←
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
      >
        →
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'w-8 h-3 bg-primary' 
                : 'w-3 h-3 bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SimpleCarousel;
