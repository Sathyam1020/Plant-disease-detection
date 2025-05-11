/*
  Warnings:

  - You are about to drop the `ScanImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ScanImage" DROP CONSTRAINT "ScanImage_scanResultId_fkey";

-- AlterTable
ALTER TABLE "ScanResult" ADD COLUMN     "images" TEXT[];

-- DropTable
DROP TABLE "ScanImage";
