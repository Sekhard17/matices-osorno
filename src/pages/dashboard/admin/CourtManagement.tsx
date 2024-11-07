import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFutbol,
  faPlus,
  faEdit,
  faTrash,
  faCircleCheck,
  faCircleXmark,
  faTools,
  faLightbulb,
  faDroplet,
  faBroom,
  faShield
} from '@fortawesome/free-solid-svg-icons';

const CourtManagement = () => {
  // Datos de ejemplo
  const courts = [
    {
      id: 1,
      name: 'Baby Fútbol 1',
      type: 'Baby Fútbol',
      location: 'Rahue Alto',
      price: 20000,
      status: 'active',
      lastMaintenance: '2024-02-15',
      nextMaintenance: '2024-03-15',
      bookingsToday: 5,
      totalBookings: 150,
      revenue: 3000000,
      systems: {
        lighting: 'ok',
        irrigation: 'ok',
        surface: 'ok',
        nets: 'ok'
      }
    },
    {
      id: 2,
      name: 'Baby Fútbol 2',
      type: 'Baby Fútbol',
      location: 'Rahue Alto',
      price: 20000,
      status: 'maintenance',
      lastMaintenance: '2024-02-10',
      nextMaintenance: '2024-02-25',
      bookingsToday: 0,
      totalBookings: 145,
      revenue: 2900000,
      systems: {
        lighting: 'warning',
        irrigation: 'ok',
        surface: 'ok',
        nets: 'ok'
      }
    },
    {
      id: 3,
      name: 'Futbolito 1',
      type: 'Futbolito',
      location: 'Pedro Montt',
      price: 25000,
      status: 'active',
      lastMaintenance: '2024-02-18',
      nextMaintenance: '2024-03-18',
      bookingsToday: 4,
      totalBookings: 120,
      revenue: 3000000,
      systems: {
        lighting: 'ok',
        irrigation: 'ok',
        surface: 'ok',
        nets: 'ok'
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-emerald-500 bg-emerald-500/10';
      case 'maintenance':
        return 'text-amber-500 bg-amber-500/10';
      case 'inactive':
        return 'text-red-500 bg-red-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return faCircleCheck;
      case 'maintenance':
        return faTools;
      case 'inactive':
        return faCircleXmark;
      default:
        return faFutbol;
    }
  };

  const getSystemIcon = (system: string) => {
    switch (system) {
      case 'lighting':
        return faLightbulb;
      case 'irrigation':
        return faDroplet;
      case 'surface':
        return faBroom;
      case 'nets':
        return faShield;
      default:
        return faTools;
    }
  };

  const getSystemStatus = (status: string) => {
    switch (status) {
      case 'ok':
        return 'text-emerald-500';
      case 'warning':
        return 'text-amber-500';
      case 'error':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestión de Canchas</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
          <FontAwesomeIcon icon={faPlus} />
          <span>Nueva Cancha</span>
        </button>
      </div>

      <div className="grid gap-6">
        {courts.map((court) => (
          <motion.div
            key={court.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${getStatusColor(court.status)}`}>
                    <FontAwesomeIcon icon={getStatusIcon(court.status)} className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{court.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {court.type} - {court.location}
                    </p>
                  </div>
                </div>
                <div className="text-xl font-bold text-primary">
                  ${court.price.toLocaleString('es-CL')}/hr
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Estado de Sistemas</p>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(court.systems).map(([system, status]) => (
                        <div key={system} className="flex items-center space-x-2">
                          <FontAwesomeIcon 
                            icon={getSystemIcon(system)} 
                            className={getSystemStatus(status)}
                          />
                          <span className="capitalize text-sm">{system}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Mantenimiento</p>
                    <div className="space-y-2">
                      <p className="text-sm">
                        Último: <span className="font-medium">{court.lastMaintenance}</span>
                      </p>
                      <p className="text-sm">
                        Próximo: <span className="font-medium">{court.nextMaintenance}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Estadísticas</p>
                    <div className="space-y-2">
                      <p className="text-sm">
                        Reservas hoy: <span className="font-medium">{court.bookingsToday}</span>
                      </p>
                      <p className="text-sm">
                        Total reservas: <span className="font-medium">{court.totalBookings}</span>
                      </p>
                      <p className="text-sm">
                        Ingresos: <span className="font-medium">${court.revenue.toLocaleString('es-CL')}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-accent border-t border-border flex justify-end space-x-2">
              <button className="flex items-center space-x-2 px-4 py-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
                <FontAwesomeIcon icon={faEdit} />
                <span>Editar</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                <FontAwesomeIcon icon={faTrash} />
                <span>Eliminar</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CourtManagement;