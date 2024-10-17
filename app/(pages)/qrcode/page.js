"use client";

import { useState } from "react";
import Image from "next/image";

export default function QRCodeGeneratorPage() {
  const [selectedOption, setSelectedOption] = useState("URL");
  const [websiteURL, setWebsiteURL] = useState("");
  const [frameOption, setFrameOption] = useState("none");

  // Options for the QR code generation
  const options = [
    "Text",
    "URL",
    "Images",
    "Captions",
  ];

  return (
    <div>
      {/* Main Section with Background */}
      <main className="relative text-white py-10">
        {/* Background Design with Gradient and Polygons */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-cyan-200 -z-10">
          {/* Polygon SVGs */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="absolute top-10 left-10 w-48 h-48 opacity-20"
          >
            <polygon points="50,15 90,85 10,85" fill="white" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="absolute bottom-10 right-10 w-64 h-64 opacity-10"
          >
            <polygon points="50,0 100,100 0,100" fill="white" />
          </svg>
        </div>

        <div className="flex justify-between px-16">
          {/* Left Section */}
          <div className="w-2/3">
            <div className="text-center">
              <h2 className="text-2xl text-black font-bold">
                Create & Customize Your Dynamic QR Code for FREE
              </h2>
              <p className="mt-4 text-black">
                Generate, manage, and statistically track your QR codes
              </p>
            </div>

            {/* QR Code Options */}
            <div className="flex justify-center mt-10">
              <div className="grid grid-cols-4 gap-4">
                {options.map((option) => (
                  <button
                    key={option}
                    className={`px-4 py-2 rounded-md ${
                      selectedOption === option
                        ? "bg-blue-400 text-white"
                        : "bg-white text-black"
                    }`}
                    onClick={() => setSelectedOption(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Section */}
            <div className="flex justify-center mt-8">
              <input
                type="text"
                placeholder={`Enter ${selectedOption}`}
                value={websiteURL}
                onChange={(e) => setWebsiteURL(e.target.value)}
                className="text-black w-3/4 p-3 rounded-md"
              />
            </div>

            {/* Appearance Customization */}
            <div className="mt-10 flex justify-center items-center gap-4 text-black">
              <div className="flex flex-col items-center">
                <label>Frame</label>
                <div className="flex gap-4 mt-2">
                  <button
                    onClick={() => setFrameOption("none")}
                    className={`border-2 w-10 h-10 ${
                      frameOption === "none"
                        ? "border-yellow-500"
                        : "border-gray-300"
                    }`}
                  >
                    None
                  </button>
                  {/* Add more frame options if needed */}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <label>Shape</label>
                <div className="flex gap-4 mt-2">
                  <button className="border-2 border-gray-300 w-10 h-10">1</button>
                  <button className="border-2 border-gray-300 w-10 h-10">2</button>
                  {/* Add more shape options if needed */}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <label>Logo</label>
                <div className="flex gap-4 mt-2">
                  <button className="border-2 border-gray-300 w-10 h-10">1</button>
                  <button className="border-2 border-gray-300 w-10 h-10">2</button>
                  {/* Add more logo options if needed */}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <label>Level</label>
                <div className="flex gap-4 mt-2">
                  <button className="border-2 border-gray-300 w-10 h-10">1</button>
                  <button className="border-2 border-gray-300 w-10 h-10">2</button>
                  {/* Add more level options if needed */}
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - QR Code and Buttons */}
          <div className="w-1/3 flex flex-col items-center justify-center bg-white rounded-md p-8 shadow-lg">
            {/* QR Code Display */}
            

            {/* Generate QR Button */}
            <div className="flex mt-20">
              <button className="bg-blue-400 px-6 py-3 rounded-md text-white ">
                Generate QR
              </button>
            </div>
      
          </div>
        </div>
      </main>
      
    </div>
  );
}
