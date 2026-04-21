/*
  Warnings:

  - You are about to drop the column `slug` on the `Deal` table. All the data in the column will be lost.
  - Added the required column `lock` to the `Deal` table without a default value. This is not possible if the table is not empty.
  - Made the column `badge` on table `Deal` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bg` on table `Deal` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Deal_slug_key";

-- AlterTable
ALTER TABLE "Deal" DROP COLUMN "slug",
ADD COLUMN     "image" TEXT,
ADD COLUMN     "lock" TEXT NOT NULL,
ALTER COLUMN "badge" SET NOT NULL,
ALTER COLUMN "bg" SET NOT NULL;

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "dealId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
