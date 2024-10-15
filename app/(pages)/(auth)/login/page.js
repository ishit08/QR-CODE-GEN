
// app/auth/login/page.js
'use client';

import { useEffect, useState } from 'react';
import { loginUser } from '../api/api';   
import { useRouter } from 'next/navigation';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const credentials = { email, password };
      const response = await loginUser(credentials); 

      localStorage.setItem('token', response.token);
      localStorage.setItem('username', response.user.username);  // Save the username
      localStorage.setItem('email', response.user.email);        // Save the email

      // console.log( localStorage.getItem("token"))
      router.push('/'); // Navigate to home or dashboard
      setTimeout(() => {
        window.location.reload(); 
      }, 500);
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };


  return (
    <div className="flex flex-col items-center justify-center pt-20">
      <h1 className="text-2xl font-bold mb-6">User Login</h1>
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-md">
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

export default UserLogin;
