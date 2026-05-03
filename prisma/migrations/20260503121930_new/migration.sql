/*
  Warnings:

  - You are about to drop the column `type` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `skwb` on the `Registration` table. All the data in the column will be lost.
  - You are about to drop the column `skwb` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nisn]` on the table `Registration` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nis]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `documentTypeId` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nisn` to the `Registration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nis` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DocumentStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- DropIndex
DROP INDEX "Registration_skwb_key";

-- DropIndex
DROP INDEX "Student_skwb_key";

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "type",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "documentTypeId" TEXT NOT NULL,
ADD COLUMN     "note" TEXT,
ADD COLUMN     "status" "DocumentStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Registration" DROP COLUMN "skwb",
ADD COLUMN     "nisn" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "skwb",
ADD COLUMN     "nis" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "DocumentType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isRequired" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DocumentType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Registration_nisn_key" ON "Registration"("nisn");

-- CreateIndex
CREATE UNIQUE INDEX "Student_nis_key" ON "Student"("nis");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_documentTypeId_fkey" FOREIGN KEY ("documentTypeId") REFERENCES "DocumentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
