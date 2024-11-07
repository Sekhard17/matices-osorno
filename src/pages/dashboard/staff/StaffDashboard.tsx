import { Routes, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faFutbol,
  faCalendarCheck,
  faClipboardList,
  faTools,
  faBell,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import DashboardLayout from '@/layouts/DashboardLayout';
import Overview from './Overview';
import CourtManagement from './CourtManagement';
import BookingManagement from './BookingManagement';
import MaintenanceSchedule from './MaintenanceSchedule';
import Notifications from './Notifications';
import Profile from './Profile';

const StaffDashboard = () => {
  const sidebarItems = [
    { icon: faHome, label: 'Vista General', path: '/staff' },
    { icon: faFutbol, label: 'Estado de Canchas', path: '/staff/courts' },
    { icon: faCalendarCheck, label: 'Gestión de Reservas', path: '/staff/bookings' },
    { icon: faTools, label: 'Mantenimiento', path: '/staff/maintenance' },
    { icon: faClipboardList, label: 'Reportes Diarios', path: '/staff/reports' },
    { icon: faUser, label: 'Mi Perfil', path: '/staff/profile' },
    { icon: faBell, label: 'Notificaciones', path: '/staff/notifications' },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="Panel de Encargado">
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/courts" element={<CourtManagement />} />
        <Route path="/bookings" element={<BookingManagement />} />
        <Route path="/maintenance" element={<MaintenanceSchedule />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </DashboardLayout>
  );
};

export default StaffDashboard;