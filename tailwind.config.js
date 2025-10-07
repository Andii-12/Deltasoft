/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#22c55e', // Clean green
        'primary-dark': '#16a34a', // Darker green
        'primary-light': '#86efac', // Light green
        'accent': '#f0fdf4', // Very light green background
        'text-primary': '#1f2937', // Dark gray for text
        'text-secondary': '#6b7280', // Medium gray
        'text-light': '#9ca3af', // Light gray
        'background': '#ffffff', // Pure white
        'surface': '#f9fafb', // Light gray surface
        'border': '#e5e7eb', // Light border
        // Dark mode colors
        'dark-bg': '#1f2937', // Dark gray background
        'dark-surface': '#374151', // Darker gray surface
        'dark-text': '#f9fafb', // Light text for dark mode
        'dark-text-secondary': '#d1d5db', // Medium light text
        'dark-text-light': '#9ca3af', // Light gray text
        'dark-border': '#4b5563', // Dark border
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out',
        'slide-up': 'slide-up 0.4s ease-out',
        'bounce': 'bounce 2s infinite',
        'bounce-slow': 'bounce-slow 3s ease-in-out infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'bounce': {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-10px)' },
          '60%': { transform: 'translateY(-5px)' }
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      boxShadow: {
        'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'medium': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'large': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
} 