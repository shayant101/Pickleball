import { PracticeSession, PracticeGoal, PracticeStats, PracticeAssignment, PracticeInsight } from '@/types/practice';

export const practiceSessions: PracticeSession[] = [
  {
    id: 1,
    studentId: 1,
    studentName: 'Emma Johnson',
    date: '2024-01-24',
    duration: 45,
    pieces: ['Bach Invention No. 1', 'C Major Scale'],
    techniques: ['Finger independence', 'Articulation'],
    goals: ['Master measures 9-16', 'Improve tempo consistency'],
    quality: 4,
    notes: 'Good focus today. Left hand coordination is improving significantly.',
    mood: 'motivated',
    challenges: ['Tempo in measures 12-14', 'Dynamic contrast'],
    achievements: ['Played measures 1-8 perfectly', 'Better hand coordination'],
    nextFocus: 'Work on measures 15-20, focus on phrasing'
  },
  {
    id: 2,
    studentId: 2,
    studentName: 'Michael Chen',
    date: '2024-01-23',
    duration: 30,
    pieces: ['Wonderwall - Oasis', 'G-C-D chord progression'],
    techniques: ['Chord transitions', 'Strumming patterns'],
    goals: ['Smooth chord changes', 'Learn basic strumming'],
    quality: 3,
    notes: 'Struggled with chord transitions but showing improvement.',
    mood: 'neutral',
    challenges: ['G to C chord change', 'Consistent strumming rhythm'],
    achievements: ['Cleaner chord sounds', 'Better finger positioning'],
    nextFocus: 'Practice chord changes with metronome'
  },
  {
    id: 3,
    studentId: 3,
    studentName: 'Sarah Williams',
    date: '2024-01-22',
    duration: 60,
    pieces: ['Ave Maria - Schubert', 'Vocal warm-ups'],
    techniques: ['Breath control', 'Vibrato', 'High notes'],
    goals: ['Perfect breath support', 'Consistent vibrato'],
    quality: 5,
    notes: 'Excellent practice session. Voice is really developing beautifully.',
    mood: 'excited',
    challenges: ['High B-flat in bridge', 'Sustaining long phrases'],
    achievements: ['Beautiful vibrato control', 'Extended breath capacity'],
    nextFocus: 'Work on dramatic interpretation and stage presence'
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
    title: 'Master Basic Chords',
    description: 'Practice chord transitions for 20 minutes daily',
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
    title: 'Audition Preparation',
    description: 'Intensive practice for college auditions - 1 hour daily',
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
    mostPracticedPiece: 'Bach Invention No. 1',
    improvementAreas: ['Tempo consistency', 'Dynamic expression'],
    achievements: ['Completed first Bach piece', 'Improved sight-reading']
  },
  2: {
    totalMinutes: 480,
    averageSessionLength: 24,
    sessionsThisWeek: 3,
    streakDays: 3,
    favoriteTime: '7:00 PM',
    mostPracticedPiece: 'Wonderwall',
    improvementAreas: ['Chord transitions', 'Rhythm consistency'],
    achievements: ['First complete song', 'Clean chord sounds']
  },
  3: {
    totalMinutes: 2100,
    averageSessionLength: 58,
    sessionsThisWeek: 6,
    streakDays: 18,
    favoriteTime: '10:00 AM',
    mostPracticedPiece: 'Ave Maria',
    improvementAreas: ['High note control', 'Stage presence'],
    achievements: ['Extended vocal range', 'Professional vibrato']
  }
};

export const practiceAssignments: PracticeAssignment[] = [
  {
    id: 1,
    studentId: 1,
    studentName: 'Emma Johnson',
    assignedDate: '2024-01-20',
    dueDate: '2024-01-27',
    pieces: ['Bach Invention No. 1 - measures 9-20', 'C Major scale hands together'],
    techniques: ['Legato touch', 'Hand coordination'],
    minDuration: 30,
    instructions: 'Practice slowly at first, focus on clean articulation. Use metronome starting at 60 BPM.',
    status: 'in-progress'
  },
  {
    id: 2,
    studentId: 2,
    studentName: 'Michael Chen',
    assignedDate: '2024-01-22',
    dueDate: '2024-01-29',
    pieces: ['G-C-D chord progression', 'Wonderwall chorus'],
    techniques: ['Chord transitions', 'Basic strumming'],
    minDuration: 20,
    instructions: 'Practice chord changes without strumming first. Then add simple down-strums.',
    status: 'assigned'
  },
  {
    id: 3,
    studentId: 3,
    studentName: 'Sarah Williams',
    assignedDate: '2024-01-19',
    dueDate: '2024-01-26',
    pieces: ['Ave Maria - complete piece', 'Vocal exercises for high notes'],
    techniques: ['Breath support', 'Vibrato control'],
    minDuration: 45,
    instructions: 'Focus on breath support in long phrases. Practice high notes with lip trills first.',
    status: 'completed',
    completedDate: '2024-01-25',
    studentNotes: 'Felt much more confident with the high notes after practicing with lip trills!'
  }
];

export const practiceInsights: PracticeInsight[] = [
  {
    id: 1,
    studentId: 1,
    type: 'improvement',
    title: 'Significant Progress in Bach Piece',
    description: 'Emma has shown remarkable improvement in her Bach Invention. Her finger independence has increased dramatically.',
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
    title: 'Ready for Advanced Repertoire',
    description: 'Sarah has mastered her current pieces and is ready to tackle more challenging vocal works.',
    date: '2024-01-22',
    actionRequired: false
  },
  {
    id: 4,
    studentId: 1,
    type: 'suggestion',
    title: 'Consider Adding Music Theory',
    description: 'Emma would benefit from formal music theory lessons to complement her practical skills.',
    date: '2024-01-21',
    actionRequired: false
  }
];