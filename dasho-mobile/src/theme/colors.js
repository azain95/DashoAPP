export const lightColors = {
  primary: '#007AFF',
  primaryDark: '#0051D5',
  secondary: '#5856D6',
  background: '#F2F2F7',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  text: '#000000',
  textSecondary: '#8E8E93',
  border: '#C6C6C8',
  error: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',
  info: '#5AC8FA',
  gradient: ['#007AFF', '#5856D6'],
  elevation: {
    level1: '#FFFFFF',
    level2: '#F9F9F9',
    level3: '#F2F2F7',
  },
};

export const darkColors = {
  primary: '#0A84FF',
  primaryDark: '#0066CC',
  secondary: '#5E5CE6',
  background: '#000000',
  surface: '#1C1C1E',
  card: '#2C2C2E',
  text: '#FFFFFF',
  textSecondary: '#8E8E93',
  border: '#38383A',
  error: '#FF453A',
  success: '#32D74B',
  warning: '#FF9F0A',
  info: '#64D2FF',
  gradient: ['#0A84FF', '#5E5CE6'],
  elevation: {
    level1: '#1C1C1E',
    level2: '#2C2C2E',
    level3: '#3A3A3C',
  },
};

export const getColors = (isDark) => (isDark ? darkColors : lightColors);
