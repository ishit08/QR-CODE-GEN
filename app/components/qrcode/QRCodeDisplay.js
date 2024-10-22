// components/qrcode/QRCodeDisplay.js
import React, { useEffect, useRef } from 'react';

const QRCodeDisplay = ({ qrCode }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (qrCode && canvasRef.current) {
      // Clear the canvas before drawing the new QR code
      canvasRef.current.innerHTML = "";
      qrCode.append(canvasRef.current); // Fix: Use qrCode.appendTo instead of qrCode.append
    }
  }, [qrCode]);

  return (
    <div className="mb-4">
      <div ref={canvasRef}></div> {/* This is where the QR code will be rendered */}
    </div>
  );
};

export default QRCodeDisplay;