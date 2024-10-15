// app/admin/settings/page.js
import { useState } from 'react';

const Settings = () => {
  const [databaseUrl, setDatabaseUrl] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/admin/updateDatabaseConfig', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ databaseUrl }),
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="flex flex-col items-center justify-center pt-20">
      <h1 className="text-2xl font-bold mb-6">Database Settings</h1>
      <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <div className="mb-4">
          <input
            type="text"
            value={databaseUrl}
            onChange={(e) => setDatabaseUrl(e.target.value)}
            placeholder="Database URL"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Update Database
        </button>
      </form>
    </div>
  );
};

export default Settings;
