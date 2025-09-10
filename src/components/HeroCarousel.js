import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Deltasoft LLC",
      subtitle: "IT Solutions & Digital Services",
      description: "Transforming ideas into powerful digital solutions with cutting-edge technology and expert development teams.",
      bgColor: "bg-gradient-to-br from-primary/10 to-primary/5",
      icon: "💻"
    },
    {
      title: "Web Development",
      subtitle: "Modern & Responsive Websites",
      description: "Custom web applications built with the latest technologies for optimal performance and user experience.",
      bgColor: "bg-gradient-to-br from-blue-500/10 to-blue-600/5",
      icon: "🌐"
    },
    {
      title: "IT Consulting",
      subtitle: "Strategic Technology Solutions",
      description: "Expert guidance to help your business leverage technology for growth and efficiency.",
      bgColor: "bg-gradient-to-br from-green-500/10 to-green-600/5",
      icon: "🚀"
    },
    {
      title: "24/7 Support",
      subtitle: "Always Here When You Need Us",
      description: "Round-the-clock technical support to keep your systems running smoothly.",
      bgColor: "bg-gradient-to-br from-purple-500/10 to-purple-600/5",
      icon: "⚡"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background dark:bg-dark-bg overflow-hidden">
      {/* Content with smooth transitions */}
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="mb-12">
          <div className="text-6xl mb-6 animate-bounce">
            <div className="transition-all duration-500 ease-in-out transform">
              {slides[currentSlide].icon}
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-text-primary dark:text-dark-text transition-all duration-500 ease-in-out transform">
            {slides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl text-primary font-semibold mb-6 transition-all duration-500 ease-in-out transform">
            {slides[currentSlide].subtitle}
          </p>
          <p className="text-lg text-text-secondary dark:text-dark-text-secondary max-w-3xl mx-auto leading-relaxed transition-all duration-500 ease-in-out transform">
            {slides[currentSlide].description}
          </p>
        </div>

        {/* CTA Buttons with animation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-500 ease-in-out transform">
          <button className="btn btn-primary px-8 py-3 text-lg hover:scale-105 transition-transform duration-300">
            Get Started
          </button>
          <button className="btn btn-outline px-8 py-3 text-lg hover:scale-105 transition-transform duration-300">
            Learn More
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 dark:bg-dark-surface/20 backdrop-blur-sm hover:bg-white/30 dark:hover:bg-dark-surface/30 transition-all"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="w-6 h-6 text-text-primary dark:text-dark-text" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 dark:bg-dark-surface/20 backdrop-blur-sm hover:bg-white/30 dark:hover:bg-dark-surface/30 transition-all"
        aria-label="Next slide"
      >
        <FaChevronRight className="w-6 h-6 text-text-primary dark:text-dark-text" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-primary scale-125' 
                : 'bg-text-light dark:bg-dark-text-light hover:bg-primary/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
