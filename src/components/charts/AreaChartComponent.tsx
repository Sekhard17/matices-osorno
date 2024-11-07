import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface AreaChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  formatter: (value: number) => string;
  gradientId: string;
  strokeColor: string;
  fillColor: string;
}

const AreaChartComponent = ({
  data,
  formatter,
  gradientId,
  strokeColor,
  fillColor
}: AreaChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={fillColor} stopOpacity={0.1}/>
            <stop offset="95%" stopColor={fillColor} stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis 
          dataKey="name" 
          axisLine={false}
          tickLine={false}
          tick={{ fill: 'currentColor' }}
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
          tick={{ fill: 'currentColor' }}
          tickFormatter={formatter}
        />
        <Tooltip 
          formatter={(value: number) => [formatter(value), 'Valor']}
          contentStyle={{
            backgroundColor: 'var(--background)',
            border: '1px solid var(--border)',
            borderRadius: '0.5rem'
          }}
          labelStyle={{ color: 'var(--foreground)' }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={strokeColor}
          fillOpacity={1}
          fill={`url(#${gradientId})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;