"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import jsQR from 'jsqr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faCameraRotate } from '@fortawesome/free-solid-svg-icons';
import 'tailwindcss/tailwind.css';

export const QRCodeScanner = () => {
    const [isScanning, setIsScanning] = useState(false);
    const [cameraFacingMode, setCameraFacingMode] = useState('environment');
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [qrData, setQrData] = useState(null);

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
    }, [isCameraOn, cameraFacingMode, initCamera, processQRCode]); // Include initCamera and processQRCode

    const detectDeviceAndSetCamera = () => {
        const isMobile = /Mobi|Android/i.test(navigator.userAgent);
        setCameraFacingMode(isMobile ? 'environment' : 'user');
    };

    const initCamera = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: cameraFacingMode }
            });
            videoRef.current.srcObject = stream;
        } catch (err) {
            console.error('Error accessing camera: ', err);
        }
    }, [cameraFacingMode]); // Add cameraFacingMode as a dependency

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    };

    const processQRCode = useCallback(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

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
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = canvasRef.current;
                    const context = canvas.getContext('2d');
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
        <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">QR Code Scanner</h1>

            {qrData && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold mb-4">QR Code Data</h2>
                        <p>{qrData}</p>
                        <button onClick={() => setQrData(null)} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full">Close</button>
                    </div>
                </div>
            )}

            <div className="relative mb-4">
                {isCameraOn && (
                    <div className="absolute top-10 left-0 w-full h-full border-4 border-white box-border" style={{ pointerEvents: 'none', borderRadius: '8px' }}></div>
                )}
                <video ref={videoRef} autoPlay className="w-full max-w-md rounded-lg border-4 border-white mb-4" />
                <canvas ref={canvasRef} className="hidden" />
            </div>

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
            </div>

            <div className="mb-4">
                <input type="file" accept="image/*" onChange={handleFileUpload} className="border-2 border-blue-500 rounded-lg py-2 px-4 cursor-pointer" />
            </div>
        </div>
    );
};
