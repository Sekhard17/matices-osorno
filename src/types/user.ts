export interface User {
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono?: string;
  rol: 'Administrador' | 'Encargado' | 'Cliente';
  estado: 'activo' | 'inactivo';
  fecha_registro: string;
}

export interface UpdateUserData {
  nombre?: string;
  apellido?: string;
  correo?: string;
  telefono?: string;
  contraseñaActual?: string;
  nuevaContraseña?: string;
}