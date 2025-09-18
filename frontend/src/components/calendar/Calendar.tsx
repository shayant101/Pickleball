import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock, User, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { students } from '@/data/mockData';

interface CalendarLesson {
  id: number;
  studentId: number;
  studentName: string;
  date: string;
  startTime: string;
  endTime: string;
  instrument: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{ date: string; time: string } | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');

  // Mock lessons data
  const [lessons] = useState<CalendarLesson[]>([
    {
      id: 1,
      studentId: 1,
      studentName: 'Emma Johnson',
      date: '2024-01-25',
      startTime: '14:00',
      endTime: '15:00',
      instrument: 'Piano',
      status: 'scheduled'
    },
    {
      id: 2,
      studentId: 2,
      studentName: 'Michael Chen',
      date: '2024-01-25',
      startTime: '15:30',
      endTime: '16:30',
      instrument: 'Guitar',
      status: 'scheduled'
    },
    {
      id: 3,
      studentId: 3,
      studentName: 'Sarah Williams',
      date: '2024-01-26',
      startTime: '10:00',
      endTime: '11:00',
      instrument: 'Voice',
      status: 'scheduled'
    },
    {
      id: 4,
      studentId: 1,
      studentName: 'Emma Johnson',
      date: '2024-01-23',
      startTime: '14:00',
      endTime: '15:00',
      instrument: 'Piano',
      status: 'completed'
    }
  ]);

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00'
  ];

  const getWeekDates = (date: Date) => {
    const week = [];
    const startDate = new Date(date);
    const day = startDate.getDay();
    const diff = startDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    startDate.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      week.push(currentDate);
    }
    return week;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getLessonForSlot = (date: string, time: string) => {
    return lessons.find(lesson => 
      lesson.date === date && lesson.startTime === time
    );
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  const handleTimeSlotClick = (date: string, time: string) => {
    const existingLesson = getLessonForSlot(date, time);
    if (!existingLesson) {
      setSelectedTimeSlot({ date, time });
      setShowBookingModal(true);
    }
  };

  const weekDates = getWeekDates(currentDate);
  const weekStart = weekDates[0];
  const weekEnd = weekDates[6];

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => navigateWeek('prev')}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigateWeek('next')}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <h3 className="text-lg font-semibold">
              {weekStart.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - {weekEnd.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </h3>
            <p className="text-sm text-muted-foreground">
              {lessons.filter(l => l.status === 'scheduled').length} lessons scheduled this week
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Select value={viewMode} onValueChange={(value: 'week' | 'month') => setViewMode(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Week View</SelectItem>
              <SelectItem value="month">Month View</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setShowBookingModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Book Lesson
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <Card>
        <CardContent className="p-0">
          <div className="grid grid-cols-8 border-b">
            <div className="p-4 border-r bg-gray-50">
              <span className="text-sm font-medium text-muted-foreground">Time</span>
            </div>
            {weekDates.map((date, index) => (
              <div key={index} className="p-4 border-r last:border-r-0 bg-gray-50">
                <div className="text-center">
                  <div className="text-sm font-medium">
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className={`text-lg font-semibold mt-1 ${
                    formatDate(date) === formatDate(new Date()) ? 'text-blue-600' : ''
                  }`}>
                    {date.getDate()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {timeSlots.map((time) => (
              <div key={time} className="grid grid-cols-8 border-b last:border-b-0 min-h-[60px]">
                <div className="p-3 border-r bg-gray-50 flex items-center">
                  <span className="text-sm text-muted-foreground">{formatTime(time)}</span>
                </div>
                {weekDates.map((date, dateIndex) => {
                  const dateStr = formatDate(date);
                  const lesson = getLessonForSlot(dateStr, time);
                  
                  return (
                    <div
                      key={dateIndex}
                      className="border-r last:border-r-0 p-1 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => handleTimeSlotClick(dateStr, time)}
                    >
                      {lesson ? (
                        <div className={`p-2 rounded text-xs ${
                          lesson.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                          lesson.status === 'completed' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          <div className="font-medium truncate">{lesson.studentName}</div>
                          <div className="flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatTime(lesson.startTime)}
                          </div>
                          <div className="truncate">{lesson.instrument}</div>
                        </div>
                      ) : (
                        <div className="h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Plus className="h-4 w-4 text-gray-400" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2" />
            Today's Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {lessons
              .filter(lesson => lesson.date === formatDate(new Date()) && lesson.status === 'scheduled')
              .sort((a, b) => a.startTime.localeCompare(b.startTime))
              .map((lesson) => (
                <div key={lesson.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{lesson.studentName}</p>
                      <p className="text-sm text-muted-foreground">{lesson.instrument} Lesson</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatTime(lesson.startTime)} - {formatTime(lesson.endTime)}</p>
                    <Badge variant="secondary">{lesson.status}</Badge>
                  </div>
                </div>
              ))}
            {lessons.filter(lesson => lesson.date === formatDate(new Date()) && lesson.status === 'scheduled').length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No lessons scheduled for today</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Book Lesson Modal */}
      <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Book New Lesson</DialogTitle>
            <DialogDescription>
              Schedule a lesson with one of your students
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="student">Student *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a student" />
                </SelectTrigger>
                <SelectContent>
                  {students.filter(s => s.status === 'Active').map((student) => (
                    <SelectItem key={student.id} value={student.id.toString()}>
                      {student.name} - {student.instrument}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date *</Label>
                <Input 
                  id="date" 
                  type="date" 
                  defaultValue={selectedTimeSlot?.date}
                />
              </div>
              <div>
                <Label htmlFor="time">Start Time *</Label>
                <Select defaultValue={selectedTimeSlot?.time}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {formatTime(time)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="duration">Duration</Label>
              <Select defaultValue="60">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea 
                id="notes" 
                placeholder="Any special notes for this lesson..."
                rows={3}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button className="flex-1">Book Lesson</Button>
              <Button variant="outline" onClick={() => setShowBookingModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calendar;