import React from 'react';

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
      <img
        src="imagesframe/facebook.png" // Replace with the path to the preset QR code image
        alt="Preset QR"
        className="cursor-pointer"
        onClick={handleClick}
        style={{ width: '150px', height: '150px' }} // Adjust size if necessary
      />
    </div>
  );
};

export default PresetQRCode;
