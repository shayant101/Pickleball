import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AttendanceRecord } from '@/types/attendance';

interface AttendanceCalendarProps {
  records: AttendanceRecord[];
}

const AttendanceCalendar: React.FC<AttendanceCalendarProps> = ({ records }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getMonthDates = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const dates = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return dates;
  };

  const getRecordsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return records.filter(record => record.date === dateStr);
  };

  const getStatusIcon = (status: string, size = 'h-3 w-3') => {
    switch (status) {
      case 'present': return <CheckCircle className={`${size} text-green-600`} />;
      case 'late': return <Clock className={`${size} text-yellow-600`} />;
      case 'absent': return <XCircle className={`${size} text-red-600`} />;
      case 'cancelled': return <AlertTriangle className={`${size} text-gray-600`} />;
      default: return null;
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  const monthDates = getMonthDates(currentDate);
  const currentMonth = currentDate.getMonth();
  const today = new Date();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Attendance Calendar</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-medium min-w-[120px] text-center">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Calendar Header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {monthDates.map((date, index) => {
            const dayRecords = getRecordsForDate(date);
            const isCurrentMonth = date.getMonth() === currentMonth;
            const isToday = date.toDateString() === today.toDateString();
            
            return (
              <div
                key={index}
                className={`min-h-[80px] p-2 border rounded ${
                  isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                } ${isToday ? 'ring-2 ring-blue-500' : ''}`}
              >
                <div className={`text-sm font-medium mb-1 ${
                  isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {date.getDate()}
                </div>
                
                <div className="space-y-1">
                  {dayRecords.map((record) => (
                    <div
                      key={record.id}
                      className="flex items-center space-x-1 text-xs p-1 rounded bg-gray-100"
                    >
                      {getStatusIcon(record.status)}
                      <span className="truncate">{record.studentName.split(' ')[0]}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t">
          <div className="flex items-center space-x-1">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm">Present</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4 text-yellow-600" />
            <span className="text-sm">Late</span>
          </div>
          <div className="flex items-center space-x-1">
            <XCircle className="h-4 w-4 text-red-600" />
            <span className="text-sm">Absent</span>
          </div>
          <div className="flex items-center space-x-1">
            <AlertTriangle className="h-4 w-4 text-gray-600" />
            <span className="text-sm">Cancelled</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceCalendar;