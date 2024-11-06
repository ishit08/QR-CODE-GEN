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
    <div>
   
      <Image
        src="/imagesframe/facebook.png" // Use the path relative to the public folder
        alt="Facebook"
        className="cursor-pointer"
        onClick={handleClick}
        width={100} // Adjust width as necessary
        height={100} // Adjust height as necessary
      />
    </div>
  );
};

export default PresetQRCode;
