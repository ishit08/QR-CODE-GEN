"use client";

import { useState } from 'react';
import QRCode from 'qrcode';
import DownloadQR from "./DownloadQR";

export default function ImageQR() {
  const [text, setText] = useState('');
  const [orgText, setOrgText] = useState('');
  const [location, setLocation] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');
  const [canvasRef, setCanvasRef] = useState(null); // This will hold the canvas

  const generateQRCode = () => {
    const qrCodeElement = document.getElementById('qrcode');
    const orgNameElement = document.getElementById('orgName');

    // Clear any existing QR code
    qrCodeElement.innerHTML = '';
    orgNameElement.innerHTML = '';

    if (text && orgText && location && imageFile) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const imageUrl = event.target.result;
        const qrContent = `${text} \n Location: ${location}`; // Combined QR content

        const canvas = document.createElement('canvas');
        qrCodeElement.appendChild(canvas);
        setCanvasRef(canvas); // Set the reference to the canvas

        // Generate the QR code and draw the image inside it
        QRCode.toCanvas(canvas, qrContent, { width: 300, height: 300 }, function(error) {
          if (error) console.error(error);

          const ctx = canvas.getContext('2d');
          const img = new Image();
          img.src = imageUrl;

          img.onload = function() {
            const scaleFactor = Math.min(canvas.width / img.width, canvas.height / img.height) * 0.2;
            const imgWidth = img.width * scaleFactor;
            const imgHeight = img.height * scaleFactor;
            const x = (canvas.width / 2) - (imgWidth / 2);
            const y = (canvas.height / 2) - (imgHeight / 2);
            
            ctx.drawImage(img, x, y, imgWidth, imgHeight);
          };
        });

        // Set the organization name and style
        orgNameElement.style.color = textColor;
        orgNameElement.style.backgroundColor = bgColor;
        orgNameElement.innerHTML = orgText;
      };

      reader.readAsDataURL(imageFile);
    } else {
      alert("Please enter a URL, organization name, Google Maps location, and upload an image.");
    }
  };

  return (
    <div className="min-h-[50vh] bg-gray-100 p-8 overflow-y-auto">
      <div className="grid grid-cols-2 gap-8">
        {/* Column 1: Inputs */}
        <div className="flex flex-col items-start p-6 bg-white shadow-xl rounded-lg border border-gray-300">
          <h2 className="text-xl font-bold mb-4">Enter Details</h2>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter URL"
            className="p-2 mb-4 border rounded w-full"
          />
          <input
            type="text"
            value={orgText}
            onChange={(e) => setOrgText(e.target.value)}
            placeholder="Enter organization name"
            className="p-2 mb-4 border rounded w-full"
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter Google Maps location URL"
            className="p-2 mb-4 border rounded w-full"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="p-2 mb-4 border rounded w-full"
          />

          <div className="flex gap-4 mb-6">
            <div>
              <label>Background Color</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="ml-2"
              />
            </div>
            <div>
              <label>Text Color</label>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="ml-2"
              />
            </div>
          </div>

          <button
            onClick={generateQRCode}
            className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Generate QR Code
          </button>
        </div>

        {/* Column 2: QR Code Output and Download */}
        <div className="flex flex-col items-center p-6 bg-white shadow-xl rounded-lg border border-gray-300">
          <h2 className="text-xl font-bold mb-4">Generated QR Code</h2>
          <div id="qrcode" className="border p-4 bg-white overflow-y-auto"></div>
          <div id="orgName" className="mt-4 text-lg font-semibold"></div>
          {canvasRef && <DownloadQR canvasRef={canvasRef} />} {/* Use DownloadQR component */}
        
        </div>
      </div>
    </div>
  );
}
