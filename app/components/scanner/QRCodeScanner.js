// QR Code Scanner Component
"use client";

import React, { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faCameraRotate } from '@fortawesome/free-solid-svg-icons';
import 'tailwindcss/tailwind.css';

export const QRCodeScanner = () => {
    const [isScanning, setIsScanning] = useState(false);
    const [cameraFacingMode, setCameraFacingMode] = useState('environment'); // Default to back camera on mobile
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isCameraOn, setIsCameraOn] = useState(false); // Track camera state
    const [qrData, setQrData] = useState(null); // Track QR Code data

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
    }, [isCameraOn, cameraFacingMode]);

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

    const processQRCode = () => {
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
            } else {
                requestAnimationFrame(scan);
            }
        };
        requestAnimationFrame(scan);
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
                    <div className="absolute top-10 left-10 right-10 bottom-10 border-4 border-white rounded-lg box-border pointer-events-none"></div>
                )}
                <video ref={videoRef} autoPlay className="w-full max-w-md rounded-lg border-4 border-white" />
                <canvas ref={canvasRef} width={640} height={480} style={{ display: 'none' }}></canvas>
                {isCameraOn && (
                    <button onClick={() => setCameraFacingMode(cameraFacingMode === 'user' ? 'environment' : 'user')} className="absolute top-10 right-10  text-white p-4 rounded-full">
                        <FontAwesomeIcon icon={faCameraRotate} />
                    </button>
                )}
            </div>

            <button onClick={() => {
                setIsCameraOn(!isCameraOn);
                if (isCameraOn) stopCamera();
            }} className="bg-blue-500 text-white p-4 rounded-full">
                <FontAwesomeIcon icon={faCamera} /> {isCameraOn ? 'Stop Camera' : 'Start Camera'}
            </button>
        </div>
    );
};
