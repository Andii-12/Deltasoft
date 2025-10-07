import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFading, setIsFading] = useState(false);
  
  // Static slides with image paths
  const slides = [
    {
      title: "Дельтасофт ХХК",
      subtitle: "МТ шийдэл & Дижитал үйлчилгээ",
      description: "Орчин үеийн технологи болон мэргэжлийн хөгжүүлэгчдийн багтайгаар санааг хүчирхэг дижитал шийдэл болгон хувиргах.",
      bgColor: "bg-gradient-to-br from-primary/10 to-primary/5",
      icon: "💻",
      image: "/images/carousel/slide1.jpg" // You can upload your image here
    },
    {
      title: "Веб хөгжүүлэлт",
      subtitle: "Орчин үеийн & Уян хатан вэбсайт",
      description: "Хамгийн сүүлийн үеийн технологиор бүтээгдсэн, оновчтой гүйцэтгэл болон хэрэглэгчийн туршлагад зориулсан вэб аппликешн.",
      bgColor: "bg-gradient-to-br from-blue-500/10 to-blue-600/5",
      icon: "🌐",
      image: "/images/carousel/slide2.jpg" // You can upload your image here
    },
    {
      title: "МТ зөвлөгөө",
      subtitle: "Стратегийн технологийн шийдэл",
      description: "Таны бизнесийг өсөлт, үр ашигтай ажиллагаанд технологийг ашиглахад туслах мэргэжлийн зөвлөгөө.",
      bgColor: "bg-gradient-to-br from-green-500/10 to-green-600/5",
      icon: "🚀",
      image: "/images/carousel/slide3.jpg" // You can upload your image here
    },
    {
      title: "24/7 дэмжлэг",
      subtitle: "Хэрэгтэй үедээ энд байна",
      description: "Таны системийг зохих байдлаар ажиллуулахын тулд өдөр шөнийн 24 цаг техникийн дэмжлэг үзүүлэх.",
      bgColor: "bg-gradient-to-br from-purple-500/10 to-purple-600/5",
      icon: "⚡",
      image: "/images/carousel/slide4.jpg" // You can upload your image here
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
    <div className={`relative flex-shrink-0 h-80 md:h-96 lg:h-[40vh] flex items-center justify-center overflow-hidden transition-all duration-700 ease-in-out ${slides[currentSlide].bgColor}`}>
      {/* Background Image or Gradient */}
      {slides[currentSlide].image ? (
        <div className="absolute inset-0">
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className={`w-full h-full object-cover transition-all duration-700 ${isFading ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}
            onError={(e) => {
              // If image fails to load, hide the image and show gradient background
              e.target.style.display = 'none';
              e.target.parentElement.style.background = slides[currentSlide].bgColor;
            }}
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      ) : (
        /* Animated background elements */
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl transition-all duration-1000 ${isFading ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`} style={{ transform: 'translate(-50%, -50%)' }}></div>
          <div className={`absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl transition-all duration-1000 delay-100 ${isFading ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`} style={{ transform: 'translate(50%, 50%)' }}></div>
        </div>
      )}

      {/* Content with smooth transitions */}
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className={`mb-4 transition-all duration-500 ${isFading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <div className={`text-3xl md:text-4xl mb-2 transition-all duration-500 ${isFading ? 'scale-75 rotate-12' : 'scale-100 rotate-0'}`}>
            <div className="inline-block animate-bounce-slow">
              {slides[currentSlide].icon}
            </div>
          </div>
          <h1 className={`text-xl md:text-3xl font-bold mb-2 text-text-primary dark:text-dark-text transition-all duration-500 delay-75 ${isFading ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'}`}>
            {slides[currentSlide].title}
          </h1>
          <p className={`text-base md:text-lg text-primary font-semibold mb-2 transition-all duration-500 delay-100 ${isFading ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'}`}>
            {slides[currentSlide].subtitle}
          </p>
          <p className={`text-sm md:text-base text-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto leading-relaxed transition-all duration-500 delay-150 ${isFading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            {slides[currentSlide].description}
          </p>
        </div>

      </div>

      {/* Navigation Arrows */}
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

      {/* Dots Indicator */}
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
    </div>
  );
};

export default HeroCarousel;
