
# Crimson Hummingbird Crawl - Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture Overview](#architecture-overview)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Database Schema](#database-schema)
6. [API Documentation](#api-documentation)
7. [Authentication System](#authentication-system)
8. [Frontend Architecture](#frontend-architecture)
9. [Backend Architecture](#backend-architecture)
10. [Development Workflow](#development-workflow)
11. [Deployment Guide](#deployment-guide)
12. [Testing Strategy](#testing-strategy)
13. [Security Considerations](#security-considerations)
14. [Performance Optimizations](#performance-optimizations)
15. [Troubleshooting Guide](#troubleshooting-guide)
16. [Future Enhancements](#future-enhancements)

---

## 1. Project Overview

**Crimson Hummingbird Crawl** is a comprehensive tennis coaching management platform designed to streamline the administrative and coaching aspects of tennis instruction. The platform provides tools for student management, session scheduling, progress tracking, attendance monitoring, payment processing, and communication between coaches, students, and guardians.

### Key Features

- **Student Management**: Complete student profiles with contact information, skill levels, and goals
- **Session Scheduling**: Calendar-based lesson scheduling with availability management
- **Progress Tracking**: Skill assessments, lesson notes, and goal tracking
- **Attendance Management**: Real-time attendance tracking with statistics
- **Payment Processing**: Invoice generation, payment tracking, and billing management
- **Communication System**: Messaging between coaches, students, and guardians
- **Analytics Dashboard**: Business insights, revenue tracking, and performance metrics
- **Mobile Support**: Cross-platform mobile app using Capacitor
- **Settings Management**: Comprehensive configuration for business, teaching, and personal preferences

### Target Users

- **Tennis Coaches**: Primary users managing students, sessions, and business operations
- **Students**: Access to their progress, schedules, and communication
- **Guardians**: Oversight of student progress and communication with coaches

---

## 2. Architecture Overview

The application follows a modern full-stack architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Layer                           │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │   Web App       │  │   iOS App       │  │ Android App │ │
│  │   (React)       │  │  (Capacitor)    │  │ (Capacitor) │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/REST API
                              │
┌─────────────────────────────────────────────────────────────┐
│                    Backend Layer                            │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │   API Gateway   │  │   Middleware    │  │   Services  │ │
│  │   (Express)     │  │   (Auth/CORS)   │  │   Layer     │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Prisma ORM
                              │
┌─────────────────────────────────────────────────────────────┐
│                    Database Layer                           │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                SQLite Database                          │ │
│  │  (Development) / PostgreSQL (Production)               │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Key Architectural Principles

- **Separation of Concerns**: Clear boundaries between frontend, backend, and database layers
- **RESTful API Design**: Consistent API endpoints following REST conventions
- **Type Safety**: TypeScript throughout the entire stack
- **Database Abstraction**: Prisma ORM for type-safe database operations
- **Authentication**: JWT-based authentication with refresh tokens
- **Mobile-First**: Responsive design with native mobile app support

---

## 3. Technology Stack

### Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | ^18.3.1 | Core UI framework |
| **TypeScript** | ^5.5.3 | Type safety and development experience |
| **Vite** | ^6.3.4 | Build tool and development server |
| **React Router** | ^6.26.2 | Client-side routing |
| **TanStack Query** | ^5.56.2 | Server state management and caching |
| **Radix UI** | Various | Accessible UI components |
| **Tailwind CSS** | ^3.4.11 | Utility-first CSS framework |
| **Shadcn/ui** | Latest | Pre-built component library |
| **Lucide React** | ^0.462.0 | Icon library |
| **React Hook Form** | ^7.53.0 | Form handling and validation |
| **Zod** | ^3.23.8 | Schema validation |
| **Recharts** | ^2.12.7 | Data visualization |
| **Date-fns** | ^3.6.0 | Date manipulation |
| **Capacitor** | ^7.4.3 | Mobile app framework |

### Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | v18+ | Runtime environment |
| **Express.js** | ^5.1.0 | Web framework |
| **TypeScript** | ^5.9.2 | Type safety |
| **Prisma** | ^6.16.2 | Database ORM and migrations |
| **SQLite** | Latest | Development database |
| **bcryptjs** | ^3.0.2 | Password hashing |
| **jsonwebtoken** | ^9.0.2 | JWT authentication |
| **CORS** | ^2.8.5 | Cross-origin resource sharing |
| **ts-node-dev** | ^2.0.0 | Development server with hot reload |

### Development Tools

| Tool | Purpose |
|------|---------|
| **pnpm** | Package manager |
| **ESLint** | Code linting |
| **Prettier** | Code formatting |
| **Prisma Studio** | Database GUI |
| **VS Code** | Recommended IDE |

---

## 4. Project Structure

```
crimson-hummingbird-crawl/
├── backend/                          # Backend API server
│   ├── src/
│   │   ├── index.ts                 # Main server entry point
│   │   ├── middleware/              # Express middleware
│   │   │   └── auth.ts             # Authentication middleware
│   │   ├── routes/                 # API route handlers
│   │   │   ├── auth.ts            # Authentication routes
│   │   │   ├── students.ts        # Student management
│   │   │   ├── sessions.ts        # Session scheduling
│   │   │   ├── attendance.ts      # Attendance tracking
│   │   │   ├── progress.ts        # Progress tracking
│   │   │   ├── payments.ts        # Payment processing
│   │   │   ├── messages.ts        # Communication system
│   │   │   ├── analytics.ts       # Analytics and reporting
│   │   │   └── settings.ts        # Settings management
│   │   ├── services/              # Business logic layer
│   │   │   ├── studentService.ts  # Student operations
│   │   │   ├── sessionService.ts  # Session operations
│   │   │   ├── attendanceService.ts # Attendance operations
│   │   │   ├── goalService.ts     # Goal tracking
│   │   │   ├── practiceLogService.ts # Practice logging
│   │   │   ├── lessonNoteService.ts # Lesson notes
│   │   │   ├── skillAssessmentService.ts # Skill assessments
│   │   │   ├── paymentService.ts  # Payment processing
│   │   │   ├── messageService.ts  # Messaging
│   │   │   ├── analyticsService.ts # Analytics
│   │   │   ├── settingsService.ts # Settings
│   │   │   └── guardianService.ts # Guardian management
│   │   └── utils/                 # Utility functions
│   │       ├── jwt.ts            # JWT token utilities
│   │       └── password.ts       # Password hashing utilities
│   ├── prisma/                   # Database configuration
│   │   ├── schema.prisma        # Database schema definition
│   │   ├── seed.ts             # Database seeding
│   │   └── migrations/         # Database migrations
│   ├── tests/                   # Backend tests
│   ├── .env                    # Environment variables
│   ├── package.json           # Backend dependencies
│   └── tsconfig.json         # TypeScript configuration
│
├── frontend/                        # Frontend React application
│   ├── src/
│   │   ├── App.tsx               # Main application component
│   │   ├── pages/               # Page components
│   │   │   ├── Index.tsx       # Main dashboard page
│   │   │   └── NotFound.tsx    # 404 page
│   │   ├── components/         # Reusable UI components
│   │   │   ├── auth/          # Authentication components
│   │   │   ├── dashboard/     # Dashboard components
│   │   │   ├── students/      # Student management
│   │   │   ├── calendar/      # Calendar and scheduling
│   │   │   ├── attendance/    # Attendance tracking
│   │   │   ├── progress/      # Progress tracking
│   │   │   ├── payments/      # Payment management
│   │   │   ├── messages/      # Communication
│   │   │   ├── analytics/     # Analytics and charts
│   │   │   ├── settings/      # Settings panels
│   │   │   ├── layout/        # Layout components
│   │   │   ├── common/        # Common utilities
│   │   │   └── ui/           # Base UI components (Shadcn)
│   │   ├── contexts/         # React contexts
│   │   │   └── AuthContext.tsx # Authentication context
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API service layer
│   │   ├── types/          # TypeScript type definitions
│   │   ├── utils/          # Utility functions
│   │   ├── config/         # Configuration files
│   │   └── data/           # Mock data and constants
│   ├── public/             # Static assets
│   ├── android/           # Android app configuration
│   ├── ios/              # iOS app configuration
│   ├── package.json      # Frontend dependencies
│   ├── vite.config.ts   # Vite configuration
│   ├── tailwind.config.js # Tailwind CSS configuration
│   ├── capacitor.config.ts # Capacitor configuration
│   └── components.json   # Shadcn UI configuration
│
├── clear-auth.js              # Authentication cleanup utility
└── PROJECT_DOCUMENTATION.md  # This documentation file
```

---

## 5. Database Schema

The application uses Prisma ORM with SQLite for development and supports PostgreSQL for production. The schema includes comprehensive models for all aspects of tennis coaching management.

### Core Models

#### User Model
```prisma
model User {
  id           Int      @id @default(autoincrement())
  email        String   @unique
  name         String?
  passwordHash String
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  
  // Relationships
  sessions Session[]
  lessonNotes LessonNote[]
  studentGoals StudentGoal[]
  skillAssessments SkillAssessment[]
  conversationParticipants ConversationParticipant[]
  messages Message[]
  messageTemplates MessageTemplate[]
  settings Settings[]
}
```

#### Student Model
```prisma
model Student {
  id             Int       @id @default(autoincrement())
  firstName      String
  lastName       String
  email          String    @unique
  phone          String
  playStyle      String
  level          String
  status         String    @default("Active")
  joinDate       DateTime  @default(now())
  lastSession    DateTime?
  nextSession    DateTime?
  totalSessions  Int       @default(0)
  address        String
  notes          String?
  goals          String    // JSON string
  avatar         String?
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
  
  // Relationships
  guardians         Guardian[]
  sessions          Session[]
  attendanceRecords AttendanceRecord[]
  lessonNotes       LessonNote[]
  studentGoals      StudentGoal[]
  practiceLog       PracticeLog[]
  skillAssessments  SkillAssessment[]
  payments          Payment[]
  invoices          Invoice[]
  conversationParticipants ConversationParticipant[]
  messages          Message[]
}
```

#### Session Model
```prisma
model Session {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  startTime   DateTime
  endTime     DateTime
  status      String   @default("scheduled")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relationships
  studentId   Int
  student     Student  @relation(fields: [studentId], references: [id])
  coachId     Int
  coach       User     @relation(fields: [coachId], references: [id])
  
  attendanceRecords AttendanceRecord[]
  lessonNotes       LessonNote[]
  skillAssessments  SkillAssessment[]
  invoiceItems      InvoiceItem[]
}
```

### Progress Tracking Models

#### StudentGoal Model
```prisma
model StudentGoal {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  category    String   // "technique", "strategy", "fitness", "mental", "other"
  priority    String   @default("medium")
  status      String   @default("active")
  targetDate  DateTime?
  completedAt DateTime?
  progress    Int      @default(0) // 0-100 percentage
  notes       String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  studentId   Int
  student     Student  @relation(fields: [studentId], references: [id])
  coachId     Int
  coach       User     @relation(fields: [coachId], references: [id])
}
```

#### SkillAssessment Model
```prisma
model SkillAssessment {
  id          Int      @id @default(autoincrement())
  skillName   String   // "serve", "backhand", "forehand", etc.
  category    String   // "technical", "tactical", "physical", "mental"
  rating      Int      // 1-10 rating scale
  notes       String?
  assessedAt  DateTime @default(now())
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  studentId   Int
  student     Student  @relation(fields: [studentId], references: [id])
  coachId     Int
  coach       User     @relation(fields: [coachId], references: [id])
  sessionId   Int?
  session     Session? @relation(fields: [sessionId], references: [id])
}
```

### Payment and Billing Models

#### Payment Model
```prisma
model Payment {
  id          Int      @id @default(autoincrement())
  amount      Float
  currency    String   @default("USD")
  method      String   // "card", "cash", "check", "bank_transfer"
  status      String   @default("pending")
  description String?
  reference   String?
  processedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  studentId   Int
  student     Student  @relation(fields: [studentId], references: [id])
  invoiceId   Int?
  invoice     Invoice? @relation(fields: [invoiceId], references: [id])
}
```

#### Invoice Model
```prisma
model Invoice {
  id          Int      @id @default(autoincrement())
  invoiceNumber String @unique
  status      String   @default("draft")
  subtotal    Float
  tax         Float    @default(0)
  total       Float
  dueDate     DateTime
  issuedAt    DateTime @default(now())
  paidAt      DateTime?
  notes       String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  studentId   Int
  student     Student  @relation(fields: [studentId], references: [id])
  items       InvoiceItem[]
  payments    Payment[]
}
```

### Communication Models

#### Conversation Model
```prisma
model Conversation {
  id          Int      @id @default(autoincrement())
  title       String?
  type        String   @default("direct") // "direct", "group"
  status      String   @default("active")
  lastMessageAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  participants ConversationParticipant[]
  messages     Message[]
}
```

#### Message Model
```prisma
model Message {
  id          Int      @id @default(autoincrement())
  content     String
  type        String   @default("text") // "text", "image", "file", "system"
  status      String   @default("sent")
  editedAt    DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  conversationId Int
  conversation   Conversation @relation(fields: [conversationId], references: [id])
  senderId       Int?
  sender         User?        @relation(fields: [senderId], references: [id])
  studentSenderId Int?
  studentSender   Student?     @relation(fields: [studentSenderId], references: [id])
}
```

---

## 6. API Documentation

The backend provides a comprehensive REST API with the following endpoints:

### Base URL
- Development: `http://localhost:3001/api`
- Production: `https://your-domain.com/api`

### Authentication Endpoints

#### POST /auth/login
Authenticate user and receive JWT tokens.

**Request Body:**
```json
{
  "email": "coach@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "coach@example.com",
    "name": "John Coach"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### POST /auth/refresh
Refresh access token using refresh token.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### POST /auth/logout
Logout user (client-side token cleanup).

### Student Management Endpoints

#### GET /students
Get all students with optional filtering.

**Query Parameters:**
- `search`: Filter by name or email
- `status`: Filter by status (Active, Inactive)
- `level`: Filter by skill level

**Response:**
```json
{
  "students": [
    {
      "id": 1,
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "jane@example.com",
      "phone": "+1234567890",
      "level": "Intermediate",
      "status": "Active",
      "totalSessions": 15,
      "lastSession": "2024-01-15T10:00:00Z",
      "nextSession": "2024-01-22T10:00:00Z"
    }
  ]
}
```

#### POST /students
Create a new student.

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "playStyle": "Aggressive Baseline",
  "level": "Intermediate",
  "address": "123 Tennis St, City, State 12345",
  "notes": "Left-handed player, strong forehand",
  "goals": ["Improve serve", "Better net play"]
}
```

#### GET /students/:id
Get detailed student information.

#### PATCH /students/:id
Update student information.

#### DELETE /students/:id
Delete a student (soft delete).

### Session Management Endpoints

#### GET /sessions
Get sessions with filtering options.

**Query Parameters:**
- `date`: Filter by specific date
- `studentId`: Filter by student
- `status`: Filter by status
- `startDate` & `endDate`: Date range filter

#### POST /sessions
Create a new session.

**Request Body:**
```json
{
  "title": "Tennis Lesson - Jane Doe",
  "description": "Focus on serve technique",
  "startTime": "2024-01-22T10:00:00Z",
  "endTime": "2024-01-22T11:00:00Z",
  "studentId": 1
}
```

#### GET /sessions/:id
Get session details.

#### PATCH /sessions/:id
Update session information.

#### DELETE /sessions/:id
Cancel/delete a session.

### Attendance Endpoints

#### POST /attendance
Record attendance for a session.

**Request Body:**
```json
{
  "sessionId": 1,
  "studentId": 1,
  "status": "present",
  "arrivalTime": "2024-01-22T10:05:00Z",
  "notes": "Arrived 5 minutes late"
}
```

#### GET /attendance/summary
Get attendance statistics.

#### GET /attendance/student/:studentId
Get attendance history for a student.

### Progress Tracking Endpoints

#### POST /progress/students/:id/lesson-notes
Add lesson notes for a student.

#### GET /progress/students/:id/lesson-notes
Get lesson notes for a student.

#### POST /progress/students/:id/goals
Create a new goal for a student.

#### GET /progress/students/:id/goals
Get goals for a student.

#### POST /progress/students/:id/skill-assessments
Record skill assessment.

#### GET /progress/students/:id/skill-assessments
Get skill assessments for a student.

### Payment Endpoints

#### GET /payments
Get payment records.

#### POST /payments
Record a new payment.

#### GET /payments/invoices
Get invoices.

#### POST /payments/invoices
Create a new invoice.

### Analytics Endpoints

#### GET /analytics/overview
Get business overview statistics.

#### GET /analytics/revenue
Get revenue analytics.

#### GET /analytics/students
Get student analytics.

#### GET /analytics/sessions
Get session analytics.

### Settings Endpoints

#### GET /settings/:category
Get settings for a category.

#### PUT /settings/:category
Update settings for a category.

---

## 7. Authentication System

The application uses JWT (JSON Web Tokens) for authentication with a dual-token approach for enhanced security.

### JWT Token Strategy

#### Access Tokens
- **Purpose**: Authorize API requests
- **Expiration**: 15 minutes (configurable)
- **Storage**: Memory/React state (not localStorage for security)
- **Usage**: Sent in Authorization header as `Bearer <token>`

#### Refresh Tokens
- **Purpose**: Generate new access tokens
- **Expiration**: 7 days (configurable)
- **Storage**: localStorage (httpOnly cookies recommended for production)
- **Usage**: Sent to `/auth/refresh` endpoint

### Authentication Flow

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant Database

    Client->>API: POST /auth/login (email, password)
    API->>Database: Verify user credentials
    Database-->>API: User data
    API->>API: Generate access & refresh tokens
    API-->>Client: Tokens + user data
    Client->>Client: Store tokens
    
    Note over Client,API: Subsequent API calls
    Client->>API: API request with access token
    API->>API: Verify access token
    API-->>Client: API response
    
    Note over Client,API: Token refresh
    Client->>API: POST /auth/refresh (refresh token)
    API->>API: Verify refresh token
    API->>Database: Check user still exists
    API->>API: Generate new tokens
    API-->>Client: New tokens
```

### Implementation Details

#### Backend Authentication Middleware
```typescript
// backend/src/middleware/auth.ts
export async function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token is required' });
  }

  try {
    const decoded = verifyAccessToken(token);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired access token' });
  }
}
```

#### Frontend Authentication Context
```typescript
// frontend/src/contexts/AuthContext.tsx
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    const response = await fetch(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    const data: LoginResponse = await response.json();
    
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    setUser(data.user);
  };
};
```

### Security Features

1. **Password Hashing**: bcryptjs with salt rounds
2. **Token Expiration**: Short-lived access tokens
3. **Token Refresh**: Automatic token renewal
4. **User Validation**: Database verification on each request
5. **CORS Protection**: Configured for specific origins
6. **Input Validation**: Request body validation

---

## 8. Frontend Architecture

The frontend is built with React and TypeScript, following modern React patterns and best practices.

### Component Architecture

#### Component Hierarchy
```
App
├── AuthProvider (Context)
├── QueryClientProvider (TanStack Query)
├── TooltipProvider (Radix UI)
├── BrowserRouter
└── Routes
    ├── ProtectedRoute
    │   └── Index (Main App)
    │       └── Layout
    │           ├── Header
    │           ├── Sidebar
    │           └── Main Content
    │               ├── Dashboard
    │               ├── Students
    │               ├── Calendar
    │               ├── Attendance
    │               ├── Progress
    │               ├── Payments
    │               ├── Messages
    │               ├── Analytics
    │               └── Settings
    └── NotFound
```

#### State Management Strategy

1. **Server State**: TanStack Query for API data
2. **Authentication State**: React Context
3. **UI State**: Local component state with useState
4. **Form State**: React Hook Form
5. **Navigation State**: Custom hooks

#### Key Custom Hooks

```typescript
// Navigation management
const useNavigation = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // ... navigation logic
};

// Student management
const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  // ... student logic
};
```

### UI Component System

The application uses Shadcn/ui components built on Radix UI primitives:

#### Base Components
- **Button**: Various styles and sizes
- **Input**: Form inputs with validation
- **Card**: Content containers
- **Dialog**: Modal dialogs
- **Table**: Data tables
- **Calendar**: Date picker
- **Chart**: Data visualization

#### Composite Components
- **StudentCard**: Student information display
- **SessionCard**: Session details
- **AttendanceTracker**: Attendance management
- **ProgressChart**: Progress visualization
- **PaymentCard**: Payment information

### Routing and Navigation

```typescript
// Main routing structure
<Routes>
  <Route
    path="/"
    element={
      <ProtectedRoute>
        <Index />
      </ProtectedRoute>
    }
  />
  <Route path="*" element={<NotFound />} />
</Routes>
```

The application uses a single-page architecture with client-side routing handled by React Router. Navigation is managed through a custom hook that controls the active section display.

### Mobile Support

The application is built mobile-first with:
- **Responsive Design**: Tailwind CSS breakpoints
- **Touch-Friendly**: Appropriate touch targets
- **Capacitor Integration**: Native mobile app capabilities
- **Progressive Web App**: PWA features for web

---

## 9. Backend Architecture

The backend follows a layered architecture pattern with clear separation of concerns.

### Architecture Layers

#### 1. Route Layer (`/routes`)
Handles HTTP requests and responses, input validation, and error handling.

```typescript
// Example route structure
router.post('/students', async (req: Request, res: Response) => {
  try {
    const studentData = req.body;
    const student = await studentService.createStudent(studentData);
    res.status(201).json({ student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

#### 2. Service Layer (`/services`)
Contains business logic and orchestrates database operations.

```typescript
// Example service
export class StudentService {
  async createStudent(data: CreateStudentData): Promise<Student> {
    // Business logic validation
    // Database operations
    // Return processed data
  }
}
```

#### 3. Data Access Layer (Prisma ORM)
Handles database operations with type safety.

```typescript
// Example Prisma operation
const student = await prisma.student.create({
  data: {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    // ... other fields
  },
  include: {
    guardians: true,
    sessions: true
  }
});
```

### Middleware Stack

1. **CORS Middleware**: Cross-origin request handling
2. **JSON Parser**: Request body parsing
3. **Authentication Middleware**: JWT token verification
4. **Error Handling**: Centralized error processing

### API Design Principles

1. **RESTful Conventions**: Standard HTTP methods and status codes
2. **Consistent Response Format**: Standardized JSON responses
3. **Error Handling**: Comprehensive error messages
4. **Input Validation**: Request validation at route level
5. **Type Safety**: TypeScript throughout

### Database Integration

#### Prisma ORM Features
- **Type-Safe Queries**: Generated TypeScript types
- **Migration System**: Version-controlled schema changes
- **Migration System**: Version-controlled schema changes
- **Connection Pooling**: Efficient database connections
- **Query Optimization**: Optimized database queries

---

## 10. Development Workflow

### Prerequisites

- **Node.js**: v18 or higher
- **pnpm**: Package manager
- **Git**: Version control
- **VS Code**: Recommended IDE (optional)

### Initial Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd crimson-hummingbird-crawl
   ```

2. **Install dependencies:**
   ```bash
   # Backend dependencies
   cd backend
   pnpm install
   
   # Frontend dependencies
   cd ../frontend
   pnpm install
   ```

3. **Environment configuration:**
   ```bash
   # Backend environment
   cd backend
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Database setup:**
   ```bash
   cd backend
   pnpm db:generate    # Generate Prisma client
   pnpm db:migrate     # Run migrations
   pnpm db:seed        # Seed database (optional)
   ```

### Development Commands

#### Backend Development
```bash
cd backend

# Start development server
pnpm dev

# Database operations
pnpm db:generate     # Generate Prisma client
pnpm db:migrate      # Run migrations
pnpm db:push         # Push schema changes
pnpm db:studio       # Open Prisma Studio
pnpm db:seed         # Seed database

# Build and production
pnpm build           # Build for production
pnpm start           # Start production server
```

#### Frontend Development
```bash
cd frontend

# Start development server
pnpm dev

# Build operations
pnpm build           # Build for production
pnpm build:dev       # Build for development
pnpm preview         # Preview production build

# Mobile development
npx cap add ios      # Add iOS platform
npx cap add android  # Add Android platform
npx cap sync         # Sync web assets
npx cap open ios     # Open in Xcode
npx cap open android # Open in Android Studio
```

### Development Workflow

1. **Feature Development:**
   - Create feature branch from main
   - Implement backend API endpoints
   - Implement frontend components
   - Test functionality
   - Create pull request

2. **Database Changes:**
   - Modify `schema.prisma`
   - Run `pnpm db:migrate` to create migration
   - Test migration on development database
   - Commit migration files

3. **Testing:**
   - Test API endpoints with Postman/Thunder Client
   - Test frontend functionality in browser
   - Test mobile app in simulators/devices
   - Verify database operations

### Code Style and Standards

#### TypeScript Configuration
- Strict mode enabled
- No implicit any
- Consistent import/export patterns
- Type definitions for all interfaces

#### Code Formatting
- ESLint for code linting
- Prettier for code formatting
- Consistent naming conventions
- Component and function documentation

#### Git Workflow
- Feature branches for new development
- Descriptive commit messages
- Pull request reviews
- Automated testing (when implemented)

---

## 11. Deployment Guide

### Production Environment Setup

#### Backend Deployment

1. **Environment Variables:**
   ```bash
   # Production .env
   DATABASE_URL="postgresql://user:password@host:port/database"
   JWT_ACCESS_SECRET="your-production-access-secret"
   JWT_REFRESH_SECRET="your-production-refresh-secret"
   JWT_ACCESS_EXPIRES_IN="15m"
   JWT_REFRESH_EXPIRES_IN="7d"
   PORT=3001
   ```

2. **Database Setup:**
   ```bash
   # Run migrations on production database
   npx prisma migrate deploy
   
   # Generate Prisma client
   npx prisma generate
   ```

3. **Build and Deploy:**
   ```bash
   # Build the application
   pnpm build
   
   # Start production server
   pnpm start
   ```

#### Frontend Deployment

1. **Build Configuration:**
   ```bash
   # Build for production
   pnpm build
   
   # The dist/ folder contains the built application
   ```

2. **Static Hosting (Netlify/Vercel):**
   - Upload `dist/` folder contents
   - Configure redirects for SPA routing
   - Set environment variables for API endpoints

3. **Mobile App Deployment:**
   ```bash
   # Build web assets
   pnpm build
   
   # Sync with mobile platforms
   npx cap sync
   
   # Build for iOS
   npx cap build ios
   
   # Build for Android
   npx cap build android
   ```

### Docker Deployment (Optional)

#### Backend Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
```

#### Docker Compose
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/tennis_coach
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=tennis_coach
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Production Checklist

- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] SSL certificates installed
- [ ] CORS origins updated for production
- [ ] JWT secrets changed from defaults
- [ ] Database backups configured
- [ ] Monitoring and logging setup
- [ ] Error tracking configured
- [ ] Performance monitoring enabled

---

## 12. Testing Strategy

### Current Testing Status

The application currently has minimal automated testing implemented. This section outlines the recommended testing strategy for future implementation.

### Recommended Testing Approach

#### Backend Testing

1. **Unit Tests:**
   - Service layer functions
   - Utility functions (JWT, password hashing)
   - Database operations

2. **Integration Tests:**
   - API endpoint testing
   - Database integration
   - Authentication flows

3. **Testing Tools:**
   ```bash
   # Recommended testing stack
   pnpm add -D jest @types/jest supertest
   pnpm add -D @testing-library/jest-dom
   ```

4. **Example Test Structure:**
   ```typescript
   // backend/tests/auth.test.ts
   describe('Authentication', () => {
     test('should login with valid credentials', async () => {
       const response = await request(app)
         .post('/api/auth/login')
         .send({
           email: 'test@example.com',
           password: 'password123'
         });
       
       expect(response.status).toBe(200);
       expect(response.body).toHaveProperty('accessToken');
     });
   });
   ```

#### Frontend Testing

1. **Component Tests:**
   - React component rendering
   - User interaction testing
   - Form validation

2. **Integration Tests:**
   - API integration
   - Authentication flows
   - Navigation testing

3. **Testing Tools:**
   ```bash
   # Recommended testing stack
   pnpm add -D @testing-library/react @testing-library/jest-dom
   pnpm add -D @testing-library/user-event vitest
   ```

4. **Example Test Structure:**
   ```typescript
   // frontend/src/components/__tests__/LoginForm.test.tsx
   describe('LoginForm', () => {
     test('should submit form with valid data', async () => {
       render(<LoginForm />);
       
       await user.type(screen.getByLabelText(/email/i), 'test@example.com');
       await user.type(screen.getByLabelText(/password/i), 'password123');
       await user.click(screen.getByRole('button', { name: /login/i }));
       
       expect(mockLogin).toHaveBeenCalledWith({
         email: 'test@example.com',
         password: 'password123'
       });
     });
   });
   ```

### Manual Testing Procedures

#### API Testing
- Use Postman or Thunder Client for endpoint testing
- Test authentication flows
- Verify CRUD operations
- Test error handling

#### Frontend Testing
- Cross-browser compatibility testing
- Mobile responsiveness testing
- User workflow testing
- Accessibility testing

#### Mobile App Testing
- iOS simulator testing
- Android emulator testing
- Device testing on physical devices
- Performance testing

---

## 13. Security Considerations

### Authentication Security

1. **Password Security:**
   - bcryptjs hashing with salt rounds
   - Minimum password requirements (implement client-side)
   - Password reset functionality (to be implemented)

2. **JWT Security:**
   - Short-lived access tokens (15 minutes)
   - Secure refresh token storage
   - Token rotation on refresh
   - Proper token validation

3. **Session Management:**
   - Automatic token refresh
   - Secure logout functionality
   - Session timeout handling

### API Security

1. **Input Validation:**
   - Request body validation
   - Parameter sanitization
   - SQL injection prevention (Prisma ORM)
   - XSS prevention

2. **CORS Configuration:**
   ```typescript
   app.use(cors({
     origin: ['http://localhost:5173', 'http://localhost:5137'],
     credentials: true
   }));
   ```

3. **Rate Limiting (Recommended):**
   - Implement rate limiting for API endpoints
   - Protect against brute force attacks
   - Monitor suspicious activity

### Database Security

1. **Connection Security:**
   - Secure connection strings
   - Environment variable protection
   - Database user permissions

2. **Data Protection:**
   - Sensitive data encryption
   - Personal information handling
   - GDPR compliance considerations

### Frontend Security

1. **XSS Prevention:**
   - React's built-in XSS protection
   - Sanitize user inputs
   - Validate data from API

2. **Token Storage:**
   - Avoid localStorage for sensitive tokens
   - Consider httpOnly cookies for production
   - Implement secure token refresh

### Production Security Checklist

- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Environment variables secured
- [ ] Database access restricted
- [ ] API rate limiting implemented
- [ ] Input validation comprehensive
- [ ] Error messages don't expose sensitive info
- [ ] Logging configured for security events
- [ ] Regular security updates applied

---

## 14. Performance Optimizations

### Frontend Performance

1. **React Optimizations:**
   - Component memoization with React.memo
   - useMemo and useCallback for expensive operations
   - Lazy loading for route components
   - Virtual scrolling for large lists

2. **Bundle Optimization:**
   - Vite's built-in code splitting
   - Tree shaking for unused code
   - Dynamic imports for large components
   - Asset optimization

3. **Caching Strategy:**
   - TanStack Query for server state caching
   - Browser caching for static assets
   - Service worker for offline functionality

4. **Image Optimization:**
   - WebP format support
   - Responsive images
   - Lazy loading images
   - Image compression

### Backend Performance

1. **Database Optimization:**
   - Proper indexing on frequently queried fields
   - Query optimization with Prisma
   - Connection pooling
   - Database query monitoring

2. **API Performance:**
   - Response compression
   - Efficient pagination
   - Selective field loading
   - Caching strategies

3. **Server Optimization:**
   - Node.js clustering (production)
   - Memory management
   - CPU profiling
   - Load balancing

### Mobile Performance

1. **Capacitor Optimizations:**
   - Native plugin usage
   - Efficient data synchronization
   - Background task management
   - Battery usage optimization

2. **App Performance:**
   - Minimize bundle size
   - Optimize images for mobile
   - Efficient state management
   - Smooth animations

### Monitoring and Metrics

1. **Performance Monitoring:**
   - Core Web Vitals tracking
   - API response time monitoring
   - Database query performance
   - Error rate monitoring

2. **Tools and Services:**
   - Google Analytics for user metrics
   - Sentry for error tracking
   - New Relic for performance monitoring
   - Lighthouse for web performance audits

---

## 15. Troubleshooting Guide

### Common Development Issues

#### Backend Issues

1. **Database Connection Errors:**
   ```bash
   # Check database URL
   echo $DATABASE_URL
   
   # Regenerate Prisma client
   pnpm db:generate
   
   # Reset database (development only)
   pnpm db:migrate reset
   ```

2. **JWT Token Issues:**
   ```bash
   # Check environment variables
   echo $JWT_ACCESS_SECRET
   echo $JWT_REFRESH_SECRET
   
   # Clear authentication data
   node clear-auth.js
   ```

3. **Port Already in Use:**
   ```bash
   # Find process using port 3001
   lsof -i :3001
   
   # Kill process
   kill -9 <PID>
   
   # Or use different port
   PORT=3002 pnpm dev
   ```

#### Frontend Issues

1. **Build Errors:**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   pnpm install
   
   # Clear Vite cache
   rm -rf .vite
   ```

2. **API Connection Issues:**
   - Check backend server is running
   - Verify API endpoints in configuration
   - Check CORS settings
   - Inspect network requests in browser dev tools

3. **Authentication Issues:**
   - Clear browser localStorage
   - Check token expiration
   - Verify API authentication endpoints
   - Check network connectivity

#### Mobile App Issues

1. **Capacitor Sync Issues:**
   ```bash
   # Clean and sync
   npx cap clean
   npx cap sync
   
   # Rebuild platforms
   npx cap add ios --force
   npx cap add android --force
   ```

2. **Build Issues:**
   - Check Xcode/Android Studio versions
   - Verify platform requirements
   - Clean build folders
   - Update Capacitor plugins

### Production Issues

1. **Server Not Starting:**
   - Check environment variables
   - Verify database connectivity
   - Check port availability
   - Review server logs

2. **Database Migration Issues:**
   ```bash
   # Check migration status
   npx prisma migrate status
   
   # Apply pending migrations
   npx prisma migrate deploy
   
   # Reset migrations (caution: data loss)
   npx prisma migrate reset
   ```

3. **Performance Issues:**
   - Monitor server resources
   - Check database query performance
   - Review API response times
   - Analyze bundle sizes

### Debugging Tools

1. **Backend Debugging:**
   - Console logging
   - Prisma Studio for database inspection
   - Postman for API testing
   - Node.js debugger

2. **Frontend Debugging:**
   - React Developer Tools
   - Browser DevTools
   - Network tab for API calls
   - Console logging

3. **Database Debugging:**
   - Prisma Studio
   - Database query logs
   - Performance monitoring
   - Index analysis

### Getting Help

1. **Documentation:**
   - React documentation
   - Prisma documentation
   - Express.js documentation
   - Capacitor documentation

2. **Community Resources:**
   - Stack Overflow
   - GitHub Issues
   - Discord communities
   - Reddit communities

---

## 16. Future Enhancements

### Short-term Improvements (Next 3 months)

1. **Testing Implementation:**
   - Unit tests for backend services
   - Component tests for React components
   - Integration tests for API endpoints
   - End-to-end testing setup

2. **Security Enhancements:**
   - Rate limiting implementation
   - Enhanced input validation
   - Security headers configuration
   - Audit logging system

3. **Performance Optimizations:**
   - Database query optimization
   - Frontend bundle optimization
   - Image optimization pipeline
   - Caching strategy implementation

4. **User Experience Improvements:**
   - Loading states and skeletons
   - Error boundary implementation
   - Offline functionality
   - Push notifications

### Medium-term Features (3-6 months)

1. **Advanced Analytics:**
   - Custom dashboard widgets
   - Export functionality
   - Advanced reporting
   - Data visualization enhancements

2. **Communication Enhancements:**
   - Real-time messaging
   - File attachments
   - Message templates
   - Notification system

3. **Payment System Integration:**
   - Stripe/PayPal integration
   - Automated billing
   - Payment reminders
   - Financial reporting

4. **Mobile App Features:**
   - Push notifications
   - Offline data sync
   - Camera integration
   - GPS tracking for locations

### Long-term Vision (6+ months)

1. **Multi-tenant Architecture:**
   - Support for multiple coaches
   - Organization management
   - Role-based permissions
   - White-label solutions

2. **Advanced Features:**
   - Video lesson integration
   - AI-powered insights
   - Automated scheduling
   - Integration with tennis equipment

3. **Platform Expansion:**
   - Web-based video calls
   - Tournament management
   - Equipment tracking
   - Nutrition tracking

4. **Business Intelligence:**
   - Predictive analytics
   - Student retention analysis
   - Revenue optimization
   - Market insights

### Technical Debt and Refactoring

1. **Code Quality:**
   - Comprehensive test coverage
   - Code documentation
   - Type safety improvements
   - Performance profiling

2. **Architecture Improvements:**
   - Microservices consideration
   - Event-driven architecture
   - Caching layer implementation
   - Database optimization

3. **DevOps and Infrastructure:**
   - CI/CD pipeline setup
   - Automated deployment
   - Monitoring and alerting
   - Backup and disaster recovery

### Community and Open Source

1. **Documentation:**
   - API documentation with OpenAPI
   - Developer guides
   - Video tutorials
   - Best practices documentation

2. **Community Building:**
   - Open source components
   - Plugin architecture
   - Developer API
   - Community contributions

---

## Conclusion

The Crimson Hummingbird Crawl platform represents a comprehensive solution for tennis coaching management, built with modern technologies and best practices. This documentation serves as a complete reference for understanding, developing, and maintaining the application.

The platform's architecture provides a solid foundation for future growth and enhancements, while the current feature set addresses the core needs of tennis coaches and their students. With proper implementation of the recommended improvements and security measures, this platform can scale to serve a larger user base while maintaining performance and reliability.

For questions, issues, or contributions, please refer to the project repository and follow the established development workflow outlined in this documentation.

---

*Last updated: January 2024*
*Version: 1.0.0*