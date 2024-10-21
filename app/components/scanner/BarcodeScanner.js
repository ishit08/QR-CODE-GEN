// components/scanner/BarcodeScanner.js

"use client";

import React from 'react';
import CameraScanner from './CameraScanner'; // Adjust the import path
import { handleFileUpload } from '../../utility/barcode/barCodeScan'; // Import necessary functions

export default function BarcodeScanner() {
    const handleDetectedBarcode = (barcodeData) => {
        // Handle Barcode detection logic (e.g., update state, display data)
        setData(barcodeData);
    };

    return (
        <CameraScanner 
            type="Bar Code" 
            onDetected={handleDetectedBarcode} 
            handleFileUpload={handleFileUpload} 
        />
    );
}
