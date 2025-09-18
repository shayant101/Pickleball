import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LessonTrendData } from '@/types/analytics';

interface LessonAnalyticsChartProps {
  data: LessonTrendData[];
}

const LessonAnalyticsChart: React.FC<LessonAnalyticsChartProps> = ({ data }) => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area 
            type="monotone" 
            dataKey="completed" 
            stackId="1" 
            stroke="#16a34a" 
            fill="#16a34a" 
            fillOpacity={0.6}
            name="Completed"
          />
          <Area 
            type="monotone" 
            dataKey="cancelled" 
            stackId="1" 
            stroke="#dc2626" 
            fill="#dc2626" 
            fillOpacity={0.6}
            name="Cancelled"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LessonAnalyticsChart;