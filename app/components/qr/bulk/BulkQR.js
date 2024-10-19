import { useState, useEffect, useRef } from 'react';
//import Papa from 'papaparse';
import QRCode from 'qrcode';
import FileUpload from '../FileUpload';
import ColumnSelection from '../ColumnSelection';
import ImageUpload from '../ImageUpload';
import QRColorSelection from '../QRColorSelection';
import QRCodeTable from '../QRCodeTable';
import QrLayout from '../QrLayout';
import { downloadQRCodePDF } from '../../../utility/qr/bulk/downloadQRCodePDF';
import { printQRCodePDF } from '../../../utility/qr/bulk/printQRCodePDF';
 
const BulkQR = () => {
  const [csvData, setCsvData] = useState([]);
  const [qrCodes, setQrCodes] = useState([]);
  //const [fileName, setFileName] = useState('');
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedRecords, setProcessedRecords] = useState(0);
  const [error, setError] = useState('');
  const [selectedColumn, setSelectedColumn] = useState(''); 
  const [imageFile, setImageFile] = useState(null);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [primaryColor, setPrimaryColor] = useState("#000000");  // Primary color
  const [secondaryColor, setSecondaryColor] = useState("#FF0000"); // Secondary color
  const [colorSplitOption, setColorSplitOption] = useState(''); 
  const [showSecondaryColor, setShowSecondaryColor] = useState(false); // Controls secondary color visibility
  const [allQRCodesReady, setAllQRCodesReady] = useState(false);
 
  const hasLoggedRef = useRef(false);
 
  const handlePrint = (settings) => {
    if (qrCodes && qrCodes.length > 0) {
      printQRCodePDF(qrCodes, settings);
    } else {
      alert('No QR codes available for printing.');
    }
  };
 
  const handleDownload = (settings) => {
    if (qrCodes && qrCodes.length > 0) {
      downloadQRCodePDF(qrCodes, settings);
    } else {
      alert('No QR codes available for download.');
    }
  };

  useEffect(() => {
    if (qrCodes.length > 0) {
      setAllQRCodesReady(true);
    } else {
      setAllQRCodesReady(false);
      hasLoggedRef.current = false; 
    }
  }, [qrCodes.length]);

  useEffect(() => {
    if (allQRCodesReady && !hasLoggedRef.current) {
      hasLoggedRef.current = true;
    }
  }, [allQRCodesReady, qrCodes]);

  const filterQrColumns = (row) => {
    return Object.entries(row)
      .filter(([key]) => key.split('-')[2] === 'Y') 
      .map(([key, value]) => `${key.split('-')[0]}: ${value}`) 
      .join(', ');
  };

  const generateLabel = (row) => {
    const value = row[selectedColumn];
    const label = selectedColumn.split('-')[0] + '|' + value;   
    return label;
  };

  const applyColorSplit = (ctx, width, height, imgData) => {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4; // Index for the pixel
        const isDark = imgData.data[index] === 0 && imgData.data[index + 1] === 0 && imgData.data[index + 2] === 0; // Dark pixel

        if (isDark) {
          let applyPrimaryColor = true;
          console.log(colorSplitOption);
          // Split color logic based on selected option
          switch (colorSplitOption) {
         
            case 'vertical':
              applyPrimaryColor = x < width / 2;
              break;
            case 'horizontal':
              applyPrimaryColor = y < height / 2;
              break;
            case 'diagonal-lr':
              applyPrimaryColor = x + y < width;
              break;
            case 'diagonal-rl':
              applyPrimaryColor = x + y > width;
              break;
            default:
              applyPrimaryColor = true; // Default: apply primary color
              break;
          }

          // Apply primary or secondary color depending on split logic
          if (applyPrimaryColor) {
            imgData.data[index] = parseInt(primaryColor.substring(1, 3), 16); 
            imgData.data[index + 1] = parseInt(primaryColor.substring(3, 5), 16); 
            imgData.data[index + 2] = parseInt(primaryColor.substring(5, 7), 16);
          } else {
            imgData.data[index] = parseInt(secondaryColor.substring(1, 3), 16);
            imgData.data[index + 1] = parseInt(secondaryColor.substring(3, 5), 16);
            imgData.data[index + 2] = parseInt(secondaryColor.substring(5, 7), 16);
          }
        }
      }
    }
    ctx.putImageData(imgData, 0, 0); // Draw the image data back onto the canvas
  };

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
    hasLoggedRef.current = false;

    try {
      const codes = [];     
      for (let i = 0; i < csvData.length; i++) {      
        const row = csvData[i];      
        const qrData = filterQrColumns(row);
        if (!qrData) continue;

        const qrCodeCanvas = document.createElement('canvas');
        await QRCode.toCanvas(qrCodeCanvas, qrData, { width: 300, color: { dark: primaryColor, light: bgColor } });

        const ctx = qrCodeCanvas.getContext('2d');
        const { width, height } = qrCodeCanvas;
        const imgData = ctx.getImageData(0, 0, width, height);

        // Apply color split only if an option is selected
        if (colorSplitOption) {
          applyColorSplit(ctx, width, height, imgData); 
        }

        if (imageFile) {
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
        const label = generateLabel(row);      
       
        codes.push({ qrCode, label });
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

  const handleColorSplitOptionChange = (option) => {
    setColorSplitOption(option);
    if (option) {
      setShowSecondaryColor(true);
    } else {
      setShowSecondaryColor(false); // Hide secondary color if 'None' is selected
    }
  };

  return (
    <QrLayout
      title="Upload CSV to Generate QR Codes"
      onPrint={handlePrint}
      onDownload={handleDownload}
      hasQRCodes={allQRCodesReady}
    
    >
      <div className="bg-white px-2">
        <FileUpload setCsvData={setCsvData} setFileName={setFileName} />
        <ColumnSelection
          csvData={csvData}
          selectedColumn={selectedColumn}
          setSelectedColumn={setSelectedColumn}
         
        />
        <div>
          <ImageUpload setImageFile={setImageFile} />
        </div>

        <div className="mt-4">
          <QRColorSelection
            bgColor={bgColor}
            setBgColor={setBgColor}
            qrColor={primaryColor}
            setQRColor={setPrimaryColor}
            label="Choose Primary Color"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm">Choose a color split pattern:</label>
          <select
            value={colorSplitOption}
            onChange={(e) => handleColorSplitOptionChange(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">None</option>
            <option value="vertical">Vertical Split</option>
            <option value="horizontal">Horizontal Split</option>
            <option value="diagonal-lr">Diagonal Split (Left-Right)</option>
            <option value="diagonal-rl">Diagonal Split (Right-Left)</option>
          </select>
        </div>

        {/* Show secondary color picker based on selection */}
        {showSecondaryColor && (
          <QRColorSelection
            bgColor={bgColor}
            setBgColor={setBgColor}
            qrColor={secondaryColor}
            setQRColor={setSecondaryColor}
            label="Choose Secondary Color"
          />
        )}

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

      <div>
        <QRCodeTable qrCodes={qrCodes} />
      </div>
    </QrLayout>
  );
};
 
export default BulkQR;