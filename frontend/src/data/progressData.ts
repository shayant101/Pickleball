import { LessonNote, StudentGoal, PracticeLog, SkillAssessment } from '@/types/progress';

export const lessonNotes: LessonNote[] = [
  {
    id: 1,
    studentId: 1,
    studentName: 'Emma Johnson',
    date: '2024-01-20',
    duration: 60,
    topics: ['Bach Invention No. 1', 'Scales', 'Sight-reading'],
    achievements: ['Mastered first 8 bars of Bach', 'Improved left hand coordination'],
    challenges: ['Tempo consistency in measures 9-12', 'Dynamic contrast'],
    homework: ['Practice Bach mm. 9-16 slowly', 'C major scale hands together', 'Sight-read 3 new pieces'],
    nextFocus: 'Complete Bach Invention No. 1, work on phrasing',
    rating: 4,
    notes: 'Emma showed great improvement this week. Her technique is developing well, but needs to work on musical expression.'
  },
  {
    id: 2,
    studentId: 2,
    studentName: 'Michael Chen',
    date: '2024-01-22',
    duration: 60,
    topics: ['Basic chords', 'Strumming patterns', 'Song: Wonderwall'],
    achievements: ['Learned G, C, D chords', 'Basic down-up strumming'],
    challenges: ['Chord transitions', 'Finger positioning'],
    homework: ['Practice chord changes G-C-D', 'Work on clean chord sounds', 'Listen to Wonderwall'],
    nextFocus: 'Smooth chord transitions, add Em chord',
    rating: 3,
    notes: 'Michael is enthusiastic but needs more practice time. Finger strength is improving.'
  },
  {
    id: 3,
    studentId: 3,
    studentName: 'Sarah Williams',
    date: '2024-01-19',
    duration: 60,
    topics: ['Vocal warm-ups', 'Breath support', 'Art song preparation'],
    achievements: ['Extended breath control', 'Better vowel placement'],
    challenges: ['High notes in bridge section', 'Vibrato control'],
    homework: ['Daily breathing exercises', 'Practice high notes with lip trills', 'Memorize verse 2'],
    nextFocus: 'Audition piece polish, stage presence',
    rating: 5,
    notes: 'Excellent progress on audition pieces. Sarah is ready for advanced repertoire.'
  }
];

export const studentGoals: StudentGoal[] = [
  {
    id: 1,
    studentId: 1,
    title: 'Master Bach Invention No. 1',
    description: 'Learn and perform Bach Invention No. 1 in C major with proper articulation and tempo',
    targetDate: '2024-03-01',
    status: 'in-progress',
    progress: 75,
    createdDate: '2024-01-01'
  },
  {
    id: 2,
    studentId: 1,
    title: 'Improve sight-reading',
    description: 'Be able to sight-read Grade 3 level pieces fluently',
    targetDate: '2024-04-15',
    status: 'in-progress',
    progress: 40,
    createdDate: '2024-01-01'
  },
  {
    id: 3,
    studentId: 2,
    title: 'Learn 5 basic songs',
    description: 'Master 5 popular songs using basic open chords',
    targetDate: '2024-02-28',
    status: 'in-progress',
    progress: 60,
    createdDate: '2024-01-15'
  },
  {
    id: 4,
    studentId: 3,
    title: 'College audition preparation',
    description: 'Prepare 4 contrasting pieces for college music program auditions',
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
    pieces: ['Bach Invention No. 1', 'C Major Scale'],
    focus: ['Left hand coordination', 'Tempo consistency'],
    notes: 'Focused on slow practice. Getting better at measures 9-12.',
    quality: 4
  },
  {
    id: 2,
    studentId: 2,
    date: '2024-01-23',
    duration: 30,
    pieces: ['Chord transitions', 'Wonderwall'],
    focus: ['G-C-D changes', 'Strumming rhythm'],
    notes: 'Chord changes are getting smoother. Need more work on rhythm.',
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
    pitch: 9,
    expression: 6,
    sightReading: 5,
    theory: 7,
    overall: 7,
    notes: 'Strong technical foundation. Needs work on musical expression and sight-reading.'
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