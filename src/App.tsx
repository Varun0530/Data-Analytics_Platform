import React, { useState } from 'react';
import { BarChart, Table } from 'lucide-react';
import DataUpload from './components/DataUpload';
import DataVisualization from './components/DataVisualization';
import DataSummary from './components/DataSummary';
import { DataSet, ChartConfig } from './types/data';

function App() {
  const [dataset, setDataset] = useState<DataSet | null>(null);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({
    type: 'bar',
    xAxis: '',
    yAxis: '',
    title: 'Data Visualization',
  });

  const handleDataLoaded = (newDataset: DataSet) => {
    setDataset(newDataset);
    if (newDataset.columns.length >= 2) {
      setChartConfig(prev => ({
        ...prev,
        xAxis: newDataset.columns[0],
        yAxis: newDataset.columns[1],
      }));
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <header className="glass-effect shadow-lg">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <div className="float-animation">
              <BarChart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">
              Data Analytics Platform
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {!dataset ? (
          <div className="px-4 py-6 sm:px-0">
            <DataUpload onDataLoaded={handleDataLoaded} />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="glass-effect rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Table className="w-6 h-6 text-white mr-2" />
                <h2 className="text-xl font-semibold text-white">Data Controls</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Chart Type
                  </label>
                  <select
                    className="w-full bg-white/10 text-white border border-white/20 rounded-lg p-2 focus:ring-2 focus:ring-white/50 focus:outline-none [&>option]:bg-gray-800 [&>option]:text-white"
                    value={chartConfig.type}
                    onChange={(e) =>
                      setChartConfig((prev) => ({
                        ...prev,
                        type: e.target.value as ChartConfig['type'],
                      }))
                    }
                  >
                    <option value="bar">Bar Chart</option>
                    <option value="line">Line Chart</option>
                    <option value="scatter">Scatter Plot</option>
                    <option value="pie">Pie Chart</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    X Axis
                  </label>
                  <select
                    className="w-full bg-white/10 text-white border border-white/20 rounded-lg p-2 focus:ring-2 focus:ring-white/50 focus:outline-none [&>option]:bg-gray-800 [&>option]:text-white"
                    value={chartConfig.xAxis}
                    onChange={(e) =>
                      setChartConfig((prev) => ({
                        ...prev,
                        xAxis: e.target.value,
                      }))
                    }
                  >
                    {dataset.columns.map((column) => (
                      <option key={column} value={column}>
                        {column}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Y Axis
                  </label>
                  <select
                    className="w-full bg-white/10 text-white border border-white/20 rounded-lg p-2 focus:ring-2 focus:ring-white/50 focus:outline-none [&>option]:bg-gray-800 [&>option]:text-white"
                    value={chartConfig.yAxis}
                    onChange={(e) =>
                      setChartConfig((prev) => ({
                        ...prev,
                        yAxis: e.target.value,
                      }))
                    }
                  >
                    {dataset.columns.map((column) => (
                      <option key={column} value={column}>
                        {column}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DataVisualization
                data={dataset.data}
                config={chartConfig}
              />
              <DataSummary summary={dataset.summary} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;