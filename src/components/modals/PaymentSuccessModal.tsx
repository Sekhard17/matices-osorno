import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import type { BookingData } from '@/pages/booking/BookingPage';

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: BookingData;
  bookingCode: string;
}

const PaymentSuccessModal = ({ isOpen, onClose, bookingData, bookingCode }: PaymentSuccessModalProps) => {
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
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faCheckCircle} className="text-3xl text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold">¡Pago Exitoso!</h2>
            <p className="text-muted-foreground mt-2">
              Tu reserva ha sido confirmada
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex flex-col items-center justify-center bg-accent rounded-lg p-6">
              <img 
                src="/qr-placeholder.png" 
                alt="QR Code"
                className="w-48 h-48 mb-4"
              />
              <div className="text-2xl font-mono font-bold text-primary">
                #{bookingCode}
              </div>
            </div>

            <div className="bg-accent/50 rounded-lg p-4">
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
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 px-4 rounded-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Cerrar
          </button>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Presenta este código al llegar a la cancha
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PaymentSuccessModal;