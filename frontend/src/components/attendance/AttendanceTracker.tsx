import React, { useState } from 'react';
import { Calendar, Clock, Users, TrendingUp, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import AttendanceCalendar from './AttendanceCalendar';
import AttendanceStats from './AttendanceStats';
import QuickAttendance from './QuickAttendance';
import { attendanceSummaries, attendanceRecords } from '@/data/attendanceData';

const AttendanceTracker: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'calendar' | 'stats'>('overview');
  const [dateRange, setDateRange] = useState('month');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'late': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'absent': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'cancelled': return <AlertTriangle className="h-4 w-4 text-gray-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'late': return 'bg-yellow-100 text-yellow-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trends: any) => {
    if (trends.needsAttention) return <AlertTriangle className="h-4 w-4 text-red-600" />;
    if (trends.improving) return <TrendingUp className="h-4 w-4 text-green-600" />;
    return <CheckCircle className="h-4 w-4 text-blue-600" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Attendance Tracking</h2>
          <p className="text-muted-foreground">
            Monitor student attendance and punctuality patterns
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={viewMode} onValueChange={(value: 'overview' | 'calendar' | 'stats') => setViewMode(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overview">Overview</SelectItem>
              <SelectItem value="calendar">Calendar</SelectItem>
              <SelectItem value="stats">Statistics</SelectItem>
            </SelectContent>
          </Select>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92.3%</div>
            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Punctuality Rate</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">88.7%</div>
            <p className="text-xs text-muted-foreground">-1.2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Makeup Lessons</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Pending this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">At-Risk Students</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">2</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      {viewMode === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Student Attendance Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Student Attendance Summary</CardTitle>
              <CardDescription>Overview of each student's attendance patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attendanceSummaries.map((summary) => (
                  <div key={summary.studentId} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-blue-600">
                            {summary.studentName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium">{summary.studentName}</h4>
                          <p className="text-sm text-muted-foreground">{summary.instrument}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(summary.trends)}
                        <Badge variant={summary.trends.needsAttention ? 'destructive' : 'secondary'}>
                          {summary.stats.attendanceRate.toFixed(1)}%
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-bold text-green-600">{summary.stats.attendedLessons}</div>
                        <div className="text-muted-foreground">Present</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-red-600">{summary.stats.missedLessons}</div>
                        <div className="text-muted-foreground">Absent</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-yellow-600">{summary.stats.lateArrivals}</div>
                        <div className="text-muted-foreground">Late</div>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Attendance Rate</span>
                        <span>{summary.stats.attendanceRate.toFixed(1)}%</span>
                      </div>
                      <Progress value={summary.stats.attendanceRate} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Attendance */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Attendance</CardTitle>
              <CardDescription>Latest lesson attendance records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {attendanceRecords.slice(0, 8).map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(record.status)}
                      <div>
                        <p className="font-medium">{record.studentName}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(record.date).toLocaleDateString()} at {record.startTime}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(record.status)}>
                        {record.status}
                      </Badge>
                      {record.arrivalTime && record.status === 'late' && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Arrived: {record.arrivalTime}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {viewMode === 'calendar' && (
        <AttendanceCalendar records={attendanceRecords} />
      )}

      {viewMode === 'stats' && (
        <AttendanceStats summaries={attendanceSummaries} />
      )}

      {/* Quick Attendance Entry */}
      <QuickAttendance />
    </div>
  );
};

export default AttendanceTracker;