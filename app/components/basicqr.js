//basicqr.js

"use client"; // Marking as a client component to use the QR code library

import { useState } from "react";
import DownloadQR from "./DownloadQR"; // Import the reusable download component

export default function BasicQr() {
  const [text, setText] = useState("");
  const [canvasRef, setCanvasRef] = useState(null);

  const generateQRCode = () => {
    const qrCodeElement = document.getElementById("qrcode");

    // Clear any existing QR code
    qrCodeElement.innerHTML = "";

    if (text) {
      const canvas = document.createElement("canvas");
      qrCodeElement.appendChild(canvas);
      setCanvasRef(canvas);

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
    <div className="min-h-[50vh] bg-gray-100 p-8">
      <div className="grid grid-cols-2 gap-8">
        {/* Column 1: User Input */}
        <div className="flex flex-col items-start p-6 bg-white shadow-xl rounded-lg border border-gray-300" style={{ boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.2)" }}>
          <h2 className="text-xl font-bold mb-4">Enter Text or URL</h2>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text or URL"
            className="p-2 mb-4 border rounded w-full"
            style={{ width: "300px" }} // Fixed width for the input box
          />
          <button
            onClick={generateQRCode}
            className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Generate QR Code
          </button>
        </div>

        {/* Column 2: QR Code Output and Download Options */}
        <div className="flex flex-col items-center p-6 bg-white shadow-xl rounded-lg border border-gray-300" style={{ boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.2)" }}>
          <h2 className="text-xl font-bold mb-4">Generated QR Code</h2>
          <div id="qrcode" className="border p-4 bg-white"></div>
          {canvasRef && <DownloadQR canvasRef={canvasRef} />} {/* Reusable download component */}
        </div>
      </div>

      {/* Include the QRCode library */}
      <script src="https://cdn.jsdelivr.net/npm/qrcode@1.4.4/build/qrcode.min.js"></script>
    </div>
  );
}
