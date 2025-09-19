'use client'

import React from 'react';
import { Calendar, Users, DollarSign, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import QuickStats from './QuickStats';
import { Stats, Session, Activity } from '@/types';

interface DashboardProps {
  stats: Stats;
  upcomingSessions: Session[];
  recentActivity: Activity[];
  onNavigate: (section: string) => void;
  onAddStudent: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  stats,
  upcomingSessions,
  recentActivity,
  onNavigate,
  onAddStudent
}) => {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <QuickStats
        totalRevenue={stats.totalRevenue}
        activeStudents={stats.activeStudents}
        totalStudents={stats.totalStudents}
        monthlyRevenue={stats.monthlyRevenue}
        completedSessions={stats.completedSessions}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Sessions */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>Your next {upcomingSessions.length} scheduled coaching sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{session.student}</p>
                    <p className="text-sm text-muted-foreground">{session.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{session.time}</p>
                    <p className="text-sm text-muted-foreground">{session.date}</p>
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
            <CardDescription>Latest updates from your pickleball coaching business</CardDescription>
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
          <CardDescription>Common tasks to manage your pickleball coaching business</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col space-y-2" onClick={() => onNavigate('calendar')}>
              <Calendar className="h-5 w-5" />
              <span className="text-sm">Schedule Session</span>
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