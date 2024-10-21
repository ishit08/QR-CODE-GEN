"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Quagga from 'quagga';


export default function BarcodeScanner() {
    const [isScanning, setIsScanning] = useState(false);
    const [cameraFacingMode, setCameraFacingMode] = useState('environment');
    const videoRef = useRef(null);
    const quaggaInitialized = useRef(false);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [barcodeData, setBarcodeData] = useState(null); // To store detected barcode data

    const detectDeviceAndSetCamera = useCallback(() => {
        const isMobile = /Mobi|Android/i.test(navigator.userAgent);
        setCameraFacingMode(isMobile ? 'environment' : 'user');
    }, []);

    const initCamera = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: cameraFacingMode }
            });
            videoRef.current.srcObject = stream;
        } catch (err) {
            console.error('Error accessing camera: ', err);
        }
    }, [cameraFacingMode]);

    const stopCamera = useCallback(() => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    }, []);

    const handleDetectedBarcode = useCallback((result) => {
        setBarcodeData(result.codeResult.code); // Set barcode data to display
        stopBarcodeScanner(); // Stop after successful scan
        setIsScanning(false); // Reset scanning state
    }, []);

    const stopBarcodeScanner = useCallback(() => {
        if (quaggaInitialized.current) {
            Quagga.offDetected(handleDetectedBarcode);
            Quagga.stop(() => {
                quaggaInitialized.current = false;
            });
        }
    }, [handleDetectedBarcode]); // Added handleDetectedBarcode as a dependency

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
    }, [isCameraOn, cameraFacingMode, initCamera, stopBarcodeScanner, detectDeviceAndSetCamera, stopCamera]); // Added stopCamera as a dependency

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

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                Quagga.decodeSingle({
                    src: e.target.result,
                    decoder: {
                        readers: ['ean_reader', 'code_128_reader', 'upc_reader']
                    }
                }, (result) => {
                    if (result && result.codeResult) {
                        setBarcodeData(result.codeResult.code); // Set barcode data to display
                    } else {
                        alert('No barcode found in the image.');
                    }
                });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="scanner-component">
           
            {barcodeData && (
                <div className="scanner-overlay">
                    <div className="scanner-overlay-content">
                        <h2 className="scanner-overlay-title">Barcode Data</h2>
                        <p>{barcodeData}</p>
                        <button onClick={() => setBarcodeData(null)} className="scanner-close-button">Close</button>
                    </div>
                </div>
            )}

           <div className="scanner-controls">
    <button onClick={() => {
        setIsCameraOn(!isCameraOn);
        if (isCameraOn) stopCamera();
    }} className="scanner-button">
        <i 
          className={isCameraOn ? "fa fa-camera" : "fa fa-camera"} 
          style={{ width: "1.25rem" }} 
        ></i> 
        {isCameraOn ? 'Stop Camera' : 'Start Camera'}
    </button>

    {isCameraOn && (
        <button 
          onClick={() => setCameraFacingMode(cameraFacingMode === 'user' ? 'environment' : 'user')} 
          className="scanner-button scanner-button-yellow"
        >
            <i 
              className="fa fa-camera-rotate" 
              style={{ width: "1.25rem" }} 
            ></i> 
            Switch to {cameraFacingMode === 'user' ? 'Back' : 'Front'} Camera
        </button>
    )}

    {isCameraOn && (
        <button onClick={handleStartStopScanning} className="scanner-button scanner-button-green">
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
                    <div className="scanner-video-overlay"></div>
                </div>
            )}
        </div>
    );
}
