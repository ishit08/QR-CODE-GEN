export const drawQRCodesOnCanvas = (canvasRef, qrCodes) => {
  if (!canvasRef || !canvasRef.current) {
    console.error("Canvas reference is not defined");
    return; // Early return if canvasRef is not valid
  }
  
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  
  // Proceed with the rest of your drawing logic...
  const a4Width = 2480; // A4 width at 300 DPI
  const a4Height = 3508; // A4 height at 300 DPI
  const qrSize = 400; // Size of each QR code
  const padding = 20; // Padding between QR codes
  const cols = Math.floor(a4Width / (qrSize + padding));
  const rows = Math.ceil(qrCodes.length / cols);

  canvas.width = a4Width;
  canvas.height = a4Height * Math.ceil(rows / (Math.floor(a4Height / (qrSize + padding))));

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

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