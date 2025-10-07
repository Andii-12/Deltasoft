import React, { useState, useEffect, useMemo } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  // const [imageError, setImageError] = useState(false);
  
  // Static slides with image paths only
  const slides = useMemo(() => [
    {
      image: "/images/carousel/slide1.jpg",
      fallback: "https://via.placeholder.com/800x400/22c55e/ffffff?text=Deltasoft+Carousel"
    },
    {
      image: "/images/carousel/slide2.jpg",
      fallback: "https://via.placeholder.com/800x400/16a34a/ffffff?text=Deltasoft+Solutions"
    },
    {
      image: "/images/carousel/slide3.jpg",
      fallback: "https://via.placeholder.com/800x400/15803d/ffffff?text=Deltasoft+Innovation"
    }
  ], []);

  // Reset image loaded state when slide changes
  useEffect(() => {
    setImageLoaded(false);
    // setImageError(false);
  }, [currentSlide]);

  // Preload images
  useEffect(() => {
    const preloadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });
    };

    const preloadAllImages = async () => {
      try {
        console.log('🔄 Preloading carousel images...');
        await Promise.all(slides.map(slide => preloadImage(slide.image)));
        console.log('✅ All carousel images preloaded successfully');
        setImageLoaded(true);
      } catch (error) {
        console.log('❌ Some images failed to preload, will try fallbacks');
        setImageLoaded(false);
      }
    };

    preloadAllImages();
  }, [slides]); // Include slides dependency since it's memoized

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
            console.log('✅ Image loaded successfully:', slides[currentSlide].image);
            setImageLoaded(true);
          }}
          onError={(e) => {
            console.log('❌ Image failed to load:', slides[currentSlide].image);
            console.log('🔄 Trying fallback image...');
            // setImageError(true);
            // Try fallback image
            if (slides[currentSlide].fallback && e.target.src !== slides[currentSlide].fallback) {
              e.target.src = slides[currentSlide].fallback;
              console.log('🔄 Switched to fallback:', slides[currentSlide].fallback);
            } else {
              console.log('❌ Fallback also failed, showing fallback content');
              e.target.style.display = 'none';
              setImageLoaded(false);
            }
          }}
        />
        {/* Fallback content when image fails to load */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400 bg-gradient-to-br from-primary/20 to-primary/10">
            <div className="text-center">
              <div className="text-6xl mb-4">🚀</div>
              <h2 className="text-2xl font-bold text-primary mb-2">Deltasoft</h2>
              <p className="text-sm mb-2">Орчин үеийн програм хангамжийн шийдэл</p>
              <p className="text-xs text-gray-400">Loading carousel images...</p>
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
