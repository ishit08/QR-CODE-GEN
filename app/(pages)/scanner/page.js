"use client";

import 'tailwindcss/tailwind.css';
import { useState } from 'react';
import BarcodeScanner from '../../components/scanner/BarcodeScanner';
import QRCodeScanner from '../../components/scanner/QRCodeScanner';
import Tab from '../../components/ui/tab'; // Import the reusable Tab component
import '../../styles/scanner.css';

const Scanner = () => {
    const [activeTab, setActiveTab] = useState('barcode'); // Default to barcode scanner

    const tabs = [
        { value: 'barcode', label: 'Barcode Scanner' },
        { value: 'qr', label: 'QR Code Scanner' },
    ];

    return (
        <div className="scanner-container">
            <h1 className="scanner-title">Barcode and QR Code Scanner</h1>

            {/* Reusable Tab Component */}
            <Tab
                tabs={tabs}
                defaultTab="barcode"
                onTabChange={setActiveTab}
                className="mb-6"
            />

            {/* Tab Content */}
            <div className="scanner-content">
                {activeTab === 'barcode' && <BarcodeScanner />}
                {activeTab === 'qr' && <QRCodeScanner />}
            </div>
        </div>
    );
};

export default Scanner;
