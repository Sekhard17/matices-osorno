import { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faEnvelope, 
  faIdCard, 
  faEye,
  faEyeSlash,
  faFutbol
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

// Definir la estructura de datos de `formData`
interface FormData {
  nombre: string;
  apellido: string;
  correo: string; // Cambiado a 'correo' para que coincida con el backend
  rut: string;
  contraseña: string; // Cambiado a 'contraseña' para que coincida con el backend
  confirmPassword: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    apellido: '',
    correo: '', // Cambiado a 'correo' para que coincida con el backend
    rut: '',
    contraseña: '', // Cambiado a 'contraseña' para que coincida con el backend
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Función para formatear el RUT
  const formatRut = (value: string): string => {
    const cleanRut = value.replace(/[^\dkK]/g, '').toUpperCase();
    if (cleanRut.length <= 1) return cleanRut;
    return `${cleanRut.slice(0, -1).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}-${
      cleanRut.slice(-1)
    }`;
  };

  // Función para capitalizar palabras
  const capitalizeWords = (value: string): string => {
    return value
      .toLowerCase()
      .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
  };

  // Cambios de estado tipados para evitar `any` implícito
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    // Formato y capitalización de RUT, nombre y apellido
    let formattedValue = value;
    if (name === 'rut') formattedValue = formatRut(value);
    if (name === 'nombre' || name === 'apellido') formattedValue = capitalizeWords(value);

    setFormData((prevData) => ({
      ...prevData,
      [name]: formattedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    // Validación de campos vacíos
    if (Object.values(formData).some((field) => field === '')) {
      toast.error('Todos los campos deben ser completados');
      return;
    }

    if (formData.contraseña !== formData.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    try {
      // Mapeo de datos para el backend
      const mappedFormData = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        correo: formData.correo,
        rut: formData.rut,
        contraseña: formData.contraseña,
      };

      const response = await axios.post('https://canchas-matices.fly.dev/api/usuarios', mappedFormData);

      if (response.data) {
        toast.success('¡Registro exitoso! Por favor, inicia sesión.');
        navigate('/login');
      }
    } catch (error) {
      toast.error('Error al registrar. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-emerald-500 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faFutbol} className="text-3xl text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Únete a Matices Fútbol
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Crea tu cuenta y comienza a jugar
          </p>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Por favor, proporciona datos reales para garantizar la transparencia y seguridad de todos los usuarios.
                Tu información será tratada con confidencialidad.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Nombre
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  name="nombre"
                  required
                  value={formData.nombre}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 dark:text-white" // Color de texto ajustado
                  placeholder="Juan"
                />
                <FontAwesomeIcon 
                  icon={faUser} 
                  className="absolute right-3 top-3.5 text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Apellido
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  name="apellido"
                  required
                  value={formData.apellido}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 dark:text-white" // Color de texto ajustado
                  placeholder="Pérez"
                />
                <FontAwesomeIcon 
                  icon={faUser} 
                  className="absolute right-3 top-3.5 text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Correo electrónico
              </label>
              <div className="mt-1 relative">
                <input
                  type="email"
                  name="correo"
                  required
                  value={formData.correo}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 dark:text-white" // Color de texto ajustado
                  placeholder="tu@ejemplo.com"
                />
                <FontAwesomeIcon 
                  icon={faEnvelope} 
                  className="absolute right-3 top-3.5 text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                RUT
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  name="rut"
                  required
                  value={formData.rut}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 dark:text-white" // Color de texto ajustado
                  placeholder="12.345.678-9"
                />
                <FontAwesomeIcon 
                  icon={faIdCard} 
                  className="absolute right-3 top-3.5 text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Contraseña
              </label>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="contraseña"
                  required
                  value={formData.contraseña}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 dark:text-white" // Color de texto ajustado
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirmar Contraseña
              </label>
              <div className="mt-1 relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 dark:text-white" // Color de texto ajustado
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
              loading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="font-medium text-emerald-500 hover:text-emerald-400">
              Inicia sesión
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
