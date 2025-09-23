import { Router, Request, Response } from 'express';
import { StudentService, CreateStudentData, UpdateStudentData } from '../services/studentService';
import { GuardianService, CreateGuardianData, UpdateGuardianData } from '../services/guardianService';
import { authenticateToken } from '../middleware/auth';

const router: Router = Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// GET /api/students - List all students with optional search and filtering
router.get('/', async (req: Request, res: Response) => {
  try {
    const { search, status, level } = req.query;

    const students = await StudentService.getAllStudents({
      search: search as string,
      status: status as string,
      level: level as string,
      includeGuardians: true
    });

    res.status(200).json({
      success: true,
      data: students,
      count: students.length
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch students'
    });
  }
});

// GET /api/students/stats - Get student statistics
router.get('/stats', async (req: Request, res: Response) => {
  try {
    const stats = await StudentService.getStudentStats();
    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching student stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch student statistics'
    });
  }
});

// GET /api/students/:id - Get a single student's details
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id!);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid student ID'
      });
    }

    const student = await StudentService.getStudentById(id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch student'
    });
  }
});

// POST /api/students - Create a new student
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      playStyle,
      level,
      status,
      address,
      notes,
      goals,
      avatar,
      guardians
    } = req.body;

    // Validate required fields (only the ones marked with * in the frontend)
    if (!firstName || !lastName || !playStyle) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: firstName, lastName, playStyle'
      });
    }

    const studentData: CreateStudentData = {
      firstName,
      lastName,
      email,
      phone,
      playStyle,
      level,
      status: status || 'Active',
      address,
      notes,
      goals: goals || [],
      avatar,
      guardians: guardians || []
    };

    const student = await StudentService.createStudent(studentData);

    res.status(201).json({
      success: true,
      data: student,
      message: 'Student created successfully'
    });
  } catch (error) {
    console.error('Error creating student:', error);
    
    // Handle unique constraint violation (duplicate email)
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return res.status(409).json({
        success: false,
        error: 'A student with this email already exists'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to create student'
    });
  }
});

// PATCH /api/students/:id - Update a student's details
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id!);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid student ID'
      });
    }

    const updateData: UpdateStudentData = req.body;

    const student = await StudentService.updateStudent(id, updateData);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      data: student,
      message: 'Student updated successfully'
    });
  } catch (error) {
    console.error('Error updating student:', error);
    
    // Handle unique constraint violation (duplicate email)
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return res.status(409).json({
        success: false,
        error: 'A student with this email already exists'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to update student'
    });
  }
});

// DELETE /api/students/:id - Delete a student
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id!);
    const { hard } = req.query; // ?hard=true for hard delete
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid student ID'
      });
    }

    const success = await StudentService.deleteStudent(id, hard === 'true');
    
    if (!success) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      message: hard === 'true' ? 'Student permanently deleted' : 'Student deactivated'
    });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete student'
    });
  }
});

// POST /api/students/:id/guardians - Add a new guardian to a student
router.post('/:id/guardians', async (req: Request, res: Response) => {
  try {
    const studentId = parseInt(req.params.id!);
    
    if (isNaN(studentId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid student ID'
      });
    }

    const { firstName, lastName, email, phone } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: firstName, lastName, email, phone'
      });
    }

    // Check if student exists
    const student = await StudentService.getStudentById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }

    // Check if guardian already exists for this student
    const guardianExists = await GuardianService.guardianExists(studentId, email);
    if (guardianExists) {
      return res.status(409).json({
        success: false,
        error: 'Guardian with this email already exists for this student'
      });
    }

    const guardianData: CreateGuardianData = {
      firstName,
      lastName,
      email,
      phone,
      studentId
    };

    const guardian = await GuardianService.createGuardian(guardianData);

    res.status(201).json({
      success: true,
      data: guardian,
      message: 'Guardian added successfully'
    });
  } catch (error) {
    console.error('Error adding guardian:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to add guardian'
    });
  }
});

// PATCH /api/students/:id/guardians/:guardianId - Update a guardian
router.patch('/:id/guardians/:guardianId', async (req: Request, res: Response) => {
  try {
    const studentId = parseInt(req.params.id!);
    const guardianId = parseInt(req.params.guardianId!);
    
    if (isNaN(studentId) || isNaN(guardianId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid student ID or guardian ID'
      });
    }

    // Validate guardian belongs to student
    const isValid = await GuardianService.validateGuardianOwnership(guardianId, studentId);
    if (!isValid) {
      return res.status(404).json({
        success: false,
        error: 'Guardian not found for this student'
      });
    }

    const updateData: UpdateGuardianData = req.body;
    const guardian = await GuardianService.updateGuardian(guardianId, updateData);
    
    if (!guardian) {
      return res.status(404).json({
        success: false,
        error: 'Guardian not found'
      });
    }

    res.status(200).json({
      success: true,
      data: guardian,
      message: 'Guardian updated successfully'
    });
  } catch (error) {
    console.error('Error updating guardian:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update guardian'
    });
  }
});

// DELETE /api/students/:id/guardians/:guardianId - Delete a guardian
router.delete('/:id/guardians/:guardianId', async (req: Request, res: Response) => {
  try {
    const studentId = parseInt(req.params.id!);
    const guardianId = parseInt(req.params.guardianId!);
    
    if (isNaN(studentId) || isNaN(guardianId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid student ID or guardian ID'
      });
    }

    // Validate guardian belongs to student
    const isValid = await GuardianService.validateGuardianOwnership(guardianId, studentId);
    if (!isValid) {
      return res.status(404).json({
        success: false,
        error: 'Guardian not found for this student'
      });
    }

    const success = await GuardianService.deleteGuardian(guardianId);
    
    if (!success) {
      return res.status(404).json({
        success: false,
        error: 'Guardian not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Guardian deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting guardian:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete guardian'
    });
  }
});

// POST /api/students/:id/sessions/increment - Increment session count
router.post('/:id/sessions/increment', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id!);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid student ID'
      });
    }

    const student = await StudentService.incrementSessionCount(id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      data: student,
      message: 'Session count incremented successfully'
    });
  } catch (error) {
    console.error('Error incrementing session count:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to increment session count'
    });
  }
});

export default router;