
//** Login User Endpoint:**

// app/api/auth/login.js
import { openDb } from '../utility/database';
import bcrypt from 'bcrypt';
import { getUserByEmailQuery } from '../queries/userQueries';
import { ERROR_MESSAGES } from '../constants/errorMessages';
import { handleHttpError } from '../utility/errorHandler';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const db = await openDb();
      const user = await db.get(getUserByEmailQuery, email);

      if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({ message: 'Login successful', userId: user.id, role: user.role });
      } else {
        handleHttpError(res, 401, ERROR_MESSAGES.INVALID_CREDENTIALS);
      }
    } catch (error) {
      handleHttpError(res, 500, ERROR_MESSAGES.DATABASE_ERROR);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(ERROR_MESSAGES.METHOD_NOT_ALLOWED(req.method));
  }
}
