-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "playStyle" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "joinDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSession" DATETIME,
    "nextSession" DATETIME,
    "totalSessions" INTEGER NOT NULL DEFAULT 0,
    "address" TEXT,
    "notes" TEXT,
    "goals" TEXT NOT NULL,
    "avatar" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Student" ("address", "avatar", "createdAt", "email", "firstName", "goals", "id", "joinDate", "lastName", "lastSession", "level", "nextSession", "notes", "phone", "playStyle", "status", "totalSessions", "updatedAt") SELECT "address", "avatar", "createdAt", "email", "firstName", "goals", "id", "joinDate", "lastName", "lastSession", "level", "nextSession", "notes", "phone", "playStyle", "status", "totalSessions", "updatedAt" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
