import React, { useState } from 'react';
import { BookOpen, Star, Plus, Minus } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { students } from '@/data/mockData';
import { lessonNotes } from '@/data/progressData';

interface LessonNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId?: number | null;
}

const LessonNotesModal: React.FC<LessonNotesModalProps> = ({
  isOpen,
  onClose,
  studentId
}) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [rating, setRating] = useState(5);
  const [topics, setTopics] = useState<string[]>(['']);
  const [achievements, setAchievements] = useState<string[]>(['']);
  const [challenges, setChallenges] = useState<string[]>(['']);
  const [homework, setHomework] = useState<string[]>(['']);

  const selectedStudent = studentId ? students.find(s => s.id === studentId) : null;
  const studentNotes = studentId ? lessonNotes.filter(note => note.studentId === studentId) : lessonNotes;

  const addField = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => [...prev, '']);
  };

  const removeField = (index: number, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };

  const updateField = (index: number, value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => prev.map((item, i) => i === index ? value : item));
  };

  const renderStars = (currentRating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => setRating(i + 1)}
        className={`${i < currentRating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400`}
      >
        <Star className="h-5 w-5 fill-current" />
      </button>
    ));
  };

  const renderFieldArray = (
    label: string,
    fields: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    placeholder: string
  ) => (
    <div>
      <Label className="text-sm font-medium">{label}</Label>
      <div className="space-y-2 mt-1">
        {fields.map((field, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={field}
              onChange={(e) => updateField(index, e.target.value, setter)}
              placeholder={placeholder}
              className="flex-1"
            />
            {fields.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeField(index, setter)}
              >
                <Minus className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addField(setter)}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add {label.slice(0, -1)}
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            {isAddingNew ? 'Add Lesson Note' : 'Lesson Notes'}
            {selectedStudent && ` - ${selectedStudent.name}`}
          </DialogTitle>
          <DialogDescription>
            {isAddingNew 
              ? 'Record progress and notes from today\'s lesson'
              : 'View and manage lesson notes and progress tracking'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {!isAddingNew ? (
            <>
              {/* View Mode - List of Notes */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  Recent Lessons ({studentNotes.length})
                </h3>
                <Button onClick={() => setIsAddingNew(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Note
                </Button>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {studentNotes.map((note) => (
                  <div key={note.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{note.studentName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(note.date).toLocaleDateString()} • {note.duration} minutes
                        </p>
                      </div>
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < note.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-sm mb-1">Topics Covered</h5>
                        <div className="flex flex-wrap gap-1">
                          {note.topics.map((topic, i) => (
                            <Badge key={i} variant="secondary">{topic}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm mb-1">Achievements</h5>
                        <ul className="text-sm text-muted-foreground">
                          {note.achievements.map((achievement, i) => (
                            <li key={i}>• {achievement}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-sm mb-1">Challenges</h5>
                        <ul className="text-sm text-muted-foreground">
                          {note.challenges.map((challenge, i) => (
                            <li key={i}>• {challenge}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm mb-1">Homework</h5>
                        <ul className="text-sm text-muted-foreground">
                          {note.homework.map((hw, i) => (
                            <li key={i}>• {hw}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {note.notes && (
                      <div>
                        <h5 className="font-medium text-sm mb-1">Additional Notes</h5>
                        <p className="text-sm text-muted-foreground">{note.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Add Mode - Form */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <Label htmlFor="date">Date *</Label>
                    <Input id="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input id="duration" type="number" defaultValue="60" />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Lesson Rating</Label>
                  <div className="flex items-center space-x-1 mt-1">
                    {renderStars(rating)}
                    <span className="ml-2 text-sm text-muted-foreground">({rating}/5)</span>
                  </div>
                </div>

                {renderFieldArray('Topics Covered', topics, setTopics, 'e.g., Scales, Bach Invention')}
                {renderFieldArray('Achievements', achievements, setAchievements, 'What went well this lesson')}
                {renderFieldArray('Challenges', challenges, setChallenges, 'Areas that need work')}
                {renderFieldArray('Homework', homework, setHomework, 'Practice assignments')}

                <div>
                  <Label htmlFor="nextFocus">Next Lesson Focus</Label>
                  <Input id="nextFocus" placeholder="What to focus on next time" />
                </div>

                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Any additional observations or comments..."
                    rows={3}
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button className="flex-1">Save Lesson Note</Button>
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

export default LessonNotesModal;