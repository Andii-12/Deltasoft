const config = {
  // Use empty string in development to use proxy, full URL in production
  API_URL: process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'production' ? 'https://deltasoft-production.up.railway.app' : ''),
  ENV: process.env.NODE_ENV || 'development'
};

// Debug logging
console.log('API_URL configured as:', config.API_URL);
console.log('Environment:', config.ENV);

export default config; 