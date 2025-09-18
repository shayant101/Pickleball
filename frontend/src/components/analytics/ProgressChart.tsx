import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ProgressTrendData } from '@/types/analytics';

interface ProgressChartProps {
  data: ProgressTrendData[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip 
            formatter={(value, name) => [
              name === 'averageScore' ? `${value}/5` : value,
              name === 'averageScore' ? 'Avg Score' : name === 'goalsCompleted' ? 'Goals Completed' : 'Goals Set'
            ]}
          />
          <Line 
            type="monotone" 
            dataKey="averageScore" 
            stroke="#8b5cf6" 
            strokeWidth={3}
            dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="goalsCompleted" 
            stroke="#f59e0b" 
            strokeWidth={2}
            dot={{ fill: '#f59e0b', strokeWidth: 2, r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;