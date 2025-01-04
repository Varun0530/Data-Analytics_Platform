import React from 'react';
import { DataSummary as DataSummaryType } from '../types/data';

interface Props {
  summary: DataSummaryType;
}

export default function DataSummary({ summary }: Props) {
  return (
    <div className="glass-effect rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-4 text-white">Summary Statistics</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                Column
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                Mean
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                Median
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                Std Dev
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                Count
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {Object.entries(summary).map(([column, stats]) => (
              <tr key={column} className="hover:bg-white/5 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                  {column}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white/80">
                  {stats.mean?.toFixed(2) ?? 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white/80">
                  {stats.median?.toFixed(2) ?? 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white/80">
                  {stats.std?.toFixed(2) ?? 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white/80">
                  {stats.count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}