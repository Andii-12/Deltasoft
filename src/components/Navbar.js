import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
import DarkModeToggle from './DarkModeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger fade-down animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500); // Delay to show after startup animation

    return () => clearTimeout(timer);
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
    { href: '/about', label: 'Бидний тухай' },
    { href: '/projects', label: 'Төслүүд' },
    { href: '/news', label: 'Мэдээ мэдээлэл' },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <nav className={`fixed w-full z-50 bg-white/90 dark:bg-dark-bg/90 backdrop-blur-sm border-b border-gray-200/50 dark:border-dark-border/50 shadow-md transition-all duration-500 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center group" onClick={handleNavClick('top')}>
            <img
              src="/logo192.png"
              alt="Deltasoft Logo"
              loading="lazy"
              decoding="async"
              className="h-14 w-auto transition-colors duration-200"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="h-14 w-14 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg" style={{display: 'none'}}>
              <span className="text-white font-bold text-xl">DS</span>
            </div>
          </Link>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item, index) => (
              <Link
                key={item.label}
                to={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-primary bg-primary/10 dark:bg-primary/20'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                style={{ transitionDelay: `${0.1 + index * 0.1}s` }}
                onClick={item.onClick}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/quote"
              className={`bg-gradient-to-r from-primary to-primary-dark text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:from-primary-dark hover:to-primary hover:shadow-lg transition-colors duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
              style={{ transitionDelay: '0.5s' }}
            >
              Үнийн санал
            </Link>
            <Link
              to="/worker/login"
              className={`text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
              style={{ transitionDelay: '0.6s' }}
              aria-label="Ажилчдын нэвтрэх"
              title="Ажилчдын нэвтрэх"
            >
              <span className="inline-flex items-center justify-center p-2 rounded-full bg-gray-100 hover:bg-primary/10 dark:bg-dark-surface dark:hover:bg-primary/20">
                <FaUser className="h-5 w-5" />
              </span>
            </Link>
            <div className={`transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`} style={{ transitionDelay: '0.7s' }}>
              <DarkModeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className={`md:hidden flex items-center space-x-2 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`} style={{ transitionDelay: '0.8s' }}>
            <DarkModeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-primary p-2 transition-all duration-300 hover:scale-110"
            >
              {isOpen ? (
                <FaTimes className="h-5 w-5" />
              ) : (
                <FaBars className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 dark:bg-dark-bg/95 backdrop-blur-md border-t border-gray-200/50 dark:border-dark-border/50 shadow-lg">
          <div className="px-6 py-6 space-y-4">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`block py-3 px-4 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-primary bg-primary/10 dark:bg-primary/20'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20'
                }`}
                onClick={item.onClick}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 space-y-3">
              <Link
                to="/quote"
                className="bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-3 rounded-lg text-sm font-semibold block text-center hover:from-primary-dark hover:to-primary hover:shadow-lg transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Үнийн санал
              </Link>
              <Link
                to="/worker/login"
                className="inline-flex items-center justify-center py-3 px-4 rounded-lg text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
                aria-label="Ажилчдын нэвтрэх"
                title="Ажилчдын нэвтрэх"
              >
                <FaUser className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 