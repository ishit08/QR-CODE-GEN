export const drawQRCodesOnCanvas = (canvasRef, qrCodes) => {
  if (!canvasRef || !canvasRef.current) {
    console.error("Canvas reference is not defined");
    return; // Early return if canvasRef is not valid
  }

  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');

  const a4Width = 2480; // A4 width at 300 DPI
 // const a4Height = 3508; // A4 height at 300 DPI
  const qrSize = 400; // Size of each QR code
  const padding = 20; // Padding between QR codes
  const cols = Math.floor(a4Width / (qrSize + padding)); // Calculate columns

  // Calculate rows needed based on QR code count
  const rows = Math.ceil(qrCodes.length / cols);
  
// Calculate the canvas width and height based on the number of rows and columns
  const requiredWidth = cols * (qrSize + padding) + padding; // Adjust canvas width dynamically
  const requiredHeight = rows * (qrSize + padding) + padding; // Adjust canvas height dynamically
  
  // Set canvas width and height dynamically based on content
  canvas.width = requiredWidth;
  canvas.height = requiredHeight;
  // Clear the canvas
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw each QR code on the canvas
  qrCodes.forEach((qrCode, index) => {
    const img = new Image();
    img.onload = () => {
      const x = (index % cols) * (qrSize + padding) + padding / 2;
      const y = Math.floor(index / cols) * (qrSize + padding) + padding / 2;
      ctx.drawImage(img, x, y, qrSize, qrSize);
    };
    img.src = qrCode;
  });
};
