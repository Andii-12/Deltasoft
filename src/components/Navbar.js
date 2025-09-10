import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
    <nav className="fixed w-full z-50 bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3" onClick={handleNavClick('top')}>
            <img
              src={`/images/Logo/Logo2.svg?v=${Date.now()}`}
              alt="DeltaSoft Logo"
              className="h-8 w-auto"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="h-8 w-8 bg-primary rounded flex items-center justify-center" style={{display: 'none'}}>
              <span className="text-white font-bold text-sm">DS</span>
            </div>
            <span className="text-lg font-semibold text-text-primary">
              Deltasoft
            </span>
          </Link>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-text-secondary hover:text-primary text-sm transition-colors"
                onClick={item.onClick}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/quote"
              className="bg-primary text-white px-4 py-2 rounded text-sm hover:bg-primary-dark transition-colors"
            >
              Quote
            </Link>
            <Link
              to="/worker/login"
              className="text-primary text-sm hover:text-primary-dark transition-colors"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-secondary hover:text-primary p-2"
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
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-6 py-4 space-y-3">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-text-secondary hover:text-primary block py-2 text-sm transition-colors"
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