// File 1: app/(pages)/scanner/page.js
"use client";

import 'tailwindcss/tailwind.css';
import BarcodeScanner from '../../components/scanner/BarcodeScanner';
import { QRCodeScanner } from '../../components/scanner/QRCodeScanner';

const Scanner = () => {
    return (
        <div className="flex flex-col items-center p-8">
            <h1 className="text-4xl font-bold mb-8 text-center">Barcode and QR Code Scanner</h1>
            <div className="w-full max-w-4xl">
                {/* Barcode Scanner */}
                <BarcodeScanner />

                {/* Divider between Barcode and QR Code Scanner */}
                <div className="my-8 border-t-2 border-gray-300"></div>

                {/* QR Code Scanner */}
                <QRCodeScanner />
            </div>
        </div>
    );
};

export default Scanner;
