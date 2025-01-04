import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import Papa from 'papaparse';
import { DataSet } from '../types/data';
import { generateDataSummary } from '../utils/statistics';

interface Props {
  onDataLoaded: (dataset: DataSet) => void;
}

export default function DataUpload({ onDataLoaded }: Props) {
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const columns = Object.keys(results.data[0]);
        const summary = generateDataSummary(results.data, columns);
        
        onDataLoaded({
          columns,
          data: results.data,
          summary,
        });
      },
    });
  }, [onDataLoaded]);

  return (
    <div className="max-w-xl mx-auto">
      <div className="glass-effect p-8 rounded-xl text-center">
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-white/20 border-dashed rounded-xl cursor-pointer hover:border-white/40 transition-colors duration-300">
          <div className="flex flex-col items-center justify-center px-4 py-6">
            <div className="float-animation">
              <Upload className="w-12 h-12 text-white mb-4" />
            </div>
            <p className="mb-2 text-lg text-white">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-sm text-white/80">CSV files only</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept=".csv"
            onChange={handleFileUpload}
          />
        </label>
      </div>
    </div>
  );
}