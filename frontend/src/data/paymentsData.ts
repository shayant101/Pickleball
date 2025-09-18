import { Payment, Invoice, PaymentStats, StudentBilling, InvoiceItem } from '@/types/payments';

export const payments: Payment[] = [
  {
    id: 1,
    studentId: 1,
    studentName: 'Emma Johnson',
    amount: 120,
    dueDate: '2024-01-25',
    paidDate: '2024-01-23',
    status: 'paid',
    method: 'card',
    invoiceNumber: 'INV-2024-001',
    description: 'Piano lessons - January 2024',
    notes: 'Paid via credit card online'
  },
  {
    id: 2,
    studentId: 2,
    studentName: 'Michael Chen',
    amount: 100,
    dueDate: '2024-01-30',
    status: 'pending',
    invoiceNumber: 'INV-2024-002',
    description: 'Guitar lessons - January 2024'
  },
  {
    id: 3,
    studentId: 3,
    studentName: 'Sarah Williams',
    amount: 150,
    dueDate: '2024-01-20',
    status: 'overdue',
    invoiceNumber: 'INV-2024-003',
    description: 'Voice lessons - January 2024'
  },
  {
    id: 4,
    studentId: 1,
    studentName: 'Emma Johnson',
    amount: 120,
    dueDate: '2024-02-25',
    status: 'pending',
    invoiceNumber: 'INV-2024-004',
    description: 'Piano lessons - February 2024'
  },
  {
    id: 5,
    studentId: 4,
    studentName: 'David Brown',
    amount: 80,
    dueDate: '2024-01-15',
    paidDate: '2024-01-14',
    status: 'paid',
    method: 'cash',
    invoiceNumber: 'INV-2024-005',
    description: 'Piano lessons - January 2024'
  }
];

export const invoices: Invoice[] = [
  {
    id: 1,
    invoiceNumber: 'INV-2024-001',
    studentId: 1,
    studentName: 'Emma Johnson',
    issueDate: '2024-01-01',
    dueDate: '2024-01-25',
    amount: 120,
    status: 'paid',
    sentDate: '2024-01-01',
    paidDate: '2024-01-23',
    items: [
      {
        id: 1,
        description: 'Piano Lesson (60 min)',
        quantity: 4,
        rate: 30,
        amount: 120
      }
    ],
    notes: 'Monthly piano lessons for January 2024'
  },
  {
    id: 2,
    invoiceNumber: 'INV-2024-002',
    studentId: 2,
    studentName: 'Michael Chen',
    issueDate: '2024-01-01',
    dueDate: '2024-01-30',
    amount: 100,
    status: 'sent',
    sentDate: '2024-01-01',
    items: [
      {
        id: 2,
        description: 'Guitar Lesson (60 min)',
        quantity: 4,
        rate: 25,
        amount: 100
      }
    ],
    notes: 'Monthly guitar lessons for January 2024'
  },
  {
    id: 3,
    invoiceNumber: 'INV-2024-003',
    studentId: 3,
    studentName: 'Sarah Williams',
    issueDate: '2024-01-01',
    dueDate: '2024-01-20',
    amount: 150,
    status: 'overdue',
    sentDate: '2024-01-01',
    items: [
      {
        id: 3,
        description: 'Voice Lesson (60 min)',
        quantity: 4,
        rate: 35,
        amount: 140
      },
      {
        id: 4,
        description: 'Music Theory Session',
        quantity: 1,
        rate: 10,
        amount: 10
      }
    ],
    notes: 'Monthly voice lessons and theory session for January 2024'
  }
];

export const paymentStats: PaymentStats = {
  totalRevenue: 12450,
  monthlyRevenue: 3200,
  pendingPayments: 2,
  overduePayments: 1,
  paidThisMonth: 8,
  averagePayment: 115
};

export const studentBilling: StudentBilling[] = [
  {
    studentId: 1,
    studentName: 'Emma Johnson',
    totalOwed: 120,
    lastPayment: '2024-01-23',
    nextDue: '2024-02-25',
    paymentHistory: payments.filter(p => p.studentId === 1)
  },
  {
    studentId: 2,
    studentName: 'Michael Chen',
    totalOwed: 100,
    nextDue: '2024-01-30',
    paymentHistory: payments.filter(p => p.studentId === 2)
  },
  {
    studentId: 3,
    studentName: 'Sarah Williams',
    totalOwed: 150,
    nextDue: '2024-01-20',
    paymentHistory: payments.filter(p => p.studentId === 3)
  }
];