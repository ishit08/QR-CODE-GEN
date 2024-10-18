import jsPDF from "jspdf"; // Import jsPDF library

export const downloadQRCode = (format, canvasRef) => {
  if (!canvasRef) {
    alert("QR code not available for download.");
    return;
  }

  const link = document.createElement("a");
  if (format === "png") {
    link.href = canvasRef.toDataURL("image/png");
    link.download = "qrcode.png";
  } else if (format === "jpeg") {
    link.href = canvasRef.toDataURL("image/jpeg");
    link.download = "qrcode.jpeg";
  } else if (format === "pdf") {
    const pdf = new jsPDF();
    const imgData = canvasRef.toDataURL("image/jpeg");
    pdf.addImage(imgData, "JPEG", 10, 10, 80, 80); // Adjust positioning and size as needed
    pdf.save("qrcode.pdf");
  }

  link.click();
};
