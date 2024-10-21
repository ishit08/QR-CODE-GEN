// components/scanner/QRCodeScanner.js

"use client";

import React from 'react';
import CameraScanner from './CameraScanner'; // Adjust the import path
import { handleFileUpload } from '../../utility/qrcode/qrCodeScan'; // Import necessary functions

export default function QRCodeScanner() {
    const handleDetectedQRCode = (qrData) => {
        // Handle QR Code detection logic (e.g., update state, display data)
        setData(qrData);
    };

    return (
        <CameraScanner 
            type="QR Code" 
            onDetected={handleDetectedQRCode} 
            handleFileUpload={handleFileUpload} 
        />
    );
}
