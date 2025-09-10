import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-dark-surface text-gray-900 dark:text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img
                src="/logo192.png"
                alt="Deltasoft Logo"
                loading="lazy"
                decoding="async"
                className="h-12 w-auto"
              />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">Дельтасофт ХХК</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 max-w-md leading-relaxed">
              Бизнесийг шинэлэг програм хангамжийн шийдлээр хүчирхэгжүүлж байна. Бид санааг орчин үеийн технологиор бодит болгодог.
            </p>
          </div>
          
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-6 text-lg">Цэс</h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors duration-300 block">Нүүр</a></li>
              <li><a href="/about" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors duration-300 block">Бидний тухай</a></li>
              <li><a href="/projects" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors duration-300 block">Төслүүд</a></li>
              <li><a href="/news" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors duration-300 block">Мэдээ мэдээлэл</a></li>
              <li><a href="/quote" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors duration-300 block">Үнийн санал</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-6 text-lg">Холбоо барих</h3>
            <ul className="space-y-4">
              <li className="text-gray-600 dark:text-gray-300">
                <span className="text-primary font-medium">И-Мэйл:</span> 
                <a href="mailto:info@deltasoft.mn" className="ml-2 hover:text-primary dark:hover:text-white transition-colors">info@deltasoft.mn</a>
              </li>
              <li className="text-gray-600 dark:text-gray-300">
                <span className="text-primary font-medium">Утас:</span> 
                <a href="tel:+97675331177" className="ml-2 hover:text-primary dark:hover:text-white transition-colors">+976 75331177</a>
              </li>
              <li className="text-gray-600 dark:text-gray-300">
                <span className="text-primary font-medium">Утас:</span> 
                <a href="tel:+97695021177" className="ml-2 hover:text-primary dark:hover:text-white transition-colors">+976 95021177</a>
              </li>
              <li className="text-gray-600 dark:text-gray-300">
                <span className="text-primary font-medium">Хаяг:</span> 
                <span className="ml-2">Монгол улс, Улаанбаатар хот<br />Сүхбаатар дүүрэг 1-р хороо<br />ЮүБиЭйч 10-р давхарт 1010 тоот</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-600">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p>&copy; {new Date().getFullYear()} Дельтасофт ХХК. Бүх эрх хуулиар хамгаалагдсан.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 