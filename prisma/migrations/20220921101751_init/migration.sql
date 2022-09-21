-- CreateTable
CREATE TABLE "Bounty" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "assignee" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Bounty_pkey" PRIMARY KEY ("id")
);
