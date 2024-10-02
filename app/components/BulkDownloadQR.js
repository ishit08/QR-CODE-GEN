// app/components/BulkDownloadQR.js
"use client";
import React from "react";
import { jsPDF } from "jspdf";
const BulkDownloadQR = ({ canvasRef, qrCodes }) => {
  const downloadQRCode = (format) => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;

      if (format === "png" || format === "jpeg") {
        const dataURL = canvas.toDataURL(`image/${format}`);
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = `qr_codes.${format}`;
        link.click();
      } else if (format === "pdf") {
        const pdf = new jsPDF();
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = 190; // Adjust the width of the image in the PDF
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

        // Add image to the PDF
        pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
        pdf.save(`qr_codes.pdf`);
      }
    } else {
      alert("No QR codes available for download.");
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={() => downloadQRCode("png")}
        className="mr-2 py-1 px-2 bg-green-500 text-white rounded"
      >
        Download All as PNG
      </button>
      <button
        onClick={() => downloadQRCode("jpeg")}
        className="mr-2 py-1 px-2 bg-yellow-500 text-white rounded"
      >
        Download All as JPEG
      </button>
      <button
        onClick={() => downloadQRCode("pdf")}
        className="py-1 px-2 bg-red-500 text-white rounded"
      >
        Download All as PDF
      </button>
    </div>
  );
};

export default BulkDownloadQR;