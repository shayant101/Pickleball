import React, { useState } from 'react';
import { Search, Plus, TrendingUp, BookOpen, Target, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StudentProgressCard from './StudentProgressCard';
import LessonNotesModal from './LessonNotesModal';
import GoalTrackingModal from './GoalTrackingModal';
import { students } from '@/data/mockData';
import { lessonNotes, studentGoals } from '@/data/progressData';

const Progress: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [showLessonNotes, setShowLessonNotes] = useState(false);
  const [showGoalTracking, setShowGoalTracking] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.instrument.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || student.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStudentStats = (studentId: number) => {
    const notes = lessonNotes.filter(note => note.studentId === studentId);
    const goals = studentGoals.filter(goal => goal.studentId === studentId);
    const completedGoals = goals.filter(goal => goal.status === 'completed').length;
    const avgRating = notes.length > 0 ? notes.reduce((sum, note) => sum + note.rating, 0) / notes.length : 0;
    
    return {
      totalLessons: notes.length,
      avgRating: Math.round(avgRating * 10) / 10,
      activeGoals: goals.filter(goal => goal.status === 'in-progress').length,
      completedGoals
    };
  };

  const openLessonNotes = (studentId: number) => {
    setSelectedStudent(studentId);
    setShowLessonNotes(true);
  };

  const openGoalTracking = (studentId: number) => {
    setSelectedStudent(studentId);
    setShowGoalTracking(true);
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Lessons</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lessonNotes.length}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {studentGoals.filter(g => g.status === 'in-progress').length}
            </div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Goals</CardTitle>
            <Target className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {studentGoals.filter(g => g.status === 'completed').length}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(lessonNotes.reduce((sum, note) => sum + note.rating, 0) / lessonNotes.length * 20)}%
            </div>
            <p className="text-xs text-muted-foreground">Student satisfaction</p>
          </CardContent>
        </Card>
      </div>

      {/* Header with Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Students</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setShowLessonNotes(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Lesson Note
          </Button>
        </div>
      </div>

      {/* Student Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => {
          const stats = getStudentStats(student.id);
          return (
            <StudentProgressCard
              key={student.id}
              student={student}
              stats={stats}
              recentGoals={studentGoals.filter(g => g.studentId === student.id).slice(0, 2)}
              onViewLessonNotes={() => openLessonNotes(student.id)}
              onViewGoals={() => openGoalTracking(student.id)}
            />
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Lesson Notes</CardTitle>
          <CardDescription>Latest progress updates from your students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {lessonNotes.slice(0, 5).map((note) => (
              <div key={note.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{note.studentName}</p>
                    <p className="text-sm text-muted-foreground">
                      {note.topics.slice(0, 2).join(', ')}
                      {note.topics.length > 2 && ` +${note.topics.length - 2} more`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">
                      {note.rating}/5 ⭐
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {new Date(note.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <LessonNotesModal
        isOpen={showLessonNotes}
        onClose={() => setShowLessonNotes(false)}
        studentId={selectedStudent}
      />
      
      <GoalTrackingModal
        isOpen={showGoalTracking}
        onClose={() => setShowGoalTracking(false)}
        studentId={selectedStudent}
      />
    </div>
  );
};

export default Progress;