/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `ScanResult` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ScanResult" DROP COLUMN "imageUrl";

-- CreateTable
CREATE TABLE "ScanImage" (
    "id" TEXT NOT NULL,
    "scanResultId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScanImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ScanImage" ADD CONSTRAINT "ScanImage_scanResultId_fkey" FOREIGN KEY ("scanResultId") REFERENCES "ScanResult"("id") ON DELETE CASCADE ON UPDATE CASCADE;
