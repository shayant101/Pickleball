import { PrismaClient, SkillAssessment } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateSkillAssessmentData {
  skillName: string;
  category: 'technical' | 'tactical' | 'physical' | 'mental';
  rating: number; // 1-10 rating scale
  notes?: string | null;
  studentId: number;
  coachId: number;
  sessionId?: number | null;
  assessedAt?: Date;
}

export interface UpdateSkillAssessmentData {
  skillName?: string;
  category?: 'technical' | 'tactical' | 'physical' | 'mental';
  rating?: number;
  notes?: string | null;
  assessedAt?: Date;
}

export interface SkillAssessmentWithRelations extends SkillAssessment {
  student: {
    firstName: string;
    lastName: string;
  };
  coach: {
    name: string | null;
  };
  session?: {
    title: string;
    startTime: Date;
  } | null;
}

export class SkillAssessmentService {
  // Create a new skill assessment
  static async createSkillAssessment(data: CreateSkillAssessmentData): Promise<SkillAssessmentWithRelations> {
    // Validate rating
    if (data.rating < 1 || data.rating > 10) {
      throw new Error('Rating must be between 1 and 10');
    }

    const createData: any = {
      skillName: data.skillName,
      category: data.category,
      rating: data.rating,
      studentId: data.studentId,
      coachId: data.coachId,
      assessedAt: data.assessedAt || new Date()
    };

    if (data.notes !== undefined) createData.notes = data.notes;
    if (data.sessionId !== undefined) createData.sessionId = data.sessionId;

    return await prisma.skillAssessment.create({
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
        },
        session: {
          select: {
            title: true,
            startTime: true
          }
        }
      }
    });
  }

  // Get skill assessments for a student
  static async getStudentSkillAssessments(
    studentId: number,
    options?: {
      skillName?: string;
      category?: 'technical' | 'tactical' | 'physical' | 'mental';
      startDate?: Date;
      endDate?: Date;
      limit?: number;
      offset?: number;
    }
  ): Promise<SkillAssessmentWithRelations[]> {
    const { skillName, category, startDate, endDate, limit, offset } = options || {};

    const where: any = { studentId };

    if (skillName) where.skillName = skillName;
    if (category) where.category = category;

    // Date filtering
    if (startDate || endDate) {
      where.assessedAt = {};
      if (startDate) where.assessedAt.gte = startDate;
      if (endDate) where.assessedAt.lte = endDate;
    }

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
        },
        session: {
          select: {
            title: true,
            startTime: true
          }
        }
      },
      orderBy: {
        assessedAt: 'desc'
      }
    };

    if (limit !== undefined) queryOptions.take = limit;
    if (offset !== undefined) queryOptions.skip = offset;

    return await prisma.skillAssessment.findMany(queryOptions) as SkillAssessmentWithRelations[];
  }

  // Get a specific skill assessment by ID
  static async getSkillAssessmentById(id: number): Promise<SkillAssessmentWithRelations | null> {
    return await prisma.skillAssessment.findUnique({
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
        },
        session: {
          select: {
            title: true,
            startTime: true
          }
        }
      }
    });
  }

  // Update a skill assessment
  static async updateSkillAssessment(
    id: number,
    data: UpdateSkillAssessmentData
  ): Promise<SkillAssessmentWithRelations | null> {
    try {
      // Validate rating if provided
      if (data.rating !== undefined && (data.rating < 1 || data.rating > 10)) {
        throw new Error('Rating must be between 1 and 10');
      }

      const updateData: any = {};

      if (data.skillName !== undefined) updateData.skillName = data.skillName;
      if (data.category !== undefined) updateData.category = data.category;
      if (data.rating !== undefined) updateData.rating = data.rating;
      if (data.notes !== undefined) updateData.notes = data.notes;
      if (data.assessedAt !== undefined) updateData.assessedAt = data.assessedAt;

      return await prisma.skillAssessment.update({
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
          },
          session: {
            select: {
              title: true,
              startTime: true
            }
          }
        }
      });
    } catch (error) {
      return null;
    }
  }

  // Delete a skill assessment
  static async deleteSkillAssessment(id: number): Promise<boolean> {
    try {
      await prisma.skillAssessment.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  // Get skill assessments by coach
  static async getCoachSkillAssessments(
    coachId: number,
    options?: {
      studentId?: number;
      skillName?: string;
      category?: 'technical' | 'tactical' | 'physical' | 'mental';
      startDate?: Date;
      endDate?: Date;
      limit?: number;
      offset?: number;
    }
  ): Promise<SkillAssessmentWithRelations[]> {
    const { studentId, skillName, category, startDate, endDate, limit, offset } = options || {};

    const where: any = { coachId };

    if (studentId) where.studentId = studentId;
    if (skillName) where.skillName = skillName;
    if (category) where.category = category;

    // Date filtering
    if (startDate || endDate) {
      where.assessedAt = {};
      if (startDate) where.assessedAt.gte = startDate;
      if (endDate) where.assessedAt.lte = endDate;
    }

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
        },
        session: {
          select: {
            title: true,
            startTime: true
          }
        }
      },
      orderBy: {
        assessedAt: 'desc'
      }
    };

    if (limit !== undefined) queryOptions.take = limit;
    if (offset !== undefined) queryOptions.skip = offset;

    return await prisma.skillAssessment.findMany(queryOptions) as SkillAssessmentWithRelations[];
  }

  // Get skill progress over time for a student
  static async getSkillProgress(
    studentId: number,
    skillName: string,
    startDate?: Date,
    endDate?: Date
  ): Promise<SkillAssessmentWithRelations[]> {
    const where: any = {
      studentId,
      skillName
    };

    if (startDate || endDate) {
      where.assessedAt = {};
      if (startDate) where.assessedAt.gte = startDate;
      if (endDate) where.assessedAt.lte = endDate;
    }

    return await prisma.skillAssessment.findMany({
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
        },
        session: {
          select: {
            title: true,
            startTime: true
          }
        }
      },
      orderBy: {
        assessedAt: 'asc'
      }
    }) as SkillAssessmentWithRelations[];
  }

  // Get skill assessment statistics
  static async getSkillAssessmentStats(studentId?: number, coachId?: number) {
    const where: any = {};
    if (studentId) where.studentId = studentId;
    if (coachId) where.coachId = coachId;

    const totalAssessments = await prisma.skillAssessment.count({ where });

    // Get assessments by category
    const assessmentsByCategory = await prisma.skillAssessment.groupBy({
      by: ['category'],
      where,
      _count: {
        id: true
      },
      _avg: {
        rating: true
      }
    });

    // Get assessments by skill
    const assessmentsBySkill = await prisma.skillAssessment.groupBy({
      by: ['skillName'],
      where,
      _count: {
        id: true
      },
      _avg: {
        rating: true
      },
      orderBy: {
        _count: {
          id: 'desc'
        }
      },
      take: 10 // Top 10 most assessed skills
    });

    // Calculate overall average rating
    const overallStats = await prisma.skillAssessment.aggregate({
      where,
      _avg: {
        rating: true
      },
      _min: {
        rating: true
      },
      _max: {
        rating: true
      }
    });

    // Get recent assessments trend (last 30 days vs previous 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);

    const recentAssessments = await prisma.skillAssessment.count({
      where: {
        ...where,
        assessedAt: { gte: thirtyDaysAgo }
      }
    });

    const previousAssessments = await prisma.skillAssessment.count({
      where: {
        ...where,
        assessedAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo }
      }
    });

    let trend: 'increasing' | 'decreasing' | 'stable' = 'stable';
    if (recentAssessments > previousAssessments) {
      trend = 'increasing';
    } else if (recentAssessments < previousAssessments) {
      trend = 'decreasing';
    }

    return {
      totalAssessments,
      averageRating: overallStats._avg.rating ? Math.round(overallStats._avg.rating * 10) / 10 : null,
      minRating: overallStats._min.rating,
      maxRating: overallStats._max.rating,
      assessmentsByCategory: assessmentsByCategory.reduce((acc, item) => {
        acc[item.category] = {
          count: item._count.id,
          averageRating: item._avg.rating ? Math.round(item._avg.rating * 10) / 10 : null
        };
        return acc;
      }, {} as Record<string, { count: number; averageRating: number | null }>),
      topSkills: assessmentsBySkill.map(item => ({
        skillName: item.skillName,
        count: item._count.id,
        averageRating: item._avg.rating ? Math.round(item._avg.rating * 10) / 10 : null
      })),
      recentTrend: trend,
      recentAssessmentsCount: recentAssessments,
      previousAssessmentsCount: previousAssessments
    };
  }

  // Get latest assessment for each skill for a student
  static async getLatestSkillAssessments(studentId: number): Promise<SkillAssessmentWithRelations[]> {
    // Get all unique skills for the student
    const uniqueSkills = await prisma.skillAssessment.findMany({
      where: { studentId },
      select: { skillName: true },
      distinct: ['skillName']
    });

    const latestAssessments: SkillAssessmentWithRelations[] = [];

    // For each skill, get the latest assessment
    for (const skill of uniqueSkills) {
      const latestAssessment = await prisma.skillAssessment.findFirst({
        where: {
          studentId,
          skillName: skill.skillName
        },
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
          },
          session: {
            select: {
              title: true,
              startTime: true
            }
          }
        },
        orderBy: {
          assessedAt: 'desc'
        }
      });

      if (latestAssessment) {
        latestAssessments.push(latestAssessment as SkillAssessmentWithRelations);
      }
    }

    return latestAssessments.sort((a, b) => a.skillName.localeCompare(b.skillName));
  }

  // Get skill improvement suggestions based on low ratings
  static async getSkillImprovementSuggestions(
    studentId: number,
    threshold: number = 5
  ): Promise<{ skillName: string; category: string; latestRating: number; assessmentCount: number }[]> {
    const latestAssessments = await this.getLatestSkillAssessments(studentId);
    
    const lowRatedSkills = latestAssessments
      .filter(assessment => assessment.rating <= threshold)
      .map(assessment => ({
        skillName: assessment.skillName,
        category: assessment.category,
        latestRating: assessment.rating,
        assessmentCount: 1 // This would need a separate query to get accurate count
      }))
      .sort((a, b) => a.latestRating - b.latestRating);

    return lowRatedSkills;
  }
}