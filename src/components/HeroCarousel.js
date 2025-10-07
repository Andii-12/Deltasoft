import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Static slides with image paths only
  const slides = [
    {
      image: "/images/carousel/slide1.jpg"
    }
  ];

  // Reset image loaded state when slide changes
  useEffect(() => {
    setImageLoaded(false);
  }, [currentSlide]);

  useEffect(() => {
    // Only auto-rotate if there are multiple slides
    if (slides.length > 1) {
      const timer = setInterval(() => {
        setIsFading(true);
        setTimeout(() => {
          setCurrentSlide((prev) => (prev + 1) % slides.length);
          setIsFading(false);
        }, 300);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [slides.length]);

  const nextSlide = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsFading(false);
    }, 300);
  };

  const prevSlide = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setIsFading(false);
    }, 300);
  };

  return (
    <div className="relative flex-shrink-0 h-80 md:h-96 lg:h-[40vh] overflow-hidden bg-gray-200 dark:bg-gray-700">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={slides[currentSlide].image}
          alt={`Carousel slide ${currentSlide + 1}`}
          className={`w-full h-full object-cover transition-all duration-700 ${isFading ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}
          onLoad={() => {
            console.log('Image loaded successfully:', slides[currentSlide].image);
            setImageLoaded(true);
          }}
          onError={(e) => {
            console.log('Image failed to load:', slides[currentSlide].image);
            setImageLoaded(false);
            // If image fails to load, hide the image
            e.target.style.display = 'none';
          }}
        />
        {/* Fallback content when image fails to load */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700">
            <div className="text-center">
              <div className="text-4xl mb-2">🖼️</div>
              <p className="text-sm">Upload images to /public/images/carousel/</p>
              <p className="text-xs">Name them: slide1.jpg, slide2.jpg, slide3.jpg, slide4.jpg</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Arrows - only show if multiple slides */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 dark:bg-dark-surface/20 backdrop-blur-sm hover:bg-white/30 dark:hover:bg-dark-surface/30 transition-all hover:scale-110 active:scale-95 hover:-translate-x-1"
            aria-label="Previous slide"
          >
            <FaChevronLeft className="w-6 h-6 text-text-primary dark:text-dark-text" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 dark:bg-dark-surface/20 backdrop-blur-sm hover:bg-white/30 dark:hover:bg-dark-surface/30 transition-all hover:scale-110 active:scale-95 hover:translate-x-1"
            aria-label="Next slide"
          >
            <FaChevronRight className="w-6 h-6 text-text-primary dark:text-dark-text" />
          </button>
        </>
      )}

      {/* Dots Indicator - only show if multiple slides */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsFading(true);
                setTimeout(() => {
                  setCurrentSlide(index);
                  setIsFading(false);
                }, 300);
              }}
              className={`rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-8 h-3 bg-primary' 
                  : 'w-3 h-3 bg-text-light dark:bg-dark-text-light hover:bg-primary/50 hover:scale-125'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroCarousel;
