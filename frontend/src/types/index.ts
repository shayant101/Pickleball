export interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  instrument: string;
  level: string;
  status: 'Active' | 'Inactive';
  joinDate: string;
  lastLesson: string;
  nextLesson: string | null;
  totalLessons: number;
  parentName: string | null;
  parentEmail: string | null;
  parentPhone: string | null;
  address: string;
  notes: string;
  goals: string[];
  avatar: string | null;
}

export interface Lesson {
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
  upcomingLessons: number;
  completedLessons: number;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: any;
}