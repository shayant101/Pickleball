import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middleware/auth';
import {
  createSession,
  getSessions,
  getSessionById,
  updateSession,
  cancelSession,
  deleteSession,
  getBookedSlots,
  CreateSessionData,
  UpdateSessionData
} from '../services/sessionService';

const router: Router = Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

/**
 * GET /api/sessions
 * List all sessions with optional filtering
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const { start, end, studentId, coachId } = req.query;

    // Parse date parameters
    let startDate: Date | undefined;
    let endDate: Date | undefined;

    if (start && typeof start === 'string') {
      startDate = new Date(start);
      if (isNaN(startDate.getTime())) {
        return res.status(400).json({ error: 'Invalid start date format. Use ISO 8601 format.' });
      }
    }

    if (end && typeof end === 'string') {
      endDate = new Date(end);
      if (isNaN(endDate.getTime())) {
        return res.status(400).json({ error: 'Invalid end date format. Use ISO 8601 format.' });
      }
    }

    // Parse numeric parameters
    let studentIdNum: number | undefined;
    let coachIdNum: number | undefined;

    if (studentId && typeof studentId === 'string') {
      studentIdNum = parseInt(studentId, 10);
      if (isNaN(studentIdNum)) {
        return res.status(400).json({ error: 'Invalid studentId. Must be a number.' });
      }
    }

    if (coachId && typeof coachId === 'string') {
      coachIdNum = parseInt(coachId, 10);
      if (isNaN(coachIdNum)) {
        return res.status(400).json({ error: 'Invalid coachId. Must be a number.' });
      }
    }

    const sessions = await getSessions(startDate, endDate, studentIdNum, coachIdNum);
    res.json(sessions);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /api/sessions
 * Create a new session
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description, startTime, endTime, studentId, coachId, status } = req.body;

    // Validate required fields
    if (!title || !startTime || !endTime || !studentId || !coachId) {
      return res.status(400).json({
        error: 'Missing required fields: title, startTime, endTime, studentId, coachId'
      });
    }

    // Parse and validate dates
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date format. Use ISO 8601 format.' });
    }

    if (startDate >= endDate) {
      return res.status(400).json({ error: 'Start time must be before end time' });
    }

    // Validate numeric IDs
    const studentIdNum = parseInt(studentId, 10);
    const coachIdNum = parseInt(coachId, 10);

    if (isNaN(studentIdNum) || isNaN(coachIdNum)) {
      return res.status(400).json({ error: 'studentId and coachId must be valid numbers' });
    }

    const sessionData: CreateSessionData = {
      title,
      description,
      startTime: startDate,
      endTime: endDate,
      studentId: studentIdNum,
      coachId: coachIdNum,
      status
    };

    const session = await createSession(sessionData);
    res.status(201).json(session);
  } catch (error) {
    console.error('Error creating session:', error);
    
    // Check if it's a conflict error
    if (error instanceof Error && error.message.includes('conflict')) {
      return res.status(409).json({ error: error.message });
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/availability/booked-slots
 * Get booked time slots for calendar availability
 */
router.get('/availability/booked-slots', async (req: Request, res: Response) => {
  try {
    const { start, end, coachId } = req.query;

    // Validate required date parameters
    if (!start || !end) {
      return res.status(400).json({ error: 'start and end date parameters are required' });
    }

    // Parse date parameters
    const startDate = new Date(start as string);
    const endDate = new Date(end as string);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date format. Use ISO 8601 format.' });
    }

    if (startDate >= endDate) {
      return res.status(400).json({ error: 'Start date must be before end date' });
    }

    // Parse coachId if provided
    let coachIdNum: number | undefined;
    if (coachId && typeof coachId === 'string') {
      coachIdNum = parseInt(coachId, 10);
      if (isNaN(coachIdNum)) {
        return res.status(400).json({ error: 'Invalid coachId. Must be a number.' });
      }
    }

    const bookedSlots = await getBookedSlots(startDate, endDate, coachIdNum);
    res.json(bookedSlots);
  } catch (error) {
    console.error('Error fetching availability:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/sessions/:id
 * Get a specific session by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id!, 10);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid session ID' });
    }

    const session = await getSessionById(id);
    
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    res.json(session);
  } catch (error) {
    console.error('Error fetching session:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * PATCH /api/sessions/:id
 * Update a session's details
 */
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id!, 10);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid session ID' });
    }

    const { title, description, startTime, endTime, status } = req.body;
    const updateData: UpdateSessionData = {};

    // Only include fields that are provided
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;

    // Parse dates if provided
    if (startTime !== undefined) {
      const startDate = new Date(startTime);
      if (isNaN(startDate.getTime())) {
        return res.status(400).json({ error: 'Invalid startTime format. Use ISO 8601 format.' });
      }
      updateData.startTime = startDate;
    }

    if (endTime !== undefined) {
      const endDate = new Date(endTime);
      if (isNaN(endDate.getTime())) {
        return res.status(400).json({ error: 'Invalid endTime format. Use ISO 8601 format.' });
      }
      updateData.endTime = endDate;
    }

    // Validate that start time is before end time if both are provided
    if (updateData.startTime && updateData.endTime && updateData.startTime >= updateData.endTime) {
      return res.status(400).json({ error: 'Start time must be before end time' });
    }

    const session = await updateSession(id, updateData);
    res.json(session);
  } catch (error) {
    console.error('Error updating session:', error);
    
    // Check if it's a conflict error
    if (error instanceof Error && error.message.includes('conflict')) {
      return res.status(409).json({ error: error.message });
    }
    
    // Check if it's a not found error
    if (error instanceof Error && error.message.includes('not found')) {
      return res.status(404).json({ error: error.message });
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * DELETE /api/sessions/:id
 * Cancel a session (set status to cancelled)
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id!, 10);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid session ID' });
    }

    const { permanent } = req.query;

    if (permanent === 'true') {
      // Permanently delete the session
      await deleteSession(id);
      res.status(204).send();
    } else {
      // Cancel the session (set status to cancelled)
      const session = await cancelSession(id);
      res.json(session);
    }
  } catch (error) {
    console.error('Error deleting/cancelling session:', error);
    
    // Check if it's a not found error
    if (error instanceof Error && error.message.includes('not found')) {
      return res.status(404).json({ error: error.message });
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
});


export default router;