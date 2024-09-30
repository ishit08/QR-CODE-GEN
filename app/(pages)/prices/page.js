export default function Prices() {
  const offers = [
    {
      name: "Basic Plan",
      price: "₹250/month",
      features: ["Feature 1", "Feature 2", "Feature 3"],
    },
    {
      name: "Standard Plan",
      price: "₹1000 / 6 months",
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
    },
    {
      name: "Premium Plan",
      price: "₹ 2500 / Year",
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-10">Our Subscription Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {offers.map((offer, index) => (
          <div key={index} className="border border-gray-300 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{offer.name}</h2>
            <p className="text-xl mb-4">{offer.price}</p>
            <ul className="mb-4">
              {offer.features.map((feature, i) => (
                <li key={i} className="text-gray-700">- {feature}</li>
              ))}
            </ul>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
