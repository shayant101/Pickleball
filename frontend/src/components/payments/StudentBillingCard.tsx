import React from 'react';
import { DollarSign, Calendar, AlertTriangle, CheckCircle, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StudentBilling } from '@/types/payments';

interface StudentBillingCardProps {
  billing: StudentBilling;
  onCreateInvoice: () => void;
  onRecordPayment: () => void;
}

const StudentBillingCard: React.FC<StudentBillingCardProps> = ({
  billing,
  onCreateInvoice,
  onRecordPayment
}) => {
  const isOverdue = billing.nextDue && new Date(billing.nextDue) < new Date();
  const recentPayments = billing.paymentHistory.slice(0, 3);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarFallback>
              {billing.studentName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-lg">{billing.studentName}</CardTitle>
            <CardDescription>
              {billing.totalOwed > 0 ? `$${billing.totalOwed} outstanding` : 'No outstanding balance'}
            </CardDescription>
          </div>
          {isOverdue && (
            <Badge className="bg-red-100 text-red-800">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Overdue
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Payment Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-2 bg-gray-50 rounded">
            <div className="text-lg font-bold">${billing.totalOwed}</div>
            <div className="text-xs text-muted-foreground">Outstanding</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded">
            <div className="text-lg font-bold">{billing.paymentHistory.length}</div>
            <div className="text-xs text-muted-foreground">Total Payments</div>
          </div>
        </div>

        {/* Payment Dates */}
        <div className="space-y-2">
          {billing.lastPayment && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Last Payment:</span>
              <span>{new Date(billing.lastPayment).toLocaleDateString()}</span>
            </div>
          )}
          {billing.nextDue && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Next Due:</span>
              <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
                {new Date(billing.nextDue).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        {/* Recent Payments */}
        {recentPayments.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Recent Payments</h4>
            <div className="space-y-1">
              {recentPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    {payment.status === 'paid' ? (
                      <CheckCircle className="h-3 w-3 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-3 w-3 text-red-600" />
                    )}
                    <span>{payment.invoiceNumber}</span>
                  </div>
                  <span className="font-medium">${payment.amount}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2 border-t">
          <Button variant="outline" size="sm" className="flex-1" onClick={onCreateInvoice}>
            <Plus className="h-4 w-4 mr-1" />
            Invoice
          </Button>
          <Button variant="outline" size="sm" className="flex-1" onClick={onRecordPayment}>
            <DollarSign className="h-4 w-4 mr-1" />
            Payment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentBillingCard;