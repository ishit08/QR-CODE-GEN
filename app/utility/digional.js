"use client";
 
import { useState, useRef } from "react";
import QRCode from "qrcode";
 
export default function CustomQrCode() {
  const [text, setText] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#000000");
  const [secondaryColor, setSecondaryColor] = useState("#000000");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
 
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
 
  const generateQRCode = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
 
    QRCode.toCanvas(
      canvas,
      text,
      { errorCorrectionLevel: "H", margin: 1, scale: 8, color: { dark: "#000000", light: "#FFFFFF" } },
      (error) => {
        if (error) console.error(error);
 
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
 
        const { width, height } = canvas;
 
        // Draw diagonal color pattern
        const imgData = ctx.getImageData(0, 0, width, height);
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4;
            const isDark = imgData.data[index] === 0 && imgData.data[index + 1] === 0 && imgData.data[index + 2] === 0;
 
            if (isDark) {
             
              if (x + y < width) {
                imgData.data[index] = parseInt(primaryColor.substring(1, 3), 16); // R
                imgData.data[index + 1] = parseInt(primaryColor.substring(3, 5), 16); // G
                imgData.data[index + 2] = parseInt(primaryColor.substring(5, 7), 16); // B
              } else {
                imgData.data[index] = parseInt(secondaryColor.substring(1, 3), 16); // R
                imgData.data[index + 1] = parseInt(secondaryColor.substring(3, 5), 16); // G
                imgData.data[index + 2] = parseInt(secondaryColor.substring(5, 7), 16); // B
              }
            }
          }
        }
        ctx.putImageData(imgData, 0, 0);
 
        // Add image in the center
        if (imageSrc) {
          const img = new Image();
          img.src = imageSrc;
          img.onload = () => {
            const imgSize = width * 0.2;
            const imgX = (width - imgSize) / 2;
            const imgY = (height - imgSize) / 2;
            ctx.drawImage(img, imgX, imgY, imgSize, imgSize);
          };
        }
      }
    );
  };
 
  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-6">Custom Diagonal QR Code Generator</h1>
 
      {/* Input for Text/URL */}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text or URL"
        className="p-3 border border-gray-300 rounded w-full max-w-sm mb-4"
      />
 
      {/* Color pickers */}
      <div className="flex space-x-4 mb-4">
        <div>
          <label className="block text-sm font-medium">Primary Color (Top-Left):</label>
          <input
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="mt-2 w-10 h-10 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Secondary Color (Bottom-Right):</label>
          <input
            type="color"
            value={secondaryColor}
            onChange={(e) => setSecondaryColor(e.target.value)}
            className="mt-2 w-10 h-10 cursor-pointer"
          />
        </div>
      </div>
 
      {/* File upload for image */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Upload Center Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="block w-full max-w-sm text-sm border border-gray-300 rounded cursor-pointer p-2"
        />
      </div>
 
      {/* Generate Button */}
      <button
        onClick={generateQRCode}
        className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition"
      >
        Generate QR Code
      </button>
 
      {/* Canvas to display QR code */}
      <div className="mt-8">
        <canvas ref={canvasRef} className="border border-gray-300 p-4"></canvas>
      </div>
    </div>
  );
}