import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
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
    { href: '/about', label: 'Бидний тухай', onClick: handleNavClick('about') },
    { href: '/projects', label: 'Төслүүд' },
    { href: '/news', label: 'Мэдээ мэдээлэл' },
  ];

  return (
    <nav className={`fixed w-full z-50 bg-background dark:bg-dark-bg border-b border-border dark:border-dark-border transition-all duration-1000 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 group" onClick={handleNavClick('top')}>
            <img
              src={`/images/Logo/Logo.svg?v=${Date.now()}`}
              alt="DeltaSoft Logo"
              className="h-8 w-auto transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="h-8 w-8 bg-primary rounded flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{display: 'none'}}>
              <span className="text-white font-bold text-sm">DS</span>
            </div>
            <span className="text-lg font-semibold text-text-primary dark:text-dark-text transition-colors duration-300 group-hover:text-primary">
              Deltasoft
            </span>
          </Link>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item, index) => (
              <Link
                key={item.label}
                to={item.href}
                className={`text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-primary text-sm transition-all duration-300 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                style={{ transitionDelay: `${0.1 + index * 0.1}s` }}
                onClick={item.onClick}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/quote"
              className={`bg-primary text-white px-4 py-2 rounded text-sm hover:bg-primary-dark transition-all duration-300 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
              style={{ transitionDelay: '0.5s' }}
            >
              Quote
            </Link>
            <Link
              to="/worker/login"
              className={`text-primary text-sm hover:text-primary-dark transition-all duration-300 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
              style={{ transitionDelay: '0.6s' }}
            >
              Login
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
        <div className="md:hidden bg-background dark:bg-dark-bg border-t border-border dark:border-dark-border">
          <div className="px-6 py-4 space-y-3">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-primary block py-2 text-sm transition-colors"
                onClick={item.onClick}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 space-y-2">
              <Link
                to="/quote"
                className="bg-primary text-white px-4 py-2 rounded text-sm block text-center hover:bg-primary-dark transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Quote
              </Link>
              <Link
                to="/worker/login"
                className="text-primary text-sm block py-2 hover:text-primary-dark transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 