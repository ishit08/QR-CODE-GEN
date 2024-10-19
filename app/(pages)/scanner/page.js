"use client";
// Import necessary libraries

import { BarcodeScanner }  from "../../components/scanner/BarcodeScanner"
import { QRCodeScanner } from "../../components/scanner/QRCodeScanner"

import 'tailwindcss/tailwind.css';
// Layout Component to Integrate Barcode and QR Code Scanners
const Scanner = () => {
    return (
        <div className="flex flex-col items-center p-8">
            <h1 className="text-4xl font-bold mb-8">Barcode and QR Code Scanner</h1>
            <div className="w-full max-w-4xl">
                <BarcodeScanner />
                <div className="my-8 border-t-2 border-gray-300"></div>
                <QRCodeScanner />
            </div>
        </div>
    );
};

export default Scanner;
