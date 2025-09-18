import React, { useState } from 'react';
import { Target, Plus, Calendar, TrendingUp } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { students } from '@/data/mockData';
import { studentGoals } from '@/data/progressData';

interface GoalTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId?: number | null;
}

const GoalTrackingModal: React.FC<GoalTrackingModalProps> = ({
  isOpen,
  onClose,
  studentId
}) => {
  const [isAddingNew, setIsAddingNew] = useState(false);

  const selectedStudent = studentId ? students.find(s => s.id === studentId) : null;
  const goals = studentId ? studentGoals.filter(goal => goal.studentId === studentId) : studentGoals;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'not-started': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Goal Tracking
            {selectedStudent && ` - ${selectedStudent.name}`}
          </DialogTitle>
          <DialogDescription>
            {isAddingNew 
              ? 'Set a new goal for your student'
              : 'Track and manage student goals and progress'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {!isAddingNew ? (
            <>
              {/* View Mode - List of Goals */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  Student Goals ({goals.length})
                </h3>
                <Button onClick={() => setIsAddingNew(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Goal
                </Button>
              </div>

              {/* Goals Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {goals.filter(g => g.status === 'in-progress').length}
                  </div>
                  <div className="text-sm text-muted-foreground">In Progress</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {goals.filter(g => g.status === 'completed').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {goals.filter(g => g.status === 'paused').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Paused</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold">
                    {Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / goals.length) || 0}%
                  </div>
                  <div className="text-sm text-muted-foreground">Avg Progress</div>
                </div>
              </div>

              {/* Goals List */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {goals.map((goal) => (
                  <div key={goal.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{goal.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
                      </div>
                      <Badge className={getStatusColor(goal.status)}>
                        {goal.status.replace('-', ' ')}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm text-muted-foreground">{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Target: {new Date(goal.targetDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        Created: {new Date(goal.createdDate).toLocaleDateString()}
                      </div>
                    </div>

                    {goal.status === 'in-progress' && (
                      <div className="flex gap-2 pt-2 border-t">
                        <Button variant="outline" size="sm">
                          Update Progress
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit Goal
                        </Button>
                        <Button variant="outline" size="sm">
                          Mark Complete
                        </Button>
                      </div>
                    )}
                  </div>
                ))}

                {goals.length === 0 && (
                  <div className="text-center py-12">
                    <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No goals set yet</h3>
                    <p className="text-gray-500 mb-4">
                      Set goals to track your student's progress and achievements.
                    </p>
                    <Button onClick={() => setIsAddingNew(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Goal
                    </Button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Add Mode - Form */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="student">Student *</Label>
                    <Select defaultValue={studentId?.toString()}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select student" />
                      </SelectTrigger>
                      <SelectContent>
                        {students.filter(s => s.status === 'Active').map((student) => (
                          <SelectItem key={student.id} value={student.id.toString()}>
                            {student.name} - {student.instrument}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="targetDate">Target Date *</Label>
                    <Input id="targetDate" type="date" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="title">Goal Title *</Label>
                  <Input id="title" placeholder="e.g., Master Bach Invention No. 1" />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Detailed description of what the student should achieve..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select defaultValue="not-started">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="not-started">Not Started</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="progress">Initial Progress (%)</Label>
                    <Input id="progress" type="number" min="0" max="100" defaultValue="0" />
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button className="flex-1">Create Goal</Button>
                  <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GoalTrackingModal;