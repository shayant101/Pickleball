
# Backend Development Plan - Crimson Hummingbird Crawl
## Pickleball Coaching Management Platform

# 1) Executive Summary

Building a production-ready Node.js + TypeScript backend for the Crimson Hummingbird Crawl pickleball coaching management platform. The backend will serve a React/TypeScript frontend with REST JSON endpoints, using Express.js, Prisma ORM, and PostgreSQL.

**Constraints honored:**
- Node.js + TypeScript with Express.js framework
- Prisma ORM with PostgreSQL database
- Modern project structure with ESLint/Prettier
- Zod for runtime validation
- API exposed under [`/api`](src/routes/index.ts:1) base path
- Environment-driven configuration
- Seed data matching current mock data for seamless frontend integration
- Single branch [`main`](README.md:1) workflow with manual testing through frontend flows

**Sprint count:** Dynamic 6-sprint approach (S0-S5) covering all frontend features comprehensively.

# 2) In-scope & Success Criteria

**In-scope features (based on frontend analysis):**
- Single coach authentication with JWT tokens
- Student management with guardian/parent contacts
- Session scheduling and calendar management
- Attendance tracking with detailed records
- Progress tracking (lesson notes, goals, practice logs, skill assessments)
- Payment and invoice management
- Messaging system with templates and conversations
- Analytics and business insights
- Comprehensive settings management
- File upload capabilities for avatars and attachments

**Success criteria:**
- Full coverage of all frontend features and data models
- Each sprint passes manual tests via the UI
- Seamless data flow between frontend and backend
- Push to [`main`](README.md:1) after successful sprint completion
- Production-ready code with proper error handling and validation

# 3) API Design

**Conventions:**
- Base path: [`/api`](src/routes/index.ts:1)
- RESTful endpoints with consistent naming
- JSON request/response format
- Filtering and sorting only where visible in frontend
- Consistent error envelope: `{ message: string, details?: any }`
- ISO 8601 date/time strings
- Pagination support for list endpoints

**Core Endpoints:**

**Authentication:**
- [`POST /api/auth/login`](src/routes/auth.ts:1) - Coach login with email/password
- [`POST /api/auth/refresh`](src/routes/auth.ts:1) - Refresh access token
- [`POST /api/auth/logout`](src/routes/auth.ts:1) - Logout and invalidate tokens
- [`POST /api/auth/request-password-reset`](src/routes/auth.ts:1) - Password reset request (stub)
- [`POST /api/auth/reset-password`](src/routes/auth.ts:1) - Password reset completion

**Health & System:**
- [`GET /api/health`](src/routes/health.ts:1) - Health check with DB connectivity

**Dashboard:**
- [`GET /api/dashboard`](src/routes/dashboard.ts:1) - Dashboard stats and recent activity

**Students:**
- [`GET /api/students`](src/routes/students.ts:1) - List students with search/filter
- [`POST /api/students`](src/routes/students.ts:1) - Create student with guardian info
- [`GET /api/students/:id`](src/routes/students.ts:1) - Get student details
- [`PATCH /api/students/:id`](src/routes/students.ts:1) - Update student
- [`DELETE /api/students/:id`](src/routes/students.ts:1) - Soft delete student
- [`POST /api/students/:id/guardians`](src/routes/students.ts:1) - Add guardian
- [`PATCH /api/students/:id/guardians/:guardianId`](src/routes/students.ts:1) - Update guardian
- [`DELETE /api/students/:id/guardians/:guardianId`](src/routes/students.ts:1) - Remove guardian

**Sessions & Calendar:**
- [`GET /api/sessions`](src/routes/sessions.ts:1) - List sessions with date range filter
- [`POST /api/sessions`](src/routes/sessions.ts:1) - Schedule new session
- [`GET /api/sessions/:id`](src/routes/sessions.ts:1) - Get session details
- [`PATCH /api/sessions/:id`](src/routes/sessions.ts:1) - Update session
- [`DELETE /api/sessions/:id`](src/routes/sessions.ts:1) - Cancel session
- [`GET /api/availability`](src/routes/sessions.ts:1) - Get coach availability

**Attendance:**
- [`GET /api/attendance`](src/routes/attendance.ts:1) - List attendance records
- [`POST /api/attendance`](src/routes/attendance.ts:1) - Mark attendance
- [`PATCH /api/attendance/:id`](src/routes/attendance.ts:1) - Update attendance record
- [`GET /api/attendance/summary`](src/routes/attendance.ts:1) - Attendance summaries

**Progress:**
- [`GET /api/students/:id/lesson-notes`](src/routes/progress.ts:1) - Get lesson notes
- [`POST /api/students/:id/lesson-notes`](src/routes/progress.ts:1) - Create lesson note
- [`PATCH /api/lesson-notes/:id`](src/routes/progress.ts:1) - Update lesson note
- [`GET /api/students/:id/goals`](src/routes/progress.ts:1) - Get student goals
- [`POST /api/students/:id/goals`](src/routes/progress.ts:1) - Create goal
- [`PATCH /api/goals/:id`](src/routes/progress.ts:1) - Update goal progress
- [`GET /api/students/:id/practice-logs`](src/routes/progress.ts:1) - Get practice logs
- [`POST /api/students/:id/practice-logs`](src/routes/progress.ts:1) - Create practice log
- [`GET /api/students/:id/skill-assessments`](src/routes/progress.ts:1) - Get assessments
- [`POST /api/students/:id/skill-assessments`](src/routes/progress.ts:1) - Create assessment

**Payments & Billing:**
- [`GET /api/payments`](src/routes/payments.ts:1) - List payments with filters
- [`POST /api/payments`](src/routes/payments.ts:1) - Record payment
- [`GET /api/payments/:id`](src/routes/payments.ts:1) - Get payment details
- [`PATCH /api/payments/:id`](src/routes/payments.ts:1) - Update payment
- [`GET /api/invoices`](src/routes/payments.ts:1) - List invoices
- [`POST /api/invoices`](src/routes/payments.ts:1) - Create invoice
- [`GET /api/invoices/:id`](src/routes/payments.ts:1) - Get invoice with items
- [`PATCH /api/invoices/:id`](src/routes/payments.ts:1) - Update invoice
- [`POST /api/invoices/:id/send`](src/routes/payments.ts:1) - Mark invoice as sent
- [`GET /api/billing/students`](src/routes/payments.ts:1) - Student billing summaries
- [`GET /api/payments/stats`](src/routes/payments.ts:1) - Payment statistics

**Messages:**
- [`GET /api/conversations`](src/routes/messages.ts:1) - List conversations
- [`POST /api/conversations`](src/routes/messages.ts:1) - Start new conversation
- [`GET /api/conversations/:id`](src/routes/messages.ts:1) - Get conversation messages
- [`POST /api/conversations/:id/messages`](src/routes/messages.ts:1) - Send message
- [`PATCH /api/conversations/:id/archive`](src/routes/messages.ts:1) - Archive conversation
- [`POST /api/conversations/:id/read`](src/routes/messages.ts:1) - Mark as read
- [`GET /api/message-templates`](src/routes/messages.ts:1) - List templates
- [`POST /api/message-templates`](src/routes/messages.ts:1) - Create template
- [`GET /api/messages/stats`](src/routes/messages.ts:1) - Message statistics
- [`GET /api/messages/stream`](src/routes/messages.ts:1) - Server-Sent Events for real-time

**Analytics:**
- [`GET /api/analytics/overview`](src/routes/analytics.ts:1) - Overview analytics
- [`GET /api/analytics/revenue`](src/routes/analytics.ts:1) - Revenue analytics
- [`GET /api/analytics/students`](src/routes/analytics.ts:1) - Student analytics
- [`GET /api/analytics/lessons`](src/routes/analytics.ts:1) - Lesson analytics
- [`GET /api/analytics/progress`](src/routes/analytics.ts:1) - Progress analytics
- [`GET /api/analytics/recommendations`](src/routes/analytics.ts:1) - Business recommendations
- [`GET /api/analytics/alerts`](src/routes/analytics.ts:1) - Business alerts

**Settings:**
- [`GET /api/settings/profile`](src/routes/settings.ts:1) - Get user profile
- [`PUT /api/settings/profile`](src/routes/settings.ts:1) - Update profile
- [`GET /api/settings/business`](src/routes/settings.ts:1) - Get business settings
- [`PUT /api/settings/business`](src/routes/settings.ts:1) - Update business settings
- [`GET /api/settings/teaching`](src/routes/settings.ts:1) - Get teaching preferences
- [`PUT /api/settings/teaching`](src/routes/settings.ts:1) - Update teaching preferences
- [`GET /api/settings/notifications`](src/routes/settings.ts:1) - Get notification settings
- [`PUT /api/settings/notifications`](src/routes/settings.ts:1) - Update notifications
- [`GET /api/settings/payments`](src/routes/settings.ts:1) - Get payment settings
- [`PUT /api/settings/payments`](src/routes/settings.ts:1) - Update payment settings
- [`GET /api/settings/privacy`](src/routes/settings.ts:1) - Get privacy settings
- [`PUT /api/settings/privacy`](src/routes/settings.ts:1) - Update privacy settings
- [`GET /api/settings/system`](src/routes/settings.ts:1) - Get system preferences
- [`PUT /api/settings/system`](src/routes/settings.ts:1) - Update system preferences
- [`GET /api/settings/security`](src/routes/settings.ts:1) - Get security settings
- [`PUT /api/settings/security`](src/routes/settings.ts:1) - Update security settings
- [`GET /api/settings/security/sessions`](src/routes/settings.ts:1) - List login sessions
- [`DELETE /api/settings/security/sessions/:deviceId`](src/routes/settings.ts:1) - Revoke session

# 4) Data Model (PostgreSQL with Prisma)

**Core Collections:**

**User:**
- [`id`](prisma/schema.prisma:1): Int (Primary Key)
- [`email`](prisma/schema.prisma:1): String (Unique)
- [`passwordHash`](prisma/schema.prisma:1): String
- [`firstName`](prisma/schema.prisma:1): String
- [`lastName`](prisma/schema.prisma:1): String
- [`role`](prisma/schema.prisma:1): String (default: "coach")
- [`createdAt`](prisma/schema.prisma:1): DateTime
- [`updatedAt`](prisma/schema.prisma:1): DateTime
- [`lastLoginAt`](prisma/schema.prisma:1): DateTime?

**Student:**
- [`id`](prisma/schema.prisma:1): Int (Primary Key)
- [`firstName`](prisma/schema.prisma:1): String
- [`lastName`](prisma/schema.prisma:1): String
- [`email`](prisma/schema.prisma:1): String
- [`phone`](prisma/schema.prisma:1): String
- [`playStyle`](prisma/schema.prisma:1): String
- [`level`](prisma/schema.prisma:1): String
- [`status`](prisma/schema.prisma:1): String (Active/Inactive)
- [`joinDate`](prisma/schema.prisma:1): DateTime
- [`lastSessionAt`](prisma/schema.prisma:1): DateTime?
- [`nextSessionAt`](prisma/schema.prisma:1): DateTime?
- [`totalSessions`](prisma/schema.prisma:1): Int (default: 0)
- [`avatarUrl`](prisma/schema.prisma:1): String?
- [`address`](prisma/schema.prisma:1): String?
- [`notes`](prisma/schema.prisma:1): String?
- [`goals`](prisma/schema.prisma:1): Json? (string array)
- [`createdAt`](prisma/schema.prisma:1): DateTime
- [`updatedAt`](prisma/schema.prisma:1): DateTime

**Guardian:**
- [`id`](prisma/schema.prisma:1): Int (Primary Key)
- [`studentId`](prisma/schema.prisma:1): Int (Foreign Key)
- [`name`](prisma/schema.prisma:1): String
- [`email`](prisma/schema.prisma:1): String
- [`phone`](prisma/schema.prisma:1): String
- [`relationship`](prisma/schema.prisma:1): String
- [`createdAt`](prisma/schema.prisma:1): DateTime
- [`updatedAt`](prisma/schema.prisma:1): DateTime

**Session:**
- [`id`](prisma/schema.prisma:1): Int (Primary Key)
- [`studentId`](prisma/schema.prisma:1): Int (Foreign Key)
- [`coachId`](prisma/schema.prisma:1): Int (Foreign Key)
- [`title`](prisma/schema.prisma:1): String
- [`description`](prisma/schema.prisma:1): String?
- [`startTime`](prisma/schema.prisma:1): DateTime
- [`endTime`](prisma/schema.prisma:1): DateTime
- [`location`](prisma/schema.prisma:1): String?
- [`sessionType`](prisma/schema.prisma:1): String
- [`status`](prisma/schema.prisma:1): String (scheduled/completed/cancelled/missed)
- [`notes`](prisma/schema.prisma:1): String?
- [`createdAt`](prisma/schema.prisma:1): DateTime
- [`updatedAt`](prisma/schema.prisma:1): DateTime

**AttendanceRecord:**
- [`id`](prisma/schema.prisma:1): Int (Primary Key)
- [`sessionId`](prisma/schema.prisma:1): Int (Foreign Key)
- [`studentId`](prisma/schema.prisma:1): Int (Foreign Key)
- [`status`](prisma/schema.prisma:1): String (present/absent/late/cancelled)
- [`arrivalTime`](prisma/schema.prisma:1): DateTime?
- [`makeupRequired`](prisma/schema.prisma:1): Boolean (default: false)
- [`makeupScheduled`](prisma/schema.prisma:1): DateTime?
- [`remarks`](prisma/schema.prisma:1): String?
- [`createdAt`](prisma/schema.prisma:1): DateTime

**LessonNote:**
- [`id`](prisma/schema.prisma:1): Int (Primary Key)
- [`studentId`](prisma/schema.prisma:1): Int (Foreign Key)
- [`sessionId`](prisma/schema.prisma:1): Int? (Foreign Key)
- [`date`](prisma/schema.prisma:1): DateTime
- [`durationMinutes`](prisma/schema.prisma:1): Int
- [`topics`](prisma/schema.prisma:1): Json (string array)
- [`achievements`](prisma/schema.prisma:1): Json (string array)
- [`challenges`](prisma/schema.prisma:1): Json (string array)
- [`homework`](prisma/schema.prisma:1): Json (string array)
- [`nextFocus`](prisma/schema.prisma:1): String
- [`rating`](prisma/schema.prisma:1): Int (1-5)
- [`additionalNotes`](prisma/schema.prisma:1): String?
- [`createdAt`](prisma/schema.prisma:1): DateTime
- [`updatedAt`](prisma/schema.prisma:1): DateTime

**StudentGoal:**
- [`id`](prisma/schema.prisma:1): Int (Primary Key)
- [`studentId`](prisma/schema.prisma:1): Int (Foreign Key)
- [`title`](prisma/schema.prisma:1): String
- [`description`](prisma/schema.prisma:1): String
- [`status`](prisma/schema.prisma:1): String (not-started/in-progress/completed/paused)
- [`progressPercent`](prisma/schema.prisma:1): Int (0-100)
- [`targetDate`](prisma/schema.prisma:1): DateTime
- [`createdDate`](prisma/schema.prisma:1): DateTime
- [`completedDate`](prisma/schema.prisma:1): DateTime?

**PracticeLog:**
- [`id`](prisma/schema.prisma:1): Int (Primary Key)
- [`studentId`](prisma/schema.prisma:1): Int (Foreign Key)
- [`date`](prisma/schema.prisma:1): DateTime
- [`durationMinutes`](prisma/schema.prisma:1): Int
- [`focusAreas`](prisma/schema.prisma:1): Json (string array)
- [`notes`](prisma/schema.prisma:1): String?
- [`qualityRating`](prisma/schema.prisma:1): Int (1-5)
- [`createdAt`](prisma/schema.prisma:1): DateTime

**SkillAssessment:**
- [`id`](prisma/schema.prisma:1): Int (Primary Key)
- [`studentId`](prisma/schema.prisma:1): Int (Foreign Key)
- [`date`](prisma/schema.prisma:1): DateTime
- [`technique`](prisma/schema.prisma:1): Int (1-10)
- [`rhythm`](prisma/schema.prisma:1): Int (1-10)
- [`pitchAccuracy`](prisma/schema.prisma:1): Int (1-10)
- [`strategy`](prisma/schema.prisma:1): Int (1-10)
- [`courtAwareness`](prisma/schema.prisma:1): Int (1-10)
- [`rulesKnowledge`](prisma/schema.prisma:1): Int (1-10)
- [`overallScore`](prisma/schema.prisma:1): Int (1-10)
- [`notes`](prisma/schema.prisma:1): String?
- [`createdAt`](prisma/schema.prisma:1): DateTime

**Payment:**
- [`id`](prisma/schema.prisma:1): Int (Primary Key)
- [`studentId`](prisma/schema.prisma:1): Int (Foreign Key)
- [`amount`](prisma/schema.prisma:1): Decimal
- [`dueDate`](prisma/schema.prisma:1): DateTime
- [`paidDate`](prisma/schema.prisma:1): DateTime?
- [`status`](prisma/schema.prisma:1): String (pending/paid/overdue/cancelled)
- [`method`](prisma/schema.prisma:1): String? (cash/check/card/bank-transfer/online)
- [`invoiceId`](prisma/schema.prisma:1): Int? (Foreign Key)
- [`description`](prisma/schema.prisma:1): String
- [`notes`](prisma/schema.prisma:1): String?
- [`createdAt`](prisma/schema.prisma:1): DateTime

**Invoice:**
- [`id`](prisma/schema.prisma:1): Int (Primary Key)
- [`studentId`](prisma/schema.prisma:1): Int (Foreign Key)
- [`invoiceNumber`](prisma/schema.prisma:1): String (Unique)
- [`issueDate`](prisma/schema.prisma:1): DateTime
- [`dueDate`](prisma/schema.prisma:1): DateTime
- [`status`](prisma/schema.prisma:1): String (draft/sent/paid/overdue/cancelled)
- [`totalAmount`](prisma/schema.prisma:1): Decimal
- [`sentDate`](prisma/schema.prisma:1): DateTime?
- [`paidDate`](prisma/schema.prisma:1): DateTime?
- [`notes`](prisma/schema.prisma:1): String?
- [`createdAt`](prisma/schema.prisma:1): DateTime

**InvoiceItem:**
- [`id`](prisma/schema.prisma:1): Int (Primary Key)
- [`invoiceId`](prisma/schema.prisma:1): Int (Foreign Key)
- [`description`](prisma/schema.prisma:1): String
- [`quantity`](prisma/schema.prisma:1): Int
- [`unitPrice`](prisma/schema.prisma:1): Decimal
- [`amount`](prisma/schema.prisma:1): Decimal

**Conversation:**
- [`id`](prisma/schema.prisma:1): Int (Primary Key)
- [`studentId`](prisma/schema.prisma:1): Int (Foreign Key)
- [`title`](prisma/schema.prisma:1): String?
- [`archived`](prisma/schema.prisma:1): Boolean (default: false)
- [`lastActivityAt`](prisma/schema.prisma:1): DateTime
- [`unreadCount`](prisma/schema.prisma:1): Int (default: 0)
- [`createdAt`](prisma/schema.prisma:1): DateTime

**ConversationParticipant:**
- [`id`](prisma/schema.prisma:1): Int (Primary Key)
- [`conversationId`](prisma/schema.prisma:1): Int (Foreign Key)
- [`participantType`](prisma/schema.prisma:1): String (coach/student/parent)
- [`participantName`](prisma/schema.prisma:1): String
- [`email`](prisma/schema.prisma:1): String
- [`phone`](prisma/schema.prisma:1): String?

**Message:**
- [`id`](prisma/schema.prisma:1): Int (Primary Key)
- [`conversationId`](prisma/schema.prisma:1): Int (Foreign Key)
- [`senderType`](prisma/schema.prisma:1): String (coach/student/parent)
- [`senderName`](prisma/schema.prisma:1): String
- [`senderId`](prisma/schema.prisma:1): Int? (nullable for coach)
- [`body`](prisma/schema.prisma:1): String
- [`messageType`](prisma/schema.prisma:1): String (text/lesson-reminder/progress-update/schedule-change/payment-reminder)
- [`readAt`](prisma/schema.prisma:1): DateTime?
- [`attachments`](prisma/schema.prisma:1): Json?
- [`createdAt`](prisma/schema.prisma:1): DateTime

**MessageTemplate:**
- [`id`](prisma/schema.prisma:1): Int (Primary Key)
- [`title`](prisma/schema.prisma:1): String
- [`content`](prisma/schema.prisma:1): String
- [`category`](prisma/schema.prisma:1): String
- [`variables`](prisma/schema.prisma:1): Json (string array)

**Settings Tables:**
- [`UserProfile`](prisma/schema.prisma:1): Embedded in User model
- [`BusinessSettings`](prisma/schema.prisma:1): JSON field in Settings table
- [`TeachingPreferences`](prisma/schema.prisma:1): JSON field in Settings table
- [`NotificationSettings`](prisma/schema.prisma:1): JSON field in Settings table
- [`PaymentSettings`](prisma/schema.prisma:1): JSON field in Settings table
- [`PrivacySettings`](prisma/schema.prisma:1): JSON field in Settings table
- [`SystemPreferences`](prisma/schema.prisma:1): JSON field in Settings table
- [`SecuritySettings`](prisma/schema.prisma:1): JSON field in Settings table

**AnalyticsSnapshot:**
- [`id`](prisma/schema.prisma:1): Int (Primary Key)
- [`month`](prisma/schema.prisma:1): String
- [`year`](prisma/schema.prisma:1): Int
- [`data`](prisma/schema.prisma:1): Json (aggregated metrics)
- [`createdAt`](prisma/schema.prisma:1): DateTime

**Example Documents:**

Student:
```json
{
  "id": 1,
  "firstName": "Emma",
  "lastName": "Johnson",
  "email": "emma.johnson@email.com",
  "phone": "(555) 123-4567",
  "playStyle": "Singles Play",
  "level": "Intermediate",
  "status": "Active",
  "joinDate": "2024-01-15T00:00:00Z",
  "totalSessions": 24,
  "goals": ["Improve backhand accuracy", "Master third shot drop"]
}
```

Session:
```json
{
  "id": 1,
  "studentId": 1,
  "coachId": 1,
  "title": "Singles Coaching",
  "startTime": "2024-01-25T14:00:00Z",
  "endTime": "2024-01-25T15:00:00Z",
  "sessionType": "Individual",
  "status": "scheduled"
}
```

# 5) Frontend Audit & Feature Map

**Routes/Components Analysis:**

**Dashboard ([`/`](src/pages/Index.tsx:1)):**
- Purpose: Overview of coaching business metrics
- Data needed: Stats, upcoming sessions, recent activity
- Backend capability: [`GET /api/dashboard`](src/routes/dashboard.ts:1)
- Auth requirement: Yes

**Students ([`/students`](src/components/students/Students.tsx:1)):**
- Purpose: Student management with CRUD operations
- Data needed: Student list, guardian info, session history
- Backend capability: [`/api/students/*`](src/routes/students.ts:1) endpoints
- Auth requirement: Yes

**Calendar ([`/calendar`](src/components/calendar/CalendarView.tsx:1)):**
- Purpose: Session scheduling and calendar view
- Data needed: Sessions by date range, availability
- Backend capability: [`/api/sessions`](src/routes/sessions.ts:1) and [`/api/availability`](src/routes/sessions.ts:1)
- Auth requirement: Yes

**Attendance ([`/attendance`](src/components/attendance/AttendanceTracker.tsx:1)):**
- Purpose: Track student attendance and punctuality
- Data needed: Attendance records, summaries, trends
- Backend capability: [`/api/attendance/*`](src/routes/attendance.ts:1) endpoints
- Auth requirement: Yes

**Progress ([`/progress`](src/components/progress/Progress.tsx:1)):**
- Purpose: Student progress tracking and goal management
- Data needed: Lesson notes, goals, practice logs, assessments
- Backend capability: [`/api/students/:id/lesson-notes`](src/routes/progress.ts:1), [`/api/students/:id/goals`](src/routes/progress.ts:1), etc.
- Auth requirement: Yes

**Payments ([`/payments`](src/components/payments/Payments.tsx:1)):**
- Purpose: Payment and invoice management
- Data needed: Payments, invoices, billing summaries
- Backend capability: [`/api/payments/*`](src/routes/payments.ts:1) and [`/api/invoices/*`](src/routes/payments.ts:1)
- Auth requirement: Yes

**Messages ([`/messages`](src/components/messages/Messages.tsx:1)):**
- Purpose: Communication with students and parents
- Data needed: Conversations, messages, templates
- Backend capability: [`/api/conversations/*`](src/routes/messages.ts:1) and [`/api/message-templates`](src/routes/messages.ts:1)
- Auth requirement: Yes

**Analytics ([`/analytics`](src/components/analytics/Analytics.tsx:1)):**
- Purpose: Business insights and performance metrics
- Data needed: Revenue, student, lesson, and progress analytics
- Backend capability: [`/api/analytics/*`](src/routes/analytics.ts:1) endpoints
- Auth requirement: Yes

**Settings ([`/settings`](src/components/settings/Settings.tsx:1)):**
- Purpose: Profile, business, and system configuration
- Data needed: All settings categories from frontend
- Backend capability: [`/api/settings/*`](src/routes/settings.ts:1) endpoints
- Auth requirement: Yes

# 6) Configuration & ENV Vars (core only)

```env
# Application
APP_ENV=development
PORT=3001

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/pickleball_coaching

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-here
JWT_REFRESH_SECRET=your-refresh-secret-key-here
JWT_EXPIRES_IN=3600

# CORS
CORS_ORIGINS=http://localhost:5173

# File Upload (optional)
UPLOAD_MAX_SIZE=10485760
UPLOAD_ALLOWED_TYPES=image/jpeg,image/png,image/gif,application/pdf
```

# 7) Testing Strategy (Manual via Frontend)

**Policy:** Validate all functionality through the UI by navigating screens, submitting forms, and observing data flow. Use browser DevTools Network tab to verify API calls and responses.

**Per-sprint Manual Test Checklist (Frontend):** Each sprint includes specific UI steps and expected outcomes.

**User Test Prompt:** Copy-pasteable instructions for human testers to validate functionality through the frontend interface.

**Post-sprint:** If tests pass, commit and push to GitHub [`main`](README.md:1); if not, fix issues and retest before pushing.

# 8) Dynamic Sprint Plan & Backlog (S0-S5)

## S0 - Environment Setup & Frontend Connection

**Objectives:**
- Create Node.js + TypeScript project with Express and Prisma
- Set up PostgreSQL database and run initial migrations
- Implement [`/api/health`](src/routes/health.ts:1) endpoint with DB connectivity check
- Enable CORS for frontend origin
- Initialize Git repository and GitHub setup
- Wire frontend to backend (update API base URL)

**User Stories:**
- As a developer, I want a working backend skeleton so I can start building features
- As a coach, I want the frontend to connect to live backend so I can see real data

**Tasks:**
- Initialize Node.js project with TypeScript, Express, Prisma
- Set up [`package.json`](package.json:1) scripts: [`dev`](package.json:1), [`build`](package.json:1), [`start`](package.json:1), [`test`](package.json:1), [`lint`](package.json:1)
- Configure ESLint, Prettier, and TypeScript
- Create Prisma schema with basic User model
- Implement [`/api/health`](src/routes/health.ts:1) endpoint
- Set up CORS middleware
- Create [`README.md`](README.md:1) with setup instructions
- Initialize Git, create GitHub repository, set [`main`](README.md:1) as default branch

**Definition of Done:**
- Backend runs locally on port 3001
- [`/api/health`](src/routes/health.ts:1) responds with DB connectivity status
- Frontend successfully calls backend health endpoint
- Repository exists on GitHub with [`main`](README.md:1) branch
- All linting and formatting rules pass

**Manual Test Checklist (Frontend):**
- Set [`DATABASE_URL`](src/config/database.ts:1) in environment
- Start backend with [`npm run dev`](package.json:1)
- Update frontend [`API_BASE_URL`](frontend/src/config/api.ts:1) to point to backend
- Open frontend application
- Navigate to any page that triggers health check
- Verify success response in Network tab

**User Test Prompt:**
"Open the application and verify it loads without errors. Check browser console and network tab to confirm the frontend is successfully communicating with the backend."

**Post-sprint:**
- Commit initial backend setup
- Push to GitHub [`main`](README.md:1) branch

## S1 - Authentication & User Management

**Objectives:**
- Implement JWT-based authentication system
- Create User model and authentication endpoints
- Add authentication middleware for protected routes
- Set up password hashing with bcrypt
- Implement login, logout, and token refresh

**User Stories:**
- As a coach, I want to log in securely so I can access my coaching data
- As a coach, I want my session to remain active so I don't have to log in repeatedly
- As a coach, I want to log out securely so my data is protected

**Tasks:**
- Create User model in Prisma schema
- Implement password hashing with bcrypt
- Create JWT utilities for token generation and validation
- Build authentication endpoints: [`POST /api/auth/login`](src/routes/auth.ts:1), [`POST /api/auth/refresh`](src/routes/auth.ts:1), [`POST /api/auth/logout`](src/routes/auth.ts:1)
- Add authentication middleware
- Create password reset placeholder endpoints
- Add Zod validation schemas for auth requests
- Seed database with default coach user

**Definition of Done:**
- Coach can log in with email/password via frontend
- JWT tokens are properly generated and validated
- Protected routes require authentication
- Coach can log out and tokens are invalidated
- Password reset endpoints exist (stub implementation)

**Manual Test Checklist (Frontend):**
- Navigate to login page
- Enter valid credentials and verify successful login
- Access a protected page and verify it loads
- Log out and verify redirect to login
- Try accessing protected page after logout (should fail)
- Test invalid credentials (should show error)

**User Test Prompt:**
"Test the login flow: 1) Go to login page, 2) Enter email: sarah.mitchell@email.com, password: password123, 3) Verify you can access the dashboard, 4) Log out and confirm you're redirected to login."

**Post-sprint:**
- Commit authentication system
- Push to GitHub [`main`](README.md:1) branch

## S2 - Student Management & Core Data Models

**Objectives:**
- Implement Student and Guardian models
- Create student CRUD endpoints
- Add student search and filtering
- Implement guardian management
- Seed database with mock student data

**User Stories:**
- As a coach, I want to add new students so I can manage their information
- As a coach, I want to view and edit student details so I can keep records current
- As a coach, I want to add parent/guardian contacts so I can communicate with families
- As a coach, I want to search students so I can quickly find specific individuals

**Tasks:**
- Create Student and Guardian models in Prisma schema
- Implement student endpoints: [`GET /api/students`](src/routes/students.ts:1), [`POST /api/students`](src/routes/students.ts:1), [`GET /api/students/:id`](src/routes/students.ts:1), [`PATCH /api/students/:id`](src/routes/students.ts:1), [`DELETE /api/students/:id`](src/routes/students.ts:1)
- Add guardian management endpoints
- Implement search and filtering logic
- Create Zod validation schemas for student data
- Add file upload capability for student avatars
- Seed database with mock students from frontend data
- Update dashboard endpoint to return real student counts

**Definition of Done:**
- Students can be created, viewed, updated, and deleted via frontend
- Guardian information can be managed
- Student search and filtering works
- Avatar upload functionality works
- Dashboard shows real student statistics

**Manual Test Checklist (Frontend):**
- Navigate to Students page and verify list loads
- Add a new student with guardian information
- Edit an existing student's details
- Upload a student avatar image
- Search for students by name
- Filter students by status and level
- Delete a student (soft delete)

**User Test Prompt:**
"Test student management: 1) Go to Students page, 2) Add a new student with parent contact, 3) Edit the student's play style, 4) Upload a profile photo, 5) Search for the student by name, 6) Verify all data is saved correctly."

**Post-sprint:**
- Commit student management system
- Push to GitHub [`main`](README.md:1) branch

## S3 - Session Scheduling & Calendar

**Objectives:**
- Implement Session model and scheduling system
- Create calendar endpoints with date filtering
- Add availability checking and conflict detection
- Implement session status management
- Integrate with frontend calendar component

**User Stories:**
- As a coach, I want to schedule sessions so I can organize my teaching time
- As a coach, I want to view my calendar so I can see upcoming sessions
- As a coach, I want to avoid double-booking so I don't have scheduling conflicts
- As a coach, I want to reschedule sessions so I can handle changes

**Tasks:**
- Create Session model in Prisma schema
- Implement session endpoints: [`GET /api/sessions`](src/routes/sessions.ts:1), [`POST /api/sessions`](src/routes/sessions.ts:1), [`PATCH /api/sessions/:id`](src/routes/sessions.ts:1), [`DELETE /api/sessions/:id`](src/routes/sessions.ts:1)
- Add [`GET /api/availability`](src/routes/sessions.ts:1) endpoint
- Implement conflict detection logic
- Create date range filtering
- Add session status management (scheduled/completed/cancelled/missed)
- Update student lastSessionAt and nextSessionAt fields
- Seed database with mock session data
- Update dashboard to show real upcoming sessions

**Definition of Done:**
- Sessions can be scheduled via frontend calendar
- Calendar displays sessions correctly
- Scheduling conflicts are detected and prevented
- Sessions can be rescheduled and cancelled
- Dashboard shows real upcoming session data

**Manual Test Checklist (Frontend):**
- Navigate to Calendar page and verify sessions display
- Schedule a new session for a student
- Try to schedule overlapping sessions (should be prevented)
- Reschedule an existing session
- Cancel a session and verify status change
- View session details and add notes

**User Test Prompt:**
"Test session scheduling: 1) Go to Calendar, 2) Schedule a new session for Emma Johnson tomorrow at 2 PM, 3) Try to schedule another session at the same time (should fail), 4) Reschedule the session to 3 PM, 5) Add session notes."

**Post-sprint:**
- Commit session scheduling system
- Push to GitHub [`main`](README.md:1) branch

## S4 - Progress Tracking & Attendance

**Objectives:**
- Implement progress tracking models (LessonNote, StudentGoal, PracticeLog, SkillAssessment)
- Create attendance tracking system
- Add progress and attendance endpoints
- Implement goal management and progress calculation
- Build attendance summaries and trends

**User Stories:**
- As a coach, I want to record lesson notes so I can track student progress
- As a coach, I want to set goals for students so they have clear objectives
- As a coach, I want to track attendance so I can identify patterns
- As a coach, I want to see progress trends so I can adjust teaching methods

**Tasks:**
- Create LessonNote, StudentGoal, PracticeLog, SkillAssessment models
- Create AttendanceRecord model
- Implement progress endpoints: [`/api/students/:id/lesson-notes`](src/routes/progress.ts:1), [`/api/students/:id/goals`](src/routes/progress.ts:1), etc.
- Implement attendance endpoints: [`/api/attendance`](src/routes/attendance.ts:1), [`/api/attendance/summary`](src/routes/attendance.ts:1)
- Add goal progress calculation logic
- Create attendance trend analysis
- Build attendance summary calculations
- Seed database with mock progress and attendance data
- Add business logic for updating student session counts

**Definition of Done:**
- Lesson notes can be created and viewed
- Student goals can be set and progress tracked
- Attendance can be marked and summaries generated
- Practice logs and skill assessments work
- Progress trends are calculated correctly

**Manual Test Checklist (Frontend):**
- Navigate to Progress page and verify data loads
- Create a lesson note for a student
- Set a new goal and update progress
- Mark attendance for a session
- View attendance summaries and trends
- Create a practice log entry
- Complete a skill assessment

**User Test Prompt:**
"Test progress tracking: 1) Go to Progress page, 2) Add lesson notes for Emma's last session, 3) Create a new goal 'Improve serve accuracy', 4) Mark attendance for recent sessions, 5) View attendance summary and verify calculations."

**Post-sprint:**
- Commit progress tracking system
- Push to GitHub [`main`](README.md:1) branch

## S5 - Payments, Messages & Analytics

**Objectives:**
- Implement payment and invoice management
- Create messaging system with templates
- Build analytics and business insights
- Add settings management
- Complete all remaining frontend features

**User Stories:**
- As a coach, I want to track payments so I can manage my business finances
- As a coach, I want to send messages to students/parents so I can communicate effectively
- As a coach, I want to see business analytics so I can make informed decisions
- As a coach, I want to configure settings so I can customize the application

**Tasks:**
- Create Payment, Invoice, InvoiceItem models
- Create Conversation, Message, MessageTemplate models
- Implement payment endpoints: [`/api/payments`](src/routes/payments.ts:1), [`/api/invoices`](src/routes/payments.ts:1), [`/api/billing/students`](src/routes/payments.ts:1)
- Implement messaging endpoints: [`/api/conversations`](src/routes/messages.ts:1), [`/api/message-templates`](src/routes/messages.ts:1)
- Add Server-Sent Events for real-time messaging
- Create analytics calculation services
- Implement analytics endpoints: [`/api/analytics/*`](src/routes/analytics.ts:1)
- Create settings management system
- Implement all settings endpoints: [`/api/settings/*`](src/routes/settings.ts:1)
- Seed database with complete mock data set
- Add payment overdue detection logic
- Create AnalyticsSnapshot model for performance

**Definition of Done:**
- Payment and invoice management works completely
- Messaging system with templates functions
- Real-time messaging works via Server-Sent Events
- Analytics display real calculated data
- All settings can be configured and saved
- Complete feature parity with frontend

**Manual Test Checklist (Frontend):**
- Navigate to Payments and create an invoice
- Record a payment and verify status updates
- Go to Messages and start a conversation
- Send messages and verify real-time updates
- Use message templates
- View Analytics and verify data accuracy
- Configure all settings categories
- Test security settings and session management

**User Test Prompt:**
"Complete system test: 1) Create invoice for Emma Johnson, 2) Record payment, 3) Send message to Michael's parent, 4) View revenue analytics, 5) Update business settings, 6) Test all major features end-to-end."

**Post-sprint:**
- Commit complete system
- Push to GitHub [`main`](README.md:1) branch
- Tag release as v1.0.0

# 9) Business Logic Implementation

**Student Status Management:**
- Update [`Student.status`](prisma/schema.prisma:1) based on recent session activity
- Increment [`Student.totalSessions`](prisma/schema.prisma:1) when session marked completed
- Update [`Student.lastSessionAt`](prisma/schema.prisma:1) and [`Student.nextSessionAt`](prisma/schema.prisma:1) automatically

**Payment Overdue Detection:**
- Compare [`Payment.dueDate`](prisma/schema.prisma:1) to current date for pending payments
- Auto-update status to overdue via scheduled job (cron placeholder)
- Surface overdue payments in PaymentStats calculations

**Attendance Calculations:**
- Calculate [`attendanceRate`](src/services/attendance.ts:1): (attended + late) / total sessions
- Calculate [`punctualityRate`](src/services/attendance.ts:1): attended / (attended + late)
- Determine trends based on last 10 attendance records

**Messaging Unread Counts:**
- Update [`Conversation.unreadCount`](prisma/schema.prisma:1) when new messages arrive
- Mark coach messages as read automatically
- Provide consistent [`lastMessage`](src/services/messages.ts:1) format for frontend

**Analytics Calculations:**
- Revenue trends from Payment records
- Student growth from Student creation dates
- Session completion rates from Session status
- Goal completion rates from StudentGoal status
- Use AnalyticsSnapshot for performance optimization

# 10) Validation & Error Handling

**Request Validation:**
- Use Zod schemas for all request body and query parameter validation
- Return [`400 Bad Request`](src/middleware/validation.ts:1) with detailed validation errors
- Validate file uploads (type, size, format)

**Error Response Format:**
```json
{
  "message": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

**HTTP Status Codes:**
- [`200 OK`](src/utils/responses.ts:1): Successful requests
- [`201 Created`](src/utils/responses.ts:1): Resource creation
- [`400 Bad Request`](src/utils/responses.ts:1): Validation errors
- [`401 Unauthorized`](src/utils/responses.ts:1): Authentication required
- [`403 Forbidden`](src/utils/responses.ts:1): Insufficient permissions
- [`404 Not Found`](src/utils/responses.ts:1): Resource not found
- [`409 Conflict`](src/utils/responses.ts:1): Scheduling conflicts
- [`500 Internal Server Error`](src/utils/responses.ts:1): Server errors

**Error Classes:**
- [`ValidationError`](src/utils/errors.ts:1): Input validation failures
- [`AuthenticationError`](src/utils/errors.ts:1): Auth token issues
- [`NotFoundError`](src/utils/errors.ts:1): Resource not found
- [`ConflictError`](src/utils/errors.ts:1): Business logic conflicts

# 11) Testing & Quality

**Testing Strategy:**
- Jest for unit and integration tests
- Separate test database for isolation
- Test coverage for critical business logic
- API endpoint testing with supertest

**Key Test Areas:**
- Authentication flows (login, token refresh, logout)
- Student CRUD operations with validation
- Session conflict detection
- Attendance summary calculations
- Invoice payment linkage
- Message unread count logic
- Analytics calculation accuracy

**Quality Tools:**
- ESLint for code quality
- Prettier for code formatting
- TypeScript for type safety
- Husky for pre-commit hooks

**Scripts:**
- [`npm run lint`](package.json:1): Run ESLint
- [`npm run format`](package.json:1): Run Prettier
- [`npm run test`](package.json:1): Run Jest tests
- [`npm run test:watch`](package.json:1): Watch mode testing
- [`npm run test:coverage`](package.json:1): Coverage report

# 12) Seed Data & Migration Strategy

**Prisma Migrations:**
- Use [`prisma migrate dev`](package.json:1) for development
- Use [`prisma migrate deploy`](package.json:1) for production
- Version control all migration files

**Seed Script ([`prisma/seed.ts`](prisma/seed.ts:1)):**
- Load all mock data from frontend exactly as-is
- Maintain stable IDs (1-5) for consistency
- Populate all settings with frontend values
- Create additional realistic data (10-20 students, sessions across months)
- Ensure referential integrity

**Seed Data Sources:**
- [`frontend/src/data/mockData.ts`](frontend/src/data/mockData.ts:1): Core students and stats
- [`frontend/src/data/settingsData.ts`](frontend/src/data/settingsData.ts:1): All settings categories
- [`frontend/src/data/analyticsData.ts`](frontend/src/data/analyticsData.ts:1): Analytics snapshots
- [`frontend/src/data/paymentsData.ts`](frontend/src/data/paymentsData.ts:1): Payment records
- [`frontend/src/data/messagesData.ts`](frontend/src/data/messagesData.ts:1): Conversations and templates
- [`frontend/src/data/attendanceData.ts`](frontend/src/data/attendanceData.ts:1): Attendance records
- [`frontend/src/data/progressData.ts`](frontend/src/data/progressData.ts:1): Progress tracking data

**Seed Command:**
```bash
npm run prisma:seed
```

# 13) Deployment Considerations

**Environment Variables ([`.env.example`](.env.example:1)):**
```env
# Application
NODE_ENV=production
APP_ENV=production
PORT=3001

# Database
DATABASE_URL=postgresql://username:password@host:5432/database

# JWT Authentication
JWT_SECRET=your-production-jwt-secret-key
JWT_REFRESH_SECRET=your-production-refresh-secret-key
JWT_EXPIRES_IN=3600

# CORS
CORS_ORIGINS=https://your-frontend-domain.com

# File Upload
UPLOAD_MAX_SIZE=10485760
UPLOAD_ALLOWED_TYPES=image/jpeg,image/png,image/gif,application/pdf
UPLOAD_PATH=./uploads

# Optional: External Services
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

**Production Build:**
- [`npm run build`](package.json:1): Compile TypeScript to [`dist/`](dist/index.js:1)
- [`npm start`](package.json:1): Run production server
- Ensure [`tsconfig.json`](tsconfig.json:1) emits to [`dist/`](dist/index.js:1)

**Docker Support (Optional):**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
COPY prisma ./prisma
EXPOSE 3001
CMD ["npm", "start"]
```

**Docker Compose ([`docker-compose.yml`](docker-compose.yml:1)):**
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3001:3001"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/pickleball
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=pickleball
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

# 14) Developer Handoff

**Prerequisites:**
- Node.js 18+ and npm/pnpm
- PostgreSQL 12+
- Git

**Installation Instructions:**
```bash
# Clone repository
git clone <repository-url>
cd pickleball-backend

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your database credentials

# Set up database
npm run prisma:migrate
npm run prisma:seed

# Start development server
npm run dev
```

**Development Commands:**
- [`npm run dev`](package.json:1): Start development server with hot reload
- [`npm run build`](package.json:1): Build for production
- [`npm start`](package.json:1): Start production server
- [`npm run lint`](package.json:1): Run linting
- [`npm run format`](package.json:1): Format code
- [`npm run test`](package.json:1): Run tests
- [`npm run prisma:studio`](package.json:1): Open Prisma Studio
- [`npm run prisma:migrate`](package.json:1): Run database migrations
- [`npm run prisma:seed`](package.json:1): Seed database with mock data

**API Documentation:**
- Swagger/OpenAPI docs available at [`http://localhost:3001/api/docs`](src/routes/docs.ts:1)
- Postman collection: [`postman/Pickleball-API.json`](postman/Pickleball-API.json:1)

**Frontend Integration:**
1. Update frontend [`API_BASE_URL`](frontend/src/config/api.ts:1) to `http://localhost:3001/api`
2. Ensure CORS_ORIGINS includes frontend URL
3. Frontend should send `Authorization: Bearer <token>` header for protected routes
4. Both [`instrument`](src/types/student.ts:1) and [`playStyle`](src/types/student.ts:1) fields provided for backward compatibility

**Project Structure:**
```
src/
├── routes/          # API route handlers
├── services/        # Business logic services
├── middleware/      # Express middleware
├── models/          # Prisma client and types
├── utils/           # Utility functions
├── config/          # Configuration files
└── types/           # TypeScript type definitions

prisma/
├── schema.prisma    # Database schema
├── migrations/      # Database migrations
└── seed.ts         # Database seeding

tests/
├── unit/           # Unit tests
├── integration/    # Integration tests
└── fixtures/       # Test data
```

**Future Enhancements (TODO Comments):**
- Multi-coach support with role-based permissions
- Automated email/SMS reminders integration
- Stripe payment processing integration
- Advanced analytics with machine learning insights
- Mobile app API extensions
- Real-time notifications with WebSocket
- Advanced scheduling with recurring sessions
- Student portal for self-service features

**Monitoring & Logging:**
- Use structured logging with Winston
- Add health check endpoints for monitoring
- Consider APM tools like New Relic or DataDog for production
- Set up error tracking with Sentry

This comprehensive backend development plan provides a complete roadmap for building a production-ready Node.js + TypeScript backend that perfectly matches the existing React frontend requirements while maintaining scalability and best practices.