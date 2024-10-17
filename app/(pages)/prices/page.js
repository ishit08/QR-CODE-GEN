"use client";
import { useState } from "react";

export default function Prices() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const toggleBillingCycle = () => {
    setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly");
  };

  const offers = [
    {
      name: "Starter",
      price: billingCycle === "monthly" ? "₹50" : "₹500",
      period: billingCycle === "monthly" ? "/month" : "/year",
      description: "Unleash the power of automation.",
      features: ["Multi-step Zaps", "3 Premium Apps", "2 Users team"],
    },
    {
      name: "Professional",
      price: billingCycle === "monthly" ? "₹80" : "₹800",
      period: billingCycle === "monthly" ? "/month" : "/year",
      description: "Advanced tools to take your work to the next level.",
      features: ["Multi-step Zaps", "Unlimited Premium", "50 Users team", "Shared Workspace"],
    },
    {
      name: "Company",
      price: billingCycle === "monthly" ? "₹199" : "₹1990",
      period: billingCycle === "monthly" ? "/month" : "/year",
      description: "Automation plus enterprise-grade features.",
      features: [
        "Multi-step Zaps",
        "Unlimited Premium",
        "Unlimited Users Team",
        "Advanced Admin",
        "Custom Data Retention",
      ],
      popular: true, // Most popular plan
    },
  ];

  return (
    <div className="container mx-auto py-16 px-6 md:py-20 bg-gradient-to-b from-white to-cyan-50">
      {/* Gradient background */}
      <div className="flex justify-between items-center mb-8">
        <div className="ml-8">
          <h1 className="text-4xl font-extrabold text-gray-800 ml-4">Plans & Pricing</h1>
          <p className="text-lg text-gray-500 mt-2 ml-4">
            Whether your time-saving automation needs are large or small, we’re here to help you scale.
          </p>
        </div>

        {/* Toggle between Monthly and Yearly */}
        <div className="flex items-center space-x-0">
          <button
            className={`px-6 py-2 rounded-l-full ${
              billingCycle === "monthly" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={toggleBillingCycle}
          >
            Monthly
          </button>
          <button
            className={`px-6 py-2 rounded-r-full ${
              billingCycle === "yearly" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={toggleBillingCycle}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 px-4 md:px-10">
        {offers.map((offer, index) => (
          <div
            key={index}
            className={`relative border border-gray-200 rounded-2xl p-6 shadow-lg transition-transform duration-300 transform hover:scale-105 ${
              offer.popular ? "bg-teal-500 text-white" : "bg-white"
            } w-full`}
            style={{ marginRight: index === 2 ? 0 : "-0.75rem" }} // Merge effect by reducing margin between boxes
          >
            {/* Most Popular Badge */}
            {offer.popular && (
              <div className="absolute top-0 right-0 mt-4 mr-5">
                <div className="bg-orange-400 text-white text-sm font-semibold px-3 py-1 rounded-lg">
                  MOST POPULAR
                </div>
              </div>
            )}

            {/* Price First */}
            <p className="text-3xl font-bold mb-1">
              {offer.price}
              <span className="text-sm font-normal">{offer.period}</span>
            </p>

            {/* Plan Name */}
            <h2 className={`text-xl font-semibold mb-3 ${offer.name === "Starter" || offer.name === "Professional" ? 'text-black' : 'text-white'}`}>
              {offer.name}
            </h2>

            <p className="mb-4 text-sm">{offer.description}</p>

            <ul className="mb-4 space-y-3 text-sm">
              {offer.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <span className="mr-2 text-xl">✔️</span> {feature}
                </li>
              ))}
            </ul>

            {/* Centered Choose Plan Button */}
            <div className="flex justify-center">
              <button
                className="py-2 px-6 rounded-lg text-md font-medium bg-orange-500 text-white shadow-md transition-all duration-300 hover:bg-orange-600"
              >
                Choose Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
