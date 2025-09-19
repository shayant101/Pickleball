import { PracticeSession, PracticeGoal, PracticeStats, PracticeAssignment, PracticeInsight } from '@/types/practice';

export const practiceSessions: PracticeSession[] = [
  {
    id: 1,
    studentId: 1,
    studentName: 'Emma Johnson',
    date: '2024-01-24',
    duration: 45,
    pieces: ['Third shot drop drills', 'Backhand cross-court shots'],
    techniques: ['Soft game', 'Shot placement'],
    goals: ['Master third shot drop', 'Improve backhand consistency'],
    quality: 4,
    notes: 'Good focus today. Backhand placement is improving significantly.',
    mood: 'motivated',
    challenges: ['Third shot drop accuracy', 'Net game confidence'],
    achievements: ['Better shot placement', 'Improved footwork'],
    nextFocus: 'Work on net game positioning and volleys'
  },
  {
    id: 2,
    studentId: 2,
    studentName: 'Michael Chen',
    date: '2024-01-23',
    duration: 30,
    pieces: ['Serve practice', 'Doubles positioning drills'],
    techniques: ['Serve technique', 'Court positioning'],
    goals: ['Consistent serve', 'Better doubles play'],
    quality: 3,
    notes: 'Struggled with serve consistency but showing improvement in positioning.',
    mood: 'neutral',
    challenges: ['Serve accuracy', 'Partner communication'],
    achievements: ['Better court awareness', 'Improved grip technique'],
    nextFocus: 'Practice serves with target zones'
  },
  {
    id: 3,
    studentId: 3,
    studentName: 'Sarah Williams',
    date: '2024-01-22',
    duration: 60,
    pieces: ['Tournament drills', 'Power shot practice'],
    techniques: ['Shot selection', 'Mental game', 'Power shots'],
    goals: ['Tournament preparation', 'Consistent power shots'],
    quality: 5,
    notes: 'Excellent practice session. Tournament readiness is really developing well.',
    mood: 'excited',
    challenges: ['Power shot consistency', 'Pressure situations'],
    achievements: ['Great shot selection', 'Strong mental focus'],
    nextFocus: 'Work on pressure situation training and match simulation'
  }
];

export const practiceGoals: PracticeGoal[] = [
  {
    id: 1,
    studentId: 1,
    title: 'Daily Practice Routine',
    description: 'Establish consistent 45-minute daily practice sessions',
    targetMinutes: 315, // 45 min × 7 days
    currentMinutes: 225,
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    status: 'active',
    priority: 'high'
  },
  {
    id: 2,
    studentId: 2,
    title: 'Master Basic Serves',
    description: 'Practice serve technique for 20 minutes daily',
    targetMinutes: 140, // 20 min × 7 days
    currentMinutes: 90,
    startDate: '2024-01-20',
    endDate: '2024-02-20',
    status: 'active',
    priority: 'medium'
  },
  {
    id: 3,
    studentId: 3,
    title: 'Tournament Preparation',
    description: 'Intensive practice for regional tournament - 1 hour daily',
    targetMinutes: 420, // 60 min × 7 days
    currentMinutes: 380,
    startDate: '2024-01-01',
    endDate: '2024-02-15',
    status: 'active',
    priority: 'high'
  }
];

export const practiceStats: { [studentId: number]: PracticeStats } = {
  1: {
    totalMinutes: 1250,
    averageSessionLength: 42,
    sessionsThisWeek: 5,
    streakDays: 12,
    favoriteTime: '4:00 PM',
    mostPracticedPiece: 'Third shot drop drills',
    improvementAreas: ['Net game', 'Shot consistency'],
    achievements: ['Improved backhand', 'Better court positioning']
  },
  2: {
    totalMinutes: 480,
    averageSessionLength: 24,
    sessionsThisWeek: 3,
    streakDays: 3,
    favoriteTime: '7:00 PM',
    mostPracticedPiece: 'Serve practice',
    improvementAreas: ['Serve consistency', 'Doubles strategy'],
    achievements: ['Basic serve technique', 'Court awareness']
  },
  3: {
    totalMinutes: 2100,
    averageSessionLength: 58,
    sessionsThisWeek: 6,
    streakDays: 18,
    favoriteTime: '10:00 AM',
    mostPracticedPiece: 'Tournament drills',
    improvementAreas: ['Power shots', 'Mental game'],
    achievements: ['Advanced strategy', 'Tournament readiness']
  }
};

export const practiceAssignments: PracticeAssignment[] = [
  {
    id: 1,
    studentId: 1,
    studentName: 'Emma Johnson',
    assignedDate: '2024-01-20',
    dueDate: '2024-01-27',
    pieces: ['Third shot drop drills', 'Backhand cross-court practice'],
    techniques: ['Soft game', 'Shot placement'],
    minDuration: 30,
    instructions: 'Practice third shot drops slowly at first, focus on arc and placement. Use target zones.',
    status: 'in-progress'
  },
  {
    id: 2,
    studentId: 2,
    studentName: 'Michael Chen',
    assignedDate: '2024-01-22',
    dueDate: '2024-01-29',
    pieces: ['Serve practice', 'Doubles positioning drills'],
    techniques: ['Serve technique', 'Court positioning'],
    minDuration: 20,
    instructions: 'Practice serves to different zones. Work on doubles positioning without the ball first.',
    status: 'assigned'
  },
  {
    id: 3,
    studentId: 3,
    studentName: 'Sarah Williams',
    assignedDate: '2024-01-19',
    dueDate: '2024-01-26',
    pieces: ['Tournament simulation', 'Power shot drills'],
    techniques: ['Mental game', 'Shot selection'],
    minDuration: 45,
    instructions: 'Focus on tournament scenarios. Practice power shots with proper form and follow-through.',
    status: 'completed',
    completedDate: '2024-01-25',
    studentNotes: 'Felt much more confident in pressure situations after the tournament simulation!'
  }
];

export const practiceInsights: PracticeInsight[] = [
  {
    id: 1,
    studentId: 1,
    type: 'improvement',
    title: 'Significant Progress in Third Shot Drop',
    description: 'Emma has shown remarkable improvement in her third shot drop technique. Her court positioning has improved dramatically.',
    date: '2024-01-24',
    actionRequired: false
  },
  {
    id: 2,
    studentId: 2,
    type: 'concern',
    title: 'Inconsistent Practice Schedule',
    description: 'Michael has been practicing irregularly. Consider discussing practice routine and time management.',
    date: '2024-01-23',
    actionRequired: true
  },
  {
    id: 3,
    studentId: 3,
    type: 'achievement',
    title: 'Ready for Tournament Play',
    description: 'Sarah has mastered her current skills and is ready for competitive tournament play.',
    date: '2024-01-22',
    actionRequired: false
  },
  {
    id: 4,
    studentId: 1,
    type: 'suggestion',
    title: 'Consider Adding Strategy Sessions',
    description: 'Emma would benefit from formal strategy sessions to complement her technical skills.',
    date: '2024-01-21',
    actionRequired: false
  }
];