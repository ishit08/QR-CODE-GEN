//** Error Messages Module:**

// app/api/constants/errorMessages.js
export const ERROR_MESSAGES = {
  DATABASE_ERROR: 'Database error',
  USER_EXISTS: 'User already exists or database error',
  INVALID_CREDENTIALS: 'Invalid credentials',
  UNAUTHORIZED: 'Unauthorized',
  NO_SUBSCRIPTION: 'No subscription found for user',
  METHOD_NOT_ALLOWED: (method) => `Method ${method} Not Allowed`,
  FAILED_OPEN_DB: 'Failed to open database',
  FAILED_INIT_DB: 'Failed to initialize database',
  FAILED_AUTHORIZE_USER: 'Failed to authorize user',
};