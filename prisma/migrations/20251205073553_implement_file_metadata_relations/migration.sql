/*
  Warnings:

  - You are about to drop the column `material_file_url` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `submission_file_url` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `profile_image_url` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `fileMetadata` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "material_file_url",
ADD COLUMN     "file_id" TEXT;

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "submission_file_url",
ADD COLUMN     "file_id" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "profile_image_url",
ADD COLUMN     "profile_image_id" TEXT;

-- DropTable
DROP TABLE "fileMetadata";

-- CreateTable
CREATE TABLE "FileMetadata" (
    "id" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_size" INTEGER NOT NULL,
    "file_type" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FileMetadata_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profile_image_id_fkey" FOREIGN KEY ("profile_image_id") REFERENCES "FileMetadata"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "FileMetadata"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "FileMetadata"("id") ON DELETE SET NULL ON UPDATE CASCADE;
