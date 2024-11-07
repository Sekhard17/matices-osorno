import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarCheck,
  faCalendarPlus,
  faReceipt,
  faCircleCheck,
  faSpinner,
  faCircleXmark,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useBookings } from '@/hooks/useApi';
import { useAuth } from '@/hooks/useAuth';
import type { Booking } from '@/types/api.types';
import LoadingScreen from '@/components/LoadingScreen';

const Overview = () => {
  const { user } = useAuth();
  const { getBookings, isLoading, error } = useBookings();
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    hoursPlayed: 0,
    totalSpent: 0
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user?.id) return;

      // Cargar reservas próximas
      const upcoming = await getBookings({
        userId: user.id,
        status: 'confirmada'
      });
      if (upcoming) {
        setUpcomingBookings(upcoming.slice(0, 3));
      }

      // Cargar reservas recientes
      const recent = await getBookings({
        userId: user.id,
        status: 'completada'
      });
      if (recent) {
        setRecentBookings(recent.slice(0, 3));
      }

      // Calcular estadísticas
      if (upcoming && recent) {
        const allBookings = [...upcoming, ...recent];
        setStats({
          totalBookings: allBookings.length,
          hoursPlayed: allBookings.reduce((acc, booking) => {
            const start = new Date(`2000-01-01T${booking.hora_inicio}`);
            const end = new Date(`2000-01-01T${booking.hora_fin}`);
            const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
            return acc + hours;
          }, 0),
          totalSpent: allBookings.reduce((acc, booking) => acc + 20000, 0) // Precio fijo por ahora
        });
      }
    };

    loadDashboardData();
  }, [user, getBookings]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
        Error al cargar los datos: {error}
      </div>
    );
  }

  const statsData = [
    {
      title: 'Reservas Totales',
      value: stats.totalBookings.toString(),
      icon: faCalendarCheck,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10'
    },
    {
      title: 'Horas Jugadas',
      value: stats.hoursPlayed.toString(),
      icon: faCalendarCheck,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Total Gastado',
      value: `$${stats.totalSpent.toLocaleString('es-CL')}`,
      icon: faReceipt,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmada':
        return 'text-emerald-500 bg-emerald-500/10';
      case 'pendiente':
        return 'text-amber-500 bg-amber-500/10';
      case 'completada':
        return 'text-blue-500 bg-blue-500/10';
      case 'cancelada':
        return 'text-red-500 bg-red-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmada':
      case 'completada':
        return faCircleCheck;
      case 'pendiente':
        return faSpinner;
      case 'cancelada':
        return faCircleXmark;
      default:
        return faCalendarCheck;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmada':
        return 'Confirmada';
      case 'pendiente':
        return 'Pendiente';
      case 'completada':
        return 'Completada';
      case 'cancelada':
        return 'Cancelada';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsData.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between">
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <FontAwesomeIcon 
                  icon={stat.icon} 
                  className={`text-xl ${stat.color}`} 
                />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </h3>
              <p className="text-2xl font-bold mt-1">
                {stat.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-xl shadow-md p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Acciones Rápidas</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/booking"
            className="flex items-center justify-between p-4 bg-accent rounded-lg hover:bg-accent/80 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <FontAwesomeIcon icon={faCalendarPlus} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Nueva Reserva</h3>
                <p className="text-sm text-muted-foreground">
                  Reserva tu próximo partido
                </p>
              </div>
            </div>
            <FontAwesomeIcon icon={faChevronRight} className="text-muted-foreground" />
          </Link>

          <Link
            to="/client/history"
            className="flex items-center justify-between p-4 bg-accent rounded-lg hover:bg-accent/80 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <FontAwesomeIcon icon={faCalendarCheck} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Mis Reservas</h3>
                <p className="text-sm text-muted-foreground">
                  Ver historial de reservas
                </p>
              </div>
            </div>
            <FontAwesomeIcon icon={faChevronRight} className="text-muted-foreground" />
          </Link>
        </div>
      </motion.div>

      {/* Upcoming Bookings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-xl shadow-md p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Próximas Reservas</h2>
          <Link
            to="/client/history"
            className="text-sm text-primary hover:text-primary/80"
          >
            Ver todas
          </Link>
        </div>
        <div className="space-y-4">
          {upcomingBookings.map((booking) => (
            <div
              key={booking.id_reserva}
              className="flex items-center justify-between p-4 bg-accent rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${getStatusColor(booking.estado)}`}>
                  <FontAwesomeIcon 
                    icon={getStatusIcon(booking.estado)} 
                    className="text-lg" 
                  />
                </div>
                <div>
                  <h3 className="font-medium">{booking.cancha?.nombre}</h3>
                  <p className="text-sm text-muted-foreground">
                    {booking.fecha} - {booking.hora_inicio}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(booking.estado)}`}>
                {getStatusText(booking.estado)}
              </span>
            </div>
          ))}
          {upcomingBookings.length === 0 && (
            <p className="text-center text-muted-foreground py-4">
              No tienes reservas próximas
            </p>
          )}
        </div>
      </motion.div>

      {/* Recent Bookings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-xl shadow-md p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Reservas Recientes</h2>
          <Link
            to="/client/history"
            className="text-sm text-primary hover:text-primary/80"
          >
            Ver todas
          </Link>
        </div>
        <div className="space-y-4">
          {recentBookings.map((booking) => (
            <div
              key={booking.id_reserva}
              className="flex items-center justify-between p-4 bg-accent rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${getStatusColor(booking.estado)}`}>
                  <FontAwesomeIcon 
                    icon={getStatusIcon(booking.estado)} 
                    className="text-lg" 
                  />
                </div>
                <div>
                  <h3 className="font-medium">{booking.cancha?.nombre}</h3>
                  <p className="text-sm text-muted-foreground">
                    {booking.fecha} - {booking.hora_inicio}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(booking.estado)}`}>
                {getStatusText(booking.estado)}
              </span>
            </div>
          ))}
          {recentBookings.length === 0 && (
            <p className="text-center text-muted-foreground py-4">
              No tienes reservas recientes
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Overview;