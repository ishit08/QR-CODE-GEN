// app/components/scanner/ScannerPage.js

"use client";

import React, { useState, useEffect } from 'react';
import CameraScanner from '../../components/scanner/CameraScanner';
import Tab from '../../components/ui/tab'; // Import the reusable Tab component
import '../../styles/scanner.css';

const ScannerPage = () => {
    // Initialize activeTab as 'qr' and check localStorage for previously saved value
    const [activeTab, setActiveTab] = useState(() => {
        // Only check localStorage in the client-side environment
        if (typeof window !== 'undefined') {
            const savedTab = localStorage.getItem('activeTab');
            // Return saved tab or 'qr' if none is found
            return savedTab ? savedTab : 'qr'; // Default to 'qr' if nothing is saved
        }
        return 'qr'; // Fallback for server-side rendering
    });

    const tabs = [
        { value: 'qr', label: 'QR Code' },
        { value: 'barcode', label: 'Bar Code' },
    ];

    // Update localStorage whenever activeTab changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('activeTab', activeTab);
        }
    }, [activeTab]);

    return (
        <div className="scanner-container">
            <h1 className="scanner-title">Barcode and QR Code Scanner</h1>

            <Tab
                tabs={tabs}
                // You can remove defaultTab as activeTab is being managed already
                onTabChange={setActiveTab}
                className="mb-6"
            />

            <div className="scanner-content">
                {activeTab === 'qr' && <CameraScanner type="QR Code" />}
                {activeTab === 'barcode' && <CameraScanner type="Bar Code" />}
            </div>
        </div>
    );
};

export default ScannerPage;
