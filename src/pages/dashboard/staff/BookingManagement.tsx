import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarCheck,
  faCircleCheck,
  faCircleXmark,
  faSpinner,
  faEye,
  faCheck,
  faTimes,
  faPhone,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';

const BookingManagement = () => {
  // Datos de ejemplo
  const bookings = [
    {
      id: 1,
      court: 'Baby Fútbol 1',
      date: '2024-02-20',
      time: '18:00',
      status: 'pending',
      price: 20000,
      client: {
        name: 'Juan Pérez',
        phone: '+56 9 1234 5678',
        email: 'juan@example.com'
      }
    },
    {
      id: 2,
      court: 'Futbolito 1',
      date: '2024-02-20',
      time: '19:00',
      status: 'confirmed',
      price: 25000,
      client: {
        name: 'María González',
        phone: '+56 9 8765 4321',
        email: 'maria@example.com'
      }
    },
    {
      id: 3,
      court: 'Baby Fútbol 2',
      date: '2024-02-20',
      time: '20:00',
      status: 'cancelled',
      price: 20000,
      client: {
        name: 'Carlos Rodríguez',
        phone: '+56 9 2468 1357',
        email: 'carlos@example.com'
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-emerald-500 bg-emerald-500/10';
      case 'pending':
        return 'text-amber-500 bg-amber-500/10';
      case 'cancelled':
        return 'text-red-500 bg-red-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return faCircleCheck;
      case 'pending':
        return faSpinner;
      case 'cancelled':
        return faCircleXmark;
      default:
        return faCalendarCheck;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmada';
      case 'pending':
        return 'Pendiente';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestión de Reservas</h2>
        <div className="flex space-x-2">
          <select className="bg-card border border-border rounded-lg px-4 py-2 text-sm">
            <option>Todos los estados</option>
            <option>Pendientes</option>
            <option>Confirmadas</option>
            <option>Canceladas</option>
          </select>
          <input
            type="date"
            className="bg-card border border-border rounded-lg px-4 py-2 text-sm"
          />
        </div>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-semibold">{booking.court}</h3>
                  <p className="text-sm text-muted-foreground">
                    {booking.date} - {booking.time}
                  </p>
                </div>
                <span className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${getStatusColor(booking.status)}`}>
                  <FontAwesomeIcon icon={getStatusIcon(booking.status)} />
                  <span>{getStatusText(booking.status)}</span>
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Cliente</p>
                    <p className="text-lg">{booking.client.name}</p>
                  </div>
                  <div className="flex space-x-4">
                    <a 
                      href={`tel:${booking.client.phone}`}
                      className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80"
                    >
                      <FontAwesomeIcon icon={faPhone} />
                      <span>{booking.client.phone}</span>
                    </a>
                    <a
                      href={`mailto:${booking.client.email}`}
                      className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80"
                    >
                      <FontAwesomeIcon icon={faEnvelope} />
                      <span>{booking.client.email}</span>
                    </a>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Precio</p>
                    <p className="text-lg font-semibold">
                      ${booking.price.toLocaleString('es-CL')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-accent border-t border-border flex justify-between items-center">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-accent transition-colors">
                <FontAwesomeIcon icon={faEye} />
                <span>Ver Detalles</span>
              </button>

              {booking.status === 'pending' && (
                <div className="flex space-x-2">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors">
                    <FontAwesomeIcon icon={faTimes} />
                    <span>Rechazar</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                    <FontAwesomeIcon icon={faCheck} />
                    <span>Confirmar</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BookingManagement;