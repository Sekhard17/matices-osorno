import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTimes, 
  faCreditCard,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import type { BookingData } from '@/pages/booking/BookingPage';
import PaymentSuccessModal from './PaymentSuccessModal';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: BookingData;
}

const PaymentModal = ({ isOpen, onClose, bookingData }: PaymentModalProps) => {
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  const handlePayment = async () => {
    if (!user?.correo) {
      toast.error('Error: No se pudo identificar el usuario');
      return;
    }

    setIsProcessing(true);
    try {
      // Aquí iría la integración con Mercado Pago
      // Por ahora simulamos un proceso de pago
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generar código único para la reserva (6 caracteres alfanuméricos)
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      setBookingCode(code);
      
      
      // Mostrar modal de éxito
      setShowSuccess(true);
    } catch (error) {
      console.error('Error en el pago:', error);
      toast.error('Error al procesar el pago. Por favor, intenta nuevamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (showSuccess) {
    return (
      <PaymentSuccessModal
        isOpen={true}
        onClose={onClose}
        bookingData={bookingData}
        bookingCode={bookingCode}
      />
    );
  }

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-card rounded-xl shadow-xl p-6 w-full max-w-md m-4"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>

          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faCreditCard} className="text-2xl text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Confirmar Pago</h2>
            <p className="text-muted-foreground mt-2">
              Completa tu reserva realizando el pago
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-accent rounded-lg p-4">
              <h3 className="font-semibold mb-2">Detalles de la Reserva</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-muted-foreground">Cancha:</span>{' '}
                  {bookingData.court?.name}
                </p>
                <p>
                  <span className="text-muted-foreground">Fecha:</span>{' '}
                  {bookingData.date?.toLocaleDateString('es-CL')}
                </p>
                <p>
                  <span className="text-muted-foreground">Hora:</span>{' '}
                  {bookingData.time}
                </p>
                <p className="text-lg font-semibold mt-4">
                  Total: ${bookingData.court?.price.toLocaleString('es-CL')}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center space-x-2">
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                <span>Procesando...</span>
              </span>
            ) : (
              'Pagar con Flow'
            )}
          </button>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Pago seguro procesado por Flow
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PaymentModal;