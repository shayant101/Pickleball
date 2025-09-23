import { PrismaClient, Guardian } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateGuardianData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  studentId: number;
}

export interface UpdateGuardianData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export class GuardianService {
  // Get all guardians for a specific student
  static async getGuardiansByStudentId(studentId: number): Promise<Guardian[]> {
    return await prisma.guardian.findMany({
      where: { studentId },
      orderBy: [
        { lastName: 'asc' },
        { firstName: 'asc' }
      ]
    });
  }

  // Get a single guardian by ID
  static async getGuardianById(id: number): Promise<Guardian | null> {
    return await prisma.guardian.findUnique({
      where: { id },
      include: {
        student: true
      }
    });
  }

  // Create a new guardian for a student
  static async createGuardian(data: CreateGuardianData): Promise<Guardian> {
    return await prisma.guardian.create({
      data
    });
  }

  // Update a guardian
  static async updateGuardian(id: number, data: UpdateGuardianData): Promise<Guardian | null> {
    try {
      return await prisma.guardian.update({
        where: { id },
        data
      });
    } catch (error) {
      return null;
    }
  }

  // Delete a guardian
  static async deleteGuardian(id: number): Promise<boolean> {
    try {
      await prisma.guardian.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  // Check if a guardian exists for a student
  static async guardianExists(studentId: number, email: string): Promise<boolean> {
    const guardian = await prisma.guardian.findFirst({
      where: {
        studentId,
        email
      }
    });
    return guardian !== null;
  }

  // Get guardian count for a student
  static async getGuardianCount(studentId: number): Promise<number> {
    return await prisma.guardian.count({
      where: { studentId }
    });
  }

  // Validate guardian belongs to student
  static async validateGuardianOwnership(guardianId: number, studentId: number): Promise<boolean> {
    const guardian = await prisma.guardian.findFirst({
      where: {
        id: guardianId,
        studentId
      }
    });
    return guardian !== null;
  }
}