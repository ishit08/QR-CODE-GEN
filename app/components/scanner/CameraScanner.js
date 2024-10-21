// app/components/scanner/CameraScanner.js

"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { detectDeviceAndSetCamera, initCamera, stopCamera, processQRCode } from '../../utility/qrcode/qrCodeScan';
import { startBarcodeScanner, stopBarcodeScanner } from '../../utility/barcode/barCodeScan';

const CameraScanner = ({ type, handleFileUpload }) => {
    const [isScanning, setIsScanning] = useState(false);
    const [cameraFacingMode, setCameraFacingMode] = useState('environment');
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const quaggaInitialized = useRef(false);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [data, setData] = useState(null);

    const memoizedDetectDeviceAndSetCamera = useCallback(() => {
        detectDeviceAndSetCamera(setCameraFacingMode);
    }, []);

    useEffect(() => {
        memoizedDetectDeviceAndSetCamera();

        if (isCameraOn) {
            initCamera(videoRef, cameraFacingMode);

            if (type === 'QR Code') {
                processQRCode(videoRef, canvasRef, setData, setIsScanning);
            } else if (type === 'Bar Code') {
                startBarcodeScanner(videoRef, quaggaInitialized, setData, setIsScanning);
            }
        } else {
            stopCamera(videoRef);
            stopBarcodeScanner(quaggaInitialized);
        }

        return () => {
            stopCamera(videoRef);
            stopBarcodeScanner(quaggaInitialized);
        };
    }, [isCameraOn, cameraFacingMode, type, memoizedDetectDeviceAndSetCamera]);

    return (
        <div className="scanner-component">
            {data && (
                <div className="scanner-overlay">
                    <div className="scanner-overlay-content">
                        <h2 className="scanner-overlay-title">{type} Data</h2>
                        <p>{data}</p>
                        <button onClick={() => setData(null)} className="scanner-close-button">Close</button>
                    </div>
                </div>
            )}

            <div className="scanner-controls">
                <button onClick={() => setIsCameraOn(!isCameraOn)} className="scanner-button">
                    {isCameraOn ? 'Stop Camera' : 'Start Camera'}
                </button>

                {isCameraOn && (
                    <button onClick={() => setCameraFacingMode(cameraFacingMode === 'user' ? 'environment' : 'user')} className="scanner-button scanner-button-yellow">
                        Switch to {cameraFacingMode === 'user' ? 'Back' : 'Front'} Camera
                    </button>
                )}

                {isCameraOn && type === 'Bar Code' && (
                    <button onClick={() => setIsScanning(!isScanning)} className="scanner-button scanner-button-green">
                        {isScanning ? 'Stop Scanning' : 'Start Scanning'}
                    </button>
                )}
            </div>

            <div className="scanner-file-upload">
                <input type="file" accept="image/*" onChange={handleFileUpload} className="scanner-input" />
            </div>

            {isCameraOn && (
                <div className="scanner-video-container">
                    <video ref={videoRef} autoPlay className="scanner-video" />
                    <canvas ref={canvasRef} className="hidden" />
                </div>
            )}
        </div>
    );
};

export default CameraScanner;
