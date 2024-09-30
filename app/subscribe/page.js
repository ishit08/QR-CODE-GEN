const Subscribe= () => {
  const router = useRouter();
  const { offer } = router.query;

  const handleSubscribe = async () => {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ offer }),
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <div>
      <h1>Subscribe to {offer} Plan</h1>
      <button onClick={handleSubscribe}>Subscribe</button>
    </div>
  );
};

export default Subscribe;
