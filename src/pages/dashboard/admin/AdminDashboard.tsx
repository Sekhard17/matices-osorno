import { Routes, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUsers,
  faFutbol,
  faCog,
  faChartLine,
  faReceipt,
  faCalendarCheck,
  faClipboardList,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import DashboardLayout from '@/layouts/DashboardLayout';
import Overview from './Overview';
import UserManagement from './UserManagement';
import CourtManagement from './CourtManagement';
import Settings from './Settings';
import Bookings from './Bookings';
import Reports from './Reports';
import Profile from './Profile';

const AdminDashboard = () => {
  const sidebarItems = [
    { icon: faHome, label: 'Vista General', path: '/admin' },
    { icon: faUsers, label: 'Usuarios', path: '/admin/users' },
    { icon: faFutbol, label: 'Canchas', path: '/admin/courts' },
    { icon: faCalendarCheck, label: 'Reservas', path: '/admin/bookings' },
    { icon: faChartLine, label: 'Reportes', path: '/admin/reports' },
    { icon: faReceipt, label: 'Tarifas', path: '/admin/pricing' },
    { icon: faClipboardList, label: 'Auditorías', path: '/admin/audits' },
    { icon: faUser, label: 'Mi Perfil', path: '/admin/profile' },
    { icon: faCog, label: 'Configuración', path: '/admin/settings' },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="Panel de Administración">
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/courts" element={<CourtManagement />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </DashboardLayout>
  );
};

export default AdminDashboard;