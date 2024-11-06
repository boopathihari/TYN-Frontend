import React from 'react';
import Plot from 'react-plotly.js';

const GroupBoxPlot: React.FC = () => {
  const data = [
    {
      type: 'box',
      y: [10, 15, 20, 25, 30],
      name: 'Q1 - Startup',
      boxpoints: false,
      marker: { color: '#5B8FF9' },
    },
    {
      type: 'box',
      y: [20, 25, 30, 35, 40],
      name: 'Q1 - Enterprise',
      boxpoints: false,
      marker: { color: '#F6BD16' },
    },
    {
      type: 'box',
      y: [15, 20, 25, 30, 35],
      name: 'Q2 - Startup',
      boxpoints: false,
      marker: { color: '#5B8FF9' },
    },
    {
      type: 'box',
      y: [25, 30, 35, 40, 45],
      name: 'Q2 - Enterprise',
      boxpoints: false,
      marker: { color: '#F6BD16' },
    },
    {
      type: 'box',
      y: [12, 18, 22, 28, 34],
      name: 'Q3 - Startup',
      boxpoints: false,
      marker: { color: '#5B8FF9' },
    },
    {
      type: 'box',
      y: [22, 28, 32, 38, 42],
      name: 'Q3 - Enterprise',
      boxpoints: false,
      marker: { color: '#F6BD16' },
    },
    {
      type: 'box',
      y: [18, 23, 28, 33, 38],
      name: 'Q4 - Startup',
      boxpoints: false,
      marker: { color: '#5B8FF9' },
    },
    {
      type: 'box',
      y: [28, 33, 38, 43, 48],
      name: 'Q4 - Enterprise',
      boxpoints: false,
      marker: { color: '#F6BD16' },
    },
  ];

  const layout = {
    xaxis: {
      title: 'Quarter',
      tickvals: ['Q1', 'Q2', 'Q3', 'Q4'],
      ticktext: ['Q1', 'Q2', 'Q3', 'Q4'],
    },
    yaxis: {
      title: 'Session Duration',
      range: [0, 50],
    },
    boxmode: 'group',
    legend: {
      orientation: 'h',
      x: 1.1,
      y: 1,
    },
    showlegend: false,
  };

  return (
    <Plot
      data={data}
      layout={layout as any}
      style={{ width: '100%', height: '400px' }}
      config={{ responsive: true }}
    />
  );
};

export default GroupBoxPlot;
