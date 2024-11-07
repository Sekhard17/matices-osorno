import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faSignOutAlt,
  faUser,
  faMoon,
  faSun
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/use-theme';

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarItems: {
    icon: any;
    label: string;
    path: string;
  }[];
  title: string;
}

const DashboardLayout = ({ children, sidebarItems, title }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { logout, user } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-card border-r border-border w-64">
          <div className="flex items-center justify-between mb-6 px-2">
            <span className="text-xl font-bold">Matices</span>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden text-muted-foreground hover:text-foreground"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="flex items-center px-2 py-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
              >
                <FontAwesomeIcon icon={item.icon} className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={toggleTheme}
                className="text-muted-foreground hover:text-foreground"
              >
                <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
              </button>
              <button
                onClick={handleLogout}
                className="text-destructive hover:text-destructive/80"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
              </button>
            </div>
            {user && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faUser} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {user.nombre} {user.apellido}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.correo}
                  </p>
                  <p className="text-xs text-primary truncate">
                    {user.rol}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className={`p-4 md:ml-64`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden text-muted-foreground hover:text-foreground"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;