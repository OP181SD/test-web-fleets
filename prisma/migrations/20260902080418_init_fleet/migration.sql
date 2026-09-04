-- CreateEnum
CREATE TYPE "FleetColor" AS ENUM ('blue', 'cyan', 'green', 'yellow', 'orange', 'red', 'pink', 'violet');

-- CreateTable
CREATE TABLE "Fleet" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "color" "FleetColor" NOT NULL,
    "companiesCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fleet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Fleet_createdAt_id_idx" ON "Fleet"("createdAt" DESC, "id" DESC);
