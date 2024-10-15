import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';

const QRCodeGeneration = ({
  csvData,
  selectedColumn,
  bgColor,
  primaryColor,
  secondaryColor,
  colorSplitOption,
  imageFile,
  setQrCodes,
}) => {
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const applyColorSplit = (ctx, width, height, imgData) => {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4; // Index for the pixel
        const isDark = imgData.data[index] === 0 && imgData.data[index + 1] === 0 && imgData.data[index + 2] === 0; // Dark pixel

        if (isDark) {
          let applyPrimaryColor = true;

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

  const generateQRCodeForRow = async (row) => {
    const qrData = row[selectedColumn];
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
    return qrCode;
  };

  useEffect(() => {
    const generateQRCodes = async () => {
      setIsProcessing(true);
      setProgress(0);
      setQrCodes([]);

      const codes = [];
      for (let i = 0; i < csvData.length; i++) {
        const row = csvData[i];
        const qrCode = await generateQRCodeForRow(row);
        codes.push({ qrCode, label: row[selectedColumn] });

        setProgress(Math.floor(((i + 1) / csvData.length) * 100));
      }

      setQrCodes(codes);
      setIsProcessing(false);
    };

    if (csvData.length > 0) {
      generateQRCodes();
    }
  }, [csvData, selectedColumn, bgColor, primaryColor, secondaryColor, colorSplitOption, imageFile, setQrCodes]);

  return (
    <div>
      {isProcessing && <p>Generating QR Codes: {progress}%</p>}
    </div>
  );
};

export default QRCodeGeneration;
