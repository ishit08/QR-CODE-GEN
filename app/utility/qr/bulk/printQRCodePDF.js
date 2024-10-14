// this is for bulk print

import { jsPDF } from "jspdf";
import { compressQRCode } from "../compressQRCode";
import { kokila } from '../../../utility/font/kokila';  // Base64 font file
 
export const printQRCodePDF = async (qrCodes, settings) => {
  const { qrPerRow, qrPerPage } = settings;  // qrPerPage is now passed as a setting

  try {
    if (qrCodes && qrCodes.length > 0) {
      const pdf = new jsPDF("p", "pt", "a4");

   pdf.addFileToVFS("Kokila.ttf", kokila); // Add your Base64 font
   pdf.addFont("Kokila.ttf", "Kokila", "normal");
  pdf.setFont("Kokila");     

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const margin = 10; // Adjust margin for equal spacing on all sides
      const availableWidth = pageWidth - margin * 2;
      const availableHeight = pageHeight - margin * 2;

      const qrSize = (availableWidth - (qrPerRow - 1) * margin) / qrPerRow;
      const baseLabelHeight = qrSize * 0.2; // Default label height

      // Dynamically calculate the QR cell height depending on the number of lines in the label
      const qrPlusLabelHeight = qrSize + baseLabelHeight + margin;

      // Increase the height by 5px if 4 or 5 QR codes per row
      const increasedCellHeight = (qrPerRow > 3) ? qrPlusLabelHeight + 5 : qrPlusLabelHeight;

      const qrPerColumn = Math.floor((availableHeight + margin) / increasedCellHeight);  // Adjust based on dynamic cell height
      const qrPerPageLimit = qrPerRow * qrPerColumn;

      let x = margin;
      let y = margin;
      let count = 0;

      for (let i = 0; i < qrCodes.length; i++) {
        if (count === qrPerPageLimit) {
          pdf.addPage();
          x = margin;
          y = margin;
          count = 0;
        }

        try {
          const imgData = await compressQRCode(qrCodes[i].qrCode);
          pdf.addImage(imgData, "JPEG", x, y, qrSize, qrSize);

          // Draw borders around the QR code cell
          pdf.setDrawColor(0); // Black border
          pdf.setLineWidth(0.5);

          // Calculate the label height based on the number of lines in the label
          const labelText = qrCodes[i].label || `QR Code ${i + 1}`;
          let labelLines;
          
          // Split the label into lines if it's multiline
          if (labelText.includes('|')) {
            labelLines = labelText.split('|');
          } else {
            labelLines = pdf.splitTextToSize(labelText, qrSize - 4); // Split text if it's too long
          }

          // Dynamically adjust the cell height based on the number of lines in the label
          const labelHeight = labelLines.length * (qrSize * 0.1 + 1); // Extra height for each line of text

          // Add the QR code and the label inside the cell, adjusting the height
          pdf.rect(x, y, qrSize, qrSize + labelHeight);

          pdf.setFontSize(qrSize * 0.1); // Adjust font size based on QR size

          // Add the label text below the QR code, taking into account multiline labels
          let labelY = y + qrSize + 10;  // Increased gap of 8pt between QR code and label
          labelLines.forEach((line, index) => {
            pdf.text(
              line,
              x + qrSize / 2,
              labelY + index * (qrSize * 0.1 + 2), // Dynamic gap between lines
              { align: "center" }
            );
          });

          count++;
          x += qrSize + margin;

          if (count % qrPerRow === 0) {
            x = margin;
            y += increasedCellHeight + margin;  // Adjust Y-position based on dynamic label height
          }
        } catch (error) {
          console.error("Failed to add QR code and label to PDF:", error);
        }
      }

      console.log("Opening print dialog...");
      const pdfBlob = pdf.output("blob");
      const pdfURL = URL.createObjectURL(pdfBlob);
      const printWindow = window.open(pdfURL);

      if (printWindow) {
        printWindow.onload = () => {
          printWindow.print();
        };
      } else {
        alert("Pop-up blocked. Please allow pop-ups for this website to print.");
        console.error("Unable to open print window.");
      }
    } else {
      alert("No QR codes available for printing.");
      console.error("No QR codes to print.");
    }
  } catch (error) {
    console.error("Error in printQRCodePDF:", error);
  }
};
