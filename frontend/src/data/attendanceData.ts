import { AttendanceRecord, AttendanceSummary } from '@/types/attendance';

export const attendanceRecords: AttendanceRecord[] = [
  {
    id: 1,
    studentId: 1,
    studentName: 'Emma Johnson',
    lessonId: 101,
    date: '2024-01-20',
    startTime: '14:00',
    endTime: '15:00',
    status: 'present',
    arrivalTime: '13:58',
    notes: 'On time and prepared for singles practice',
    makeupRequired: false
  },
  {
    id: 2,
    studentId: 1,
    studentName: 'Emma Johnson',
    lessonId: 102,
    date: '2024-01-13',
    startTime: '14:00',
    endTime: '15:00',
    status: 'late',
    arrivalTime: '14:10',
    notes: 'Traffic delay, stayed 10 minutes extra to complete session',
    makeupRequired: false
  },
  {
    id: 3,
    studentId: 2,
    studentName: 'Michael Chen',
    lessonId: 103,
    date: '2024-01-22',
    startTime: '15:30',
    endTime: '16:30',
    status: 'present',
    arrivalTime: '15:25',
    notes: 'Great doubles strategy session, very focused',
    makeupRequired: false
  },
  {
    id: 4,
    studentId: 2,
    studentName: 'Michael Chen',
    lessonId: 104,
    date: '2024-01-15',
    startTime: '15:30',
    endTime: '16:30',
    status: 'absent',
    notes: 'Sick with flu, makeup session scheduled',
    makeupRequired: true,
    makeupScheduled: '2024-01-17'
  },
  {
    id: 5,
    studentId: 3,
    studentName: 'Sarah Williams',
    lessonId: 105,
    date: '2024-01-19',
    startTime: '10:00',
    endTime: '11:00',
    status: 'present',
    arrivalTime: '09:55',
    notes: 'Always punctual and well-prepared for tournament training',
    makeupRequired: false
  }
];

export const attendanceSummaries: AttendanceSummary[] = [
  {
    studentId: 1,
    studentName: 'Emma Johnson',
    instrument: 'Singles Play',
    stats: {
      totalLessons: 24,
      attendedLessons: 22,
      missedLessons: 2,
      lateArrivals: 3,
      attendanceRate: 91.7,
      punctualityRate: 86.4
    },
    recentAttendance: attendanceRecords.filter(r => r.studentId === 1).slice(0, 5),
    trends: {
      improving: true,
      consistent: true,
      needsAttention: false
    }
  },
  {
    studentId: 2,
    studentName: 'Michael Chen',
    instrument: 'Doubles Play',
    stats: {
      totalLessons: 12,
      attendedLessons: 10,
      missedLessons: 2,
      lateArrivals: 1,
      attendanceRate: 83.3,
      punctualityRate: 90.0
    },
    recentAttendance: attendanceRecords.filter(r => r.studentId === 2).slice(0, 5),
    trends: {
      improving: false,
      consistent: false,
      needsAttention: true
    }
  },
  {
    id: 3,
    studentName: 'Sarah Williams',
    instrument: 'Tournament Prep',
    stats: {
      totalLessons: 45,
      attendedLessons: 44,
      missedLessons: 1,
      lateArrivals: 0,
      attendanceRate: 97.8,
      punctualityRate: 100.0
    },
    recentAttendance: attendanceRecords.filter(r => r.studentId === 3).slice(0, 5),
    trends: {
      improving: true,
      consistent: true,
      needsAttention: false
    }
  }
];