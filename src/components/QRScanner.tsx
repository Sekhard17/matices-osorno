import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode, faTimes, faCamera } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

interface QRScannerProps {
  onScan: (bookingId: string, hashCode: string) => void;
  onClose: () => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScan, onClose }) => {
  const [error, setError] = useState<string | null>(null);
  const [scanning, setScanning] = useState(true);

  const handleScan = (result: any) => {
    if (result) {
      const scannedData = result?.text;
      if (scannedData && scannedData.includes('#')) {
        const [bookingId, hashCode] = scannedData.split('#');
        if (bookingId && hashCode) {
          setScanning(false);
          onScan(bookingId, hashCode);
        } else {
          toast.error('Código QR inválido');
        }
      }
    }
  };

  const handleError = (error: any) => {
    setError('Error al acceder a la cámara. Por favor, permite el acceso a la cámara e intenta nuevamente.');
    console.error('QR Scanner Error:', error);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-card rounded-xl shadow-lg p-6 max-w-md w-full mx-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faQrcode} className="text-xl text-primary" />
            <h2 className="text-xl font-semibold">Escanear Código QR</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-full transition-colors"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {scanning && (
          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden mb-4">
              <QrReader
                constraints={{ 
                  facingMode: 'environment',
                  aspectRatio: 1
                }}
                onResult={handleScan}
                onError={handleError}
                className="w-full h-full"
              />
            </div>
            <div className="absolute inset-0 border-2 border-primary rounded-lg pointer-events-none">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 border-2 border-primary animate-pulse rounded-lg" />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-lg mb-4">
            <p className="text-sm">{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-2 text-sm font-medium hover:underline"
            >
              Intentar nuevamente
            </button>
          </div>
        )}

        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <FontAwesomeIcon icon={faCamera} />
            <p className="text-sm">
              Apunta la cámara al código QR de la reserva
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QRScanner;