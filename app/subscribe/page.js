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
  };

  if (!offer) return <p>Loading...</p>;

  return (
    <div>
      <h1>Subscribe to {offer} Plan</h1>
      <button onClick={handleSubscribe}>Subscribe</button>
    </div>
  );
};

export default Subscribe;
