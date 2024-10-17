"use client";

import React, { useEffect, useRef, useState } from 'react';
import Quagga from 'quagga'; // Quagga for barcode scanning
import jsQR from 'jsqr'; // jsQR for QR code scanning
import CryptoJS from 'crypto-js'; // For decrypting QR codes

const Scanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [cameraFacingMode, setCameraFacingMode] = useState('environment'); // Default to back camera on mobile
  const [imageResult, setImageResult] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const quaggaInitialized = useRef(false); // Flag to track Quagga initialization
  const [isCameraOn, setIsCameraOn] = useState(false); // Track camera state
  const [location, setLocation] = useState(null);
  const loggedInUser = 'User: John Doe'; // Mock user details

  useEffect(() => {
    detectDeviceAndSetCamera();

    if (isCameraOn) {
      initCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
      stopBarcodeScanner();
    };
  }, [isCameraOn, cameraFacingMode]);

  const detectDeviceAndSetCamera = () => {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    if (isMobile) {
      setCameraFacingMode('environment'); // Default to back camera on mobile
    } else {
      setCameraFacingMode('user'); // Default to user (front) camera on laptop/desktop
    }
  };

  const initCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: cameraFacingMode }
      });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error('Error accessing camera: ', err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject;
      const tracks = stream?.getTracks();
      tracks?.forEach(track => track.stop());
      videoRef.current.srcObject = null; // Clear the video source to stop camera feed
    }
  };

  const startBarcodeScanner = () => {
    if (!quaggaInitialized.current) {
      Quagga.init({
        inputStream: {
          type: 'LiveStream',
          constraints: {
            facingMode: cameraFacingMode // Use the detected camera mode
          },
          target: videoRef.current, // Use video reference for rendering
        },
        decoder: {
          readers: ['ean_reader', 'code_128_reader', 'upc_reader'], // Barcode formats to scan
        },
      }, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        Quagga.start();
        quaggaInitialized.current = true; // Mark Quagga as initialized
      });
    }

    Quagga.onDetected(handleDetectedBarcode);
  };

  const stopBarcodeScanner = () => {
    if (quaggaInitialized.current) {
      Quagga.offDetected(handleDetectedBarcode);
      Quagga.stop(() => {
        quaggaInitialized.current = false; // Reset initialization flag after stopping
      });
    }
  };

  const handleDetectedBarcode = (result) => {
    alert(`Barcode detected: ${result.codeResult.code}`);
    logDetails();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const image = new Image();
      image.src = e.target.result;
      image.onload = () => {
        processImageForQRAndBarcode(image);
      };
    };
    reader.readAsDataURL(file);
  };

  const processImageForQRAndBarcode = (image) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    // Set willReadFrequently to true for better performance
    context.willReadFrequently = true; 

    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    
    // First, try to detect QR code
    const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

    if (qrCode) {
      const decryptedData = decryptQRCode(qrCode.data);
      if (decryptedData === 'encrypted') {
        alert('QR Code is encrypted!');
      } else {
        alert(`QR Code detected: ${decryptedData}`);
      }
      logDetails();
    } else {
      // If no QR code, try barcode scanning
      Quagga.decodeSingle({
        decoder: {
          readers: ['ean_reader', 'code_128_reader', 'upc_reader'],
        },
        locate: true,
        src: canvas.toDataURL(),
      }, (err, result) => {
        if (err || !result) {
          alert('No barcode or QR code detected in the image.');
        } else {
          alert(`Barcode detected: ${result.codeResult.code}`);
          logDetails();
        }
      });
    }
  };

  const decryptQRCode = (encryptedData) => {
    const secretKey = 'your-secret-key'; // Replace with your actual secret key
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedData || 'encrypted'; // Return 'encrypted' if decryption fails
    } catch (err) {
      return 'encrypted'; // Return 'encrypted' if decryption fails
    }
  };

  // Get the user's current location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  // Log details including location and user information
  const logDetails = () => {
    const locationDetails = location
      ? `Latitude: ${location.latitude}, Longitude: ${location.longitude}`
      : 'Location not available';

    alert(`
      ${loggedInUser}
      ${locationDetails}
    `);
  };

  const handleStartStopScanning = () => {
    if (isCameraOn) {
      setIsScanning(!isScanning);
    } else {
      alert('Please start the camera first.');
    }
  };

  return (
    <div>
      <h1>Barcode/QR Code Scanner</h1>

      {/* Toggle camera */}
      <button onClick={() => setIsCameraOn(!isCameraOn)}>
        {isCameraOn ? 'Stop Camera' : 'Start Camera'}
      </button>

      {/* Only show "Start Scanning" and "Switch to Back Camera" if camera is on */}
      {isCameraOn && (
        <>
          {/* Switch between front and back cameras */}
          <button onClick={() => setCameraFacingMode(cameraFacingMode === 'user' ? 'environment' : 'user')}>
            Switch to {cameraFacingMode === 'user' ? 'Back' : 'Front'} Camera
          </button>

          {/* Toggle scanning */}
          <button onClick={handleStartStopScanning}>
            {isScanning ? 'Stop Scanning' : 'Start Scanning'}
          </button>
        </>
      )}

      {/* Video stream */}
      <div style={{ maxWidth: '100%', height: 'auto', display: isCameraOn ? 'block' : 'none' }}>
        <video ref={videoRef} autoPlay style={{ width: '100%', maxWidth: '600px', maxHeight: '400px' }} />
      </div>

      {/* Image upload for QR code and barcode scanning */}
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {imageResult && <div>Scanned Result: {imageResult}</div>}

      <style jsx>{`
        h1 {
          text-align: center;
          font-size: 1.5rem;
        }
        button {
          margin: 10px;
          padding: 10px;
          font-size: 1rem;
        }
        video {
          width: 100%;
          height: auto;
          border: 1px solid black;
        }
      `}</style>
    </div>
  );
};

export default Scanner;
