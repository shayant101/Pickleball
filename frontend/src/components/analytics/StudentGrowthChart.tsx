import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { StudentGrowthData } from '@/types/analytics';

interface StudentGrowthChartProps {
  data: StudentGrowthData[];
}

const StudentGrowthChart: React.FC<StudentGrowthChartProps> = ({ data }) => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="newStudents" fill="#16a34a" name="New Students" />
          <Bar dataKey="churnedStudents" fill="#dc2626" name="Churned Students" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StudentGrowthChart;