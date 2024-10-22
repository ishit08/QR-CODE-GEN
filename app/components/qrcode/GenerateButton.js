// components/qrcode/GenerateButton.js

import React from "react";

const GenerateButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition duration-300"
    >
      Generate QR Code
    </button>
  );
};

export default GenerateButton;
