export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  playStyle: string;
  level: string;
  status: 'Active' | 'Inactive';
  joinDate: string;
  lastSession: string | null;
  nextSession: string | null;
  totalSessions: number;
  address: string;
  notes: string;
  goals: string[];
  guardians?: Guardian[];
}

export interface Guardian {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  studentId: number;
}

export interface Session { // Changed from 'Lesson' to 'Session'
  id: number;
  student: string;
  time: string;
  date: string;
  type: string;
}

export interface Activity {
  id: number;
  action: string;
  student: string;
  time: string;
}

export interface Stats {
  totalRevenue: number;
  monthlyRevenue: number;
  totalStudents: number;
  activeStudents: number;
  upcomingSessions: number; // Changed from 'upcomingLessons' to 'upcomingSessions'
  completedSessions: number; // Changed from 'completedLessons' to 'completedSessions'
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: any;
}