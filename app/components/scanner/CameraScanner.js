import React, { useEffect, useRef, useState, useCallback } from 'react';
import { detectDeviceAndSetCamera, initCamera, stopCamera, processQRCode } from '../../utility/qrcode/qrCodeScan';
import { startBarcodeScanner, stopBarcodeScanner } from '../../utility/barcode/barCodeScan';

const CameraScanner = ({ type, handleFileUpload }) => {
    const [cameraFacingMode, setCameraFacingMode] = useState('environment');
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [availableCameras, setAvailableCameras] = useState([]); // To store available cameras
    const [currentCameraIndex, setCurrentCameraIndex] = useState(0); // Index of the current camera
    const [isFlashOn, setIsFlashOn] = useState(false); // State to track flashlight status
    const [hasFlash, setHasFlash] = useState(false); // State to track if device has a flashlight
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const quaggaInitialized = useRef(false);
    const [data, setData] = useState(null);

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

        getCameras(); // Detect available cameras
        checkFlashlight(); // Check for flashlight availability

        initCamera(videoRef, cameraFacingMode);

        // Automatically start scanning based on the type
        if (type === 'QR Code') {
            processQRCode(videoRef, canvasRef, setData);
        } else if (type === 'Bar Code') {
            startBarcodeScanner(videoRef, quaggaInitialized, setData);
        }

        const videoElement = videoRef.current;

        const onLoadedData = () => {
            setVideoLoaded(true);
        };

        if (videoElement) {
            videoElement.addEventListener('loadeddata', onLoadedData);
        }

        return () => {
            stopCamera(videoRef);
            stopBarcodeScanner(quaggaInitialized);
            if (videoElement) {
                videoElement.removeEventListener('loadeddata', onLoadedData);
            }
        };
    }, [cameraFacingMode, type, memoizedDetectDeviceAndSetCamera]);

    const switchCamera = () => {
        if (availableCameras.length > 1) {
            const nextIndex = (currentCameraIndex + 1) % availableCameras.length; // Cycle through available cameras
            setCurrentCameraIndex(nextIndex);
            setCameraFacingMode(availableCameras[nextIndex].facingMode); // Update camera facing mode
            initCamera(videoRef, availableCameras[nextIndex].facingMode); // Reinitialize camera
        }
    };

    const toggleFlashlight = async () => {
        if (!hasFlash) return; // Exit if device doesn't have flash

        const stream = videoRef.current.srcObject; // Get current video stream
        const videoTrack = stream.getVideoTracks()[0]; // Get the video track

        const capabilities = videoTrack.getCapabilities(); // Get the track capabilities

        if (capabilities.torch) {
            const torchState = !isFlashOn; // Determine the new state
            await videoTrack.applyConstraints({ advanced: [{ torch: torchState }] }); // Toggle the torch
            setIsFlashOn(torchState); // Update state
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
                        {/* Conditional Overlay: Square for QR Code, Rectangle for Bar Code */}
                        {type === 'QR Code' ? (
                            <div className="scanner-square-overlay"></div>
                        ) : (
                            <div className="scanner-rectangle-overlay"></div>
                        )}

                        {/* Scanner Line: Conditional animation for QR Code or Bar Code */}
                        {type === 'QR Code' ? (
                            <div className="scanner-line"></div>  // Vertical for QR Code
                        ) : (
                            <div className="scanner-line-horizontal"></div>  // Horizontal for Bar Code
                        )}

                        {/* Upload Button Icon with Caption */}
                        <label htmlFor="file-upload" className="upload-icon">
                            <i className="fa-solid fa-upload"></i>
                            <input id="file-upload" type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                        </label>
                        <span className="upload-caption">Scan<br />from<br />Gallery</span>

                        {/* Camera Switch Icon */}
                        <i 
                            className="fa-solid fa-camera-rotate switch-cam-icon" 
                            onClick={switchCamera}
                            style={{ cursor: availableCameras.length > 1 ? 'pointer' : 'not-allowed', opacity: availableCameras.length > 1 ? 1 : 0.5 }} 
                        />

                        {/* Flashlight Toggle Icon */}
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
