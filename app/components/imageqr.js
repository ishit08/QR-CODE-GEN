"use client";

import { useState } from "react";
import DownloadQR from "./DownloadQR";
import QrLayout from "./QrLayout";
import QRCode from 'qrcode';  // Ensure this line is present

export default function ImageQR() {
  const [text, setText] = useState("");
  const [orgText, setOrgText] = useState("");
  const [location, setLocation] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [canvasRef, setCanvasRef] = useState(null);

  const generateQRCode = () => {
    const qrCodeElement = document.getElementById("qrcode");
    const orgNameElement = document.getElementById("orgName");

    qrCodeElement.innerHTML = "";
    orgNameElement.innerHTML = "";

    const qrContentArray = [];

    // Build the QR content based on filled inputs
    if (text) qrContentArray.push(`URL: ${text}`);
    if (orgText) qrContentArray.push(`Organization: ${orgText}`); // Add organization name to QR content
    if (location) qrContentArray.push(`Location: ${location}`);
    
    const qrContent = qrContentArray.join('\n'); // Join filled content for QR code

    // Only proceed if there's content for QR code
    if (qrContent) {
      const reader = new FileReader();

      // If an image file is provided, load it
      if (imageFile) {
        reader.onload = (event) => {
          const imageUrl = event.target.result;
          const canvas = document.createElement("canvas");
          qrCodeElement.appendChild(canvas);
          setCanvasRef(canvas);

          // Generate the QR code
          QRCode.toCanvas(canvas, qrContent, { width: 300, height: 300 }, (error) => {
            if (error) console.error(error);

            const ctx = canvas.getContext("2d");
            const img = new Image();
            img.src = imageUrl;

            img.onload = function () {
              const scaleFactor = Math.min(canvas.width / img.width, canvas.height / img.height) * 0.2;
              const imgWidth = img.width * scaleFactor;
              const imgHeight = img.height * scaleFactor;
              const x = canvas.width / 2 - imgWidth / 2;
              const y = canvas.height / 2 - imgHeight / 2;

              ctx.drawImage(img, x, y, imgWidth, imgHeight);
            };
          });

          orgNameElement.style.color = textColor;
          orgNameElement.style.backgroundColor = bgColor;
          orgNameElement.innerHTML = orgText;
        };

        reader.readAsDataURL(imageFile);
      } else {
        // If no image, just generate the QR code without it
        const canvas = document.createElement("canvas");
        qrCodeElement.appendChild(canvas);
        setCanvasRef(canvas);

        QRCode.toCanvas(canvas, qrContent, { width: 300, height: 300 }, (error) => {
          if (error) console.error(error);
        });

        orgNameElement.style.color = textColor;
        orgNameElement.style.backgroundColor = bgColor;
        orgNameElement.innerHTML = orgText;
      }
    } else {
      alert("Please enter at least a URL or location to generate a QR code.");
    }
  };

  return (
    <QrLayout title="Enter Details">
      {/* Input Fields */}
      <>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter URL (optional)"
          className="p-2 mb-4 border rounded w-full"
        />
        <input
          type="text"
          value={orgText}
          onChange={(e) => setOrgText(e.target.value)}
          placeholder="Enter organization name (optional)"
          className="p-2 mb-4 border rounded w-full"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter Google Maps location URL (optional)"
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
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="ml-2" />
          </div>
          <div>
            <label>Text Color</label>
            <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="ml-2" />
          </div>
        </div>

        <button onClick={generateQRCode} className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">
          Generate QR Code
        </button>
      </>

      {/* QR Code Display */}
      <>
        <div id="qrcode" className="border p-4 bg-white overflow-y-auto"></div>
        <div id="orgName" className="mt-4 text-lg font-semibold"></div>
        {canvasRef && <DownloadQR canvasRef={canvasRef} />}
      </>
    </QrLayout>
  );
}
