import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFutbol,
  faCircleCheck,
  faCircleXmark,
  faTools,
  faLightbulb,
  faDroplet,
  faBroom,
  faTriangleExclamation
} from '@fortawesome/free-solid-svg-icons';

const CourtManagement = () => {
  // Datos de ejemplo
  const courts = [
    {
      id: 1,
      name: 'Baby Fútbol 1',
      type: 'Baby Fútbol',
      location: 'Rahue Alto',
      status: 'active',
      lastMaintenance: '2024-02-15',
      nextMaintenance: '2024-03-15',
      issues: [],
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
      status: 'maintenance',
      lastMaintenance: '2024-02-10',
      nextMaintenance: '2024-02-25',
      issues: ['Iluminación requiere ajuste'],
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
      status: 'active',
      lastMaintenance: '2024-02-18',
      nextMaintenance: '2024-03-18',
      issues: [],
      systems: {
        lighting: 'ok',
        irrigation: 'ok',
        surface: 'ok',
        nets: 'ok'
      }
    },
    {
      id: 4,
      name: 'Futbolito 2',
      type: 'Futbolito',
      location: 'Pedro Montt',
      status: 'issue',
      lastMaintenance: '2024-02-12',
      nextMaintenance: '2024-03-12',
      issues: ['Sistema de riego necesita revisión'],
      systems: {
        lighting: 'ok',
        irrigation: 'error',
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
      case 'issue':
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
      case 'issue':
        return faCircleXmark;
      default:
        return faFutbol;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activa';
      case 'maintenance':
        return 'En Mantenimiento';
      case 'issue':
        return 'Problema';
      default:
        return status;
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
        <h2 className="text-2xl font-bold">Estado de Canchas</h2>
        <div className="flex space-x-2">
          <select className="bg-card border border-border rounded-lg px-4 py-2 text-sm">
            <option>Todas las ubicaciones</option>
            <option>Rahue Alto</option>
            <option>Pedro Montt</option>
          </select>
          <select className="bg-card border border-border rounded-lg px-4 py-2 text-sm">
            <option>Todos los tipos</option>
            <option>Baby Fútbol</option>
            <option>Futbolito</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {courts.map((court) => (
          <motion.div
            key={court.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{court.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {court.type} - {court.location}
                  </p>
                </div>
                <span className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${getStatusColor(court.status)}`}>
                  <FontAwesomeIcon icon={getStatusIcon(court.status)} />
                  <span>{getStatusText(court.status)}</span>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Último mantenimiento</p>
                  <p className="font-medium">{court.lastMaintenance}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Próximo mantenimiento</p>
                  <p className="font-medium">{court.nextMaintenance}</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 p-4 bg-accent rounded-lg mb-4">
                {Object.entries(court.systems).map(([system, status]) => (
                  <div key={system} className="text-center">
                    <FontAwesomeIcon 
                      icon={getSystemIcon(system)} 
                      className={`text-xl mb-2 ${getSystemStatus(status)}`}
                    />
                    <p className="text-xs capitalize">{system}</p>
                  </div>
                ))}
              </div>

              {court.issues.length > 0 && (
                <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <FontAwesomeIcon icon={faTriangleExclamation} />
                    <span className="font-medium">Problemas Detectados</span>
                  </div>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {court.issues.map((issue, index) => (
                      <li key={index}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="px-6 py-4 bg-accent border-t border-border flex justify-end space-x-2">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Reportar Problema
              </button>
              <button className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
                Ver Historial
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CourtManagement;