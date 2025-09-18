import { Student, Lesson, Activity, Stats } from '@/types';

export const stats: Stats = {
  totalRevenue: 12450,
  monthlyRevenue: 3200,
  totalStudents: 24,
  activeStudents: 18,
  upcomingLessons: 8,
  completedLessons: 156
};

export const students: Student[] = [
  {
    id: 1,
    name: 'Emma Johnson',
    email: 'emma.johnson@email.com',
    phone: '(555) 123-4567',
    instrument: 'Piano',
    level: 'Intermediate',
    status: 'Active',
    joinDate: '2024-01-15',
    lastLesson: '2024-01-20',
    nextLesson: '2024-01-25 2:00 PM',
    totalLessons: 24,
    parentName: 'Sarah Johnson',
    parentEmail: 'sarah.johnson@email.com',
    parentPhone: '(555) 123-4567',
    address: '123 Main St, Anytown, ST 12345',
    notes: 'Very dedicated student. Working on Bach Inventions.',
    goals: ['Master Bach Invention No. 1', 'Improve sight-reading', 'Learn basic music theory'],
    avatar: null
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '(555) 234-5678',
    instrument: 'Guitar',
    level: 'Beginner',
    status: 'Active',
    joinDate: '2024-02-01',
    lastLesson: '2024-01-22',
    nextLesson: '2024-01-26 3:30 PM',
    totalLessons: 12,
    parentName: 'Lisa Chen',
    parentEmail: 'lisa.chen@email.com',
    parentPhone: '(555) 234-5678',
    address: '456 Oak Ave, Anytown, ST 12345',
    notes: 'Enthusiastic beginner. Loves rock music.',
    goals: ['Learn basic chords', 'Play first song', 'Develop finger strength'],
    avatar: null
  },
  {
    id: 3,
    name: 'Sarah Williams',
    email: 'sarah.williams@email.com',
    phone: '(555) 345-6789',
    instrument: 'Voice',
    level: 'Advanced',
    status: 'Active',
    joinDate: '2023-09-10',
    lastLesson: '2024-01-19',
    nextLesson: '2024-01-27 10:00 AM',
    totalLessons: 45,
    parentName: null,
    parentEmail: null,
    parentPhone: null,
    address: '789 Pine St, Anytown, ST 12345',
    notes: 'Preparing for college auditions. Excellent range.',
    goals: ['Perfect audition pieces', 'Expand repertoire', 'Improve stage presence'],
    avatar: null
  },
  {
    id: 4,
    name: 'David Brown',
    email: 'david.brown@email.com',
    phone: '(555) 456-7890',
    instrument: 'Piano',
    level: 'Beginner',
    status: 'Inactive',
    joinDate: '2023-11-20',
    lastLesson: '2024-01-10',
    nextLesson: null,
    totalLessons: 8,
    parentName: 'Mark Brown',
    parentEmail: 'mark.brown@email.com',
    parentPhone: '(555) 456-7890',
    address: '321 Elm St, Anytown, ST 12345',
    notes: 'Taking a break due to school commitments.',
    goals: ['Learn basic scales', 'Play simple songs'],
    avatar: null
  },
  {
    id: 5,
    name: 'Jessica Martinez',
    email: 'jessica.martinez@email.com',
    phone: '(555) 567-8901',
    instrument: 'Violin',
    level: 'Intermediate',
    status: 'Active',
    joinDate: '2024-01-05',
    lastLesson: '2024-01-21',
    nextLesson: '2024-01-28 4:00 PM',
    totalLessons: 18,
    parentName: 'Maria Martinez',
    parentEmail: 'maria.martinez@email.com',
    parentPhone: '(555) 567-8901',
    address: '654 Maple Dr, Anytown, ST 12345',
    notes: 'Great technique. Working on vibrato.',
    goals: ['Master vibrato technique', 'Learn advanced pieces', 'Prepare for recital'],
    avatar: null
  }
];

export const upcomingLessons: Lesson[] = [
  { id: 1, student: 'Emma Johnson', time: '2:00 PM', date: 'Today', type: 'Piano Lesson' },
  { id: 2, student: 'Michael Chen', time: '3:30 PM', date: 'Today', type: 'Guitar Lesson' },
  { id: 3, student: 'Sarah Williams', time: '10:00 AM', date: 'Tomorrow', type: 'Voice Lesson' },
  { id: 4, student: 'David Brown', time: '4:00 PM', date: 'Tomorrow', type: 'Piano Lesson' }
];

export const recentActivity: Activity[] = [
  { id: 1, action: 'New booking', student: 'Emma Johnson', time: '2 hours ago' },
  { id: 2, action: 'Payment received', student: 'Michael Chen', time: '4 hours ago' },
  { id: 3, action: 'Lesson completed', student: 'Sarah Williams', time: '1 day ago' },
  { id: 4, action: 'Progress updated', student: 'David Brown', time: '2 days ago' }
];