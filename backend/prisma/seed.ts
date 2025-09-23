import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/utils/password';

const prisma = new PrismaClient();

// Mock data from frontend
const mockStudents = [
  {
    firstName: 'Emma',
    lastName: 'Johnson',
    email: 'emma.johnson@email.com',
    phone: '(555) 123-4567',
    playStyle: 'Singles Play',
    level: 'Intermediate',
    status: 'Active',
    joinDate: new Date('2024-01-15'),
    lastSession: new Date('2024-01-20'),
    nextSession: new Date('2024-01-25T14:00:00'),
    totalSessions: 24,
    address: '123 Main St, Anytown, ST 12345',
    notes: 'Very dedicated player. Working on backhand consistency and net play.',
    goals: ['Improve backhand accuracy', 'Master third shot drop', 'Develop net game strategy'],
    guardians: [
      {
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@email.com',
        phone: '(555) 123-4567'
      }
    ]
  },
  {
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@email.com',
    phone: '(555) 234-5678',
    playStyle: 'Doubles Play',
    level: 'Beginner',
    status: 'Active',
    joinDate: new Date('2024-02-01'),
    lastSession: new Date('2024-01-22'),
    nextSession: new Date('2024-01-26T15:30:00'),
    totalSessions: 12,
    address: '456 Oak Ave, Anytown, ST 12345',
    notes: 'Enthusiastic beginner. Loves the strategic aspects of doubles play.',
    goals: ['Learn basic serve technique', 'Understand court positioning', 'Develop consistent dinking'],
    guardians: [
      {
        firstName: 'Lisa',
        lastName: 'Chen',
        email: 'lisa.chen@email.com',
        phone: '(555) 234-5678'
      }
    ]
  },
  {
    firstName: 'Sarah',
    lastName: 'Williams',
    email: 'sarah.williams@email.com',
    phone: '(555) 345-6789',
    playStyle: 'Tournament Prep',
    level: 'Advanced',
    status: 'Active',
    joinDate: new Date('2023-09-10'),
    lastSession: new Date('2024-01-19'),
    nextSession: new Date('2024-01-27T10:00:00'),
    totalSessions: 45,
    address: '789 Pine St, Anytown, ST 12345',
    notes: 'Preparing for regional tournaments. Excellent court awareness and shot selection.',
    goals: ['Perfect tournament strategy', 'Improve power shots', 'Master advanced spin techniques'],
    guardians: [] // Adult student, no guardians
  },
  {
    firstName: 'David',
    lastName: 'Brown',
    email: 'david.brown@email.com',
    phone: '(555) 456-7890',
    playStyle: 'Recreational Play',
    level: 'Beginner',
    status: 'Inactive',
    joinDate: new Date('2023-11-20'),
    lastSession: new Date('2024-01-10'),
    nextSession: null,
    totalSessions: 8,
    address: '321 Elm St, Anytown, ST 12345',
    notes: 'Taking a break due to work commitments.',
    goals: ['Learn basic rules', 'Develop consistent serve'],
    guardians: [
      {
        firstName: 'Mark',
        lastName: 'Brown',
        email: 'mark.brown@email.com',
        phone: '(555) 456-7890'
      }
    ]
  },
  {
    firstName: 'Jessica',
    lastName: 'Martinez',
    email: 'jessica.martinez@email.com',
    phone: '(555) 567-8901',
    playStyle: 'Singles & Doubles',
    level: 'Intermediate',
    status: 'Active',
    joinDate: new Date('2024-01-05'),
    lastSession: new Date('2024-01-21'),
    nextSession: new Date('2024-01-28T16:00:00'),
    totalSessions: 18,
    address: '654 Maple Dr, Anytown, ST 12345',
    notes: 'Great footwork. Working on shot placement and strategy.',
    goals: ['Improve shot placement', 'Learn advanced serves', 'Prepare for league play'],
    guardians: [
      {
        firstName: 'Maria',
        lastName: 'Martinez',
        email: 'maria.martinez@email.com',
        phone: '(555) 567-8901'
      }
    ]
  }
];

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create default coach user
  const defaultEmail = 'sarah.mitchell@email.com';
  const defaultPassword = 'password123';
  const defaultName = 'Sarah Mitchell';

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: defaultEmail }
    });

    if (!existingUser) {
      // Hash the password
      const passwordHash = await hashPassword(defaultPassword);

      // Create the user
      const user = await prisma.user.create({
        data: {
          email: defaultEmail,
          name: defaultName,
          passwordHash: passwordHash
        }
      });

      console.log(`✅ Created default coach user:`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Name: ${user.name}`);
      console.log(`   ID: ${user.id}`);
      console.log(`   Password: ${defaultPassword} (for testing purposes)`);
    } else {
      console.log(`👤 User with email ${defaultEmail} already exists. Skipping creation.`);
    }

    // Check if students already exist
    const existingStudents = await prisma.student.count();
    if (existingStudents > 0) {
      console.log(`👥 ${existingStudents} students already exist. Skipping student creation.`);
    } else {
      // Create students with guardians
      console.log('👥 Creating mock students and guardians...');
      
      for (const studentData of mockStudents) {
        const { guardians, goals, ...studentInfo } = studentData;
        
        const student = await prisma.student.create({
          data: {
            ...studentInfo,
            goals: JSON.stringify(goals),
            guardians: {
              create: guardians
            }
          },
          include: {
            guardians: true
          }
        });

        console.log(`✅ Created student: ${student.firstName} ${student.lastName}`);
        if (student.guardians.length > 0) {
          console.log(`   └── With ${student.guardians.length} guardian(s)`);
        }
      }

      console.log(`🎉 Successfully created ${mockStudents.length} students!`);
    }

    // Check if sessions already exist
    const existingSessions = await prisma.session.count();
    if (existingSessions > 0) {
      console.log(`📅 ${existingSessions} sessions already exist. Skipping session creation.`);
    } else {
      // Create mock sessions
      console.log('📅 Creating mock sessions...');
      
      // Get the created coach and students
      const coach = await prisma.user.findUnique({
        where: { email: defaultEmail }
      });
      
      const students = await prisma.student.findMany({
        select: { id: true, firstName: true, lastName: true }
      });

      if (!coach) {
        throw new Error('Coach not found for session creation');
      }

      // Create sessions for the next few weeks
      const now = new Date();
      const emmaId = students.find(s => s.firstName === 'Emma')?.id;
      const michaelId = students.find(s => s.firstName === 'Michael')?.id;
      const sarahId = students.find(s => s.firstName === 'Sarah')?.id;
      const jessicaId = students.find(s => s.firstName === 'Jessica')?.id;

      const mockSessions = [
        // Emma Johnson sessions
        ...(emmaId ? [{
          title: 'Backhand Technique Session',
          description: 'Focus on backhand consistency and form',
          startTime: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000), // Tomorrow 2 PM
          endTime: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000 + 15 * 60 * 60 * 1000), // Tomorrow 3 PM
          studentId: emmaId,
          coachId: coach.id,
          status: 'scheduled'
        }] : []),
        // Michael Chen sessions
        ...(michaelId ? [{
          title: 'Beginner Fundamentals',
          description: 'Basic serve and court positioning',
          startTime: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000 + 15 * 60 * 60 * 1000 + 30 * 60 * 1000), // Day after tomorrow 3:30 PM
          endTime: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000 + 16 * 60 * 60 * 1000 + 30 * 60 * 1000), // Day after tomorrow 4:30 PM
          studentId: michaelId,
          coachId: coach.id,
          status: 'scheduled'
        }] : []),
        // Sarah Williams sessions
        ...(sarahId ? [{
          title: 'Tournament Preparation',
          description: 'Advanced strategy and power shots',
          startTime: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000), // 3 days from now 10 AM
          endTime: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000 + 11 * 60 * 60 * 1000 + 30 * 60 * 1000), // 3 days from now 11:30 AM
          studentId: sarahId,
          coachId: coach.id,
          status: 'scheduled'
        }] : []),
        // Jessica Martinez sessions
        ...(jessicaId ? [{
          title: 'Shot Placement Practice',
          description: 'Working on accuracy and court positioning',
          startTime: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000 + 16 * 60 * 60 * 1000), // 4 days from now 4 PM
          endTime: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000 + 17 * 60 * 60 * 1000), // 4 days from now 5 PM
          studentId: jessicaId,
          coachId: coach.id,
          status: 'scheduled'
        }] : []),
        // Past completed session for Emma
        ...(emmaId ? [{
          title: 'Net Play Development',
          description: 'Completed session focusing on net game',
          startTime: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000), // 3 days ago 2 PM
          endTime: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000 + 15 * 60 * 60 * 1000), // 3 days ago 3 PM
          studentId: emmaId,
          coachId: coach.id,
          status: 'completed'
        }] : []),
        // Cancelled session for Michael
        ...(michaelId ? [{
          title: 'Doubles Strategy Session',
          description: 'Session was cancelled due to weather',
          startTime: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000 + 15 * 60 * 60 * 1000 + 30 * 60 * 1000), // Yesterday 3:30 PM
          endTime: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000 + 16 * 60 * 60 * 1000 + 30 * 60 * 1000), // Yesterday 4:30 PM
          studentId: michaelId,
          coachId: coach.id,
          status: 'cancelled'
        }] : []),
        // Additional future sessions
        ...(sarahId ? [{
          title: 'Advanced Spin Techniques',
          description: 'Working on topspin and slice shots',
          startTime: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000 + 11 * 60 * 60 * 1000), // Next week 11 AM
          endTime: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000 + 30 * 60 * 1000), // Next week 12:30 PM
          studentId: sarahId,
          coachId: coach.id,
          status: 'scheduled'
        }] : []),
        ...(jessicaId ? [{
          title: 'League Preparation',
          description: 'Getting ready for competitive play',
          startTime: new Date(now.getTime() + 8 * 24 * 60 * 60 * 1000 + 16 * 60 * 60 * 1000), // Next week + 1 day 4 PM
          endTime: new Date(now.getTime() + 8 * 24 * 60 * 60 * 1000 + 17 * 60 * 60 * 1000), // Next week + 1 day 5 PM
          studentId: jessicaId,
          coachId: coach.id,
          status: 'scheduled'
        }] : [])
      ];

      // Create the sessions
      for (const sessionData of mockSessions) {
        const session = await prisma.session.create({
          data: {
            title: sessionData.title,
            description: sessionData.description || null,
            startTime: sessionData.startTime,
            endTime: sessionData.endTime,
            studentId: sessionData.studentId,
            coachId: sessionData.coachId,
            status: sessionData.status
          }
        });
        
        const student = students.find(s => s.id === sessionData.studentId);
        console.log(`✅ Created session: "${session.title}" for ${student?.firstName} ${student?.lastName} (${session.status})`);
      }

      console.log(`🎉 Successfully created ${mockSessions.length} mock sessions!`);
    }

    // Check if progress tracking data already exists
    const existingAttendance = await prisma.attendanceRecord.count();
    if (existingAttendance > 0) {
      console.log(`📊 ${existingAttendance} attendance records already exist. Skipping progress tracking data creation.`);
    } else {
      console.log('📊 Creating mock progress tracking data...');
      
      // Get created data for relationships
      const coach = await prisma.user.findUnique({
        where: { email: defaultEmail }
      });
      
      const students = await prisma.student.findMany({
        select: { id: true, firstName: true, lastName: true }
      });

      const sessions = await prisma.session.findMany({
        select: { id: true, studentId: true, startTime: true }
      });

      if (!coach || students.length === 0) {
        console.log('⚠️ No coach or students found for progress tracking data');
      } else {
        // Create attendance records for some sessions
        const attendanceRecords = [];
        for (const session of sessions.slice(0, 8)) { // Create attendance for first 8 sessions
          const statuses: ('present' | 'late' | 'absent')[] = ['present', 'present', 'present', 'late', 'absent']; // Mostly present
          const status = statuses[Math.floor(Math.random() * statuses.length)] || 'present';
          
          attendanceRecords.push({
            sessionId: session.id,
            studentId: session.studentId,
            status,
            arrivalTime: status === 'late' ? new Date(session.startTime.getTime() + 10 * 60 * 1000) :
                        status === 'present' ? session.startTime : null,
            notes: status === 'absent' ? 'Family emergency' :
                   status === 'late' ? 'Traffic delay' : null
          });
        }

        for (const record of attendanceRecords) {
          await prisma.attendanceRecord.create({ data: record });
        }
        console.log(`✅ Created ${attendanceRecords.length} attendance records`);

        // Create lesson notes
        const lessonNotes = [
          {
            title: 'Backhand Improvement Session',
            content: 'Emma showed significant improvement in her backhand consistency today. We worked on proper grip and follow-through. She managed to hit 8/10 shots in the target zone by the end of the session.',
            tags: JSON.stringify(['backhand', 'technique', 'improvement']),
            studentId: students.find(s => s.firstName === 'Emma')?.id || students[0]?.id || 1,
            coachId: coach.id,
            sessionId: sessions[0]?.id || null
          },
          {
            title: 'Doubles Strategy Development',
            content: 'Michael is grasping the fundamentals of doubles positioning well. We practiced kitchen play and third shot drops. Need to work more on communication with partner.',
            tags: JSON.stringify(['doubles', 'strategy', 'positioning']),
            studentId: students.find(s => s.firstName === 'Michael')?.id || students[1]?.id || 1,
            coachId: coach.id,
            sessionId: sessions[1]?.id || null
          },
          {
            title: 'Tournament Preparation Notes',
            content: 'Sarah is tournament-ready! Her power shots are consistent and her court awareness is excellent. Discussed mental preparation strategies for upcoming regional tournament.',
            tags: JSON.stringify(['tournament', 'mental-game', 'power-shots']),
            studentId: students.find(s => s.firstName === 'Sarah')?.id || students[2]?.id || 1,
            coachId: coach.id,
            sessionId: sessions[2]?.id || null
          }
        ];

        for (const note of lessonNotes) {
          await prisma.lessonNote.create({ data: note });
        }
        console.log(`✅ Created ${lessonNotes.length} lesson notes`);

        // Create student goals
        const studentGoals = [
          {
            title: 'Master Third Shot Drop',
            description: 'Consistently execute third shot drops with 80% accuracy in practice',
            category: 'technique',
            priority: 'high',
            targetDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
            progress: 65,
            studentId: students.find(s => s.firstName === 'Emma')?.id || students[0]?.id || 1,
            coachId: coach.id,
            notes: 'Making good progress, focus on soft touch'
          },
          {
            title: 'Improve Court Positioning',
            description: 'Better understanding of doubles court positioning and movement',
            category: 'strategy',
            priority: 'medium',
            targetDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
            progress: 40,
            studentId: students.find(s => s.firstName === 'Michael')?.id || students[1]?.id || 1,
            coachId: coach.id,
            notes: 'Needs more practice with partner communication'
          },
          {
            title: 'Win Regional Tournament',
            description: 'Place in top 3 at upcoming regional pickleball tournament',
            category: 'mental',
            priority: 'high',
            targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
            progress: 85,
            studentId: students.find(s => s.firstName === 'Sarah')?.id || students[2]?.id || 1,
            coachId: coach.id,
            notes: 'Excellent preparation, focus on mental game'
          },
          {
            title: 'Develop Consistent Serve',
            description: 'Achieve 90% serve accuracy in practice sessions',
            category: 'technique',
            priority: 'high',
            targetDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
            progress: 25,
            studentId: students.find(s => s.firstName === 'Jessica')?.id || students[3]?.id || 1,
            coachId: coach.id,
            notes: 'Just started working on this, good foundation'
          }
        ];

        for (const goal of studentGoals) {
          await prisma.studentGoal.create({ data: goal });
        }
        console.log(`✅ Created ${studentGoals.length} student goals`);

        // Create practice logs
        const practiceLogs = [
          {
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
            duration: 60,
            type: 'solo',
            focus: 'Backhand drills and footwork',
            notes: 'Felt good today, backhand is improving',
            rating: 4,
            studentId: students.find(s => s.firstName === 'Emma')?.id || students[0]?.id || 1
          },
          {
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
            duration: 90,
            type: 'group',
            focus: 'Doubles play and strategy',
            notes: 'Great session with other beginners',
            rating: 5,
            studentId: students.find(s => s.firstName === 'Michael')?.id || students[1]?.id || 1
          },
          {
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
            duration: 120,
            type: 'match',
            focus: 'Tournament simulation',
            notes: 'Won 2 out of 3 matches, feeling confident',
            rating: 5,
            studentId: students.find(s => s.firstName === 'Sarah')?.id || students[2]?.id || 1
          },
          {
            date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
            duration: 45,
            type: 'drill',
            focus: 'Serve practice',
            notes: 'Working on consistency, need more practice',
            rating: 3,
            studentId: students.find(s => s.firstName === 'Jessica')?.id || students[3]?.id || 1
          }
        ];

        for (const log of practiceLogs) {
          await prisma.practiceLog.create({ data: log });
        }
        console.log(`✅ Created ${practiceLogs.length} practice logs`);

        // Create skill assessments
        const skillAssessments = [
          // Emma's assessments
          {
            skillName: 'backhand',
            category: 'technical',
            rating: 7,
            notes: 'Much improved consistency, good form',
            studentId: students.find(s => s.firstName === 'Emma')?.id || students[0]?.id || 1,
            coachId: coach.id,
            sessionId: sessions[0]?.id || null,
            assessedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
          },
          {
            skillName: 'net_play',
            category: 'tactical',
            rating: 6,
            notes: 'Good positioning, needs work on volleys',
            studentId: students.find(s => s.firstName === 'Emma')?.id || students[0]?.id || 1,
            coachId: coach.id,
            assessedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
          },
          // Michael's assessments
          {
            skillName: 'serve',
            category: 'technical',
            rating: 4,
            notes: 'Basic technique solid, needs consistency work',
            studentId: students.find(s => s.firstName === 'Michael')?.id || students[1]?.id || 1,
            coachId: coach.id,
            assessedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
          },
          {
            skillName: 'court_positioning',
            category: 'tactical',
            rating: 5,
            notes: 'Understanding concepts, needs practice',
            studentId: students.find(s => s.firstName === 'Michael')?.id || students[1]?.id || 1,
            coachId: coach.id,
            assessedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
          },
          // Sarah's assessments
          {
            skillName: 'power_shots',
            category: 'technical',
            rating: 9,
            notes: 'Excellent power and control',
            studentId: students.find(s => s.firstName === 'Sarah')?.id || students[2]?.id || 1,
            coachId: coach.id,
            assessedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
          },
          {
            skillName: 'mental_game',
            category: 'mental',
            rating: 8,
            notes: 'Strong focus and competitive mindset',
            studentId: students.find(s => s.firstName === 'Sarah')?.id || students[2]?.id || 1,
            coachId: coach.id,
            assessedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
          }
        ];

        for (const assessment of skillAssessments) {
          await prisma.skillAssessment.create({ data: assessment });
        }
        console.log(`✅ Created ${skillAssessments.length} skill assessments`);

        console.log('🎉 Successfully created all progress tracking mock data!');
      }
    }

    // Check if Sprint 5 data already exists
    const existingPayments = await prisma.payment.count();
    if (existingPayments > 0) {
      console.log(`💳 ${existingPayments} payments already exist. Skipping Sprint 5 data creation.`);
    } else {
      console.log('💳 Creating Sprint 5 mock data (payments, messaging, analytics, settings)...');
      
      // Get created data for relationships
      const coach = await prisma.user.findUnique({
        where: { email: defaultEmail }
      });
      
      const students = await prisma.student.findMany({
        select: { id: true, firstName: true, lastName: true }
      });

      const sessions = await prisma.session.findMany({
        select: { id: true, studentId: true, startTime: true, title: true }
      });

      if (!coach || students.length === 0) {
        console.log('⚠️ No coach or students found for Sprint 5 data');
      } else {
        // Create invoices and payments
        const invoices = [];
        const payments = [];
        
        for (let i = 0; i < students.length; i++) {
          const student = students[i];
          if (!student) continue;
          
          const studentSessions = sessions.filter(s => s.studentId === student.id);
          
          // Create invoice for each student
          const invoiceNumber = `INV-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(i + 1).padStart(4, '0')}`;
          const subtotal = 150.00; // $150 for sessions
          const tax = subtotal * 0.08; // 8% tax
          const total = subtotal + tax;
          
          const invoice = await prisma.invoice.create({
            data: {
              invoiceNumber,
              studentId: student.id,
              subtotal,
              tax,
              total,
              dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
              status: i % 3 === 0 ? 'paid' : i % 3 === 1 ? 'sent' : 'overdue',
              paidAt: i % 3 === 0 ? new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) : null,
              notes: `Monthly invoice for ${student.firstName} ${student.lastName}`,
              items: {
                create: studentSessions.slice(0, 3).map(session => ({
                  description: `Lesson: ${session.title}`,
                  quantity: 1,
                  unitPrice: 50.00,
                  total: 50.00,
                  sessionId: session.id
                }))
              }
            }
          });
          
          invoices.push(invoice);
          
          // Create payment for paid invoices
          if (i % 3 === 0) {
            const payment = await prisma.payment.create({
              data: {
                amount: total,
                currency: 'USD',
                method: i % 2 === 0 ? 'card' : 'bank_transfer',
                status: 'completed',
                description: `Payment for invoice ${invoiceNumber}`,
                reference: `PAY-${Date.now()}-${i}`,
                studentId: student.id,
                invoiceId: invoice.id,
                processedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
              }
            });
            payments.push(payment);
          }
        }
        
        console.log(`✅ Created ${invoices.length} invoices and ${payments.length} payments`);

        // Create conversations and messages
        const conversations = [];
        const messages = [];
        
        // Create conversation between coach and each student
        for (const student of students.slice(0, 3)) { // First 3 students
          const conversation = await prisma.conversation.create({
            data: {
              title: `Chat with ${student.firstName}`,
              type: 'direct',
              lastMessageAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
              participants: {
                create: [
                  { userId: coach.id },
                  { studentId: student.id }
                ]
              }
            }
          });
          
          conversations.push(conversation);
          
          // Create some messages in each conversation
          const conversationMessages = [
            {
              content: `Hi ${student.firstName}! How are you feeling about your progress?`,
              senderId: coach.id,
              createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
            },
            {
              content: "I'm feeling great! The backhand drills are really helping.",
              studentSenderId: student.id,
              createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000)
            },
            {
              content: "That's wonderful to hear! Keep up the great work. See you at our next session.",
              senderId: coach.id,
              createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000)
            }
          ];
          
          for (const msgData of conversationMessages) {
            const message = await prisma.message.create({
              data: {
                content: msgData.content,
                type: 'text',
                conversationId: conversation.id,
                senderId: msgData.senderId || null,
                studentSenderId: msgData.studentSenderId || null,
                createdAt: msgData.createdAt
              }
            });
            messages.push(message);
          }
        }
        
        console.log(`✅ Created ${conversations.length} conversations and ${messages.length} messages`);

        // Create message templates
        const messageTemplates = [
          {
            title: 'Session Reminder',
            content: 'Hi {studentName}! This is a friendly reminder about your upcoming lesson on {date} at {time}. Looking forward to seeing you!',
            category: 'reminder',
            isActive: true,
            createdById: coach.id
          },
          {
            title: 'Welcome New Student',
            content: 'Welcome to our pickleball coaching program, {studentName}! I\'m excited to help you improve your game. Please let me know if you have any questions.',
            category: 'welcome',
            isActive: true,
            createdById: coach.id
          },
          {
            title: 'Session Follow-up',
            content: 'Great session today, {studentName}! Remember to practice the techniques we worked on. Keep up the excellent work!',
            category: 'follow_up',
            isActive: true,
            createdById: coach.id
          },
          {
            title: 'Payment Reminder',
            content: 'Hi {studentName}, this is a friendly reminder that your payment for this month\'s sessions is due. Please let me know if you have any questions.',
            category: 'reminder',
            isActive: true,
            createdById: coach.id
          }
        ];
        
        for (const template of messageTemplates) {
          await prisma.messageTemplate.create({ data: template });
        }
        
        console.log(`✅ Created ${messageTemplates.length} message templates`);

        // Create analytics snapshots
        const analyticsSnapshots = [];
        const today = new Date();
        
        // Create daily snapshots for the last 30 days
        for (let i = 0; i < 30; i++) {
          const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
          date.setHours(0, 0, 0, 0);
          
          const snapshots = [
            {
              date,
              metric: 'revenue',
              value: Math.random() * 500 + 200, // $200-700 daily revenue
              metadata: JSON.stringify({ currency: 'USD', source: 'lessons' })
            },
            {
              date,
              metric: 'sessions',
              value: Math.floor(Math.random() * 8) + 2, // 2-10 sessions per day
              metadata: JSON.stringify({ type: 'completed' })
            },
            {
              date,
              metric: 'students',
              value: students.length - Math.floor(Math.random() * 2), // Slight variation in active students
              metadata: JSON.stringify({ status: 'active' })
            },
            {
              date,
              metric: 'attendance_rate',
              value: Math.random() * 20 + 80, // 80-100% attendance rate
              metadata: JSON.stringify({ unit: 'percentage' })
            }
          ];
          
          for (const snapshot of snapshots) {
            analyticsSnapshots.push(snapshot);
          }
        }
        
        for (const snapshot of analyticsSnapshots) {
          await prisma.analyticsSnapshot.create({ data: snapshot });
        }
        
        console.log(`✅ Created ${analyticsSnapshots.length} analytics snapshots`);

        // Create settings for the coach
        const defaultSettings = [
          // Profile settings
          { category: 'profile', key: 'name', value: coach.name || 'Sarah Mitchell', type: 'string' },
          { category: 'profile', key: 'email', value: coach.email, type: 'string' },
          { category: 'profile', key: 'phone', value: '(555) 123-4567', type: 'string' },
          { category: 'profile', key: 'timezone', value: 'America/Los_Angeles', type: 'string' },
          { category: 'profile', key: 'language', value: 'en', type: 'string' },
          
          // Business settings
          { category: 'business', key: 'businessName', value: 'Elite Pickleball Coaching', type: 'string' },
          { category: 'business', key: 'businessAddress', value: '123 Court Street, Tennis City, CA 90210', type: 'string' },
          { category: 'business', key: 'businessPhone', value: '(555) 123-4567', type: 'string' },
          { category: 'business', key: 'businessEmail', value: 'info@elitepickleball.com', type: 'string' },
          { category: 'business', key: 'currency', value: 'USD', type: 'string' },
          { category: 'business', key: 'taxId', value: '12-3456789', type: 'string' },
          
          // Teaching settings
          { category: 'teaching', key: 'defaultSessionDuration', value: '60', type: 'number' },
          { category: 'teaching', key: 'defaultSessionPrice', value: '50', type: 'number' },
          { category: 'teaching', key: 'autoConfirmBookings', value: 'false', type: 'boolean' },
          { category: 'teaching', key: 'requirePaymentUpfront', value: 'false', type: 'boolean' },
          { category: 'teaching', key: 'allowOnlinePayments', value: 'true', type: 'boolean' },
          { category: 'teaching', key: 'cancellationPolicy', value: '24 hours notice required for cancellations', type: 'string' },
          
          // Notification settings
          { category: 'notifications', key: 'emailNotifications', value: 'true', type: 'boolean' },
          { category: 'notifications', key: 'smsNotifications', value: 'false', type: 'boolean' },
          { category: 'notifications', key: 'sessionReminders', value: 'true', type: 'boolean' },
          { category: 'notifications', key: 'paymentReminders', value: 'true', type: 'boolean' },
          { category: 'notifications', key: 'reminderTiming', value: '24', type: 'number' },
          
          // Privacy settings
          { category: 'privacy', key: 'profileVisibility', value: 'students-only', type: 'string' },
          { category: 'privacy', key: 'shareContactInfo', value: 'true', type: 'boolean' },
          { category: 'privacy', key: 'allowStudentReviews', value: 'true', type: 'boolean' },
          { category: 'privacy', key: 'allowAnalytics', value: 'true', type: 'boolean' },
          
          // Security settings
          { category: 'security', key: 'twoFactorEnabled', value: 'false', type: 'boolean' },
          { category: 'security', key: 'sessionTimeout', value: '480', type: 'number' },
          { category: 'security', key: 'loginNotifications', value: 'true', type: 'boolean' },
          
          // System settings
          { category: 'system', key: 'theme', value: 'light', type: 'string' },
          { category: 'system', key: 'dateFormat', value: 'MM/DD/YYYY', type: 'string' },
          { category: 'system', key: 'timeFormat', value: '12h', type: 'string' },
          { category: 'system', key: 'firstDayOfWeek', value: '0', type: 'number' },
          { category: 'system', key: 'autoBackup', value: 'true', type: 'boolean' }
        ];
        
        for (const setting of defaultSettings) {
          await prisma.settings.create({
            data: {
              userId: coach.id,
              category: setting.category,
              key: setting.key,
              value: setting.value,
              type: setting.type
            }
          });
        }
        
        console.log(`✅ Created ${defaultSettings.length} settings for coach`);
        
        console.log('🎉 Successfully created all Sprint 5 mock data!');
      }
    }

  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  }
}

main()
  .then(async () => {
    console.log('🎉 Database seeding completed successfully!');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('💥 Database seeding failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });