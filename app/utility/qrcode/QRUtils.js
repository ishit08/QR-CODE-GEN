import QRCode from 'qrcode';
import QRCodeStyling from "qr-code-styling";

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
    imageOptions: options.imageOptions,
  });
  return qrCode;
};
// Function to generate QR code canvas using the `qrcode` library
export const GenerateQRNative = (text, options) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    // Map the colors as per your provided options structure
    const qrOptions = {
      width: options.width,
      height: options.height,
      errorCorrectionLevel: options.errorCorrectionLevel,
      margin: options.margin,
      scale: options.scale,
      primaryColor: options.color.dark,            // QR (dark) color
      backgroundColor: options.color.light,        // Background color
      secondaryColor: options.secondaryColor,      // Secondary color for styling
      thirdColor: options.thirdColor,              // Third color for quad style
      fourthColor: options.fourthColor,            // Fourth color for quad style
      qrStyle: options.qrStyle,                    // QR style to apply
    };
   
    QRCode.toCanvas(canvas, text, qrOptions, (error) => {
      if (error) {
        reject(error);
      } else {
        // Apply style if qrStyle is specified
        if (qrOptions.qrStyle && qrOptions.qrStyle !== 'none') {        
          applyQRStyle(canvas, qrOptions.qrStyle, qrOptions.primaryColor, qrOptions.backgroundColor, qrOptions.secondaryColor, qrOptions.thirdColor, qrOptions.fourthColor);
        }
        resolve(canvas);
      }
    });
  });
};

// Function to apply styles to the QR code
export const applyQRStyle = (canvas, qrStyle, primaryColor, backgroundColor, secondaryColor, thirdColor, fourthColor) => {
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
            applyColor(data, index, primaryColor);
            break;
        }
      }
    }
  }

  context.putImageData(imgData, 0, 0);
};

const applyColor = (data, index, color) => {
  // Check if color is defined and in hex format
  if (color && color.startsWith('#') && color.length === 7) {
    data[index] = parseInt(color.slice(1, 3), 16);   // R
    data[index + 1] = parseInt(color.slice(3, 5), 16); // G
    data[index + 2] = parseInt(color.slice(5, 7), 16); // B
  } else {
    console.error("Invalid color value:", color);
  }
};
