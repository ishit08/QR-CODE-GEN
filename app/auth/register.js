// app/api/auth/register.js
import { openDb } from '../utility/database';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const db = await openDb();
      await db.run(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        username,
        hashedPassword
      );
      res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: 'User already exists or database error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}