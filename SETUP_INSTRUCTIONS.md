# Full Application Setup Instructions

This guide will help you run the complete Pickleball Coach Management application with both frontend and backend services.

## Prerequisites

- Node.js (v18 or higher)
- pnpm package manager
- PostgreSQL database (or use the provided SQLite setup)

## Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up environment variables:**
   The backend uses a `.env` file with the following configuration:
   ```
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your-super-secret-jwt-key-here"
   JWT_REFRESH_SECRET="your-super-secret-refresh-key-here"
   PORT=3001
   ```

4. **Set up the database:**
   ```bash
   # Generate Prisma client
   pnpm prisma generate
   
   # Run database migrations
   pnpm prisma migrate dev
   
   # Seed the database with sample data
   pnpm prisma db seed
   ```

5. **Start the backend server:**
   ```bash
   pnpm dev
   ```
   
   The backend will be running on `http://localhost:3001`

## Frontend Setup

1. **Open a new terminal and navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Start the frontend development server:**
   ```bash
   pnpm dev
   ```
   
   The frontend will be running on `http://localhost:5173`

## Login Credentials

The application comes with a pre-seeded coach account:

- **Email:** `sarah.mitchell@email.com`
- **Password:** `password123`

## Sample Data

The database is seeded with:
- 1 coach user (Sarah Mitchell)
- 5 sample students with different skill levels
- Multiple scheduled sessions
- Attendance records
- Progress tracking data
- Payment records
- Message conversations
- Analytics data
- System settings

## API Endpoints

The backend provides the following main API endpoints:

- **Authentication:** `/api/auth/login`, `/api/auth/refresh`, `/api/auth/logout`
- **Students:** `/api/students` (GET, POST, PUT, DELETE)
- **Sessions:** `/api/sessions` (GET, POST, PUT, DELETE)
- **Attendance:** `/api/attendance` (GET, POST, PUT)
- **Progress:** `/api/progress` (GET, POST, PUT)
- **Analytics:** `/api/analytics` (GET)
- **Messages:** `/api/messages` (GET, POST)
- **Payments:** `/api/payments` (GET, POST)
- **Settings:** `/api/settings` (GET, PUT)

## Running Both Services

To run the complete application:

1. **Terminal 1 - Backend:**
   ```bash
   cd backend && pnpm dev
   ```

2. **Terminal 2 - Frontend:**
   ```bash
   cd frontend && pnpm dev
   ```

3. **Access the application:**
   - Open your browser and go to `http://localhost:5173`
   - Use the login credentials above to sign in
   - The frontend will automatically connect to the backend API

## Features Available

Once logged in, you can:

- **Dashboard:** View overview of students, sessions, and recent activity
- **Students:** Manage student profiles, add new students, view progress
- **Calendar:** Schedule and manage coaching sessions
- **Attendance:** Track student attendance and punctuality
- **Progress:** Monitor student goals and skill development
- **Payments:** Handle invoicing and payment tracking
- **Messages:** Communicate with students and guardians
- **Analytics:** View business insights and performance metrics
- **Settings:** Configure business and personal preferences

## Troubleshooting

### Backend Issues

- **Database connection errors:** Ensure the database file exists and permissions are correct
- **Port conflicts:** Change the PORT in `.env` if 3001 is already in use
- **JWT errors:** Verify JWT secrets are set in `.env`

### Frontend Issues

- **API connection errors:** Ensure the backend is running on port 3001
- **Login failures:** Verify the backend database is seeded with the coach user
- **CORS errors:** The backend is configured to allow requests from localhost:5173

### Common Solutions

1. **Clear browser cache and localStorage** if experiencing authentication issues
2. **Restart both services** if you encounter connection problems
3. **Check console logs** in both terminal windows for detailed error messages
4. **Verify all dependencies are installed** by running `pnpm install` in both directories

## Development Notes

- The frontend uses React with TypeScript and Tailwind CSS
- The backend uses Express.js with Prisma ORM and SQLite
- Authentication is handled with JWT tokens
- The application supports automatic token refresh
- All API calls include proper error handling and loading states

## Next Steps

After successfully running the application, you can:

1. Explore all the features using the demo data
2. Add your own students and sessions
3. Customize the business settings
4. Test the messaging and payment features
5. Review the analytics dashboard

The application is fully functional and ready for production use with proper environment configuration.