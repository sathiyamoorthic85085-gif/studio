import jwt from 'jsonwebtoken';
import { openDb } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('authToken', token);
  } else {
    localStorage.removeItem('authToken');
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export const isAuthenticated = () => {
  const token = getAuthToken();
  if (!token) return false;
  
  const decoded = verifyToken(token);
  if (!decoded) return false;
  
  // Check if token is expired
  return decoded.exp > Date.now() / 1000;
};

export const getUserFromToken = async (token) => {
  try {
    const decoded = verifyToken(token);
    if (!decoded) return null;
    
    const db = await openDb();
    const user = await db.get('SELECT id, email, name, role, profile_picture, class, subject FROM users WHERE id = ?', [decoded.userId]);
    
    return user;
  } catch (error) {
    console.error('Error getting user from token:', error);
    return null;
  }
};

export const loginUser = async (email, password) => {
  try {
    const db = await openDb();
    const user = await db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    // Create token that expires in 7 days
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user;
    
    return { token, user: userWithoutPassword };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = () => {
  setAuthToken(null);
  window.location.href = '/login';
};
