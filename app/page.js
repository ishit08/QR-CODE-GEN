"use client";
import { FaRegClock, FaRegLightbulb, FaRegSmile, FaQrcode, FaShareAlt, FaChartLine, FaUserFriends } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-20 bg-gradient-to-br from-green-400 to-teal-500 text-gray-800 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-white opacity-10 rounded-full transform scale-125"></div>
      <div className="absolute inset-0 bg-white opacity-15 rounded-full transform scale-110 blur-3xl"></div>

      {/* Hero Section */}
      <div className="text-center mb-16 relative">
        {/* Polygon Background for Heading */}
        <div className="absolute inset-0 -z-10 transform rotate-12 -skew-x-12 bg-white opacity-20 rounded-lg"></div>
        <h1 className="text-6xl font-extrabold tracking-wide drop-shadow-lg relative z-10">Welcome to CodeSnap!</h1>
        <p className="mt-4 text-lg max-w-md mx-auto relative z-10 text-gray-900 font-semibold">
          Your one-stop solution for effortless coding, project management, and QR code generation. Join us and take your coding skills to the next level!
        </p>
      </div>
      
      {/* Features Section */}
      <div className="max-w-4xl w-full mb-16">
        <h2 className="text-4xl font-semibold text-center mb-8 relative z-10">
          Why Choose CodeSnap?
          <div className="absolute inset-0 -z-10 transform rotate-12 -skew-x-12 bg-white opacity-20 rounded-lg"></div>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature Card */}
          <FeatureCard 
            icon={<FaRegClock className="text-blue-500 text-3xl mr-3" />} 
            title="24/7 Support" 
            description="Get assistance anytime you need with our round-the-clock support team." 
          />
          <FeatureCard 
            icon={<FaRegLightbulb className="text-yellow-500 text-3xl mr-3" />} 
            title="Intuitive Interface" 
            description="Experience a user-friendly interface that makes coding fun and easy." 
          />
          <FeatureCard 
            icon={<FaQrcode className="text-green-500 text-3xl mr-3" />} 
            title="QR Code Generator" 
            description="Easily generate QR codes for your projects and share them effortlessly." 
          />
          <FeatureCard 
            icon={<FaRegSmile className="text-purple-500 text-3xl mr-3" />} 
            title="Regular Updates" 
            description="Stay ahead with frequent updates that enhance features and functionality." 
          />
          <FeatureCard 
            icon={<FaChartLine className="text-red-500 text-3xl mr-3" />} 
            title="Performance Analytics" 
            description="Track your coding performance and optimize your learning journey." 
          />
          <FeatureCard 
            icon={<FaUserFriends className="text-orange-500 text-3xl mr-3" />} 
            title="Community Engagement" 
            description="Join a vibrant community of coders and collaborate on exciting projects." 
          />
        </div>
      </div>

      {/* Image Section */}
      <div className="relative w-full max-w-4xl mb-12">
        <img
          src="/path/to/your/image.jpg" // Replace with your image path
          alt="Coding"
          className="w-full h-auto rounded-lg shadow-lg transform transition-transform hover:scale-105"
        />
        <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
      </div>

      {/* Call to Action Section */}
      <div className="flex justify-center space-x-4 mb-16">
        <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold shadow-md hover:shadow-lg transition-transform duration-200 transform hover:scale-105">
          Get Started
        </button>
        <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold shadow-md hover:bg-white hover:text-blue-600 transition-transform duration-200 transform hover:scale-105">
          Learn More
        </button>
      </div>

      {/* Testimonials Section */}
      <div className="max-w-4xl w-full mb-16">
        <h2 className="text-4xl font-semibold text-center mb-8 relative z-10">
          What Our Users Say
          <div className="absolute inset-0 -z-10 transform rotate-12 -skew-x-12 bg-white opacity-20 rounded-lg"></div>
        </h2>
        <div className="space-y-4">
          <Testimonial 
            text="CodeSnap transformed my coding journey! The tools are easy to use, and the community is fantastic!" 
            author="Alex J." 
          />
          <Testimonial 
            text="I love the intuitive interface and the resources provided. It has made learning to code so much easier!" 
            author="Samira R." 
          />
          <Testimonial 
            text="The 24/7 support is a lifesaver! I always get help when I need it. Highly recommend!" 
            author="Jamie K." 
          />
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-white text-gray-800 w-full py-6 text-center">
        <p>&copy; 2024 CodeSnap. All rights reserved.</p>
      </footer>

      <style jsx>{`
        h1, h2, h3, p {
          font-family: 'Poppins', sans-serif;
        }
        p {
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 relative z-10">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-bold text-blue-600">{title}</h3>
      </div>
      <p className="text-gray-700 leading-relaxed">{description}</p>
    </div>
  );
};

// Testimonial Component
const Testimonial = ({ text, author }) => {
  return (
    <div className="bg-white text-gray-800 p-4 rounded-lg shadow-lg">
      <p>"{text}"</p>
      <p className="mt-2 font-bold">- {author}</p>
    </div>
  );
};
