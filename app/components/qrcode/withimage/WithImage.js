import React, { useState } from "react"; // Import QRLayout for structure
import TextInput from "../basic/TextInput"; // Reusing TextInput component
import GenerateButton from "../basic/GenerateButton"; // Reusing GenerateButton component
import QRCodeDisplay from "../basic/QRCodeDisplay"; // Reusing QRCodeDisplay component
import QRUtils from "../../../utility/qrcode/QRUtils"; // Importing utility for QR generation
import ColorPicker from "./ColorPicker"; // Import the ColorPicker component

const WithImage = () => {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [colors, setColors] = useState({ dark: "#000000", light: "#ffffff" }); // State for colors

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = () => {
    // Combine all inputs into a single string, separated by a new line or any other separator
    const combinedData = `${text}\n${url}\n${location}`.trim(); // Use \n to separate inputs

    const options = {
        data: combinedData, // Use the combined data
        width: 300, // Example size
        height: 300, // Example size
        image: image, // Include the image in the QR options
        dotsOptions: {
            color: colors.dark, // Dark color for dots
            type: 'rounded', // Can customize dot type here
        },
        backgroundOptions: {
            color: colors.light, // Light color for background
        },
    };

    const qrCodeInstance = QRUtils.createQRCode(options);
    setQrCode(qrCodeInstance);
};

  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-r from-green-100 to-blue-200 rounded-lg shadow-lg p-6">
      <div className="flex-1 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">QR Code Generator with Image</h2>
        
        <TextInput value={text} onChange={setText} />
        <TextInput value={url} onChange={setUrl} />
        
        <div className="mb-4">
          <label className="block text-gray-700">Google Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">Upload Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Color Picker for selecting colors */}
        <ColorPicker colors={colors} onChange={setColors} />

        <div className="flex justify-between mt-6">
          <GenerateButton onClick={handleGenerate} />
          {/* Optional Reset Button */}
        </div>
      </div>

      {/* QR Code Display Section */}
      <div className="flex-1 p-4 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Generated QR Code</h2>
          <QRCodeDisplay qrCode={qrCode} />
        </div>
      </div>
    </div>
  );
};

export default WithImage;
