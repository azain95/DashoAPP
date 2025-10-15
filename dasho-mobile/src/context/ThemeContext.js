import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { storage } from '../utils/storage';
import { lightTheme, darkTheme } from '../theme/theme';

const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');
  const [theme, setTheme] = useState(systemColorScheme === 'dark' ? darkTheme : lightTheme);

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await storage.getTheme();
      const isDarkMode = savedTheme === 'dark';
      setIsDark(isDarkMode);
      setTheme(isDarkMode ? darkTheme : lightTheme);
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newIsDark = !isDark;
      setIsDark(newIsDark);
      setTheme(newIsDark ? darkTheme : lightTheme);
      await storage.setTheme(newIsDark ? 'dark' : 'light');
    } catch (error) {
      console.error('Error toggling theme:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
