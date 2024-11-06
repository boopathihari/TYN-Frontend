// components/StartupAvgResponseTime.tsx
"use client";

import React, { useEffect, useRef } from 'react';
import { Box } from '@antv/g2plot';

interface StartupAvgResponseTimeProps {
  data: {
    x: string;
    low: number;
    q1: number;
    median: number;
    q3: number;
    high: number;
  }[];
  title?: string;
}

const StartupAvgResponseTime: React.FC<StartupAvgResponseTimeProps> = ({
  data,
  title = 'Startups Avg Connection Response',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const boxPlot = new Box(containerRef.current, {
        width: 400,
        height: 500,
        data: data,
        xField: 'x',
        yField: ['low', 'q1', 'median', 'q3', 'high'],
        boxStyle: {
          stroke: '#545454',
          fill: '#1890FF',
          fillOpacity: 0.3,
        },
        animation: false,
        tooltip: {
          fields: ['x', 'low', 'q1', 'median', 'q3', 'high'],
        },
        xAxis: {
          title: {
            text: title,
          },
        },
        yAxis: {
          title: {
            text: '(Days)',
          },
        },
      });

      boxPlot.render();

      // Cleanup on component unmount
      return () => {
        boxPlot.destroy();
      };
    }
  }, [data, title]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div ref={containerRef}></div>
    </div>
  );
};

export default StartupAvgResponseTime;
