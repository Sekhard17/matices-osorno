import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface PieChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  colors: string[];
  formatter: (value: number) => string;
}

const PieChartComponent = ({
  data,
  colors,
  formatter
}: PieChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label={({ name, value }) => `${name} (${formatter(value)})`}
        >
          {data.map((_, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={colors[index % colors.length]} 
            />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: number) => [formatter(value), 'Valor']}
          contentStyle={{
            backgroundColor: 'var(--background)',
            border: '1px solid var(--border)',
            borderRadius: '0.5rem'
          }}
          labelStyle={{ color: 'var(--foreground)' }}
        />
        <Legend 
          formatter={(value) => <span style={{ color: 'var(--foreground)' }}>{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;