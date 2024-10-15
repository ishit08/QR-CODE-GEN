// this is for bulk

import { jsPDF } from "jspdf"; 
import { compressQRCode } from "../compressQRCode";
import { kokila } from '../../font/kokila';  // Base64 font file
//import { notoSansDevanagariBase64 } from './NotoSansDevanagari-Regular'; 
export const downloadQRCodePDF = async (qrCodes, settings) => {
  const { qrPerRow } = settings;

  try {
    if (qrCodes && qrCodes.length > 0) {
      const pdf = new jsPDF("p", "pt", "a4");

           // Add the Unicode font
     pdf.addFileToVFS("Kokila.ttf", kokila); // Add your Base64 font
     pdf.addFont("Kokila.ttf", "Kokila", "normal");
     pdf.setFont("Kokila");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const margin = 10;
      const availableWidth = pageWidth - margin * 2;
      const availableHeight = pageHeight - margin * 2;

      const qrSize = (availableWidth - (qrPerRow - 1) * margin) / qrPerRow;
      const baseLabelHeight = qrSize * 0.2;  // Initial label height for a single line

      // Dynamically calculate the height of the QR cell based on the label lines
      const qrPlusLabelHeight = qrSize + baseLabelHeight + margin;
      const qrPerColumn = Math.floor((availableHeight + margin) / qrPlusLabelHeight);
      const qrPerPage = qrPerRow * qrPerColumn;

      let x = margin;
      let y = margin;
      let count = 0;

      for (let i = 0; i < qrCodes.length; i++) {
        if (count === qrPerPage) {
          pdf.addPage();
          x = margin;
          y = margin;
          count = 0;
        }

        try {
          const imgData = await compressQRCode(qrCodes[i].qrCode);
          pdf.addImage(imgData, "JPEG", x, y, qrSize, qrSize);

          // Add cell borders
          pdf.setDrawColor(0);
          pdf.setLineWidth(0.5);

          // Get label text, split into multiple lines if needed
          const labelText = qrCodes[i].label || `QR Code ${i + 1}`;
          let labelLines;

          if (labelText.includes('|')) {
            // Split label into multiple lines if '|' is present
            labelLines = labelText.split('|');
          } else {
            // Automatically split text into multiple lines based on width
            labelLines = pdf.splitTextToSize(labelText, qrSize - 4);
          }

          // Dynamically calculate the label height based on the number of lines
          const dynamicLabelHeight = labelLines.length * (qrSize * 0.1 + 2); // Adjusted spacing between lines

          // Adjust label Y-position to fit the content and remove extra spacing
          let labelY = y + qrSize + 8;  // Added gap of 8pt between QR and label

          // Increase the height of the label cell to accommodate multiple lines
          pdf.rect(x, y, qrSize, qrSize + dynamicLabelHeight); // Updated height for the label cell

          // Render each line of the label text
          labelLines.forEach((line, index) => {
            pdf.text(
              line,
              x + qrSize / 2,
              labelY + index * (qrSize * 0.1 + 1), // Reduced gap between lines
              { align: "center" }
            );
          });

          count++;
          x += qrSize + margin;

          if (count % qrPerRow === 0) {
            x = margin;
            y += qrSize + dynamicLabelHeight + margin; // Adjust Y-position with new dynamic label height
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