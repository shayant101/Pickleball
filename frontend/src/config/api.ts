const API_BASE_URL = 'http://localhost:3001/api';

export const API_ENDPOINTS = {
  // Authentication
  LOGIN: `${API_BASE_URL}/auth/login`,
  REFRESH: `${API_BASE_URL}/auth/refresh`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  
  // Students
  STUDENTS: `${API_BASE_URL}/students`,
  
  // Sessions
  SESSIONS: `${API_BASE_URL}/sessions`,
  
  // Attendance
  ATTENDANCE: `${API_BASE_URL}/attendance`,
  
  // Progress
  PROGRESS: `${API_BASE_URL}/progress`,
  
  // Analytics
  ANALYTICS: `${API_BASE_URL}/analytics`,
  
  // Messages
  MESSAGES: `${API_BASE_URL}/messages`,
  
  // Payments
  PAYMENTS: `${API_BASE_URL}/payments`,
  
  // Settings
  SETTINGS: `${API_BASE_URL}/settings`,
} as const;

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  TIMEOUT: 10000,
  HEADERS: {
    'Content-Type': 'application/json',
  },
} as const;

export default API_CONFIG;