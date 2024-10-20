"use client";

// Dynamic import for client-side rendering of scanner components
import dynamic from 'next/dynamic';
import 'tailwindcss/tailwind.css';

// Dynamically import the scanner components to avoid SSR issues
const BarcodeScanner = dynamic(() => import("../../components/scanner/BarcodeScanner"), { ssr: false });
const QRCodeScanner = dynamic(() => import("../../components/scanner/QRCodeScanner"), { ssr: false });

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
