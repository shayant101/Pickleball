import React from 'react';
import { TrendingUp, TrendingDown, Users, Clock, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AttendanceSummary } from '@/types/attendance';

interface AttendanceStatsProps {
  summaries: AttendanceSummary[];
}

const AttendanceStats: React.FC<AttendanceStatsProps> = ({ summaries }) => {
  const overallStats = {
    totalStudents: summaries.length,
    averageAttendance: summaries.reduce((sum, s) => sum + s.stats.attendanceRate, 0) / summaries.length,
    averagePunctuality: summaries.reduce((sum, s) => sum + s.stats.punctualityRate, 0) / summaries.length,
    totalLessons: summaries.reduce((sum, s) => sum + s.stats.totalLessons, 0),
    totalAbsences: summaries.reduce((sum, s) => sum + s.stats.missedLessons, 0),
    studentsNeedingAttention: summaries.filter(s => s.trends.needsAttention).length
  };

  const getPerformanceLevel = (rate: number) => {
    if (rate >= 95) return { label: 'Excellent', color: 'bg-green-100 text-green-800' };
    if (rate >= 85) return { label: 'Good', color: 'bg-blue-100 text-blue-800' };
    if (rate >= 75) return { label: 'Fair', color: 'bg-yellow-100 text-yellow-800' };
    return { label: 'Needs Attention', color: 'bg-red-100 text-red-800' };
  };

  const getTrendIcon = (improving: boolean) => {
    return improving ? 
      <TrendingUp className="h-4 w-4 text-green-600" /> : 
      <TrendingDown className="h-4 w-4 text-red-600" />;
  };

  return (
    <div className="space-y-6">
      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Overall Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{overallStats.averageAttendance.toFixed(1)}%</div>
            <Progress value={overallStats.averageAttendance} className="mb-2" />
            <p className="text-sm text-muted-foreground">
              Across {overallStats.totalStudents} students
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Punctuality Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{overallStats.averagePunctuality.toFixed(1)}%</div>
            <Progress value={overallStats.averagePunctuality} className="mb-2" />
            <p className="text-sm text-muted-foreground">
              On-time arrivals
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Total Lessons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{overallStats.totalLessons}</div>
            <div className="text-sm text-muted-foreground">
              <span className="text-red-600 font-medium">{overallStats.totalAbsences}</span> absences
            </div>
            <p className="text-sm text-muted-foreground">
              This period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Student Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Student Statistics</CardTitle>
          <CardDescription>Individual attendance performance and trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {summaries.map((summary) => {
              const attendanceLevel = getPerformanceLevel(summary.stats.attendanceRate);
              const punctualityLevel = getPerformanceLevel(summary.stats.punctualityRate);
              
              return (
                <div key={summary.studentId} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="font-bold text-blue-600">
                          {summary.studentName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold">{summary.studentName}</h4>
                        <p className="text-sm text-muted-foreground">{summary.instrument}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(summary.trends.improving)}
                      <Badge className={attendanceLevel.color}>
                        {attendanceLevel.label}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Attendance Metrics */}
                    <div>
                      <h5 className="font-medium mb-3">Attendance Metrics</h5>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Attendance Rate</span>
                            <span className="font-medium">{summary.stats.attendanceRate.toFixed(1)}%</span>
                          </div>
                          <Progress value={summary.stats.attendanceRate} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Punctuality Rate</span>
                            <span className="font-medium">{summary.stats.punctualityRate.toFixed(1)}%</span>
                          </div>
                          <Progress value={summary.stats.punctualityRate} className="h-2" />
                        </div>
                      </div>
                    </div>

                    {/* Lesson Breakdown */}
                    <div>
                      <h5 className="font-medium mb-3">Lesson Breakdown</h5>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-green-50 rounded">
                          <div className="text-2xl font-bold text-green-600">
                            {summary.stats.attendedLessons}
                          </div>
                          <div className="text-sm text-green-700">Present</div>
                        </div>
                        <div className="text-center p-3 bg-red-50 rounded">
                          <div className="text-2xl font-bold text-red-600">
                            {summary.stats.missedLessons}
                          </div>
                          <div className="text-sm text-red-700">Absent</div>
                        </div>
                        <div className="text-center p-3 bg-yellow-50 rounded">
                          <div className="text-2xl font-bold text-yellow-600">
                            {summary.stats.lateArrivals}
                          </div>
                          <div className="text-sm text-yellow-700">Late</div>
                        </div>
                        <div className="text-center p-3 bg-blue-50 rounded">
                          <div className="text-2xl font-bold text-blue-600">
                            {summary.stats.totalLessons}
                          </div>
                          <div className="text-sm text-blue-700">Total</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trends and Recommendations */}
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <div className={`w-2 h-2 rounded-full ${summary.trends.consistent ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                          <span className="text-sm">
                            {summary.trends.consistent ? 'Consistent' : 'Inconsistent'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className={`w-2 h-2 rounded-full ${summary.trends.improving ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <span className="text-sm">
                            {summary.trends.improving ? 'Improving' : 'Declining'}
                          </span>
                        </div>
                      </div>
                      {summary.trends.needsAttention && (
                        <Badge variant="destructive">Needs Attention</Badge>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Performance Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Distribution</CardTitle>
          <CardDescription>How students are performing across different metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Attendance Rate Distribution</h4>
              <div className="space-y-2">
                {[
                  { range: '95-100%', count: summaries.filter(s => s.stats.attendanceRate >= 95).length, color: 'bg-green-500' },
                  { range: '85-94%', count: summaries.filter(s => s.stats.attendanceRate >= 85 && s.stats.attendanceRate < 95).length, color: 'bg-blue-500' },
                  { range: '75-84%', count: summaries.filter(s => s.stats.attendanceRate >= 75 && s.stats.attendanceRate < 85).length, color: 'bg-yellow-500' },
                  { range: 'Below 75%', count: summaries.filter(s => s.stats.attendanceRate < 75).length, color: 'bg-red-500' }
                ].map((item) => (
                  <div key={item.range} className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded ${item.color}`}></div>
                    <span className="text-sm flex-1">{item.range}</span>
                    <span className="text-sm font-medium">{item.count} students</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Punctuality Rate Distribution</h4>
              <div className="space-y-2">
                {[
                  { range: '95-100%', count: summaries.filter(s => s.stats.punctualityRate >= 95).length, color: 'bg-green-500' },
                  { range: '85-94%', count: summaries.filter(s => s.stats.punctualityRate >= 85 && s.stats.punctualityRate < 95).length, color: 'bg-blue-500' },
                  { range: '75-84%', count: summaries.filter(s => s.stats.punctualityRate >= 75 && s.stats.punctualityRate < 85).length, color: 'bg-yellow-500' },
                  { range: 'Below 75%', count: summaries.filter(s => s.stats.punctualityRate < 75).length, color: 'bg-red-500' }
                ].map((item) => (
                  <div key={item.range} className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded ${item.color}`}></div>
                    <span className="text-sm flex-1">{item.range}</span>
                    <span className="text-sm font-medium">{item.count} students</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceStats;