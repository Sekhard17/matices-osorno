import { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faUserPlus,
  faEdit,
  faTrash,
  faUserShield,
  faUserCog,
  faUserCheck,
  faSearch,
  faFilter
} from '@fortawesome/free-solid-svg-icons';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  // Datos de ejemplo
  const users = [
    {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan@example.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-02-20 14:30',
      bookings: 15
    },
    {
      id: 2,
      name: 'María González',
      email: 'maria@example.com',
      role: 'staff',
      status: 'active',
      lastLogin: '2024-02-19 16:45',
      bookings: 0
    },
    {
      id: 3,
      name: 'Carlos Rodríguez',
      email: 'carlos@example.com',
      role: 'client',
      status: 'inactive',
      lastLogin: '2024-02-15 10:20',
      bookings: 8
    }
  ];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return faUserShield;
      case 'staff':
        return faUserCog;
      case 'client':
        return faUserCheck;
      default:
        return faUser;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'text-purple-500 bg-purple-500/10';
      case 'staff':
        return 'text-blue-500 bg-blue-500/10';
      case 'client':
        return 'text-emerald-500 bg-emerald-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'text-emerald-500' 
      : 'text-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestión de Usuarios</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
          <FontAwesomeIcon icon={faUserPlus} />
          <span>Nuevo Usuario</span>
        </button>
      </div>

      <div className="bg-card rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <FontAwesomeIcon 
              icon={faSearch} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faFilter} className="text-muted-foreground" />
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="bg-background border border-border rounded-lg px-4 py-2"
              >
                <option value="all">Todos los roles</option>
                <option value="admin">Administradores</option>
                <option value="staff">Encargados</option>
                <option value="client">Clientes</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium">Usuario</th>
                <th className="text-left p-4 font-medium">Rol</th>
                <th className="text-left p-4 font-medium">Estado</th>
                <th className="text-left p-4 font-medium">Último Acceso</th>
                <th className="text-right p-4 font-medium">Reservas</th>
                <th className="text-center p-4 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-border last:border-0"
                >
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faUser} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${getRoleColor(user.role)}`}>
                      <FontAwesomeIcon icon={getRoleIcon(user.role)} />
                      <span className="capitalize">{user.role}</span>
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={getStatusColor(user.status)}>
                      {user.status === 'active' ? '● Activo' : '● Inactivo'}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground">
                    {user.lastLogin}
                  </td>
                  <td className="p-4 text-right">
                    {user.bookings}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center space-x-2">
                      <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                        <FontAwesomeIcon icon={faEdit} className="text-primary" />
                      </button>
                      <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                        <FontAwesomeIcon icon={faTrash} className="text-destructive" />
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

export default UserManagement;