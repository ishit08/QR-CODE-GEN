import QRCodeStyling from "qr-code-styling";

const QRUtils = {
  createQRCode: (options) => {
    const qrCode = new QRCodeStyling({
      width: options.width,
      height: options.height,
      data: options.data,
      dotsOptions: {
        color: options.dotsOptions?.color || "#000000", // Default color if not provided
        type: options.dotsOptions?.type || "square", // Default type if not provided
      },
      backgroundOptions: {
        color: options.backgroundOptions?.color || "#ffffff", // Default background color
      },
      cornersSquareOptions: {
        color: options.cornersSquareOptions?.color || options.dotsOptions?.color || "#000000", // Default if not provided
        type: options.cornersSquareOptions?.type || "square", // Default type if not provided
      },
      cornersDotOptions: {
        color: options.cornersDotOptions?.color || options.dotsOptions?.color || "#000000", // Default if not provided
        type: options.cornersDotOptions?.type || "square", // Default type if not provided
      },
      image: options.image || null, // Ensure image is handled
    });

    return qrCode;
  },
};

export default QRUtils;
