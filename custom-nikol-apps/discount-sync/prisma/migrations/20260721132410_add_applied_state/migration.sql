-- CreateTable
CREATE TABLE "AppliedState" (
    "shop" TEXT NOT NULL PRIMARY KEY,
    "state" TEXT NOT NULL DEFAULT '{}',
    "updatedAt" DATETIME NOT NULL
);
