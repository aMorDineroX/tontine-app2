export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_URL: process.env.VITE_API_URL || 'http://localhost:3000',
  AUTH_TOKEN_KEY: 'auth_token',
  REFRESH_TOKEN_KEY: 'refresh_token',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_TEST: process.env.NODE_ENV === 'test',
} as const;