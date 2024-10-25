// components/qrcode/QRCodeDisplay.js
import React, { useEffect, useRef } from 'react';
import '../../styles/qrcodes.css';
const QRCodeDisplay = ({ qrCode }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (qrCode && canvasRef.current) {
      // Clear the canvas before drawing the new QR code
      canvasRef.current.innerHTML = "";
      qrCode.append(canvasRef.current); 
    }
  }, [qrCode]);

  return (
    <div className="frame-container">
      <div className="frame-with-label">
        <div ref={canvasRef} className="qr-code-content"></div> {/* QR code rendered here */}
        <div className="qr-label">
          <i className="fa fa-mobile" aria-hidden="true"></i> Scan me!
        </div>
      </div>
    </div>
  );
};

export default QRCodeDisplay;
