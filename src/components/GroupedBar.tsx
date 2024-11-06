// components/GroupedBar.tsx
import React, { useEffect, useRef } from 'react';
import { Bar } from '@antv/g2plot';

// Define the data type
interface DataItem {
  category: string;
  type: string;
  value: number;
}

const GroupedBar: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const data: DataItem[] = [
        { category: 'Energy', type: 'Invited', value: 10 },
        { category: 'Energy', type: 'Accepted', value: 5 },
        { category: 'Materials', type: 'Invited', value: 13 },
        { category: 'Materials', type: 'Accepted', value: 9 },
        { category: 'Industrials', type: 'Invited', value: 11 },
        { category: 'Industrials', type: 'Accepted', value: 7 },
        { category: 'Consumer Discretionary', type: 'Invited', value: 16 },
        { category: 'Consumer Discretionary', type: 'Accepted', value: 12 },
        { category: 'Consumer Staples', type: 'Invited', value: 15 },
        { category: 'Consumer Staples', type: 'Accepted', value: 11 },
        { category: 'Healthcare', type: 'Invited', value: 18 },
        { category: 'Healthcare', type: 'Accepted', value: 14 },
        { category: 'Financials', type: 'Invited', value: 8 },
        { category: 'Financials', type: 'Accepted', value: 4 },
        { category: 'Information Technology', type: 'Invited', value: 12 },
        { category: 'Information Technology', type: 'Accepted', value: 9 },
        { category: 'Communication Services', type: 'Invited', value: 20 },
        { category: 'Communication Services', type: 'Accepted', value: 15 },
        { category: 'Utilities', type: 'Invited', value: 2 },
        { category: 'Utilities', type: 'Accepted', value: 1 },
        { category: 'Real Estate', type: 'Invited', value: 17 },
        { category: 'Real Estate', type: 'Accepted', value: 12 },
      ];

      const stackedBarPlot = new Bar(chartRef.current, {
        data,
        isGroup: true,
        xField: 'value',
        yField: 'category',
        seriesField: 'type',
        marginRatio: 0,
        label: {
          position: 'right',
          offset: 4,
        },
        barStyle: { radius: [2, 2, 0, 0] },
      });

      stackedBarPlot.render();
    }
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '600px' }} />;
};

export default GroupedBar;
