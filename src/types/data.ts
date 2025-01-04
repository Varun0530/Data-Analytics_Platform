export interface DataSet {
  columns: string[];
  data: Record<string, any>[];
  summary: DataSummary;
}

export interface DataSummary {
  [key: string]: {
    mean?: number;
    median?: number;
    mode?: number;
    std?: number;
    min?: number;
    max?: number;
    count: number;
  };
}

export interface ChartConfig {
  type: 'bar' | 'line' | 'scatter' | 'pie';
  xAxis: string;
  yAxis?: string;
  title: string;
}