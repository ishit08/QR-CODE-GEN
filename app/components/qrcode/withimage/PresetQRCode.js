import React from 'react';
import Image from 'next/image'; // Import Image from next/image

const PresetQRCode = ({ onPresetClick }) => {
  const handleClick = () => {
    // Apply default design settings
    const presetOptions = {
      position: "#316FF6", // Sky blue color for position markers
      pixel: "#000000",    // Black color for pixels
      cornerStyle: "extra-rounded", 
      cornerDotStyle: "dot", 
      dotStyle: "dots",
      image: "imagesframe/2023_Facebook_icon.svg" // Replace with the path to the Facebook icon
    };

    onPresetClick(presetOptions);
  };

  return (
    <div className="mb-4">
      <h3 className="text-gray-700">Choose Preset Design:</h3>
      <Image
        src="/imagesframe/facebook.png" // Use the path relative to the public folder
        alt="Preset QR"
        className="cursor-pointer"
        onClick={handleClick}
        width={150} // Adjust width as necessary
        height={150} // Adjust height as necessary
      />
    </div>
  );
};

export default PresetQRCode;
