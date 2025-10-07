import React, { useState, useEffect, useMemo } from 'react';

const RobustCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const slides = useMemo(() => [
    {
      image: "/images/carousel/slide1.jpg",
      fallback: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop&crop=center",
      title: "Deltasoft Solutions",
      description: "Орчин үеийн програм хангамжийн шийдэл"
    },
    {
      image: "/images/carousel/slide2.jpg", 
      fallback: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop&crop=center",
      title: "Innovation & Technology",
      description: "Шинэлэг технологийн шийдэл"
    },
    {
      image: "/images/carousel/slide3.jpg",
      fallback: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=400&fit=crop&crop=center",
      title: "Digital Transformation",
      description: "Цифр хувиргалт"
    }
  ], []);

  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
    
    // Try to load the image
    const img = new Image();
    img.onload = () => {
      console.log('✅ Carousel image loaded:', slides[currentSlide].image);
      setImageLoaded(true);
      setImageError(false);
    };
    img.onerror = () => {
      console.log('❌ Carousel image failed:', slides[currentSlide].image);
      setImageLoaded(false);
      setImageError(true);
    };
    img.src = slides[currentSlide].image;
  }, [currentSlide, slides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative h-80 md:h-96 lg:h-[40vh] overflow-hidden bg-gray-200 dark:bg-gray-700">
      <div className="absolute inset-0">
        {/* Main Image */}
        <img
          src={imageLoaded ? currentSlideData.image : currentSlideData.fallback}
          alt={currentSlideData.title}
          className="w-full h-full object-cover transition-all duration-500"
          onLoad={() => {
            console.log('✅ Image displayed successfully');
            setImageLoaded(true);
          }}
          onError={(e) => {
            console.log('❌ Image failed, trying fallback');
            if (e.target.src === currentSlideData.image) {
              e.target.src = currentSlideData.fallback;
            } else {
              console.log('❌ Both image and fallback failed');
              e.target.style.display = 'none';
            }
          }}
        />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{currentSlideData.title}</h2>
            <p className="text-lg md:text-xl mb-4">{currentSlideData.description}</p>
            {!imageLoaded && imageError && (
              <p className="text-sm text-yellow-300">Using fallback image</p>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
        aria-label="Previous slide"
      >
        ←
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
        aria-label="Next slide"
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
                ? 'w-8 h-3 bg-white' 
                : 'w-3 h-3 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default RobustCarousel;
