import { 
  RevenueAnalytics, 
  StudentAnalytics, 
  LessonAnalytics, 
  ProgressAnalytics, 
  BusinessInsights,
  MonthlyRevenue,
  PaymentMethodData,
  StudentGrowthData,
  InstrumentData,
  LevelData,
  LessonTrendData,
  PeakHourData,
  ProgressTrendData,
  TopStudentData,
  KeyMetric,
  Recommendation,
  BusinessAlert
} from '@/types/analytics';

export const revenueAnalytics: RevenueAnalytics = {
  totalRevenue: 45680,
  monthlyRevenue: 3200,
  yearlyRevenue: 38400,
  revenueGrowth: 12.5,
  averageMonthlyRevenue: 3800,
  monthlyData: [
    { month: 'Jan', revenue: 2800, lessons: 56, students: 18 },
    { month: 'Feb', revenue: 3100, lessons: 62, students: 19 },
    { month: 'Mar', revenue: 3400, lessons: 68, students: 20 },
    { month: 'Apr', revenue: 3600, lessons: 72, students: 21 },
    { month: 'May', revenue: 3800, lessons: 76, students: 22 },
    { month: 'Jun', revenue: 4000, lessons: 80, students: 23 },
    { month: 'Jul', revenue: 3900, lessons: 78, students: 24 },
    { month: 'Aug', revenue: 4200, lessons: 84, students: 24 },
    { month: 'Sep', revenue: 4100, lessons: 82, students: 25 },
    { month: 'Oct', revenue: 4300, lessons: 86, students: 25 },
    { month: 'Nov', revenue: 4000, lessons: 80, students: 24 },
    { month: 'Dec', revenue: 3200, lessons: 64, students: 22 }
  ],
  paymentMethodBreakdown: [
    { method: 'Card', amount: 18500, percentage: 40.5, count: 145 },
    { method: 'Cash', amount: 13600, percentage: 29.8, count: 98 },
    { method: 'Bank Transfer', amount: 9200, percentage: 20.1, count: 67 },
    { method: 'Check', amount: 4380, percentage: 9.6, count: 32 }
  ]
};

export const studentAnalytics: StudentAnalytics = {
  totalStudents: 28,
  activeStudents: 24,
  newStudentsThisMonth: 3,
  studentRetentionRate: 89.2,
  averageLessonsPerStudent: 3.2,
  studentGrowthData: [
    { month: 'Jan', newStudents: 2, totalStudents: 18, churnedStudents: 1 },
    { month: 'Feb', newStudents: 3, totalStudents: 19, churnedStudents: 0 },
    { month: 'Mar', newStudents: 2, totalStudents: 20, churnedStudents: 1 },
    { month: 'Apr', newStudents: 4, totalStudents: 21, churnedStudents: 0 },
    { month: 'May', newStudents: 3, totalStudents: 22, churnedStudents: 2 },
    { month: 'Jun', newStudents: 2, totalStudents: 23, churnedStudents: 1 },
    { month: 'Jul', newStudents: 3, totalStudents: 24, churnedStudents: 0 },
    { month: 'Aug', newStudents: 1, totalStudents: 24, churnedStudents: 1 },
    { month: 'Sep', newStudents: 4, totalStudents: 25, churnedStudents: 0 },
    { month: 'Oct', newStudents: 2, totalStudents: 25, churnedStudents: 2 },
    { month: 'Nov', newStudents: 1, totalStudents: 24, churnedStudents: 2 },
    { month: 'Dec', newStudents: 3, totalStudents: 22, churnedStudents: 5 }
  ],
  instrumentBreakdown: [
    { instrument: 'Piano', count: 12, percentage: 42.9, revenue: 19600 },
    { instrument: 'Guitar', count: 8, percentage: 28.6, revenue: 12800 },
    { instrument: 'Voice', count: 5, percentage: 17.9, revenue: 9500 },
    { instrument: 'Violin', count: 3, percentage: 10.7, revenue: 3780 }
  ],
  levelDistribution: [
    { level: 'Beginner', count: 14, percentage: 50.0 },
    { level: 'Intermediate', count: 10, percentage: 35.7 },
    { level: 'Advanced', count: 4, percentage: 14.3 }
  ]
};

export const lessonAnalytics: LessonAnalytics = {
  totalLessons: 892,
  completedLessons: 798,
  cancelledLessons: 94,
  attendanceRate: 89.5,
  averageLessonDuration: 58.5,
  lessonTrends: [
    { month: 'Jan', completed: 56, cancelled: 8, scheduled: 64 },
    { month: 'Feb', completed: 62, cancelled: 6, scheduled: 68 },
    { month: 'Mar', completed: 68, cancelled: 4, scheduled: 72 },
    { month: 'Apr', completed: 72, cancelled: 8, scheduled: 80 },
    { month: 'May', completed: 76, cancelled: 4, scheduled: 80 },
    { month: 'Jun', completed: 80, cancelled: 6, scheduled: 86 },
    { month: 'Jul', completed: 78, cancelled: 10, scheduled: 88 },
    { month: 'Aug', completed: 84, cancelled: 8, scheduled: 92 },
    { month: 'Sep', completed: 82, cancelled: 6, scheduled: 88 },
    { month: 'Oct', completed: 86, cancelled: 12, scheduled: 98 },
    { month: 'Nov', completed: 80, cancelled: 8, scheduled: 88 },
    { month: 'Dec', completed: 64, cancelled: 14, scheduled: 78 }
  ],
  peakHours: [
    { hour: '9:00 AM', lessons: 45, utilization: 78 },
    { hour: '10:00 AM', lessons: 52, utilization: 89 },
    { hour: '3:00 PM', lessons: 68, utilization: 95 },
    { hour: '4:00 PM', lessons: 72, utilization: 98 },
    { hour: '5:00 PM', lessons: 65, utilization: 92 },
    { hour: '6:00 PM', lessons: 58, utilization: 85 },
    { hour: '7:00 PM', lessons: 42, utilization: 72 }
  ]
};

export const progressAnalytics: ProgressAnalytics = {
  totalGoals: 156,
  completedGoals: 89,
  goalCompletionRate: 57.1,
  averageProgressScore: 4.2,
  progressTrends: [
    { month: 'Jan', averageScore: 3.8, goalsCompleted: 6, goalsSet: 12 },
    { month: 'Feb', averageScore: 4.0, goalsCompleted: 8, goalsSet: 14 },
    { month: 'Mar', averageScore: 4.1, goalsCompleted: 9, goalsSet: 15 },
    { month: 'Apr', averageScore: 4.3, goalsCompleted: 11, goalsSet: 16 },
    { month: 'May', averageScore: 4.2, goalsCompleted: 10, goalsSet: 18 },
    { month: 'Jun', averageScore: 4.4, goalsCompleted: 12, goalsSet: 19 },
    { month: 'Jul', averageScore: 4.3, goalsCompleted: 11, goalsSet: 17 },
    { month: 'Aug', averageScore: 4.5, goalsCompleted: 13, goalsSet: 20 },
    { month: 'Sep', averageScore: 4.4, goalsCompleted: 12, goalsSet: 18 },
    { month: 'Oct', averageScore: 4.6, goalsCompleted: 14, goalsSet: 21 },
    { month: 'Nov', averageScore: 4.3, goalsCompleted: 10, goalsSet: 16 },
    { month: 'Dec', averageScore: 4.1, goalsCompleted: 8, goalsSet: 14 }
  ],
  topPerformingStudents: [
    { studentName: 'Sarah Williams', instrument: 'Voice', progressScore: 4.9, goalsCompleted: 8, lessonsAttended: 24 },
    { studentName: 'Emma Johnson', instrument: 'Piano', progressScore: 4.7, goalsCompleted: 6, lessonsAttended: 22 },
    { studentName: 'Michael Chen', instrument: 'Guitar', progressScore: 4.5, goalsCompleted: 5, lessonsAttended: 20 },
    { studentName: 'Jessica Martinez', instrument: 'Violin', progressScore: 4.4, goalsCompleted: 4, lessonsAttended: 18 },
    { studentName: 'David Brown', instrument: 'Piano', progressScore: 4.2, goalsCompleted: 3, lessonsAttended: 16 }
  ]
};

export const businessInsights: BusinessInsights = {
  keyMetrics: [
    {
      id: '1',
      title: 'Revenue Growth',
      value: '+12.5%',
      change: 12.5,
      trend: 'up',
      description: 'Monthly revenue growth compared to last year'
    },
    {
      id: '2',
      title: 'Student Retention',
      value: '89.2%',
      change: 2.1,
      trend: 'up',
      description: 'Students continuing lessons month-over-month'
    },
    {
      id: '3',
      title: 'Lesson Attendance',
      value: '89.5%',
      change: -1.2,
      trend: 'down',
      description: 'Percentage of scheduled lessons completed'
    },
    {
      id: '4',
      title: 'Goal Completion',
      value: '57.1%',
      change: 4.3,
      trend: 'up',
      description: 'Student goals achieved within target timeframe'
    }
  ],
  recommendations: [
    {
      id: '1',
      title: 'Optimize Peak Hours',
      description: 'Consider adding more lesson slots during 3-5 PM when demand is highest. This could increase revenue by 15-20%.',
      priority: 'high',
      category: 'revenue'
    },
    {
      id: '2',
      title: 'Reduce Cancellations',
      description: 'Implement a 24-hour cancellation policy and send automated reminders to reduce the 10.5% cancellation rate.',
      priority: 'medium',
      category: 'operations'
    },
    {
      id: '3',
      title: 'Expand Guitar Program',
      description: 'Guitar shows strong demand (28.6% of students) but lower revenue per student. Consider premium guitar packages.',
      priority: 'medium',
      category: 'revenue'
    },
    {
      id: '4',
      title: 'Student Referral Program',
      description: 'With 89.2% retention rate, satisfied students could be your best marketing channel. Implement referral incentives.',
      priority: 'high',
      category: 'marketing'
    }
  ],
  alerts: [
    {
      id: '1',
      title: 'December Revenue Drop',
      message: 'Revenue decreased by 20% in December due to holiday cancellations. Plan ahead for next year.',
      type: 'warning',
      date: '2024-01-02'
    },
    {
      id: '2',
      title: 'High Performer Recognition',
      message: 'Sarah Williams achieved a 4.9/5 progress score. Consider featuring her success story.',
      type: 'success',
      date: '2024-01-15'
    },
    {
      id: '3',
      title: 'Payment Method Trend',
      message: 'Card payments increased to 40.5% of transactions. Consider digital payment incentives.',
      type: 'info',
      date: '2024-01-10'
    }
  ]
};