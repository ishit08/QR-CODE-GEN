import { useState, useRef, useEffect } from 'react';
import Papa from 'papaparse';
import QRCode from 'qrcode';
import BulkDownloadQR from "./BulkDownloadQR";
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
          setSelectedColumn('');
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
      console.error(err);
    } finally {
      setIsProcessing(false);
      setFileName(''); // Clear selected file name after processing
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

        {/* Column selection */}
        {csvData.length > 0 && (
          <div className="mt-4">
            <label htmlFor="columnSelect">Select Column to Generate QR Codes:</label>
            <select
              id="columnSelect"
              value={selectedColumn}
              onChange={(e) => setSelectedColumn(e.target.value)}
              className="ml-2 p-2 border rounded"
            >
              <option value="">--Select Column--</option>
              {Object.keys(csvData[0]).map((column, index) => (
                <option key={index} value={column}>{column}</option>
              ))}
            </select>
          </div>
        )}

        {/* Image upload section */}
        <div className="mt-4">
          <label htmlFor="imageUpload">Upload an Image to Add to QR Codes (optional):</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="ml-2 p-2 border rounded"
          />
        </div>

        {/* Color selection */}
        <div className="mt-4 flex gap-4">
          <div>
            <label>Background Color</label>
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="ml-2" />
          </div>
          <div>
            <label>Text Color</label>
            <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="ml-2" />
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
        <div className="mt-4 overflow-y-auto" style={{ maxHeight: '500px' }}>
          <table className="table-auto border-collapse border border-black w-full">
            <tbody>
              {qrCodes.map((code, index) => (
                index % 3 === 0 ? (
                  <tr key={index} className="border border-black">
                    {qrCodes.slice(index, index + 3).map((innerCode, innerIndex) => (
                      <td key={innerIndex} className="border border-black p-4 text-center">
                        <img src={innerCode.qrCode} alt={`QR Code ${index + innerIndex + 1}`} className="border mb-2" />
                        <span className="text-center text-sm font-bold">{innerCode.label}</span>
                      </td>
                    ))}
                  </tr>
                ) : null
              ))}
            </tbody>
          </table>
        </div>
      )}

      {qrCodes.length > 0 && (
        <div className="mt-4 flex justify-center">
          <BulkDownloadQR qrCodes={qrCodes.map(code => code.qrCode)} />
        </div>
      )}
    </QrLayout>
  );
};

export default BulkQR;