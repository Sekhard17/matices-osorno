import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarCheck, 
  faCircleCheck, 
  faCircleXmark,
  faSpinner,
  faEye
} from '@fortawesome/free-solid-svg-icons';

const BookingHistory = () => {
  // Datos de ejemplo
  const bookings = [
    {
      id: 1,
      court: 'Baby Fútbol 1',
      date: '2024-02-20',
      time: '18:00',
      status: 'completed',
      price: 20000
    },
    {
      id: 2,
      court: 'Futbolito 1',
      date: '2024-02-25',
      time: '19:00',
      status: 'upcoming',
      price: 25000
    },
    {
      id: 3,
      court: 'Baby Fútbol 2',
      date: '2024-02-15',
      time: '20:00',
      status: 'cancelled',
      price: 20000
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-emerald-500 bg-emerald-500/10';
      case 'upcoming':
        return 'text-blue-500 bg-blue-500/10';
      case 'cancelled':
        return 'text-red-500 bg-red-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return faCircleCheck;
      case 'upcoming':
        return faSpinner;
      case 'cancelled':
        return faCircleXmark;
      default:
        return faCalendarCheck;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completada';
      case 'upcoming':
        return 'Próxima';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Historial de Reservas</h2>
        <div className="flex space-x-2">
          <select className="bg-card border border-border rounded-lg px-4 py-2 text-sm">
            <option>Todos los estados</option>
            <option>Completadas</option>
            <option>Próximas</option>
            <option>Canceladas</option>
          </select>
          <select className="bg-card border border-border rounded-lg px-4 py-2 text-sm">
            <option>Todas las canchas</option>
            <option>Baby Fútbol</option>
            <option>Futbolito</option>
          </select>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium">Cancha</th>
                <th className="text-left p-4 font-medium">Fecha</th>
                <th className="text-left p-4 font-medium">Hora</th>
                <th className="text-left p-4 font-medium">Estado</th>
                <th className="text-right p-4 font-medium">Precio</th>
                <th className="text-center p-4 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <motion.tr
                  key={booking.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-border last:border-0 hover:bg-accent/50 transition-colors"
                >
                  <td className="p-4">{booking.court}</td>
                  <td className="p-4">{booking.date}</td>
                  <td className="p-4">{booking.time}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${getStatusColor(booking.status)}`}>
                      <FontAwesomeIcon icon={getStatusIcon(booking.status)} />
                      <span>{getStatusText(booking.status)}</span>
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    ${booking.price.toLocaleString('es-CL')}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center space-x-2">
                      <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                        <FontAwesomeIcon icon={faEye} className="text-primary" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;