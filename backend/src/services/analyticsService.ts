import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface AnalyticsOverview {
  totalStudents: number;
  activeStudents: number;
  totalSessions: number;
  completedSessions: number;
  totalRevenue: number;
  monthlyRevenue: number;
  averageAttendanceRate: number;
  overdueInvoices: number;
}

export interface RevenueData {
  date: string;
  revenue: number;
  invoiceCount: number;
  paymentCount: number;
}

export interface StudentGrowthData {
  date: string;
  totalStudents: number;
  newStudents: number;
  activeStudents: number;
}

export interface SessionAnalytics {
  date: string;
  totalSessions: number;
  completedSessions: number;
  cancelledSessions: number;
  noShowSessions: number;
  attendanceRate: number;
}

export interface TopPerformingStudents {
  studentId: number;
  studentName: string;
  totalSessions: number;
  attendanceRate: number;
  averageRating: number;
  progressScore: number;
}

export class AnalyticsService {
  // Get analytics overview
  static async getOverview(): Promise<AnalyticsOverview> {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    // Get student counts
    const totalStudents = await prisma.student.count();
    const activeStudents = await prisma.student.count({
      where: { status: 'Active' }
    });

    // Get session counts
    const totalSessions = await prisma.session.count();
    const completedSessions = await prisma.session.count({
      where: { status: 'completed' }
    });

    // Get revenue data
    const totalRevenueResult = await prisma.payment.aggregate({
      where: { status: 'completed' },
      _sum: { amount: true }
    });

    const monthlyRevenueResult = await prisma.payment.aggregate({
      where: {
        status: 'completed',
        createdAt: { gte: startOfMonth }
      },
      _sum: { amount: true }
    });

    // Get attendance rate
    const attendanceRecords = await prisma.attendanceRecord.findMany({
      where: {
        createdAt: { gte: startOfYear }
      }
    });

    const totalAttendanceRecords = attendanceRecords.length;
    const presentRecords = attendanceRecords.filter(record => record.status === 'present').length;
    const averageAttendanceRate = totalAttendanceRecords > 0 
      ? (presentRecords / totalAttendanceRecords) * 100 
      : 0;

    // Get overdue invoices count
    const overdueInvoices = await prisma.invoice.count({
      where: {
        status: { in: ['sent', 'overdue'] },
        dueDate: { lt: now }
      }
    });

    return {
      totalStudents,
      activeStudents,
      totalSessions,
      completedSessions,
      totalRevenue: totalRevenueResult._sum.amount || 0,
      monthlyRevenue: monthlyRevenueResult._sum.amount || 0,
      averageAttendanceRate: Math.round(averageAttendanceRate * 100) / 100,
      overdueInvoices
    };
  }

  // Get revenue analytics
  static async getRevenueAnalytics(
    startDate: Date, 
    endDate: Date, 
    groupBy: 'day' | 'week' | 'month' = 'day'
  ): Promise<RevenueData[]> {
    const payments = await prisma.payment.findMany({
      where: {
        status: 'completed',
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      },
      include: {
        invoice: true
      },
      orderBy: { createdAt: 'asc' }
    });

    const invoices = await prisma.invoice.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      },
      orderBy: { createdAt: 'asc' }
    });

    // Group data by the specified period
    const groupedData = new Map<string, {
      revenue: number;
      invoiceCount: number;
      paymentCount: number;
    }>();

    // Process payments
    payments.forEach(payment => {
      const dateKey = this.getDateKey(payment.createdAt, groupBy);
      const existing = groupedData.get(dateKey) || { revenue: 0, invoiceCount: 0, paymentCount: 0 };
      existing.revenue += payment.amount;
      existing.paymentCount += 1;
      groupedData.set(dateKey, existing);
    });

    // Process invoices
    invoices.forEach(invoice => {
      const dateKey = this.getDateKey(invoice.createdAt, groupBy);
      const existing = groupedData.get(dateKey) || { revenue: 0, invoiceCount: 0, paymentCount: 0 };
      existing.invoiceCount += 1;
      groupedData.set(dateKey, existing);
    });

    // Convert to array and sort
    return Array.from(groupedData.entries())
      .map(([date, data]) => ({
        date,
        revenue: data.revenue,
        invoiceCount: data.invoiceCount,
        paymentCount: data.paymentCount
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  // Get student growth analytics
  static async getStudentGrowthAnalytics(
    startDate: Date, 
    endDate: Date, 
    groupBy: 'day' | 'week' | 'month' = 'day'
  ): Promise<StudentGrowthData[]> {
    const students = await prisma.student.findMany({
      where: {
        createdAt: {
          lte: endDate
        }
      },
      orderBy: { createdAt: 'asc' }
    });

    // Group data by the specified period
    const groupedData = new Map<string, {
      totalStudents: number;
      newStudents: number;
      activeStudents: number;
    }>();

    // Generate date range
    const dateRange = this.generateDateRange(startDate, endDate, groupBy);
    
    dateRange.forEach(date => {
      const dateKey = this.getDateKey(date, groupBy);
      const studentsUpToDate = students.filter(s => s.createdAt <= date);
      const newStudentsInPeriod = students.filter(s => {
        const studentDateKey = this.getDateKey(s.createdAt, groupBy);
        return studentDateKey === dateKey;
      });
      const activeStudentsAtDate = studentsUpToDate.filter(s => s.status === 'Active');

      groupedData.set(dateKey, {
        totalStudents: studentsUpToDate.length,
        newStudents: newStudentsInPeriod.length,
        activeStudents: activeStudentsAtDate.length
      });
    });

    return Array.from(groupedData.entries())
      .map(([date, data]) => ({
        date,
        totalStudents: data.totalStudents,
        newStudents: data.newStudents,
        activeStudents: data.activeStudents
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  // Get session analytics
  static async getSessionAnalytics(
    startDate: Date, 
    endDate: Date, 
    groupBy: 'day' | 'week' | 'month' = 'day'
  ): Promise<SessionAnalytics[]> {
    const sessions = await prisma.session.findMany({
      where: {
        startTime: {
          gte: startDate,
          lte: endDate
        }
      },
      include: {
        attendanceRecords: true
      },
      orderBy: { startTime: 'asc' }
    });

    // Group data by the specified period
    const groupedData = new Map<string, {
      totalSessions: number;
      completedSessions: number;
      cancelledSessions: number;
      noShowSessions: number;
      totalAttendanceRecords: number;
      presentRecords: number;
    }>();

    sessions.forEach(session => {
      const dateKey = this.getDateKey(session.startTime, groupBy);
      const existing = groupedData.get(dateKey) || {
        totalSessions: 0,
        completedSessions: 0,
        cancelledSessions: 0,
        noShowSessions: 0,
        totalAttendanceRecords: 0,
        presentRecords: 0
      };

      existing.totalSessions += 1;
      if (session.status === 'completed') existing.completedSessions += 1;
      if (session.status === 'cancelled') existing.cancelledSessions += 1;
      if (session.status === 'no-show') existing.noShowSessions += 1;

      // Count attendance
      existing.totalAttendanceRecords += session.attendanceRecords.length;
      existing.presentRecords += session.attendanceRecords.filter(r => r.status === 'present').length;

      groupedData.set(dateKey, existing);
    });

    return Array.from(groupedData.entries())
      .map(([date, data]) => ({
        date,
        totalSessions: data.totalSessions,
        completedSessions: data.completedSessions,
        cancelledSessions: data.cancelledSessions,
        noShowSessions: data.noShowSessions,
        attendanceRate: data.totalAttendanceRecords > 0 
          ? Math.round((data.presentRecords / data.totalAttendanceRecords) * 10000) / 100
          : 0
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  // Get top performing students
  static async getTopPerformingStudents(limit: number = 10): Promise<TopPerformingStudents[]> {
    const students = await prisma.student.findMany({
      where: { status: 'Active' },
      include: {
        sessions: {
          include: {
            attendanceRecords: true
          }
        },
        practiceLog: true,
        skillAssessments: true
      }
    });

    const studentPerformance = students.map(student => {
      const totalSessions = student.sessions.length;
      const attendedSessions = student.sessions.filter(session => 
        session.attendanceRecords.some(record => record.status === 'present')
      ).length;
      const attendanceRate = totalSessions > 0 ? (attendedSessions / totalSessions) * 100 : 0;

      // Calculate average skill rating
      const skillRatings = student.skillAssessments.map(assessment => assessment.rating);
      const averageRating = skillRatings.length > 0 
        ? skillRatings.reduce((sum, rating) => sum + rating, 0) / skillRatings.length 
        : 0;

      // Calculate progress score (combination of attendance, practice, and skill improvement)
      const practiceScore = student.practiceLog.length * 2; // 2 points per practice session
      const skillScore = averageRating * 10; // Scale skill rating
      const attendanceScore = attendanceRate; // Attendance percentage
      const progressScore = (practiceScore + skillScore + attendanceScore) / 3;

      return {
        studentId: student.id,
        studentName: `${student.firstName} ${student.lastName}`,
        totalSessions,
        attendanceRate: Math.round(attendanceRate * 100) / 100,
        averageRating: Math.round(averageRating * 100) / 100,
        progressScore: Math.round(progressScore * 100) / 100
      };
    });

    return studentPerformance
      .sort((a, b) => b.progressScore - a.progressScore)
      .slice(0, limit);
  }

  // Store analytics snapshot
  static async storeAnalyticsSnapshot(metric: string, value: number, metadata?: any): Promise<void> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await prisma.analyticsSnapshot.upsert({
      where: {
        date_metric: {
          date: today,
          metric: metric
        }
      },
      update: {
        value: value,
        metadata: metadata ? JSON.stringify(metadata) : null
      },
      create: {
        date: today,
        metric: metric,
        value: value,
        metadata: metadata ? JSON.stringify(metadata) : null
      }
    });
  }

  // Get analytics snapshots
  static async getAnalyticsSnapshots(
    metric: string, 
    startDate: Date, 
    endDate: Date
  ): Promise<{ date: Date; value: number; metadata?: any }[]> {
    const snapshots = await prisma.analyticsSnapshot.findMany({
      where: {
        metric: metric,
        date: {
          gte: startDate,
          lte: endDate
        }
      },
      orderBy: { date: 'asc' }
    });

    return snapshots.map(snapshot => ({
      date: snapshot.date,
      value: snapshot.value,
      metadata: snapshot.metadata ? JSON.parse(snapshot.metadata) : undefined
    }));
  }

  // Helper methods
  private static getDateKey(date: Date, groupBy: 'day' | 'week' | 'month'): string {
    switch (groupBy) {
      case 'day':
        return date.toISOString().split('T')[0]!;
      case 'week':
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        return weekStart.toISOString().split('T')[0]!;
      case 'month':
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      default:
        return date.toISOString().split('T')[0]!;
    }
  }

  private static generateDateRange(startDate: Date, endDate: Date, groupBy: 'day' | 'week' | 'month'): Date[] {
    const dates: Date[] = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      dates.push(new Date(current));
      
      switch (groupBy) {
        case 'day':
          current.setDate(current.getDate() + 1);
          break;
        case 'week':
          current.setDate(current.getDate() + 7);
          break;
        case 'month':
          current.setMonth(current.getMonth() + 1);
          break;
      }
    }

    return dates;
  }
}