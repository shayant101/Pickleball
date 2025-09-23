import express, { Express } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import authRouter from './routes/auth';
import studentsRouter from './routes/students';
import sessionsRouter from './routes/sessions';
import attendanceRouter from './routes/attendance';
import progressRouter from './routes/progress';
import paymentsRouter from './routes/payments';
import messagesRouter from './routes/messages';
import analyticsRouter from './routes/analytics';
import settingsRouter from './routes/settings';
import { authenticateToken } from './middleware/auth';

const app: Express = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5137'], // Frontend origins
  credentials: true
}));
app.use(express.json());

// Health check endpoint with database connectivity
app.get('/api/health', async (req, res) => {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      service: 'backend-api'
    });
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      service: 'backend-api',
      error: 'Database connection failed'
    });
  }
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/students', studentsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/attendance', attendanceRouter);
app.use('/api/progress', progressRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/availability', sessionsRouter);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Backend API is running!' });
});

// Protected test route
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({
    message: 'This is a protected route!',
    user: req.user
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check available at http://localhost:${PORT}/api/health`);
});

export default app;