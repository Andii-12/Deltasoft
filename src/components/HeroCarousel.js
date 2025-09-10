import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFading, setIsFading] = useState(false);
  
  const slides = [
    {
      title: "Дельтасофт ХХК",
      subtitle: "МТ шийдэл & Дижитал үйлчилгээ",
      description: "Орчин үеийн технологи болон мэргэжлийн хөгжүүлэгчдийн багтайгаар санааг хүчирхэг дижитал шийдэл болгон хувиргах.",
      bgColor: "bg-gradient-to-br from-primary/10 to-primary/5",
      icon: "💻"
    },
    {
      title: "Веб хөгжүүлэлт",
      subtitle: "Орчин үеийн & Уян хатан вэбсайт",
      description: "Хамгийн сүүлийн үеийн технологиор бүтээгдсэн, оновчтой гүйцэтгэл болон хэрэглэгчийн туршлагад зориулсан вэб аппликешн.",
      bgColor: "bg-gradient-to-br from-blue-500/10 to-blue-600/5",
      icon: "🌐"
    },
    {
      title: "МТ зөвлөгөө",
      subtitle: "Стратегийн технологийн шийдэл",
      description: "Таны бизнесийг өсөлт, үр ашигтай ажиллагаанд технологийг ашиглахад туслах мэргэжлийн зөвлөгөө.",
      bgColor: "bg-gradient-to-br from-green-500/10 to-green-600/5",
      icon: "🚀"
    },
    {
      title: "24/7 дэмжлэг",
      subtitle: "Хэрэгтэй үедээ энд байна",
      description: "Таны системийг зохих байдлаар ажиллуулахын тулд өдөр шөнийн 24 цаг техникийн дэмжлэг үзүүлэх.",
      bgColor: "bg-gradient-to-br from-purple-500/10 to-purple-600/5",
      icon: "⚡"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsFading(false);
      }, 300);
    }, 5000);
    return () => clearInterval(timer);
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
    <div className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-all duration-500 ${slides[currentSlide].bgColor}`}>
      {/* Content with smooth transitions */}
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className={`mb-12 transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
          <div className="text-6xl mb-6">
            <div className="transition-all duration-300 ease-in-out transform">
              {slides[currentSlide].icon}
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-text-primary dark:text-dark-text transition-all duration-300 ease-in-out transform">
            {slides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl text-primary font-semibold mb-6 transition-all duration-300 ease-in-out transform">
            {slides[currentSlide].subtitle}
          </p>
          <p className="text-lg text-text-secondary dark:text-dark-text-secondary max-w-3xl mx-auto leading-relaxed transition-all duration-300 ease-in-out transform">
            {slides[currentSlide].description}
          </p>
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
