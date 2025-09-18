import React, { useState } from 'react';
import { DollarSign, CreditCard, Banknote } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { students } from '@/data/mockData';
import { payments } from '@/data/paymentsData';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentId?: number | null;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, paymentId }) => {
  const [paymentMethod, setPaymentMethod] = useState('cash');
  
  const existingPayment = paymentId ? payments.find(p => p.id === paymentId) : null;
  const isEditing = !!existingPayment;

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'card': return <CreditCard className="h-4 w-4" />;
      case 'cash': return <Banknote className="h-4 w-4" />;
      case 'check': return <DollarSign className="h-4 w-4" />;
      default: return <DollarSign className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <DollarSign className="h-5 w-5 mr-2" />
            {isEditing ? 'Edit Payment' : 'Record Payment'}
          </DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update payment details' : 'Record a payment received from a student'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="student">Student *</Label>
            <Select defaultValue={existingPayment?.studentId.toString()}>
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="amount">Amount *</Label>
              <Input 
                id="amount" 
                type="number" 
                min="0" 
                step="0.01" 
                placeholder="0.00"
                defaultValue={existingPayment?.amount}
              />
            </div>
            <div>
              <Label htmlFor="paymentDate">Payment Date</Label>
              <Input 
                id="paymentDate" 
                type="date" 
                defaultValue={existingPayment?.paidDate || new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="method">Payment Method</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod} defaultValue={existingPayment?.method}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">
                  <div className="flex items-center">
                    <Banknote className="h-4 w-4 mr-2" />
                    Cash
                  </div>
                </SelectItem>
                <SelectItem value="check">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Check
                  </div>
                </SelectItem>
                <SelectItem value="card">
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Credit/Debit Card
                  </div>
                </SelectItem>
                <SelectItem value="bank-transfer">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Bank Transfer
                  </div>
                </SelectItem>
                <SelectItem value="online">
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Online Payment
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="invoiceNumber">Invoice Number</Label>
            <Input 
              id="invoiceNumber" 
              placeholder="INV-2024-001"
              defaultValue={existingPayment?.invoiceNumber}
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Input 
              id="description" 
              placeholder="e.g., Piano lessons - January 2024"
              defaultValue={existingPayment?.description}
            />
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea 
              id="notes" 
              placeholder="Additional notes about this payment..."
              rows={3}
              defaultValue={existingPayment?.notes}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button className="flex-1">
              {isEditing ? 'Update Payment' : 'Record Payment'}
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

export default PaymentModal;