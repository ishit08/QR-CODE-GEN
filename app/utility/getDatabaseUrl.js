// app/api/utility/getDatabaseUrl.js
import fs from 'fs';

export function getDatabaseUrl() {
  // Load configuration from a settings JSON file (or database).
  const config = JSON.parse(fs.readFileSync('./config/databaseConfig.json', 'utf-8'));
  return config.databaseUrl || process.env.DATABASE_URL;
}
