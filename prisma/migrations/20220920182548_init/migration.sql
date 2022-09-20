-- CreateTable
CREATE TABLE "Bounty" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "assignee" TEXT NOT NULL DEFAULT ''
);
