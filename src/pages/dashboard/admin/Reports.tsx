import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartLine,
  faChartBar,
  faChartPie,
  faDownload,
  faFilter
} from '@fortawesome/free-solid-svg-icons';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const Reports = () => {
  // Datos de ejemplo
  const revenueData = [
    { month: 'Ene', revenue: 4500000, bookings: 180 },
    { month: 'Feb', revenue: 5200000, bookings: 210 },
    { month: 'Mar', revenue: 4800000, bookings: 195 },
    { month: 'Abr', revenue: 6100000, bookings: 245 },
    { month: 'May', revenue: 5800000, bookings: 230 },
    { month: 'Jun', revenue: 6500000, bookings: 260 }
  ];

  const courtUsageData = [
    { name: 'Baby Fútbol 1', usage: 85 },
    { name: 'Baby Fútbol 2', usage: 78 },
    { name: 'Futbolito 1', usage: 92 },
    { name: 'Futbolito 2', usage: 88 }
  ];

  const timeDistributionData = [
    { name: '15:00-17:00', value: 20 },
    { name: '17:00-19:00', value: 35 },
    { name: '19:00-21:00', value: 30 },
    { name: '21:00-23:00', value: 15 }
  ];

  const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B'];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Reportes y Estadísticas</h2>
        <div className="flex space-x-2">
          <select className="bg-card border border-border rounded-lg px-4 py-2">
            <option>Últimos 6 meses</option>
            <option>Último mes</option>
            <option>Último año</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            <FontAwesomeIcon icon={faDownload} />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Ingresos y Reservas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl shadow-md p-6"
        >
          <h3 className="text-lg font-semibold mb-6">Ingresos y Reservas</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" />
                <YAxis 
                  yAxisId="left"
                  tickFormatter={formatCurrency}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right"
                  tickFormatter={(value) => `${value} res.`}
                />
                <Tooltip />
                <Legend />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  name="Ingresos"
                  stroke="#10B981"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="bookings"
                  name="Reservas"
                  stroke="#3B82F6"
                  fillOpacity={1}
                  fill="url(#colorBookings)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Uso de Canchas y Distribución Horaria */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Uso de Canchas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-xl shadow-md p-6"
          >
            <h3 className="text-lg font-semibold mb-6">Uso de Canchas</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={courtUsageData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `${value}%`} />
                  <Tooltip />
                  <Bar dataKey="usage" fill="#10B981">
                    {courtUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Distribución Horaria */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-xl shadow-md p-6"
          >
            <h3 className="text-lg font-semibold mb-6">Distribución Horaria</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={timeDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {timeDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Tabla de Resumen */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl shadow-md p-6"
        >
          <h3 className="text-lg font-semibold mb-6">Resumen del Período</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-4 bg-accent rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Total Ingresos</span>
                <FontAwesomeIcon icon={faChartLine} className="text-primary" />
              </div>
              <p className="text-2xl font-bold">$33.100.000</p>
              <p className="text-sm text-emerald-500">+12.5% vs período anterior</p>
            </div>

            <div className="p-4 bg-accent rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Total Reservas</span>
                <FontAwesomeIcon icon={faChartBar} className="text-primary" />
              </div>
              <p className="text-2xl font-bold">1,320</p>
              <p className="text-sm text-emerald-500">+8.2% vs período anterior</p>
            </div>

            <div className="p-4 bg-accent rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Tasa de Ocupación</span>
                <FontAwesomeIcon icon={faChartPie} className="text-primary" />
              </div>
              <p className="text-2xl font-bold">85.7%</p>
              <p className="text-sm text-emerald-500">+5.4% vs período anterior</p>
            </div>

            <div className="p-4 bg-accent rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Promedio por Reserva</span>
                <FontAwesomeIcon icon={faChartLine} className="text-primary" />
              </div>
              <p className="text-2xl font-bold">$25.075</p>
              <p className="text-sm text-emerald-500">+3.8% vs período anterior</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Reports;