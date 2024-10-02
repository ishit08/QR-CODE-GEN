// app/components/BulkDownloadQR.js
"use client";

import React from "react";
import { jsPDF } from "jspdf";

const BulkDownloadQR = ({ canvasRefs }) => {
  const downloadQRCode = (format) => {
    if (canvasRefs && canvasRefs.length > 0) {
      canvasRefs.forEach((canvasRef, index) => {
        if (canvasRef.current) {
          const link = document.createElement("a");

          if (format === "png" || format === "jpeg") {
            const dataURL = canvasRef.current.toDataURL(`image/${format}`);
            link.href = dataURL;
            link.download = `qrcode_${index + 1}.${format}`;
            link.click();
          } else if (format === "pdf") {
            const pdf = new jsPDF();
            const imgData = canvasRef.current.toDataURL("image/png");
            pdf.addImage(imgData, "PNG", 10, 10, 190, 190);
            pdf.save(`qrcode_${index + 1}.pdf`);
          }
        } else {
          alert(`QR Code at index ${index} is not available for download.`);
        }
      });
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

export default BulkDownloadQR;
