export interface LessonNote {
  id: number;
  studentId: number;
  studentName: string;
  date: string;
  duration: number;
  topics: string[];
  achievements: string[];
  challenges: string[];
  homework: string[];
  nextFocus: string;
  rating: number; // 1-5 scale
  notes: string;
}

export interface StudentGoal {
  id: number;
  studentId: number;
  title: string;
  description: string;
  targetDate: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'paused';
  progress: number; // 0-100 percentage
  createdDate: string;
  completedDate?: string;
}

export interface PracticeLog {
  id: number;
  studentId: number;
  date: string;
  duration: number; // minutes
  pieces: string[];
  focus: string[];
  notes: string;
  quality: number; // 1-5 scale
}

export interface SkillAssessment {
  id: number;
  studentId: number;
  date: string;
  technique: number; // 1-10 scale
  rhythm: number;
  pitch: number;
  expression: number;
  sightReading: number;
  theory: number;
  overall: number;
  notes: string;
}