import React, { useEffect, useRef } from 'react';
import '../../../styles/qrcodes.css';

const QRCodeDisplay = ({ qrCode }) => {
  const containerRef = useRef(null);
  useEffect(() => {  
    if (qrCode instanceof HTMLCanvasElement) {   
      // Get the element by ID
      const qrCodeElement = document.getElementById("qrCode");
      // Clear all child elements
      qrCodeElement.innerHTML = "";
        // If qrCode is a canvas, append it directly
       qrCodeElement.appendChild(qrCode);
    } else if (qrCode && typeof qrCode.append === 'function') {
        containerRef.current.innerHTML = "";
        // Assume qrCode has an append method (like from a QR library)
        qrCode.append(containerRef.current);
      } else {
        // If qrCode is null or of an unexpected type, display a placeholder message
        containerRef.current.textContent = "No QR code to display.";
      }
    }
  , [qrCode]);

  return (
   <div className="frame-container">
      <div className="frame-with-label">
        {/* Conditionally render based on the type of qrCode */}
        {qrCode instanceof HTMLCanvasElement ? (
          <div id="qrCode" className="qr-code-content">
            {/* The canvas is already appended via useEffect, so no need to render it here */}
          </div>
        ) : (
          <div ref={containerRef} className="qr-code-content">
            {/* QR code rendered here via useEffect */}
          </div>
        )}
        <div className="qr-label">
          <i className="fa fa-mobile" aria-hidden="true"></i> Scan me!
        </div>
      </div>
    </div>
  );
};

export default QRCodeDisplay;
