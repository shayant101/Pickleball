import React, { useState } from 'react';
import { TrendingUp, Users, DollarSign, Target, Calendar, BarChart3, Download, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import RevenueChart from './RevenueChart';
import StudentGrowthChart from './StudentGrowthChart';
import LessonAnalyticsChart from './LessonAnalyticsChart';
import ProgressChart from './ProgressChart';
import BusinessInsightsPanel from './BusinessInsightsPanel';
import { revenueAnalytics, studentAnalytics, lessonAnalytics, progressAnalytics, businessInsights } from '@/data/analyticsData';

const Analytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('year');
  const [selectedView, setSelectedView] = useState('overview');

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
      default: return <BarChart3 className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Business Analytics</h2>
          <p className="text-muted-foreground">
            Comprehensive insights into your music coaching business
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedView} onValueChange={setSelectedView}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overview">Overview</SelectItem>
              <SelectItem value="revenue">Revenue</SelectItem>
              <SelectItem value="students">Students</SelectItem>
              <SelectItem value="lessons">Lessons</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {businessInsights.keyMetrics.map((metric) => (
          <Card key={metric.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              {getTrendIcon(metric.trend)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className={`text-xs flex items-center ${getTrendColor(metric.trend)}`}>
                {metric.change > 0 ? '+' : ''}{metric.change}% from last period
              </div>
              <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Analytics Content */}
      {selectedView === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
              <CardDescription>Monthly revenue and lesson volume over time</CardDescription>
            </CardHeader>
            <CardContent>
              <RevenueChart data={revenueAnalytics.monthlyData} />
            </CardContent>
          </Card>

          {/* Student Growth */}
          <Card>
            <CardHeader>
              <CardTitle>Student Growth</CardTitle>
              <CardDescription>New students vs. churn rate</CardDescription>
            </CardHeader>
            <CardContent>
              <StudentGrowthChart data={studentAnalytics.studentGrowthData} />
            </CardContent>
          </Card>

          {/* Lesson Analytics */}
          <Card>
            <CardHeader>
              <CardTitle>Lesson Performance</CardTitle>
              <CardDescription>Completion vs. cancellation rates</CardDescription>
            </CardHeader>
            <CardContent>
              <LessonAnalyticsChart data={lessonAnalytics.lessonTrends} />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Revenue Deep Dive */}
      {selectedView === 'revenue' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${revenueAnalytics.totalRevenue.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">All time</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Monthly Average</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${revenueAnalytics.averageMonthlyRevenue.toLocaleString()}</div>
                <p className="text-sm text-green-600">+{revenueAnalytics.revenueGrowth}% growth</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${revenueAnalytics.monthlyRevenue.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">Current month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {revenueAnalytics.paymentMethodBreakdown.map((method) => (
                    <div key={method.method} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium">{method.method}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold">${method.amount.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">{method.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue by Instrument</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {studentAnalytics.instrumentBreakdown.map((instrument) => (
                    <div key={instrument.instrument} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium">{instrument.instrument}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold">${instrument.revenue.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">{instrument.count} students</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Student Analytics Deep Dive */}
      {selectedView === 'students' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Total Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{studentAnalytics.totalStudents}</div>
                <p className="text-sm text-muted-foreground">{studentAnalytics.activeStudents} active</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">New This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{studentAnalytics.newStudentsThisMonth}</div>
                <p className="text-sm text-green-600">Growing</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Retention Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{studentAnalytics.studentRetentionRate}%</div>
                <p className="text-sm text-green-600">Excellent</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Avg Lessons/Student</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{studentAnalytics.averageLessonsPerStudent}</div>
                <p className="text-sm text-muted-foreground">Per month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Students by Instrument</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {studentAnalytics.instrumentBreakdown.map((instrument) => (
                    <div key={instrument.instrument} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{instrument.instrument}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${instrument.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground w-12">{instrument.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Students by Level</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {studentAnalytics.levelDistribution.map((level) => (
                    <div key={level.level} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{level.level}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${level.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground w-12">{level.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Business Insights Panel */}
      <BusinessInsightsPanel insights={businessInsights} />

      {/* Top Performing Students */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Students</CardTitle>
          <CardDescription>Students with highest progress scores and goal completion</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {progressAnalytics.topPerformingStudents.map((student, index) => (
              <div key={student.studentName} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium">{student.studentName}</p>
                    <p className="text-sm text-muted-foreground">{student.instrument}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-sm font-bold">{student.progressScore}/5</div>
                      <div className="text-xs text-muted-foreground">Progress</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold">{student.goalsCompleted}</div>
                      <div className="text-xs text-muted-foreground">Goals</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold">{student.lessonsAttended}</div>
                      <div className="text-xs text-muted-foreground">Lessons</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;