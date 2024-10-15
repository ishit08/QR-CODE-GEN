'use client';

import { useState } from 'react';
import { loginAdmin } from '../api/api'; // Import the function from api.js
import { useRouter } from 'next/navigation'; // For navigation after login

const AdminLogin = () => {
  const [username, setUsername] = useState(''); // Updated to username
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter(); // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const credentials = { username, password }; // Use username instead of email
      const response = await loginAdmin(credentials); // Call the loginAdmin API function

      // If login is successful, store the token and redirect
      localStorage.setItem('token', response.token); 
      console.log( localStorage.getItem("token"))// Save the token to localStorage
      alert('Admin login successful!');
      router.push('/admin-dashboard'); // Navigate to admin dashboard after login
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-20">
      <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <div className="mb-4">
          <input
            type="text" // Changed to text for username
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Updated to setUsername
            placeholder="Username"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
