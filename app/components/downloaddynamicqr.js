"use client";

import React from "react";
import { jsPDF } from "jspdf";

const DownloadDynamicQR = ({ canvasRef }) => {
  const downloadQRCode = (format) => {
    if (canvasRef.current) {
      const link = document.createElement("a");

      if (format === "png" || format === "jpeg") {
        const dataURL = canvasRef.current.toDataURL(`image/${format}`);
        link.href = dataURL;
        link.download = `qrcode.${format}`;
        link.click();
      } else if (format === "pdf") {
        const pdf = new jsPDF();
        const imgData = canvasRef.current.toDataURL("image/png");
        pdf.addImage(imgData, "PNG", 10, 10, 190, 190); // Adjust the size as needed
        pdf.save("qrcode.pdf");
      }
    } else {
      alert("QR Code is not available for download.");
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={() => downloadQRCode("png")}
        className="mr-2 py-1 px-2 bg-green-500 text-white rounded"
      >
        Download PNG
      </button>
      <button
        onClick={() => downloadQRCode("jpeg")}
        className="mr-2 py-1 px-2 bg-yellow-500 text-white rounded"
      >
        Download JPEG
      </button>
      <button
        onClick={() => downloadQRCode("pdf")}
        className="py-1 px-2 bg-red-500 text-white rounded"
      >
        Download PDF
      </button>
    </div>
  );
};

export default DownloadDynamicQR;
