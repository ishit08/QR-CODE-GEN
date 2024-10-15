//** Register User Endpoint:**

// app/api/auth/register.js
import { openDb } from '../utility/database';
import bcrypt from 'bcrypt';
import { insertUserQuery } from '../queries/userQueries';
import { ERROR_MESSAGES } from '../constants/errorMessages';
import { handleHttpError } from '../utility/errorHandler';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const db = await openDb();
      await db.run(insertUserQuery, email, hashedPassword);
      res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
      handleHttpError(res, 500, ERROR_MESSAGES.USER_EXISTS);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(ERROR_MESSAGES.METHOD_NOT_ALLOWED(req.method));
  }
}
