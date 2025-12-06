/*
  Warnings:

  - You are about to drop the column `isDone` on the `Lesson` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "completed_lesson_ids" TEXT[];

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "isDone";
