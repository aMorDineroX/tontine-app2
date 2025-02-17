/*
  Warnings:

  - You are about to drop the column `date` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `round` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `currentRound` on the `Tontine` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Tontine` table. All the data in the column will be lost.
  - You are about to drop the column `totalRounds` on the `Tontine` table. All the data in the column will be lost.
  - You are about to drop the column `nextPaymentDate` on the `TontineMember` table. All the data in the column will be lost.
  - You are about to drop the column `receivedAmount` on the `TontineMember` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `TontineMember` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tontineId,position]` on the table `TontineMember` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "TontineMember_userId_tontineId_key";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "date",
DROP COLUMN "round",
ADD COLUMN     "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Tontine" DROP COLUMN "currentRound",
DROP COLUMN "status",
DROP COLUMN "totalRounds",
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "TontineMember" DROP COLUMN "nextPaymentDate",
DROP COLUMN "receivedAmount",
DROP COLUMN "status",
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Payment_userId_idx" ON "Payment"("userId");

-- CreateIndex
CREATE INDEX "Payment_tontineId_idx" ON "Payment"("tontineId");

-- CreateIndex
CREATE INDEX "Payment_memberId_idx" ON "Payment"("memberId");

-- CreateIndex
CREATE INDEX "Tontine_creatorId_idx" ON "Tontine"("creatorId");

-- CreateIndex
CREATE INDEX "TontineMember_userId_idx" ON "TontineMember"("userId");

-- CreateIndex
CREATE INDEX "TontineMember_tontineId_idx" ON "TontineMember"("tontineId");

-- CreateIndex
CREATE UNIQUE INDEX "TontineMember_tontineId_position_key" ON "TontineMember"("tontineId", "position");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");
