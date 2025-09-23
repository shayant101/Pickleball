import { PrismaClient, Student, Guardian } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateStudentData {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  playStyle: string;
  level: string;
  status?: string;
  address?: string;
  notes?: string;
  goals?: string[];
  avatar?: string;
  guardians?: CreateGuardianData[];
}

export interface CreateGuardianData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface UpdateStudentData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  playStyle?: string;
  level?: string;
  status?: string;
  address?: string;
  notes?: string;
  goals?: string[];
  avatar?: string;
  lastSession?: Date;
  nextSession?: Date;
  totalSessions?: number;
}

export interface StudentWithGuardians extends Student {
  guardians: Guardian[];
}

export class StudentService {
  // Get all students with optional filtering and searching
  static async getAllStudents(options?: {
    search?: string;
    status?: string;
    level?: string;
    includeGuardians?: boolean;
  }): Promise<StudentWithGuardians[]> {
    const { search, status, level, includeGuardians = true } = options || {};

    const where: any = {};

    // Add search filter (name or email)
    if (search) {
      where.OR = [
        { firstName: { contains: search } },
        { lastName: { contains: search } },
        { email: { contains: search } }
      ];
    }

    // Add status filter
    if (status) {
      where.status = status;
    }

    // Add level filter
    if (level) {
      where.level = level;
    }

    const students = await prisma.student.findMany({
      where,
      include: {
        guardians: includeGuardians
      },
      orderBy: [
        { lastName: 'asc' },
        { firstName: 'asc' }
      ]
    });

    // Parse goals JSON for each student
    return students.map(student => ({
      ...student,
      goals: student.goals ? JSON.parse(student.goals) : []
    })) as StudentWithGuardians[];
  }

  // Get a single student by ID
  static async getStudentById(id: number): Promise<StudentWithGuardians | null> {
    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        guardians: true
      }
    });

    if (!student) return null;

    return {
      ...student,
      goals: student.goals ? JSON.parse(student.goals) : []
    } as StudentWithGuardians;
  }

  // Create a new student
  static async createStudent(data: CreateStudentData): Promise<StudentWithGuardians> {
    const { guardians, goals, ...studentData } = data;

    const createData: any = {
      ...studentData,
      goals: goals ? JSON.stringify(goals) : JSON.stringify([])
    };

    if (guardians && guardians.length > 0) {
      createData.guardians = {
        create: guardians
      };
    }

    const student = await prisma.student.create({
      data: createData,
      include: {
        guardians: true
      }
    });

    return {
      ...student,
      goals: student.goals ? JSON.parse(student.goals) : []
    } as StudentWithGuardians;
  }

  // Update a student
  static async updateStudent(id: number, data: UpdateStudentData): Promise<StudentWithGuardians | null> {
    const { goals, ...updateData } = data;

    try {
      const updateDataWithGoals: any = { ...updateData };
      if (goals !== undefined) {
        updateDataWithGoals.goals = JSON.stringify(goals);
      }

      const student = await prisma.student.update({
        where: { id },
        data: updateDataWithGoals,
        include: {
          guardians: true
        }
      });

      return {
        ...student,
        goals: student.goals ? JSON.parse(student.goals) : []
      } as StudentWithGuardians;
    } catch (error) {
      return null;
    }
  }

  // Delete a student (soft delete by setting status to inactive)
  static async deleteStudent(id: number, hardDelete: boolean = false): Promise<boolean> {
    try {
      if (hardDelete) {
        await prisma.student.delete({
          where: { id }
        });
      } else {
        await prisma.student.update({
          where: { id },
          data: { status: 'Inactive' }
        });
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  // Get student statistics
  static async getStudentStats() {
    const totalStudents = await prisma.student.count();
    const activeStudents = await prisma.student.count({
      where: { status: 'Active' }
    });

    return {
      totalStudents,
      activeStudents,
      inactiveStudents: totalStudents - activeStudents
    };
  }

  // Search students by name or email
  static async searchStudents(query: string): Promise<StudentWithGuardians[]> {
    return this.getAllStudents({ search: query });
  }

  // Get students by status
  static async getStudentsByStatus(status: string): Promise<StudentWithGuardians[]> {
    return this.getAllStudents({ status });
  }

  // Get students by level
  static async getStudentsByLevel(level: string): Promise<StudentWithGuardians[]> {
    return this.getAllStudents({ level });
  }

  // Update student session count
  static async incrementSessionCount(id: number): Promise<StudentWithGuardians | null> {
    try {
      const student = await prisma.student.update({
        where: { id },
        data: {
          totalSessions: {
            increment: 1
          },
          lastSession: new Date()
        },
        include: {
          guardians: true
        }
      });

      return {
        ...student,
        goals: student.goals ? JSON.parse(student.goals) : []
      } as StudentWithGuardians;
    } catch (error) {
      return null;
    }
  }
}