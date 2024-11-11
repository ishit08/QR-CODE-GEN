"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import Barcode from 'react-barcode';

export default function BarcodePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [barcodeText, setBarcodeText] = useState('');
  const [barcodeOptions, setBarcodeOptions] = useState({
    width: 2,
    height: 100,
    format: "CODE128",
    displayValue: true,
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push("/login") 
    }
  }, [status, router]);

  const handleDownload = () => {
    const svg = document.querySelector('.barcode-container svg');
    if (!svg) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    const img = new Image();
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      ctx.drawImage(img, 0, 0);
      
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'barcode.png';
      link.href = url;
      link.click();
      
      URL.revokeObjectURL(svgUrl);
    };
    
    img.src = svgUrl;
  };

  if (status === 'authenticated') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-2xl font-bold text-center mb-6">Barcode Generator</h1>
          
          <div className="space-y-4">
            <input
              type="text"
              value={barcodeText}
              onChange={(e) => setBarcodeText(e.target.value)}
              placeholder="Enter text for barcode"
              className="w-full p-2 border rounded-md"
            />

            <select 
              onChange={(e) => setBarcodeOptions(prev => ({...prev, format: e.target.value}))}
              className="w-full p-2 border rounded-md"
            >
              <option value="CODE128">CODE128</option>
              <option value="EAN13">EAN13</option>
              <option value="CODE39">CODE39</option>
            </select>
          </div>

          {barcodeText && (
            <div className="flex flex-col items-center space-y-4 p-4 border rounded-md">
              <div className="barcode-container">
                <Barcode 
                  value={barcodeText}
                  {...barcodeOptions}
                />
              </div>
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Download Barcode
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
}
