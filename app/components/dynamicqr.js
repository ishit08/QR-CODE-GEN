"use client";

import { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import DownloadDynamicQR from './DownloadDynamicQR'; // Import the new Download component
import QrLayout from './qrlayout';

export default function DynamicQR() {
  const [fields, setFields] = useState([{ caption: '', value: '' }]);
  const [qrCodeValue, setQrCodeValue] = useState('');
  const canvasRef = useRef(null);
  const [qrGenerated, setQrGenerated] = useState(false);

  const addField = () => {
    if (fields.length < 5) {
      setFields([...fields, { caption: '', value: '' }]);
    }
  };

  const removeField = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  const handleChange = (index, field, value) => {
    const newFields = [...fields];
    newFields[index][field] = value;
    setFields(newFields);
  };

  const handleGenerateQRCode = () => {
    const qrContent = fields.map(field => `${field.caption}: ${field.value}`).join('\n');
    setQrCodeValue(qrContent);
    setQrGenerated(true);
  };

  useEffect(() => {
    if (qrGenerated && qrCodeValue) {
      QRCode.toCanvas(canvasRef.current, qrCodeValue, { width: 300, height: 300 }, (error) => {
        if (error) console.error(error);
      });
    }
  }, [qrCodeValue, qrGenerated]);

  return (
    <QrLayout title="Dynamic QR Code Inputs">
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
                className="flex items-center justify-center w-10 h-10 bg-red-500 hover:bg-red-700 text-white rounded-full leading-none -mt-1"
              >
                <span className="text-xl">−</span>
              </button>
            )}
          </div>
        ))}

        <div className="flex items-center mb-2">
          <button
            onClick={addField}
            disabled={fields.length === 5}
            className={`flex items-center justify-center w-10 h-10 text-white rounded-full leading-none -mt-1 ${
              fields.length === 5 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-700 text-white'
            }`}
          >
            <span className="text-xl">+</span>
          </button>
        </div>

        <button
          onClick={handleGenerateQRCode}
          className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Generate QR Code
        </button>
      </>
      <>
    
       {qrGenerated && (
        <div className="mt-6">
          <canvas ref={canvasRef} className="border" />
          <DownloadDynamicQR canvasRef={canvasRef} /> {/* Use the new download component */}
        </div>
      )}
      </>
     
    </QrLayout>
  );
}
