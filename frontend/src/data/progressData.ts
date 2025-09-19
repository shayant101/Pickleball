import { LessonNote, StudentGoal, PracticeLog, SkillAssessment } from '@/types/progress';

export const lessonNotes: LessonNote[] = [
  {
    id: 1,
    studentId: 1,
    studentName: 'Emma Johnson',
    date: '2024-01-20',
    duration: 60,
    topics: ['Backhand technique', 'Third shot drop', 'Net positioning'],
    achievements: ['Improved backhand consistency', 'Better court positioning'],
    challenges: ['Third shot drop accuracy', 'Net game confidence'],
    homework: ['Practice backhand cross-court shots', 'Work on soft game at net', 'Watch positioning videos'],
    nextFocus: 'Focus on third shot drop placement and net game strategy',
    rating: 4,
    notes: 'Emma showed great improvement in backhand consistency. Her court positioning is getting much better.'
  },
  {
    id: 2,
    studentId: 2,
    studentName: 'Michael Chen',
    date: '2024-01-22',
    duration: 60,
    topics: ['Basic serve', 'Court positioning', 'Doubles strategy'],
    achievements: ['Learned proper serve grip', 'Understanding of doubles positioning'],
    challenges: ['Serve consistency', 'Communication with partner'],
    homework: ['Practice serves daily', 'Study doubles positioning', 'Work on calling shots'],
    nextFocus: 'Improve serve consistency and doubles communication',
    rating: 3,
    notes: 'Michael is enthusiastic but needs more practice time. His understanding of strategy is improving.'
  },
  {
    id: 3,
    studentId: 3,
    studentName: 'Sarah Williams',
    date: '2024-01-19',
    duration: 60,
    topics: ['Tournament strategy', 'Power shots', 'Mental game'],
    achievements: ['Excellent shot selection', 'Strong mental focus'],
    challenges: ['Power shot consistency', 'Pressure situations'],
    homework: ['Practice power shots', 'Mental game exercises', 'Tournament simulation drills'],
    nextFocus: 'Tournament preparation and pressure situation training',
    rating: 5,
    notes: 'Excellent session. Sarah is ready for advanced tournament play. Her game sense is exceptional.'
  }
];

export const studentGoals: StudentGoal[] = [
  {
    id: 1,
    studentId: 1,
    title: 'Master Third Shot Drop',
    description: 'Develop consistent third shot drop technique for better court positioning',
    targetDate: '2024-03-01',
    status: 'in-progress',
    progress: 75,
    createdDate: '2024-01-01'
  },
  {
    id: 2,
    studentId: 1,
    title: 'Improve Net Game',
    description: 'Develop confidence and skill at the net for better offensive play',
    targetDate: '2024-04-15',
    status: 'in-progress',
    progress: 40,
    createdDate: '2024-01-01'
  },
  {
    id: 3,
    studentId: 2,
    title: 'Consistent Serve',
    description: 'Develop reliable serve technique for both power and placement',
    targetDate: '2024-02-28',
    status: 'in-progress',
    progress: 60,
    createdDate: '2024-01-15'
  },
  {
    id: 4,
    studentId: 3,
    title: 'Tournament Preparation',
    description: 'Prepare for regional tournament with advanced strategy and mental game',
    targetDate: '2024-02-15',
    status: 'in-progress',
    progress: 85,
    createdDate: '2023-11-01'
  }
];

export const practiceLog: PracticeLog[] = [
  {
    id: 1,
    studentId: 1,
    date: '2024-01-21',
    duration: 45,
    pieces: ['Third shot drop drills', 'Backhand cross-court'],
    focus: ['Shot placement', 'Consistency'],
    notes: 'Focused on soft game. Getting better at third shot drop placement.',
    quality: 4
  },
  {
    id: 2,
    studentId: 2,
    date: '2024-01-23',
    duration: 30,
    pieces: ['Serve practice', 'Doubles positioning'],
    focus: ['Serve consistency', 'Court awareness'],
    notes: 'Serve is getting more consistent. Need more work on doubles positioning.',
    quality: 3
  }
];

export const skillAssessments: SkillAssessment[] = [
  {
    id: 1,
    studentId: 1,
    date: '2024-01-01',
    technique: 7,
    rhythm: 8,
    pitch: 9, // Now represents shot accuracy
    expression: 6, // Now represents game strategy
    sightReading: 5, // Now represents court awareness
    theory: 7, // Now represents rules knowledge
    overall: 7,
    notes: 'Strong technical foundation. Needs work on strategy and court awareness.'
  },
  {
    id: 2,
    studentId: 2,
    date: '2024-01-15',
    technique: 4,
    rhythm: 5,
    pitch: 6,
    expression: 4,
    sightReading: 3,
    theory: 3,
    overall: 4,
    notes: 'Beginner level. Good enthusiasm and basic understanding. Focus on fundamentals.'
  }
];