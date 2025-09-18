import React from 'react';
import { Calendar, Users, DollarSign, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Stats, Lesson, Activity } from '@/types';

interface DashboardProps {
  stats: Stats;
  upcomingLessons: Lesson[];
  recentActivity: Activity[];
  onNavigate: (section: string) => void;
  onAddStudent: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  stats,
  upcomingLessons,
  recentActivity,
  onNavigate,
  onAddStudent
}) => {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeStudents}</div>
            <p className="text-xs text-muted-foreground">of {stats.totalStudents} total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lessons Completed</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedLessons}</div>
            <p className="text-xs text-muted-foreground">+23 this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Lessons */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Lessons</CardTitle>
            <CardDescription>Your next {upcomingLessons.length} scheduled lessons</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingLessons.map((lesson) => (
                <div key={lesson.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{lesson.student}</p>
                    <p className="text-sm text-muted-foreground">{lesson.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{lesson.time}</p>
                    <p className="text-sm text-muted-foreground">{lesson.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline" onClick={() => onNavigate('calendar')}>
              View Full Calendar
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your coaching business</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.action}</span> - {activity.student}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              View All Activity
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to manage your coaching business</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col space-y-2" onClick={() => onNavigate('calendar')}>
              <Calendar className="h-5 w-5" />
              <span className="text-sm">Schedule Lesson</span>
            </Button>
            <Button className="h-20 flex flex-col space-y-2" variant="outline" onClick={onAddStudent}>
              <Users className="h-5 w-5" />
              <span className="text-sm">Add Student</span>
            </Button>
            <Button className="h-20 flex flex-col space-y-2" variant="outline" onClick={() => onNavigate('payments')}>
              <DollarSign className="h-5 w-5" />
              <span className="text-sm">Record Payment</span>
            </Button>
            <Button className="h-20 flex flex-col space-y-2" variant="outline" onClick={() => onNavigate('progress')}>
              <BookOpen className="h-5 w-5" />
              <span className="text-sm">Update Progress</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;