import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { studentService } from '@/services/studentService';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStudentAdded?: () => void; // Callback to refresh student list
}

const AddStudentModal: React.FC<AddStudentModalProps> = ({ isOpen, onClose, onStudentAdded }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    playStyle: '',
    level: '',
    status: 'Active',
    address: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Debug form data
    console.log('Form data on submit:', formData);

    // Basic validation
    if (!formData.firstName || !formData.lastName) {
      alert('Please enter first and last name');
      return;
    }

    if (!formData.playStyle) {
      alert('Please select a play style');
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Adding student:', formData);

      // Prepare student data for API
      const studentData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim() || '',
        phone: formData.phone.trim() || '',
        playStyle: formData.playStyle,
        level: formData.level || 'Beginner',
        status: formData.status as 'Active' | 'Inactive',
        address: formData.address.trim() || '',
        notes: formData.notes.trim() || '',
        joinDate: new Date().toISOString(),
        lastSession: null,
        nextSession: null,
        totalSessions: 0,
        goals: []
      };

      // Add guardian if provided
      const guardians = [];
      if (formData.parentName) {
        guardians.push({
          firstName: formData.parentName.split(' ')[0] || formData.parentName,
          lastName: formData.parentName.split(' ').slice(1).join(' ') || '',
          email: formData.parentEmail || '',
          phone: formData.parentPhone || ''
        });
      }

      // Call API to create student
      await studentService.createStudent({
        ...studentData,
        guardians
      });

      alert('Student added successfully!');

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        playStyle: '',
        level: '',
        status: 'Active',
        address: '',
        parentName: '',
        parentEmail: '',
        parentPhone: '',
        notes: ''
      });

      // Refresh student list and close modal
      if (onStudentAdded) {
        onStudentAdded();
      }
      onClose();

    } catch (error) {
      console.error('Error adding student:', error);
      alert('Error adding student. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
          <DialogDescription>
            Enter the student's information to add them to your roster.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="student@email.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="playStyle">Play Style *</Label>
              <Select value={formData.playStyle} onValueChange={(value) => setFormData({...formData, playStyle: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select play style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Singles Play">Singles Play</SelectItem>
                  <SelectItem value="Doubles Play">Doubles Play</SelectItem>
                  <SelectItem value="Tournament Prep">Tournament Prep</SelectItem>
                  <SelectItem value="Recreational Play">Recreational Play</SelectItem>
                  <SelectItem value="Singles & Doubles">Singles & Doubles</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="level">Skill Level</Label>
              <Select value={formData.level} onValueChange={(value) => setFormData({...formData, level: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="123 Main St, City, State 12345"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>

          <div>
            <Label htmlFor="parent-name">Parent/Guardian Name</Label>
            <Input
              id="parent-name"
              placeholder="For students under 18"
              value={formData.parentName}
              onChange={(e) => setFormData({...formData, parentName: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="parent-email">Parent Email</Label>
              <Input
                id="parent-email"
                type="email"
                placeholder="parent@email.com"
                value={formData.parentEmail}
                onChange={(e) => setFormData({...formData, parentEmail: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="parent-phone">Parent Phone</Label>
              <Input
                id="parent-phone"
                placeholder="(555) 123-4567"
                value={formData.parentPhone}
                onChange={(e) => setFormData({...formData, parentPhone: e.target.value})}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional notes about the student..."
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : 'Add Student'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddStudentModal;