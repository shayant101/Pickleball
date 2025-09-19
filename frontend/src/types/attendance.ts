export interface AttendanceRecord {
  id: number;
  studentId: number;
  studentName: string;
  lessonId: number;
  date: string;
  startTime: string;
  endTime: string;
  status: 'present' | 'absent' | 'late' | 'cancelled';
  arrivalTime?: string;
  notes?: string;
  makeupRequired: boolean;
  makeupScheduled?: string;
}

export interface AttendanceStats {
  totalLessons: number;
  attendedLessons: number;
  missedLessons: number;
  lateArrivals: number;
  attendanceRate: number;
  punctualityRate: number;
}

export interface AttendanceSummary {
  studentId: number;
  studentName: string;
  instrument: string;
  stats: AttendanceStats;
  recentAttendance: AttendanceRecord[];
  trends: {
    improving: boolean;
    consistent: boolean;
    needsAttention: boolean;
  };
}