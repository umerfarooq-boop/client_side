import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Authorization header dynamically and handle expired tokens
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Get token from localStorage
    const tokenExpiry = localStorage.getItem('tokenExpiry'); // Get token expiration time

    if (token) {
      const currentTime = Date.now(); // Current time in milliseconds

      if (tokenExpiry && currentTime > parseInt(tokenExpiry, 10)) {
        // Token has expired
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiry');
        window.location.href = '/login'; // Redirect to login page
        return Promise.reject(new Error('Token has expired'));
      }

      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
