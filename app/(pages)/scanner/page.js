// app/components/scanner/ScannerPage.js

"use client";

import React, { useState, useEffect } from 'react';
import CameraScanner from '../../components/scanner/CameraScanner';
import Tab from '../../components/ui/tab'; // Import the reusable Tab component
import '../../styles/scanner.css';

const ScannerPage = () => {
    const [activeTab, setActiveTab] = useState('qr'); // Default to 'qr' tab

    const tabs = [
        { value: 'qr', label: 'QR Code' },
        { value: 'barcode', label: 'Bar Code' },
    ];

    useEffect(() => {
        // Check if localStorage is available
        if (typeof window !== 'undefined') {
            const savedTab = localStorage.getItem('activeTab');
            if (savedTab) {
                setActiveTab(savedTab);
            }
        }
    }, []);

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
                defaultTab="qr" // Set the default tab to 'qr'
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
