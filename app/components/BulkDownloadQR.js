import React from "react";
import { jsPDF } from "jspdf";

const BulkDownloadQR = ({ qrCodes }) => {
  // Compress the QR code to reduce file size if necessary (optional)
  const compressQRCode = (qrCode) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const img = new Image();
    return new Promise((resolve, reject) => {
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/jpeg", 0.7)); // Compress to 70% quality
      };
      img.src = qrCode;
    });
  };

  const downloadAndPrintPDF = async () => {
    if (qrCodes && qrCodes.length > 0) {
      const pdf = new jsPDF();
      const qrPerRow = 5; // 5 QR codes per row
      const qrPerColumn = 7; // 7 rows (QR codes) per page
      const qrPerPage = qrPerRow * qrPerColumn; // Total 35 QR codes per page
      const qrSize = 35; // QR code size in the PDF
      const margin = 5; // Space between QR codes
      let x = 7; // Initial x-coordinate
      let y = 7; // Initial y-coordinate
      let count = 0; // Counter for QR codes

      for (let i = 0; i < qrCodes.length; i++) {
        if (count === qrPerPage) {
          pdf.addPage(); // Add new page after 35 QR codes
          x = 7; // Reset x for new page
          y = 7; // Reset y for new page
          count = 0; // Reset count for new page
        }

        try {
          // Compress the QR code image
          const imgData = await compressQRCode(qrCodes[i]);
          pdf.addImage(imgData, "JPEG", x, y, qrSize, qrSize); // Add image to PDF

          count++;
          x += qrSize + margin; // Move x position to the right

          // Move to the next row if the current row is full
          if (count % qrPerRow === 0) {
            x = 7; // Reset x to start a new row
            y += qrSize + margin; // Move y down for the next row
          }
        } catch (err) {
          console.error("Failed to add QR code to PDF", err);
        }
      }

      // Save the PDF
      pdf.save("qr_codes.pdf");

      // Optionally, you can print the PDF directly in a new window
      const pdfBlob = pdf.output("blob");
      const pdfURL = URL.createObjectURL(pdfBlob);
      const printWindow = window.open(pdfURL);
      printWindow.onload = () => {
        printWindow.print();
      };
    } else {
      alert("No QR codes available for download.");
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
