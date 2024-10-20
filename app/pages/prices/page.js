"use client";
import { useState } from "react";

export default function Prices() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const offers = [
    {
      name: "Free",
      price: "₹0",
      period: "",
      description: "Get started with our basic features.",
      features: ["Single-step Zaps", "1 Premium App", "1 User"],
    },
    {
      name: "Basic",
      price: billingCycle === "monthly" ? "₹30" : "₹300",
      period: billingCycle === "monthly" ? "/month" : "/year",
      description: "Essential tools to help you automate.",
      features: ["Multi-step Zaps", "2 Premium Apps", "3 Users team"],
    },
    {
      name: "Standard",
      price: billingCycle === "monthly" ? "₹80" : "₹800",
      period: billingCycle === "monthly" ? "/month" : "/year",
      description: "Advanced tools to take your work to the next level.",
      features: ["Multi-step Zaps", "Unlimited Premium", "10 Users team", "Shared Workspace"],
    },
    {
      name: "Premium",
      price: billingCycle === "monthly" ? "₹150" : "₹1500",
      period: billingCycle === "monthly" ? "/month" : "/year",
      description: "Full suite of automation features.",
      features: [
        "Multi-step Zaps",
        "Unlimited Premium",
        "Unlimited Users Team",
        "Advanced Admin",
        "Priority Support",
      ],
      popular: true, // Most popular plan
    },
    {
      name: "Custom",
      price: "Contact Us",
      period: "",
      description: "Customized solutions for enterprises.",
      features: ["Custom Zaps", "Dedicated Support", "Unlimited Users", "Custom Data Retention"],
    },
  ];

  return (
    <div className="container mx-auto py-16 px-6 md:py-20 bg-gradient-to-b from-white to-cyan-50">
      {/* Gradient background */}
      <div className="flex flex-col justify-center items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Plans & Pricing</h1>
        <p className="text-lg text-gray-500 mt-2 text-center">
          Whether your time-saving automation needs are large or small, we’re here to help you scale.
        </p>
      </div>

      {/* Toggle between Monthly and Yearly */}
      <div className="flex justify-center items-center mb-8">
        <button
          className={`px-6 py-2 rounded-l-full ${
            billingCycle === "monthly" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setBillingCycle('monthly')}
        >
          Monthly
        </button>
        <button
          className={`px-6 py-2 rounded-r-full ${
            billingCycle === "yearly" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setBillingCycle('yearly')}
        >
          Yearly
        </button>
      </div>

      {/* Pricing Cards - Single Line Stack */}
      <div className="relative flex justify-center items-center gap-6 px-4 md:px-10 " style={{ height: 'calc(100% + 80px)' }}>
        {offers.map((offer, index) => (
          <div
            key={index}
            className={`relative transition-transform duration-500 transform hover:z-50 hover:scale-110 ${
              offer.popular ? "bg-teal-500 text-white" : "bg-white"
            } w-64 border border-gray-200 rounded-2xl p-6 shadow-lg cursor-pointer`}
            style={{ marginLeft: `${index * -2}rem` }}
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
            <h2 className={`text-xl font-semibold mb-3 ${offer.name === "Free" || offer.name === "Basic" ? 'text-black' : 'text-white'}`}>{offer.name}</h2>

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
