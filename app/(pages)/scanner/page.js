// app/components/scanner/ScannerPage.js

"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import CameraScanner from '../../components/scanner/CameraScanner';
import Tab from '../../components/ui/tab'; // Import the reusable Tab component
import '../../styles/scanner.css';

const ScannerPage = () => {
    // Initialize activeTab as 'qr' and check localStorage for previously saved value
    const [activeTab, setActiveTab] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedTab = localStorage.getItem('activeTab');
            return savedTab ? savedTab : 'qr'; // Default to 'qr' if nothing is saved
        }
        return 'qr'; // Fallback for server-side rendering
    });

    const tabs = [
        { value: 'qr', label: 'QR Code' },
        { value: 'barcode', label: 'Bar Code' },
    ];

    const { data: session, status } = useSession(); // Use useSession to get session status
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
        router.push("/login") 
        }
    }, [status, router]);

    // Update localStorage whenever activeTab changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('activeTab', activeTab);
        }
    }, [activeTab]);

    // Function to close the camera
    const closeCamera = () => {
        console.log("Camera closed"); // Placeholder for actual camera closing logic
        // Add logic to close the camera in the CameraScanner component
    };

    // Close camera when the component is unmounted or when activeTab changes
    useEffect(() => {
        return () => {
            closeCamera(); // Close camera on unmount
        };
    }, []);

    if (status === 'authenticated') {
        return (
            <div className="scanner-container">
                <h1 className="scanner-title">Barcode and QR Code Scanner</h1>

                <Tab
                    tabs={tabs}
                    onTabChange={setActiveTab}
                    className="mb-6"
                />

                <div className="scanner-content">
                    {activeTab === 'qr' && <CameraScanner type="QR Code" />}
                    {activeTab === 'barcode' && <CameraScanner type="Bar Code" />}
                </div>
            </div>
        );
    }
    return null;
};

export default ScannerPage;
