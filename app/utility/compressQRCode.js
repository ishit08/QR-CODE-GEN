// compressQRCode.js

export const compressQRCode = (qrCode) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const img = new Image();

  return new Promise((resolve, reject) => {
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);
      const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7); // Compress to 70% quality
      resolve(compressedDataUrl);
    };
    img.onerror = (error) => {
      reject(new Error(`Failed to load image: ${error}`));
    };
    img.src = qrCode;
  });
};
