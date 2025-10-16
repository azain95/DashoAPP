import { Platform } from 'react-native';

// Default fallback for Android emulator
const DEFAULT_ANDROID_URL = 'http://10.0.2.2:5000';
const DEFAULT_IOS_URL = 'http://localhost:5000';

// Get from environment or use platform-specific default
export const API_BASE_URL =
  process.env.API_BASE_URL ||
  (Platform.OS === 'android' ? DEFAULT_ANDROID_URL : DEFAULT_IOS_URL);

export const config = {
  apiBaseUrl: API_BASE_URL,
};
