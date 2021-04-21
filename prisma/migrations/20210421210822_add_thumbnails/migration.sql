/*
  Warnings:

  - Added the required column `thumbnail` to the `Art` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `Chapter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Art" ADD COLUMN     "thumbnail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "thumbnail" TEXT NOT NULL;
