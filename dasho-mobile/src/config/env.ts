// src/config/env.js
import { Platform } from 'react-native';

const ENV_URL = (typeof process !== 'undefined' && process.env && process.env.API_BASE_URL) || '';

const LOCAL_FALLBACK =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:5000'
    : 'http://localhost:5000';

export const API_BASE_URL = ENV_URL && ENV_URL.trim().length ? ENV_URL : LOCAL_FALLBACK;
