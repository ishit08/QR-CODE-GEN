// File 1: app/(pages)/scanner/page.js
"use client";

import 'tailwindcss/tailwind.css';
import BarcodeScanner from '../../components/scanner/BarcodeScanner';
import QRCodeScanner from '../../components/scanner/QRCodeScanner';
import '../../styles/scanner.css';

const Scanner = () => {
    return (
        <div className="scanner-container">
            <h1 className="scanner-title">Barcode and QR Code Scanner</h1>
            <div className="scanner-content">
                {/* Barcode Scanner */}
                <BarcodeScanner />

                {/* Divider between Barcode and QR Code Scanner */}
                <div className="scanner-divider"></div>

                {/* QR Code Scanner */}
                <QRCodeScanner />
            </div>
        </div>
    );
};
export default Scanner;