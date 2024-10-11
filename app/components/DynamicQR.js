// BulkQR.js
import { useState, useRef, useEffect } from 'react';
import Papa from 'papaparse';
import QRCode from 'qrcode';
import FileUpload from './FileUpload';
import ColumnSelection from './ColumnSelection';
import ImageUpload from './ImageUpload';
import ColorSelection from './ColorSelection';
import QRCodeTable from './QRCodeTable';
import BulkDownloadQR from './BulkDownloadQR';
import QrLayout from './QrLayout';
import { drawQRCodesOnCanvas } from '../utility/drawQRCodesOnCanvas';

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
  const canvasRef = useRef(null);
  const [qrGenerated, setQrGenerated] = useState(false); // Add this state to track QR code generation

  const generateQRCodes = async () => {
    if (csvData.length === 0) {
      alert("Please upload a CSV file first.");
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setError('');
    setQrGenerated(false); // Reset the flag before generating

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
      setQrGenerated(true); // Set the flag to true after QR codes are generated
    } catch (err) {
      setError('Error generating QR codes. Please check the file format.');
      console.error(err);
    } finally {
      setIsProcessing(false);
      setFileName('');
    }
  };

  useEffect(() => {
    if (qrCodes.length > 0) {
      drawQRCodesOnCanvas(canvasRef, qrCodes.map(code => code.qrCode), imageFile);
    }
  }, [qrCodes, imageFile]);

  return (
    <QrLayout title="Upload CSV to Generate QR Codes">
      <div className="bg-white px-2">
        <FileUpload setCsvData={setCsvData} setFileName={setFileName} />
        <ColumnSelection csvData={csvData} selectedColumn={selectedColumn} setSelectedColumn={setSelectedColumn} />
        <ImageUpload setImageFile={setImageFile} />
        <ColorSelection bgColor={bgColor} setBgColor={setBgColor} textColor={textColor} setTextColor={setTextColor} />

        <div className="mt-4 flex justify-center">
          <button
            onClick={generateQRCodes}
            className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
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

      <QRCodeTable qrCodes={qrCodes} />

      {qrGenerated && (
        <div className="mt-6 flex flex-col items-center">
          <canvas
            ref={canvasRef}
            className="border max-w-xs max-h-xs"
            style={{ width: '300px', height: '300px' }}
          />
          <BulkDownloadQR qrCodes={qrCodes.map(code => code.qrCode)} />
        </div>
      )}
    </QrLayout>
  );
};

export default BulkQR;
