// downloadQRCodePDF.js

import { jsPDF } from "jspdf";
import { compressQRCode } from "./compressQRCode"; // Updated import path

export const downloadQRCodePDF = async (qrCodes) => {
  try {
    if (qrCodes && qrCodes.length > 0) {
      const pdf = new jsPDF("p", "pt", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const qrPerRow = 3;
      const qrSize = 100;
      const labelHeight = 20;
      const marginX = (pageWidth - qrPerRow * qrSize) / (qrPerRow + 1);
      const marginY = 20;
      let x = marginX;
      let y = marginY;
      let count = 0;

      for (let i = 0; i < qrCodes.length; i++) {
        if (count === qrPerRow * 7) {
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
            y += qrSize + marginY + labelHeight;
          }
        } catch (error) {
          console.error("Failed to add QR code and label to PDF:", error);
        }
      }

      console.log("Saving PDF...");
      pdf.save("qr_codes.pdf");
    } else {
      alert("No QR codes available for download.");
      console.error("No QR codes to download.");
    }
  } catch (error) {
    console.error("Error in downloadQRCodePDF:", error);
  }
};
