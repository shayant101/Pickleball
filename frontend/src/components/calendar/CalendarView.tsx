import React from 'react';
import Calendar from './Calendar';
import CalendarStats from './CalendarStats';

const CalendarView: React.FC = () => {
  // Mock stats - in a real app, these would be calculated from actual lesson data
  const stats = {
    totalLessons: 12,
    scheduledLessons: 8,
    completedLessons: 3,
    cancelledLessons: 1
  };

  return (
    <div className="space-y-6">
      <CalendarStats {...stats} />
      <Calendar />
    </div>
  );
};

export default CalendarView;