export interface PracticeSession {
  id: number;
  studentId: number;
  studentName: string;
  date: string;
  duration: number; // minutes
  pieces: string[];
  techniques: string[];
  goals: string[];
  quality: number; // 1-5 scale
  notes: string;
  mood: 'frustrated' | 'neutral' | 'motivated' | 'excited';
  challenges: string[];
  achievements: string[];
  nextFocus: string;
}

export interface PracticeGoal {
  id: number;
  studentId: number;
  title: string;
  description: string;
  targetMinutes: number;
  currentMinutes: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'paused';
  priority: 'low' | 'medium' | 'high';
}

export interface PracticeStats {
  totalMinutes: number;
  averageSessionLength: number;
  sessionsThisWeek: number;
  streakDays: number;
  favoriteTime: string;
  mostPracticedPiece: string;
  improvementAreas: string[];
  achievements: string[];
}

export interface PracticeAssignment {
  id: number;
  studentId: number;
  studentName: string;
  assignedDate: string;
  dueDate: string;
  pieces: string[];
  techniques: string[];
  minDuration: number;
  instructions: string;
  status: 'assigned' | 'in-progress' | 'completed' | 'overdue';
  completedDate?: string;
  studentNotes?: string;
}

export interface PracticeInsight {
  id: number;
  studentId: number;
  type: 'improvement' | 'concern' | 'achievement' | 'suggestion';
  title: string;
  description: string;
  date: string;
  actionRequired: boolean;
}