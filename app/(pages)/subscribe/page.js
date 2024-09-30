"use client"; // This marks the component as a Client Component

import { useSearchParams } from 'next/navigation'; // Replaces useRouter
import { useEffect, useState } from 'react';

const Subscribe = () => {
  const searchParams = useSearchParams();
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    const offerParam = searchParams.get('offer');
    setOffer(offerParam);
  }, [searchParams]);

  const handleSubscribe = async () => {
    // Your subscription logic here
    console.log(`Subscribed to ${offer} plan`);
  };

  if (!offer) return <p>Loading...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-[85%] w-full p-6 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Subscribe to {offer} Plan</h1>
        <button 
          onClick={handleSubscribe}
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Subscribe;