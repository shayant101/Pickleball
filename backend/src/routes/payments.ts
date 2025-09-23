import { Router, Request, Response } from 'express';
import { PaymentService, CreatePaymentData, UpdatePaymentData, CreateInvoiceData, UpdateInvoiceData } from '../services/paymentService';
import { authenticateToken } from '../middleware/auth';

const router: Router = Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// PAYMENT ROUTES

// GET /api/payments - List all payments with optional filtering
router.get('/', async (req: Request, res: Response) => {
  try {
    const { studentId, status, method, startDate, endDate } = req.query;

    const options: any = {};
    if (studentId) options.studentId = parseInt(studentId as string);
    if (status) options.status = status as string;
    if (method) options.method = method as string;
    if (startDate) options.startDate = new Date(startDate as string);
    if (endDate) options.endDate = new Date(endDate as string);

    const payments = await PaymentService.getAllPayments(options);

    res.status(200).json({
      success: true,
      data: payments,
      count: payments.length
    });
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch payments'
    });
  }
});

// GET /api/payments/:id - Get a single payment
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id!);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid payment ID'
      });
    }

    const payment = await PaymentService.getPaymentById(id);
    
    if (!payment) {
      return res.status(404).json({
        success: false,
        error: 'Payment not found'
      });
    }

    res.status(200).json({
      success: true,
      data: payment
    });
  } catch (error) {
    console.error('Error fetching payment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch payment'
    });
  }
});

// POST /api/payments - Create a new payment
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      amount,
      currency,
      method,
      status,
      description,
      reference,
      studentId,
      invoiceId
    } = req.body;

    // Validate required fields
    if (!amount || !method || !studentId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: amount, method, studentId'
      });
    }

    const paymentData: CreatePaymentData = {
      amount: parseFloat(amount),
      currency: currency || 'USD',
      method,
      status: status || 'pending',
      description,
      reference,
      studentId: parseInt(studentId)
    };

    if (invoiceId) {
      paymentData.invoiceId = parseInt(invoiceId);
    }

    const payment = await PaymentService.createPayment(paymentData);

    res.status(201).json({
      success: true,
      data: payment,
      message: 'Payment created successfully'
    });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create payment'
    });
  }
});

// PATCH /api/payments/:id - Update a payment
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id!);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid payment ID'
      });
    }

    const updateData: UpdatePaymentData = req.body;

    const payment = await PaymentService.updatePayment(id, updateData);
    
    if (!payment) {
      return res.status(404).json({
        success: false,
        error: 'Payment not found'
      });
    }

    res.status(200).json({
      success: true,
      data: payment,
      message: 'Payment updated successfully'
    });
  } catch (error) {
    console.error('Error updating payment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update payment'
    });
  }
});

// DELETE /api/payments/:id - Delete a payment
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id!);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid payment ID'
      });
    }

    const success = await PaymentService.deletePayment(id);
    
    if (!success) {
      return res.status(404).json({
        success: false,
        error: 'Payment not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Payment deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting payment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete payment'
    });
  }
});

// INVOICE ROUTES

// GET /api/payments/invoices - List all invoices with optional filtering
router.get('/invoices', async (req: Request, res: Response) => {
  try {
    const { studentId, status, overdue } = req.query;

    const options: any = {};
    if (studentId) options.studentId = parseInt(studentId as string);
    if (status) options.status = status as string;
    if (overdue) options.overdue = overdue === 'true';

    const invoices = await PaymentService.getAllInvoices(options);

    res.status(200).json({
      success: true,
      data: invoices,
      count: invoices.length
    });
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch invoices'
    });
  }
});

// GET /api/payments/invoices/:id - Get a single invoice
router.get('/invoices/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id!);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid invoice ID'
      });
    }

    const invoice = await PaymentService.getInvoiceById(id);
    
    if (!invoice) {
      return res.status(404).json({
        success: false,
        error: 'Invoice not found'
      });
    }

    res.status(200).json({
      success: true,
      data: invoice
    });
  } catch (error) {
    console.error('Error fetching invoice:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch invoice'
    });
  }
});

// POST /api/payments/invoices - Create a new invoice
router.post('/invoices', async (req: Request, res: Response) => {
  try {
    const {
      studentId,
      subtotal,
      tax,
      total,
      dueDate,
      notes,
      items
    } = req.body;

    // Validate required fields
    if (!studentId || !subtotal || !total || !dueDate || !items || !Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: studentId, subtotal, total, dueDate, items'
      });
    }

    const invoiceData: CreateInvoiceData = {
      studentId: parseInt(studentId),
      subtotal: parseFloat(subtotal),
      tax: tax ? parseFloat(tax) : 0,
      total: parseFloat(total),
      dueDate: new Date(dueDate),
      notes,
      items: items.map((item: any) => {
        const invoiceItem: any = {
          description: item.description,
          quantity: item.quantity || 1,
          unitPrice: parseFloat(item.unitPrice),
          total: parseFloat(item.total)
        };
        
        if (item.sessionId) {
          invoiceItem.sessionId = parseInt(item.sessionId);
        }
        
        return invoiceItem;
      })
    };

    const invoice = await PaymentService.createInvoice(invoiceData);

    res.status(201).json({
      success: true,
      data: invoice,
      message: 'Invoice created successfully'
    });
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create invoice'
    });
  }
});

// PATCH /api/payments/invoices/:id - Update an invoice
router.patch('/invoices/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id!);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid invoice ID'
      });
    }

    const updateData: UpdateInvoiceData = req.body;

    // Convert date strings to Date objects if present
    if (updateData.dueDate) {
      updateData.dueDate = new Date(updateData.dueDate);
    }
    if (updateData.paidAt) {
      updateData.paidAt = new Date(updateData.paidAt);
    }

    const invoice = await PaymentService.updateInvoice(id, updateData);
    
    if (!invoice) {
      return res.status(404).json({
        success: false,
        error: 'Invoice not found'
      });
    }

    res.status(200).json({
      success: true,
      data: invoice,
      message: 'Invoice updated successfully'
    });
  } catch (error) {
    console.error('Error updating invoice:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update invoice'
    });
  }
});

// DELETE /api/payments/invoices/:id - Delete an invoice
router.delete('/invoices/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id!);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid invoice ID'
      });
    }

    const success = await PaymentService.deleteInvoice(id);
    
    if (!success) {
      return res.status(404).json({
        success: false,
        error: 'Invoice not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Invoice deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting invoice:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete invoice'
    });
  }
});

// BILLING ROUTES

// GET /api/payments/billing/students - Get billing summary for all students
router.get('/billing/students', async (req: Request, res: Response) => {
  try {
    const billingSummary = await PaymentService.getBillingSummary();

    res.status(200).json({
      success: true,
      data: billingSummary,
      count: billingSummary.length
    });
  } catch (error) {
    console.error('Error fetching billing summary:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch billing summary'
    });
  }
});

// POST /api/payments/invoices/mark-overdue - Mark overdue invoices
router.post('/invoices/mark-overdue', async (req: Request, res: Response) => {
  try {
    const count = await PaymentService.markOverdueInvoices();

    res.status(200).json({
      success: true,
      data: { count },
      message: `${count} invoices marked as overdue`
    });
  } catch (error) {
    console.error('Error marking overdue invoices:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to mark overdue invoices'
    });
  }
});

export default router;