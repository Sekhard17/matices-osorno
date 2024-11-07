import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faCalendarCheck,
  faMoneyBillWave,
  faChartLine,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import AreaChartComponent from '@/components/charts/AreaChartComponent';
import PieChartComponent from '@/components/charts/PieChartComponent';

const Overview = () => {
  // Datos de ejemplo para las gráficas
  const revenueData = [
    { name: 'Ene', value: 1200000 },
    { name: 'Feb', value: 1500000 },
    { name: 'Mar', value: 1800000 },
    { name: 'Abr', value: 1600000 },
    { name: 'May', value: 2100000 },
    { name: 'Jun', value: 2400000 },
  ];

  const bookingDistribution = [
    { name: 'Baby Fútbol', value: 60 },
    { name: 'Futbolito', value: 40 },
  ];

  const stats = [
    {
      title: 'Usuarios Activos',
      value: '2,845',
      increase: '+12.5%',
      icon: faUsers,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Reservas del Mes',
      value: '486',
      increase: '+8.2%',
      icon: faCalendarCheck,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
    },
    {
      title: 'Ingresos Mensuales',
      value: '$2.4M',
      increase: '+15.3%',
      icon: faMoneyBillWave,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'Tasa de Ocupación',
      value: '78%',
      increase: '+5.4%',
      icon: faChartLine,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
    },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
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
              <span className="text-sm text-emerald-500 font-medium">
                {stat.increase}
              </span>
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl shadow-md p-6 lg:col-span-2"
        >
          <h3 className="text-lg font-semibold mb-4">Ingresos Mensuales</h3>
          <div className="h-[300px]">
            <AreaChartComponent 
              data={revenueData}
              formatter={formatCurrency}
              gradientId="revenueGradient"
              strokeColor="#10B981"
              fillColor="#10B981"
            />
          </div>
        </motion.div>

        {/* Distribution Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl shadow-md p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Distribución de Reservas</h3>
          <div className="h-[300px]">
            <PieChartComponent 
              data={bookingDistribution}
              colors={['#10B981', '#3B82F6']}
              formatter={(value) => `${value}%`}
            />
          </div>
        </motion.div>
      </div>

      {/* Alerts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-xl shadow-md p-6"
      >
        <h3 className="text-lg font-semibold mb-4">Alertas del Sistema</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-amber-500/10 rounded-lg">
            <div className="text-amber-500">
              <FontAwesomeIcon icon={faExclamationTriangle} className="text-xl" />
            </div>
            <div>
              <h4 className="font-medium">Mantenimiento Programado</h4>
              <p className="text-sm text-muted-foreground">
                Cancha 2 requiere mantenimiento el próximo fin de semana
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Overview;