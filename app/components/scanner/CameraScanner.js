"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { detectDeviceAndSetCamera, initCamera, stopCamera, processQRCode } from '../../utility/qrcode/qrCodeScan';
import { startBarcodeScanner, stopBarcodeScanner } from '../../utility/barcode/barCodeScan';

const CameraScanner = ({ type, handleFileUpload }) => {
    const [isScanning, setIsScanning] = useState(false);
    const [cameraFacingMode, setCameraFacingMode] = useState('environment');
    const [videoLoaded, setVideoLoaded] = useState(false); // New state to track video loading
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const quaggaInitialized = useRef(false);
    const [data, setData] = useState(null);

    const memoizedDetectDeviceAndSetCamera = useCallback(() => {
        detectDeviceAndSetCamera(setCameraFacingMode);
    }, []);

    useEffect(() => {
        memoizedDetectDeviceAndSetCamera();
        initCamera(videoRef, cameraFacingMode);

        // Start processing QR codes or bar codes based on the type
        if (type === 'QR Code') {
            processQRCode(videoRef, canvasRef, setData, setIsScanning);
        } else if (type === 'Bar Code') {
            startBarcodeScanner(videoRef, quaggaInitialized, setData, setIsScanning);
        }

        const videoElement = videoRef.current;
        
        // Set videoLoaded to true when the video is playing
        const onLoadedData = () => {
            setVideoLoaded(true);
        };
        
        if (videoElement) {
            videoElement.addEventListener('loadeddata', onLoadedData);
        }

        return () => {
            // Cleanup function to stop the camera and barcode scanner
            console.log("Stopping camera and barcode scanner");
            stopCamera(videoRef);
            stopBarcodeScanner(quaggaInitialized);
            if (videoElement) {
                videoElement.removeEventListener('loadeddata', onLoadedData);
            }
        };
    }, [cameraFacingMode, type, memoizedDetectDeviceAndSetCamera]);

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
                {type === 'Bar Code' && (
                    <button onClick={() => setIsScanning(!isScanning)} className="scanner-button scanner-button-green">
                        {isScanning ? 'Stop Scanning' : 'Start Scanning'}
                    </button>
                )}
            </div>

            <div className="scanner-file-upload">
                <input type="file" accept="image/*" onChange={handleFileUpload} className="scanner-input" />
            </div>

            <div className="scanner-video-container">
                <video ref={videoRef} autoPlay className="scanner-video" />
                <canvas ref={canvasRef} className="hidden" />
                {videoLoaded && ( // Render the square and line only after the video is loaded
                    <>
                        <div className="scanner-square-overlay"></div>
                        <div className="scanner-line"></div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CameraScanner;
