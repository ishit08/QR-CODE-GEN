import QRCode from 'qrcode';
import QRCodeStyling from "qr-code-styling";

// Function to generate QR code canvas using the `qrcode` library
export const GenerateQRNative = (text, options) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    QRCode.toCanvas(canvas, text, options, (error) => {
      if (error) {
        reject(error);
      } else {
        // Call the styling function after the QR code is generated
        applyQRStyle(canvas, options.qrStyle, options.primaryColor, options.secondaryColor, options.thirdColor, options.fourthColor);
        resolve(canvas);
      }
    });
  });
};

// Function to generate QR code using qr-code-styling library
export const GenerateQRStyle = (options) => {
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
      color: options.cornersSquareOptions?.color || options.dotsOptions?.color || "#000000",
      type: options.cornersSquareOptions?.type || "square", // Default type if not provided
    },
    cornersDotOptions: {
      color: options.cornersDotOptions?.color || options.dotsOptions?.color || "#000000",
      type: options.cornersDotOptions?.type || "square", // Default type if not provided
    },
    image: options.image || null, // Ensure image is handled
  });

  return qrCode;
};

// Function to modify the QR code style (color manipulation)
export const applyQRStyle = (canvas, qrStyle, primaryColor, secondaryColor, thirdColor, fourthColor) => {
  const context = canvas.getContext("2d");
  const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const index = (y * canvas.width + x) * 4;
      const isDark = imgData.data[index] === 0;

      if (isDark) {
        switch (qrStyle) {
          case "horizontal":
            if (y < canvas.height / 2) {
              applyColor(data, index, primaryColor);
            } else {
              applyColor(data, index, secondaryColor);
            }
            break;
          case "vertical":
            if (x < canvas.width / 2) {
              applyColor(data, index, primaryColor);
            } else {
              applyColor(data, index, secondaryColor);
            }
            break;
          case "diagonal":
            if (x + y < canvas.width) {
              applyColor(data, index, primaryColor);
            } else {
              applyColor(data, index, secondaryColor);
            }
            break;
          case "quad":
            if (x < canvas.width / 2 && y < canvas.height / 2) {
              applyColor(data, index, primaryColor);
            } else if (x >= canvas.width / 2 && y < canvas.height / 2) {
              applyColor(data, index, secondaryColor);
            } else if (x < canvas.width / 2 && y >= canvas.height / 2) {
              applyColor(data, index, thirdColor);
            } else {
              applyColor(data, index, fourthColor);
            }
            break;
          default:
            break;
        }
      }
    }
  }

  context.putImageData(imgData, 0, 0);
};

// Helper function to apply color to QR code pixels
const applyColor = (data, index, color) => {
  data[index] = parseInt(color.slice(1, 3), 16);   // R
  data[index + 1] = parseInt(color.slice(3, 5), 16); // G
  data[index + 2] = parseInt(color.slice(5, 7), 16); // B
};
