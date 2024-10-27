import React, { useEffect, useRef } from 'react';
import '../../../styles/qrcodes.css';

const QRCodeDisplay = ({ qrCode }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (qrCode && canvasRef.current) {
      // Clear the canvas before drawing the new QR code
      canvasRef.current.innerHTML = "";  // Clear any previous QR code
      qrCode.append(canvasRef.current);  // Append the new QR code
    } else if (canvasRef.current) {
      // Clear the canvas if qrCode is null (after reset)
      canvasRef.current.innerHTML = "No QR code to display.";  // Show a placeholder message when no QR code
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
