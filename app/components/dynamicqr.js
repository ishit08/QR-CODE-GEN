"use client";

import { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import DownloadDynamicQR from './DownloadDynamicQR'; // Adjust the path if necessary
import QrLayout from './qrlayout'; // Adjust the path if necessary

export default function DynamicQR() {
  const [fields, setFields] = useState([{ caption: '', value: '' }]);
  const [qrCodeValue, setQrCodeValue] = useState('');
  const canvasRef = useRef(null); // Use useRef for canvas
  const [qrGenerated, setQrGenerated] = useState(false); // Track if the QR code has been generated

  // Add new row, max 5 rows
  const addField = () => {
    if (fields.length < 5) {
      setFields([...fields, { caption: '', value: '' }]);
    }
  };

  // Remove row
  const removeField = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  // Update field
  const handleChange = (index, field, value) => {
    const newFields = [...fields];
    newFields[index][field] = value;
    setFields(newFields);
  };

  // Handle QR code generation
  const handleGenerateQRCode = () => {
    const qrContent = fields.map(field => `${field.caption}: ${field.value}`).join('\n');
    setQrCodeValue(qrContent); // Set the QR code value to the combined fields
    setQrGenerated(true); // Mark that the QR code has been generated
  };

  // Effect to generate the QR code whenever qrCodeValue changes
  useEffect(() => {
    if (qrGenerated && qrCodeValue) {
      QRCode.toCanvas(canvasRef.current, qrCodeValue, { width: 300, height: 300 }, (error) => {
        if (error) console.error(error);
      });
    }
  }, [qrCodeValue, qrGenerated]);

  return (
    <QrLayout title="QR Code Inputs">
      {/* Input Fields */}
      <>
        {fields.map((field, index) => (
          <div key={index} className="flex mb-2 items-center">
            <input
              type="text"
              placeholder="Caption"
              value={field.caption}
              onChange={(e) => handleChange(index, 'caption', e.target.value)}
              className="p-2 border rounded mr-2"
            />
            <input
              type="text"
              placeholder="Value"
              value={field.value}
              onChange={(e) => handleChange(index, 'value', e.target.value)}
              className="p-2 border rounded mr-2"
            />
            {fields.length > 1 && (
              <button
                onClick={() => removeField(index)}
                className="flex items-center justify-center w-8 h-8 bg-red-500 hover:bg-red-700 text-white rounded-full leading-none"
              >
                <span className="text-3xl md:font-bold pb-1">−</span>
              </button>
            )}
          </div>
        ))}

        <div className="flex items-center mb-2">
          <button
            onClick={addField}
            disabled={fields.length === 5}
            className={`flex items-center justify-center w-8 h-8 text-white rounded-full leading-none ${
              fields.length === 5 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-700 text-white'
            }`}
          >
            <span className="text-3xl md:font-bold pb-1">+</span>
          </button>
        </div>

        {/* Generate QR Code Button */}
        <button
          onClick={handleGenerateQRCode}
          className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Generate QR Code
        </button>
      </>

      {/* QR Code Display */}
      {qrGenerated && (
        <div className="mt-6 flex flex-col items-center">
          <canvas
            ref={canvasRef}
            className="border max-w-xs max-h-xs" // Adjust max width and height here
            style={{ width: '300px', height: '300px' }} // Explicitly set dimensions
          />
          <DownloadDynamicQR canvasRef={canvasRef} /> {/* Pass the ref directly */}
        </div>
      )}
    </QrLayout>
  );
}
