// Determine API URL based on environment
const getApiUrl = () => {
  // If explicitly set via environment variable, use that
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // In production build, use Railway URL
  if (process.env.NODE_ENV === 'production') {
    return 'https://deltasoft-production.up.railway.app';
  }
  
  // In development, use empty string (proxy)
  return '';
};

const config = {
  API_URL: getApiUrl(),
  ENV: process.env.NODE_ENV || 'development'
};

// Debug logging
console.log('API_URL configured as:', config.API_URL);
console.log('Environment:', config.ENV);

export default config; 