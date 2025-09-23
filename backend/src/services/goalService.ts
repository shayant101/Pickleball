import { PrismaClient, StudentGoal } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateGoalData {
  title: string;
  description?: string | null;
  category: 'technique' | 'strategy' | 'fitness' | 'mental' | 'other';
  priority?: 'low' | 'medium' | 'high';
  targetDate?: Date | null;
  studentId: number;
  coachId: number;
  notes?: string | null;
}

export interface UpdateGoalData {
  title?: string;
  description?: string | null;
  category?: 'technique' | 'strategy' | 'fitness' | 'mental' | 'other';
  priority?: 'low' | 'medium' | 'high';
  status?: 'active' | 'completed' | 'paused' | 'cancelled';
  targetDate?: Date | null;
  progress?: number;
  notes?: string | null;
}

export interface GoalWithRelations extends StudentGoal {
  student: {
    firstName: string;
    lastName: string;
  };
  coach: {
    name: string | null;
  };
}

export class GoalService {
  // Create a new goal
  static async createGoal(data: CreateGoalData): Promise<GoalWithRelations> {
    const createData: any = {
      title: data.title,
      category: data.category,
      priority: data.priority || 'medium',
      studentId: data.studentId,
      coachId: data.coachId
    };

    if (data.description !== undefined) createData.description = data.description;
    if (data.targetDate !== undefined) createData.targetDate = data.targetDate;
    if (data.notes !== undefined) createData.notes = data.notes;

    return await prisma.studentGoal.create({
      data: createData,
      include: {
        student: {
          select: {
            firstName: true,
            lastName: true
          }
        },
        coach: {
          select: {
            name: true
          }
        }
      }
    });
  }

  // Get goals for a student
  static async getStudentGoals(
    studentId: number,
    options?: {
      status?: 'active' | 'completed' | 'paused' | 'cancelled';
      category?: 'technique' | 'strategy' | 'fitness' | 'mental' | 'other';
      priority?: 'low' | 'medium' | 'high';
      limit?: number;
      offset?: number;
    }
  ): Promise<GoalWithRelations[]> {
    const { status, category, priority, limit, offset } = options || {};

    const where: any = { studentId };

    if (status) where.status = status;
    if (category) where.category = category;
    if (priority) where.priority = priority;

    const queryOptions: any = {
      where,
      include: {
        student: {
          select: {
            firstName: true,
            lastName: true
          }
        },
        coach: {
          select: {
            name: true
          }
        }
      },
      orderBy: [
        { priority: 'desc' },
        { createdAt: 'desc' }
      ]
    };

    if (limit !== undefined) queryOptions.take = limit;
    if (offset !== undefined) queryOptions.skip = offset;

    return await prisma.studentGoal.findMany(queryOptions) as GoalWithRelations[];
  }

  // Get a specific goal by ID
  static async getGoalById(id: number): Promise<GoalWithRelations | null> {
    return await prisma.studentGoal.findUnique({
      where: { id },
      include: {
        student: {
          select: {
            firstName: true,
            lastName: true
          }
        },
        coach: {
          select: {
            name: true
          }
        }
      }
    });
  }

  // Update a goal
  static async updateGoal(id: number, data: UpdateGoalData): Promise<GoalWithRelations | null> {
    try {
      const updateData: any = {};

      if (data.title !== undefined) updateData.title = data.title;
      if (data.description !== undefined) updateData.description = data.description;
      if (data.category !== undefined) updateData.category = data.category;
      if (data.priority !== undefined) updateData.priority = data.priority;
      if (data.status !== undefined) {
        updateData.status = data.status;
        // If marking as completed, set completedAt timestamp
        if (data.status === 'completed') {
          updateData.completedAt = new Date();
          updateData.progress = 100;
        } else if (data.status !== 'completed') {
          updateData.completedAt = null;
        }
      }
      if (data.targetDate !== undefined) updateData.targetDate = data.targetDate;
      if (data.progress !== undefined) {
        updateData.progress = Math.max(0, Math.min(100, data.progress)); // Ensure 0-100 range
        // If progress reaches 100, mark as completed
        if (updateData.progress === 100 && data.status !== 'completed') {
          updateData.status = 'completed';
          updateData.completedAt = new Date();
        }
      }
      if (data.notes !== undefined) updateData.notes = data.notes;

      return await prisma.studentGoal.update({
        where: { id },
        data: updateData,
        include: {
          student: {
            select: {
              firstName: true,
              lastName: true
            }
          },
          coach: {
            select: {
              name: true
            }
          }
        }
      });
    } catch (error) {
      return null;
    }
  }

  // Delete a goal
  static async deleteGoal(id: number): Promise<boolean> {
    try {
      await prisma.studentGoal.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  // Get goals by coach
  static async getCoachGoals(
    coachId: number,
    options?: {
      studentId?: number;
      status?: 'active' | 'completed' | 'paused' | 'cancelled';
      category?: 'technique' | 'strategy' | 'fitness' | 'mental' | 'other';
      priority?: 'low' | 'medium' | 'high';
      limit?: number;
      offset?: number;
    }
  ): Promise<GoalWithRelations[]> {
    const { studentId, status, category, priority, limit, offset } = options || {};

    const where: any = { coachId };

    if (studentId) where.studentId = studentId;
    if (status) where.status = status;
    if (category) where.category = category;
    if (priority) where.priority = priority;

    const queryOptions: any = {
      where,
      include: {
        student: {
          select: {
            firstName: true,
            lastName: true
          }
        },
        coach: {
          select: {
            name: true
          }
        }
      },
      orderBy: [
        { priority: 'desc' },
        { createdAt: 'desc' }
      ]
    };

    if (limit !== undefined) queryOptions.take = limit;
    if (offset !== undefined) queryOptions.skip = offset;

    return await prisma.studentGoal.findMany(queryOptions) as GoalWithRelations[];
  }

  // Get goal statistics
  static async getGoalStats(studentId?: number, coachId?: number) {
    const where: any = {};
    if (studentId) where.studentId = studentId;
    if (coachId) where.coachId = coachId;

    const totalGoals = await prisma.studentGoal.count({ where });
    
    const activeGoals = await prisma.studentGoal.count({
      where: { ...where, status: 'active' }
    });

    const completedGoals = await prisma.studentGoal.count({
      where: { ...where, status: 'completed' }
    });

    const pausedGoals = await prisma.studentGoal.count({
      where: { ...where, status: 'paused' }
    });

    const cancelledGoals = await prisma.studentGoal.count({
      where: { ...where, status: 'cancelled' }
    });

    // Get goals by category
    const goalsByCategory = await prisma.studentGoal.groupBy({
      by: ['category'],
      where,
      _count: {
        id: true
      }
    });

    // Get goals by priority
    const goalsByPriority = await prisma.studentGoal.groupBy({
      by: ['priority'],
      where,
      _count: {
        id: true
      }
    });

    // Calculate average progress for active goals
    const activeGoalsWithProgress = await prisma.studentGoal.findMany({
      where: { ...where, status: 'active' },
      select: { progress: true }
    });

    const averageProgress = activeGoalsWithProgress.length > 0
      ? Math.round(activeGoalsWithProgress.reduce((sum, goal) => sum + goal.progress, 0) / activeGoalsWithProgress.length)
      : 0;

    // Get overdue goals (active goals past target date)
    const overdueGoals = await prisma.studentGoal.count({
      where: {
        ...where,
        status: 'active',
        targetDate: {
          lt: new Date()
        }
      }
    });

    const completionRate = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

    return {
      totalGoals,
      activeGoals,
      completedGoals,
      pausedGoals,
      cancelledGoals,
      overdueGoals,
      averageProgress,
      completionRate,
      goalsByCategory: goalsByCategory.reduce((acc, item) => {
        acc[item.category] = item._count.id;
        return acc;
      }, {} as Record<string, number>),
      goalsByPriority: goalsByPriority.reduce((acc, item) => {
        acc[item.priority] = item._count.id;
        return acc;
      }, {} as Record<string, number>)
    };
  }

  // Get goals due soon (within next 7 days)
  static async getGoalsDueSoon(
    studentId?: number,
    coachId?: number,
    days: number = 7
  ): Promise<GoalWithRelations[]> {
    const where: any = {
      status: 'active',
      targetDate: {
        gte: new Date(),
        lte: new Date(Date.now() + days * 24 * 60 * 60 * 1000)
      }
    };

    if (studentId) where.studentId = studentId;
    if (coachId) where.coachId = coachId;

    return await prisma.studentGoal.findMany({
      where,
      include: {
        student: {
          select: {
            firstName: true,
            lastName: true
          }
        },
        coach: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        targetDate: 'asc'
      }
    });
  }

  // Update goal progress
  static async updateGoalProgress(id: number, progress: number): Promise<GoalWithRelations | null> {
    return this.updateGoal(id, { progress });
  }

  // Mark goal as completed
  static async completeGoal(id: number): Promise<GoalWithRelations | null> {
    return this.updateGoal(id, { status: 'completed', progress: 100 });
  }
}