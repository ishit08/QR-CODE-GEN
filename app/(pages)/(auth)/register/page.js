'use client';

import { useState, useEffect } from 'react';
import { registerUser } from '../api/api'; // Import the function from api.js
import { useRouter } from 'next/navigation';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Ensure we are sending 'username' instead of 'name'
      const userData = { username: name, email, password };
  
      const response = await registerUser(userData); // Call the registerUser API function
  
      // Check if the response contains a success message
      if (response && response.message) {
        alert('Registration successful!'); // Show success message
        router.push('/login'); 
      } else {
        // Handle unexpected response structure
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error); // Log the error for debugging
  
      // Check for specific error response if available
      if (error.response) {
        alert(`Registration failed: ${error.response.data.error || 'Please try again.'}`);
      } else {
        alert('Registration failed. Please try again.');
      }
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center pt-20">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <div className="mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
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
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;