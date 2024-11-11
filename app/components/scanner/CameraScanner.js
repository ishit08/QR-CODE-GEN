"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { detectDeviceAndSetCamera, initCamera, stopCamera, processQRCode } from '../../utility/qrcode/qrCodeScan';
import { BrowserMultiFormatReader, BarcodeFormat } from '@zxing/library';

const CameraScanner = ({ type, handleFileUpload }) => {
    const [cameraFacingMode, setCameraFacingMode] = useState('environment');
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [availableCameras, setAvailableCameras] = useState([]);
    const [currentCameraIndex, setCurrentCameraIndex] = useState(0);
    const [isFlashOn, setIsFlashOn] = useState(false);
    const [hasFlash, setHasFlash] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const readerRef = useRef(null);
    const [data, setData] = useState(null);
    const [isScanning, setIsScanning] = useState(true);

    // Callback to detect device and set camera
    const memoizedDetectDeviceAndSetCamera = useCallback(() => {
        detectDeviceAndSetCamera(setCameraFacingMode);
    }, []);

    useEffect(() => {
        const getCameras = async () => {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoCameras = devices.filter(device => device.kind === 'videoinput');
            setAvailableCameras(videoCameras);
        };

        const checkFlashlight = async () => {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const hasFlashlight = devices.some(device => device.kind === 'videoinput' && device.label.toLowerCase().includes('flash'));
            setHasFlash(hasFlashlight);
        };

        getCameras();
        checkFlashlight();

        // Initialize appropriate scanner based on type
        if (type === 'QR Code') {
            initCamera(videoRef, cameraFacingMode);
            processQRCode(videoRef, canvasRef, setData, isScanning);
        } else if (type === 'Bar Code') {
            const formats = [
                BarcodeFormat.CODE_128,
                BarcodeFormat.CODE_39,
                BarcodeFormat.EAN_13,
                BarcodeFormat.EAN_8,
                BarcodeFormat.UPC_A,
                BarcodeFormat.UPC_E
            ];
            
            readerRef.current = new BrowserMultiFormatReader(undefined, formats);
            
            const startBarcodeScanning = async () => {
                try {
                    const videoInputDevices = await readerRef.current.listVideoInputDevices();
                    if (videoInputDevices.length > 0) {
                        await readerRef.current.decodeFromVideoDevice(
                            videoInputDevices[0].deviceId,
                            videoRef.current,
                            (result, err) => {
                                if (result && isScanning) {
                                    setData(result.getText());
                                    new Audio('/beep.mp3').play().catch(() => {});
                                }
                            }
                        );
                    }
                } catch (err) {
                    console.error('Error starting barcode scanner:', err);
                }
            };

            startBarcodeScanning();
        }

        const videoElement = videoRef.current;
        const onLoadedData = () => setVideoLoaded(true);
        if (videoElement) {
            videoElement.addEventListener('loadeddata', onLoadedData);
        }

        return () => {
            if (type === 'QR Code') {
                stopCamera(videoRef);
            } else if (type === 'Bar Code' && readerRef.current) {
                readerRef.current.reset();
                readerRef.current = null;
            }
            if (videoElement) {
                videoElement.removeEventListener('loadeddata', onLoadedData);
            }
        };
    }, [cameraFacingMode, type, memoizedDetectDeviceAndSetCamera, isScanning]);

    // Switch camera function
    const switchCamera = () => {
        if (availableCameras.length > 1) {
            const nextIndex = (currentCameraIndex + 1) % availableCameras.length;
            setCurrentCameraIndex(nextIndex);
            const newCamera = availableCameras[nextIndex];
            setCameraFacingMode(newCamera.facingMode);
            initCamera(videoRef, newCamera.facingMode);
        }
    };

    // Toggle flashlight function
    const toggleFlashlight = async () => {
        if (!hasFlash) return;
        const stream = videoRef.current.srcObject;
        const videoTrack = stream.getVideoTracks()[0];
        const capabilities = videoTrack.getCapabilities();
        if (capabilities.torch) {
            const torchState = !isFlashOn;
            await videoTrack.applyConstraints({ advanced: [{ torch: torchState }] });
            setIsFlashOn(torchState);
        }
    };

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

            <div className="scanner-video-container">
                <video ref={videoRef} autoPlay className="scanner-video" />
                <canvas ref={canvasRef} className="hidden" />

                {videoLoaded && (
                    <>
                        {type === 'QR Code' ? (
                            <div className="scanner-square-overlay"></div>
                        ) : (
                            <div className="scanner-rectangle-overlay"></div>
                        )}

                        {type === 'QR Code' ? (
                            <div className="scanner-line"></div>
                        ) : (
                            <div className="scanner-line-horizontal"></div>
                        )}

                        <label htmlFor="file-upload" className="upload-icon">
                            <i className="fa-solid fa-upload"></i>
                            <input id="file-upload" type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                        </label>
                        <span className="upload-caption">Scan<br />from<br />Gallery</span>

                        <i 
                            className="fa-solid fa-camera-rotate switch-cam-icon" 
                            onClick={switchCamera}
                            style={{ cursor: availableCameras.length > 1 ? 'pointer' : 'not-allowed', opacity: availableCameras.length > 1 ? 1 : 0.5 }} 
                        />

                        <i 
                            className={`fa-solid fa-bolt flash-icon ${isFlashOn ? 'active' : ''}`} 
                            onClick={toggleFlashlight}
                            style={{ cursor: hasFlash ? 'pointer' : 'not-allowed', opacity: hasFlash ? 1 : 0.5 }} 
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default CameraScanner;
