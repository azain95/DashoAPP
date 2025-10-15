import { format, parseISO, isValid } from 'date-fns';

export const formatDate = (date, formatStr = 'yyyy-MM-dd') => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isValid(dateObj) ? format(dateObj, formatStr) : '';
  } catch (error) {
    console.error('Date formatting error:', error);
    return '';
  }
};

export const formatTime = (date, formatStr = 'HH:mm') => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return isValid(dateObj) ? format(dateObj, formatStr) : '';
  } catch (error) {
    console.error('Time formatting error:', error);
    return '';
  }
};

export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

export const getStatusColor = (status, colors) => {
  switch (status?.toLowerCase()) {
    case 'approved':
      return colors.success;
    case 'pending':
      return colors.warning;
    case 'rejected':
      return colors.error;
    default:
      return colors.textSecondary;
  }
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};
