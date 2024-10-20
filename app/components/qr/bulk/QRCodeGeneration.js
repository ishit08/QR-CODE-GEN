import React, { useState, useEffect, useCallback } from 'react';
import QRCode from 'qrcode';

const QRCodeGeneration = ({
  csvData,
  selectedColumn,
  bgColor,
  primaryColor, 
  colorSplitOption,
  imageFile,
  setQrCodes,
}) => {
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const generateQRCodeForRow = useCallback(async (row) => {
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
  }, [selectedColumn, primaryColor, bgColor, colorSplitOption, imageFile]);

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
  }, [csvData, generateQRCodeForRow, setQrCodes, selectedColumn]);

  return (
    <div>
      {isProcessing && <p>Generating QR Codes: {progress}%</p>}
    </div>
  );
};

export default QRCodeGeneration;
