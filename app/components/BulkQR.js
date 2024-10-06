import { useState, useRef, useEffect } from 'react';
import Papa from 'papaparse';
import QRCode from 'qrcode';
import BulkDownloadQR from "./BulkDownloadQR"; // Import the new component
import QrLayout from './qrlayout';
import { drawQRCodesOnCanvas } from '../utility/qrCanvasUtils'; 

const BulkQR = () => {
  const [csvData, setCsvData] = useState([]);
  const [qrCodes, setQrCodes] = useState([]);
  const [fileName, setFileName] = useState('');
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedRecords, setProcessedRecords] = useState(0);
  const [error, setError] = useState('');
  const canvasRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setCsvData(results.data.slice(0, -1));
          setProcessedRecords(0);
          setQrCodes([]);       
        },
      });
    }
  };

  const generateQRCodes = async () => {
    if (csvData.length === 0) {
      alert("Please upload a CSV file first.");
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setError('');
    
    try {
      const codes = [];
      for (let i = 0; i < csvData.length; i++) {
        const row = csvData[i];
        const qrData = Object.entries(row)
          .map(([key, value]) => `${key}: ${value}`)
          .join(', ');
        const qrCode = await QRCode.toDataURL(qrData);
        codes.push(qrCode);
        
        setProgress(Math.floor(((i + 1) / csvData.length) * 100));
        setProcessedRecords(i + 1);
      }
      setQrCodes(codes);
    } catch (err) {
      setError('Error generating QR codes. Please check the file format.');
      console.error(err);
    } finally {
      setIsProcessing(false);
      setFileName(''); // Clear selected file name after processing
    }
  };

  useEffect(() => {
    if (qrCodes.length > 0) {
      drawQRCodesOnCanvas(canvasRef, qrCodes);
    }
  }, [qrCodes]);

  return (
    <QrLayout title="Upload CSV to Generate QR Codes">
      <div className="bg-white px-2">
        {/* File upload section */}
        <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
          <div className="md:flex">
            <div className="w-full p-3">
              <div className="relative border-dotted h-48 rounded-lg border-dashed border-2 border-blue-700 bg-gray-100 flex justify-center items-center">
                <div className="absolute">
                  <div className="flex flex-col items-center">
                    <i className="fa fa-folder-open fa-4x text-blue-700"></i>
                    <span className="block text-gray-400 font-normal">Attach your files here</span>
                    {fileName && (
                      <span className="text-gray-500 mt-2">
                        Selected file: {fileName}
                      </span>
                    )}
                  </div>
                </div>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="h-full w-full opacity-0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Generate QR code button and progress bar */}
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

      {qrCodes.length > 0 && (
        <div className="mt-4 flex flex-col items-center">
          {/* Scrollable container for vertical scrolling */}
          <div
            className="overflow-y-auto"
            style={{ width: '340px', height: '300px' }} // Set fixed width and max height for vertical scrolling
          >
            <canvas
              ref={canvasRef}
              className="border"
              style={{ width: '300px', height: 'auto', display: 'block' }} // Set width and allow auto height
            />
          </div>
          {/* Bulk Download Button */}
          <BulkDownloadQR qrCodes={qrCodes} />
        </div>
      )}
    </QrLayout>
  );
};

export default BulkQR;
