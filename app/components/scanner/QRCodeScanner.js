// File 3: app/components/scanner/QRCodeScanner.js
"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import jsQR from 'jsqr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faCameraRotate } from '@fortawesome/free-solid-svg-icons';

export default function QRCodeScanner() {
    const [isScanning, setIsScanning] = useState(false);
    const [cameraFacingMode, setCameraFacingMode] = useState('environment');
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [qrData, setQrData] = useState(null);

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

    const processQRCode = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            console.error('Canvas element is not available');
            return;
        }
        const context = canvas.getContext('2d');
        if (!context) {
            console.error('Failed to get canvas context');
            return;
        }

        const scan = () => {
            if (!isScanning) return;

            context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

            if (qrCode) {
                new Audio('/beep.mp3').play(); // Play beep sound
                setQrData(qrCode.data); // Store QR Code data
                setIsScanning(false);
                setIsCameraOn(false);
            } else {
                requestAnimationFrame(scan);
            }
        };
        requestAnimationFrame(scan);
    }, [isScanning]);

    useEffect(() => {
        detectDeviceAndSetCamera();

        if (isCameraOn) {
            initCamera();
            setIsScanning(true);
            processQRCode();
        } else {
            stopCamera();
            setIsScanning(false);
        }

        return () => {
            stopCamera();
        };
    }, [isCameraOn, cameraFacingMode, initCamera, processQRCode, detectDeviceAndSetCamera]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = canvasRef.current;
                    if (!canvas) {
                        console.error('Canvas element is not available');
                        return;
                    }
                    const context = canvas.getContext('2d');
                    if (!context) {
                        console.error('Failed to get canvas context');
                        return;
                    }
                    context.drawImage(img, 0, 0, canvas.width, canvas.height);
                    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                    const qrCode = jsQR(imageData.data, imageData.width, imageData.height);
                    if (qrCode) {
                        setQrData(qrCode.data); // Store QR Code data
                    } else {
                        alert("No QR Code found in the image.");
                    }
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="scanner-component">       

            {qrData && (
                <div className="scanner-overlay">
                    <div className="scanner-overlay-content">
                        <h2 className="scanner-overlay-title">QR Code Data</h2>
                        <p>{qrData}</p>
                        <button onClick={() => setQrData(null)} className="scanner-close-button">Close</button>
                    </div>
                </div>
            )}

            <div className="scanner-controls">
                <button onClick={() => {
                    setIsCameraOn(!isCameraOn);
                    if (isCameraOn) stopCamera();
                }} className="scanner-button">
                    <FontAwesomeIcon icon={faCamera} /> {isCameraOn ? 'Stop Camera' : 'Start Camera'}
                </button>
                {isCameraOn && (
                    <button onClick={() => setCameraFacingMode(cameraFacingMode === 'user' ? 'environment' : 'user')} className="scanner-button scanner-button-yellow">
                        <FontAwesomeIcon icon={faCameraRotate} /> Switch to {cameraFacingMode === 'user' ? 'Back' : 'Front'} Camera
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
                    <div className="scanner-video-overlay"></div>
                </div>
            )}
        </div>
    );
}
