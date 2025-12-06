/*
  Warnings:

  - You are about to drop the column `material_file_url` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Lesson` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[lessonId]` on the table `Assignment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "material_file_url",
DROP COLUMN "type",
ADD COLUMN     "materialFileURL" TEXT,
ALTER COLUMN "content" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Assignment_lessonId_key" ON "Assignment"("lessonId");
