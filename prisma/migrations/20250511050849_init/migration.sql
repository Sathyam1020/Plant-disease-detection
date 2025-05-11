-- CreateTable
CREATE TABLE "ScanResult" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "hasDisease" BOOLEAN NOT NULL,
    "diseaseName" TEXT,
    "plantType" TEXT NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "causes" TEXT[],
    "symptoms" TEXT[],
    "treatment" TEXT[],
    "recommendations" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScanResult_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ScanResult" ADD CONSTRAINT "ScanResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
