-- AlterEnum
ALTER TYPE "TaskType" ADD VALUE 'KONTUR';

-- AlterTable
ALTER TABLE "subjects" ADD COLUMN     "konturLink" VARCHAR;
