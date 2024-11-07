// Tipos base
export interface User {
  rut: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono?: string;
  fecha_registro: string;
  estado: 'activo' | 'inactivo';
  rol: string;
}

export interface Court {
  id_cancha: number;
  nombre: string;
  ubicacion: string;
  tipo: string;
}

export interface Booking {
  id_reserva: number;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  estado: 'pendiente' | 'confirmada' | 'cancelada';
  id_cancha: number;
  rut_usuario: string;
  cancha?: Court;
  usuario?: User;
}

export interface Payment {
  id_pago: number;
  monto: number;
  fecha_pago: string;
  metodo_pago: string;
  estado: 'procesado' | 'fallido' | 'pendiente';
  id_reserva: number;
  id_ganancia: number;
  rut_usuario: string;
}

export interface Revenue {
  id_ganancia: number;
  numero_reservas: number;
  periodo: string;
  monto_total: number;
  fecha: string;
}

export interface Notification {
  id_notificacion: number;
  titulo: string;
  mensaje: string;
  estado: 'leído' | 'no leído';
  rut_usuario: string;
}

// Tipos para estadísticas y resúmenes
export interface DashboardStats {
  totalBookings: number;
  totalRevenue: number;
  activeUsers: number;
  occupancyRate: number;
}

export interface BookingSummary {
  total: number;
  confirmed: number;
  pending: number;
  cancelled: number;
}

export interface RevenueSummary {
  daily: number;
  weekly: number;
  monthly: number;
  yearly: number;
}