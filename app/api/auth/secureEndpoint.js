
//** Securing API Endpoints:**

// app/api/secureEndpoint.js
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await tSessiogen({ req });
  if (!session) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  // Proceed with secure code logic
  res.status(200).json({ message: 'This is a secure endpoint and you are authorized' });
}