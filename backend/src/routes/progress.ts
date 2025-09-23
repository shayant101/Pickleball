import express, { Router } from 'express';
import { LessonNoteService } from '../services/lessonNoteService';
import { GoalService } from '../services/goalService';
import { PracticeLogService } from '../services/practiceLogService';
import { SkillAssessmentService } from '../services/skillAssessmentService';
import { authenticateToken } from '../middleware/auth';

const router: Router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// ===== LESSON NOTES ENDPOINTS =====

// POST /api/progress/students/:id/lesson-notes - Create a lesson note
router.post('/students/:id/lesson-notes', async (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    const { title, content, tags, sessionId } = req.body;
    const coachId = req.user?.id;

    if (!coachId) {
      return res.status(401).json({ error: 'Coach ID not found in token' });
    }

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const lessonNote = await LessonNoteService.createLessonNote({
      title,
      content,
      tags,
      studentId,
      coachId,
      sessionId: sessionId || null
    });

    res.status(201).json({
      message: 'Lesson note created successfully',
      data: lessonNote
    });
  } catch (error: any) {
    console.error('Error creating lesson note:', error);
    res.status(500).json({ error: 'Failed to create lesson note' });
  }
});

// GET /api/progress/students/:id/lesson-notes - Get lesson notes for a student
router.get('/students/:id/lesson-notes', async (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    const { limit, offset, startDate, endDate, tags } = req.query;

    const options: any = {};
    if (limit) options.limit = parseInt(String(limit));
    if (offset) options.offset = parseInt(String(offset));
    if (startDate) options.startDate = new Date(String(startDate));
    if (endDate) options.endDate = new Date(String(endDate));
    if (tags) {
      options.tags = typeof tags === 'string' ? tags.split(',') : tags;
    }

    const lessonNotes = await LessonNoteService.getStudentLessonNotes(studentId, options);

    res.json({
      message: 'Lesson notes retrieved successfully',
      data: lessonNotes
    });
  } catch (error: any) {
    console.error('Error getting lesson notes:', error);
    res.status(500).json({ error: 'Failed to get lesson notes' });
  }
});

// ===== STUDENT GOALS ENDPOINTS =====

// POST /api/progress/students/:id/goals - Create a student goal
router.post('/students/:id/goals', async (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    const { title, description, category, priority, targetDate, notes } = req.body;
    const coachId = req.user?.id;

    if (!coachId) {
      return res.status(401).json({ error: 'Coach ID not found in token' });
    }

    if (!title || !category) {
      return res.status(400).json({ error: 'Title and category are required' });
    }

    if (!['technique', 'strategy', 'fitness', 'mental', 'other'].includes(category)) {
      return res.status(400).json({ 
        error: 'Invalid category. Must be one of: technique, strategy, fitness, mental, other' 
      });
    }

    const goal = await GoalService.createGoal({
      title,
      description: description || null,
      category,
      priority: priority || 'medium',
      targetDate: targetDate ? new Date(targetDate) : null,
      studentId,
      coachId,
      notes: notes || null
    });

    res.status(201).json({
      message: 'Goal created successfully',
      data: goal
    });
  } catch (error: any) {
    console.error('Error creating goal:', error);
    res.status(500).json({ error: 'Failed to create goal' });
  }
});

// GET /api/progress/students/:id/goals - Get goals for a student
router.get('/students/:id/goals', async (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    const { status, category, priority, limit, offset } = req.query;

    const options: any = {};
    if (status) options.status = String(status);
    if (category) options.category = String(category);
    if (priority) options.priority = String(priority);
    if (limit) options.limit = parseInt(String(limit));
    if (offset) options.offset = parseInt(String(offset));

    const goals = await GoalService.getStudentGoals(studentId, options);

    res.json({
      message: 'Goals retrieved successfully',
      data: goals
    });
  } catch (error: any) {
    console.error('Error getting goals:', error);
    res.status(500).json({ error: 'Failed to get goals' });
  }
});

// PATCH /api/progress/goals/:id - Update a goal
router.patch('/goals/:id', async (req, res) => {
  try {
    const goalId = parseInt(req.params.id);
    const { title, description, category, priority, status, targetDate, progress, notes } = req.body;

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (category !== undefined) updateData.category = category;
    if (priority !== undefined) updateData.priority = priority;
    if (status !== undefined) updateData.status = status;
    if (targetDate !== undefined) updateData.targetDate = targetDate ? new Date(targetDate) : null;
    if (progress !== undefined) updateData.progress = progress;
    if (notes !== undefined) updateData.notes = notes;

    const goal = await GoalService.updateGoal(goalId, updateData);

    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    res.json({
      message: 'Goal updated successfully',
      data: goal
    });
  } catch (error: any) {
    console.error('Error updating goal:', error);
    res.status(500).json({ error: 'Failed to update goal' });
  }
});

// ===== PRACTICE LOGS ENDPOINTS =====

// POST /api/progress/students/:id/practice-logs - Create a practice log
router.post('/students/:id/practice-logs', async (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    const { date, duration, type, focus, notes, rating } = req.body;

    if (!date || !duration || !type) {
      return res.status(400).json({ error: 'Date, duration, and type are required' });
    }

    if (!['solo', 'group', 'match', 'drill'].includes(type)) {
      return res.status(400).json({ 
        error: 'Invalid type. Must be one of: solo, group, match, drill' 
      });
    }

    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const practiceLog = await PracticeLogService.createPracticeLog({
      date: new Date(date),
      duration: parseInt(duration),
      type,
      focus: focus || null,
      notes: notes || null,
      rating: rating ? parseInt(rating) : null,
      studentId
    });

    res.status(201).json({
      message: 'Practice log created successfully',
      data: practiceLog
    });
  } catch (error: any) {
    console.error('Error creating practice log:', error);
    if (error.message === 'Rating must be between 1 and 5') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to create practice log' });
  }
});

// GET /api/progress/students/:id/practice-logs - Get practice logs for a student
router.get('/students/:id/practice-logs', async (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    const { startDate, endDate, type, limit, offset } = req.query;

    const options: any = {};
    if (startDate) options.startDate = new Date(String(startDate));
    if (endDate) options.endDate = new Date(String(endDate));
    if (type) options.type = String(type);
    if (limit) options.limit = parseInt(String(limit));
    if (offset) options.offset = parseInt(String(offset));

    const practiceLogs = await PracticeLogService.getStudentPracticeLogs(studentId, options);

    res.json({
      message: 'Practice logs retrieved successfully',
      data: practiceLogs
    });
  } catch (error: any) {
    console.error('Error getting practice logs:', error);
    res.status(500).json({ error: 'Failed to get practice logs' });
  }
});

// ===== SKILL ASSESSMENTS ENDPOINTS =====

// POST /api/progress/students/:id/skill-assessments - Create a skill assessment
router.post('/students/:id/skill-assessments', async (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    const { skillName, category, rating, notes, sessionId, assessedAt } = req.body;
    const coachId = req.user?.id;

    if (!coachId) {
      return res.status(401).json({ error: 'Coach ID not found in token' });
    }

    if (!skillName || !category || rating === undefined) {
      return res.status(400).json({ error: 'Skill name, category, and rating are required' });
    }

    if (!['technical', 'tactical', 'physical', 'mental'].includes(category)) {
      return res.status(400).json({ 
        error: 'Invalid category. Must be one of: technical, tactical, physical, mental' 
      });
    }

    if (rating < 1 || rating > 10) {
      return res.status(400).json({ error: 'Rating must be between 1 and 10' });
    }

    const createData: any = {
      skillName,
      category,
      rating: parseInt(rating),
      notes: notes || null,
      studentId,
      coachId,
      sessionId: sessionId || null
    };

    if (assessedAt) {
      createData.assessedAt = new Date(assessedAt);
    }

    const skillAssessment = await SkillAssessmentService.createSkillAssessment(createData);

    res.status(201).json({
      message: 'Skill assessment created successfully',
      data: skillAssessment
    });
  } catch (error: any) {
    console.error('Error creating skill assessment:', error);
    if (error.message === 'Rating must be between 1 and 10') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to create skill assessment' });
  }
});

// GET /api/progress/students/:id/skill-assessments - Get skill assessments for a student
router.get('/students/:id/skill-assessments', async (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    const { skillName, category, startDate, endDate, limit, offset } = req.query;

    const options: any = {};
    if (skillName) options.skillName = String(skillName);
    if (category) options.category = String(category);
    if (startDate) options.startDate = new Date(String(startDate));
    if (endDate) options.endDate = new Date(String(endDate));
    if (limit) options.limit = parseInt(String(limit));
    if (offset) options.offset = parseInt(String(offset));

    const skillAssessments = await SkillAssessmentService.getStudentSkillAssessments(studentId, options);

    res.json({
      message: 'Skill assessments retrieved successfully',
      data: skillAssessments
    });
  } catch (error: any) {
    console.error('Error getting skill assessments:', error);
    res.status(500).json({ error: 'Failed to get skill assessments' });
  }
});

// ===== ADDITIONAL ENDPOINTS =====

// GET /api/progress/students/:id/stats - Get comprehensive progress statistics
router.get('/students/:id/stats', async (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    const { startDate, endDate } = req.query;

    const parsedStartDate = startDate ? new Date(String(startDate)) : undefined;
    const parsedEndDate = endDate ? new Date(String(endDate)) : undefined;

    // Get stats from all services
    const [lessonNoteStats, goalStats, practiceLogStats, skillAssessmentStats] = await Promise.all([
      LessonNoteService.getLessonNoteStats(studentId),
      GoalService.getGoalStats(studentId),
      PracticeLogService.getPracticeLogStats(studentId, parsedStartDate, parsedEndDate),
      SkillAssessmentService.getSkillAssessmentStats(studentId)
    ]);

    res.json({
      message: 'Progress statistics retrieved successfully',
      data: {
        lessonNotes: lessonNoteStats,
        goals: goalStats,
        practiceLogs: practiceLogStats,
        skillAssessments: skillAssessmentStats
      }
    });
  } catch (error: any) {
    console.error('Error getting progress stats:', error);
    res.status(500).json({ error: 'Failed to get progress statistics' });
  }
});

// GET /api/progress/students/:id/latest-skills - Get latest skill assessments
router.get('/students/:id/latest-skills', async (req, res) => {
  try {
    const studentId = parseInt(req.params.id);

    const latestSkills = await SkillAssessmentService.getLatestSkillAssessments(studentId);

    res.json({
      message: 'Latest skill assessments retrieved successfully',
      data: latestSkills
    });
  } catch (error: any) {
    console.error('Error getting latest skills:', error);
    res.status(500).json({ error: 'Failed to get latest skill assessments' });
  }
});

// GET /api/progress/students/:id/skill-progress/:skillName - Get skill progress over time
router.get('/students/:id/skill-progress/:skillName', async (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    const skillName = req.params.skillName;
    const { startDate, endDate } = req.query;

    const parsedStartDate = startDate ? new Date(String(startDate)) : undefined;
    const parsedEndDate = endDate ? new Date(String(endDate)) : undefined;

    const skillProgress = await SkillAssessmentService.getSkillProgress(
      studentId,
      skillName,
      parsedStartDate,
      parsedEndDate
    );

    res.json({
      message: 'Skill progress retrieved successfully',
      data: skillProgress
    });
  } catch (error: any) {
    console.error('Error getting skill progress:', error);
    res.status(500).json({ error: 'Failed to get skill progress' });
  }
});

export default router;