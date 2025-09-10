import React from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg bg-surface dark:bg-dark-surface text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-primary hover:bg-accent dark:hover:bg-dark-surface transition-all duration-200"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <FaSun className="w-4 h-4" />
      ) : (
        <FaMoon className="w-4 h-4" />
      )}
    </button>
  );
};

export default DarkModeToggle;
