import { PrismaClient, Payment, Invoice, InvoiceItem } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreatePaymentData {
  amount: number;
  currency?: string;
  method: string;
  status?: string;
  description?: string;
  reference?: string;
  studentId: number;
  invoiceId?: number | undefined;
}

export interface UpdatePaymentData {
  amount?: number;
  currency?: string;
  method?: string;
  status?: string;
  description?: string;
  reference?: string;
  processedAt?: Date;
}

export interface CreateInvoiceData {
  studentId: number;
  subtotal: number;
  tax?: number;
  total: number;
  dueDate: Date;
  notes?: string;
  items: CreateInvoiceItemData[];
}

export interface CreateInvoiceItemData {
  description: string;
  quantity?: number;
  unitPrice: number;
  total: number;
  sessionId?: number | undefined;
}

export interface UpdateInvoiceData {
  status?: string;
  subtotal?: number;
  tax?: number;
  total?: number;
  dueDate?: Date;
  notes?: string;
  paidAt?: Date;
}

export interface PaymentWithInvoice extends Payment {
  invoice?: Invoice | null;
  student: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface InvoiceWithItems extends Invoice {
  items: InvoiceItem[];
  payments: Payment[];
  student: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface BillingSummary {
  studentId: number;
  studentName: string;
  totalOwed: number;
  overdueAmount: number;
  lastPaymentDate?: Date | undefined;
  invoiceCount: number;
  overdueInvoiceCount: number;
}

export class PaymentService {
  // Get all payments with optional filtering
  static async getAllPayments(options?: {
    studentId?: number;
    status?: string;
    method?: string;
    startDate?: Date;
    endDate?: Date;
  }): Promise<PaymentWithInvoice[]> {
    const { studentId, status, method, startDate, endDate } = options || {};

    const where: any = {};

    if (studentId) where.studentId = studentId;
    if (status) where.status = status;
    if (method) where.method = method;
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = startDate;
      if (endDate) where.createdAt.lte = endDate;
    }

    return await prisma.payment.findMany({
      where,
      include: {
        invoice: true,
        student: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  // Get payment by ID
  static async getPaymentById(id: number): Promise<PaymentWithInvoice | null> {
    return await prisma.payment.findUnique({
      where: { id },
      include: {
        invoice: true,
        student: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });
  }

  // Create a new payment
  static async createPayment(data: CreatePaymentData): Promise<PaymentWithInvoice> {
    const createData: any = {
      ...data,
      processedAt: data.status === 'completed' ? new Date() : null
    };
    
    // Handle undefined invoiceId
    if (data.invoiceId === undefined) {
      delete createData.invoiceId;
    }

    const payment = await prisma.payment.create({
      data: createData,
      include: {
        invoice: true,
        student: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    // If payment is completed and linked to an invoice, update invoice status
    if (data.status === 'completed' && data.invoiceId) {
      await this.updateInvoicePaymentStatus(data.invoiceId);
    }

    return payment;
  }

  // Update a payment
  static async updatePayment(id: number, data: UpdatePaymentData): Promise<PaymentWithInvoice | null> {
    try {
      const updateData: any = {
        ...data,
        processedAt: data.status === 'completed' ? new Date() : undefined
      };

      const payment = await prisma.payment.update({
        where: { id },
        data: updateData,
        include: {
          invoice: true,
          student: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true
            }
          }
        }
      });

      // Update invoice status if payment status changed
      if (data.status === 'completed' && payment.invoiceId) {
        await this.updateInvoicePaymentStatus(payment.invoiceId);
      }

      return payment;
    } catch (error) {
      return null;
    }
  }

  // Delete a payment
  static async deletePayment(id: number): Promise<boolean> {
    try {
      await prisma.payment.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  // Get all invoices with optional filtering
  static async getAllInvoices(options?: {
    studentId?: number;
    status?: string;
    overdue?: boolean;
  }): Promise<InvoiceWithItems[]> {
    const { studentId, status, overdue } = options || {};

    const where: any = {};

    if (studentId) where.studentId = studentId;
    if (status) where.status = status;
    if (overdue) {
      where.status = { in: ['sent', 'overdue'] };
      where.dueDate = { lt: new Date() };
    }

    return await prisma.invoice.findMany({
      where,
      include: {
        items: {
          include: {
            session: {
              select: {
                id: true,
                title: true,
                startTime: true
              }
            }
          }
        },
        payments: true,
        student: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  // Get invoice by ID
  static async getInvoiceById(id: number): Promise<InvoiceWithItems | null> {
    return await prisma.invoice.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            session: {
              select: {
                id: true,
                title: true,
                startTime: true
              }
            }
          }
        },
        payments: true,
        student: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });
  }

  // Create a new invoice
  static async createInvoice(data: CreateInvoiceData): Promise<InvoiceWithItems> {
    const invoiceNumber = await this.generateInvoiceNumber();

    const createData: any = {
      invoiceNumber,
      studentId: data.studentId,
      subtotal: data.subtotal,
      tax: data.tax || 0,
      total: data.total,
      dueDate: data.dueDate,
      items: {
        create: data.items
      }
    };

    if (data.notes !== undefined) {
      createData.notes = data.notes;
    }

    return await prisma.invoice.create({
      data: createData,
      include: {
        items: {
          include: {
            session: {
              select: {
                id: true,
                title: true,
                startTime: true
              }
            }
          }
        },
        payments: true,
        student: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });
  }

  // Update an invoice
  static async updateInvoice(id: number, data: UpdateInvoiceData): Promise<InvoiceWithItems | null> {
    try {
      return await prisma.invoice.update({
        where: { id },
        data,
        include: {
          items: {
            include: {
              session: {
                select: {
                  id: true,
                  title: true,
                  startTime: true
                }
              }
            }
          },
          payments: true,
          student: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true
            }
          }
        }
      });
    } catch (error) {
      return null;
    }
  }

  // Delete an invoice
  static async deleteInvoice(id: number): Promise<boolean> {
    try {
      await prisma.invoice.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  // Get billing summary for students
  static async getBillingSummary(): Promise<BillingSummary[]> {
    const students = await prisma.student.findMany({
      include: {
        invoices: {
          include: {
            payments: true
          }
        },
        payments: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    });

    return students.map(student => {
      const totalOwed = student.invoices
        .filter(invoice => invoice.status !== 'paid' && invoice.status !== 'cancelled')
        .reduce((sum, invoice) => {
          const paidAmount = invoice.payments
            .filter(payment => payment.status === 'completed')
            .reduce((pSum, payment) => pSum + payment.amount, 0);
          return sum + (invoice.total - paidAmount);
        }, 0);

      const overdueAmount = student.invoices
        .filter(invoice => 
          (invoice.status === 'sent' || invoice.status === 'overdue') && 
          invoice.dueDate < new Date()
        )
        .reduce((sum, invoice) => {
          const paidAmount = invoice.payments
            .filter(payment => payment.status === 'completed')
            .reduce((pSum, payment) => pSum + payment.amount, 0);
          return sum + (invoice.total - paidAmount);
        }, 0);

      const overdueInvoiceCount = student.invoices.filter(invoice => 
        (invoice.status === 'sent' || invoice.status === 'overdue') && 
        invoice.dueDate < new Date()
      ).length;

      return {
        studentId: student.id,
        studentName: `${student.firstName} ${student.lastName}`,
        totalOwed,
        overdueAmount,
        lastPaymentDate: student.payments[0]?.createdAt,
        invoiceCount: student.invoices.length,
        overdueInvoiceCount
      };
    });
  }

  // Update invoice payment status based on payments
  private static async updateInvoicePaymentStatus(invoiceId: number): Promise<void> {
    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: { payments: true }
    });

    if (!invoice) return;

    const totalPaid = invoice.payments
      .filter(payment => payment.status === 'completed')
      .reduce((sum, payment) => sum + payment.amount, 0);

    let newStatus = invoice.status;
    let paidAt = invoice.paidAt;

    if (totalPaid >= invoice.total) {
      newStatus = 'paid';
      paidAt = new Date();
    } else if (totalPaid > 0) {
      newStatus = 'sent'; // Partially paid
    }

    if (newStatus !== invoice.status || paidAt !== invoice.paidAt) {
      await prisma.invoice.update({
        where: { id: invoiceId },
        data: { status: newStatus, paidAt }
      });
    }
  }

  // Generate unique invoice number
  private static async generateInvoiceNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    
    const lastInvoice = await prisma.invoice.findFirst({
      where: {
        invoiceNumber: {
          startsWith: `INV-${year}${month}`
        }
      },
      orderBy: { invoiceNumber: 'desc' }
    });

    let sequence = 1;
    if (lastInvoice) {
      const parts = lastInvoice.invoiceNumber.split('-');
      if (parts.length >= 3 && parts[2]) {
        const lastSequence = parseInt(parts[2]);
        sequence = lastSequence + 1;
      }
    }

    return `INV-${year}${month}-${String(sequence).padStart(4, '0')}`;
  }

  // Mark overdue invoices
  static async markOverdueInvoices(): Promise<number> {
    const result = await prisma.invoice.updateMany({
      where: {
        status: 'sent',
        dueDate: { lt: new Date() }
      },
      data: { status: 'overdue' }
    });

    return result.count;
  }
}