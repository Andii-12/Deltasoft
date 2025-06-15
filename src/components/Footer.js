import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <span className="text-2xl font-bold text-neon-green animate-glow">Deltasoft LLC</span>
            <p className="mt-4 text-gray-400 max-w-md">
              Empowering businesses with innovative software solutions. We transform ideas into reality through cutting-edge technology.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Цэс</h3>
            <ul className="space-y-2">
              <li><button type="button" className="text-gray-400 hover:text-neon-green transition-colors">Нүүр</button></li>
              <li><button type="button" className="text-gray-400 hover:text-neon-green transition-colors">Бидний тухай</button></li>
              <li><button type="button" className="text-gray-400 hover:text-neon-green transition-colors">Үйлчилгээ</button></li>
              <li><button type="button" className="text-gray-400 hover:text-neon-green transition-colors">Холбоо барих</button></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Холбоо барих</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                <span className="text-neon-green">И-Мэйл:</span> info@deltasoft.mn
              </li>
              <li className="text-gray-400">
                <span className="text-neon-green">Утас:</span> +976 75331177, +976 95021177
              </li>
              <li className="text-gray-400">
                <span className="text-neon-green">Хаяг:</span> Монгол улс, Улаанбаатар хот Сүхбаатар дүүрэг 1-р хороо ЮүБиЭйч 10-р давхарт 1010 тоот
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Deltasoft LLC. Бүх эрх хуулиар хамгаалагдсан.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 