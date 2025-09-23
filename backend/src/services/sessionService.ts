import { PrismaClient, Session } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateSessionData {
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  studentId: number;
  coachId: number;
  status?: string;
}

export interface UpdateSessionData {
  title?: string;
  description?: string;
  startTime?: Date;
  endTime?: Date;
  status?: string;
}

export interface SessionConflict {
  hasConflict: boolean;
  conflictingSession?: Session & {
    student: { firstName: string; lastName: string };
    coach: { name: string | null };
  };
  message?: string;
}

/**
 * Check if a new session conflicts with existing sessions for the same student or coach
 */
export async function checkSessionConflict(
  startTime: Date,
  endTime: Date,
  studentId: number,
  coachId: number,
  excludeSessionId?: number
): Promise<SessionConflict> {
  // Build where clause for student conflict check
  const studentWhereClause: any = {
    studentId,
    status: { not: 'cancelled' }, // Don't consider cancelled sessions
    OR: [
      // New session starts during existing session
      {
        AND: [
          { startTime: { lte: startTime } },
          { endTime: { gt: startTime } }
        ]
      },
      // New session ends during existing session
      {
        AND: [
          { startTime: { lt: endTime } },
          { endTime: { gte: endTime } }
        ]
      },
      // New session completely contains existing session
      {
        AND: [
          { startTime: { gte: startTime } },
          { endTime: { lte: endTime } }
        ]
      },
      // Existing session completely contains new session
      {
        AND: [
          { startTime: { lte: startTime } },
          { endTime: { gte: endTime } }
        ]
      }
    ]
  };

  if (excludeSessionId) {
    studentWhereClause.id = { not: excludeSessionId };
  }

  // Check for overlapping sessions for the student
  const studentConflict = await prisma.session.findFirst({
    where: studentWhereClause,
    include: {
      student: true,
      coach: true
    }
  });

  if (studentConflict) {
    return {
      hasConflict: true,
      conflictingSession: studentConflict,
      message: `Student ${studentConflict.student.firstName} ${studentConflict.student.lastName} already has a session scheduled from ${studentConflict.startTime.toISOString()} to ${studentConflict.endTime.toISOString()}`
    };
  }

  // Build where clause for coach conflict check
  const coachWhereClause: any = {
    coachId,
    status: { not: 'cancelled' }, // Don't consider cancelled sessions
    OR: [
      // New session starts during existing session
      {
        AND: [
          { startTime: { lte: startTime } },
          { endTime: { gt: startTime } }
        ]
      },
      // New session ends during existing session
      {
        AND: [
          { startTime: { lt: endTime } },
          { endTime: { gte: endTime } }
        ]
      },
      // New session completely contains existing session
      {
        AND: [
          { startTime: { gte: startTime } },
          { endTime: { lte: endTime } }
        ]
      },
      // Existing session completely contains new session
      {
        AND: [
          { startTime: { lte: startTime } },
          { endTime: { gte: endTime } }
        ]
      }
    ]
  };

  if (excludeSessionId) {
    coachWhereClause.id = { not: excludeSessionId };
  }

  // Check for overlapping sessions for the coach
  const coachConflict = await prisma.session.findFirst({
    where: coachWhereClause,
    include: {
      student: true,
      coach: true
    }
  });

  if (coachConflict) {
    return {
      hasConflict: true,
      conflictingSession: coachConflict,
      message: `Coach ${coachConflict.coach.name || 'Unknown'} already has a session scheduled with ${coachConflict.student.firstName} ${coachConflict.student.lastName} from ${coachConflict.startTime.toISOString()} to ${coachConflict.endTime.toISOString()}`
    };
  }

  return { hasConflict: false };
}

/**
 * Create a new session
 */
export async function createSession(data: CreateSessionData): Promise<Session> {
  // Check for conflicts
  const conflict = await checkSessionConflict(
    data.startTime,
    data.endTime,
    data.studentId,
    data.coachId
  );

  if (conflict.hasConflict) {
    throw new Error(conflict.message || 'Session conflict detected');
  }

  return await prisma.session.create({
    data: {
      title: data.title,
      description: data.description || null,
      startTime: data.startTime,
      endTime: data.endTime,
      studentId: data.studentId,
      coachId: data.coachId,
      status: data.status || 'scheduled'
    },
    include: {
      student: true,
      coach: true
    }
  });
}

/**
 * Get sessions with optional date range filtering
 */
export async function getSessions(
  startDate?: Date,
  endDate?: Date,
  studentId?: number,
  coachId?: number
): Promise<Session[]> {
  const where: any = {};

  if (startDate || endDate) {
    where.AND = [];
    if (startDate) {
      where.AND.push({ startTime: { gte: startDate } });
    }
    if (endDate) {
      where.AND.push({ endTime: { lte: endDate } });
    }
  }

  if (studentId) {
    where.studentId = studentId;
  }

  if (coachId) {
    where.coachId = coachId;
  }

  return await prisma.session.findMany({
    where,
    include: {
      student: true,
      coach: true
    },
    orderBy: {
      startTime: 'asc'
    }
  });
}

/**
 * Get a session by ID
 */
export async function getSessionById(id: number): Promise<Session | null> {
  return await prisma.session.findUnique({
    where: { id },
    include: {
      student: true,
      coach: true
    }
  });
}

/**
 * Update a session
 */
export async function updateSession(id: number, data: UpdateSessionData): Promise<Session> {
  const existingSession = await getSessionById(id);
  if (!existingSession) {
    throw new Error('Session not found');
  }

  // If updating time, check for conflicts
  if (data.startTime || data.endTime) {
    const startTime = data.startTime || existingSession.startTime;
    const endTime = data.endTime || existingSession.endTime;

    const conflict = await checkSessionConflict(
      startTime,
      endTime,
      existingSession.studentId,
      existingSession.coachId,
      id // Exclude current session from conflict check
    );

    if (conflict.hasConflict) {
      throw new Error(conflict.message || 'Session conflict detected');
    }
  }

  const updateData: any = {};
  if (data.title !== undefined) updateData.title = data.title;
  if (data.description !== undefined) updateData.description = data.description || null;
  if (data.startTime !== undefined) updateData.startTime = data.startTime;
  if (data.endTime !== undefined) updateData.endTime = data.endTime;
  if (data.status !== undefined) updateData.status = data.status;

  return await prisma.session.update({
    where: { id },
    data: updateData,
    include: {
      student: true,
      coach: true
    }
  });
}

/**
 * Cancel a session (set status to cancelled)
 */
export async function cancelSession(id: number): Promise<Session> {
  return await updateSession(id, { status: 'cancelled' });
}

/**
 * Delete a session permanently
 */
export async function deleteSession(id: number): Promise<void> {
  await prisma.session.delete({
    where: { id }
  });
}

/**
 * Get availability - returns booked time slots
 */
export async function getBookedSlots(
  startDate: Date,
  endDate: Date,
  coachId?: number
): Promise<{ startTime: Date; endTime: Date; sessionId: number; studentName: string }[]> {
  const where: any = {
    startTime: { gte: startDate },
    endTime: { lte: endDate },
    status: { not: 'cancelled' }
  };

  if (coachId) {
    where.coachId = coachId;
  }

  const sessions = await prisma.session.findMany({
    where,
    select: {
      id: true,
      startTime: true,
      endTime: true,
      student: {
        select: {
          firstName: true,
          lastName: true
        }
      }
    },
    orderBy: {
      startTime: 'asc'
    }
  });

  return sessions.map(session => ({
    startTime: session.startTime,
    endTime: session.endTime,
    sessionId: session.id,
    studentName: `${session.student.firstName} ${session.student.lastName}`
  }));
}