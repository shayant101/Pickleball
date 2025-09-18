import React from 'react';
import { Clock, User, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface LessonCardProps {
  lesson: {
    id: number;
    studentName: string;
    date: string;
    startTime: string;
    endTime: string;
    instrument: string;
    status: 'scheduled' | 'completed' | 'cancelled';
    notes?: string;
  };
  onEdit?: (lessonId: number) => void;
  onCancel?: (lessonId: number) => void;
  onComplete?: (lessonId: number) => void;
}

const LessonCard: React.FC<LessonCardProps> = ({ 
  lesson, 
  onEdit, 
  onCancel, 
  onComplete 
}) => {
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback>
                {lesson.studentName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{lesson.studentName}</p>
              <p className="text-sm text-muted-foreground">{lesson.instrument} Lesson</p>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Clock className="h-3 w-3 mr-1" />
                {formatTime(lesson.startTime)} - {formatTime(lesson.endTime)}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(lesson.status)}>
              {lesson.status}
            </Badge>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {lesson.status === 'scheduled' && (
                  <>
                    <DropdownMenuItem onClick={() => onComplete?.(lesson.id)}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark Complete
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit?.(lesson.id)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Lesson
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => onCancel?.(lesson.id)}
                      className="text-red-600"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Cancel Lesson
                    </DropdownMenuItem>
                  </>
                )}
                {lesson.status !== 'scheduled' && (
                  <DropdownMenuItem onClick={() => onEdit?.(lesson.id)}>
                    <Edit className="h-4 w-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem 
                  onClick={() => onCancel?.(lesson.id)}
                  className="text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {lesson.notes && (
          <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
            <p className="text-muted-foreground">{lesson.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LessonCard;