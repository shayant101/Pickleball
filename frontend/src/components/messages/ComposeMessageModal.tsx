import React, { useState } from 'react';
import { MessageSquare, Send, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { students } from '@/data/mockData';
import { messageTemplates } from '@/data/messagesData';

interface ComposeMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ComposeMessageModal: React.FC<ComposeMessageModalProps> = ({ isOpen, onClose }) => {
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [includeParents, setIncludeParents] = useState(true);
  const [messageType, setMessageType] = useState('text');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleStudentToggle = (studentId: number) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = messageTemplates.find(t => t.id === parseInt(templateId));
    if (template) {
      setMessage(template.content);
      setMessageType(template.category);
    }
  };

  const handleSendMessage = () => {
    if (selectedStudents.length === 0 || !message.trim()) return;
    
    // In a real app, this would send the message to the backend
    console.log('Sending message to students:', selectedStudents);
    console.log('Message:', message);
    console.log('Include parents:', includeParents);
    
    // Reset form and close modal
    setSelectedStudents([]);
    setMessage('');
    setSubject('');
    setSelectedTemplate('');
    setMessageType('text');
    onClose();
  };

  const getMessageTypeLabel = (type: string) => {
    switch (type) {
      case 'lesson-reminder': return 'Lesson Reminder';
      case 'progress-update': return 'Progress Update';
      case 'schedule-change': return 'Schedule Change';
      case 'payment-reminder': return 'Payment Reminder';
      default: return 'General Message';
    }
  };

  // Get selected student names for preview
  const getSelectedStudentNames = () => {
    return selectedStudents
      .map(id => students.find(s => s.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Compose New Message
          </DialogTitle>
          <DialogDescription>
            Send a message to one or more students and their parents
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Recipients */}
          <div>
            <Label className="text-base font-medium">Recipients</Label>
            <div className="mt-2 space-y-2 max-h-40 overflow-y-auto border rounded-md p-3">
              {students.filter(s => s.status === 'Active').map((student) => (
                <div key={student.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`student-${student.id}`}
                    checked={selectedStudents.includes(student.id)}
                    onCheckedChange={() => handleStudentToggle(student.id)}
                  />
                  <label 
                    htmlFor={`student-${student.id}`}
                    className="text-sm font-medium cursor-pointer flex-1"
                  >
                    {student.name} - {student.instrument}
                  </label>
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox
                id="include-parents"
                checked={includeParents}
                onCheckedChange={setIncludeParents}
              />
              <label htmlFor="include-parents" className="text-sm">
                Include parents in conversation
              </label>
            </div>
          </div>

          {/* Message Type */}
          <div>
            <Label htmlFor="messageType">Message Type</Label>
            <Select value={messageType} onValueChange={setMessageType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">General Message</SelectItem>
                <SelectItem value="lesson-reminder">Lesson Reminder</SelectItem>
                <SelectItem value="progress-update">Progress Update</SelectItem>
                <SelectItem value="schedule-change">Schedule Change</SelectItem>
                <SelectItem value="payment-reminder">Payment Reminder</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Template Selection */}
          <div>
            <Label htmlFor="template">Use Template (Optional)</Label>
            <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a template..." />
              </SelectTrigger>
              <SelectContent>
                {messageTemplates
                  .filter(template => messageType === 'text' || template.category === messageType)
                  .map((template) => (
                    <SelectItem key={template.id} value={template.id.toString()}>
                      {template.title}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Subject */}
          <div>
            <Label htmlFor="subject">Subject (Optional)</Label>
            <Input
              id="subject"
              placeholder="Message subject..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          {/* Message Content */}
          <div>
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Use variables like {`{{studentName}}`}, {`{{instrument}}`}, {`{{lessonDate}}`} for personalization
            </p>
          </div>

          {/* Preview */}
          {selectedStudents.length > 0 && (
            <div className="bg-gray-50 p-3 rounded-md">
              <h4 className="font-medium text-sm mb-2">Preview</h4>
              <div className="text-sm text-muted-foreground">
                <p><strong>To:</strong> {getSelectedStudentNames()}</p>
                <p><strong>Recipients:</strong> {selectedStudents.length} student{selectedStudents.length > 1 ? 's' : ''} 
                  {includeParents && ' (+ parents)'}</p>
                <p><strong>Type:</strong> {getMessageTypeLabel(messageType)}</p>
                {subject && <p><strong>Subject:</strong> {subject}</p>}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button 
              className="flex-1" 
              onClick={handleSendMessage}
              disabled={selectedStudents.length === 0 || !message.trim()}
            >
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComposeMessageModal;