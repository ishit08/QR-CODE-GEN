// app/components/BulkQR.js
import { useState, useRef } from 'react';
import Papa from 'papaparse';
import QRCode from 'qrcode';
import DownloadDynamicQR from './DownloadDynamicQR'; // Use this component for downloading
import QrLayout from './QrLayout'; // Import the QrLayout component

const BulkQR = () => {
  const [csvData, setCsvData] = useState([]);
  const [qrCodes, setQrCodes] = useState([]);
  const canvasRefs = useRef([]); // Store references to multiple canvas elements

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setCsvData(results.data);
          generateQRCodes(results.data);
        },
      });
    }
  };

  const generateQRCodes = (data) => {
    const codes = data.map((row, index) => {
      const qrData = Object.entries(row)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
      return QRCode.toDataURL(qrData).then((dataUrl) => {
        // Store the canvas ref for each QR code
        const img = new Image();
        img.src = dataUrl;
        return img; // Return the image for later use
      });
    });

    Promise.all(codes).then((values) => {
      setQrCodes(values); // Set QR codes as images
    });
  };

  return (
    <QrLayout title="Upload CSV to Generate QR Codes">
      {/* Input Section */}
      <div>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="mb-4"
        />
      </div>

      {/* QR Code Section */}
      <div className="grid grid-cols-2 gap-4">
        {qrCodes.map((qrCode, index) => (
          <div key={index} className="flex flex-col items-center">
            <canvas
              ref={(el) => (canvasRefs.current[index] = el)} // Set canvas ref for download
              width={200}
              height={200}
            >
              <img src={qrCode.src} alt={`QR Code ${index + 1}`} />
            </canvas>
            <DownloadDynamicQR canvasRef={canvasRefs} />
          </div>
        ))}
      </div>
    </QrLayout>
  );
};

export default BulkQR;
