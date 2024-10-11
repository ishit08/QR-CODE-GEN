// app/api/admin/updateDatabaseConfig.js
import fs from 'fs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { databaseUrl } = req.body;

    try {
      // Update the configuration file with the new database URL.
      fs.writeFileSync('./config/databaseConfig.json', JSON.stringify({ databaseUrl }, null, 2));
      res.status(200).json({ message: 'Database configuration updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update database configuration' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
