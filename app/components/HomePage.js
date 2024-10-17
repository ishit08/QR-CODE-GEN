"use client";

import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true); // State to manage loading status

  // Simulate loading data (replace with your actual data fetching logic)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false after 2 seconds (simulating data fetching)
    }, 2000);

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  // If the page is loading, show the loading spinner and message
  if (isLoading) {
    return (
      <div className="lex justify-center items-center pt-20" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
        <CircularProgress />
        <h2 style={{ marginLeft: '10px' }}>Loading....</h2>
      </div>
    );
  }

  // Render your main content when loading is complete
  return (
    <div className="flex justify-center items-center pt-20">
      <h1 className="text-4xl">Welcome to CodeSnap!</h1>
    </div>
  );
}
