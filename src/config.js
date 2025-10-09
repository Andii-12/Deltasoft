// Determine API URL based on environment
const getApiUrl = () => {
  // If explicitly set via environment variable, use that
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // Always use the Railway backend URL (both dev and production)
  // This avoids proxy issues and ensures consistent behavior
  return 'https://deltasoft-production.up.railway.app';
};

const config = {
  API_URL: getApiUrl(),
  ENV: process.env.NODE_ENV || 'development'
};

// Debug logging
console.log('✅ Config loaded');
console.log('API_URL:', config.API_URL);
console.log('Environment:', config.ENV);

export default config; 