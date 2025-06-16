import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (section) => (e) => {
    e.preventDefault();
    setIsOpen(false);
    if (location.pathname !== '/') {
      if (section === 'top') {
        navigate('/');
      } else {
        navigate('/?scroll=' + section);
      }
    } else {
      if (section === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const menuItems = [
    { href: '/', label: 'Нүүр', onClick: handleNavClick('top') },
    { href: '/about', label: 'Бидний тухай', onClick: handleNavClick('about') },
    { href: '/projects', label: 'Төслүүд' },
    { href: '/news', label: 'Мэдээ мэдээлэл' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-darker shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2" onClick={handleNavClick('top')}>
              <img
                src="/images/Logo/logo2.png"
                alt="DeltaSoft Logo"
                className="h-12 w-auto"
              />
              <span className="text-2xl font-bold text-neon-green">
                Deltasoft LLC
              </span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-gray-300 hover:text-neon-green px-3 py-2 text-sm font-medium transition-colors"
                  onClick={item.onClick}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/quote"
                className="bg-neon-green text-darker hover:bg-neon-green/90 px-4 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105 hover:shadow-glow"
              >
                Үнийн санал
              </Link>
              <Link
                to="/worker/login"
                className="bg-neon-green text-darker hover:bg-neon-green/90 px-4 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105 hover:shadow-glow"
              >
                Нэвтрэх
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-neon-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-darker focus:ring-neon-green p-2 rounded-md"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-darker border-t border-gray-800 fixed w-full top-20 animate-fade-in-up">
          <div className="px-4 pt-4 pb-6 space-y-3">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-gray-300 hover:text-neon-green block px-4 py-3 text-base font-medium transition-colors rounded-lg hover:bg-gray-800/50"
                onClick={item.onClick}
              >
                {item.label}
              </Link>
            ))}
            <div className="space-y-3 pt-2">
              <Link
                to="/quote"
                className="bg-neon-green text-darker hover:bg-neon-green/90 block px-4 py-3 rounded-lg text-base font-medium transition-all text-center"
                onClick={() => setIsOpen(false)}
              >
                Үнийн санал
              </Link>
              <Link
                to="/worker/login"
                className="bg-neon-green text-darker hover:bg-neon-green/90 block px-4 py-3 rounded-lg text-base font-medium transition-all text-center"
                onClick={() => setIsOpen(false)}
              >
                Нэвтрэх
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 