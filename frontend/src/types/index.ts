export interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  playStyle: string; // Changed from 'instrument' to 'playStyle' for pickleball
  level: string;
  status: 'Active' | 'Inactive';
  joinDate: string;
  lastSession: string; // Changed from 'lastLesson' to 'lastSession'
  nextSession: string | null; // Changed from 'nextLesson' to 'nextSession'
  totalSessions: number; // Changed from 'totalLessons' to 'totalSessions'
  parentName: string | null;
  parentEmail: string | null;
  parentPhone: string | null;
  address: string;
  notes: string;
  goals: string[];
  avatar: string | null;
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