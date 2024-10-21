import Quagga from 'quagga';

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

export const handleDetectedBarcode = (result, setBarcodeData, stopBarcodeScanner, quaggaInitialized) => {
    setBarcodeData(result.codeResult.code);
    stopBarcodeScanner(quaggaInitialized);
};

export const stopBarcodeScanner = (quaggaInitialized) => {
    if (quaggaInitialized.current) {
        Quagga.offDetected(handleDetectedBarcode);
        Quagga.stop(() => {
            quaggaInitialized.current = false;
        });
    }
};

export const startBarcodeScanner = (quaggaInitialized, handleDetectedBarcode, cameraFacingMode, videoRef, setBarcodeData) => {
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
    Quagga.onDetected((result) => handleDetectedBarcode(result, setBarcodeData, stopBarcodeScanner, quaggaInitialized));
};

export const handleFileUpload = (event, setBarcodeData) => {
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
                    setBarcodeData(result.codeResult.code);
                } else {
                    alert('No barcode found in the image.');
                }
            });
        };
        reader.readAsDataURL(file);
    }
};
