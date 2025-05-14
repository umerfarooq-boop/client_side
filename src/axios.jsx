import axios from 'axios';

// Create an axios instance
const instance = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add Authorization header and handle expired tokens
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const tokenExpiry = localStorage.getItem('tokenExpiry');

    if (token) {
      const currentTime = Date.now();

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
  (error) => Promise.reject(error)
);

// Save token and expiry time after login
export const saveToken = (response) => {
  const { token, expires_in } = response.data;
  const expiryTime = Date.now() + expires_in * 1000; // Convert seconds to milliseconds

  localStorage.setItem('token', token);
  localStorage.setItem('tokenExpiry', expiryTime);
};

// Optional: Refresh token mechanism
export const refreshToken = async () => {
  try {
    const response = await instance.post('/refresh');
    const expiryTime = Date.now() + 60 * 60 * 1000; // 60 minutes in milliseconds

    localStorage.setItem('token', response.data.token);
    localStorage.setItem('tokenExpiry', expiryTime);
  } catch (error) {
    console.error('Failed to refresh token:', error);
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiry');
    window.location.href = '/login'; // Redirect to login on failure
  }
};

// Periodically check for token expiry and refresh
setInterval(() => {
  const tokenExpiry = localStorage.getItem('tokenExpiry');
  if (tokenExpiry && Date.now() > parseInt(tokenExpiry, 10) - 5 * 60 * 1000) {
    refreshToken(); // Refresh token 5 minutes before it expires
  }
}, 5 * 60 * 1000);

export default instance;
