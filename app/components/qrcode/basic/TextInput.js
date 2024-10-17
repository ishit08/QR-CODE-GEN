// components/qrcode/TextInput.js

import React from "react";

const TextInput = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700">Enter Text/URL:</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>
  );
};

export default TextInput;
