"use client";
import { useState } from "react";

export default function Prices() {
  const [theme, setTheme] = useState("gradient"); // Default theme is gradient

  const offers = [
    {
      name: "Basic Plan",
      price: "₹1250/month",
      features: [
        { name: "Basic QR", icon: "🚀" },
        { name: "Qr With Image", icon: "🔒" },
      ],
    },
    {
      name: "Standard Plan",
      price: "₹5000 / 6 months",
      features: [
        { name: "Basic QR", icon: "🚀" },
        { name: "Qr With Image", icon: "🔒" },
        { name: "Dynamic QR", icon: "⚙️" },
      ],
      popular: true,
    },
    {
      name: "Premium Plan",
      price: "₹10000 / Year",
      features: [
        { name: "Basic QR", icon: "🚀" },
        { name: "QR With Image", icon: "🔒" },
        { name: "Dynamic QR", icon: "⚙️" },
        { name: "Bulk QR", icon: "📈" },
        { name: "Invitation", icon: "💼" },
      ],
      limitedOffer: true,
      countdown: "2 days left!",
    },
  ];

  // Toggle the theme between light and gradient
  const toggleTheme = () => {
    setTheme(theme === "light" ? "gradient" : "light");
  };

  return (
    <div className={`container mx-auto py-16 px-6 md:py-20 ${theme}`}>
      {/* Title and Theme Toggle */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-gray-800 tracking-wide">Our Subscription Plans</h1>
        <p className="text-lg text-gray-500 mb-6">Choose the plan that best suits you</p>
        <button
          className="theme-toggle-btn text-white px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg hover:shadow-xl transition-transform"
          onClick={toggleTheme}
        >
          Switch to {theme === "light" ? "Gradient" : "Light"} Mode
        </button>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-4 md:px-10">
        {offers.map((offer, index) => (
          <div
            key={index}
            className={`plan-card relative border border-gray-200 rounded-2xl p-8 shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl bg-white ${
              offer.popular ? "bg-yellow-50" : ""
            }`}
          >
            {/* Most Popular Badge */}
            {offer.popular && (
              <div className="ribbon bg-yellow-400 text-black text-sm font-semibold px-2 py-1 absolute top-2 right-2 rounded">
                Most Popular
              </div>
            )}

            {/* Countdown for Limited Offer */}
            {offer.limitedOffer && (
              <div className="countdown text-red-600 text-sm font-bold mb-2">⏳ {offer.countdown}</div>
            )}

            <h2 className="text-3xl font-bold mb-6 text-gray-800">{offer.name}</h2>
            <p className="text-3xl font-bold mb-8 text-blue-500">{offer.price}</p>
            <ul className="mb-6 text-gray-600 space-y-4">
              {offer.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <span className="mr-2 text-xl">{feature.icon}</span> {feature.name}
                </li>
              ))}
            </ul>
            <button className="subscribe-btn bg-blue-600 text-white py-3 px-8 rounded-lg text-lg font-medium shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300">
              Subscribe Now
            </button>
            <div className="absolute inset-0 w-full h-full opacity-5 pointer-events-none bg-gradient-to-br from-blue-300 to-blue-600 transform rotate-45"></div>
          </div>
        ))}
      </div>

      {/* Testimonial Section */}
      <div className="testimonial-section mt-16 text-center">
        <h3 className="text-3xl font-semibold mb-6 text-gray-800">What our users say</h3>
        <div className="carousel bg-gray-50 p-6 rounded-lg shadow-md">
          <p className="text-lg font-medium text-gray-600">
            "This is the best subscription service! It has all the features I need and the support is amazing."
          </p>
          <span className="block mt-4 text-sm text-gray-500">— Shiv, Premium Subscriber</span>
        </div>
      </div>

      <style jsx>{`
        .container.light {
          background: linear-gradient(to right, #f8f9fa, #ffffff);
        }
        .container.gradient {
          background: radial-gradient(circle, #ffafbd, #ffc3a0);
          color: #2d3748;
        }
        h1, h2 {
          font-family: 'Poppins', sans-serif;
        }
        .plan-card {
          transition: transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out;
        }
        .plan-card:hover {
          transform: scale(1.07);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
        }
        .theme-toggle-btn {
          transition: background-color 0.3s, transform 0.3s;
        }
        .theme-toggle-btn:hover {
          transform: scale(1.05);
        }
        .ribbon {
          position: absolute;
          top: 1rem;
          right: 1rem;
          transform: rotate(10deg);
        }
        .subscribe-btn:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
        }
      `}</style>
    </div>
  );
}
