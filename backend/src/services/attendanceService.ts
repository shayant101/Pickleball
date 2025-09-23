import { PrismaClient, AttendanceRecord } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateAttendanceData {
  sessionId: number;
  studentId: number;
  status: 'present' | 'absent' | 'late';
  arrivalTime?: Date | null;
  notes?: string | null;
}

export interface UpdateAttendanceData {
  status?: 'present' | 'absent' | 'late';
  arrivalTime?: Date;
  notes?: string;
}

export interface AttendanceSummary {
  studentId: number;
  studentName: string;
  totalSessions: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  attendanceRate: number;
  punctualityRate: number;
  recentTrend: 'improving' | 'declining' | 'stable';
}

export class AttendanceService {
  // Mark attendance for a session
  static async markAttendance(data: CreateAttendanceData): Promise<AttendanceRecord> {
    // Check if attendance record already exists
    const existingRecord = await prisma.attendanceRecord.findUnique({
      where: {
        sessionId_studentId: {
          sessionId: data.sessionId,
          studentId: data.studentId
        }
      }
    });

    if (existingRecord) {
      throw new Error('Attendance already marked for this session');
    }

    // Validate session exists and belongs to student
    const session = await prisma.session.findFirst({
      where: {
        id: data.sessionId,
        studentId: data.studentId
      }
    });

    if (!session) {
      throw new Error('Session not found or does not belong to student');
    }

    const createData: any = {
      sessionId: data.sessionId,
      studentId: data.studentId,
      status: data.status
    };

    if (data.arrivalTime !== undefined) {
      createData.arrivalTime = data.arrivalTime;
    }

    if (data.notes !== undefined) {
      createData.notes = data.notes;
    }

    return await prisma.attendanceRecord.create({
      data: createData,
      include: {
        session: {
          select: {
            title: true,
            startTime: true,
            endTime: true
          }
        },
        student: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    });
  }

  // Update attendance record
  static async updateAttendance(
    sessionId: number,
    studentId: number,
    data: UpdateAttendanceData
  ): Promise<AttendanceRecord | null> {
    try {
      return await prisma.attendanceRecord.update({
        where: {
          sessionId_studentId: {
            sessionId,
            studentId
          }
        },
        data,
        include: {
          session: {
            select: {
              title: true,
              startTime: true,
              endTime: true
            }
          },
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

  // Get attendance records for a student
  static async getStudentAttendance(
    studentId: number,
    startDate?: Date,
    endDate?: Date
  ): Promise<AttendanceRecord[]> {
    const where: any = { studentId };

    if (startDate || endDate) {
      where.session = {};
      if (startDate) {
        where.session.startTime = { gte: startDate };
      }
      if (endDate) {
        where.session.endTime = { lte: endDate };
      }
    }

    return await prisma.attendanceRecord.findMany({
      where,
      include: {
        session: {
          select: {
            title: true,
            startTime: true,
            endTime: true,
            status: true
          }
        }
      },
      orderBy: {
        session: {
          startTime: 'desc'
        }
      }
    });
  }

  // Get attendance records for a session
  static async getSessionAttendance(sessionId: number): Promise<AttendanceRecord[]> {
    return await prisma.attendanceRecord.findMany({
      where: { sessionId },
      include: {
        student: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      },
      orderBy: {
        student: {
          lastName: 'asc'
        }
      }
    });
  }

  // Calculate attendance summary for students
  static async getAttendanceSummary(
    studentIds?: number[],
    startDate?: Date,
    endDate?: Date
  ): Promise<AttendanceSummary[]> {
    const where: any = {};
    
    if (studentIds && studentIds.length > 0) {
      where.studentId = { in: studentIds };
    }

    if (startDate || endDate) {
      where.session = {};
      if (startDate) {
        where.session.startTime = { gte: startDate };
      }
      if (endDate) {
        where.session.endTime = { lte: endDate };
      }
    }

    const attendanceRecords = await prisma.attendanceRecord.findMany({
      where,
      include: {
        student: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        },
        session: {
          select: {
            startTime: true
          }
        }
      },
      orderBy: {
        session: {
          startTime: 'asc'
        }
      }
    });

    // Group by student and calculate statistics
    const studentStats = new Map<number, {
      student: { id: number; firstName: string; lastName: string };
      records: Array<{ status: string; sessionDate: Date }>;
    }>();

    attendanceRecords.forEach(record => {
      const studentId = record.studentId;
      if (!studentStats.has(studentId)) {
        studentStats.set(studentId, {
          student: record.student,
          records: []
        });
      }
      studentStats.get(studentId)!.records.push({
        status: record.status,
        sessionDate: record.session.startTime
      });
    });

    const summaries: AttendanceSummary[] = [];

    for (const [studentId, data] of studentStats) {
      const { student, records } = data;
      const totalSessions = records.length;
      const presentCount = records.filter(r => r.status === 'present').length;
      const absentCount = records.filter(r => r.status === 'absent').length;
      const lateCount = records.filter(r => r.status === 'late').length;
      
      const attendanceRate = totalSessions > 0 ? 
        Math.round(((presentCount + lateCount) / totalSessions) * 100) : 0;
      const punctualityRate = totalSessions > 0 ? 
        Math.round((presentCount / totalSessions) * 100) : 0;

      // Calculate trend based on recent sessions (last 5 vs previous 5)
      let recentTrend: 'improving' | 'declining' | 'stable' = 'stable';
      if (records.length >= 6) {
        const recentRecords = records.slice(-5);
        const previousRecords = records.slice(-10, -5);
        
        const recentAttendanceRate = recentRecords.filter(r => r.status !== 'absent').length / recentRecords.length;
        const previousAttendanceRate = previousRecords.filter(r => r.status !== 'absent').length / previousRecords.length;
        
        if (recentAttendanceRate > previousAttendanceRate + 0.1) {
          recentTrend = 'improving';
        } else if (recentAttendanceRate < previousAttendanceRate - 0.1) {
          recentTrend = 'declining';
        }
      }

      summaries.push({
        studentId,
        studentName: `${student.firstName} ${student.lastName}`,
        totalSessions,
        presentCount,
        absentCount,
        lateCount,
        attendanceRate,
        punctualityRate,
        recentTrend
      });
    }

    return summaries.sort((a, b) => a.studentName.localeCompare(b.studentName));
  }

  // Get overall attendance statistics
  static async getOverallStats(startDate?: Date, endDate?: Date) {
    const where: any = {};
    
    if (startDate || endDate) {
      where.session = {};
      if (startDate) {
        where.session.startTime = { gte: startDate };
      }
      if (endDate) {
        where.session.endTime = { lte: endDate };
      }
    }

    const totalRecords = await prisma.attendanceRecord.count({ where });
    const presentRecords = await prisma.attendanceRecord.count({
      where: { ...where, status: 'present' }
    });
    const absentRecords = await prisma.attendanceRecord.count({
      where: { ...where, status: 'absent' }
    });
    const lateRecords = await prisma.attendanceRecord.count({
      where: { ...where, status: 'late' }
    });

    const overallAttendanceRate = totalRecords > 0 ? 
      Math.round(((presentRecords + lateRecords) / totalRecords) * 100) : 0;
    const punctualityRate = totalRecords > 0 ? 
      Math.round((presentRecords / totalRecords) * 100) : 0;

    return {
      totalSessions: totalRecords,
      presentCount: presentRecords,
      absentCount: absentRecords,
      lateCount: lateRecords,
      overallAttendanceRate,
      punctualityRate
    };
  }

  // Delete attendance record
  static async deleteAttendance(sessionId: number, studentId: number): Promise<boolean> {
    try {
      await prisma.attendanceRecord.delete({
        where: {
          sessionId_studentId: {
            sessionId,
            studentId
          }
        }
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}