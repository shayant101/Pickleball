import { PrismaClient, PracticeLog } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreatePracticeLogData {
  date: Date;
  duration: number; // Duration in minutes
  type: 'solo' | 'group' | 'match' | 'drill';
  focus?: string | null;
  notes?: string | null;
  rating?: number | null; // 1-5 self-rating
  studentId: number;
}

export interface UpdatePracticeLogData {
  date?: Date;
  duration?: number;
  type?: 'solo' | 'group' | 'match' | 'drill';
  focus?: string | null;
  notes?: string | null;
  rating?: number | null;
}

export interface PracticeLogWithRelations extends PracticeLog {
  student: {
    firstName: string;
    lastName: string;
  };
}

export class PracticeLogService {
  // Create a new practice log
  static async createPracticeLog(data: CreatePracticeLogData): Promise<PracticeLogWithRelations> {
    // Validate rating if provided
    if (data.rating !== undefined && data.rating !== null) {
      if (data.rating < 1 || data.rating > 5) {
        throw new Error('Rating must be between 1 and 5');
      }
    }

    const createData: any = {
      date: data.date,
      duration: data.duration,
      type: data.type,
      studentId: data.studentId
    };

    if (data.focus !== undefined) createData.focus = data.focus;
    if (data.notes !== undefined) createData.notes = data.notes;
    if (data.rating !== undefined) createData.rating = data.rating;

    return await prisma.practiceLog.create({
      data: createData,
      include: {
        student: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    });
  }

  // Get practice logs for a student
  static async getStudentPracticeLogs(
    studentId: number,
    options?: {
      startDate?: Date;
      endDate?: Date;
      type?: 'solo' | 'group' | 'match' | 'drill';
      limit?: number;
      offset?: number;
    }
  ): Promise<PracticeLogWithRelations[]> {
    const { startDate, endDate, type, limit, offset } = options || {};

    const where: any = { studentId };

    // Date filtering
    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = startDate;
      if (endDate) where.date.lte = endDate;
    }

    if (type) where.type = type;

    const queryOptions: any = {
      where,
      include: {
        student: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      },
      orderBy: {
        date: 'desc'
      }
    };

    if (limit !== undefined) queryOptions.take = limit;
    if (offset !== undefined) queryOptions.skip = offset;

    return await prisma.practiceLog.findMany(queryOptions) as PracticeLogWithRelations[];
  }

  // Get a specific practice log by ID
  static async getPracticeLogById(id: number): Promise<PracticeLogWithRelations | null> {
    return await prisma.practiceLog.findUnique({
      where: { id },
      include: {
        student: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    });
  }

  // Update a practice log
  static async updatePracticeLog(
    id: number,
    data: UpdatePracticeLogData
  ): Promise<PracticeLogWithRelations | null> {
    try {
      // Validate rating if provided
      if (data.rating !== undefined && data.rating !== null) {
        if (data.rating < 1 || data.rating > 5) {
          throw new Error('Rating must be between 1 and 5');
        }
      }

      const updateData: any = {};

      if (data.date !== undefined) updateData.date = data.date;
      if (data.duration !== undefined) updateData.duration = data.duration;
      if (data.type !== undefined) updateData.type = data.type;
      if (data.focus !== undefined) updateData.focus = data.focus;
      if (data.notes !== undefined) updateData.notes = data.notes;
      if (data.rating !== undefined) updateData.rating = data.rating;

      return await prisma.practiceLog.update({
        where: { id },
        data: updateData,
        include: {
          student: {
            select: {
              firstName: true,
              lastName: true
            }
          }
        }
      });
    } catch (error) {
      return null;
    }
  }

  // Delete a practice log
  static async deletePracticeLog(id: number): Promise<boolean> {
    try {
      await prisma.practiceLog.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  // Get practice log statistics
  static async getPracticeLogStats(studentId: number, startDate?: Date, endDate?: Date) {
    const where: any = { studentId };

    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = startDate;
      if (endDate) where.date.lte = endDate;
    }

    const totalLogs = await prisma.practiceLog.count({ where });

    // Get total practice time
    const logs = await prisma.practiceLog.findMany({
      where,
      select: { duration: true, rating: true, type: true }
    });

    const totalMinutes = logs.reduce((sum, log) => sum + log.duration, 0);
    const totalHours = Math.round((totalMinutes / 60) * 10) / 10; // Round to 1 decimal

    // Calculate average rating
    const ratedLogs = logs.filter(log => log.rating !== null);
    const averageRating = ratedLogs.length > 0
      ? Math.round((ratedLogs.reduce((sum, log) => sum + (log.rating || 0), 0) / ratedLogs.length) * 10) / 10
      : null;

    // Get practice by type
    const practiceByType = logs.reduce((acc, log) => {
      acc[log.type] = (acc[log.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Get recent practice trend (last 30 days vs previous 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);

    const recentLogs = await prisma.practiceLog.count({
      where: {
        studentId,
        date: { gte: thirtyDaysAgo }
      }
    });

    const previousLogs = await prisma.practiceLog.count({
      where: {
        studentId,
        date: { gte: sixtyDaysAgo, lt: thirtyDaysAgo }
      }
    });

    let trend: 'increasing' | 'decreasing' | 'stable' = 'stable';
    if (recentLogs > previousLogs) {
      trend = 'increasing';
    } else if (recentLogs < previousLogs) {
      trend = 'decreasing';
    }

    return {
      totalLogs,
      totalMinutes,
      totalHours,
      averageRating,
      practiceByType,
      recentTrend: trend,
      recentLogsCount: recentLogs,
      previousLogsCount: previousLogs
    };
  }

  // Get practice logs summary by date range
  static async getPracticeLogsSummary(
    studentId: number,
    startDate: Date,
    endDate: Date
  ) {
    const logs = await prisma.practiceLog.findMany({
      where: {
        studentId,
        date: {
          gte: startDate,
          lte: endDate
        }
      },
      select: {
        date: true,
        duration: true,
        type: true,
        rating: true
      },
      orderBy: {
        date: 'asc'
      }
    });

    // Group by date
    const dailySummary: Record<string, any> = {};
    
    logs.forEach(log => {
      const dateKey: string = log.date.toISOString().split('T')[0]!;
      if (!dailySummary[dateKey]) {
        dailySummary[dateKey] = {
          date: dateKey,
          totalDuration: 0,
          sessionCount: 0,
          averageRating: 0,
          types: {} as Record<string, number>
        };
      }

      const summary = dailySummary[dateKey];
      summary.totalDuration += log.duration;
      summary.sessionCount += 1;
      summary.types[log.type] = (summary.types[log.type] || 0) + 1;
    });

    // Calculate average ratings for each day
    Object.keys(dailySummary).forEach(dateKey => {
      const dayLogs = logs.filter(log => log.date.toISOString().split('T')[0] === dateKey);
      const ratedLogs = dayLogs.filter(log => log.rating !== null);
      
      if (ratedLogs.length > 0) {
        dailySummary[dateKey].averageRating = Math.round(
          (ratedLogs.reduce((sum, log) => sum + (log.rating || 0), 0) / ratedLogs.length) * 10
        ) / 10;
      }
    });

    return Object.values(dailySummary);
  }

  // Get most recent practice logs
  static async getRecentPracticeLogs(
    studentId: number,
    limit: number = 10
  ): Promise<PracticeLogWithRelations[]> {
    return await prisma.practiceLog.findMany({
      where: { studentId },
      include: {
        student: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      },
      orderBy: {
        date: 'desc'
      },
      take: limit
    });
  }
}