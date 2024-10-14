//** Error Handling Utility:**

// app/api/utility/errorHandler.js
import { ERROR_MESSAGES } from '../constants/errorMessages';

export function handleError(error, context = '') {
  console.error(`${context}:`, error);
  throw new Error(ERROR_MESSAGES.DATABASE_ERROR);
}

export function handleHttpError(res, statusCode, message) {
  res.status(statusCode).json({ error: message });
}
