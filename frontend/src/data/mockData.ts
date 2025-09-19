import { Student, Session, Activity, Stats } from '@/types';

export const stats: Stats = {
  totalRevenue: 12450,
  monthlyRevenue: 3200,
  totalStudents: 24,
  activeStudents: 18,
  upcomingSessions: 8,
  completedSessions: 156
};

export const students: Student[] = [
  {
    id: 1,
    name: 'Emma Johnson',
    email: 'emma.johnson@email.com',
    phone: '(555) 123-4567',
    playStyle: 'Singles Play',
    level: 'Intermediate',
    status: 'Active',
    joinDate: '2024-01-15',
    lastSession: '2024-01-20',
    nextSession: '2024-01-25 2:00 PM',
    totalSessions: 24,
    parentName: 'Sarah Johnson',
    parentEmail: 'sarah.johnson@email.com',
    parentPhone: '(555) 123-4567',
    address: '123 Main St, Anytown, ST 12345',
    notes: 'Very dedicated player. Working on backhand consistency and net play.',
    goals: ['Improve backhand accuracy', 'Master third shot drop', 'Develop net game strategy'],
    avatar: null
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '(555) 234-5678',
    playStyle: 'Doubles Play',
    level: 'Beginner',
    status: 'Active',
    joinDate: '2024-02-01',
    lastSession: '2024-01-22',
    nextSession: '2024-01-26 3:30 PM',
    totalSessions: 12,
    parentName: 'Lisa Chen',
    parentEmail: 'lisa.chen@email.com',
    parentPhone: '(555) 234-5678',
    address: '456 Oak Ave, Anytown, ST 12345',
    notes: 'Enthusiastic beginner. Loves the strategic aspects of doubles play.',
    goals: ['Learn basic serve technique', 'Understand court positioning', 'Develop consistent dinking'],
    avatar: null
  },
  {
    id: 3,
    name: 'Sarah Williams',
    email: 'sarah.williams@email.com',
    phone: '(555) 345-6789',
    playStyle: 'Tournament Prep',
    level: 'Advanced',
    status: 'Active',
    joinDate: '2023-09-10',
    lastSession: '2024-01-19',
    nextSession: '2024-01-27 10:00 AM',
    totalSessions: 45,
    parentName: null,
    parentEmail: null,
    parentPhone: null,
    address: '789 Pine St, Anytown, ST 12345',
    notes: 'Preparing for regional tournaments. Excellent court awareness and shot selection.',
    goals: ['Perfect tournament strategy', 'Improve power shots', 'Master advanced spin techniques'],
    avatar: null
  },
  {
    id: 4,
    name: 'David Brown',
    email: 'david.brown@email.com',
    phone: '(555) 456-7890',
    playStyle: 'Recreational Play',
    level: 'Beginner',
    status: 'Inactive',
    joinDate: '2023-11-20',
    lastSession: '2024-01-10',
    nextSession: null,
    totalSessions: 8,
    parentName: 'Mark Brown',
    parentEmail: 'mark.brown@email.com',
    parentPhone: '(555) 456-7890',
    address: '321 Elm St, Anytown, ST 12345',
    notes: 'Taking a break due to work commitments.',
    goals: ['Learn basic rules', 'Develop consistent serve'],
    avatar: null
  },
  {
    id: 5,
    name: 'Jessica Martinez',
    email: 'jessica.martinez@email.com',
    phone: '(555) 567-8901',
    playStyle: 'Singles & Doubles',
    level: 'Intermediate',
    status: 'Active',
    joinDate: '2024-01-05',
    lastSession: '2024-01-21',
    nextSession: '2024-01-28 4:00 PM',
    totalSessions: 18,
    parentName: 'Maria Martinez',
    parentEmail: 'maria.martinez@email.com',
    parentPhone: '(555) 567-8901',
    address: '654 Maple Dr, Anytown, ST 12345',
    notes: 'Great footwork. Working on shot placement and strategy.',
    goals: ['Improve shot placement', 'Learn advanced serves', 'Prepare for league play'],
    avatar: null
  }
];

export const upcomingSessions: Session[] = [
  { id: 1, student: 'Emma Johnson', time: '2:00 PM', date: 'Today', type: 'Singles Coaching' },
  { id: 2, student: 'Michael Chen', time: '3:30 PM', date: 'Today', type: 'Doubles Strategy' },
  { id: 3, student: 'Sarah Williams', time: '10:00 AM', date: 'Tomorrow', type: 'Tournament Prep' },
  { id: 4, student: 'David Brown', time: '4:00 PM', date: 'Tomorrow', type: 'Fundamentals' }
];

export const recentActivity: Activity[] = [
  { id: 1, action: 'New booking', student: 'Emma Johnson', time: '2 hours ago' },
  { id: 2, action: 'Payment received', student: 'Michael Chen', time: '4 hours ago' },
  { id: 3, action: 'Session completed', student: 'Sarah Williams', time: '1 day ago' },
  { id: 4, action: 'Progress updated', student: 'David Brown', time: '2 days ago' }
];