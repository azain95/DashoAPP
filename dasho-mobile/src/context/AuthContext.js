import React, { createContext, useState, useContext, useEffect } from 'react';
import { storage } from '../utils/storage';
import api from '../utils/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const [token, savedUser] = await Promise.all([
        storage.getToken(),
        storage.getUser(),
      ]);

      if (token && savedUser) {
        setUser(savedUser);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (username, password) => {
    try {
      const { data } = await api.post('/signin', {
        user_id: username,
        password,
      });

      if (!data?.token || !data?.user) {
        throw new Error('Invalid response from server');
      }

      await storage.setToken(data.token);
      await storage.setUser(data.user);
      setUser(data.user);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      console.error('Sign in error:', error);
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        'Invalid username or password';
      return { success: false, error: message };
    }
  };

  const signUp = async (credentials) => {
    try {
      const { data } = await api.post('/signup', credentials);

      if (data?.token && data?.user) {
        await storage.setToken(data.token);
        await storage.setUser(data.user);
        setUser(data.user);
        setIsAuthenticated(true);
        return { success: true };
      }

      throw new Error('Invalid response from server');
    } catch (error) {
      console.error('Sign up error:', error);
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        'Failed to create account';
      return { success: false, error: message };
    }
  };

  const signOut = async () => {
    try {
      await storage.clearAll();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      await storage.setUser(updatedUser);
      setUser(updatedUser);
    } catch (error) {
      console.error('Update user error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        signIn,
        signUp,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
