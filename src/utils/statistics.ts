import { jStat } from 'jstat';

export function calculateSummaryStatistics(data: any[], column: string) {
  const numericValues = data
    .map(row => parseFloat(row[column]))
    .filter(val => !isNaN(val));

  if (numericValues.length === 0) {
    return {
      count: data.length,
    };
  }

  return {
    mean: jStat.mean(numericValues),
    median: jStat.median(numericValues),
    mode: jStat.mode(numericValues),
    std: jStat.stdev(numericValues),
    min: Math.min(...numericValues),
    max: Math.max(...numericValues),
    count: numericValues.length,
  };
}

export function generateDataSummary(data: Record<string, any>[], columns: string[]) {
  const summary: Record<string, any> = {};
  
  columns.forEach(column => {
    summary[column] = calculateSummaryStatistics(data, column);
  });

  return summary;
}