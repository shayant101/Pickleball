import express, { Router } from 'express';
import { AttendanceService } from '../services/attendanceService';
import { authenticateToken } from '../middleware/auth';

const router: Router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// POST /api/attendance - Mark attendance for a session
router.post('/', async (req, res) => {
  try {
    const { sessionId, studentId, status, arrivalTime, notes } = req.body;

    // Validate required fields
    if (!sessionId || !studentId || !status) {
      return res.status(400).json({
        error: 'Missing required fields: sessionId, studentId, status'
      });
    }

    // Validate status
    if (!['present', 'absent', 'late'].includes(status)) {
      return res.status(400).json({
        error: 'Invalid status. Must be one of: present, absent, late'
      });
    }

    const attendanceData = {
      sessionId: parseInt(sessionId),
      studentId: parseInt(studentId),
      status,
      arrivalTime: arrivalTime ? new Date(arrivalTime) : null,
      notes: notes || null
    };

    const attendance = await AttendanceService.markAttendance(attendanceData);

    res.status(201).json({
      message: 'Attendance marked successfully',
      data: attendance
    });
  } catch (error: any) {
    console.error('Error marking attendance:', error);
    
    if (error.message === 'Attendance already marked for this session') {
      return res.status(409).json({ error: error.message });
    }
    
    if (error.message === 'Session not found or does not belong to student') {
      return res.status(404).json({ error: error.message });
    }

    res.status(500).json({ error: 'Failed to mark attendance' });
  }
});

// PUT /api/attendance/:sessionId/:studentId - Update attendance record
router.put('/:sessionId/:studentId', async (req, res) => {
  try {
    const { sessionId, studentId } = req.params;
    const { status, arrivalTime, notes } = req.body;

    // Validate status if provided
    if (status && !['present', 'absent', 'late'].includes(status)) {
      return res.status(400).json({
        error: 'Invalid status. Must be one of: present, absent, late'
      });
    }

    const updateData: any = {};
    if (status) updateData.status = status;
    if (arrivalTime !== undefined) updateData.arrivalTime = arrivalTime ? new Date(arrivalTime) : null;
    if (notes !== undefined) updateData.notes = notes;

    const attendance = await AttendanceService.updateAttendance(
      parseInt(sessionId),
      parseInt(studentId),
      updateData
    );

    if (!attendance) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }

    res.json({
      message: 'Attendance updated successfully',
      data: attendance
    });
  } catch (error: any) {
    console.error('Error updating attendance:', error);
    res.status(500).json({ error: 'Failed to update attendance' });
  }
});

// GET /api/attendance/summary - Get aggregated attendance statistics
router.get('/summary', async (req, res) => {
  try {
    const { studentIds, startDate, endDate } = req.query;

    let parsedStudentIds: number[] | undefined;
    if (studentIds) {
      if (typeof studentIds === 'string') {
        parsedStudentIds = studentIds.split(',').map(id => parseInt(id.trim()));
      } else if (Array.isArray(studentIds)) {
        parsedStudentIds = studentIds.map(id => parseInt(String(id)));
      }
    }

    const parsedStartDate = startDate ? new Date(String(startDate)) : undefined;
    const parsedEndDate = endDate ? new Date(String(endDate)) : undefined;

    const summary = await AttendanceService.getAttendanceSummary(
      parsedStudentIds,
      parsedStartDate,
      parsedEndDate
    );

    const overallStats = await AttendanceService.getOverallStats(
      parsedStartDate,
      parsedEndDate
    );

    res.json({
      message: 'Attendance summary retrieved successfully',
      data: {
        studentSummaries: summary,
        overallStats
      }
    });
  } catch (error: any) {
    console.error('Error getting attendance summary:', error);
    res.status(500).json({ error: 'Failed to get attendance summary' });
  }
});

// GET /api/attendance/student/:studentId - Get attendance records for a specific student
router.get('/student/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    const { startDate, endDate } = req.query;

    const parsedStartDate = startDate ? new Date(String(startDate)) : undefined;
    const parsedEndDate = endDate ? new Date(String(endDate)) : undefined;

    const attendance = await AttendanceService.getStudentAttendance(
      parseInt(studentId),
      parsedStartDate,
      parsedEndDate
    );

    res.json({
      message: 'Student attendance retrieved successfully',
      data: attendance
    });
  } catch (error: any) {
    console.error('Error getting student attendance:', error);
    res.status(500).json({ error: 'Failed to get student attendance' });
  }
});

// GET /api/attendance/session/:sessionId - Get attendance records for a specific session
router.get('/session/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;

    const attendance = await AttendanceService.getSessionAttendance(parseInt(sessionId));

    res.json({
      message: 'Session attendance retrieved successfully',
      data: attendance
    });
  } catch (error: any) {
    console.error('Error getting session attendance:', error);
    res.status(500).json({ error: 'Failed to get session attendance' });
  }
});

// DELETE /api/attendance/:sessionId/:studentId - Delete attendance record
router.delete('/:sessionId/:studentId', async (req, res) => {
  try {
    const { sessionId, studentId } = req.params;

    const success = await AttendanceService.deleteAttendance(
      parseInt(sessionId),
      parseInt(studentId)
    );

    if (!success) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }

    res.json({ message: 'Attendance record deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting attendance:', error);
    res.status(500).json({ error: 'Failed to delete attendance record' });
  }
});

export default router;