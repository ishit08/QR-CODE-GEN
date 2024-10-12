// BulkDownloadQR.js

import React, { useEffect } from "react";
import { jsPDF } from "jspdf";

const BulkDownloadQR = ({ qrCodes }) => {
  console.log('BulkDownloadQR component is rendering');
  console.log('BulkDownloadQR received qrCodes:', qrCodes);

  useEffect(() => {
    if (!Array.isArray(qrCodes)) {
      console.error('qrCodes is not an array:', qrCodes);
    } else {
      console.log('qrCodes array length:', qrCodes.length);
    }
  }, [qrCodes]);

  if (!qrCodes || qrCodes.length === 0) {
    console.error('No QR codes to display in BulkDownloadQR');
    return null;
  }

  const compressQRCode = (qrCode) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const img = new Image();

    return new Promise((resolve) => {
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7); // Compress to 70% quality
        console.log("Compressed QR Code:", compressedDataUrl);
        resolve(compressedDataUrl);
      };
      img.src = qrCode;
    });
  };

  const downloadAndPrintPDF = async () => {
    try {
      if (qrCodes && qrCodes.length > 0) {
        const pdf = new jsPDF("p", "pt", "a4");
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const qrPerRow = 3;
        const qrPerColumn = 7;
        const qrPerPage = qrPerRow * qrPerColumn;
        const qrSize = 100;
        const labelHeight = 20; // Height for label text
        const marginX = (pageWidth - qrPerRow * qrSize) / (qrPerRow + 1);
        const marginY = 20;

        let x = marginX;
        let y = marginY;
        let count = 0;

        for (let i = 0; i < qrCodes.length; i++) {
          if (count === qrPerPage) {
            pdf.addPage();
            x = marginX;
            y = marginY;
            count = 0;
          }

          try {
            console.log("Adding QR Code and Label to PDF:", qrCodes[i]);

            const imgData = await compressQRCode(qrCodes[i].qrCode);
            pdf.addImage(imgData, "JPEG", x, y, qrSize, qrSize);

            // Add the label text below the QR code
            pdf.text(
              qrCodes[i].label || `QR Code ${i + 1}`,
              x + qrSize / 2,
              y + qrSize + labelHeight,
              { align: "center" }
            );

            count++;
            x += qrSize + marginX;

            if (count % qrPerRow === 0) {
              x = marginX;
              y += qrSize + marginY + labelHeight; // Include space for label
            }
          } catch (error) {
            console.error("Failed to add QR code and label to PDF:", error);
          }
        }

        console.log("Saving PDF...");
        pdf.save("qr_codes.pdf");

        // Optional: Open PDF in a new window for printing
        const pdfBlob = pdf.output("blob");
        const pdfURL = URL.createObjectURL(pdfBlob);
        const printWindow = window.open(pdfURL);
        printWindow.onload = () => {
          printWindow.print();
        };
      } else {
        alert("No QR codes available for download.");
        console.error("No QR codes to download.");
      }
    } catch (error) {
      console.error('Error in downloadAndPrintPDF:', error);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={downloadAndPrintPDF}
        className="py-1 px-2 bg-red-500 text-white rounded"
      >
        Download and Print PDF
      </button>
    </div>
  );
};

export default BulkDownloadQR;
