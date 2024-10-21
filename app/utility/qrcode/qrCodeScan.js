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
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const scanFrame = () => {
        if (!setIsScanning) return;

        if (videoRef.current && videoRef.current.readyState === 4) { // Check if video is ready
            context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

            if (qrCode) {
                setData(qrCode.data);
            }
        }

        requestAnimationFrame(scanFrame); // Keep scanning
    };

    requestAnimationFrame(scanFrame);
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
