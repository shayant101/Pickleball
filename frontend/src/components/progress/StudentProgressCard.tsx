import React from 'react';
import { TrendingUp, Target, BookOpen, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Student } from '@/types';
import { StudentGoal } from '@/types/progress';

interface StudentProgressCardProps {
  student: Student;
  stats: {
    totalLessons: number;
    avgRating: number;
    activeGoals: number;
    completedGoals: number;
  };
  recentGoals: StudentGoal[];
  onViewLessonNotes: () => void;
  onViewGoals: () => void;
}

const StudentProgressCard: React.FC<StudentProgressCardProps> = ({
  student,
  stats,
  recentGoals,
  onViewLessonNotes,
  onViewGoals
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={student.avatar} />
            <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-lg">{student.name}</CardTitle>
            <CardDescription>{student.instrument} • {student.level}</CardDescription>
          </div>
          <Badge variant={student.status === 'Active' ? 'default' : 'secondary'}>
            {student.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Progress Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-2 bg-gray-50 rounded">
            <div className="text-lg font-bold">{stats.totalLessons}</div>
            <div className="text-xs text-muted-foreground">Lessons</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded">
            <div className="text-lg font-bold">{stats.avgRating}/5</div>
            <div className="text-xs text-muted-foreground">Avg Rating</div>
          </div>
        </div>

        {/* Goals Summary */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Goals Progress</span>
            <span className="text-xs text-muted-foreground">
              {stats.activeGoals} active, {stats.completedGoals} completed
            </span>
          </div>
          
          {recentGoals.length > 0 ? (
            <div className="space-y-2">
              {recentGoals.map((goal) => (
                <div key={goal.id} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm truncate">{goal.title}</span>
                    <Badge className={getStatusColor(goal.status)} variant="secondary">
                      {goal.progress}%
                    </Badge>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              <Target className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No goals set yet</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2 border-t">
          <Button variant="outline" size="sm" className="flex-1" onClick={onViewLessonNotes}>
            <BookOpen className="h-4 w-4 mr-1" />
            Notes
          </Button>
          <Button variant="outline" size="sm" className="flex-1" onClick={onViewGoals}>
            <Target className="h-4 w-4 mr-1" />
            Goals
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentProgressCard;