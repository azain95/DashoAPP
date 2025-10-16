import { formatDate, formatTime, getGreeting, validateEmail } from '../../src/utils/helpers';

describe('Helper Functions', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2024-01-15T10:30:00');
      expect(formatDate(date, 'yyyy-MM-dd')).toBe('2024-01-15');
    });

    it('should handle invalid date', () => {
      expect(formatDate('invalid-date')).toBe('');
    });
  });

  describe('formatTime', () => {
    it('should format time correctly', () => {
      const date = new Date('2024-01-15T14:30:00');
      const result = formatTime(date, 'HH:mm');
      expect(result).toBe('14:30');
    });
  });

  describe('getGreeting', () => {
    it('should return a greeting', () => {
      const greeting = getGreeting();
      expect(['Good morning', 'Good afternoon', 'Good evening']).toContain(greeting);
    });
  });

  describe('validateEmail', () => {
    it('should validate correct email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
    });

    it('should reject invalid email', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
    });
  });
});
