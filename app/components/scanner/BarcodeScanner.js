"use client";

import React, { useEffect, useRef, useState } from 'react';
import Quagga from 'quagga';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faCameraRotate } from '@fortawesome/free-solid-svg-icons';
import 'tailwindcss/tailwind.css';

export const BarcodeScanner = () => {
    const [isScanning, setIsScanning] = useState(false);
    const [cameraFacingMode, setCameraFacingMode] = useState('environment'); // Default to back camera on mobile
    const videoRef = useRef(null);
    const quaggaInitialized = useRef(false); // Flag to track Quagga initialization
    const [isCameraOn, setIsCameraOn] = useState(false); // Track camera state

    useEffect(() => {
        detectDeviceAndSetCamera();

        if (isCameraOn) {
            initCamera();
        } else {
            stopCamera();
        }

        return () => {
            stopCamera();
            stopBarcodeScanner();
        };
    }, [isCameraOn, cameraFacingMode, initCamera, stopBarcodeScanner]); // Include initCamera and stopBarcodeScanner

    const detectDeviceAndSetCamera = () => {
        const isMobile = /Mobi|Android/i.test(navigator.userAgent);
        setCameraFacingMode(isMobile ? 'environment' : 'user');
    };

    const initCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: cameraFacingMode }
            });
            videoRef.current.srcObject = stream;
        } catch (err) {
            console.error('Error accessing camera: ', err);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    };

    const startBarcodeScanner = () => {
        if (!quaggaInitialized.current) {
            Quagga.init({
                inputStream: {
                    type: 'LiveStream',
                    constraints: { facingMode: cameraFacingMode },
                    target: videoRef.current
                },
                decoder: {
                    readers: ['ean_reader', 'code_128_reader', 'upc_reader']
                }
            }, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                Quagga.start();
                quaggaInitialized.current = true;
            });
        }
        Quagga.onDetected(handleDetectedBarcode);
    };

    const stopBarcodeScanner = () => {
        if (quaggaInitialized.current) {
            Quagga.offDetected(handleDetectedBarcode);
            Quagga.stop(() => {
                quaggaInitialized.current = false;
            });
        }
    };

    const handleDetectedBarcode = (result) => {
        alert(`Barcode detected: ${result.codeResult.code}`);
    };

    const handleStartStopScanning = () => {
        if (isCameraOn) {
            if (isScanning) {
                stopBarcodeScanner();
            } else {
                startBarcodeScanner();
            }
            setIsScanning(!isScanning);
        } else {
            alert('Please start the camera first.');
        }
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">Barcode Scanner</h1>

            <div className="flex items-center mb-4">
                <button onClick={() => {
                    setIsCameraOn(!isCameraOn);
                    if (isCameraOn) stopCamera();
                }} className="bg-blue-500 text-white py-2 px-4 rounded-full mr-2">
                    <FontAwesomeIcon icon={faCamera} /> {isCameraOn ? 'Stop Camera' : 'Start Camera'}
                </button>
                {isCameraOn && (
                    <button onClick={() => setCameraFacingMode(cameraFacingMode === 'user' ? 'environment' : 'user')} className="bg-yellow-500 text-white py-2 px-4 rounded-full mr-2">
                        <FontAwesomeIcon icon={faCameraRotate} /> Switch to {cameraFacingMode === 'user' ? 'Back' : 'Front'} Camera
                    </button>
                )}
                {isCameraOn && (
                    <button onClick={handleStartStopScanning} className="bg-green-500 text-white py-2 px-4 rounded-full">
                        {isScanning ? 'Stop Scanning' : 'Start Scanning'}
                    </button>
                )}
            </div>

            {isCameraOn && (
                <div className="relative mb-4">
                    <video ref={videoRef} autoPlay className="w-full max-w-md rounded-lg border-4 border-white" />
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-white box-border" style={{ pointerEvents: 'none', borderRadius: '8px' }}></div>
                </div>
            )}
        </div>
    );
};
