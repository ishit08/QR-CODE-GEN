// components/qrcode/BasicNative.js
import React from 'react';
import QRLayout from '../common/QRLayout'; // Adjust path as necessary
import { generateQRCodeCanvas, applyQRStyle } from '../../../utility/qr/comman/qrUtils'; // Adjust path as necessary

const BasicNative = ({ text, qrStyle, colors, size, setQrCode }) => {
  const generateQRCode = async () => {
    const qrCodeElement = document.getElementById("qrcode");
    qrCodeElement.innerHTML = "";

    if (text) {
      const options = {
        errorCorrectionLevel: "H",
        margin: 1,
        scale: 8,
        color: {
          dark: colors.dark,
          light: colors.light,
        },
      };

      try {
        const canvas = await generateQRCodeCanvas(text, options);
        qrCodeElement.appendChild(canvas);
        setQrCode(canvas); // Assuming qrCode is the canvas

        if (qrStyle !== "none") {
          applyQRStyle(canvas, qrStyle, colors.dark, colors.light, "#ff0000", "#0000ff"); // Example colors
        }
      } catch (error) {
        console.error("QR Code generation error:", error);
      }
    } else {
      alert("Please enter some text or URL to generate the QR code.");
    }
  };

  return (
    <QRLayout
      title="Create QR Code"
      onPrint={() => console.log("Print")} // Replace with actual print function
      onDownload={() => console.log("Download")} // Replace with actual download function
      hasQRCodes={!!setQrCode}
      onGenerate={generateQRCode}
      onReset={() => setQrCode(null)} // Implement reset logic
    >
      <div id="qrcode" className="flex justify-center items-center h-full"></div>
    </QRLayout>
  );
};

export default BasicNative;
