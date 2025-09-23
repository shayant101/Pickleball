-- CreateTable
CREATE TABLE "Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'scheduled',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "studentId" INTEGER NOT NULL,
    "coachId" INTEGER NOT NULL,
    CONSTRAINT "Session_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Session_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Session_startTime_endTime_idx" ON "Session"("startTime", "endTime");

-- CreateIndex
CREATE INDEX "Session_studentId_idx" ON "Session"("studentId");

-- CreateIndex
CREATE INDEX "Session_coachId_idx" ON "Session"("coachId");
