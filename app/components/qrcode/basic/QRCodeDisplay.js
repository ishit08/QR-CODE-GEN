import { useEffect, useRef } from "react";

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
    <div className="mb-4">
      <div ref={canvasRef}></div> {/* This is where the QR code will be rendered */}
    </div>
  );
};

export default QRCodeDisplay;
