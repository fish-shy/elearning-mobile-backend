/*
  Warnings:

  - You are about to drop the column `dueDate` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `lessonId` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `Enrollment` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `Enrollment` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `materialFileURL` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `assignmentId` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `Submission` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[lesson_id]` on the table `Assignment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[student_id,course_id]` on the table `Enrollment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lesson_id` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacher_id` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course_id` to the `Enrollment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `Enrollment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course_id` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assignment_id` to the `Submission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_assignmentId_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_studentId_fkey";

-- DropIndex
DROP INDEX "Assignment_lessonId_key";

-- DropIndex
DROP INDEX "Enrollment_studentId_courseId_key";

-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "dueDate",
DROP COLUMN "lessonId",
ADD COLUMN     "due_date" TIMESTAMP(3),
ADD COLUMN     "lesson_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "image",
DROP COLUMN "teacherId",
ADD COLUMN     "imagePath" TEXT,
ADD COLUMN     "teacher_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Enrollment" DROP COLUMN "courseId",
DROP COLUMN "studentId",
ADD COLUMN     "course_id" TEXT NOT NULL,
ADD COLUMN     "student_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "courseId",
DROP COLUMN "materialFileURL",
ADD COLUMN     "course_id" TEXT NOT NULL,
ADD COLUMN     "material_file_url" TEXT;

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "assignmentId",
DROP COLUMN "studentId",
ADD COLUMN     "assignment_id" TEXT NOT NULL,
ADD COLUMN     "student_id" TEXT NOT NULL,
ADD COLUMN     "submission_text" TEXT,
ALTER COLUMN "submission_file_url" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Assignment_lesson_id_key" ON "Assignment"("lesson_id");

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_student_id_course_id_key" ON "Enrollment"("student_id", "course_id");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "Assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
