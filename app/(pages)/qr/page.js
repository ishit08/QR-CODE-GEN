"use client"; // Marking as a client component to use the QR code library

import { useState } from 'react';

const QRGenerator = () => {
  const [text, setText] = useState('');
  const [canvasRef, setCanvasRef] = useState(null);

  const generateQRCode = () => {
    const qrCodeElement = document.getElementById('qrcode');
    
    // Clear any existing QR code
    qrCodeElement.innerHTML = '';

    if (text) {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      qrCodeElement.appendChild(canvas);
      setCanvasRef(canvas); // Store the canvas reference

      // Generate the QR code dynamically and render it on the canvas
      QRCode.toCanvas(canvas, text, function (error) {
        if (error) {
          console.error(error);
        }
      });
    } else {
      alert("Please enter some text or URL to generate the QR code.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">QR Code Generator</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text or URL"
        className="p-2 mb-4 border rounded"
      />
      <button
        onClick={generateQRCode}
        className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Generate QR Code
      </button>
      <div id="qrcode" className="mt-4"></div>

      {/* Include the QRCode library */}
      <script src="https://cdn.jsdelivr.net/npm/qrcode@1.4.4/build/qrcode.min.js"></script>
    </div>
  );
};

export default QRGenerator;
