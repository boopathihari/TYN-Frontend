// components/QueryFocus.tsx
"use client";
import React from 'react';

interface QueryFocusProps {
  values: number[];
}

const QueryFocus: React.FC<QueryFocusProps> = ({ values }) => {
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  const getColor = (value: number) => {
    const intensity = ((value - minValue) / (maxValue - minValue)) * 100;
    if (intensity < 20) return 'bg-gray-300';
    if (intensity < 40) return 'bg-blue-200';
    if (intensity < 60) return 'bg-blue-400';
    if (intensity < 80) return 'bg-blue-600';
    return 'bg-blue-800';
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg text-center">
      <ul className="space-y-2">
        {values.map((value, index) => (
          <li key={index} className="flex items-center text-center">
            <span className={`w-4 h-4 rounded-full ${getColor(value)}`}></span>
            <span className="text-sm pl-4 text-black">{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QueryFocus;
