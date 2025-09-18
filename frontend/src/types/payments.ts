export interface Payment {
  id: number;
  studentId: number;
  studentName: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  method?: 'cash' | 'check' | 'card' | 'bank-transfer' | 'online';
  invoiceNumber: string;
  description: string;
  notes?: string;
}

export interface Invoice {
  id: number;
  invoiceNumber: string;
  studentId: number;
  studentName: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  items: InvoiceItem[];
  notes?: string;
  sentDate?: string;
  paidDate?: string;
}

export interface InvoiceItem {
  id: number;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface PaymentStats {
  totalRevenue: number;
  monthlyRevenue: number;
  pendingPayments: number;
  overduePayments: number;
  paidThisMonth: number;
  averagePayment: number;
}

export interface StudentBilling {
  studentId: number;
  studentName: string;
  totalOwed: number;
  lastPayment?: string;
  nextDue?: string;
  paymentHistory: Payment[];
}