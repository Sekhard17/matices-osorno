import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface DataPoint {
  name: string;
  [key: string]: any;
}

interface LineConfig {
  dataKey: string;
  stroke: string;
  name: string;
}

interface LineChartComponentProps {
  data: DataPoint[];
  lines: LineConfig[];
  height?: number;
  xAxisDataKey?: string;
  formatter?: (value: number) => string;
}

const LineChartComponent = ({
  data,
  lines,
  height = 300,
  xAxisDataKey = 'name',
  formatter
}: LineChartComponentProps) => {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey={xAxisDataKey}
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
            formatter={formatter}
            contentStyle={{ 
              backgroundColor: 'var(--background)',
              border: '1px solid var(--border)'
            }}
          />
          <Legend />
          {lines.map((line, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.stroke}
              name={line.name}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;