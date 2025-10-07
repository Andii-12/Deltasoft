import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center md:justify-start space-x-4 text-sm">
            <a href="/" className="hover:text-primary dark:hover:text-white transition-colors">Бидний тухай</a>
            <span className="text-gray-500">|</span>
            <a href="/projects" className="hover:text-primary dark:hover:text-white transition-colors">Төслүүд</a>
            <span className="text-gray-500">|</span>
            <a href="/news" className="hover:text-primary dark:hover:text-white transition-colors">Мэдээ мэдээлэл</a>
            <span className="text-gray-500">|</span>
            <a href="/quote" className="hover:text-primary dark:hover:text-white transition-colors">Үнийн санал</a>
            <span className="text-gray-500">|</span>
            <a href="/contact" className="hover:text-primary dark:hover:text-white transition-colors">Холбоо барих</a>
            <span className="text-gray-500">|</span>
            <a href="/logo" className="hover:text-primary dark:hover:text-white transition-colors">Лого</a>
          </div>
          
          {/* Copyright */}
          <div className="text-sm text-gray-400">
            © 2020-{new Date().getFullYear()} Дельтасофт групп
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 