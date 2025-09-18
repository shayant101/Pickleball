export interface RevenueAnalytics {
  totalRevenue: number;
  monthlyRevenue: number;
  yearlyRevenue: number;
  revenueGrowth: number;
  averageMonthlyRevenue: number;
  monthlyData: MonthlyRevenue[];
  paymentMethodBreakdown: PaymentMethodData[];
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  lessons: number;
  students: number;
}

export interface PaymentMethodData {
  method: string;
  amount: number;
  percentage: number;
  count: number;
}

export interface StudentAnalytics {
  totalStudents: number;
  activeStudents: number;
  newStudentsThisMonth: number;
  studentRetentionRate: number;
  averageLessonsPerStudent: number;
  studentGrowthData: StudentGrowthData[];
  instrumentBreakdown: InstrumentData[];
  levelDistribution: LevelData[];
}

export interface StudentGrowthData {
  month: string;
  newStudents: number;
  totalStudents: number;
  churnedStudents: number;
}

export interface InstrumentData {
  instrument: string;
  count: number;
  percentage: number;
  revenue: number;
}

export interface LevelData {
  level: string;
  count: number;
  percentage: number;
}

export interface LessonAnalytics {
  totalLessons: number;
  completedLessons: number;
  cancelledLessons: number;
  attendanceRate: number;
  averageLessonDuration: number;
  lessonTrends: LessonTrendData[];
  peakHours: PeakHourData[];
}

export interface LessonTrendData {
  month: string;
  completed: number;
  cancelled: number;
  scheduled: number;
}

export interface PeakHourData {
  hour: string;
  lessons: number;
  utilization: number;
}

export interface ProgressAnalytics {
  totalGoals: number;
  completedGoals: number;
  goalCompletionRate: number;
  averageProgressScore: number;
  progressTrends: ProgressTrendData[];
  topPerformingStudents: TopStudentData[];
}

export interface ProgressTrendData {
  month: string;
  averageScore: number;
  goalsCompleted: number;
  goalsSet: number;
}

export interface TopStudentData {
  studentName: string;
  instrument: string;
  progressScore: number;
  goalsCompleted: number;
  lessonsAttended: number;
}

export interface BusinessInsights {
  keyMetrics: KeyMetric[];
  recommendations: Recommendation[];
  alerts: BusinessAlert[];
}

export interface KeyMetric {
  id: string;
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  description: string;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: 'revenue' | 'students' | 'operations' | 'marketing';
}

export interface BusinessAlert {
  id: string;
  title: string;
  message: string;
  type: 'warning' | 'info' | 'success' | 'error';
  date: string;
}

export interface AnalyticsFilters {
  dateRange: 'week' | 'month' | 'quarter' | 'year' | 'custom';
  startDate?: string;
  endDate?: string;
  instruments?: string[];
  studentLevels?: string[];
}