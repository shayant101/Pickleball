import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddStudentModal: React.FC<AddStudentModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
          <DialogDescription>
            Enter the student's information to add them to your roster.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input id="name" placeholder="Enter student's name" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="student@email.com" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" placeholder="(555) 123-4567" />
            </div>
            <div>
              <Label htmlFor="playStyle">Play Style *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select play style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="singles">Singles Play</SelectItem>
                  <SelectItem value="doubles">Doubles Play</SelectItem>
                  <SelectItem value="tournament">Tournament Prep</SelectItem>
                  <SelectItem value="recreational">Recreational Play</SelectItem>
                  <SelectItem value="mixed">Singles & Doubles</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="level">Skill Level</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select defaultValue="active">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input id="address" placeholder="123 Main St, City, State 12345" />
          </div>

          <div>
            <Label htmlFor="parent-name">Parent/Guardian Name</Label>
            <Input id="parent-name" placeholder="For students under 18" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="parent-email">Parent Email</Label>
              <Input id="parent-email" type="email" placeholder="parent@email.com" />
            </div>
            <div>
              <Label htmlFor="parent-phone">Parent Phone</Label>
              <Input id="parent-phone" placeholder="(555) 123-4567" />
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="Any additional notes about the student..." />
          </div>

          <div className="flex gap-2 pt-4">
            <Button className="flex-1">Add Student</Button>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddStudentModal;