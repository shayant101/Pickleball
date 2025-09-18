import React from 'react';
import { Calendar, Edit, MessageSquare, Mail, Phone, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Student } from '@/types';

interface StudentDetailModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
}

const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  student,
  isOpen,
  onClose
}) => {
  if (!student) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={student.avatar} />
              <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <div>{student.name}</div>
              <div className="text-sm text-muted-foreground font-normal">
                {student.instrument} • {student.level}
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Contact Information */}
          <div>
            <h3 className="font-semibold mb-3">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  {student.email}
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  {student.phone}
                </div>
                <div className="flex items-start text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
                  {student.address}
                </div>
              </div>
              {student.parentName && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Parent/Guardian</h4>
                  <div className="text-sm">{student.parentName}</div>
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    {student.parentEmail}
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    {student.parentPhone}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Lesson Information */}
          <div>
            <h3 className="font-semibold mb-3">Lesson Information</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Status</div>
                <Badge variant={student.status === 'Active' ? 'default' : 'secondary'}>
                  {student.status}
                </Badge>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Total Lessons</div>
                <div className="font-medium">{student.totalLessons}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Join Date</div>
                <div className="font-medium">{new Date(student.joinDate).toLocaleDateString()}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Last Lesson</div>
                <div className="font-medium">{new Date(student.lastLesson).toLocaleDateString()}</div>
              </div>
            </div>
            {student.nextLesson && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <div className="text-sm text-muted-foreground">Next Lesson</div>
                <div className="font-medium text-blue-700">{student.nextLesson}</div>
              </div>
            )}
          </div>

          {/* Goals */}
          <div>
            <h3 className="font-semibold mb-3">Current Goals</h3>
            <div className="space-y-2">
              {student.goals.map((goal, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">{goal}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <h3 className="font-semibold mb-3">Notes</h3>
            <div className="p-3 bg-gray-50 rounded-lg text-sm">
              {student.notes}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t">
            <Button className="flex-1">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Lesson
            </Button>
            <Button variant="outline" className="flex-1">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
            <Button variant="outline" className="flex-1">
              <MessageSquare className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentDetailModal;