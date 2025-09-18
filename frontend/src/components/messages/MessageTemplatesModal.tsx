import React, { useState } from 'react';
import { MessageSquare, Plus, Edit, Trash2, Copy } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { messageTemplates } from '@/data/messagesData';

interface MessageTemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MessageTemplatesModal: React.FC<MessageTemplatesModalProps> = ({ isOpen, onClose }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredTemplates = messageTemplates.filter(template => 
    filterCategory === 'all' || template.category === filterCategory
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'lesson-reminder': return 'bg-blue-100 text-blue-800';
      case 'progress-update': return 'bg-green-100 text-green-800';
      case 'schedule-change': return 'bg-yellow-100 text-yellow-800';
      case 'payment-reminder': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'lesson-reminder': return 'Lesson Reminder';
      case 'progress-update': return 'Progress Update';
      case 'schedule-change': return 'Schedule Change';
      case 'payment-reminder': return 'Payment Reminder';
      default: return 'General';
    }
  };

  const handleCopyTemplate = (content: string) => {
    navigator.clipboard.writeText(content);
    // In a real app, you'd show a toast notification here
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Message Templates
          </DialogTitle>
          <DialogDescription>
            Create and manage reusable message templates for common communications
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {!isCreating && !editingTemplate ? (
            <>
              {/* Template List View */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-semibold">
                    Templates ({filteredTemplates.length})
                  </h3>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="lesson-reminder">Lesson Reminders</SelectItem>
                      <SelectItem value="progress-update">Progress Updates</SelectItem>
                      <SelectItem value="schedule-change">Schedule Changes</SelectItem>
                      <SelectItem value="payment-reminder">Payment Reminders</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={() => setIsCreating(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Template
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTemplates.map((template) => (
                  <Card key={template.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-base">{template.title}</CardTitle>
                          <Badge className={getCategoryColor(template.category)} variant="secondary">
                            {getCategoryLabel(template.category)}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleCopyTemplate(template.content)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setEditingTemplate(template.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                        {template.content}
                      </p>
                      {template.variables.length > 0 && (
                        <div>
                          <p className="text-xs font-medium mb-1">Variables:</p>
                          <div className="flex flex-wrap gap-1">
                            {template.variables.map((variable) => (
                              <Badge key={variable} variant="outline" className="text-xs">
                                {`{{${variable}}}`}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredTemplates.length === 0 && (
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
                  <p className="text-gray-500 mb-4">
                    {filterCategory === 'all' 
                      ? 'Create your first message template to save time on common communications.'
                      : `No templates found in the ${getCategoryLabel(filterCategory)} category.`
                    }
                  </p>
                  <Button onClick={() => setIsCreating(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Template
                  </Button>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Create/Edit Template Form */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    {isCreating ? 'Create New Template' : 'Edit Template'}
                  </h3>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsCreating(false);
                      setEditingTemplate(null);
                    }}
                  >
                    Back to Templates
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Template Title *</Label>
                    <Input id="title" placeholder="e.g., Weekly Lesson Reminder" />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select defaultValue="general">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="lesson-reminder">Lesson Reminder</SelectItem>
                        <SelectItem value="progress-update">Progress Update</SelectItem>
                        <SelectItem value="schedule-change">Schedule Change</SelectItem>
                        <SelectItem value="payment-reminder">Payment Reminder</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="content">Template Content *</Label>
                  <Textarea
                    id="content"
                    placeholder="Write your template message here..."
                    rows={8}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Use variables like {{studentName}}, {{instrument}}, {{lessonDate}} for personalization
                  </p>
                </div>

                <div>
                  <Label>Available Variables</Label>
                  <div className="mt-2 p-3 bg-gray-50 rounded-md">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {['studentName', 'instrument', 'lessonDate', 'lessonTime', 'amount', 'dueDate'].map((variable) => (
                        <Badge key={variable} variant="outline" className="justify-center">
                          {`{{${variable}}}`}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button className="flex-1">
                    {isCreating ? 'Create Template' : 'Update Template'}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsCreating(false);
                      setEditingTemplate(null);
                    }}
                  >
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

export default MessageTemplatesModal;