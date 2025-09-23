import { PrismaClient, LessonNote } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateLessonNoteData {
  title: string;
  content: string;
  tags?: string[];
  studentId: number;
  coachId: number;
  sessionId?: number | null;
}

export interface UpdateLessonNoteData {
  title?: string;
  content?: string;
  tags?: string[];
}

export interface LessonNoteWithRelations extends LessonNote {
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

export class LessonNoteService {
  // Create a new lesson note
  static async createLessonNote(data: CreateLessonNoteData): Promise<LessonNoteWithRelations> {
    const createData: any = {
      title: data.title,
      content: data.content,
      tags: data.tags ? JSON.stringify(data.tags) : null,
      studentId: data.studentId,
      coachId: data.coachId
    };

    if (data.sessionId !== undefined) {
      createData.sessionId = data.sessionId;
    }

    return await prisma.lessonNote.create({
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

  // Get lesson notes for a student
  static async getStudentLessonNotes(
    studentId: number,
    options?: {
      limit?: number;
      offset?: number;
      startDate?: Date;
      endDate?: Date;
      tags?: string[];
    }
  ): Promise<LessonNoteWithRelations[]> {
    const { limit, offset, startDate, endDate, tags } = options || {};

    const where: any = { studentId };

    // Date filtering
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = startDate;
      if (endDate) where.createdAt.lte = endDate;
    }

    // Tag filtering (if tags are provided, find notes that contain any of those tags)
    if (tags && tags.length > 0) {
      where.OR = tags.map(tag => ({
        tags: {
          contains: tag
        }
      }));
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
        createdAt: 'desc'
      }
    };

    if (limit !== undefined) queryOptions.take = limit;
    if (offset !== undefined) queryOptions.skip = offset;

    const lessonNotes = await prisma.lessonNote.findMany(queryOptions);

    // Parse tags JSON for each note
    return lessonNotes.map(note => ({
      ...note,
      tags: note.tags ? JSON.parse(note.tags) : []
    })) as LessonNoteWithRelations[];
  }

  // Get a specific lesson note by ID
  static async getLessonNoteById(id: number): Promise<LessonNoteWithRelations | null> {
    const lessonNote = await prisma.lessonNote.findUnique({
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

    if (!lessonNote) return null;

    return {
      ...lessonNote,
      tags: lessonNote.tags ? JSON.parse(lessonNote.tags) : []
    } as LessonNoteWithRelations;
  }

  // Update a lesson note
  static async updateLessonNote(
    id: number,
    data: UpdateLessonNoteData
  ): Promise<LessonNoteWithRelations | null> {
    try {
      const updateData: any = {};
      
      if (data.title !== undefined) updateData.title = data.title;
      if (data.content !== undefined) updateData.content = data.content;
      if (data.tags !== undefined) updateData.tags = JSON.stringify(data.tags);

      const lessonNote = await prisma.lessonNote.update({
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

      return {
        ...lessonNote,
        tags: lessonNote.tags ? JSON.parse(lessonNote.tags) : []
      } as LessonNoteWithRelations;
    } catch (error) {
      return null;
    }
  }

  // Delete a lesson note
  static async deleteLessonNote(id: number): Promise<boolean> {
    try {
      await prisma.lessonNote.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  // Get lesson notes by coach
  static async getCoachLessonNotes(
    coachId: number,
    options?: {
      limit?: number;
      offset?: number;
      startDate?: Date;
      endDate?: Date;
      studentId?: number;
    }
  ): Promise<LessonNoteWithRelations[]> {
    const { limit, offset, startDate, endDate, studentId } = options || {};

    const where: any = { coachId };

    if (studentId) {
      where.studentId = studentId;
    }

    // Date filtering
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = startDate;
      if (endDate) where.createdAt.lte = endDate;
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
        createdAt: 'desc'
      }
    };

    if (limit !== undefined) queryOptions.take = limit;
    if (offset !== undefined) queryOptions.skip = offset;

    const lessonNotes = await prisma.lessonNote.findMany(queryOptions);

    // Parse tags JSON for each note
    return lessonNotes.map(note => ({
      ...note,
      tags: note.tags ? JSON.parse(note.tags) : []
    })) as LessonNoteWithRelations[];
  }

  // Search lesson notes by content or title
  static async searchLessonNotes(
    query: string,
    options?: {
      studentId?: number;
      coachId?: number;
      limit?: number;
      offset?: number;
    }
  ): Promise<LessonNoteWithRelations[]> {
    const { studentId, coachId, limit, offset } = options || {};

    const where: any = {
      OR: [
        { title: { contains: query } },
        { content: { contains: query } }
      ]
    };

    if (studentId) where.studentId = studentId;
    if (coachId) where.coachId = coachId;

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
        createdAt: 'desc'
      }
    };

    if (limit !== undefined) queryOptions.take = limit;
    if (offset !== undefined) queryOptions.skip = offset;

    const lessonNotes = await prisma.lessonNote.findMany(queryOptions);

    // Parse tags JSON for each note
    return lessonNotes.map(note => ({
      ...note,
      tags: note.tags ? JSON.parse(note.tags) : []
    })) as LessonNoteWithRelations[];
  }

  // Get lesson note statistics
  static async getLessonNoteStats(studentId?: number, coachId?: number) {
    const where: any = {};
    if (studentId) where.studentId = studentId;
    if (coachId) where.coachId = coachId;

    const totalNotes = await prisma.lessonNote.count({ where });
    
    const notesThisMonth = await prisma.lessonNote.count({
      where: {
        ...where,
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      }
    });

    const notesThisWeek = await prisma.lessonNote.count({
      where: {
        ...where,
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }
      }
    });

    return {
      totalNotes,
      notesThisMonth,
      notesThisWeek
    };
  }
}