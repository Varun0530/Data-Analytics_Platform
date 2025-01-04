import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChartConfig } from '../types/data';

interface Props {
  data: Record<string, any>[];
  config: ChartConfig;
}

const CHART_COLORS = {
  primary: '#23d5ab',
  secondary: '#23a6d5',
  accent: '#e73c7e',
  highlight: '#ee7752',
};

export default function DataVisualization({ data, config }: Props) {
  const renderChart = () => {
    switch (config.type) {
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey={config.xAxis} stroke="white" />
            <YAxis stroke="white" />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none' }} />
            <Legend />
            <Line type="monotone" dataKey={config.yAxis} stroke={CHART_COLORS.primary} strokeWidth={2} />
          </LineChart>
        );
      
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey={config.xAxis} stroke="white" />
            <YAxis stroke="white" />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none' }} />
            <Legend />
            <Bar dataKey={config.yAxis} fill={CHART_COLORS.primary} />
          </BarChart>
        );
      
      case 'scatter':
        return (
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey={config.xAxis} stroke="white" />
            <YAxis dataKey={config.yAxis} stroke="white" />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none' }} />
            <Legend />
            <Scatter data={data} fill={CHART_COLORS.primary} />
          </ScatterChart>
        );
      
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              dataKey={config.yAxis}
              nameKey={config.xAxis}
              fill={CHART_COLORS.primary}
              label
            />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none' }} />
            <Legend />
          </PieChart>
        );
    }
  };

  return (
    <div className="glass-effect p-6 rounded-xl h-[500px]">
      <h3 className="text-xl font-semibold mb-4 text-white">{config.title}</h3>
      <ResponsiveContainer>{renderChart()}</ResponsiveContainer>
    </div>
  );
}