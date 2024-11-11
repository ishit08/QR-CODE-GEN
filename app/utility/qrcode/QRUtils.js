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
    const qrCanvas = document.createElement("canvas");
    console.log("Generated QR Canvas element:", qrCanvas);

    // Map the colors as per your provided options structure
    const qrOptions = {
      width: options.width,
      color: { dark: options.color.dark, light: options.color.light },     // Background color
      errorCorrectionLevel: options.errorCorrectionLevel,
      margin: options.margin,
      scale: options.scale 
    };
    
    console.log("QR Options:", qrOptions);
    
    QRCode.toCanvas(qrCanvas, text, qrOptions, (error) => {
      if (error) {
        console.error("Error generating QR code:", error);
        reject(error);
      } else {
        console.log("QR Code generated successfully on canvas:", qrCanvas);

        // Apply style if qrStyle is specified
        if (options.qrStyle && options.qrStyle !== 'none') {        
          console.log("Applying QR Style:", options.qrStyle);
          applyQRStyle(qrCanvas, options.qrStyle, options.color.dark, options.secondaryColor, options.thirdColor, options.fourthColor);
        }

        // Now, create a new canvas that will contain both the QR code and the label
        const finalCanvas = document.createElement("canvas");
        console.log("Generated Final Canvas element:", finalCanvas);

        const qrWidth = qrCanvas.width;
        const qrHeight = qrCanvas.height;
        const labelHeight = options.orgText ? options.fontSize * 2 : 0; // Adjust label height based on font size
        const totalHeight = qrHeight + labelHeight + 20; // Add some extra margin

        finalCanvas.width = qrWidth;
        finalCanvas.height = totalHeight;

        const ctx = finalCanvas.getContext("2d");

        // Draw the QR code onto the final canvas
        ctx.drawImage(qrCanvas, 0, 0);
        console.log("QR Code drawn on final canvas");

        // If an image is provided, overlay it onto the QR code
        if (options.image) {
          const img = new Image();
          img.src = options.image; // options.image should be a data URL

          img.onload = function () {
            console.log("Image loaded successfully for overlay:", img);
            const scaleFactor = 0.2; // Adjust as needed
            const imgWidth = qrWidth * scaleFactor;
            const imgHeight = qrHeight * scaleFactor;
            const x = (qrWidth - imgWidth) / 2;
            const y = (qrHeight - imgHeight) / 2;

            ctx.drawImage(img, x, y, imgWidth, imgHeight);
            console.log("Image overlaid on QR code");

            // After drawing the image, draw the label text below
            if (options.orgText) {
              drawLabelText(ctx, qrWidth, qrHeight, options);
            }
            resolve(finalCanvas);
          };

          img.onerror = function (err) {
            console.error("Error loading image:", err);
            reject(err);
          };
        } else {
          // If no image, proceed to draw the label text
          if (options.orgText) {
            drawLabelText(ctx, qrWidth, qrHeight, options);
          }
          resolve(finalCanvas);
        }        
      }
    });
  });
};

// Function to draw label text below the QR code
const drawLabelText = (ctx, qrWidth, qrHeight, options) => {
  console.log("Drawing label text with options:", options);
  const labelHeight = options.fontSize * 2; // Adjust label height based on font size
  const yPosition = qrHeight + 10; // Position below QR code with margin
  // Set background style if specified
  if (options.bgStyle && options.bgStyle !== 'solid') {
    switch (options.bgStyle) {
      case 'vertical':
        // Left half
        ctx.fillStyle = options.gradientColors[0];
        ctx.fillRect(0, yPosition, qrWidth / 2, labelHeight);
        // Right half
        ctx.fillStyle = options.gradientColors[1];
        ctx.fillRect(qrWidth / 2, yPosition, qrWidth / 2, labelHeight);
        break;
      case 'horizontal':
        // Top half
        ctx.fillStyle = options.gradientColors[0];
        ctx.fillRect(0, yPosition, qrWidth, labelHeight / 2);
        // Bottom half
        ctx.fillStyle = options.gradientColors[1];
        ctx.fillRect(0, yPosition + labelHeight / 2, qrWidth, labelHeight / 2);
        break;
      case 'diagonal-lr':
        // Diagonal from left-top to right-bottom
        ctx.save();
        // First triangle
        ctx.beginPath();
        ctx.moveTo(0, yPosition);
        ctx.lineTo(qrWidth, yPosition);
        ctx.lineTo(0, yPosition + labelHeight);
        ctx.closePath();
        ctx.fillStyle = options.gradientColors[0];
        ctx.fill();
        // Second triangle
        ctx.beginPath();
        ctx.moveTo(qrWidth, yPosition);
        ctx.lineTo(qrWidth, yPosition + labelHeight);
        ctx.lineTo(0, yPosition + labelHeight);
        ctx.closePath();
        ctx.fillStyle = options.gradientColors[1];
        ctx.fill();
        ctx.restore();
        break;
      case 'diagonal-rl':
        // Diagonal from right-top to left-bottom
        ctx.save();
        // First triangle
        ctx.beginPath();
        ctx.moveTo(0, yPosition);
        ctx.lineTo(qrWidth, yPosition);
        ctx.lineTo(qrWidth, yPosition + labelHeight);
        ctx.closePath();
        ctx.fillStyle = options.gradientColors[0];
        ctx.fill();
        // Second triangle
        ctx.beginPath();
        ctx.moveTo(0, yPosition);
        ctx.lineTo(0, yPosition + labelHeight);
        ctx.lineTo(qrWidth, yPosition + labelHeight);
        ctx.closePath();
        ctx.fillStyle = options.gradientColors[1];
        ctx.fill();
        ctx.restore();
        break;
      default:
        // Default to solid background color
        ctx.fillStyle = options.bgColor || '#FFFFFF';
        ctx.fillRect(0, yPosition, qrWidth, labelHeight);
        break;
    }
  } else {
    // Solid background color
    ctx.fillStyle = options.bgColor || '#FFFFFF';
    ctx.fillRect(0, yPosition, qrWidth, labelHeight); // Draw background rectangle
  }

  // Set text properties
  ctx.font = `${options.fontStyle || 'normal'} ${options.fontSize || 16}px Arial`;
  ctx.fillStyle = options.textColor || '#000000';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Handle multi-line text
  const lines = options.orgText.split('\n');
  const lineHeight = options.fontSize * 1.2;
  let textY = yPosition + labelHeight / 2 - ((lines.length - 1) * lineHeight) / 2;

  lines.forEach((line) => {
    ctx.fillText(line, qrWidth / 2, textY);
    textY += lineHeight;
  });
};

// Function to apply styles to the QR code
export const applyQRStyle = (canvas, qrStyle, primaryColor, secondaryColor, thirdColor, fourthColor) => {
  console.log("Applying QR style with parameters:", { qrStyle, primaryColor, secondaryColor, thirdColor, fourthColor });
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
