// app/api/utility/database.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { handleError } from './errorHandler';
import { ERROR_MESSAGES } from '../constants/errorMessages';

export async function openDb() {
  try {
    return open({
      filename: './database.sqlite',
      driver: sqlite3.Database
    });
  } catch (error) {
    handleError(error, ERROR_MESSAGES.FAILED_OPEN_DB);
  }
}