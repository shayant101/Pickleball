import React from 'react';
import { DollarSign, Calendar, CreditCard, MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Payment } from '@/types/payments';

interface PaymentCardProps {
  payment: Payment;
  onEdit: () => void;
  onViewDetails: () => void;
}

const PaymentCard: React.FC<PaymentCardProps> = ({ payment, onEdit, onViewDetails }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentMethodIcon = (method?: string) => {
    switch (method) {
      case 'card': return <CreditCard className="h-4 w-4" />;
      case 'cash': return <DollarSign className="h-4 w-4" />;
      default: return <DollarSign className="h-4 w-4" />;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback>
                {payment.studentName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{payment.studentName}</p>
              <p className="text-sm text-muted-foreground">{payment.invoiceNumber}</p>
              <p className="text-xs text-muted-foreground">{payment.description}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-bold text-lg">${payment.amount}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge className={getStatusColor(payment.status)}>
                  {payment.status}
                </Badge>
                {payment.method && (
                  <div className="flex items-center text-xs text-muted-foreground">
                    {getPaymentMethodIcon(payment.method)}
                    <span className="ml-1 capitalize">{payment.method}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="text-right text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                Due: {new Date(payment.dueDate).toLocaleDateString()}
              </div>
              {payment.paidDate && (
                <div className="mt-1">
                  Paid: {new Date(payment.paidDate).toLocaleDateString()}
                </div>
              )}
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onViewDetails}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onEdit}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Payment
                </DropdownMenuItem>
                {payment.status === 'pending' && (
                  <DropdownMenuItem>
                    <DollarSign className="h-4 w-4 mr-2" />
                    Mark as Paid
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {payment.notes && (
          <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
            <p className="text-muted-foreground">{payment.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentCard;