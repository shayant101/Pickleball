import React, { useState } from 'react';
import { Clock, CheckCircle, XCircle, AlertTriangle, Save } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { students } from '@/data/mockData';

const QuickAttendance: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [status, setStatus] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [notes, setNotes] = useState('');
  const [makeupRequired, setMakeupRequired] = useState(false);

  const handleSubmit = () => {
    if (!selectedStudent || !status) return;
    
    const attendanceRecord = {
      studentId: parseInt(selectedStudent),
      status,
      arrivalTime: status === 'late' ? arrivalTime : undefined,
      notes,
      makeupRequired: status === 'absent' ? makeupRequired : false,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
    };
    
    console.log('Recording attendance:', attendanceRecord);
    
    // Reset form
    setSelectedStudent('');
    setStatus('');
    setArrivalTime('');
    setNotes('');
    setMakeupRequired(false);
  };

  const getStatusIcon = (statusValue: string) => {
    switch (statusValue) {
      case 'present': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'late': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'absent': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'cancelled': return <AlertTriangle className="h-4 w-4 text-gray-600" />;
      default: return null;
    }
  };

  const getStatusColor = (statusValue: string) => {
    switch (statusValue) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'late': return 'bg-yellow-100 text-yellow-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Attendance Entry</CardTitle>
        <CardDescription>Record attendance for today's lessons</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Attendance Form */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="student">Student *</Label>
              <Select value={selectedStudent} onValueChange={setSelectedStudent}>
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

            <div>
              <Label htmlFor="status">Attendance Status *</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="present">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Present</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="late">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-yellow-600" />
                      <span>Late</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="absent">
                    <div className="flex items-center space-x-2">
                      <XCircle className="h-4 w-4 text-red-600" />
                      <span>Absent</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="cancelled">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-gray-600" />
                      <span>Cancelled</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {status === 'late' && (
              <div>
                <Label htmlFor="arrivalTime">Arrival Time</Label>
                <Input
                  id="arrivalTime"
                  type="time"
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)}
                />
              </div>
            )}

            {status === 'absent' && (
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="makeupRequired"
                  checked={makeupRequired}
                  onChange={(e) => setMakeupRequired(e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="makeupRequired">Makeup lesson required</Label>
              </div>
            )}

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional notes about this lesson..."
                rows={3}
              />
            </div>

            <Button 
              onClick={handleSubmit} 
              disabled={!selectedStudent || !status}
              className="w-full"
            >
              <Save className="h-4 w-4 mr-2" />
              Record Attendance
            </Button>
          </div>

          {/* Today's Schedule Preview */}
          <div>
            <h4 className="font-medium mb-3">Today's Schedule</h4>
            <div className="space-y-2">
              {/* Mock today's lessons */}
              {[
                { id: 1, student: 'Emma Johnson', time: '2:00 PM', status: 'present' },
                { id: 2, student: 'Michael Chen', time: '3:30 PM', status: 'pending' },
                { id: 3, student: 'Sarah Williams', time: '4:30 PM', status: 'pending' },
                { id: 4, student: 'Jessica Martinez', time: '5:30 PM', status: 'pending' }
              ].map((lesson) => (
                <div key={lesson.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{lesson.student}</p>
                    <p className="text-sm text-muted-foreground">{lesson.time}</p>
                  </div>
                  <div>
                    {lesson.status === 'pending' ? (
                      <Badge variant="outline">Pending</Badge>
                    ) : (
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(lesson.status)}
                        <Badge className={getStatusColor(lesson.status)}>
                          {lesson.status}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <h5 className="font-medium text-blue-900 mb-1">Quick Tips</h5>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Record attendance as soon as lessons begin</li>
                <li>• Add notes for late arrivals or early departures</li>
                <li>• Schedule makeup lessons for absences immediately</li>
                <li>• Use the calendar view to see attendance patterns</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickAttendance;