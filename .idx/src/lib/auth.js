import { jwtDecode } from 'jwt-decode';

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('authToken', token);
    // Set default Authorization header for all requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('authToken');
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const isAuthenticated = () => {
  const token = getAuthToken();
  if (!token) return false;
  
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
};

export const logout = () => {
  setAuthToken(null);
  window.location.href = '/login';
};
