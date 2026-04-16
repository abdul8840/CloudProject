import { createContext, useState, useEffect } from 'react';
import { authAPI } from '../api/endpoints.js';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../utils/helpers.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await authAPI.getMe();
      if (response.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      if (response.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        toast.success(response.message || 'Logged in successfully!');
        return { success: true };
      }
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      if (response.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        toast.success(response.message || 'Registration successful!');
        return { success: true };
      }
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
      setUser(null);
      setIsAuthenticated(false);
      toast.success('Logged out successfully!');
    } catch (error) {
      // Even if API call fails, clear local state
      setUser(null);
      setIsAuthenticated(false);
      toast.error(getErrorMessage(error));
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};