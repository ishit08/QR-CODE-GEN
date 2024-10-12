// BulkQR.js

import { useState, useEffect, useRef } from 'react';
import Papa from 'papaparse';
import QRCode from 'qrcode';
import FileUpload from './FileUpload';
import ColumnSelection from './ColumnSelection';
import ImageUpload from './ImageUpload';
import ColorSelection from './ColorSelection';
import QRCodeTable from './QRCodeTable';
import QrLayout from './QrLayout';
// ... other imports ...
import { downloadQRCodePDF } from '../utility/downloadQRCodePDF';
import { printQRCodePDF } from '../utility/printQRCodePDF';

const BulkQR = () => {
  const [csvData, setCsvData] = useState([]);
  const [qrCodes, setQrCodes] = useState([]);
  const [fileName, setFileName] = useState('');
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedRecords, setProcessedRecords] = useState(0);
  const [error, setError] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [allQRCodesReady, setAllQRCodesReady] = useState(false);

  const hasLoggedRef = useRef(false);

  const handlePrint = () => {
     // Implement your print functionality here
    console.log('Print icon clicked');
     if (qrCodes && qrCodes.length > 0) {
      printQRCodePDF(qrCodes);
    } else {
      alert('No QR codes available for printing.');
    }
   
  };

  const handleDownload = () => {

    // Implement your download functionality here
    console.log('Download icon clicked');
      if (qrCodes && qrCodes.length > 0) {
      downloadQRCodePDF(qrCodes);
    } else {
      alert('No QR codes available for download.');
    }
  };
  // Update allQRCodesReady state
  useEffect(() => {
    if (qrCodes.length > 0) {
      setAllQRCodesReady(true);
    } else {
      setAllQRCodesReady(false);
      hasLoggedRef.current = false; // Reset the log flag
    }
  }, [qrCodes.length]);

  // Log only once when all QR codes are ready
  useEffect(() => {
    if (allQRCodesReady && !hasLoggedRef.current) {
      console.log('All QR codes are ready:', qrCodes);
      hasLoggedRef.current = true;
    }
  }, [allQRCodesReady, qrCodes]);

  const generateQRCodes = async () => {
    if (csvData.length === 0) {
      alert("Please upload a CSV file first.");
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setError('');
    setAllQRCodesReady(false);
    setQrCodes([]);
    setProcessedRecords(0);
    hasLoggedRef.current = false; // Reset the log flag

    try {
      const codes = [];
      for (let i = 0; i < csvData.length; i++) {
        const row = csvData[i];
        const qrData = Object.entries(row)
          .map(([key, value]) => `${key}: ${value}`)
          .join(', ');
        if (!qrData) continue;

        const options = {
          width: 300,
          color: {
            dark: textColor,
            light: bgColor,
          },
        };

        const qrCodeCanvas = document.createElement('canvas');
        await QRCode.toCanvas(qrCodeCanvas, qrData, options);

        if (imageFile) {
          const ctx = qrCodeCanvas.getContext('2d');
          const img = new Image();
          img.src = URL.createObjectURL(imageFile);
          await new Promise((resolve) => {
            img.onload = () => {
              const imgSize = qrCodeCanvas.width * 0.2;
              const x = (qrCodeCanvas.width - imgSize) / 2;
              const y = (qrCodeCanvas.height - imgSize) / 2;
              ctx.drawImage(img, x, y, imgSize, imgSize);
              resolve();
            };
          });
        }

        const qrCode = qrCodeCanvas.toDataURL();
        codes.push({ qrCode, label: row[selectedColumn] });
        setProgress(Math.floor(((i + 1) / csvData.length) * 100));
        setProcessedRecords(i + 1);
      }
      setQrCodes(codes);
    } catch (err) {
      setError('Error generating QR codes. Please check the file format.');
      console.error('Error in generateQRCodes:', err);
    } finally {
      setIsProcessing(false);
      setFileName('');
    }
  };

  // Logging when qrCodes or csvData change
  useEffect(() => {
    console.log('qrCodes.length:', qrCodes.length);
    console.log('csvData.length:', csvData.length);
    console.log('allQRCodesReady:', allQRCodesReady);
  }, [qrCodes.length, csvData.length, allQRCodesReady]);

  return (
    <QrLayout title="Upload CSV to Generate QR Codes"  onPrint={handlePrint} onDownload={handleDownload}>
      <div className="bg-white px-2">
        <FileUpload setCsvData={setCsvData} setFileName={setFileName} />
        <ColumnSelection csvData={csvData} selectedColumn={selectedColumn} setSelectedColumn={setSelectedColumn} />
        <ImageUpload setImageFile={setImageFile} />
        <ColorSelection bgColor={bgColor} setBgColor={setBgColor} textColor={textColor} setTextColor={setTextColor} />

        <div className="mt-4 flex justify-center">
          <button
            onClick={generateQRCodes}
            className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
            style={{ display: isProcessing ? 'none' : 'inline-block' }}
            disabled={isProcessing}
          >
            {isProcessing ? "Generating..." : "Generate QR Codes"}
          </button>
        </div>

        {isProcessing && (
          <div className="mt-4 text-center">
            <span>Processing: {Math.round(progress)}%</span>
            <progress value={progress} max="100" className="w-full"></progress>
          </div>
        )}

        {processedRecords > 0 && !isProcessing && (
          <div className="mt-4 text-center text-green-600">
            {processedRecords} records processed from the file.
          </div>
        )}

        {error && (
          <div className="mt-4 text-center text-red-500">
            {error}
          </div>
        )}
      </div>

       {/* Children[1]: QR Code Display Section */}
      <div>
        <QRCodeTable qrCodes={qrCodes} />
        {/* If you have other components to display, include them here */}
      </div>     
    </QrLayout>
  );
};

export default BulkQR;
