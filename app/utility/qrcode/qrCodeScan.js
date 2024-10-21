import jsQR from 'jsqr';

export const detectDeviceAndSetCamera = (setCameraFacingMode) => {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    setCameraFacingMode(isMobile ? 'environment' : 'user');
};

export const initCamera = async (videoRef, cameraFacingMode) => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: cameraFacingMode }
        });
        videoRef.current.srcObject = stream;
    } catch (err) {
        console.error('Error accessing camera: ', err);
    }
};

export const stopCamera = (videoRef) => {
    if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
    }
};


export const processQRCode = (videoRef, canvasRef, setData, setIsScanning) => {
    const context = canvasRef.current?.getContext('2d', { willReadFrequently: true }); // Ensure canvasRef is not null

    const scanFrame = () => {
        if (!setIsScanning) return; // Exit if scanning is not enabled

        // Check if context is available
        if (!context || !videoRef.current || !canvasRef.current) {
            console.error("Video or canvas is not ready");
            return; // Exit if context or video or canvas is not available
        }

        // Set canvas dimensions if not already set
        if (!canvasRef.current.width || !canvasRef.current.height) {
            canvasRef.current.width = videoRef.current.videoWidth; // Use video width
            canvasRef.current.height = videoRef.current.videoHeight; // Use video height
        }

        // Draw the video frame to the canvas
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const imageData = context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
        const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

        if (qrCode) {
            setData(qrCode.data); // Set QR code data
        }

        requestAnimationFrame(scanFrame); // Continue scanning
    };

    requestAnimationFrame(scanFrame); // Start the scanning process
};


export const handleFileUpload = (event, canvasRef, setQrData) => {
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
