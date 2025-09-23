# Backend API

A Node.js + TypeScript backend API built with Express.js and Prisma ORM.

## Features

- **Express.js** - Fast, unopinionated web framework
- **TypeScript** - Type-safe JavaScript
- **Prisma ORM** - Modern database toolkit
- **SQLite** - Lightweight database (development)
- **CORS** - Cross-origin resource sharing enabled
- **Health Check** - Database connectivity monitoring

## Prerequisites

- Node.js (v18 or higher)
- pnpm package manager

## Setup Instructions

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your configuration if needed.

3. **Generate Prisma client:**
   ```bash
   pnpm db:generate
   ```

4. **Run database migrations:**
   ```bash
   pnpm db:migrate
   ```

5. **Start the development server:**
   ```bash
   pnpm dev
   ```

The server will start on `http://localhost:3001`

## Available Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm db:generate` - Generate Prisma client
- `pnpm db:migrate` - Run database migrations
- `pnpm db:push` - Push schema changes to database
- `pnpm db:studio` - Open Prisma Studio (database GUI)

## API Endpoints

### Health Check
- **GET** `/api/health` - Check API and database health
  ```json
  {
    "status": "healthy",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "database": "connected",
    "service": "backend-api"
  }
  ```

### Root
- **GET** `/` - Basic API information

## Database Schema

### User Model
```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Environment Variables

- `DATABASE_URL` - Database connection string (default: `file:./dev.db`)
- `PORT` - Server port (default: `3001`)

## CORS Configuration

The API is configured to accept requests from:
- `http://localhost:5173` (Frontend development server)

## Development

The project uses:
- **ts-node-dev** for development with hot reload
- **TypeScript** with strict mode enabled
- **Prisma** for database operations
- **Express** with CORS middleware

## Production Build

1. Build the project:
   ```bash
   pnpm build
   ```

2. Start the production server:
   ```bash
   pnpm start
   ```

## Database Management

- View data: `pnpm db:studio`
- Reset database: `pnpm db:migrate reset`
- Deploy changes: `pnpm db:push`

## Project Structure

```
backend/
├── src/
│   └── index.ts          # Main server file
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── migrations/       # Database migrations
├── tests/                # Test files
├── dist/                 # Compiled JavaScript (after build)
├── .env                  # Environment variables
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration