import axios from 'axios';

const API_URL = 'https://canchas-matices.fly.dev/api';

// Configurar interceptor para añadir el token a todas las peticiones
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth-storage') ? 
      JSON.parse(localStorage.getItem('auth-storage')!).state.token : 
      null;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const apiService = {
  // Usuarios
  async getUsers() {
    const response = await axios.get(`${API_URL}/usuarios`);
    return response.data;
  },

  async getUserProfile(rut: string) {
    const response = await axios.get(`${API_URL}/usuarios/${rut}`);
    return response.data;
  },

  // Canchas
  async getCourts() {
    const response = await axios.get(`${API_URL}/canchas`);
    return response.data;
  },

  // Reservas
  async getBookings(params?: any) {
    const response = await axios.get(`${API_URL}/reservas`, { params });
    return response.data;
  },

  async createBooking(data: any) {
    const response = await axios.post(`${API_URL}/reservas`, data);
    return response.data;
  },

  // Pagos
  async getPayments(params?: any) {
    const response = await axios.get(`${API_URL}/pagos`, { params });
    return response.data;
  },

  // Estadísticas
  async getDashboardStats() {
    const response = await axios.get(`${API_URL}/estadisticas/dashboard`);
    return response.data;
  },

  // Notificaciones
  async getNotifications() {
    const response = await axios.get(`${API_URL}/notificaciones`);
    return response.data;
  },

  // Manejo de errores genérico
  handleError(error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Error en la solicitud');
    }
    throw error;
  }
};